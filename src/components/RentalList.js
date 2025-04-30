import React, { useEffect, useState } from "react";
import {
  getTickets,
  addTicket,
  closeTicket,
  updateTicket,
} from "../utils/localStorage";
import RentalForm from "./RentalForm";
import StatsPanel from "./StatsPanel";
import "../stylesheets/RentalList.css";
import ExportTicketsButton from "./ExportTicketsButton";

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [tab, setTab] = useState("rentals"); // "rentals" or "stats"

  // Load rentals from localStorage on first render
  useEffect(() => {
    const storedRentals = JSON.parse(localStorage.getItem("rentals")) || [];
    setRentals(storedRentals);
  }, []);

  // Add a new rental
  const handleAddRental = (newRental) => {
    const rentalWithTimeStamp = {
      ...newRental,
      timestamp: new Date().toISOString(),
      resolvedAt: "",
    };

    const updatedRentals = [...rentals, rentalWithTimeStamp];
    setRentals(updatedRentals);
    localStorage.setItem("rentals", JSON.stringify(updatedRentals));
    setShowModal(false);
  };

  // Update existing rental
  const handleUpdateTicket = (updatedRental) => {
    const updatedRentals = rentals.map((rental) =>
      rental.id === updatedRental.id
        ? { ...updatedRental, timestamp: rental.timestamp }
        : rental
    );
    setRentals(updatedRentals);
    localStorage.setItem("rentals", JSON.stringify(updatedRentals));
    setSelectedRental(null);
  };

  // Show EditRental form when user clicks "Edit"
  const handleEditTicket = (id) => {
    const rentalToEdit = rentals.find((rental) => rental.id === id);
    setSelectedRental(rentalToEdit);
  };

  // Cancel editing
  const handleCancel = () => {
    setSelectedRental(null);
  };

  // Changes ticket status from "Active" to "Resolved"
  const handleCloseTicket = (id) => {
    closeTicket(id);
    setRentals(getTickets());
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

  const renderRentalDetails = (rental) => {
    const displayFields = Object.entries(rental).filter(([key, value]) => {
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
      <h2>Car Rental Tracker</h2>

      <div className="tab-buttons">
        <button onClick={() => setTab("rentals")}>📄 Rental Tickets</button>
        <button onClick={() => setTab("stats")}>📊 View Stats</button>
        <ExportTicketsButton />
      </div>

      {tab === "rentals" && (
        <>
          <button onClick={() => setShowModal(true)}>Add Rental</button>

          {showModal && (
            <RentalForm
              onClose={() => setShowModal(false)}
              onSave={handleAddRental}
            />
          )}

          {selectedRental && (
            <RentalForm
              rental={selectedRental}
              onSave={handleUpdateTicket}
              onClose={handleCancel}
            />
          )}

          {rentals.length === 0 && <p>No active rentals.</p>}

          {[...rentals]
            .filter((rental) => rental.status === "Active")
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((rental) => (
              <div key={rental.id} className="rental-card">
                {renderRentalDetails(rental)}
                <button onClick={() => handleEditTicket(rental.id)}>
                  Edit
                </button>
                <button onClick={() => handleCloseTicket(rental.id)}>
                  Close
                </button>
              </div>
            ))}
        </>
      )}

      {tab === "stats" && <StatsPanel rentals={rentals} />}
    </div>
  );
};

export default RentalList;
