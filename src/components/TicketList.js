import React, { useEffect, useState } from "react";
import {
  getTickets,
  addTicket,
  closeTicket,
  updateTicket,
} from "../utils/localStorage";
import TicketForm from "./TicketForm";
import StatsPanel from "./StatsPanel";
import "../stylesheets/RentalList.css";
import ExportTicketsButton from "./ExportTicketsButton";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tab, setTab] = useState("tickets"); // "tickets" or "stats"

  // Re-renders tickets list on state change
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  // Add a new rental
  const handleAddTicket = (ticket) => {
    // Creates and saves new ticket to local memory
    const newTicket = addTicket(ticket);

    // Update state
    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    setShowModal(false);
  };

  // Update existing rental
  const handleUpdateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === updatedTicket.id
        ? { ...updatedTicket, timestamp: ticket.timestamp }
        : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setSelectedTicket(null);
  };

  // Show EditRental form when user clicks "Edit"
  const handleEditTicket = (id) => {
    const ticketToEdit = tickets.find((ticket) => ticket.id === id);
    setSelectedTicket(ticketToEdit);
  };

  // Cancel editing
  const handleCancel = () => {
    setSelectedTicket(null);
  };

  // Changes ticket status from "Active" to "Resolved"
  const handleCloseTicket = (id) => {
    closeTicket(id);
    setTickets(getTickets());
  };

  const fieldLabels = {
    rentalId: "Rental ID",
    vehicleId: "Vehicle ID",
    carName: "Car name",
    customerName: "Customer name",
    fuelLevel: "Fuel level",
    chargeLevel: "Charge level",
    notes: "Notes",
    ticketType: "Ticket type",
    status: "Status",
    timestamp: "Timestamp",
  };

  const renderTicketDetails = (ticket) => {
    const displayFields = Object.entries(ticket).filter(([key, value]) => {
      const notEmpty = value !== "" && value !== null && value !== undefined;
      const isDisplayable = key !== "id" && fieldLabels[key];
      return notEmpty && isDisplayable;
    });

    return (
      <ul>
        {displayFields.map(([key, value]) => (
          <li key={key}>
            <strong>{fieldLabels[key]}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Car Rental Ticket Tracker</h2>

      <div className="tab-buttons">
        <button onClick={() => setTab("tickets")}>📄 Rental Tickets</button>
        <button onClick={() => setTab("stats")}>📊 View Stats</button>
        <ExportTicketsButton />
      </div>

      {tab === "tickets" && (
        <>
          <button onClick={() => setShowModal(true)}>Add Ticket</button>

          {showModal && (
            <TicketForm
              onClose={() => setShowModal(false)}
              onSave={handleAddTicket}
            />
          )}

          {selectedTicket && (
            <TicketForm
              ticket={selectedTicket}
              onSave={handleUpdateTicket}
              onClose={handleCancel}
            />
          )}

          {tickets.length === 0 && <p>No active tickets.</p>}

          {[...tickets]
            .filter((ticket) => ticket.status === "Active")
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((ticket) => (
              <div key={ticket.id} className="rental-card">
                {renderTicketDetails(ticket)}
                <button onClick={() => handleEditTicket(ticket.id)}>
                  Edit
                </button>
                <button onClick={() => handleCloseTicket(ticket.id)}>
                  Close
                </button>
              </div>
            ))}
        </>
      )}

      {tab === "stats" && <StatsPanel tickets={tickets} />}
    </div>
  );
};

export default TicketList;
