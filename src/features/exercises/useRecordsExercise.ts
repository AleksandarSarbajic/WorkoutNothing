import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserExercise } from "../../services/exercisesApi";

function useRecordsExercise(id?: number) {
  const { exerciseId } = useParams();

  const {
    data: user_exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user_exercise", exerciseId ? Number(exerciseId) : id],
    queryFn: () => getUserExercise(Number(exerciseId || id)),
  });
  return { user_exercise, isLoading, error };
}

export default useRecordsExercise;
