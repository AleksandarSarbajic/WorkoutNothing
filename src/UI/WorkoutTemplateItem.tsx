import styled, { css } from "styled-components";
import Heading from "./Heading";

import { useNavigate } from "react-router-dom";
import { TemplateExercise, TemplateTypes } from "../types/TemplateTypes";
import { useWorkout } from "../features/workout/Workout";
import { useSettings } from "../features/settings/useSettings";
import useRecordsExercises from "../features/exercises/useRecordsExercises";

import { findClosestExercises, groupExercises } from "../utils/helpers";
import Modal from "../context/Modal";
import Confirm from "./Confirm";
import { useTimerHandler } from "../context/Timer";

const Button = styled.button`
  font-size: 2rem;
  width: 100%;
  background-color: var(--color-brand-500);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem 2rem;
  margin-top: 5rem;

  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const Flex = css`
  display: flex;
  align-items: center;
`;

const Exercise = styled.div<{ $superSet?: string }>`
  ${(props) =>
    props.$superSet &&
    css`
      border-left: 4px solid ${props.$superSet};
      padding-left: 2rem;
      margin-left: -2.2rem;
    `}
`;

const ExerciseHeading = styled.div`
  ${Flex}
  justify-content: space-between;
  font-size: 2.2rem;

  margin: 0.5rem 0 1rem;
`;

const StyledExercises = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  justify-content: center;
  gap: 1rem;
  font-size: 1.8rem;

  & > p:first-child {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
`;

const StyledQuestion = styled.button`
  position: relative;
  & div {
    opacity: 0;
    position: absolute;
    padding: 1rem 1.6rem;
    background-color: var(--color-grey-0);
    font-size: 1.6rem;
    transition: all 0.3s;
    top: -2rem;
    right: 2rem;
    border-radius: var(--border-radius-sm);
  }
  &:hover {
    div {
      opacity: 1;
    }
  }
`;

function WorkoutTemplateItem({ item }: { item: TemplateTypes }) {
  const { settings } = useSettings();

  const {
    dispatch,
    state: { status },
    time: { reset },
  } = useWorkout();
  const { user_exercises = [] } = useRecordsExercises();
  const { handleRestart } = useTimerHandler();

  const navigate = useNavigate();

  function handleStartFromTemplate() {
    const filteredUserExercises = user_exercises.filter((userExercise) =>
      item?.exercises.some(
        (exercise) => exercise.id === userExercise.exercise_id
      )
    );
    const groupedExercises = groupExercises(filteredUserExercises);

    const closestExercises = findClosestExercises(groupedExercises);

    const itemForSending = {
      ...item,
      exercises: item.exercises.map((exercise) => {
        const itemExercise = closestExercises.find(
          (ex) => (ex.exercise_id ?? ex.id) === exercise.id
        );

        const items = exercise.sets.map((set, index) => {
          return {
            ...set,
            selected: false,
            previous: itemExercise ? itemExercise.sets[index]?.previous : null,
          };
        });

        return {
          ...exercise,
          sets: items,
        };
      }),
    };

    dispatch({
      type: "START_TEMPLATE",
      payload: { item: itemForSending, unit: settings?.weight, settings },
    });

    reset();
  }

  return (
    <div>
      <Heading as="h1" style={{ marginBottom: "1rem" }}>
        {item?.name}
      </Heading>

      <StyledExercises>
        {item?.exercises?.map((exercise: TemplateExercise) => (
          <Exercise key={exercise.id}>
            <ExerciseHeading>
              <Heading as="h3" style={{ marginBottom: "1rem" }}>
                {exercise.sets.length} x {exercise.name}
              </Heading>
              <StyledQuestion
                onClick={() => {
                  navigate(`/exercises/${exercise.id}?page=about`);
                }}
              >
                ?<div>Instructions</div>
              </StyledQuestion>
            </ExerciseHeading>
          </Exercise>
        ))}
      </StyledExercises>
      <Modal>
        {status !== "idle" ? (
          <>
            <Modal.Open opens="perfrom-again-history">
              <Button>Perform Again</Button>
            </Modal.Open>
            <Modal.Window name="perfrom-again-history">
              <Confirm
                resourceName="Workout in progress"
                text="You are currently performing a workout. Are you sure you want to start a new one?"
                confirmText="Start a new one"
                onConfirm={() => {
                  handleStartFromTemplate();
                  handleRestart();
                }}
              />
            </Modal.Window>
          </>
        ) : (
          <Button
            onClick={() => {
              handleStartFromTemplate();
              handleRestart();
            }}
          >
            Start Workout
          </Button>
        )}
      </Modal>
    </div>
  );
}

export default WorkoutTemplateItem;
