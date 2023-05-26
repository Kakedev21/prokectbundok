import React, { useEffect, useState } from "react";
import TouristHeader from "../components/TouristHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDate, getSchedule } from "../features/tourist/touristSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TouristSchedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [showSchedule, setShowSchedule] = useState(true);

  useEffect(() => {
    if (!userTourist) navigate("/touristlogin");
    if (userTourist) dispatch(getSchedule());
  }, []);

  const { schedules, userTourist } = useSelector((state) => state.tourist);

  console.log(schedules);

  const handleDateChange = (date) => {
    setSelectedDates([...selectedDates, date.toLocaleDateString()]);
  };

  const handleRemoveDate = (index) => {
    const newDates = [...selectedDates];
    newDates.splice(index, 1);
    setSelectedDates(newDates);
  };

  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const handleNewScheduleClick = () => {
    setShowScheduleForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDate = {
      selectedDates,
    };
    dispatch(addDate({ newDate }));
    window.location.reload();
  };

  return (
    <>
      <TouristHeader />
      <div className="bg-white h-screen w-full">
        {showScheduleForm ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center h-screen"
          >
            <h2 className="text-3xl font-bold mb-4 mt-20">Set Schedule</h2>
            <div className="mb-4 cursor-pointer">
              <DatePicker
                onChange={handleDateChange}
                value={null}
                calendarClassName="text-black"
                className="bg-white border border-gray-300 rounded py-2 px-4 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                format="dd/MM/yyyy"
                dayClassName={() =>
                  "p-2 hover:bg-gray-200 rounded-full cursor-pointer"
                }
                placeholderText="click to select a date"
              />
            </div>
            <div className="flex flex-wrap mb-4">
              {selectedDates.map((date, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white rounded-full py-2 px-4 m-2 flex items-center"
                >
                  {date}
                  <button
                    type="button"
                    className="ml-2 text-white"
                    onClick={() => handleRemoveDate(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4 mt-20 text-[#424242]">
              Schedule List
            </h2>
            <ul className="bg-gray-100 w-full max-w-md rounded-lg p-4">
              {schedules.map((schedule, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 px-4 py-2 rounded bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2H2V5zm0 6h16v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="mr-2 text-gray-600">{schedule}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleNewScheduleClick}
              className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-4"
            >
              New Schedule
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TouristSchedule;
