export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatusType;
  createdAt: string;
};

export type TaskStatusType = "todo" | "done" | "in-progress";
