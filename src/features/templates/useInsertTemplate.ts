import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertTemplate as insertTemplateApi } from "../../services/apiTemplates";
import { useNavigate } from "react-router-dom";

function useInsertTemplate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: insertTemplate,
    isError,
    isPending,
  } = useMutation({
    mutationFn: insertTemplateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      navigate("/workout");
    },
  });

  return { insertTemplate, isError, isPending };
}

export default useInsertTemplate;
