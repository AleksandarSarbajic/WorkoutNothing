import styled from "styled-components";

const AuthInput = styled.input`
  display: block;
  width: 100%;
  height: calc(5.6rem + 2px);
  padding: 1.6rem 0;

  color: #161317;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid rgba(22, 19, 23, 0.3);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-left: none;
  border-right: none;
`;
export default AuthInput;
