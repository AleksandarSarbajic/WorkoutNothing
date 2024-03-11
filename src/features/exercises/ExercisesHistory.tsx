import { useParams } from "react-router-dom";
import useWorkouts from "../workout/useWorkouts";
import { ExerciseType, WorkoutSupabase } from "../../types/WorkoutTypes";
import { StyledWorkouts } from "../../pages/HistoryPage";
import Heading from "../../UI/Heading";
import ExerciseRecapItem from "../../UI/ExerciseRecapItem";

import Skeleton from "react-loading-skeleton";

function ExercisesHistory() {
  const { exerciseId } = useParams();

  const { workouts = [], isLoading } = useWorkouts();

  const history = workouts.filter((workout) => {
    return workout.exercises.some(
      (exercise: ExerciseType) => exercise.id === +exerciseId!
    );
  });

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

  if (history && history.length === 0)
    return (
      <div>
        <Heading as={"h1"} style={{ textAlign: "center", marginTop: "10rem" }}>
          Exercise wasnt performed once in any of your workouts😀
        </Heading>
      </div>
    );

  return (
    <div>
      <StyledWorkouts>
        {history?.map((workout: WorkoutSupabase) => (
          <ExerciseRecapItem
            workout={workout}
            key={workout.id}
            isLoading={isLoading}
            id={+exerciseId!}
          />
        ))}
      </StyledWorkouts>
    </div>
  );
}

export default ExercisesHistory;
