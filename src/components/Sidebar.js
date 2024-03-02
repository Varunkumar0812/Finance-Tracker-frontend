import { MdSpaceDashboard } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { FaCalendar } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "./Modal";
import { useNavigate } from "react-router";

function Sidebar({ page }) {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("authToken"));
    if (!data) {
      return navigate("/");
    }
    setUserData(data.data.user);
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setShowModal(false);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const actionBar = (
    <div>
      <button
        className="bg-red-400 py-2 px-5 rounded-md text-color hover:scale-105 hover:bg-red-500 transition duration-100 ease-in-out"
        onClick={handleLogout}
      >
        Yes
      </button>
    </div>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <p className="text-xl text-center">Do you want to logout ? </p>
    </Modal>
  );

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div>
      <div className="bg-[#75C2F6] w-[100vw] sm:w-auto py-2 sm:p-0">
        <button
          onClick={toggleNav}
          class="cursor-default bg-gray-200 inline-flex items-center p-1 ms-3 text-sm text-gray-500 border-2 border-gray-600 rounded-md sm:hidden shadow-lg"
        >
          <IoMenu className="text-black" />
        </button>

        {(toggleMenu || screenWidth > 640) && (
          <aside
            id="default-sidebar"
            class="fixed sm:static top-0 left-0 z-40 w-18 sm:w-80 h-screen"
            aria-label="Sidebar"
          >
            <div class="h-full px-2 py-4 overflow-y-auto bg-[#00A9FF]">
              <div className="hidden sm:flex flex-col justify-center items-center m-10">
                <div className="rounded-[100%] bg-white p-2">
                  <CgProfile className="w-24 h-24" />
                </div>
                <div className="text-2xl font-semibold py-2">
                  {userData.firstName + " " + userData.lastName}
                </div>
              </div>
              <div className="sm:hidden flex justify-end">
                <button
                  onClick={toggleNav}
                  className="p-1 border-2 border-gray-700 rounded-md my-4"
                >
                  <IoMdClose className="" />
                </button>
              </div>
              <ul class="space-y-2 font-medium">
                <li>
                  <a
                    href="/dashboard"
                    class="flex items-center p-2 text-white bg-[#071952] rounded-sm hover:bg-white hover:text-black group hover:scale-105 transition delay-100"
                    style={{
                      backgroundColor: page === "my-dashboard" ? "white" : "",
                      color: page === "my-dashboard" ? "black" : "",
                    }}
                  >
                    <MdSpaceDashboard className="w-6 h-6" />
                    <span class="ms-3">My Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/expenses"
                    class="flex items-center p-2 text-white bg-[#071952] rounded-sm hover:bg-white hover:text-black group hover:scale-105 transition delay-100"
                    style={{
                      backgroundColor: page === "my-expenses" ? "white" : "",
                      color: page === "my-expenses" ? "black" : "",
                    }}
                  >
                    <GiTwoCoins className="w-6 h-6" />
                    <span class="ms-3">My Expenses</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/calendar"
                    class="flex items-center p-2 text-white bg-[#071952] rounded-sm hover:bg-white hover:text-black group hover:scale-105 transition delay-100"
                    style={{
                      backgroundColor: page === "calendar" ? "white" : "",
                      color: page === "calendar" ? "black" : "",
                    }}
                  >
                    <FaCalendar className="w-6 h-6" />
                    <span class="ms-3">Calendar</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleClick}
                    class="w-full flex items-center p-2 text-white bg-[#071952] rounded-sm hover:bg-white hover:text-black group hover:scale-105 transition delay-100"
                  >
                    <IoLogOut className="w-6 h-6" />
                    <span class="ms-3">Logout</span>
                  </button>
                  {showModal && modal}
                </li>
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
