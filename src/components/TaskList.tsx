import React from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import type { Task } from "../types/taskTypes";
import Button from "./Button";

interface TaskListProps {
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const TaskList: React.FC<TaskListProps> = ({ setEditingTask }) => {
  const { state, dispatch } = useTaskContext();
  const { tasks, filters } = state;

  const filteredTasks = tasks.filter((task) => {
    const { status, priority, category, dueDate, assignedUser } = filters;

    if (status === "Completed" && !task.completed) return false;
    if (status === "Incomplete" && task.completed) return false;
    if (priority !== "All" && task.priority !== priority) return false;
    if (category !== "All" && task.category !== category) return false;
    if (assignedUser !== "All" && task.assignedUser !== assignedUser)
      return false;

    const today = new Date().toISOString().split("T")[0];
    if (dueDate === "Overdue" && task.dueDate && task.dueDate >= today)
      return false;
    if (dueDate === "Today" && task.dueDate !== today) return false;
    if (dueDate === "Upcoming" && task.dueDate && task.dueDate <= today)
      return false;
    if (dueDate === "No Due Date" && task.dueDate) return false;

    return true;
  });

  const handleToggle = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div className="p-4 bg-white rounded shadow w-[370px]  md:w-2xl ">
      <h2 className="text-lg font-semibold mb-3">Task List</h2>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center flex-col gap-3 sm:flex-col md:flex-row justify-between bg-gray-50 border p-3 rounded"
            >
              <div className="flex flex-col">
                <p
                  className={`font-medium ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.taskName}
                </p>
                <p className="text-sm text-gray-500">
                  {task.priority} • {task.category} • Assigned to:{" "}
                  {task.assignedUser}
                </p>
                {task.dueDate && (
                  <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleToggle(task.id)}
                  className={`px-2 py-1 rounded text-white ${
                    task.completed ? "bg-green-600" : "bg-yellow-500"
                  }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </Button>
                <Button
                  onClick={() => handleEdit(task)}
                  className="px-2 py-1 rounded bg-blue-500 text-white"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(task.id)}
                  className="px-2 py-1 rounded bg-red-600 text-white"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
