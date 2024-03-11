import styled from "styled-components";

const AuthInput = styled.input`
  display: block;
  width: 100%;
  height: calc(5.6rem + 2px);
  padding: 1.6rem 0;

  color: var(--login-color);
  background-color: transparent;
  background-clip: padding-box;
  border: var(--login-border);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-left: none;
  border-right: none;
`;
export default AuthInput;
