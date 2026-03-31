-- table des employés
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- table des parkings
CREATE TABLE parking_lot (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    electric BOOLEAN NOT NULL DEFAULT false
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
INSERT INTO parking_lot (name, electric)
SELECT 
    row_letter || LPAD(col::text, 2, '0') AS name,
    (row_letter = 'A' OR row_letter = 'F') AS electric
FROM (
    SELECT 
        chr(65 + r) AS row_letter,
        c AS col
    FROM generate_series(0, 5) AS r
    CROSS JOIN generate_series(1, 10) AS c
) t;

-- insérer les réservations
INSERT INTO reservation (employee_id, parking_lot_id, start_date, end_date, checked_in) VALUES
  ((SELECT id FROM employee WHERE name='Alice'), (SELECT id FROM parking_lot WHERE name='A01'), NOW(), NOW() + interval '1 hour', false),
  ((SELECT id FROM employee WHERE name='Bob'),   (SELECT id FROM parking_lot WHERE name='B01'), NOW(), NOW() + interval '2 hour', true);