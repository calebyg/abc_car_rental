import { getTickets } from "../utils/localStorage.js";
const ExportTicketsButton = ({ ticketStatusNow, ticketTypeNow }) => {
  const handleExport = () => {
    const tickets = getTickets();
    console.log(tickets);
    console.log("ticketStatusNow:", ticketStatusNow);
    console.log("ticketTypeNow:", ticketTypeNow);
    const filteredTickets =
      ticketTypeNow === "All"
        ? tickets.filter((t) => t.status === ticketStatusNow)
        : tickets.filter(
            (t) =>
              t.status === ticketStatusNow && t.ticketType === ticketTypeNow
          );

    if (filteredTickets.length < 1) {
      alert("No tickets to export");
      return;
    }

    // Format tickets into readable text
    const textContent = filteredTickets
      .map((ticket, index) => {
        let entry = `Ticket #${index + 1}\n`;
        for (let key in ticket) {
          const value = ticket[key];
          if (value !== null && value !== undefined && value !== "") {
            entry += `${capitalize(key)}: ${value}\n`;
          }
        }
        return entry + "---\n";
      })
      .join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ticketStatusNow}-${ticketTypeNow}-${Date.now()}-log.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper function to capitalize field names
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return <button onClick={handleExport}>📩 Export List</button>;
};

export default ExportTicketsButton;
