import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import type { Task } from "../types/taskTypes";

const Dashboard: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="flex flex-col justify-center  bg-palette-100 items-center gap-6 space-y-5 pt-10 pb-10">
      <h1 className="text-3xl text-palette-800  text-center">
        Dashboard of a Simple Project Management
      </h1>
      <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
      <FilterBar />
      <TaskList setEditingTask={setEditingTask} />
    </div>
  );
};

export default Dashboard;
