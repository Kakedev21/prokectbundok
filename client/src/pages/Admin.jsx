import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  bookingCount,
  bookingMonth,
  bookingToday,
  pendingBooking,
  approveBooking,
  rejectBooking,
} from "../features/admin/adminSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(bookingCount());
    dispatch(bookingMonth());
    dispatch(bookingToday());
    dispatch(pendingBooking());
    dispatch(approveBooking());
    dispatch(rejectBooking());
  }, []);

  const {
    totalBooking,
    boookingToday,
    monthbooking,
    pending,
    rejected,
    approved,
    admin,
  } = useSelector((state) => state.admin);

  // const [userDemographics, setUserDemographics] = useState([
  //   {
  //     category: "Age",
  //     data: [
  //       { label: "18-24", value: 20 },
  //       { label: "25-34", value: 35 },
  //       { label: "35-44", value: 15 },
  //       { label: "45+", value: 10 },
  //     ],
  //   },
  //   {
  //     category: "Gender",
  //     data: [
  //       { label: "Male", value: 60 },
  //       { label: "Female", value: 35 },
  //       { label: "Other", value: 5 },
  //     ],
  //   },
  //   {
  //     category: "Location",
  //     data: [
  //       { label: "North America", value: 40 },
  //       { label: "Europe", value: 30 },
  //       { label: "Asia", value: 20 },
  //       { label: "Other", value: 10 },
  //     ],
  //   },
  // ]);

  // const [userActivity, setUserActivity] = useState([
  //   { label: "Logged in", value: 400 },
  //   { label: "Booked a hike", value: 150 },
  //   { label: "Cancelled a booking", value: 50 },
  //   { label: "Posted a review", value: 80 },
  // ]);

  useEffect(() => {
    if (!admin) {
      navigate("/adminlogin");
    }
  }, [dispatch, navigate]);

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-white shadow-lg">
          <AdminHeader />
        </header>

        {/* Main content */}
        <main className="flex-grow bg-[#F5F5F5] p-6">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>

            {/* Stats section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {/* Total bookings */}
              <div className="bg-[#00796B] p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium leading-5 text-[#FFC107]">
                      Booking Today
                    </div>
                    <div className="text-sm leading-5 text-[#FFC107] mt-2">
                      {boookingToday}
                    </div>
                  </div>
                </div>
              </div>
              {/* Pending bookings */}
              <div className="bg-[#00796B] p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 15l-3-3m0 0l3-3m-3 3h12"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium leading-5 text-[#FFC107]">
                      Pending Bookings
                    </div>
                    <div className="text-sm leading-5 text-[#FFC107] mt-2">
                      {pending}
                    </div>
                  </div>
                </div>
              </div>
              {/* Approved bookings */}
              <div className="bg-[#00796B] p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium leading-5 text-[#FFC107]">
                      Approved Bookings
                    </div>
                    <div className="text-sm leading-5 text-[#FFC107] mt-2">
                      {approved}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#00796B] p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="red"
                        d="M18.7,16.3c-0.4,0.4-1,0.4-1.4,0L12,11.4l-5.3,4.9c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4L10.6,10L5.3,5.1c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0L12,8.6l5.3-4.9c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,10l5.3,4.9C19.1,15.3,19.1,15.9,18.7,16.3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium leading-5 text-[#FFC107]">
                      Rejected Bookings
                    </div>
                    <div className="text-sm leading-5 text-[#FFC107] mt-2">
                      {rejected}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#00796B] p-4 rounded-lg shadow-lg">
                <div className="text-lg font-medium leading-5 text-[#FFC107]">
                  Bookings by Month
                </div>
                <div className="mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    {monthbooking.map((month) => (
                      <div
                        key={month.month}
                        className="text-center bg-gray-200 rounded-lg p-2"
                      >
                        <div className="text-lg font-medium leading-5 text-[#212121]">
                          {month.month}
                        </div>
                        <div className="text-sm leading-5 text-[#212121]">
                          {month.booked}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-sm leading-5 text-[#FFC107] mt-2">
                  Total Bookings: {totalBooking}
                </div>
              </div>
              {/* // User demographics panel */}
              {/* <div className="bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-lg font-semibold mb-2">
                  User Demographics
                </h2>
                {userDemographics.map((category, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-md font-medium mb-2">
                      {category.category}
                    </h3>
                    {category.data.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center mb-1">
                        <div className="w-1/3">{item.label}</div>
                        <div className="w-2/3">
                          <div className="h-2 bg-gray-200 rounded-lg">
                            <div
                              className="h-full bg-blue-500 rounded-lg"
                              style={{ width: `${item.value}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-2 text-sm">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-lg font-semibold mb-2">User Activity</h2>
                {userActivity.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className="w-1/3">{item.label}</div>
                    <div className="w-2/3">
                      <div className="h-2 bg-gray-200 rounded-lg">
                        <div
                          className="h-full bg-blue-500 rounded-lg"
                          style={{
                            width: `${
                              (item.value /
                                userActivity.reduce(
                                  (acc, curr) => acc + curr.value,
                                  0
                                )) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-2 text-sm">{item.value}</div>
                  </div>
                ))}
              </div> */}
              {/* More stats panels */}
              {/* Add more panels as needed */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
