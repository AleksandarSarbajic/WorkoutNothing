import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExercise as updateExerciseApi } from "../../services/exercisesApi";

function useUpdateExercise() {
  const queryClient = useQueryClient();
  const {
    mutate: updateExercise,
    isError,
    isPending,
  } = useMutation({
    mutationFn: updateExerciseApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { updateExercise, isError, isPending };
}

export default useUpdateExercise;
