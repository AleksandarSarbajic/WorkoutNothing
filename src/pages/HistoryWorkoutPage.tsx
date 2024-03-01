import ButtonText from "../UI/ButtonText";
import Row from "../UI/Row";
import WorkoutItem from "../UI/WorkoutItem";
import WorkoutHistoryHeading from "../features/workout/WorkoutHistoryHeading";
import { useMoveBack } from "../hooks/useMoveBack";

function HistoryWorkoutPage() {
  const moveBack = useMoveBack();

  return (
    <>
      <Row $type="horizontal">
        <ButtonText style={{ fontSize: "2rem" }} onClick={moveBack}>
          &larr; Back
        </ButtonText>
        <WorkoutHistoryHeading />
      </Row>

      <Row>
        <WorkoutItem />
      </Row>
    </>
  );
}

export default HistoryWorkoutPage;
