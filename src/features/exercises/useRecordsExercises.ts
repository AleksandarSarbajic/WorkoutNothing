import { useQuery } from "@tanstack/react-query";

import { getUserExercises } from "../../services/exercisesApi";

function useRecordsExercises() {
  const {
    data: user_exercises,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user_exercises"],
    queryFn: getUserExercises,
  });
  return { user_exercises, isLoading, error };
}

export default useRecordsExercises;
