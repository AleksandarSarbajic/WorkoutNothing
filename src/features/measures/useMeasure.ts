import { useQuery } from "@tanstack/react-query";
import { getMeasure } from "../../services/measures";
import { useParams } from "react-router-dom";

function useMeasure() {
  const { measureId = "weight" } = useParams();
  const {
    data: measure,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["measures", measureId],
    queryFn: () => getMeasure(measureId),
  });

  return { measure, isLoading, error };
}

export default useMeasure;
