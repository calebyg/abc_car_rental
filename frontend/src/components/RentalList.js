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
    setRentals(getRentals());
  }, []);

  const handleSaveRental = (newRental) => {
    addRental(newRental);
    setRentals(getRentals()); // Refresh UI
  };

  return (
    <div>
      <h2>My Rentals</h2>
      <button onClick={() => setShowModal(true)}>Add Rental</button>

      {showModal && (
        <RentalForm
          onClose={() => setShowModal(false)}
          onSave={handleSaveRental}
        />
      )}

      <ul>
        {rentals.map((rental) => (
          <li key={rental.id}>
            <strong>{rental.carModel}</strong> - {rental.customerName} (
            {rental.status})
            <button
              onClick={() => updateRental(rental.id, { status: "Complete" })}
            >
              Complete
            </button>
            <button onClick={() => deleteRental(rental.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalList;
