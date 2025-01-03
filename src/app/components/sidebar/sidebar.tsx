"use client";
import { ToastContainer, toast } from "react-toastify";
import React, { ChangeEvent, FormEvent } from "react";
// import Dateandtime from "../timeanddate/timeanddate"
import Inputfield from "../inputfield/inputfield";
// import CloseButton from "../closeButton/closeButton"
import SubmitButton from "../submitbutton/submitbutton";


interface Sidebartypes{
  seatno:string,
  closeSidebar?():void 
}

const Sidebar:React.FC<Sidebartypes> = ({ seatno, closeSidebar }) => {
  const data = seatno;
  const [bookingDetails, setBookingDetails] = React.useState({
    name: "",
    contact: "",
    guest: "",
    seatPreference: seatno,
    date: "",
    time: "",
  });



  const handleSubmit = async (e: FormEvent) => {
    const { name, contact, seatPreference, guest, date, time } = bookingDetails;
    const payLoad = { name, contact, seatPreference, guest, date, time };
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-server-13ui.onrender.com/api/booking//bookingorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payLoad),
        }
      );
      if (!response.ok) {
        // setError('There was an error submitting your reservation. Please try again.');
        toast.warning("Reservation Failed");
      } else {
        toast.success("Reservation submitted successfully!");
        setBookingDetails({
          name: "",
          contact: "",
          guest: "",
          seatPreference: seatno,
          date: "",
          time: "",
        });
      }
    } catch {
      toast.error("Something went");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <CloseButton/> */}
      <form
        onSubmit={handleSubmit}
        className="h-screen lg:grid lg:grid-cols-2 bg-gray-300 lg:w-[50vw] w-full fixed top-0 left-0 min-w-[260px] pt-10 lg:p-20 font-[sans-serif] overflow-auto"
      >
        <div className="absolute">
          <button
            className="relative md:z-40 lg:left-[640px] bottom-[25px] left-[240px] lg:top-[20px] z-30 border-2 border-black group hover:border-black w-12 h-12 duration-500 overflow-hidden"
            type="button" onClick={closeSidebar}
          >
            <p className="font-Manrope text-3xl h-full w-full flex items-center justify-center text-black duration-500 relative z-10 group-hover:scale-0">
              ×
            </p>
            <span className="absolute w-full h-full bg-black rotate-45 group-hover:top-9 duration-500 top-12 left-0"></span>
            <span className="absolute w-full h-full bg-black rotate-45 top-0 group-hover:left-9 duration-500 left-12"></span>
            <span className="absolute w-full h-full bg-black rotate-45 top-0 group-hover:right-9 duration-500 right-12"></span>
            <span className="absolute w-full h-full bg-black rotate-45 group-hover:bottom-9 duration-500 bottom-12 right-0"></span>
          </button>
        </div>
        {/* <Dateandtime seatnumber={data}/> */}
        <Inputfield
          labelvalue={"Enter Name"}
          inputType="text"
          inputvalue={bookingDetails.name}
          changeValue={(e: ChangeEvent<HTMLInputElement>) => {
            setBookingDetails({ ...bookingDetails, name: e.target.value });
          }}
        />
        <Inputfield
          labelvalue={"Enter Contact Number"}
          inputType="text"
          inputvalue={bookingDetails.contact}
          changeValue={(e: ChangeEvent<HTMLInputElement>) => {
            setBookingDetails({ ...bookingDetails, contact: e.target.value });
          }}
        />
        <Inputfield
          labelvalue={"Number of Guest"}
          inputType="text"
          inputvalue={bookingDetails.guest}
          changeValue={(e: ChangeEvent<HTMLInputElement>) => {
            setBookingDetails({ ...bookingDetails, guest: e.target.value });
          }}
        />
        <Inputfield labelvalue={"Seat Preference"} inputvalue={data} />
        <Inputfield
          labelvalue={"Date"}
          inputType="Date"
          inputvalue={bookingDetails.date}
          changeValue={(e: ChangeEvent<HTMLInputElement>) => {
            setBookingDetails({ ...bookingDetails, date: e.target.value });
          }}
        />
        <Inputfield
          labelvalue={"Time"}
          inputType="time"
          inputvalue={bookingDetails.time}
          changeValue={(e: ChangeEvent<HTMLInputElement>) => {
            setBookingDetails({ ...bookingDetails, time: e.target.value });
          }}
        />
        <div className="ml-10">
          <SubmitButton ButtonText="Submit" />
        </div>
      </form>
    </>
  );
};

export default Sidebar;
