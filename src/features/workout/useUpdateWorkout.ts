import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkout as updateWorkoutApi } from "../../services/workoutApi";

function useUpdateWorkout() {
  const queryClient = useQueryClient();
  const {
    mutate: updateWorkout,
    isError,
    isPending,
  } = useMutation({
    mutationFn: updateWorkoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { updateWorkout, isError, isPending };
}

export default useUpdateWorkout;
