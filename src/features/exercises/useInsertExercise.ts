import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertExercise as insertExerciseApi } from "../../services/exercisesApi";

function useInsertExercise() {
  const queryClient = useQueryClient();
  const {
    mutate: insertExercise,
    isError,
    isPending,
  } = useMutation({
    mutationFn: insertExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { insertExercise, isError, isPending };
}

export default useInsertExercise;
