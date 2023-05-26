import React from "react";
import logo from "../img/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#166534] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
              <h2 className="text-lg font-semibold text-white mb-4">
                About Us
              </h2>
              <p className="text-[#fff] leading-loose">
                Project Bundok is a hiking tour company based in Calauan Laguna.
                We offer guided hikes, equipment rentals, and more.
              </p>
            </div>
            <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
              <h2 className="text-lg font-semibold text-white mb-4">
                Contact Us
              </h2>
              <ul className="text-[#fff] leading-loose">
                <li>Address: Brgy. Lamot 2 Calauan Laguna</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@juan-hiker.com</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
              <h2 className="text-lg font-semibold text-white mb-4">
                Useful Links
              </h2>
              <ul className="text-[#fff] leading-loose">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/bookings">Bookings</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
              <h2 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h2>
              <ul className="flex">
                <li className="mr-4">
                  <a href="#">
                    <i className="fab fa-facebook-square text-[#fff] text-2xl hover:text-white"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a href="#">
                    <i className="fab fa-twitter-square text-[#fff] text-2xl hover:text-white"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram-square text-[#fff] text-2xl hover:text-white"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="border-gray-700 my-8" />
          <div className="flex justify-between items-center">
            <p className="text-[#fff]">
              &copy; 2023 JuanHiker. All rights reserved.
            </p>
            <ul className="flex text-[#fff]">
              <li className="mr-4">
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
