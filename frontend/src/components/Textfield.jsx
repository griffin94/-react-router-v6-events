import React, { useId } from "react";
import styled from "styled-components";

const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Field = styled.input`
  padding: 8px 16px;
  border: 1px solid #aaa;
  border-radius: 4px;
  background-color: #777;
  color: white;

  &:focus {
    outline: none;
    border: 2px solid var(--color-primary-800);
    padding: 6px 14px;
  }
`;

const Label = styled.label``;

const Error = styled.div`
  color: red;
  font-size: 12px;
  height: 24px;
`;

const Textfield = ({ type = "text", label, error, ...rest }) => {
  const id = useId();
  return (
    <Group>
      <Label htmlFor={id}>{label}</Label>
      <Field
        id={id}
        {...(type === "textarea" ? { as: type } : { type })}
        {...rest}
      />
      <Error>{error}</Error>
    </Group>
  );
};

export default Textfield;
