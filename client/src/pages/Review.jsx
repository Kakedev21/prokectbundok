import React, { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import Nav from "../components/Nav";
import UserHeader from "../components/UserHeader";
import { toast } from "react-toastify";
import { postreview } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleImageChange = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
    }
  };

  const handleImageRemove = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ images, comment, rating });
    const reviewData = { images, comment, rating };
    // Your logic to save the data goes here
    dispatch(postreview({ reviewData, toast }));
    setImages([]);
    setComment("");
    setRating(0);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate, dispatch, postreview]);

  return (
    <>
      <Nav />
      <UserHeader />
      <div className="h-screen w-full bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 w-full max-w-sm mt-20">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="images"
            >
              Images
            </label>
            <div className="flex items-center">
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="images"
                type="file"
                name="images"
                onChange={handleImageChange}
                multiple
              />
            </div>
            <div className="flex flex-wrap mt-4">
              {images.map((image, index) => (
                <div key={index} className="w-1/4 p-2">
                  <img
                    src={image}
                    alt="uploaded"
                    className="w-full rounded shadow-sm"
                  />
                  <button
                    className="mt-2 px-3 py-1 text-sm font-semibold text-gray-500 hover:text-gray-700 rounded-full border border-gray-500 hover:border-gray-700"
                    onClick={() => handleImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4 w-full max-w-sm">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              name="comment"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <div className="mb-4 w-full max-w-sm">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <StarRating value={rating} onChange={handleRatingChange} />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Review;
