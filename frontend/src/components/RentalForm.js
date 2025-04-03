import React, { useState } from "react";

// onSave sends the rental data to the parent component
// onClose hides the modal when the user clicks Cancel or saves

const RentalForm = ({ onClose, onSave }) => {
  const [rentalData, setRentalData] = useState({
    rentalId: "",
    vehicleId: "",
    carName: "",
    customerName: "",
    fuelLevel: "",
    chargeLevel: "",
    status: "",
    notes: "",
  });

  const handleChange = (e) => {
    setRentalData({ ...rentalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: Date.now().toString(), ...rentalData });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add New Rental</h3>
        <form onSubmit={handleSubmit}>
          <label>Rental ID:</label>
          <input
            type="text"
            name="rentalId"
            value={rentalData.rentalId}
            onChange={handleChange}
            required
          />

          <label>Vehicle ID:</label>
          <input
            type="text"
            name="vehicleId"
            value={rentalData.vehicleId}
            onChange={handleChange}
            required
          />

          <label>Car Name:</label>
          <input
            type="text"
            name="carName"
            value={rentalData.carName}
            onChange={handleChange}
            required
          />

          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={rentalData.customerName}
            onChange={handleChange}
            required
          />

          <label>Fuel Level:</label>
          <input
            type="text"
            name="fuelLevel"
            value={rentalData.fuelLevel}
            onChange={handleChange}
            required
          />

          <label>Charge Level:</label>
          <input
            type="text"
            name="chargeLevel"
            value={rentalData.chargeLevel}
            onChange={handleChange}
            required
          />

          <label>Notes:</label>
          <textarea
            name="notes"
            value={rentalData.notes}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Save Rental</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;
