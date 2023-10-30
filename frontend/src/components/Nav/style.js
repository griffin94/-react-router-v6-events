import styled, { keyframes } from "styled-components";
import Button from "../Button";

export const bounceInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  60% {
    opacity: 1;
    transform: translateX(25px);
  }
  75% {
    transform: translateX(-10px);
  }
  90% {
    transform: translateX(5px);
  }
  100% {
    transform: none;
  }
`;

export const bounceOutLeft = keyframes`
  20% {
    opacity: 1;
    transform: translateX(20px);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

export const Navigation = styled.nav`
  background-color: #464646;
`;

export const MobileNavigation = styled(Navigation)`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

  &.open {
    animation-name: ${bounceInLeft};
  }

  &.close {
    animation-name: ${bounceOutLeft};
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
`;

export const DesktopList = styled(List)`
  display: flex;
  flex-direction: row;
`;

export const Item = styled.li`
  padding: 0.5rem 1rem;
  text-align: center;
`;

export const NavButton = styled(Button)`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: transparent;
  padding: 0;
  color: #aaa;
  border-width: 2px;
`;
