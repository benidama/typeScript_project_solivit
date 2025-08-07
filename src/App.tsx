import Dashboard from "./pages/Dashboard";
import { TaskProvider } from "./providers/TaskProvider";

function App() {
  return (
    <>
      <h1 className="text-3xl text-palette-800 py-3 text-center">
        A Simple Project of Time Management
      </h1>
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </>
  );
}

export default App;
