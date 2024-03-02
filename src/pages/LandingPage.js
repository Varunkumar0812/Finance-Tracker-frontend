import Logo from "../assests/logo.png";

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-violet-400 to-sky-500">
      <div className="h-screen flex justify-center items-center flex-wrap">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-40 h-40 sm:w-56 sm:h-56 hover:scale-105 transition ease-in-out duration-100"
            src={Logo}
            alt="logo"
          />
          <div className="text-4xl sm:text-5xl font-bold my-5">
            TreasureTrack
          </div>
          <div className="text-base sm:text-lg w-2/3 text-center">
            Stay On Top of Your Finances: Discover the Power of TreasureTrack
            for Seamless Expense Tracking!
          </div>
          <div className="text-base sm:text-lg w-2/3 text-center font-semibold my-5">
            Start your jouney now -{">"}
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <a
              href="/signup"
              className="text-center cursor-pointer font-semibold rounded-3xl bg-gradient-to-r from-lime-400 to-lime-500 p-3 w-36 shadow-lg mb-5 sm:mb-0 mr-5 hover:scale-105 transition ease-in-out duration-100"
            >
              Sign Up
            </a>
            <a
              href="/signin"
              className="text-center cursor-pointer font-semibold rounded-3xl bg-gradient-to-r from-lime-400 to-lime-500 p-3 w-36 shadow-lg mb-5 sm:mb-0 mr-5 hover:scale-105 transition ease-in-out duration-100"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
