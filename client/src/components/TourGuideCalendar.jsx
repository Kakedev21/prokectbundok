import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TourGuideCalendar = ({ availableDates }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const disabledDates = availableDates
    .filter((date) => !date.available)
    .map((date) => new Date(date.date));

  return (
    <div className="w-full mt-4">
      <label
        htmlFor="date"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select a date:
      </label>
      <DatePicker
        id="date"
        name="date"
        value={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        disabledDates={disabledDates}
        className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default TourGuideCalendar;
