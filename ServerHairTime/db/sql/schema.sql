
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  comment TEXT
);



CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  cost DECIMAL(6,2) NOT NULL,
  duration_minutes INT NOT NULL
);


CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  phone_number TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointment_services (
  appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE, --Se un appuntamento viene cancellato, anche tutte le righe corrispondenti in appointment_services verranno eliminate automaticamente--
  service_id INTEGER REFERENCES services(id),
  PRIMARY KEY (appointment_id, service_id)
);
