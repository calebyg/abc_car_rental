import React, { useEffect, useState } from "react";
import {
  getRentals,
  addRental,
  deleteRental,
  updateRental,
} from "../utils/localStorage";
import RentalForm from "./RentalForm";

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  // Load rentals from localStorage on first render
  useEffect(() => {
    const storedRentals = JSON.parse(localStorage.getItem("rentals")) || [];
    setRentals(storedRentals);
  }, []);

  // Add a new rental
  const handleAddRental = (newRental) => {
    const updatedRentals = [...rentals, newRental];
    setRentals(updatedRentals);
    localStorage.setItem("rentals", JSON.stringify(updatedRentals));
    setShowModal(false);
  };

  // Update existing rental
  const handleUpdateRental = (updatedRental) => {
    const updatedRentals = rentals.map((rental) =>
      rental.id === updatedRental.id ? updatedRental : rental
    );
    setRentals(updatedRentals);
    localStorage.setItem("rentals", JSON.stringify(updatedRentals));
    setSelectedRental(null);
  };

  // Show EditRental form when user clicks "Edit"
  const handleEditRental = (id) => {
    const rentalToEdit = rentals.find((rental) => rental.id === id);
    setSelectedRental(rentalToEdit);
  };

  // Cancel editing
  const handleCancel = () => {
    setSelectedRental(null);
  };

  const handleDeleteRental = (id) => {
    deleteRental(id);
    setRentals(getRentals().filter((rental) => rental.status === "Active"));
  };

  const renderRentalDetails = (rental) => {
    const displayFields = Object.entries(rental).filter(([key, value]) => {
      const required = key === "rentalId" || key === "notes";
      const notEmpty = value !== "" && value !== null && value !== undefined;
      return required || notEmpty;
    });

    return (
      <ul>
        {displayFields.map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Active Rental Tickets</h2>
      <button onClick={() => setShowModal(true)}>Add Rental</button>

      {showModal && (
        <RentalForm
          onClose={() => setShowModal(false)}
          onSave={handleAddRental} // Use add for new rentals
        />
      )}

      {selectedRental && (
        <RentalForm
          rental={selectedRental}
          onSave={handleUpdateRental} // Use update for editing
          onClose={handleCancel}
        />
      )}

      {rentals.length === 0 && <p>No active rentals.</p>}

      {rentals.map((rental) => (
        <div key={rental.id} className="rental-card">
          {renderRentalDetails(rental)}
          <button onClick={() => handleEditRental(rental.id)}>Edit</button>
          <button onClick={() => handleDeleteRental(rental.id)}>Close</button>
        </div>
      ))}
    </div>
  );
};

export default RentalList;
