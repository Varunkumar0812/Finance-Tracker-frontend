import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../assests/logo.png";

function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [income, setIncome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      income === ""
    ) {
      window.alert("Please fill all required fields");
    } else {
      const data = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        income: parseInt(income),
      };

      console.log(data);

      try {
        const userData = await fetch(
          "https://finance-tracker-backend-imyy.onrender.com/api/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        console.log(userData);

        userData.json().then((data) => {
          if (data.status === "error") {
            window.alert(data.message);
          } else {
            localStorage.setItem("authToken", JSON.stringify(data));
            console.log("Token generated !!");

            navigate("/dashboard");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <section class="bg-gradient-to-b from-slate-50 to-sky-500 min-h-screen flex flex-col justify-center py-5 pb-10">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full md:w-3/5">
          <div>
            <a
              href="/"
              class="flex flex-col items-center mb-6 text-2xl md:text-4xl font-semibold text-gray-900"
            >
              <img
                class="w-14 h-14 md:w-24 md:h-24 mr-2"
                src={Logo}
                alt="logo"
              />
              TreasureTrack
            </a>
          </div>
          <div class="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="firstName"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="lastName"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="monthly"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Monthly Income
                  </label>
                  <input
                    type="text"
                    name="income"
                    id="income"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    required
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>
                <div class="flex justify-center">
                  <p class="text-sm font-light text-gray-500">
                    You have already registered?
                    <a
                      href="/signin"
                      class="font-medium text-primary-600 hover:underline ml-2"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  class="w-full text-white bg-sky-500 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
