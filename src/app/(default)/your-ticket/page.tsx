"use client";

import React from "react";
import { ToastContainer, toast } from 'react-toastify';

const Ticket = () => {
  const [bookings, setBookings] = React.useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/booking/bookingorder",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(data.message); // Assuming data.message contains the bookings array
      } else {
        console.error("Failed to fetch bookings:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const [deleteid] = React.useState("");
  console.log(deleteid);

  const deleteBooking = async (deleteid) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/booking/bookingorder/${deleteid}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success('Reservation deleted successfully!');
        fetchBookings();
      } else {
        console.error("Failed to delete booking:", response.statusText);
        toast.waring('something went wrong');
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

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
      <div className="tickets-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {bookings &&
          bookings.map((data) => (
            <div
              key={data._id}
              className="border border-red-600 text-black text-center p-4 rounded-lg shadow-sm"
            >
              <div className="header text-lg font-semibold mb-4">
                Order #{data._id}
              </div>
              <div className="content mb-4 text-sm space-y-1">
                <p className="text-base uppercase">
                  <strong>Name:</strong> {data.name}
                </p>
                <p className="text-base uppercase">
                  <strong>Contact:</strong> {data.contact}
                </p>
                <p className="text-base uppercase">
                  <strong>Guest:</strong> {data.guest}
                </p>
                <p className="text-base uppercase">
                  <strong>Seat Preference:</strong> {data.seatPreference}
                </p>
                <p className="text-base uppercase">
                  <strong>Date:</strong> {data.date}
                </p>
                <p className="text-base uppercase">
                  <strong>Time:</strong> {data.time}
                </p>
              </div>
              <div className="footer mt-auto flex justify-between items-center">
                <button
                  onClick={() => {
                    // setDeleteID(data._id);  // Set the delete ID
                    deleteBooking(data._id); // Call deleteBooking after setting the ID
                  }}
                  className="cancel-link text-white bg-red-500 py-1 px-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Ticket;
