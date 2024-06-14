import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { queryClient, queryErrorHandler } from "../query-client";
import { CreateTaskRequest } from "@/types/api/tasks/create-task-request";
import { axiosInstance } from "../axios-instance";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export async function createTask(data: CreateTaskRequest) {
  const url = `/${queryKeys.tasks}`;
  const response = await axiosInstance.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export function useCreateTask() {
  const { mutate } = useMutation({
    mutationFn: (data: CreateTaskRequest) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
      router.back();
      Toast.show({
        type: "custom",
        text1: "Success",
        text2: "Task creted",
      });
    },
    onError: (error: any) => {
      queryErrorHandler(error.response.data);
    },
  });

  return mutate;
}
