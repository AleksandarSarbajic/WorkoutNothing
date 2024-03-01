import { useQuery } from "@tanstack/react-query";
import { getMeasures } from "../../services/measures";

function useMeasures() {
  const {
    data: measures,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["measures"],
    queryFn: getMeasures,
  });

  return { measures, isLoading, error };
}

export default useMeasures;
