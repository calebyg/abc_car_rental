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

  useEffect(() => {
    setRentals(getRentals().filter((r) => r.status === "Active"));
  }, []);

  const handleSaveRental = (newRental) => {
    addRental(newRental);
    setRentals(getRentals().filter((rental) => rental.status === "Active"));
  };

  const handleComplete = (id) => {
    updateRental(id, { status: "Complete" });
    setRentals(getRentals().filter((rental) => rental.status === "Active"));
  };

  const handleDelete = (id) => {
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
          onSave={handleSaveRental}
        />
      )}

      {rentals.length === 0 && <p>No active rentals.</p>}

      {rentals.map((rental) => (
        <div key={rental.id} className="rental-card">
          {renderRentalDetails(rental)}
          <button onClick={() => handleComplete(rental.id)}>
            Mark as Complete
          </button>
          <button onClick={() => handleDelete(rental.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RentalList;
