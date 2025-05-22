DROP TABLE IF EXISTS services;

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  cost DECIMAL(6,2) NOT NULL,
  duration_minutes INT NOT NULL
);