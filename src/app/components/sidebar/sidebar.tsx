"use client";
import React from "react";
import Dateandtime from "../timeanddate/timeanddate";

const sidebar = ({seatno}: {seatno : string}) => {
  const data = seatno
  console.log(data)
  return (
    <>
      <nav className="bg-red-600 h-screen lg:w-[35vw] w-[90vw] fixed top-0 left-0 min-w-[260px] py-6 font-[sans-serif] flex flex-col overflow-auto">
          <h2 className="lg:text-lg hidden lg:block mb-4 font-semibold text-center text-white">
            ENTER DETAILS FOR CONFIRMATION
          </h2>
          <Dateandtime seatnumber={data}/>
      </nav>
    </>
  );
};

export default sidebar;
