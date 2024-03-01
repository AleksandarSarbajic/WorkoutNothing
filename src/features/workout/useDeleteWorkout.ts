import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout as deleteWorkoutApi } from "../../services/workoutApi";
import { useNavigate, useParams } from "react-router-dom";

function useDeleteWorkout() {
  const navigate = useNavigate();

  const { historyId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: deleteWorkout,
    isError,
    isPending,
  } = useMutation({
    mutationFn: () => deleteWorkoutApi(+historyId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      navigate(-1);
    },
  });

  return { deleteWorkout, isError, isPending };
}

export default useDeleteWorkout;
