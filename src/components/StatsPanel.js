import React, { useEffect, useState } from "react";
import { clearTicketCache, getTickets } from "../utils/localStorage";
import "../stylesheets/StatsPanel.css";

const StatsPanel = ({ tickets: initialTickets }) => {
  const [tickets, setTickets] = useState(initialTickets);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  // Tickets created during a period
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const activeTickets = tickets.filter((r) => r.status === "Active").length;

  const resolvedTickets = tickets.filter((r) => r.status === "Resolved").length;

  // Total created tickets by ticket type

  // Price adjustment
  const priceTickets = tickets.filter(
    (r) => r.ticketType === "Price adjustment"
  ).length;

  // EV charge
  const evChargeTickets = tickets.filter(
    (r) => r.ticketType === "EV charge"
  ).length;

  // Miles
  const milesTickets = tickets.filter((r) => r.ticketType === "Miles").length;

  // Check-in
  const checkinTickets = tickets.filter(
    (r) => r.ticketType === "Check-in"
  ).length;

  return (
    <div className="stats-panel">
      <h3>📊 Ticket Stats</h3>
      <ul>
        <li>🎫 Total created: {tickets.length}</li>
        <li> 🟢 Active: {activeTickets}</li>
        <li> ✅ Resolved: {resolvedTickets}</li>
      </ul>
      <h3>🎫 Ticket Types</h3>
      <ul>
        <li> 💲 Price adjustment: {priceTickets}</li>
        <li> ⚡ EV charge: {evChargeTickets}</li>
        <li> 🚗 Fix miles: {milesTickets}</li>
        <li> ✅ Fix check-in {checkinTickets}</li>
      </ul>
      <button
        type="button"
        onClick={() => {
          clearTicketCache();
          setTickets(getTickets()); // Re-fetch and update state
        }}
      >
        Clear cache
      </button>
    </div>
  );
};

export default StatsPanel;
