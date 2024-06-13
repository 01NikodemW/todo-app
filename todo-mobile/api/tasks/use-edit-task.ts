import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { queryClient } from "../query-client";
import { axiosInstance } from "../axios-instance";
import { EditTaskRequest } from "@/types/api/tasks/edit-task-request";

export async function editTask(id: string | undefined, data: EditTaskRequest) {
  console.log("editTask", id);
  const url = `/${queryKeys.tasks}/${id}`;
  const response = await axiosInstance.put(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export function useEditTask(id: string | undefined) {
  const { mutate } = useMutation({
    mutationFn: (data: EditTaskRequest) => editTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });

  return mutate;
}
