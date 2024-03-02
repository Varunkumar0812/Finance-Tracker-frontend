import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const fetchExpenses = () => {
    const data = JSON.parse(localStorage.getItem("authToken"));
    if (!data) {
      return navigate("/");
    }

    setUserData(data.data.user._id);

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
    const data = JSON.parse(localStorage.getItem("authToken"));
    if (!data) {
      return navigate("/");
    }
    fetchExpenses();
    setUserData(data.data.user);
  }, []);

  console.log(userData);

  let expenditure = 0;
  let savings = 0;
  expenses.map((el) => {
    if (el.mode === "credit") {
      expenditure += el.amount;
    } else {
      savings += el.amount;
    }

    return "0";
  });

  return (
    <div>
      <div className="font-semibold text-base sm:text-2xl">Expense Summary</div>
      <div className="flex my-5 sm:my-10 gap-5 flex-wrap md:flex-nowrap">
        <div className="w-full sm:w-1/3 bg-gradient-to-br from-sky-100 to-sky-600 rounded-lg p-5 hover:scale-105 transition ease-in-out duration-100 cursor-default">
          <div className="text-base lg:text-xl font-semibold">
            Monthly Income
          </div>
          <div className="text-2xl lg:text-5xl font-bold my-2">
            $ {userData.income}
          </div>
        </div>
        <div className="w-full sm:w-1/3 bg-gradient-to-br from-red-100 to-red-600 rounded-lg p-5 hover:scale-105 transition ease-in-out duration-100 cursor-default">
          <div className="text-base lg:text-xl font-semibold">Expenditure</div>
          <div className="text-2xl lg:text-5xl font-bold my-2">
            $ {expenditure}
          </div>
        </div>
        <div className="w-full sm:w-1/3 bg-gradient-to-br from-green-100 to-green-500 rounded-lg p-5 hover:scale-105 transition ease-in-out duration-100 cursor-default">
          <div className="text-base lg:text-xl font-semibold">Savings</div>
          <div className="text-2xl lg:text-5xl font-bold my-2">
            $ {userData.income - expenditure + savings}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
