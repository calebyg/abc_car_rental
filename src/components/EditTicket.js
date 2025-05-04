// Component to view and edit rental tickets
import React, { useEffect, useState } from "react";

const EditTicket = ({ ticket, onSave }) => {
  const [formData, setFormData] = useState({
    ticketStatus: ticket.status,
    ticketNotes: ticket.notes,
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        status: ticket.status || "",
        notes: ticket.notes || "",
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...ticket, ...formData });
  };
  return (
    <div>
      <h2>Edit Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Status:</label>
          <select
            name="ticketStatus"
            value={formData.ticketStatus}
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
            name="ticketNotes"
            value={formData.ticketNotes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTicket;
