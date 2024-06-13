import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios-instance";
import { queryClient } from "../query-client";
import { queryKeys } from "../query-keys";

export async function deleteTask(id: number) {
  let url = `/${queryKeys.tasks}/${id}`;

  const response = await axiosInstance.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export function useDeleteTask() {
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });

  return mutate;
}
