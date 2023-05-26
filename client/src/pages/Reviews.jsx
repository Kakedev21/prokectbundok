import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactRating from "react-rating";
import { getReviews } from "../features/userSlice";
import UserHeader from "../components/UserHeader";
import Nav from "../components/Nav";

const Reviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Inside the component
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle selecting an image
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getReviews());
  }, [dispatch, getReviews, navigate]);

  const { user, reviews } = useSelector((state) => state.user);

  const Modal = ({ image, handleCloseModal }) => {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 " onClick={handleCloseModal} />
          <div className="bg-white p-4 rounded shadow-md">
            <img
              src={image}
              alt="uploaded"
              className="w-full h-96 object-contain rounded shadow-sm"
            />
          </div>
        </div>
      </div>
    );
  };

  const formatDate = (date) => {
    const now = new Date();
    const postedDate = new Date(date);

    const diffTime = now - postedDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "posted a day ago";
    } else if (diffDays < 7) {
      return `posted ${diffDays} days ago`;
    } else if (diffDays === 7) {
      return "posted a week ago";
    } else {
      return `posted on ${postedDate.toLocaleDateString()}`;
    }
  };

  // calculate the average rating
  const averageRating = useMemo(() => {
    if (reviews.length) {
      const total = reviews.reduce((acc, cur) => acc + cur.rating, 0);
      return total / reviews.length;
    } else {
      return 0;
    }
  }, [reviews]);

  // count the number of ratings for each star value
  const ratingCounts = reviews.reduce(
    (acc, cur) => {
      acc[cur.rating] += 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const handleSubmit = (event) => {};
  return (
    <>
      <Nav />
      <UserHeader username={user ? user.username : ""} />
      <div className="bg-white p-10 mx-auto h-full grid grid-cols-1 md:grid-row-2 gap-6">
        <div className="col-span-1">
          <div className="bg-white rounded-md p-4 shadow-md my-4">
            <p className="font-bold text-lg text-gray-700">Customer Reviews</p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <p className="text-xl font-bold mr-4">Average rating:</p>
                <ReactRating
                  initialRating={averageRating}
                  emptySymbol={
                    <i className="far fa-star text-gray-400 text-2xl"></i>
                  }
                  fullSymbol={
                    <i className="fas fa-star text-yellow-500 text-2xl"></i>
                  }
                  readonly
                />
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <ReactRating
                    initialRating={5}
                    emptySymbol={
                      <i className="far fa-star text-gray-400 text-lg"></i>
                    }
                    fullSymbol={
                      <i className="fas fa-star text-yellow-500 text-lg"></i>
                    }
                    readonly
                  />
                  <span className="ml-2">{`${(
                    (ratingCounts[5] / reviews.length) *
                    100
                  ).toFixed(0)}%`}</span>
                </div>
                <div>
                  <ReactRating
                    initialRating={4}
                    emptySymbol={
                      <i className="far fa-star text-gray-400 text-lg"></i>
                    }
                    fullSymbol={
                      <i className="fas fa-star text-yellow-500 text-lg"></i>
                    }
                    readonly
                  />
                  <span className="ml-2">{`${(
                    (ratingCounts[4] / reviews.length) *
                    100
                  ).toFixed(0)}%`}</span>
                </div>
                <div>
                  <ReactRating
                    initialRating={3}
                    emptySymbol={
                      <i className="far fa-star text-gray-400 text-lg"></i>
                    }
                    fullSymbol={
                      <i className="fas fa-star text-yellow-500 text-lg"></i>
                    }
                    readonly
                  />
                  <span className="ml-2">{`${(
                    (ratingCounts[3] / reviews.length) *
                    100
                  ).toFixed(0)}%`}</span>
                </div>
                <div>
                  <ReactRating
                    initialRating={2}
                    emptySymbol={
                      <i className="far fa-star text-gray-400 text-lg"></i>
                    }
                    fullSymbol={
                      <i className="fas fa-star text-yellow-500 text-lg"></i>
                    }
                    readonly
                  />
                  <span className="ml-2">{`${(
                    (ratingCounts[2] / reviews.length) *
                    100
                  ).toFixed(0)}%`}</span>
                </div>
                <div>
                  <ReactRating
                    initialRating={1}
                    emptySymbol={
                      <i className="far fa-star text-gray-400 text-lg"></i>
                    }
                    fullSymbol={
                      <i className="fas fa-star text-yellow-500 text-lg"></i>
                    }
                    readonly
                  />
                  <span className="ml-2">{`${(
                    (ratingCounts[1] / reviews.length) *
                    100
                  ).toFixed(0)}%`}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 justify-center">
                <button className="bg-green-900 text-center w-[150px] p-3 rounded-xl">
                  <a href="/review" className="text-lg font-bold text-white">
                    Share your thoughts:
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#166534] rounded-md p-4 shadow-md my-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={`https://avatars.dicebear.com/api/male/${review.user}.svg`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <p className="text-sm text-white">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 font-medium mr-2">
                    {review.rating}
                  </p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500 fill-current"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 7.858l-6.025-.875L10 .858 6.025 6.983 0 7.858l4.62 4.515-.94 5.482L10 14.225l4.32 2.63-.94-5.482z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    {[...Array(5 - review.rating)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-300 fill-current"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 7.858l-6.025-.875L10 .858 6.025 6.983 0 7.858l4.62 4.515-.94 5.482L10 14.225l4.32 2.63-.94-5.482z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-white">{review.comment}</p>
              </div>
              <div className="flex flex-wrap mt-4">
                {review.images.map((image, index) => (
                  <div key={index} className="w-full md:w-1/2 p-2">
                    <img
                      src={image}
                      alt="uploaded"
                      className="w-full rounded shadow-sm"
                      onClick={() => handleImageSelect(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <Modal image={selectedImage} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};

export default Reviews;
