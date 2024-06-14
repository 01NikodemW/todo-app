import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { queryClient, queryErrorHandler } from "../query-client";
import { axiosInstance } from "../axios-instance";
import { EditTaskRequest } from "@/types/api/tasks/edit-task-request";
import Toast from "react-native-toast-message";

export async function editTask(id: string | undefined, data: EditTaskRequest) {
  const url = `/${queryKeys.tasks}/${id}`;
  const response = await axiosInstance.put(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export function useEditTask(id: string | undefined, onSuccess: () => void) {
  const { mutate } = useMutation({
    mutationFn: (data: EditTaskRequest) => editTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
      onSuccess();
      Toast.show({
        type: "custom",
        text1: "Success",
        text2: "Task updated",
      });
    },
    onError: (error: any) => {
      if (!error.response)
        return Toast.show({
          type: "custom",
          text1: "Error",
          text2: "Failed to edit task",
        });
      queryErrorHandler(error.response.data);
    },
  });

  return mutate;
}
