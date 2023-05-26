import React from "react";
import Nav from "../components/Nav";
import ReactTypingEffect from "react-typing-effect";

import HomeCta from "../components/HomeCta";
import RouteButton from "../components/RouteButton";

import logo from "../img/logo.png";

const Home = () => {
  return (
    <>
      <div className="w-full h-[80vh] bg-cover bg-center bg-no-repeat">
        <Nav />
        <div className="flex items-center flex-col h-[60%] mt-[150px]">
          <img
            src={logo}
            className="w-[150px] md:w-[150px] lg:w-[150px] rounded-full shadow-lg mb-4"
          />
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white text-center mb-4">
            Mount Kalisungan
          </h1>
          <ReactTypingEffect
            text={["Hiker", "Nature", "Challenge", "Beauty"]}
            cursorRenderer={(cursor) => <h1>{cursor}</h1>}
            speed={100}
            eraseSpeed={100}
            eraseDelay={2000}
            typingDelay={1000}
            displayTextRenderer={(text, i) => {
              return (
                <h1
                  className="text-white text-center"
                  style={{ fontSize: "23px" }}
                >
                  Discover the
                  {text.split(" ").map((char, i) => {
                    const key = `${i}`;
                    return (
                      <span
                        key={key}
                        className="font-bold"
                        style={{ color: "#16A34A", fontSize: "30px" }}
                      >
                        {" "}
                        {char}
                      </span>
                    );
                  })}
                </h1>
              );
            }}
          />
          <RouteButton />
        </div>
      </div>
      <HomeCta />
    </>
  );
};

export default Home;
