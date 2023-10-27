import React from "react";
import Textfield from "../components/Textfield";
import Form from "../components/Form";
import Button from "../components/Button";
import { Form as RouterForm } from "react-router-dom";

const EventForm = ({ loaderData, actionData, method }) => {
  return (
    <Form as={RouterForm} method={method}>
      {method === "POST" && <Form.Title>Add Event</Form.Title>}
      {actionData?.message && <Form.Error>{actionData.message}</Form.Error>}
      <Textfield
        label="Title"
        name="title"
        defaultValue={loaderData?.title}
        error={actionData?.errors?.title}
      />
      <Textfield
        label="Image"
        name="image"
        defaultValue={loaderData?.image}
        error={actionData?.errors?.image}
      />
      <Textfield
        label="Date"
        name="date"
        type="date"
        error={actionData?.errors?.date}
        defaultValue={loaderData?.date}
      />
      <Textfield
        label="Description"
        name="description"
        type="textarea"
        rows="4"
        cols="10"
        error={actionData?.errors?.description}
        defaultValue={loaderData?.description}
      />
      <Button
        type="submit"
        style={{
          width: "100%",
        }}
      >
        {method === "POST" ? "Add" : "Save"}
      </Button>
    </Form>
  );
};

export default EventForm;
