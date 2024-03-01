import { useQuery } from "@tanstack/react-query";
import { getUserExercise } from "../../services/exercisesApi";

function useRecordsExerciseRow(id?: number) {
  const {
    data: user_exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user_exercise_row", id],
    queryFn: () => getUserExercise(Number(id)),
  });
  return { user_exercise, isLoading, error };
}

export default useRecordsExerciseRow;
