import { format } from "date-fns";

import Heading from "./Heading";
import styled, { css } from "styled-components";
import { HiClock } from "react-icons/hi2";
import { ExerciseType, WorkoutSupabase } from "../types/WorkoutTypes";
import { FaTrophy, FaWeightHanging } from "react-icons/fa6";
import {
  adjustMeasurement,
  calculateTotalWeightLifted,
} from "../utils/helpers";
import {
  findIndexOfHighestItem,
  totalWeightLiftedBySet,
} from "../utils/helpers";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../features/settings/useSettings";

const Flex = css`
  display: flex;
  align-items: center;
`;

const StyledWorkout = styled.li`
  padding: 2rem;
  background-color: var(--workout-bg-color);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-400);
  box-shadow: var(--shadow-md);
  &:hover {
    cursor: pointer;
    background-color: var(--workout-hover-color);
  }
`;

const IconsBox = styled.div`
  ${Flex}
  gap: 2rem;
  margin-top: 0.5rem;
`;

const IconBox = styled.div`
  ${Flex}
  gap: 0.5rem;
  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const ExerciseHeading = styled.div`
  ${Flex}
  justify-content: space-between;
  font-size: 1.7rem;
  border-bottom: 1px solid var(--color-grey-400);
  margin: 0.5rem 0 1rem;
`;

const StyledExercises = styled.ul`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 0.5rem;
`;
const StyledExercise = styled.li<{ $superSet?: string }>`
  ${Flex}
  justify-content: space-between;
  ${(props) => props.$superSet && `border-left: 2px solid ${props.$superSet};`}
  ${(props) =>
    props.$superSet &&
    css`
      padding-left: 1rem;
      margin-left: -1.3rem;
    `}
 
  & > p:first-child {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
function WorkoutRecapItem({
  workout,
  isLoading,
}: {
  workout: WorkoutSupabase;
  isLoading: boolean;
}) {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const totalWeightLifted = calculateTotalWeightLifted({ workout: workout });

  const totalWeightSets = totalWeightLiftedBySet({ workout: workout });
  const indexOfHighestSet = findIndexOfHighestItem(totalWeightSets);
  const adjusted = adjustMeasurement(
    totalWeightLifted?.reduce((acc, weight) => acc + weight, 0) || 0,
    workout.unit,
    settings
  );

  if (isLoading)
    return (
      <Skeleton
        count={30}
        style={{
          height: "17rem",
          margin: "0.8rem 0",
          borderRadius: "0.5rem",
        }}
        inline={true}
      />
    );

  return (
    <StyledWorkout onClick={() => navigate(`/history/${workout.id}`)}>
      <Heading as={"h3"} style={{ marginBottom: "0.5rem" }}>
        {workout.name}
      </Heading>
      <p style={{ opacity: "0.7" }}>
        {format(new Date(workout.end_time), "MMMM d")}
      </p>
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
      <ExerciseHeading>
        <p>Exercise</p>
        <p>Best set</p>
      </ExerciseHeading>
      <StyledExercises>
        {workout.exercises?.map(
          (exercise: ExerciseType, exerciseIndex: number) => {
            const adjustedWeight = adjustMeasurement(
              exercise.sets?.[
                indexOfHighestSet[exerciseIndex]
              ].weight?.toString() || "",
              workout.unit,
              settings
            );

            return typeof exercise === "object" && exercise !== null ? (
              <StyledExercise
                key={exercise.id}
                $superSet={
                  workout.superSets.find((item) => {
                    const filtered = item.items.find(
                      (item) => item === exercise.uniqueId
                    );
                    return filtered;
                  })?.color
                }
              >
                <p>
                  {exercise.sets.length} x {exercise.name}
                </p>
                <p>
                  {exercise.sets?.[indexOfHighestSet[exerciseIndex]].reps} x{" "}
                  {adjustedWeight.value}
                </p>
              </StyledExercise>
            ) : (
              <p>No exercises</p>
            );
          }
        )}
      </StyledExercises>
    </StyledWorkout>
  );
}

export default WorkoutRecapItem;
