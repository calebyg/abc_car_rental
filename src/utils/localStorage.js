// Fetch all tickets
export const getTickets = () => {
  const tickets = localStorage.getItem("tickets");
  return tickets ? JSON.parse(tickets) : [];
};

// Fetch ticket by id
export const getTicketByID = (id) => {
  const tickets = getTickets();
  return tickets.find((t) => t.id === id);
};

// Fetch all active tickets
export const getActiveTickets = () => {
  const tickets = getTickets();
  return tickets ? tickets.filter((t) => t.status === "Active") : [];
};

// Fetch all resolved tickets
export const getResolvedTickets = () => {
  const tickets = getTickets();
  return tickets ? tickets.filter((t) => t.status === "Resolved") : [];
};

// Fetch all active tickets by ticket type
export const getActiveTicketsByType = (ticketType) => {
  const ticketsStr = localStorage.getItem("tickets"); // String

  if (ticketsStr.length < 1) return [];

  let tickets = JSON.parse(ticketsStr);
  if (!Array.isArray(tickets)) return [];

  // Filter tickets obj
  return tickets.filter(
    (t) => t.status === "Active" && ticketType.includes(t.ticketType)
  );
};

// Fetch all resolved tickets by ticket type
export const getResolvedTicketsByType = (ticketType) => {
  const ticketsStr = localStorage.getItem("tickets");

  if (ticketsStr.length < 1) return [];

  let tickets = JSON.parse(ticketsStr);
  if (!Array.isArray(tickets)) return [];

  return tickets.filter(
    (t) => t.status === "Resolved" && ticketType.includes(t.ticketType)
  );
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
export const resolveTicket = (id) => {
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

// Delete a ticket from memory
export const deleteTicket = (id) => {
  const tickets = getTickets().filter((t) => t.id !== id);
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
