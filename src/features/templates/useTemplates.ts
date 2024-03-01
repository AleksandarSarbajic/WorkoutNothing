import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "../../services/apiTemplates";

function useTemplates() {
  const {
    data: templates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });

  return { templates, isLoading, error };
}

export default useTemplates;
