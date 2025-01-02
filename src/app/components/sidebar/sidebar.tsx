"use client";
import { ToastContainer, toast } from "react-toastify";
import React, { ChangeEvent, FormEvent } from "react";
// import Dateandtime from "../timeanddate/timeanddate"
import Inputfield from "../inputfield/inputfield";
import SubmitButton from "../submitbutton/submitbutton";

const Sidebar = ({ seatno }: { seatno: string }) => {
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
        "http://localhost:8000/api/booking//bookingorder",
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
      <form
        onSubmit={handleSubmit}
        className="h-screen lg:grid lg:grid-cols-2 bg-gray-300 lg:w-[50vw] w-full fixed top-0 left-0 min-w-[260px] pt-10 lg:p-20 font-[sans-serif] overflow-auto"
      >
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
          <SubmitButton
            ButtonText="Submit"
            Func={() => {
              console.log(bookingDetails);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default Sidebar;
