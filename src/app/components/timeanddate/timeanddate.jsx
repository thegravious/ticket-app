import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ReservationForm = ({ seatnumber }) => {
  console.log(seatnumber)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    guest: '',
    seatPreference: seatnumber || '', // Initialize with seatnumber
    date: '',
    time: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { name, guest, date, time, contact, seatPreference } = formData;
    seatPreference = seatnumber
    let data = { name, guest, date, time, contact, seatPreference };
    try {
      setLoading(true); // Start loading
      const response = await fetch("http://localhost:8000/api/booking/bookingorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setError('There was an error submitting your reservation. Please try again.');
        toast.warning('Reservation Failed');
      } else {
        setFormData({
          name: '',
          contact: '',
          guest: '',
          seatPreference: seatnumber || '',
          date: '',
          time: '',
        });
        toast.success('Reservation submitted successfully!');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      toast.error('Reservation Failed');
    } finally {
      setLoading(false); // End loading
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
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto text-black lg:w-3/4 space-y-6 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-6 sm:space-y-8">
          {/* Name Field */}
          <div>
            <label className="text-gray-700 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Contact Number Field */}
          <div>
            <label className="text-gray-700 font-medium" htmlFor="contact">
              Contact Number
            </label>
            <input
              type="number"
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Number of Guests Field */}
          <div>
            <label className="text-gray-700 font-medium" htmlFor="guest">
              Number of Guests
            </label>
            <input
              type="number"
              id="guest"
              value={formData.guest}
              onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Seat Preference Field */}
          <div>
            <label className="text-gray-700 font-medium" htmlFor="seatPreference">
              Seat Preference
            </label>
            <input
              type="text"
              id="seatPreference"
              // disabled
              value={seatnumber}
              onChange={(e) => setFormData({ ...formData, seatPreference: e.target.value })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>

          {/* Date and Time Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Select Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => {
                  let dt = e.target.value
                  let d = new Date(dt)
                  if(String(d.getFullYear()).length>4){
                    return;
                  }
                  setFormData({ ...formData, date: e.target.value })
                }}
                className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
                required
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Select Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full py-3 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Reservation'}
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
