import styled, { css } from "styled-components";

interface HeadingProps {
  as?: string;
  $caps?: boolean;
  $create?: boolean;
  $margin?: number;
  $color?: string;
}

const Heading = styled.h1<HeadingProps>`
  font-family: "Space Mono", sans-serif;
  line-height: 1.1;
  font-weight: 100;
  color: var(--color-grey-750);

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
    ${(props) =>
    props.$caps &&
    css`
      text-transform: uppercase;
    `}

    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 2.4rem;
    `}
    ${(props) =>
    props.as === "h6" &&
    css`
      font-size: 2rem;
    `}
    ${(props) =>
    props.$caps &&
    css`
      text-transform: uppercase;
    `}

    ${(props) =>
    props.$create &&
    css`
      flex: 1 1 0%;
      text-align: center;
    `}
`;

export default Heading;
