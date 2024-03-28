import styled, { css, keyframes } from "styled-components";

export const StyledButton = css`
  background-color: var(--color-brand-700);
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-50);
  &:hover {
    background-color: var(--color-brand-600);
  }
`;

export const StyledStart = styled.button`
  ${StyledButton}
`;
export const StyledTimer = styled.button`
  ${StyledButton};
  width: 100%;
`;
export const StyledName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & input {
    padding: 0.5rem 1rem;
    font-family: "Space Mono", sans-serif;
    font-size: 2.4rem;
    background-color: transparent;
    border: none;
    margin: 0 0 1rem -1rem;
  }
`;

export const StyledFinish = styled.button`
  background-color: var(--color-brand-700);
  padding: 1rem 2rem;
  text-transform: uppercase;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-50);
  &:hover {
    background-color: var(--color-brand-600);
  }
`;

export const StyledNote = styled.div<{ $pinned?: boolean }>`
  position: relative;
  & input {
    width: 40%;
    font-family: "Space Mono", sans-serif;
    background-color: var(--color-grey-200);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 0.7rem 2rem;
    ${(props) => props.$pinned && "background-color: var(--color-brand-500);"}
    &::placeholder {
      color: var(--color-grey-100);
      opacity: 0.7;
    }
  }

  & button {
    position: absolute;
    top: 50%;
    left: 36%;
    transform: translateY(-50%);
    outline: none;
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
  @media only screen and (max-width: 37.5em) {
    & input {
      width: 70%;
    }

    & button {
      position: absolute;
      top: 50%;
      left: 65%;
      transform: translateY(-50%);
      outline: none;
      & svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

export const StyledSortableItem = styled.div<{ $superSet?: string }>`
  cursor: pointer;
  margin: 0.5rem 0 0.5rem -1rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  border-radius: var(--border-radius-sm);
  &:hover {
    background-color: var(--color-grey-300);
  }
  ${(props) => props.$superSet && `border-left: 2px solid ${props.$superSet};`}
  ${(props) =>
    props.$superSet &&
    css`
      padding-left: 1rem;
      margin-left: -1.3rem;
    `}
`;

export const StyledAddCancel = styled.div`
  gap: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  & > button {
    padding: 0.5rem 0;
    text-transform: uppercase;
    color: var(--color-red-700);
    border-radius: var(--border-radius-sm);
    &:hover {
      background-color: rgba(185, 28, 28, 0.1);
    }
  }
  & > *:first-child {
    color: var(--color-brand-500);
    &:hover {
      background-color: rgba(99, 101, 241, 0.1);
    }
  }
`;

export const StyledExercise = styled.div<{ $superSet?: string }>`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: 2.4rem 3.2rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${(props) => props.$superSet && `border-left: 5px solid ${props.$superSet};`}

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  & > button:first-child {
    font-size: 20rem;
  }
  & > button:last-child {
    font-size: 1.8rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-brand-500);
    border-radius: var(--border-radius-sm);
    padding: 0.5rem 0;
    &:hover {
      background-color: rgba(99, 101, 241, 0.1);
    }
  }

  @media only screen and (max-width: 37.5em) {
    padding: 2.4rem;
  }
`;
export const StyledExerciseHeader = styled.div`
  grid-template-columns: 0.2fr 1fr 1fr 1fr 0.15fr;
  display: grid;

  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  text-align: center;
  @media only screen and (max-width: 37.5em) {
    grid-template-columns: 0.2fr 1fr 1.1fr 1.1fr 0.25fr;
  }
  @media only screen and (max-width: 31.25em) {
    grid-template-columns: 0.2fr 0.95fr 1.1fr 1.1fr 0.3fr;
  }
  @media only screen and (max-width: 28em) {
    grid-template-columns: 0.2fr 0.85fr 1.1fr 1.1fr 0.3fr;
  }
  @media only screen and (max-width: 25em) {
    gap: 2rem;
    grid-template-columns: 0.2fr 0.6fr 1fr 1fr 0.5fr;
  }
`;

export const CheckAnimation = keyframes`
0%{
  scale: 1.1;
}
100%{
  scale: 1;
}
`;

export const StyledSetButton = styled.span<{ $variation: string }>`
  font-weight: 600;
  /* width: 100%; */
  color: var(--color-brand-500);

  ${(props) => props.$variation === "warmup" && "color: #fb923c;"}
  ${(props) => props.$variation === "drop" && "color: #6d28d9;"}
  ${(props) => props.$variation === "failure" && "color: #ef4444;"}
`;

export const StyledSet = styled.div<{ $checked: boolean }>`
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr 1fr 0.1fr;

  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  text-align: center;
  padding: 1rem 0;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s ease-in-out;
  padding-right: 2rem;
  margin: 0.5rem -2rem 0.5rem 0;

  ${(props) => props.$checked && "background-color: rgba(21, 128, 60, 0.2);"}

  & input,
  & > button:last-child {
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius-sm);
  }
  & input[type="number"] {
    background-color: var(--color-grey-300);
    ${(props) => props.$checked && "background-color: rgba(21, 128, 60, 0.05);"}
  }
  & > button:last-child {
    background-color: var(--color-grey-300);

    padding: 0.6rem;
    display: flex;
    justify-content: flex-end;

    & svg {
      width: 2.2rem;
      height: 2.2rem;
    }
    ${(props) =>
      props.$checked &&
      css`
        background-color: var(--color-green-100);
        animation: ${CheckAnimation} 0.4s ease-in-out;
      `}
  }
  @media only screen and (max-width: 31.25em) {
    grid-template-columns: 0.2fr 0.9fr 1fr 1fr 0.1fr;
    margin: 0.5rem -0.5rem 0.5rem 0;
    padding-right: 1rem;
    padding-left: 0.5rem;
  }
  @media only screen and (max-width: 28em) {
    grid-template-columns: 0.2fr 0.9fr 1fr 1fr 0.1fr;
  }
  @media only screen and (max-width: 25em) {
    grid-template-columns: 0.2fr 0.8fr 1.1fr 1.1fr 0.1fr;
  }
`;

export const StyledRestTimer = styled.div`
  position: absolute;
  right: -1rem;
  top: 1rem;
  background-color: var(--color-grey-100);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  & > button:first-child {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`;

export const CreateSuperSetContainer = styled.div`
  & ul {
    height: 42.5rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 1rem;
    padding-right: 1rem;
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 1rem;
      background-color: var(--color-grey-700);
    }

    &::-webkit-scrollbar {
      width: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.9rem;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: var(--color-grey-0);
    }

    & li {
      display: flex;
      align-items: center;
      gap: 1rem;
      & span {
      }
    }
  }
  & div {
    margin-top: 3rem;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > button:last-child {
      /* padding: 1rem; */
    }
  }
`;

export const SuperSet = styled.span<{ $superSet?: string; $empty: boolean }>`
  width: 0.5rem;
  height: 4rem;
  background-color: var(--color-grey-300);
  ${(props) => props.$empty && "display: none;"}
  ${(props) => props.$superSet && `background-color: ${props.$superSet};`}
`;

export const SuperSetButton = styled.button<{
  $selected: boolean;
}>`
  text-align: start !important;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-100);
  ${(props) => props.$selected && "background-color: var(--color-grey-200);"}
  &:hover {
    background-color: var(--color-grey-300);
  }
`;
