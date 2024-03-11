import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertWorkout as insertWorkoutApi } from "../../services/workoutApi";
import { useNavigate } from "react-router-dom";

function useInsertWorkout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: insertWorkout,
    isError,
    isPending,
  } = useMutation({
    mutationFn: insertWorkoutApi,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["workout"] });
      console.log(data);
      navigate(`/history/${data[0].id}`);
    },
  });

  return { insertWorkout, isError, isPending };
}

export default useInsertWorkout;
