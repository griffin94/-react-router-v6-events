import {
  Link,
  Form as RouterForm,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Textfield from "../components/Textfield";
import Form from "../components/Form";
import Button from "../components/Button";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignupPage = () => {
  const actionData = useActionData();
  const { state } = useNavigation();

  return (
    <Form as={RouterForm} method="POST">
      <Form.Title>Create account</Form.Title>
      {actionData?.message && <Form.Error>{actionData?.message}</Form.Error>}
      <Textfield
        type="email"
        name="email"
        label="Email"
        error={actionData?.errors?.email}
      />
      <Textfield
        type="password"
        name="password"
        label="Password"
        error={actionData?.errors?.password}
      />
      <Row>
        <Link to="/login">Do you have an account? Log In!</Link>
        <Button type="submit" name="intent" value="SIGNUP">
          {state === "submitting" ? "Loading..." : "Create Account"}
        </Button>
      </Row>
    </Form>
  );
};

export default SignupPage;
