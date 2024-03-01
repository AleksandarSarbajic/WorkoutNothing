import styled, { css } from "styled-components";

interface FormProps {
  $type?: "regular" | "small" | "login" | "modal";
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.$type === "login" &&
    css`
      max-width: 40.6rem;
      width: 100%;
      padding: 5.6rem 2.4rem;
      background-color: var(--color-grey-750);
    `}

  ${(props) =>
    props.$type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$type === "modal" &&
    css`
      width: 80rem;
    `}

    overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  $type: "regular",
};

export default Form;
