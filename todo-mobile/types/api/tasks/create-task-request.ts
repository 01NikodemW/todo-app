import { TaskStatusType } from "@/types/task";

export type CreateTaskRequest = {
  title: string;
  description: string;
  status: TaskStatusType;
};
