import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";

import logo from "../img/logo.png";
import back from "../img/bacj.png";

import { register } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userData;

  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setUserData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(register({ userData, navigate, toast }));
  };

  useEffect(() => {
    if (user) {
      navigate("/booking");
    }
  }, []);

  return (
    <>
      <section className="bg-[#166534]">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src={back}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          </section>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <img src={logo} alt="" />
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Project Bundok
                </h1>

                <p className="mt-4 leading-relaxed text-[#F5F5F5]">
                  Our web app is the perfect tool for hikers looking to book
                  their next adventure. With easy-to-use booking features and a
                  user-friendly interface, we make it simple to plan your next
                  hiking trip. Sign up today to start exploring all that has to
                  offer!
                </p>
              </div>

              <div className="hidden lg:relative lg:block lg:p-12">
                <a className="block text-white" href="/">
                  <span className="sr-only">Home</span>
                  <img src={logo} alt="" className="w-[200px]" />
                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Project Bundok
                </h2>

                <p className="mt-4 leading-relaxed text-white/90">
                  Our web app is the perfect tool for hikers looking to book
                  their next adventure. With easy-to-use booking features and a
                  user-friendly interface, we make it simple to plan your next
                  hiking trip. Sign up today to start exploring all that has to
                  offer!
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-[#F5F5F5]"
                  >
                    User Name
                  </label>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="outline-none mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-[#000] p-[3px] shadow-sm"
                    value={username}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-[#F5F5F5]"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="outline-none mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-[#000] p-[3px] shadow-sm"
                    value={email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-[#F5F5F5]"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    className="outline-none mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-[#000] p-[3px] shadow-sm"
                    value={password}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-[#F5F5F5]"
                  >
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="outline-none mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-[#000] p-[3px] shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-[#F5F5F5]">
                    By creating an account, you agree to our {"  "}
                    <a href="#" className="text-[#F5F5F5] underline mr-3 ml">
                      terms and conditions
                    </a>
                    and
                    <a href="#" className="text-[#F5F5F5] underline ml-3">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border-none bg-[#22BB61] px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
                  >
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-[#F5F5F5] sm:mt-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#F5F5F5] underline">
                      Log in
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Register;
