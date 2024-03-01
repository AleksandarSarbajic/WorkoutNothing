import { useQuery } from "@tanstack/react-query";
import { getWorkoutRange } from "../../services/workoutApi";
import { useSearchParams } from "react-router-dom";

function useWorkoutRange() {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";
  const {
    data: workouts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workouts", [startDate, endDate]],
    queryFn: () => getWorkoutRange({ startDate, endDate }),
  });

  return { workouts, isLoading, error };
}

export default useWorkoutRange;
