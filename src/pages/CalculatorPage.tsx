import styled from "styled-components";
import Calculator from "../UI/Calculator";
import Heading from "../UI/Heading";
import Row from "../UI/Row";

const StyledText = styled.p`
  width: 80%;
  @media only screen and (max-width: 27.5em) {
    width: 90%;
  }
  @media only screen and (max-width: 25em) {
    width: 95%;
  }
`;

function CalculatorPage() {
  return (
    <>
      <Row>
        <Heading as="h1">One Rep Max Calculator</Heading>
        <StyledText>
          Calculate your one-rep max (1RM) for any lift. Your one-rep max is the
          max weight you can lift for a single repetition for a given exercise.
        </StyledText>
        <Calculator />
      </Row>
    </>
  );
}

export default CalculatorPage;
