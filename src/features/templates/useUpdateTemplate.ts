import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTemplate as updateTemplateApi } from "../../services/apiTemplates";
import { useNavigate } from "react-router-dom";

function useUpdateTemplate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: updateTemplate,
    isError,
    isPending,
  } = useMutation({
    mutationFn: updateTemplateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      navigate(-1);
    },
  });

  return { updateTemplate, isError, isPending };
}

export default useUpdateTemplate;
