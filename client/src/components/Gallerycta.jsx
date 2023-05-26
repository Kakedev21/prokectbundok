import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import style from "../styles/gallery.module.css";
import has from "../img/has.png";
import has1 from "../img/has2.png";
import has2 from "../img/has3.png";
import has3 from "../img/has4.png";

const handleDragStart = (e) => e.preventDefault();

import camp1 from "../img/1.png";

const items = [
  <img
    src={has}
    onDragStart={handleDragStart}
    role="presentation"
    className="m-auto rounded-3xl"
  />,
  <img
    src={has1}
    onDragStart={handleDragStart}
    role="presentation"
    className="m-auto rounded-3xl m:h-[700px] lg:h-[800px]"
  />,
  <img
    src={has2}
    onDragStart={handleDragStart}
    role="presentation"
    className="m-auto rounded-3xl"
  />,
  <img
    src={has3}
    onDragStart={handleDragStart}
    role="presentation"
    className="m-auto rounded-3xl"
  />,
];

const Gallerycta = () => {
  return (
    <div className="h-full w-full m-auto">
      <h1 className={style.font}>Gallery</h1>
      <div className="flex justify-center items-center max-[600px]:mr-3">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={{
            0: {
              items: 1,
            },
            1024: {
              items: 1,
              itemsFit: "contain",
            },
          }}
          infinite
          autoPlay
          autoPlayInterval={1500}
        />
      </div>
    </div>
  );
};

export default Gallerycta;
