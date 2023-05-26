import React from "react";
import "../styles/Bookinginfo.module.css";

const Bookinginfo = () => {
  return (
    <div className="lg:col-span-2 overflow-scroll lg:py-12 h-[600px]">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-[#005C28]">Guidelines</h1>
        <ul className="Guide list-disc list-inside mb-6">
          <li className="font-bold mb-2 text-[#212121]">Pricing: </li>
          <li className="mb-2 text-[#212121]">
            Day Time: PHP 700 per tour guide maximum to 5 persons
          </li>
          <li className="mb-4 text-[#212121]">
            Overnight/Camping: PHP 1400 per tour guide maximum to 5 persons
          </li>
        </ul>
        <h3 className="text-xl mb-6 text-[#212121]">
          Entrance fee is 20 per head, we are not offering any online payment
          and downpayment.
        </h3>
      </div>

      <div className="mt-8">
        <a href="" className="text-3xl font-bold text-[#005C28] mb-6 block">
          Rules to follow
        </a>
        <ul className="list-disc list-inside mb-6">
          <li className="mb-2">Strictly No littering</li>
          <li className="mb-2">Tour Guide is mandatory</li>
          <li className="mb-2">
            Always ask the tour guide if you are picking some fruits or plants
          </li>
          <li className="mb-4">
            You are required to be oriented by the Brgy before Hiking.
          </li>
        </ul>

        <div className="mb-6">
          <a href="" className="text-3xl font-bold text-[#005C28] mb-6 block">
            Advice to bring
          </a>
          <p className="mb-2">
            Bring Extra shirt, boots, long sleeve, drinkable water
          </p>
          <address className="not-italic">
            282 Kevin Brook, Imogeneborough, CA 58517
          </address>
        </div>
      </div>
    </div>
  );
};

export default Bookinginfo;
