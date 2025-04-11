// Component to view and edit rental tickets
import React, { useEffect, useState } from "react";

const EditRental = ({ rental, onSave }) => {
  const [formData, setFormData] = useState({
    rentalStatus: rental.status,
    rentalNotes: rental.notes,
  });

  useEffect(() => {
    if (rental) {
      setFormData({
        status: rental.status || '',
        notes: rental.notes || '',
      });
    }
  }, [rental]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({...rental, ...formData});
  };
  return (
    <div>
      <h2>Edit Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Status:</label>
          <select
            name="rentalStatus"
            value={formData.rentalStatus}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="rentalNotes"
            value={formData.rentalNotes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRental;
