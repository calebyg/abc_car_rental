# ABC Car Rental

A React Native app to view and modify car rentals.

## Purpose
This app provides an intuitive interface to create, retrieve, update, and delete cars and rental agreements. A car rental employee can seamlesssly assign cars to new customers as well as retrieve rental agreements stored in the database. 

## Rentals

### Fields:
- `rental_id`: Unique rental agreement number.
- `vehicle_id`: Vehicle number used for the rental agreement.
- `miles_out`: Number of miles on the vehicle the customer left with.
- `miles_in`: Number of miles on the vehicle when the customer checked it in.
- `customer_first_name`: First name of the customer.
- `customer_last_name`: Last name of the customer.
- `check_out_date`: Date and time the customer was assigned the vehicle.
- `check_in_date`: Date and time the customer returned the vehicle. NULL if still on rent.

### Example Rental Data:
```json
{
  "rental_id": 1,
  "vehicle_id": 101,
  "miles_out": 12000,
  "miles_in": 12300,
  "customer_first_name": "John",
  "customer_last_name": "Doe",
  "check_out_date": "2025-03-22 10:00:00",
  "check_in_date": "2025-03-25 10:00:00"
}
```

## Vehicles

### Fields:
- `vehicle_id` Unique vehicle number.
- `make` Make of the vehicle.
- `model` Model of the vehicle.
- `year` Year of the vehicle.
- `mileage` Last recorded miles of the vehicle.
- `status` Current status of the vehicle. 'Available', 'Rented', 'Maintenance'.
- `fuel_type` Type of fuel of the vehicle. 'H' hybrid 'G' gas 'E' electric.
- `fuel_level` Last recorded gas level (0-8).
- `ev_charge_percentage` Last recorded charge level for hybrid and electric vehicles.
- `last_rental_id` Last customer who rented this vehicle.

### Example Vehicle Data:
```json
{
  "vehicle_id": "100",
  "make": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "mileage": 25000,
  "status": "Available",
  "ev_charge_percentage": 80,
  "last_rental_id": null,
  "fuel_type": "G",
  "fuel_level": 100
}
```
