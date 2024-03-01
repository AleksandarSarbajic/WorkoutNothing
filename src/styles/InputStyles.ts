import { css } from "styled-components";

export const InputStyles = css`
  border: none;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  /* padding: 1.4rem; */
  box-shadow: var(--shadow-md);
  color: var(--color-grey-100);
  &::placeholder {
    color: var(--color-grey-400);
  }
`;
