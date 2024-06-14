import { TaskStatusType } from "./task";

export const TASK_STATUS: { [key: string]: TaskStatusType } = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

export const TASK_STATUS_ARRAY: TaskStatusType[] = Object.values(TASK_STATUS);
