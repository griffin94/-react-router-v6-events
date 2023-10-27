import styled from "styled-components";

const Button = styled.button.attrs((props) => ({
  type: props.type || "button",
}))`
  padding: 8px 16px;
  border: 1px solid #aaa;
  border-radius: 4px;
  background-color: #777;
  color: white;
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary-800);
    color: var(--color-primary-800);
  }
`;

export default Button;
