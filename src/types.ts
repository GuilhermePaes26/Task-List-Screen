export type Task = {
  id: string;
  title: string;
  context?: string;
  dueAt?: string;
  completed: boolean;
  position?: number;
};
