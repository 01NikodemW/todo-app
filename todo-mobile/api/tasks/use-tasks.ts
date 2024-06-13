import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { axiosInstance } from "@/api/axios-instance";
import { Task } from "@/types/task";

export async function getTasks(): Promise<Task[]> {
  let url = `/${queryKeys.tasks}`;

  const response = await axiosInstance.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export function useTasks() {
  const { data: tasks = [], isFetching: isTasksFetching } = useQuery<Task[]>({
    queryKey: [queryKeys.tasks],
    queryFn: () => getTasks(),
  });

  return {
    tasks,
    isTasksFetching,
  };
}
