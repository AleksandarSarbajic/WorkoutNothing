import styled from "styled-components";
import ButtonText from "../UI/ButtonText";
import ExerciseSection from "../UI/ExerciseSection";
import Heading from "../UI/Heading";
import PageFilter from "../UI/PageFilter";
import Row from "../UI/Row";
import Spinner from "../UI/Spinner";
import TableOperations from "../UI/TableOperations";

import useExercise from "../features/exercises/useExercise";
import { useMoveBack } from "../hooks/useMoveBack";

const ExerciseHeading = styled(Row)`
  @media only screen and (max-width: 50em) {
    flex-direction: column;
    align-items: center;
    gap: 3.4rem;
  }
`;

function ExercisePage() {
  const { exercise, isLoading } = useExercise();
  const moveBack = useMoveBack();

  const options =
    exercise?.instructions.length === 0
      ? [
          { value: "history", label: "History" },
          { value: "charts", label: "Charts" },
          { value: "records", label: "Records" },
        ]
      : [
          { value: "about", label: "About" },
          { value: "history", label: "History" },
          { value: "charts", label: "Charts" },
          { value: "records", label: "Records" },
        ];

  return (
    <>
      <Row $type="horizontal">
        <ButtonText style={{ fontSize: "2rem" }} onClick={moveBack}>
          &larr; Back
        </ButtonText>
        <div />
      </Row>
      <ExerciseHeading $type="horizontal">
        <Heading as="h1">{exercise?.name}</Heading>
        <TableOperations>
          <PageFilter filterField="page" options={options} />
        </TableOperations>
      </ExerciseHeading>
      <Row>
        {isLoading ? <Spinner /> : <ExerciseSection exercise={exercise} />}
      </Row>
    </>
  );
}

export default ExercisePage;
