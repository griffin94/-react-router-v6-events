import styled from "styled-components";

const Buttons = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.children.length > 1 ? "space-between" : "center"};
  padding: 1rem;
`;

export default Buttons;
