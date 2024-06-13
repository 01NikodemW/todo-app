import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { queryClient } from "../query-client";

export async function addUser(data: UserAddRequest) {
  const response = await axiosInstance.post("/api/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
      ...getJWTHeader(),
    },
  });

  return response.data;
}

export function useCreateTask() {
  const { mutate } = useMutation({
    mutationFn: (data: UserAddRequest) => addUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });

  return mutate;
}
