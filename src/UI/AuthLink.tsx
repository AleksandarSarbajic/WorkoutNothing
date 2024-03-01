import { Link } from "react-router-dom";
import styled from "styled-components";
interface LoginLinkProps {
  text: string;
  link: string;
  linkText: string;
  margin?: string;
}
const StyledAuthLink = styled.p`
  font-weight: 400;
  text-align: center;
  a {
    text-decoration: underline;
    color: #d71921;
  }
`;

function AuthLink({ text, link, linkText, margin = "0rem" }: LoginLinkProps) {
  return (
    <StyledAuthLink style={{ marginTop: margin }}>
      {text} <Link to={link}>{linkText}</Link>
    </StyledAuthLink>
  );
}

export default AuthLink;
