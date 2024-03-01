import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getExercise } from "../../services/exercisesApi";

function useExercise() {
  const { exerciseId } = useParams();

  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: () => getExercise(Number(exerciseId)),
    retry: false,
  });
  return { exercise, isLoading, error };
}

export default useExercise;
