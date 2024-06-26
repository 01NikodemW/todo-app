import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios-instance";
import { queryClient } from "../query-client";
import { queryKeys } from "../query-keys";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export async function deleteTask(id: string | undefined) {
  const url = `/${queryKeys.tasks}/${id}`;

  const response = await axiosInstance.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export function useDeleteTask() {
  const { mutate } = useMutation({
    mutationFn: (id: string | undefined) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
      router.navigate("/");
      Toast.show({
        type: "custom",
        text1: "Success",
        text2: "Task deleted",
      });
    },
    onError: () => {
      Toast.show({
        type: "custom",
        text1: "Error",
        text2: "Failed to delete task",
      });
    },
  });

  return mutate;
}
