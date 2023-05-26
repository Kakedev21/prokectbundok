import React from "react";

const TourGuideDropDown = ({
  tourGuides,
  selectedTourGuide,
  onTourGuideChange,
}) => {
  console.log("TourGuideDropDown: ", tourGuides);

  return (
    <div className="w-full">
      <label
        htmlFor="tourGuide"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select a tour guide:
      </label>
      <select
        id="tourGuide"
        name="tourGuide"
        className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedTourGuide}
        onChange={onTourGuideChange}
      >
        <option value="">-- Select a tour guide --</option>
        {tourGuides.map((tourGuide) => (
          <option key={tourGuide._id} value={tourGuide._id}>
            {tourGuide}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TourGuideDropDown;
