import { format } from "date-fns";

import {
  ExerciseType,
  SuperSetType,
  WorkoutSupabase,
} from "../types/WorkoutTypes";
import Heading from "./Heading";
import styled, { css } from "styled-components";
import { FaTrophy, FaWeightHanging } from "react-icons/fa";
import { HiClock } from "react-icons/hi2";
import {
  adjustMeasurement,
  calculateTotalWeightLifted,
  oneRepMax,
} from "../utils/helpers";
import Skeleton from "react-loading-skeleton";
import { useSettings } from "../features/settings/useSettings";
import { useWorkout as useWorkoutContext } from "../features/workout/Workout";
import useWorkout from "../features/workout/useWorkout";
import Modal from "../context/Modal";
import Confirm from "./Confirm";

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

const IconsBox = styled.div`
  ${Flex}
  gap: 2.4rem;
  margin-top: 1rem;
`;

const IconBox = styled.div`
  ${Flex}
  gap: 1rem;
  font-size: 2rem;
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const ExerciseHeading = styled.div`
  ${Flex}
  justify-content: space-between;
  font-size: 2.2rem;
  border-bottom: 1px solid var(--color-grey-400);
  margin: 0.5rem 0 1rem;
`;

const StyledExercises = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  justify-content: center;
  gap: 3rem;
  font-size: 1.8rem;

  & > p:first-child {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
`;
const StyledExercise = styled.li`
  display: flex;
  justify-content: space-between;

  & > p:first-child {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const StyledRecordBox = styled.div`
  margin-top: 1rem;
  ${Flex};
  gap: 1.4rem;
`;
const StyledExerciseSet = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledRecord = styled.div`
  ${Flex}
  border: 1px solid var(--color-grey-400);
  border-radius: 3rem;

  padding: 0.5rem 1.6rem;
  font-size: 1.6rem;
  gap: 2rem;
  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

function WorkoutItem() {
  const {
    dispatch,
    state: { status },
    time: { reset },
  } = useWorkoutContext();
  const { settings } = useSettings();
  const { workout, isLoading } = useWorkout();
  const workoutType = workout as WorkoutSupabase;
  console.log(workoutType);
  if (isLoading)
    return (
      <Skeleton
        count={5}
        style={{
          height: "17rem",
          margin: "0.8rem 0",
          borderRadius: "0.5rem",
        }}
        inline={true}
      />
    );

  function performAgainHandler() {
    const itemForSending = {
      ...workoutType,
      exercises: workoutType.exercises.map((exercise) => {
        const items = exercise.sets.map((set) => {
          return {
            ...set,
            selected: false,
          };
        });
        return {
          ...exercise,
          sets: items,
        };
      }),
    };

    dispatch({ type: "PERFORM_AGAIN", payload: itemForSending });

    reset();
  }

  const totalWeightLifted = calculateTotalWeightLifted({
    workout: workoutType,
  });

  const adjusted = adjustMeasurement(
    totalWeightLifted?.reduce((acc, weight) => acc + weight, 0) || 0,
    workout.unit,
    settings
  );

  const renderExerciseSets = (exercise: ExerciseType) => (
    <div>
      {exercise.sets.map((item) => {
        const adjustedWeight = adjustMeasurement(
          item.weight ?? 0,
          workout.unit,
          settings
        );
        const oneRM = oneRepMax(item.weight, item.reps);
        const adjustedOneRM = adjustMeasurement(
          oneRM ?? 0,
          workout.unit,
          settings
        );

        return (
          <StyledExercise key={item.id}>
            <div style={{ marginBottom: "2rem" }}>
              <StyledExerciseSet>
                <span>{item.set}</span>
                <p>
                  {adjustedWeight.value} {adjustedWeight.unit} x {item.reps}
                </p>
              </StyledExerciseSet>
              {exercise.records.map((record) => {
                if (
                  (record.weight && record.weight.setId === item.id) ||
                  (record.volume && record.volume.setId === item.id) ||
                  (record.RM && record.RM.setId === item.id)
                ) {
                  return (
                    <StyledRecordBox key={record.id}>
                      {record.weight && record.weight.setId === item.id && (
                        <StyledRecord>
                          <FaTrophy /> <span>Weight</span>
                        </StyledRecord>
                      )}
                      {record.volume && record.volume.setId === item.id && (
                        <StyledRecord>
                          <FaTrophy /> <span>Volume</span>
                        </StyledRecord>
                      )}
                      {record.RM && record.RM.setId === item.id && (
                        <StyledRecord>
                          <FaTrophy /> <span>1 RM</span>
                        </StyledRecord>
                      )}
                    </StyledRecordBox>
                  );
                }
                return null;
              })}
            </div>
            <div style={{ textAlign: "right" }}>
              {adjustedOneRM.value} {adjustedOneRM.unit}
            </div>
          </StyledExercise>
        );
      })}
    </div>
  );

  return (
    <div>
      <Heading as="h1" style={{ marginBottom: "1rem" }}>
        {workoutType.name}
      </Heading>
      <p style={{ opacity: "0.7", fontSize: "1.8rem" }}>
        {format(new Date(workoutType.end_time), "EEEE, MMMM d, yyyy h:mm a")}
      </p>
      {workout.note && (
        <p style={{ margin: "1rem 0", fontSize: "1.7rem", opacity: "0.8" }}>
          Note : {workoutType.note}
        </p>
      )}
      <IconsBox>
        <IconBox>
          <HiClock />
          {workout.workout_time}
        </IconBox>
        <IconBox>
          <FaWeightHanging />
          {adjusted.value} {adjusted.unit}
        </IconBox>
        <IconBox>
          <FaTrophy />
          {workout.records} PRS
        </IconBox>
      </IconsBox>

      <StyledExercises>
        {workoutType.exercises?.map((exercise: ExerciseType) => (
          <Exercise
            key={exercise.id}
            $superSet={
              workout.superSets.find((item: SuperSetType) =>
                item.items.includes(exercise.uniqueId)
              )?.color
            }
          >
            <ExerciseHeading>
              <Heading as="h3" style={{ marginBottom: "1rem" }}>
                {exercise.name}
              </Heading>
              <p>1RM</p>
            </ExerciseHeading>
            {renderExerciseSets(exercise)}
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
                  performAgainHandler();
                }}
              />
            </Modal.Window>
          </>
        ) : (
          <Button
            onClick={() => {
              performAgainHandler();
            }}
          >
            Perform Again
          </Button>
        )}
      </Modal>
    </div>
  );
}

export default WorkoutItem;
