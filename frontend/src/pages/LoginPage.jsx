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

const LoginPage = () => {
  const actionData = useActionData();
  const { state } = useNavigation();

  return (
    <Form as={RouterForm} method="POST" replace={true}>
      <Form.Title>Log In</Form.Title>
      {actionData?.message && <Form.Error>{actionData?.message}</Form.Error>}
      <Textfield type="email" name="email" label="Email" />
      <Textfield type="password" name="password" label="Password" />
      <Row>
        <Link to="/signup">Don't you have an account? Sign In!</Link>
        <Button name="intent" value="LOGIN" type="submit">
          {state === "submitting" ? "Loading..." : "Login"}
        </Button>
      </Row>
    </Form>
  );
};

export default LoginPage;
