import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRef } from "react";
import { createMeasures } from "../../services/measures";

function useCreateMeasures() {
  const queryClient = useQueryClient();
  const { mutate: insertMeasures, isPending } = useMutation({
    mutationFn: createMeasures,
    onSuccess: (measures) => {
      if (measures) {
        queryClient.setQueryData(["measures"], measures);
      }
    },
  });

  const measuresInsertedRef = useRef(false);

  const insertMeasuresOnce = (id?: string | undefined) => {
    if (id && !measuresInsertedRef.current) {
      insertMeasures(id);
      measuresInsertedRef.current = true;
    }
  };

  return { insertMeasures: insertMeasuresOnce, isPending };
}

export default useCreateMeasures;
