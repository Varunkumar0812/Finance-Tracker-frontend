import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ onClose, children, actionBar }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed inset-y-[250px] inset-x-[30px] sm:inset-y-[250px] sm:inset-x-[500px] z-50 p-10 flex justify-center items-between bg-white rounded-lg">
        <div className="flex flex-col justify-between">
          {children}
          <div className="flex justify-center">{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".model-container")
  );
}

export default Modal;
