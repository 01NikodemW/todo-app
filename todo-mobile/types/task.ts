export type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "done" | "in-progress";
  createdAt: string;
};
