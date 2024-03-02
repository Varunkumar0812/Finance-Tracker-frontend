import Calendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";

function CalendarPage() {
  return (
    <div className="flex flex-wrap sm:flex-nowrap">
      <Sidebar page="calendar" />
      <div className="w-full min-h-screen max-h-screen bg- p-4 sm:p-10 overflow-y-scroll">
        <Calendar />
      </div>
    </div>
  );
}

export default CalendarPage;
