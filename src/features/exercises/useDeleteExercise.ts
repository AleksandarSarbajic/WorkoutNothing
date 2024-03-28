import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteExercise as deleteExerciseApi } from "../../services/exercisesApi";

function useDeleteExercise() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteExercise,
    isError,
    isPending,
  } = useMutation({
    mutationFn: deleteExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { deleteExercise, isError, isPending };
}

export default useDeleteExercise;
