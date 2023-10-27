import React from "react";
import {
  useRouteLoaderData,
  useNavigate,
  useActionData,
  Link,
} from "react-router-dom";
import Modal from "../components/Modal";
import EventForm from "./EventForm";
import Button from "../components/Button";
import Buttons from "../components/Buttons";
import Success from "../components/Success";

const EditEventModal = () => {
  const loaderData = useRouteLoaderData("EVENT");
  const actionData = useActionData();
  const navigate = useNavigate();

  const goBack = () => navigate("..");

  console.log({ loaderData, actionData });

  return (
    <Modal title="Edit Event" onClose={goBack}>
      {(closeHandler) =>
        actionData?.state === "success" ? (
          <>
            <Success>Success!</Success>
            <p>{actionData.message}</p>
            <Buttons>
              <Button onClick={() => closeHandler(goBack)}>Ok</Button>
            </Buttons>
          </>
        ) : (
          <EventForm
            loaderData={loaderData}
            actionData={actionData}
            method="PATCH"
          />
        )
      }
    </Modal>
  );
};

export default EditEventModal;
