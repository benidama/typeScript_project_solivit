import { useState, useEffect } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import type { Task } from "../types/taskTypes";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";
import Button from "./Button";

const TaskForm = ({
  editingTask,
  setEditingTask,
}: {
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}) => {
  const { dispatch } = useTaskContext();
  const [task, setTask] = useState<Omit<Task, "id" | "completed">>({
    taskName: "",
    priority: "Low",
    category: "Frontend",
    dueDate: "",
    assignedUser: "",
    assignedOn: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editingTask) {
      setTask({
        taskName: editingTask.taskName,
        priority: editingTask.priority,
        category: editingTask.category,
        dueDate: editingTask.dueDate || "",
        assignedUser: editingTask.assignedUser,
        assignedOn: editingTask.assignedOn,
      });
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTask) {
      dispatch({
        type: "EDIT_TASK",
        payload: { ...editingTask, ...task },
      });
      setEditingTask(null);
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: { ...task, id: uuidv4(), completed: false },
      });
    }

    setTask({
      taskName: "",
      priority: "Low",
      category: "Frontend",
      dueDate: "",
      assignedUser: "",
      assignedOn: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">
        {editingTask ? "Edit Task" : "Add Task"}
      </h3>
      <Input
        label="Task Name"
        type="text"
        placeholder="Enter task name"
        value={task.taskName}
        onChange={(e) => setTask({ ...task, taskName: e.target.value })}
        required
      />
      <select
        value={task.priority}
        onChange={(e) =>
          setTask({ ...task, priority: e.target.value as Task["priority"] })
        }
        className="border p-2 w-full mb-2"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select
        value={task.category}
        onChange={(e) =>
          setTask({ ...task, category: e.target.value as Task["category"] })
        }
        className="border p-2 w-full mb-2"
      >
        <option>Frontend</option>
        <option>Backend</option>
        <option>Meeting</option>
        <option>Design</option>
      </select>
      <Input
        label="Due Date"
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />
      <Input
        label="Assigned User"
        type="text"
        placeholder="Enter assignee"
        value={task.assignedUser}
        onChange={(e) => setTask({ ...task, assignedUser: e.target.value })}
        required
      />
      <Button type="submit">{editingTask ? "Update Task" : "Add Task"}</Button>
    </form>
  );
};

export default TaskForm;
