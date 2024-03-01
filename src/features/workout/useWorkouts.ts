import { useQuery } from "@tanstack/react-query";
import { getWorkouts } from "../../services/workoutApi";

function useWorkouts() {
  const {
    data: workouts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  return { workouts, isLoading, error };
}

export default useWorkouts;
