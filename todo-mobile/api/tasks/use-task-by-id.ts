import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { axiosInstance } from "@/api/axios-instance";
import { Task } from "@/types/task";

export async function getTaskById(id: string | undefined): Promise<Task> {
  let url = `/${queryKeys.tasks}/${id}`;

  const response = await axiosInstance.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export function useTaskById(id: string | undefined) {
  const { data: task, isFetching: isTaskFetching } = useQuery<Task>({
    queryKey: [queryKeys.tasks, id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  return {
    task,
    isTaskFetching,
  };
}
