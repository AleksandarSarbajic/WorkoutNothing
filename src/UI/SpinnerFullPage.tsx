import styled from "styled-components";
import Spinner from "./Spinner";
const StyledContainer = styled.div`
  height: 100dvh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function SpinnerFullPage() {
  return (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  );
}

export default SpinnerFullPage;
