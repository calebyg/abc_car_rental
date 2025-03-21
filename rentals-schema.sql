-- Database schema for 'rentals'
CREATE TABLE rentals (
    rental_id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(vehicle_id),
    customer_name VARCHAR(100) NOT NULL,
    rental_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    total_amount DECIMAL(10, 2),
    payment_status VARCHAR(20) CHECK (payment_status IN ('Pending', 'Completed', 'Failed'))
);