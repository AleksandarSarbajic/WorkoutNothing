import { useQuery } from "@tanstack/react-query";
import { getTemplate } from "../../services/apiTemplates";
import { useParams } from "react-router-dom";

function useTemplate() {
  const { workoutId } = useParams();

  const {
    data: template,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["template", workoutId],
    queryFn: () => getTemplate(+workoutId!),
  });

  return { template, isLoading, error };
}

export default useTemplate;
