import { useParams } from "react-router-dom";
import useWorkouts from "../workout/useWorkouts";
import { ExerciseType, WorkoutSupabase } from "../../types/WorkoutTypes";
import { StyledWorkouts } from "../../pages/HistoryPage";
import WorkoutRecapItem from "../../UI/WorkoutRecapItem";
import Heading from "../../UI/Heading";

function ExercisesHistory() {
  const { exerciseId } = useParams();

  const { workouts = [], isLoading } = useWorkouts();

  const history = workouts.filter((workout) => {
    return workout.exercises.some(
      (exercise: ExerciseType) => exercise.id === +exerciseId!
    );
  });
  if (history.length === 0)
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
          <WorkoutRecapItem
            workout={workout}
            key={workout.id}
            isLoading={isLoading}
          />
        ))}
      </StyledWorkouts>
    </div>
  );
}

export default ExercisesHistory;
