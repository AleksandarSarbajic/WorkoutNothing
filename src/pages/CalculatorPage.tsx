import Calculator from "../UI/Calculator";
import Heading from "../UI/Heading";
import Row from "../UI/Row";

function CalculatorPage() {
  return (
    <>
      <Row>
        <Heading as="h1">One Rep Max Calculator</Heading>
        <p style={{ width: "80%" }}>
          Calculate your one-rep max (1RM) for any lift. Your one-rep max is the
          max weight you can lift for a single repetition for a given exercise.
        </p>
        <Calculator />
      </Row>
    </>
  );
}

export default CalculatorPage;
