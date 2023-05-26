import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";

const StarRating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(null);

  const handleClick = (newValue) => {
    onChange(newValue);
  };

  const handleMouseEnter = (newValue) => {
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isHalf = hoverValue
          ? hoverValue === starValue - 0.5
          : value === starValue - 0.5;
        const isFilled = hoverValue
          ? hoverValue >= starValue
          : value >= starValue;

        return (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {isHalf ? (
              <FaStarHalfAlt className="text-yellow-500" />
            ) : isFilled ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaStar className="text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StarRating;
