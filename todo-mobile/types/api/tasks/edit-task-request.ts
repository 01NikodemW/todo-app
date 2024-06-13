export type EditTaskRequest = {
  title: string;
  description: string;
  status: "todo" | "done" | "in-progress";
};
