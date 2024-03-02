import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";

function Expenses() {
  const [formView, setFormView] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("credit");
  const [amount, setAmount] = useState("");

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
    fetchExpenses();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description, mode, amount);
    if (title === "" || description === "" || mode === "" || amount === "") {
      return window.alert("Please fill all required fields");
    }

    const data = {
      title,
      description,
      mode: mode.toLowerCase(),
      amount: parseInt(amount),
      user: userData,
    };

    console.log(data);

    try {
      const expense = await fetch(
        "https://finance-tracker-backend-imyy.onrender.com/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      fetchExpenses();
    } catch (err) {
      window.alert(err.message);
    }

    setFormView(!formView);
  };

  return (
    <div>
      <div className="text-base sm:text-xl">
        Your credits and debits this month ...
      </div>
      <div className="my-5">
        {!formView && (
          <button
            onClick={() => setFormView(!formView)}
            className="w-full flex items-center bg-[#C7C8CC] text-left py-3 px-3 rounded-sm hover:bg-[#B4B4B8] hover:scale-[1.01] transition duration-100"
          >
            <FaPlus className="mr-2" />
            Add new expense
          </button>
        )}
        {formView && (
          <div className="bg-[#A0E9FF] p-3 sm:p-5 rounded-md">
            <div className="text-md sm:text-xl my-2 ">Title</div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md"
            />

            <div className="text-md sm:text-xl my-2 ">Description</div>
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-md"
            />

            <div className="text-md sm:text-xl my-2 ">Mode of expense</div>
            <select
              onChange={(e) => {
                setMode(e.target.value);
              }}
              className="w-full p-2 rounded-md"
            >
              <option value={"credit"}>Credit</option>
              <option value={"debit"}>Debit</option>
            </select>

            <div className="text-md sm:text-xl my-2 ">Amount</div>
            <input
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 rounded-md"
            />

            <div className="flex justify-end mt-3">
              <button
                onClick={() => setFormView(!formView)}
                className="w-24 p-2 bg-[#EF4040] mr-3 rounded-md hover:scale-[1.05] hover:bg-[#B31312] transition ease-in-out duration-100"
              >
                Close
              </button>
              <button
                onClick={handleFormSubmit}
                className="w-24 p-2 bg-[#87A922] rounded-md hover:scale-[1.05] hover:bg-[#416D19] transition ease-in-out duration-100"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="my-10">
          {expenses.map((el) => {
            return (
              <div className="my-2 w-full flex items-center justify-between bg-[#BEFFF7] text-left py-3 px-3 rounded-sm hover:bg-[#96EFFF] hover:scale-[1.01] transition duration-100">
                <div>{el.title}</div>
                <div
                  className={`font-semibold ${
                    el.mode === "credit" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {el.mode === "credit" ? "-" : "+"} $ {el.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Expenses;
