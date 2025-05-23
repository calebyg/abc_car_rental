// Fetch all tickets from local storage
export const getTickets = () => {
  const tickets = localStorage.getItem("tickets");
  return tickets ? JSON.parse(tickets) : [];
};

// Save updated tickets to local storage
export const saveTickets = (tickets) => {
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

// Add a new ticket to local storage and return
export const addTicket = (ticket) => {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now().toString(), // Unique ID
    timestamp: new Date().toISOString(),
    status: "Active", // Required!
    resolvedAt: "",
    ...ticket,
  };
  tickets.push(newTicket);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  return newTicket;
};

// Update ticket details
export const updateTicket = (id, updatedData) => {
  let tickets = getTickets();
  tickets = tickets.map((ticket) =>
    ticket.id === id ? { ...ticket, ...updatedData } : ticket
  );
  saveTickets(tickets);
};

// Close a ticket by updating its status to "Resolved"
export const closeTicket = (id) => {
  const tickets = getTickets().map((ticket) => {
    if (ticket.id === id) {
      return {
        ...ticket,
        status: "Resolved",
        resolvedAt: new Date().toISOString(),
      };
    }
    return ticket;
  });
  saveTickets(tickets);
};

// Clears tickets cache: removes all "Resolved" tickets from local storage
export const clearTicketCache = () => {
  const tickets = getTickets();

  const activeTickets = tickets.filter(
    (ticket) => ticket.status !== "Resolved"
  );

  localStorage.setItem("tickets", JSON.stringify(activeTickets));
  return activeTickets; // Return the updated list
};
