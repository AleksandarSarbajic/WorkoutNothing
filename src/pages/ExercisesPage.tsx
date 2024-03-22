import styled from "styled-components";
import Heading from "../UI/Heading";
import Row from "../UI/Row";
import ExercisesTable from "../features/exercises/ExercisesTable";
import ExercisesTableOperations from "../features/exercises/ExercisesTableOperations";

const ExerciseHeading = styled(Row)`
  @media only screen and (max-width: 50em) {
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
  }
`;

function ExercisesPage() {
  return (
    <>
      <ExerciseHeading $type="horizontal">
        <Heading as="h1">All Exercises</Heading>
        <ExercisesTableOperations />
      </ExerciseHeading>

      <Row>
        <ExercisesTable />
      </Row>
    </>
  );
}

export default ExercisesPage;
