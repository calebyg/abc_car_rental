-- Database schema for 'vehicles'
CREATE TABLE vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT CHECK (year >= 1886),
    mileage INT CHECK (mileage >= 0),
    status VARCHAR(20) CHECK (status IN ('Available', 'Rented', 'Maintenance')),
    ev_charge_percentage INT CHECK (ev_charge_percentage BETWEEN 0 AND 100)
);