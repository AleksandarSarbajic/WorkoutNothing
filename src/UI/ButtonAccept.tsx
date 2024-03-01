import { HiOutlineCheck } from "react-icons/hi2";
import styled, { keyframes } from "styled-components";

const animation = keyframes`

0%{
 scale: 0;
  opacity: 0;
}
100%{
  scale: 1.05;
  opacity: 1;
  }
`;

const StyledButton = styled.button`
  border-radius: 50%;
  background-color: var(--color-brand-600);
  position: fixed;
  bottom: 5%;
  right: 7%;
  padding: 2rem;
  animation: ${animation} 0.3s ease-in-out;
  svg {
    width: 3rem;
    height: 3rem;
  }
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function ButtonAccept({ onClick }: { onClick: () => void }) {
  return (
    <StyledButton onClick={onClick}>
      <HiOutlineCheck />
    </StyledButton>
  );
}

export default ButtonAccept;
