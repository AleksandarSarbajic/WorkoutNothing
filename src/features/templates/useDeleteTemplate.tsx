import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTemplate as deleteTemplateApi } from "../../services/apiTemplates";
import { useNavigate, useParams } from "react-router-dom";

function useDeleteTemplate(id?: number) {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: deleteTemplate,
    isError,
    isPending,
  } = useMutation({
    mutationFn: () => deleteTemplateApi(workoutId ? +workoutId! : +id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      navigate(-1);
    },
  });

  return { deleteTemplate, isError, isPending };
}

export default useDeleteTemplate;
