import React from "react";
import styled, { css } from "styled-components";

const StyledFormRow = styled.div<{ $grid?: string; $buttons?: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;

  ${(props) => props.$grid && `grid-template-columns: ${props.$grid};`}

  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
  @media only screen and (max-width: 50em) {
    ${(props) =>
      !props.$buttons &&
      css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      `}
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({
  label,
  error,
  children,
  style,
  buttons,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
  style?: string;
  buttons?: boolean;
}) {
  return (
    <StyledFormRow $grid={style} $buttons={buttons}>
      {label && React.isValidElement(children) && (
        <Label htmlFor={children.props.id}>{label}</Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
