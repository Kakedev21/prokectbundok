import React from "react";

import style from "../styles/HomeCta.module.css";

const RowCta = ({ title, desc, images }) => {
  return (
    <div className="row-cta mt-10">
      <div className={`${style.cimg}`}>
        <img src={images} className="w-screen" />
      </div>
      <h1 className="font-bold text-center mt-10 text-4xl text-[green]">
        {title}
      </h1>
      <p className="text-center mt-3 font-[100]">{desc}</p>
    </div>
  );
};

export default RowCta;
