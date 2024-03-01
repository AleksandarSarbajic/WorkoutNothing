import Row from "../../UI/Row";
import Menus from "../../context/Menus";
import Modal from "../../context/Modal";
import Timer from "../../context/Timer";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Workout, { useWorkout } from "./Workout";
import WorkoutAddExercises from "./WorkoutAddExercises";
import WorkoutHeading from "./WorkoutHeading";

function WorkoutExercises() {
  const {
    state: { selectIsOpen, exercises },
  } = useWorkout();
  function handler() {
    console.log("clicked");
  }
  const ref = useOutsideClick<HTMLDivElement>(handler);

  return (
    <Row ref={ref} style={{ padding: "4rem 4.8rem 6.4rem" }}>
      {!selectIsOpen ? (
        <Timer>
          <Modal>
            <Menus>
              <Row>
                <WorkoutHeading />
              </Row>
              <Row>
                <Workout.Name />
                <Workout.Note
                  type="workout"
                  placeholder="Workout Note"
                  id={"workout"}
                />
              </Row>
              <Row>
                {exercises.map((exercise) => (
                  <Workout.Exercise
                    key={exercise.uniqueId}
                    exercise={exercise}
                  />
                ))}
              </Row>
              <Row>
                <Workout.AddCancel />
              </Row>
            </Menus>
          </Modal>
        </Timer>
      ) : (
        <WorkoutAddExercises />
      )}
    </Row>
  );
}

export default WorkoutExercises;
