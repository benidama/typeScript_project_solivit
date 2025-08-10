import { useState, useEffect } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import type { Task } from "../types/taskTypes";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [errors, setErrors] = useState<{
    taskName?: string;
    assignedUser?: string;
  }>({});

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
      setErrors({});
    }
  }, [editingTask]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!task.taskName.trim()) newErrors.taskName = "Task Name is required";
    if (!task.assignedUser.trim())
      newErrors.assignedUser = "Assigned User is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
      });
      return;
    }

    if (editingTask) {
      dispatch({ type: "EDIT_TASK", payload: { ...editingTask, ...task } });
      toast.success("Task updated successfully!", { position: "top-right" });
      setEditingTask(null);
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: { ...task, id: uuidv4(), completed: false },
      });
      toast.success("Task added successfully!", { position: "top-right" });
    }

    setTask({
      taskName: "",
      priority: "Low",
      category: "Frontend",
      dueDate: "",
      assignedUser: "",
      assignedOn: new Date().toISOString().split("T")[0],
    });
    setErrors({});
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow  w-[370px]  md:w-2xl"
      >
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
        {errors.taskName && (
          <p className="text-red-500 text-sm mb-2">{errors.taskName}</p>
        )}

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
        {errors.assignedUser && (
          <p className="text-red-500 text-sm mb-2">{errors.assignedUser}</p>
        )}

        <Button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
