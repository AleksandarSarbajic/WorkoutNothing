import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertWorkout as insertWorkoutApi } from "../../services/workoutApi";

function useInsertWorkout() {
  const queryClient = useQueryClient();
  const {
    mutate: insertWorkout,
    isError,
    isPending,
  } = useMutation({
    mutationFn: insertWorkoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout"] });
    },
  });

  return { insertWorkout, isError, isPending };
}

export default useInsertWorkout;
