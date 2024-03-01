import styled from "styled-components";
import ProviderItem from "./ProviderItem";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const StyledProviderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.6rem 0;
`;

function ProviderContainer() {
  return (
    <StyledProviderContainer>
      <ProviderItem
        text="Continue with Google"
        icon={<FcGoogle />}
        provider="google"
      />
      <ProviderItem
        text="Continue with Apple"
        icon={<FaApple />}
        provider="github"
      />
    </StyledProviderContainer>
  );
}

export default ProviderContainer;
