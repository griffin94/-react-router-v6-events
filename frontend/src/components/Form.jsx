import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Error = styled.h3`
  color: red;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

export default Object.assign(Form, {
  Error,
  Title,
});
