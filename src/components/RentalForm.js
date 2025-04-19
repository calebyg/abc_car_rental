import React, { useEffect, useState } from "react";

// onSave sends the rental data to the parent component
// onClose hides the modal when the user clicks Cancel or saves

const RentalForm = ({ rental, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    rentalId: "",
    vehicleId: "",
    carName: "",
    customerName: "",
    fuelLevel: "",
    chargeLevel: "",
    notes: "",
    ticketType: "",
  });

  // If editing, prefill form with existing rental data
  useEffect(() => {
    if (rental) {
      setFormData(rental);
    }
  }, [rental]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.rentalId || !formData.notes) {
      alert("Rental ID and Notes are required!");
      return;
    }

    const newRental = {
      id: Date.now().toString(),
      status: "Active", // Required
      ...formData,
    };

    onSave(newRental);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add New Rental</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Ticket Type:
            <select
              value={formData.ticketType}
              onChange={(e) =>
                setFormData({ ...formData, ticketType: e.target.value })
              }
              required
            >
              <option value="">Select type</option>
              <option value="Price adjustment">Price adjustment</option>
              <option value="EV charge">EV charge</option>
              <option value="Miles">Miles</option>
              <option value="Check-in">Check-in</option>
            </select>
          </label>
          <label>Rental ID:</label>
          <input
            type="text"
            name="rentalId"
            value={formData.rentalId}
            onChange={handleChange}
            required
          />

          <label>Vehicle ID:</label>
          <input
            type="text"
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
          />

          <label>Car Name:</label>
          <input
            type="text"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
          />

          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />

          <label>Fuel Level:</label>
          <input
            type="text"
            name="fuelLevel"
            value={formData.fuelLevel}
            onChange={handleChange}
          />

          <label>Charge Level:</label>
          <input
            type="text"
            name="chargeLevel"
            value={formData.chargeLevel}
            onChange={handleChange}
          />

          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
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
