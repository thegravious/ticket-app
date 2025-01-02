"use client";
import React, { useEffect } from "react";
import Sidebar from "../sidebar/sidebar";

const SeatLayout = () => {
  const seat = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  const [openSide, setOpenSide] = React.useState(""); // Track the selected seat
  const [sidebar, setSidebar] = React.useState(false); // Track if the sidebar is visible

  const openSideref = React.useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!openSideref?.current?.contains(event?.target)) {
        setSidebar(false);
      }
    });
  });

  useEffect(() => {
    if (openSide) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }, [openSide]);

  return (
    <div className="">
      <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-red-600">
        <h2 className="text-2xl text-center font-semibold text-gray-700 capitalize dark:text-white">
          Book Your Seat
        </h2>
        <div className="grid grid-cols-3 gap-6  mt-6">
          {seat.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Checkbox */}
              <input
                checked={openSide === data} // Check if the current seat is the selected seat
                onChange={() => {
                  if (openSide === data) {
                    setOpenSide(""); // Uncheck and close the sidebar if the same seat is unchecked
                  } else {
                    setOpenSide(data); // Select the seat and show the sidebar
                  }
                }}
                type="checkbox"
                id={data}
                className="w-20 h-20 appearance-none bg-gray-200 rounded-md  checked:bg-red-900"
              />
              {/* Label for each seat */}
              <label
                htmlFor={data}
                className="mt-2 text-sm uppercase text-gray-700 dark:text-gray-300"
              >
                {data}
              </label>
            </div>
          ))}
        </div>
        {/* Sidebar visibility */}
        <div ref={openSideref} className={`${sidebar ? "block" : "hidden"}`}>
          <Sidebar seatno={openSide} />
        </div>
      </section>
    </div>
  );
};

export default SeatLayout;
