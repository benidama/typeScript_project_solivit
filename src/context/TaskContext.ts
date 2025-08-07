import { createContext } from "react";
import type { TaskState, TaskAction } from "../types/taskTypes";

export const TaskContext = createContext<
  { state: TaskState; dispatch: React.Dispatch<TaskAction> } | undefined
>(undefined);
