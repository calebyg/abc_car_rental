// Fetch all rentals from local storage
export const getRentals = () => {
    const rentals = localStorage.getItem("rentals");
    return rentals ? JSON.parse(rentals) : [];
};

// Save updated rentals to local storage
export const saveRentals = (rentals) => {
    localStorage.setItem("rentals", JSON.stringify(rentals));
};

// Add a new rental
export const addRental = (rental) => {
    const rentals = getRentals();
    rentals.push(rental);
    saveRentals(rentals);
};

// Update rental details (e.g., status, notes)
export const updateRental = (id, updatedData) => {
    let rentals = getRentals();
    rentals = rentals.map((rental) =>
    rental.id === id ? {...rental, ...updatedData} : rental
    );
    saveRentals(rentals);
};

// Remove a rental
export const deleteRental = (id) => {
    let rentals = getRentals();
    rentals = rentals.filter((rental) => rental.id !== id);
    saveRentals(rentals);
};