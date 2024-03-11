import React, { createContext, useContext } from "react";

import { HiEllipsisVertical } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { ChildrenProps } from "../types/ChildrenType";

interface Position {
  x: number;
  y: number;
}

interface ListPostion {
  $position: Position | null;
}

interface MenusProps {
  openId: string | number;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string | number>>;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

interface IdProps extends ChildrenProps {
  id: string | number;
  icon?: React.ReactElement;
  text?: React.ReactElement;
  direction?: "left" | "right";
}

interface ButtonProps {
  icon?: React.ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactElement | React.ReactNode;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button<{ $hasText?: boolean }>`
  ${(props) =>
    props.$hasText &&
    css`
      background: none;
      border: none;
      padding: 0.4rem;
      border-radius: var(--border-radius-sm);
      transform: translateX(0.8rem);
      transition: all 0.2s;

      &:hover {
        background-color: var(--color-grey-100);
      }

      & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
      }
    `}
`;

const StyledList = styled.ul<ListPostion>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position?.x ?? 0}px;
  top: ${(props) => props.$position?.y ?? 0}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  /* min-width: 20rem; */
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext({} as MenusProps);

interface MenusComponent
  extends React.ForwardRefExoticComponent<
    ChildrenProps & React.RefAttributes<HTMLDivElement>
  > {
  Menu: typeof Menu;
  Toggle: typeof Toggle;
  List: typeof List;
  Button: typeof Button;
}

const Menus = React.forwardRef<HTMLDivElement, ChildrenProps>(
  ({ children }: ChildrenProps, ref) => {
    const [openId, setOpenId] = React.useState<string | number>("");
    const [position, setPosition] = React.useState<Position | null>(null);

    const close = () => setOpenId("");
    const open = setOpenId;

    return (
      <MenusContext.Provider
        value={{ openId, close, open, position, setPosition }}
      >
        <div ref={ref}>{children}</div>
      </MenusContext.Provider>
    );
  }
) as MenusComponent;

function Toggle({ id, icon, text, direction = "left" }: IdProps) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const buttonElement = e.currentTarget as HTMLButtonElement;
    const rect = buttonElement.getBoundingClientRect();

    setPosition({
      x:
        window.innerWidth -
        (direction === "left" ? rect.width : rect.width * 4) -
        rect.x,
      y: rect.y + 2,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick} $hasText={!text ? true : false}>
      {icon ? <>{icon}</> : text ? "" : <HiEllipsisVertical />}
      {text}
    </StyledToggle>
  );
}

function List({ id, children }: IdProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return (
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick, disabled = false }: ButtonProps) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

interface CloseMenusHook {
  close: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCloseMenus(): CloseMenusHook {
  const { close } = useContext(MenusContext);

  return { close };
}

Menus.Menu = Menu;

Menus.Toggle = Toggle;

Menus.List = List;

Menus.Button = Button;

export default Menus;
