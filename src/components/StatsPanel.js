import React from "react";
import { clearTicketCache } from "../utils/localStorage";
import "../stylesheets/StatsPanel.css";

const StatsPanel = ({ rentals }) => {
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const activeTickets = rentals.filter((r) => r.status === "Active").length;

  const resolvedTickets = rentals.filter((r) => r.status === "Resolved").length;

  // Total created tickets by ticket type

  // Price adjustment
  const priceTickets = rentals.filter(
    (r) => r.ticketType === "Price adjustment"
  ).length;

  // EV charge
  const evChargeTickets = rentals.filter(
    (r) => r.ticketType === "EV charge"
  ).length;

  // Miles
  const milesTickets = rentals.filter((r) => r.ticketType === "Miles").length;

  // Check-in
  const checkinTickets = rentals.filter(
    (r) => r.ticketType === "Check-in"
  ).length;

  return (
    <div className="stats-panel">
      <h3>📊 Ticket Stats</h3>
      <ul>
        <li>🎫 Total created: {rentals.length}</li>
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
      <button type="button" onClick={clearTicketCache}>
        Clear cache
      </button>
    </div>
  );
};

export default StatsPanel;
