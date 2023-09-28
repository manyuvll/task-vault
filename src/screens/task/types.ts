export interface Task {
  id: string;
  label: string;
  date: string;
  priority: TaskPriority;
  completed: boolean;
}

export interface TaskStore {
  taskList: Task[];
}

export type TaskPriority = "low" | "medium" | "high";

export interface TaskFormProps {
  id?: string;
  label: string;
  priority: TaskPriority;
  date: Date;
  completed?: boolean;
}
