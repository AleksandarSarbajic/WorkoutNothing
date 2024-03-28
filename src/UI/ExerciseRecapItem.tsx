import { format } from "date-fns";

import Heading from "./Heading";
import styled, { css } from "styled-components";

import { WorkoutSupabase } from "../types/WorkoutTypes";

import { adjustMeasurement, oneRepMax } from "../utils/helpers";

import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../features/settings/useSettings";
import { FaTrophy } from "react-icons/fa";

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

  justify-content: center;
  gap: 0.5rem;
`;
const StyledExercise = styled.li<{ $superSet?: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  ${(props) => props.$superSet && `border-left: 2px solid ${props.$superSet};`}
  ${(props) =>
    props.$superSet &&
    css`
      padding-left: 1rem;
      margin-left: -1.3rem;
    `}
 
  & > div:first-child {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const StyledRecordBox = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 9rem));
  gap: 1rem;
`;

const StyledRecord = styled.div`
  ${Flex}
  border: 1px solid var(--color-grey-400);
  border-radius: 3rem;

  padding: 0.4rem 1rem;
  font-size: 1.2rem;
  gap: 1rem;
  & svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

function ExerciseRecapItem({
  workout,
  isLoading,
  id,
}: {
  workout: WorkoutSupabase;
  isLoading: boolean;
  id: number;
}) {
  const { settings } = useSettings();
  const navigate = useNavigate();

  const exerciseFiltered = workout.exercises.filter(
    (exercise) => exercise.id === id
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
        {format(new Date(workout.end_time), "EEEE, MMMM d, y h:mm a")}
      </p>

      <ExerciseHeading>
        <p>Sets Performed</p>
        <p>1 RM</p>
      </ExerciseHeading>
      <StyledExercises>
        {exerciseFiltered[0].sets.map((set, index) => {
          const adjustedWeight = adjustMeasurement(
            set.weight ?? 0,
            exerciseFiltered[0].unit,
            settings
          );
          const oneRep = oneRepMax(set.weight ?? 0, set.reps);
          return (
            <StyledExercise key={set.id}>
              <div>
                {index + 1}. {adjustedWeight.value} {adjustedWeight.unit} x{" "}
                {set.reps}
                <div>
                  {exerciseFiltered[0].records.map((record) => {
                    if (
                      record.weight.setId === set.id ||
                      record.volume.setId === set.id ||
                      record.RM.setId === set.id
                    ) {
                      return (
                        <StyledRecordBox key={record.id}>
                          {record.weight.setId === set.id && (
                            <StyledRecord>
                              <FaTrophy /> <span>Weight</span>
                            </StyledRecord>
                          )}
                          {record.volume.setId === set.id && (
                            <StyledRecord>
                              <FaTrophy /> <span>Volume</span>
                            </StyledRecord>
                          )}
                          {record.RM.setId === set.id && (
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
              </div>
              <p>
                {
                  adjustMeasurement(
                    oneRep ?? 0,
                    exerciseFiltered[0].unit,
                    settings
                  ).value
                }{" "}
                {adjustedWeight.unit}
              </p>
            </StyledExercise>
          );
        })}
      </StyledExercises>
    </StyledWorkout>
  );
}

export default ExerciseRecapItem;
