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
  width: 100%;
  min-height: 100dvh;
  /* max-width: 120rem; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  overflow-y: scroll;

  padding: 4rem 10% 12rem 10%;

  @media only screen and (max-width: 75em) {
    padding: 4rem 7.5% 16rem;
  }
  @media only screen and (max-width: 62.5em) {
    padding: 4rem 5% 16rem;
  }
  @media only screen and (max-width: 50em) {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
  }
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
    <StyledWorkout ref={ref}>
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
