# ABC Car Rental

https://calebyg.github.io/abc_car_rental/

A React app to help employees locally store tickets for rental car agreements.

## Purpose

This app is used to help employees handle batches of rental agreements that have unique problems to be fixed. By storing a list of different tickets and notes that describe what needs to be fixed, the employee saves a lot of time and confusion.

## Tickets

### Fields:

- `rentalId`: Unique rental agreement number.
- `vehicleId`: Vehicle number used for the rental agreement.
- `carName`: Car make and model.
- `customerName`: First and last name of the customer.
- `fuelLevel`: Current fuel level, if applicable.
- `chargeLevel`: Current charge level, if applicable.
- `status`: Current status of ticket (Active or Resolved).
- `timestamp`: Date and time ticket was submitted.
- `resolvedAt`: Date and time ticket was resolved.
- `ticketType`: Ticket type (Price adjustment, EV charge, Miles, or Check-in)
- `notes`: Specific issues with the rental agreement

### Sample Ticket Data (Active):

```json
{
  "rentalId": 11806794,
  "vehicleId": 56439242,
  "carName": "Honda Accord",
  "customerName": "John Doe",
  "fuelLevel": 100,
  "chargeLevel": 0,
  "status": "Active",
  "timestamp": "2025-04-19T17:24:16.681Z",
  "notes": "Remove extra fuel charge",
  "ticketType": "Price adjustment"
}
```

### Sample Ticket Data (Resolved):

```json
{
  "rentalId": 11806794,
  "vehicleId": 56439242,
  "carName": "Honda Accord",
  "customerName": "John Doe",
  "fuelLevel": 100,
  "chargeLevel": 0,
  "status": "Resolved",
  "timestamp": "2025-04-18T19:37:41.906Z",
  "resolvedAt": "2025-04-18T19:38:09.497Z",
  "notes": "Remove extra fuel charge",
  "ticketType": "Price adjustment"
}
```

### 4/4 Update

- Added components to add and view rental tickets.

### 4/11 Update

- Added functions to edit existing rentals and save it to local storage.
- Added timestamps for each rental and sorted rental tickets by time.

### 4/12 Update

- Created StatsPanel component to view active and resolved rental tickets.

### 4/19 Update

- Fixed `rentals` rendering bug in StatsPanel
- Added `ticketType` field to tickets

### 4/24 Update

- Added stats for ticket types
- Added new style sheets
