import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import Nav from "../components/Nav";

import { login } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import back from "../img/bacj.png";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { user } = useSelector((state) => state.user);

  const { username, password } = userData;

  const handleChange = (e) => {
    setUserData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(login({ userData, navigate, toast }));
  };

  useEffect(() => {
    if (user) {
      navigate("/booking");
    }
  }, [dispatch, user, login, navigate]);

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
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <img src={logo} alt="" />
                </a>

                <h1 className="mt-2 text-2xl font-bold text-[#F5F5F5] sm:text-3xl md:text-4xl">
                  Project Bundok
                </h1>

                <p className="mt-4 leading-relaxed text-[#F5F5F5]">
                  The ultimate booking platform for hikers! Log in to your
                  account to access all the amazing features and plan your next
                  adventure in the great outdoors. Whether you're a seasoned
                  hiker or just getting started, it has everything you need to
                  make your next hiking trip unforgettable.
                </p>
              </div>

              <div className="hidden lg:relative lg:block lg:p-12">
                <a className="block text-white">
                  <span className="sr-only">Home</span>
                  <img
                    src={logo}
                    alt=""
                    className="w-[200px] bg-white rounded-full"
                  />
                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Project Bundok
                </h2>

                <p className="mt-4 leading-relaxed text-[#F5F5F5]">
                  The ultimate booking platform for hikers! Log in to your
                  account to access all the amazing features and plan your next
                  adventure in the great outdoors. Whether you're a seasoned
                  hiker or just getting started, it has everything you need to
                  make your next hiking trip unforgettable.
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
                    className="outline-none mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-[#000] shadow-sm p-[3px]"
                    value={username}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
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

                {/* <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-[#F5F5F5] underline mr-3 ml">
                      terms and conditions
                    </a>
                    and
                    <a href="#" className="text-[#F5F5F5] underline ml-3">
                      privacy policy
                    </a>
                    .
                  </p>
                </div> */}

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border-none bg-[#22BB61] px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
                  >
                    Login
                  </button>

                  <p className="mt-4 text-sm text-[#fff] sm:mt-0">
                    Don't have account yet?
                    <a href="/register" className="text-[#F5F5F5] underline">
                      {" "}
                      Register
                    </a>
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

export default Login;
