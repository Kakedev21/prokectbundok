import React, { useEffect, useState } from "react";
import { PhotographIcon, UserCircleIcon } from "@heroicons/react/solid";
import TouristHeader from "../components/TouristHeader";
import FileBase from "react-file-base64";
import {
  touristProfile,
  getTouristGuide,
} from "../features/tourist/touristSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TouristProfileSection from "../components/TouristProfileSection";

const TouristProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [touristData, setTouristData] = useState({
    fullName: "",
    contact: "",
    profile: "",
    desc: "",
    email: "",
    address: "",
    isAvailable: false,
  });

  useEffect(() => {
    dispatch(getTouristGuide());
  }, []);

  const { touristGuide } = useSelector((state) => state.tourist);

  const { fullName, contact, profile, desc, isAvailable, email, address } =
    touristData;

  const handleChange = (e) => {
    setTouristData({ ...touristData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setTouristData({
      ...touristData,
      isAvailable: !touristData.isAvailable,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      contact,
      profile,
      desc,
      isAvailable,
      email,
      address,
    };
    dispatch(touristProfile({ formData, toast }));
  };

  return (
    <>
      <TouristHeader />
      {!touristGuide || touristGuide.length === 0 ? (
        <div className="w-full h-full bg-[#F5F5F5] p-[5%]">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="fullName"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="contact"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={contact}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="desc"
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    value={desc}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {profile ? (
                    <img
                      src={profile}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-20 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setTouristData({ ...touristData, profile: base64 })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">Available:</span>
                <button
                  type="button"
                  className={`${
                    touristData.isAvailable ? "bg-green-500" : "bg-gray-500"
                  } rounded-full w-12 h-6 transition-colors duration-300 ease-in-out`}
                  onClick={handleToggle}
                >
                  <span
                    className={`${
                      touristData.isAvailable
                        ? "translate-x-3"
                        : "translate-x-[-20]"
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
                  ></span>
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <TouristProfileSection tourGuide={touristGuide} />
        </div>
      )}
    </>
  );
};

export default TouristProfile;
