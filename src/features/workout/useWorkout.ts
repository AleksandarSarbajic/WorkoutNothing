import { useQuery } from "@tanstack/react-query";
import { getWorkout as getWorkoutApi } from "../../services/workoutApi";
import { useParams } from "react-router-dom";

function useWorkout() {
  const { historyId } = useParams();

  const {
    data: workout,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workout", historyId ?? ""],
    queryFn: () => getWorkoutApi(+historyId!),
  });

  return { workout, isLoading, error };
}

export default useWorkout;
