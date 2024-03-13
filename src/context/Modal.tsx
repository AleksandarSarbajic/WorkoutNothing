import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import styled, { css, keyframes } from "styled-components";

import { HiXMark } from "react-icons/hi2";

interface ChildrenType {
  children: React.ReactNode;
}

interface ContextType {
  openName: string;
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
}

interface Opentype {
  children: ReactElement;
  opens: string;
  withOpens?: () => void;
}

interface WindowType extends ChildrenType {
  name: string;
  padding?: boolean;
  addition?: () => void;
}

const Jump = keyframes`
0%{
  opacity: 0;
  transform:translate(-50%, -50%) scale(0.7);
 
}

100%{
  opacity: 1;
  transform:translate(-50%, -50%) scale(1);
}
`;

const StyledModal = styled.div<{ $padding: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);

  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.5s;
  width: 90%;
  max-width: 45rem;
  animation: ${Jump} 0.35s;
  padding: 3.2rem 4rem;
  ${(props) =>
    props.$padding &&
    css`
      padding: 3.2rem 0rem;
    `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 3rem;
    height: 3rem;

    color: var(--color-red-100);
  }
`;

const ModalContext = createContext({} as ContextType);
interface ModalComponent
  extends React.ForwardRefExoticComponent<
    ChildrenType & React.RefAttributes<HTMLDivElement>
  > {
  Open: typeof Open;
  Window: typeof Window;
}

const Modal = React.forwardRef<HTMLDivElement, ChildrenType>(
  ({ children }: ChildrenType, ref) => {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return (
      <ModalContext.Provider value={{ openName, close, open }}>
        <div ref={ref}>{children}</div>
      </ModalContext.Provider>
    );
  }
) as ModalComponent;

function Open({ children, opens: opensWindowName, withOpens }: Opentype) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
      if (withOpens) {
        withOpens();
      }
    },
  });
}

function Window({ children, name, padding = false, addition }: WindowType) {
  const { openName, close } = useContext(ModalContext);
  function handler() {
    if (addition) {
      addition();
    }
    close();
  }
  const ref = useOutsideClick<HTMLDivElement>(handler, true, [], handler);

  if (name !== openName) return null;

  return (
    <Overlay id="overlay">
      <StyledModal ref={ref} $padding={padding}>
        <Button
          onClick={() => {
            if (addition) {
              addition();
            }
            close();
          }}
        >
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children as ReactElement, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
