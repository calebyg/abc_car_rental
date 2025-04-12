// View tickets over a date/time range
import React from "react";

const StatsPanel = ({ rentals }) => {
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const activeTickets = rentals.filter((r) => r.status === "Active").length;

  const createdThisWeek = rentals.filter(
    (r) => new Date(r.timestamp) >= oneWeekAgo
  ).length;

  const resolvedThisWeek = rentals.filter(
    (r) =>
      r.status === "Resolved" &&
      r.resolvedAt &&
      new Date(r.resolvedAt) >= oneWeekAgo
  ).length;

  return (
    <div className="stats-panel">
      <h3>📊 Ticket Stats (Past 7 Days)</h3>
      <ul>
        <li>🎫 Created: {createdThisWeek}</li>
        <li>🟢 Active: {activeTickets}</li>
        <li>✅ Resolved: {resolvedThisWeek}</li>
      </ul>
    </div>
  );
};

export default StatsPanel;
