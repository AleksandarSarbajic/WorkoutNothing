import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMeasure as addMeasureApi } from "../../services/measures";

function useAddMeasure() {
  const queryClient = useQueryClient();
  const {
    mutate: addMeasure,
    isPending,
    error,
  } = useMutation({
    mutationFn: addMeasureApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measures"] });
    },
  });
  return { addMeasure, isPending, error };
}

export default useAddMeasure;
