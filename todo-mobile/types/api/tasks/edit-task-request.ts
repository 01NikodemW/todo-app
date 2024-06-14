import { TaskStatusType } from "@/types/task";

export type EditTaskRequest = {
  title: string;
  description: string;
  status: TaskStatusType;
};
