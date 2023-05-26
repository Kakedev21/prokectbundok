import React from "react";
import wavecta from "../img/wavecta.png";

import style from "../styles/HomeCta.module.css";

import camp1 from "../img/1.png";
import camp2 from "../img/2.png";
import camp3 from "../img/3.png";
import wave1 from "../img/wave1.svg";

import RowCta from "./RowCta";
import BodyCta from "./BodyCta";
import Gallerycta from "./Gallerycta";
import Bookcta from "./Bookcta";
import Footer from "./Footer";
import Testimonial from "./Testimonial";

const HomeCta = () => {
  return (
    <>
      <main className="w-screen h-full bg-[#fff] relative">
        <img src={wavecta} alt="" className="w-full h-[120px] wave-cta" />
        <div className="col-cta w-full flex items-center justify-center flex-col">
          <h3 className={`${style.font}`}>Take yourself</h3>
          <h2 className="font-bold mt-3 text-xl font-[30px]">
            Explore Adventure
          </h2>
          <div className="flex lg:flex-row sm:flex-col max-[600px]:flex-col">
            <RowCta
              title={"Hiking"}
              desc={"Rewards waiting in the Peak!"}
              images={camp1}
            />
            <div style={{ margin: " 0 180px" }}>
              <RowCta
                title={"Camping"}
                desc={"Marshmallow and fire"}
                images={camp2}
              />
            </div>
            <RowCta
              title={"Activities"}
              desc={"Complete the challenge!"}
              images={camp3}
            />
          </div>
          <img src={wave1} className="lg:mt-[-120px] sm:mt-10" />
        </div>
        <BodyCta />
        <Gallerycta />
        {/* <Bookcta /> */}
        <Testimonial />
        <div className="flex flex-col items-center gap-4 rounded-lg bg-green-600 p-6 shadow-lg sm:flex-row sm:justify-between mb-10">
          <strong className="text-xl text-white sm:text-xl">
            Ready to get started?
          </strong>

          <a
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-green-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
            href="/login"
          >
            <span className="text-sm font-medium"> Book now! </span>

            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default HomeCta;
