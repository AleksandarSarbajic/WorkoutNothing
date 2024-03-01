import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertTemplate as insertTemplateApi } from "../../services/apiTemplates";

function useInsertTemplate() {
  const queryClient = useQueryClient();
  const {
    mutate: insertTemplate,
    isError,
    isPending,
  } = useMutation({
    mutationFn: insertTemplateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });

  return { insertTemplate, isError, isPending };
}

export default useInsertTemplate;
