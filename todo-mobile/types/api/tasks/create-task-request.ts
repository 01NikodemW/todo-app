export type CreateTaskRequest = {
  title: string;
  description: string;
  status: "todo" | "done" | "in-progress" ;
};
