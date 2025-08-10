import Dashboard from "./pages/Dashboard";
import { TaskProvider } from "./providers/TaskProvider";

function App() {
  return (
    <>
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </>
  );
}

export default App;
