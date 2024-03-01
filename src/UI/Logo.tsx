import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
  @media only screen and (max-width: 50em) {
    display: none;
  }
`;

const Img = styled.img`
  height: 16rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = !isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
