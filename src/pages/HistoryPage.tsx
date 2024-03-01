import styled from "styled-components";
import Heading from "../UI/Heading";
import Row from "../UI/Row";
import WorkoutRecapItem from "../UI/WorkoutRecapItem";

import HistoryCalendar from "../UI/HistoryCalendar";
import useWorkoutRange from "../features/workout/useWorkoutRange";
import { WorkoutSupabase } from "../types/WorkoutTypes";

const StyledBox = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 1 / -1;
  gap: 3rem;
`;
export const StyledWorkouts = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 38rem));
  gap: 2rem;

  @media only screen and (max-width: 43.75em) {
    grid-template-columns: 1fr;
  }
`;

function HistoryPage() {
  const { workouts, isLoading } = useWorkoutRange();
  console.log(workouts);
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">History</Heading>
        <HistoryCalendar />
      </Row>

      <Row>
        <StyledWorkouts>
          <>
            {workouts
              ?.slice()
              .sort((a: WorkoutSupabase, b: WorkoutSupabase) =>
                b.start_time.localeCompare(a.start_time)
              )
              .map((workout: WorkoutSupabase) => (
                <WorkoutRecapItem
                  workout={workout}
                  key={workout.id}
                  isLoading={isLoading}
                />
              ))}
            {workouts && workouts.length === 0 && (
              <StyledBox>
                <Heading as="h1">No workouts found</Heading>
              </StyledBox>
            )}
          </>
        </StyledWorkouts>
      </Row>
    </>
  );
}

export default HistoryPage;
