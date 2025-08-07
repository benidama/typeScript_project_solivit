import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within TaskProvider");
  return ctx;
}
