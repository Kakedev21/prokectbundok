import Nav from "../components/Nav";

import Bookinginfo from "../components/Bookinginfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser, addBooking, getTouristGuide } from "../features/userSlice";
import { toast } from "react-toastify";

import UserHeader from "../components/UserHeader";
import UsersBooking from "../components/UsersBooking";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [adultsCount, setAdultsCount] = useState(0);
  const [minorsCount, setMinorsCount] = useState(0);
  const [adultsNames, setAdultsNames] = useState([""]);
  const [minorsNames, setMinorsNames] = useState([""]);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });

  const [selectedTourGuide, setSelectedTourGuide] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user) {
      dispatch(getTouristGuide());
      dispatch(getUser());
    }
  }, [dispatch, navigate]);

  const { userTourGuide } = useSelector((state) => state.user);

  const handleAdultsCountChange = (event) => {
    const count = parseInt(event.target.value) || 0; // ensure non-negative integer
    setAdultsCount(count);
    setAdultsNames(Array.from({ length: count }, () => ""));
  };

  const handleMinorsCountChange = (event) => {
    const count = parseInt(event.target.value) || 0; // ensure non-negative integer
    setMinorsCount(count);
    setMinorsNames(Array.from({ length: count }, () => ""));
  };

  const handleAdultsNameChange = (event, index) => {
    const newAdultsNames = [...adultsNames];
    newAdultsNames[index] = event.target.value;
    setAdultsNames(newAdultsNames);
  };

  const handleMinorsNameChange = (event, index) => {
    const newMinorsNames = [...minorsNames];
    newMinorsNames[index] = event.target.value;
    setMinorsNames(newMinorsNames);
  };

  const handleDatachange = (e) => {
    setBookingData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTourGuideChange = (event) => {
    const selectedTourGuideName = event.target.value;
    const selectedTourGuideObject = userTourGuide.find(
      (tourGuide) => tourGuide.fullName === selectedTourGuideName
    );
    setSelectedTourGuide(selectedTourGuideObject);
  };

  useEffect(() => {
    if (selectedTourGuide) {
      setAvailableDates(selectedTourGuide.availability);
      setSelectedDate(null); // reset selected date when tour guide changes
    }
  }, [selectedTourGuide]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const availableDatesAsDate = availableDates.map((dateString) => {
    const [month, day, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !bookingData.name ||
      !bookingData.address ||
      !bookingData.email ||
      !bookingData.contact
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    const bookingForm = {
      ...bookingData,
      date: selectedDate,
      minor: [
        {
          count: minorsCount,
          names: minorsNames,
        },
      ],
      adult: [
        {
          count: adultsCount,
          names: adultsNames,
        },
      ],
      tourGuide: selectedTourGuide._id,
      touristName: user.username,
    };
    dispatch(addBooking(bookingForm));
    window.location.reload();
  };

  return (
    <>
      <div className="bg-white container h-full mx-auto">
        <Nav />
        <UserHeader username={user ? user.username : ""} />
        <section className="bg-gray-100">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            {user && !user.isBooked ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Information</h2>
                    <Bookinginfo />
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="bg-[#75C184] rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-[#165D3E]">
                      Forms
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={bookingData.name}
                          onChange={handleDatachange}
                          autoComplete="off"
                          className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="block text-[#165D3E] font-bold mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            className="w-full rounded-lg border-gray-300 p-3 text-sm"
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={bookingData.email}
                            onChange={handleDatachange}
                          />
                        </div>

                        <div>
                          <label
                            className="block text-[#165D3E] font-bold mb-2"
                            htmlFor="phone"
                          >
                            Contact
                          </label>
                          <input
                            className="w-full rounded-lg border-gray-300 p-3 text-sm"
                            placeholder="Phone Number"
                            type="tel"
                            id="phone"
                            name="contact"
                            value={bookingData.contact}
                            onChange={handleDatachange}
                          />
                        </div>

                        <div>
                          <label
                            className="block text-[#165D3E] font-bold mb-2"
                            htmlFor="address"
                          >
                            Address
                          </label>
                          <input
                            className="w-full rounded-lg border-gray-300 p-3 text-sm"
                            placeholder="Address"
                            type="address"
                            id="address"
                            name="address"
                            value={bookingData.address}
                            onChange={handleDatachange}
                          />
                        </div>

                        <div className="container mx-auto my-10 px-4">
                          <div className="mb-4">
                            <label
                              className="block text-[#165D3E] font-bold mb-2"
                              htmlFor="tourGuide"
                            >
                              Select Tour Guide
                            </label>
                            <select
                              id="tourGuide"
                              name="tourGuide"
                              value={
                                selectedTourGuide
                                  ? selectedTourGuide.fullName
                                  : ""
                              }
                              onChange={handleTourGuideChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#165D3E] leading-tight focus:outline-none focus:shadow-outline"
                              required
                            >
                              <option value="">
                                -- Select a tour guide --
                              </option>
                              {userTourGuide.map((tourGuide) => (
                                <option
                                  key={tourGuide._id}
                                  value={tourGuide.fullName}
                                >
                                  {tourGuide.fullName}
                                </option>
                              ))}
                            </select>
                          </div>
                          {selectedTourGuide && (
                            <>
                              <div className="flex flex-col items-center">
                                <div className="flex flex-col items-center space-y-2 mb-6">
                                  <img
                                    src={selectedTourGuide.profile}
                                    alt="Tour Guide Profile"
                                    className="w-32 h-32 rounded-full"
                                  />
                                  <h2 className="text-2xl font-bold">
                                    {selectedTourGuide.fullName}
                                  </h2>
                                  <p className="text-gray-600">
                                    {selectedTourGuide.contact}
                                  </p>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                  <label
                                    className="block text-gray-700 font-bold mb-2 relative"
                                    htmlFor="tourDate"
                                  >
                                    <span className="flex items-center">
                                      <svg
                                        className="h-6 w-6 fill-current text-gray-600 mr-2"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 18H5V8h14v13z" />
                                      </svg>
                                      Select Tour Date
                                    </span>
                                    <DatePicker
                                      id="tourDate"
                                      name="tourDate"
                                      dateFormat="MM/dd/yyyy"
                                      selected={selectedDate}
                                      onChange={handleDateChange}
                                      minDate={new Date()} // prevent selection of past dates
                                      excludeDates={availableDatesAsDate.filter(
                                        (date) => date < new Date()
                                      )}
                                      includeDates={availableDatesAsDate} // exclude dates that are not available
                                      className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline absolute top-full left-0 z-10"
                                      required
                                      showIcon={false}
                                    />
                                  </label>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <div>
                          <label>
                            Number of adults:
                            <input
                              type="number"
                              value={adultsCount}
                              onChange={handleAdultsCountChange}
                              style={{
                                border: "1px solid black",
                                padding: "5px 12px",
                              }}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Number of minors:
                            <input
                              type="number"
                              value={minorsCount}
                              onChange={handleMinorsCountChange}
                              style={{
                                border: "1px solid black",
                                padding: "5px 12px",
                              }}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Adult names:
                            {[...Array(adultsCount)].map((_, index) => (
                              <input
                                placeholder="First and Last Name "
                                key={index}
                                type="text"
                                value={adultsNames[index] || ""}
                                onChange={(event) =>
                                  handleAdultsNameChange(event, index)
                                }
                              />
                            ))}
                          </label>
                        </div>
                        <div>
                          <label>
                            Minor names:
                            {[...Array(minorsCount)].map((_, index) => (
                              <input
                                placeholder="First and Last Name"
                                key={index}
                                type="text"
                                value={minorsNames[index] || ""}
                                onChange={(event) =>
                                  handleMinorsNameChange(event, index)
                                }
                              />
                            ))}
                          </label>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-block w-full rounded-lg bg-[green] px-5 py-3 font-medium text-white sm:w-auto"
                        >
                          Send Enquiry
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <UsersBooking />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Booking;
