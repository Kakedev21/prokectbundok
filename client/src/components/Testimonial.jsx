import React, { useEffect } from "react";
import { getReviews } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReacRating from "react-rating";

const Testimonial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
  }, [getReviews]);

  const { reviews } = useSelector((state) => state.user);

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="items-end justify-between sm:flex">
          <div className="max-w-xl p-10">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-green-600 ">
              Read trusted reviews from our customers
            </h2>
            <p className="mt-8 max-w-lg text-gray-500">
              "See what fellow hikers are saying about their experiences with
              our system! From trail recommendations to guide services, our
              users have shared their honest ratings and feedback to help you
              plan your next adventure with confidence."
            </p>
          </div>

          <a
            href="/reviews"
            className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-full border border-green-600 px-5 py-3 font-medium text-green-600 hover:bg-green-600 hover:text-white sm:mt-0 lg:mt-8"
          >
            Read all reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews &&
            reviews.length > 0 &&
            reviews.slice(0, 3).map((review) => (
              <div
                className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg shadow-lg"
                key={review._id}
              >
                <div className="flex flex-col items-center justify-center mb-8">
                  <img
                    src={review.images}
                    alt="Review Image"
                    className="w-20 h-20 object-cover rounded-full shadow-lg"
                  />
                  <h3 className="text-2xl font-bold text-green-600 mt-4">
                    {review.name}
                  </h3>
                  <ReacRating
                    initialRating={review.rating}
                    readonly
                    emptySymbol="far fa-star text-green-600"
                    fullSymbol="fas fa-star text-green-600"
                    className="mt-2"
                  />
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <footer className="text-gray-500 text-sm mt-4">
                  {new Date(review.createdAt).toLocaleDateString()}
                </footer>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
