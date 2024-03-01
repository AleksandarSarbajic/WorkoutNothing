import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../../services/exercisesApi";
interface FilterProps {
  filter: {
    method?: string;
    fields: string[];
    value: { body?: string[]; category?: string[] };
    search?: string;
  } | null;
}
function useExercises({ filter }: FilterProps) {
  const {
    data: exercises,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["exercises", filter],
    queryFn: () => getExercises({ filter }),
  });

  return { exercises, error, isLoading };
}

export default useExercises;
