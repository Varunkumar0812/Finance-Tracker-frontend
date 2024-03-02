import Expenses from "../components/Expenses";
import Sidebar from "../components/Sidebar";

function MyExpensesPage() {
  return (
    <div className="flex flex-wrap sm:flex-nowrap">
      <Sidebar page="my-expenses" />
      <div className="w-full min-h-screen max-h-screen bg-white p-4 sm:p-10 overflow-y-scroll">
        <Expenses />
      </div>
    </div>
  );
}

export default MyExpensesPage;
