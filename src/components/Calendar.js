import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Calendar() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchExpenses = () => {
    const data = JSON.parse(localStorage.getItem("authToken"));
    if (!data) {
      return navigate("/");
    }

    axios
      .get("https://finance-tracker-backend-imyy.onrender.com/api/expenses/", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          user: data.data.user._id,
        },
      })
      .then((res) => {
        setExpenses(res.data.data.expenses);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const events = expenses.map((expense) => ({
    title: expense.title,
    start: expense.date,
    color: expense.mode === "credit" ? "red" : "green",
  }));

  return (
    <div className="bg-white">
      <h1 className="text-base sm:text-xl mb-4">
        This calendar shows your monthly expenditures and savings
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventDisplay="block"
      />
    </div>
  );
}

export default Calendar;
