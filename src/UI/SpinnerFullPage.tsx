import styled from "styled-components";
import Spinner from "./Spinner";
const StyledContainer = styled.div`
  height: 100dvh;
  width: 100vw;
`;

function SpinnerFullPage() {
  return (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  );
}

export default SpinnerFullPage;
