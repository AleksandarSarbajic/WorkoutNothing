import styled, { css } from "styled-components";

interface ButtonProps {
  $size?: "small" | "smallMedium" | "medium" | "large" | "login" | "cancel";
  $variation?: "login" | "primary" | "secondary" | "danger";
}

const sizes = {
  login: css`
    width: 100%;
    padding: 0.8rem 0;
    margin: 3.2rem 0;
  `,
  cancel: css`
    padding: 0.5rem;

    svg {
      height: 2.6rem;
      width: 2.6rem;
    }
  `,

  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  smallMedium: css`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  login: css`
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 50rem;
    color: #fff;
    background-color: #d71921;
    border-color: #d71921;

    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:hover {
      background-color: #b7151c;
    }
  `,
};

const Button = styled.button<ButtonProps>`
  border: none;

  ${(props) =>
    props.$size !== "login" &&
    css`
      border-radius: var(--border-radius-sm);
      box-shadow: var(--shadow-sm);
    `}

  ${(props) => sizes[props.$size as keyof typeof sizes]}
  ${(props) => variations[props.$variation as keyof typeof variations]}
`;

Button.defaultProps = {
  $variation: "primary",
  $size: "medium",
};

export default Button;
