import React, { useEffect } from "react";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserHeader = ({ username }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
    window.location.reload();
  };

  return (
    <header aria-label="Page Header" className="bg-[#166534]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 mt-20">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome , {username}
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              {/* Let's write a new blog post! 🎉 */}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-white transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
              onClick={() => navigate("/reviews")}
            >
              <span className="text-sm font-medium">Reviews</span>
            </button>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-white transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
              onClick={() => navigate("/booking")}
            >
              <span className="text-sm font-medium"> Your Booking </span>
            </button>

            {/* <button
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Profile Settings
            </button> */}
            <button
              onClick={handleLogout}
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
