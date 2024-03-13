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
  z-index: 6;

  svg {
    width: 3rem;
    height: 3rem;
  }

  &:hover {
    background-color: var(--color-brand-700);
  }

  @media only screen and (max-width: 50em) {
    bottom: 12%;
    right: 8%;
    padding: 2.4rem;
    svg {
      width: 3.6rem;
      height: 3.6rem;
    }
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
