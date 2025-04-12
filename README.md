
# ABC Car Rental
https://calebyg.github.io/abc_car_rental/

A React app to help employees add, modify, and delete rental agreements.

## Purpose

This app is used to handle batches of rental agreements that have unique problems to be fixed. By storing a list of different rentals and notes that describe what needs to be fixed, the employee saves a lot of time and confusion.

## Rentals

### Fields:

- `rentalId`: Unique rental agreement number.
- `vehicleId`: Vehicle number used for the rental agreement.
- `carName`: Car make and model.
- `customerName`: First and last name of the customer.
- `fuelLevel`: Current fuel level, if applicable.
- `chargeLevel`: Current charge level, if applicable.
- `notes`: Specific issues with the rental agreement

### Example Rental Data:

```json
{
  "rentalId": 11806794,
  "vehicleId": 56439242,
  "carName": "Honda Accord",
  "customerName": "John Doe",
  "fuelLevel": 100,
  "chargeLevel": 0,
  "notes": "Remove extra fuel charge"
}
```

### 4/4 Update

- Added components to add and view rental tickets.

### 4/11 Update

- Added functions to edit existing rentals and save it to local storage.
- Added timestamps for each rental and sorted rental tickets by time.

### 4/12 Update

- Created StatsPanel component to view active and resolved rental tickets.