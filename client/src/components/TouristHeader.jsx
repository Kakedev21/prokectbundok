import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { touristLogout } from "../features/tourist/touristSlice";
import { useDispatch } from "react-redux";

const TouristHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(touristLogout());
    navigate("/touristlogin");
    window.location.reload();
  };

  return (
    <header className="bg-[#039BE5] shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/admin" className="text-lg font-bold text-gray-800">
            My Tour
          </Link>

          <div className="hidden md:block">
            <nav className="flex space-x-4">
              <Link
                to="/tourist"
                className="text-[#424242] hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                My Bookings
              </Link>
              <Link
                to="/touristprofile"
                className="text-[#424242] hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <Link
                to="/touristschedule"
                className="text-[#424242] hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                My Schedules
              </Link>

              <button
                onClick={handleLogout}
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Logout
              </button>
            </nav>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <nav className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="text-[#424242] hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/touristschedule"
              className="text-[#424242] hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Users
            </Link>
            <Link
              to="/settings"
              className="text-[#424242] hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TouristHeader;
