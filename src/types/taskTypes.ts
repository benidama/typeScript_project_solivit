export type Priority = "Low" | "Medium" | "High";
export type Category = "Frontend" | "Backend" | "Meeting" | "Design";
export type Status = "Completed" | "Incomplete";

export interface Task {
  id: string;
  taskName: string;
  priority: Priority;
  category: Category;
  dueDate?: string;
  assignedUser: string;
  assignedOn: string;
  completed: boolean;
}

export interface TaskState {
  tasks: Task[];
  filters: {
    status: "All" | Status;
    priority: "All" | Priority;
    category: "All" | Category;
    dueDate: "All" | "Overdue" | "Today" | "Upcoming" | "No Due Date";
    assignedUser: "All" | string;
  };
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "SET_FILTER"; payload: Partial<TaskState["filters"]> };
