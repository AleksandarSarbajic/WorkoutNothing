import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertExercises as insertExercisesApi } from "../../services/exercisesApi";

function useInsertExercises() {
  const queryClient = useQueryClient();
  const {
    mutate: insertExercises,
    isError,
    isPending,
  } = useMutation({
    mutationFn: insertExercisesApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { insertExercises, isError, isPending };
}

export default useInsertExercises;
