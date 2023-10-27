import React from "react";
import Modal from "../components/Modal";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import Success from "../components/Success";
import Button from "../components/Button";
import Buttons from "../components/Buttons";

const DeleteEventModal = () => {
  const navigate = useNavigate();
  const actionData = useActionData();
  const submit = useSubmit();

  const onConfirm = () => submit(null, { method: "DELETE" });
  const onClose = () => navigate("..");
  const goToEvents = () => navigate("/events");

  return (
    <Modal title="Remove Event" onClose={onClose}>
      {(closeHandler) =>
        actionData?.state === "success" ? (
          <>
            <Success>Success!</Success>
            <p>{actionData.message}</p>
            <Buttons>
              <Button onClick={() => closeHandler(goToEvents)}>Ok</Button>
            </Buttons>
          </>
        ) : (
          <>
            <p>Are you sure you want to delete the event?</p>
            <Buttons>
              <Button onClick={onConfirm}>Yes</Button>
              <Button onClick={() => closeHandler(onClose)}>Cancel</Button>
            </Buttons>
          </>
        )
      }
    </Modal>
  );
};

export default DeleteEventModal;
