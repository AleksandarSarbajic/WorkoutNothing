import ButtonText from "../UI/ButtonText";
import ExerciseSection from "../UI/ExerciseSection";
import Heading from "../UI/Heading";
import PageFilter from "../UI/PageFilter";
import Row from "../UI/Row";
import Spinner from "../UI/Spinner";
import TableOperations from "../UI/TableOperations";

import useExercise from "../features/exercises/useExercise";
import { useMoveBack } from "../hooks/useMoveBack";

function ExercisePage() {
  const { exercise, isLoading } = useExercise();
  const moveBack = useMoveBack();

  return (
    <>
      <Row $type="horizontal">
        <ButtonText style={{ fontSize: "2rem" }} onClick={moveBack}>
          &larr; Back
        </ButtonText>
        <div></div>
      </Row>
      <Row $type="horizontal">
        <Heading as="h1">{exercise?.name}</Heading>
        <TableOperations>
          <PageFilter
            filterField="page"
            options={[
              { value: "about", label: "About" },
              { value: "history", label: "History" },
              { value: "charts", label: "Charts" },
              { value: "records", label: "Records" },
            ]}
          />
        </TableOperations>
      </Row>
      <Row>
        {isLoading ? <Spinner /> : <ExerciseSection exercise={exercise} />}
      </Row>
    </>
  );
}

export default ExercisePage;
