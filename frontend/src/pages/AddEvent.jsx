import { useActionData, useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import Modal from "../components/Modal";
import Success from "../components/Success";
import Button from "../components/Button";
import Buttons from "../components/Buttons";

const AddEvent = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  const goToEvents = () => navigate("/events");

  return actionData?.state === "success" ? (
    <Modal title="Add Event" onClose={goToEvents}>
      {(closeHandler) => (
        <>
          <Success>Success!</Success>
          <p>{actionData.message}</p>
          <Buttons>
            <Button onClick={() => closeHandler(goToEvents)}>Ok</Button>
          </Buttons>
        </>
      )}
    </Modal>
  ) : (
    <EventForm method="POST" actionData={actionData} />
  );
};

export default AddEvent;
