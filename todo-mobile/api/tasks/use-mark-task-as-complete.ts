import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { queryClient, queryErrorHandler } from "../query-client";
import { axiosInstance } from "../axios-instance";
import { TASK_STATUS } from "@/types/constants";

export async function markAsComplete(id: number) {
  const url = `/${queryKeys.tasks}/${id}`;
  const response = await axiosInstance.put(
    url,
    {
      status: TASK_STATUS.DONE,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export function useMarkTaskAsComplete() {
  const { mutate } = useMutation({
    mutationFn: (id: number) => markAsComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
    onError: (error) => {
      queryErrorHandler(error);
    },
  });

  return mutate;
}
