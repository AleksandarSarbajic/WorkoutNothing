import { useRef } from "react";
import Row from "../../UI/Row";
import Menus from "../../context/Menus";
import Modal from "../../context/Modal";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import Workout, { useWorkout } from "./Workout";
import WorkoutAddExercises from "./WorkoutAddExercises";
import WorkoutHeading from "./WorkoutHeading";
import styled from "styled-components";

const StyledWorkout = styled.div`
  min-height: 100dvh;
`;

function WorkoutExercises() {
  const modalRef = useRef(null);
  const menusRef = useRef(null);
  const { dispatch } = useWorkout();
  const modalAndMenusRefs = [modalRef, menusRef];

  const {
    state: { selectIsOpen, exercises },
  } = useWorkout();
  function handler() {
    dispatch({ type: "OPEN_CLOSE" });
  }

  const ref = useOutsideClick<HTMLDivElement>(handler, true, modalAndMenusRefs);

  return (
    <StyledWorkout ref={ref} style={{ padding: "4rem 4.8rem 6.4rem" }}>
      {!selectIsOpen ? (
        <Modal ref={modalRef}>
          <Menus ref={menusRef}>
            <Row>
              <WorkoutHeading />
            </Row>
            <Row style={{ marginBottom: "2.4rem" }}>
              <Workout.Name />
              <Workout.Note
                type="workout"
                placeholder="Workout Note"
                id={"workout"}
              />
            </Row>

            <Row>
              {exercises.map((exercise) => (
                <Workout.Exercise key={exercise.uniqueId} exercise={exercise} />
              ))}
            </Row>
            <Row>
              <Workout.AddCancel />
            </Row>
          </Menus>
        </Modal>
      ) : (
        <WorkoutAddExercises />
      )}
    </StyledWorkout>
  );
}

export default WorkoutExercises;
