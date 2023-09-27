export interface Task {
  id: string;
  label: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface TaskStore {
  taskList: Task[];
}
