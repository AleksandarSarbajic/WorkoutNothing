import Heading from "../UI/Heading";
import Row from "../UI/Row";
import ExercisesTable from "../features/exercises/ExercisesTable";
import ExercisesTableOperations from "../features/exercises/ExercisesTableOperations";

function ExercisesPage() {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All Exercises</Heading>
        <ExercisesTableOperations />
      </Row>

      <Row>
        <ExercisesTable />
      </Row>
    </>
  );
}

export default ExercisesPage;
