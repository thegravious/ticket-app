"use client";
import React, { useState, useEffect, useRef } from "react";
import "./seatinner.css";
import Sidebar from "../sidebar/sidebar";

const SeatInner = () => {
  const [selectedSeat, setSelectedSeat] = useState<string>(""); // Track selected seat
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false); // Manage sidebar visibility
  const openSideref = useRef<HTMLDivElement | null>(null);

  const seats = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];

  const handleSeatClick = (seat: string) => {
    setSelectedSeat(seat);
    setSidebarOpen(true); // Open sidebar when a seat is clicked
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openSideref.current && !openSideref.current.contains(event.target as Node)) {
        setSidebarOpen(false); // Close sidebar if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="seat-layout">
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
            </svg>
          </div>
          <div className="brutalist-card__alert">Ticket Booking App</div>
        </div>
        <div className="brutalist-card__message">
          Here you can book seats from A1 - C3
        </div>

        <div className="grid grid-cols-3 gap-4">
          {seats.map((seat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="brutalist-card__actions">
                <button
                  onClick={() => handleSeatClick(seat)}
                  className="brutalist-card__button brutalist-card__button--read"
                >
                  Table: {seat}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Component */}
        {isSidebarOpen && (
          <div ref={openSideref}>
            <Sidebar seatno={selectedSeat} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatInner;
