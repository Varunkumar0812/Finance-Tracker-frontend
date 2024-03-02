import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

function DashboardPage() {
  return (
    <div className="flex flex-wrap sm:flex-nowrap">
      <Sidebar page="my-dashboard" />
      <div className="w-full min-h-screen max-h-screen bg-white p-4 sm:p-10 overflow-y-scroll">
        <Dashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
