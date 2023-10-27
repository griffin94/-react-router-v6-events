import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

const bounceInDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  
  75% {
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0, 5px, 0);
  }

  100% {
    transform: none;
  }
`;

const bounceOutUp = keyframes`
  20% {
    transform: translate3d(0, -10px, 0);
  }

  40%, 45% {
    opacity: 1;
    transform: translate3d(0, 20px, 0);
  }

  100% {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  animation-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  animation-fill-mode: forwards;
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  background-color: #212529;
  text-align: center;
  border: 1px solid #666;

  &.bounceOutUp {
    animation-name: ${bounceOutUp};
  }

  &.bounceInDown {
    animation-name: ${bounceInDown};
  }
`;

const Header = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #666;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  padding: 1rem;
`;

const CloseButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-left: auto;
  color: #999;
  &:hover {
    color: #ccc;
  }
  & svg {
    width: 30px;
    height: 30px;
  }
`;

const Title = styled.h2`
  margin: 0;
`;

const Modal = ({ children, onClose, title }) => {
  const [mounted, setMounted] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  const closeHandler = (callback) => {
    setStartAnimation(true);
    setTimeout(() => {
      setMounted(false);
      typeof callback === "function" && callback();
    }, 600);
  };

  return mounted
    ? createPortal(
        <Overlay>
          <Wrapper className={startAnimation ? "bounceOutUp" : "bounceInDown"}>
            <Header>
              <Title>{title}</Title>
              <CloseButton onClick={() => closeHandler(onClose)}>
                <IoClose />
              </CloseButton>
            </Header>
            <Content>{children(closeHandler)}</Content>
          </Wrapper>
        </Overlay>,
        document.body
      )
    : null;
};

export default Modal;
