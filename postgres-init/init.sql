-- table des employés
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- table des parkings
CREATE TABLE parking_lot (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- table des réservations
CREATE TABLE reservation (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employee(id) ON DELETE CASCADE,
    parking_lot_id INT NOT NULL REFERENCES parking_lot(id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    checked_in BOOLEAN NOT NULL DEFAULT false
);

-- insérer les employés
INSERT INTO employee (name) VALUES
  ('Alice'),
  ('Bob'),
  ('Charlie');

-- insérer les parkings
INSERT INTO parking_lot (name) VALUES
  ('A01'),
  ('B01');

-- insérer les réservations
INSERT INTO reservation (employee_id, parking_lot_id, start_date, end_date, checked_in) VALUES
  ((SELECT id FROM employee WHERE name='Alice'), (SELECT id FROM parking_lot WHERE name='A01'), NOW(), NOW() + interval '1 hour', false),
  ((SELECT id FROM employee WHERE name='Bob'),   (SELECT id FROM parking_lot WHERE name='B01'), NOW(), NOW() + interval '2 hour', true);