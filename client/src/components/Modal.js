import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth, provider } from "../firebase";

function Modal({ open, setOpen }) {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpen(false);
    }
  };
  return (
    <>
      {open && (
        <div
          ref={modalRef}
          onClick={closeModal}
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="z-50 fixed flex items-center justify-center top-0 right-0  bottom-0 w-full px-2"
        >
          {/* container */}
          <div className="bg-white  animate-fade-in-down duration-1000	 relative flex flex-col space-y-3 justify-center items-center h-4/5 rounded-md max-w-md w-full p-2 sm:p-5"></div>
        </div>
      )}
    </>
  );
}

export default Modal;
