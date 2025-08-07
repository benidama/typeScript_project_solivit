import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import type { Task } from "../types/taskTypes";

const Dashboard: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="col-span-2 space-y-6">
        <FilterBar />
        <TaskList setEditingTask={setEditingTask} />
      </div>
      <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
    </div>
  );
};

export default Dashboard;
