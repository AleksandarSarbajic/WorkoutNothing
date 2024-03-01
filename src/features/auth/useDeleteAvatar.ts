import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteAvatar as deleteAvatarApi } from "../../services/apiAuth";

export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  const { mutate: deleteAvatar, isPending: isDeleteting } = useMutation({
    mutationFn: deleteAvatarApi,
    onMutate: () => {
      toast.loading("Deleteting");
    },
    onSuccess: ({ user }) => {
      toast.dismiss();
      toast.success("User avatar successfully deleted");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteAvatar, isDeleteting };
}
