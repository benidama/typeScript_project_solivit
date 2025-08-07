import React, { useReducer, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import { taskReducer } from "../reducers/taskReducer";
import type { TaskState, TaskAction } from "../types/taskTypes";

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: TaskState = {
    tasks: [],
    filters: {
      status: "All",
      priority: "All",
      category: "All",
      dueDate: "All",
      assignedUser: "All",
    },
  };

  const [state, dispatch] = useReducer<React.Reducer<TaskState, TaskAction>>(
    taskReducer,
    initialState
  );

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
