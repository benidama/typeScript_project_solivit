import React from "react";
import { useTaskContext } from "../hooks/useTaskContext";

const FilterBar: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const { filters, tasks } = state;

  const handleChange =
    (key: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({ type: "SET_FILTER", payload: { [key]: e.target.value } });
    };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow space-y-4">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>

      <div className="flex flex-col">
        <label htmlFor="status" className="text-sm font-medium mb-1">
          Select Status
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={handleChange("status")}
          className="w-full p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="priority" className="text-sm font-medium mb-1">
          Select Priority
        </label>
        <select
          id="priority"
          value={filters.priority}
          onChange={handleChange("priority")}
          className="w-full p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm font-medium mb-1">
          Select Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={handleChange("category")}
          className="w-full p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Meeting">Meeting</option>
          <option value="Design">Design</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="dueDate" className="text-sm font-medium mb-1">
          Select Due Date
        </label>
        <select
          id="dueDate"
          value={filters.dueDate}
          onChange={handleChange("dueDate")}
          className="w-full p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Overdue">Overdue</option>
          <option value="Today">Today</option>
          <option value="Upcoming">Upcoming</option>
          <option value="No Due Date">No Due Date</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="assignedUser" className="text-sm font-medium mb-1">
          Select Assigned User
        </label>
        <select
          id="assignedUser"
          value={filters.assignedUser}
          onChange={handleChange("assignedUser")}
          className="w-full p-2 border rounded"
        >
          <option value="All">All</option>
          {[...new Set(tasks.map((t) => t.assignedUser))]
            .filter((u) => u)
            .map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
