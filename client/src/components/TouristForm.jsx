import React, { useState } from "react";
import { addTourist } from "../features/admin/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const TouristForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    dispatch(addTourist({ formData, toast }));
  };

  return (
    <div>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-medium mb-4">Add New Tourist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full rounded-lg border-gray-300 p-3 text-sm"
              value={username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border-gray-300 p-3 text-sm"
              value={email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border-gray-300 p-3 text-sm"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-green-600 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TouristForm;
