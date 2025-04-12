// Fetch all tickets from local storage
export const getTickets = () => {
  const rentals = localStorage.getItem("rentals");
  return rentals ? JSON.parse(rentals) : [];
};

// Save updated tickets to local storage
export const saveTickets = (rentals) => {
  localStorage.setItem("rentals", JSON.stringify(rentals));
};

// Add a new ticket
export const addTicket = (rental) => {
  const rentals = getTickets();
  const newRental = {
    id: Date.now().toString(), // Unique ID
    status: "Active", // Required!
    ...rental,
  };
  rentals.push(newRental);
  localStorage.setItem("rentals", JSON.stringify(rentals));
};

// Update ticket details (e.g., status, notes)
export const updateTicket = (id, updatedData) => {
  let rentals = getTickets();
  rentals = rentals.map((rental) =>
    rental.id === id ? { ...rental, ...updatedData } : rental
  );
  saveTickets(rentals);
};

// Close a ticket by updating its status to "Resolved"
export const closeTicket = (id) => {
  const rentals = getTickets().map((rental) => {
    if (rental.id === id) {
      return {
        ...rental,
        status: "Resolved",
        resolvedAt: new Date().toISOString(),
      };
    }
    return rental;
  });
  saveTickets(rentals);
};
