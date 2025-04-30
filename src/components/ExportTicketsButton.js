const ExportTicketsButton = () => {
  const handleExport = () => {
    const rentals = JSON.parse(localStorage.getItem("rentals")) || [];
    const activeTickets = rentals.filter(
      (ticket) => ticket.status === "Active"
    );

    if (activeTickets.length === 0) {
      alert("No active tickets to export.");
      return;
    }

    // Format tickets into readable text
    const textContent = activeTickets
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
    a.download = "active-tickets-log.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper function to capitalize field names
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return <button onClick={handleExport}>📩 Export Active Tickets</button>;
};

export default ExportTicketsButton;
