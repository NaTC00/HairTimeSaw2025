const pool = require('../db');

// Recupera un utente tramite email
async function getUserByEmail(email) {
  return await pool.query('SELECT * FROM users WHERE email = $1', [email]);
}

// Crea un nuovo utente con username, email e password crittografata
async function createUser(username, email, hashedPassword) {
  await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
    [username, email, hashedPassword]
  );
}

// Restituisce la lista completa dei servizi
async function getServices() {
  return await pool.query('SELECT * FROM services');
}

// Aggiunge un nuovo servizio (nome, costo, durata)
async function addService(name, cost, duration_minutes) {
  await pool.query(
    'INSERT INTO services (name, cost, duration_minutes) VALUES ($1, $2, $3) RETURNING *',
    [name, cost, duration_minutes]
  );
}

// Verifica se un servizio esiste già per nome
async function existService(name) {
  return await pool.query(
    'SELECT * FROM services WHERE name = $1',
    [name]
  );
}

// Crea un nuovo appuntamento e restituisce l'id generato
async function createAppointment(client, userId, date, time_slot, phone_number) {
  const result = await client.query(
    `INSERT INTO appointments (user_id, date, time_slot, phone_number)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [userId, date, time_slot, phone_number]
  );
  return result.rows[0].id;
}

// Collega un servizio a un appuntamento (nella tabella di relazione)
async function linkServiceToAppointment(client, appointmentId, serviceId) {
  await client.query(
    'INSERT INTO appointment_services (appointment_id, service_id) VALUES ($1, $2)',
    [appointmentId, serviceId]
  );
}

// Recupera gli appuntamenti di un utente con i servizi associati
async function getAppoinmentsUser(userId) {
  const result = await pool.query(
    `SELECT 
      a.id, 
      a.date AS date,
      a.time_slot, 
      a.created_at,
      json_agg(s.name) AS services
     FROM appointments a
     JOIN appointment_services aps ON a.id = aps.appointment_id
     JOIN services s ON aps.service_id = s.id
     WHERE a.user_id = $1
     GROUP BY a.id
     ORDER BY a.date, a.time_slot`,
    [userId]
  );
  return result.rows;
}

// Elimina un appuntamento di un utente (appointment_services è in ON DELETE CASCADE)
async function deleteAppointmentUser(userId, appointmentId) {
  await pool.query(
    `DELETE FROM appointments WHERE user_id = $1 AND id = $2`,
    [userId, appointmentId]
  );
}

// Calcola la durata totale di più servizi dati i loro ID
async function getTotalDuration(serviceIds) {
  const result = await pool.query(
    `SELECT SUM(duration_minutes) AS total_duration
     FROM services
     WHERE id = ANY($1)`,
    [serviceIds]
  );
  return result.rows[0].total_duration;
}

// Ottiene gli appuntamenti in una data specifica (usato per verificare disponibilità)
async function getAppoinmentByDate(date) {
  const result = await pool.query(
    `SELECT time_slot 
     FROM appointments
     WHERE date = $1`,
    [date]
  );
  return result.rows;
}

// Inserisce una recensione da parte di un utente
async function submitReview(user_id, rating, comment) {
  return await pool.query(
    `INSERT INTO reviews (user_id, rating, comment) VALUES ($1, $2, $3) RETURNING *`,
    [user_id, rating, comment]
  );
}

// Recupera tutte le recensioni con i nomi utenti associati
async function getReviews() {
  return await pool.query(
    `SELECT 
       reviews.id,
       reviews.rating,
       reviews.comment,
       users.username
     FROM reviews
     JOIN users ON reviews.user_id = users.id`
  );
}

// Ottiene tutte le sottoscrizioni push dell’utente
async function getUserEndpoint(userId) {
  return await pool.query(
    `SELECT id, subscription->>'endpoint' AS endpoint, created_at
     FROM user_push_subscriptions
     WHERE user_id = $1`,
    [userId]
  );
}

// Aggiunge una sottoscrizione push per l’utente
async function addEndpoint(userId, subscription) {
  return await pool.query(
    `INSERT INTO user_push_subscriptions (user_id, subscription) VALUES ($1, $2)`,
    [userId, subscription]
  );
}

// Seleziona tutte le sottoscrizioni push attive in una data specifica (per inviare promemoria)
async function selectEndpoint(dateStr) {
  return await pool.query(
    `SELECT u.username, s.subscription, a.time_slot
     FROM appointments a
     JOIN users u ON u.id = a.user_id
     JOIN user_push_subscriptions s ON u.id = s.user_id
     WHERE a.date = $1`,
    [dateStr]
  );
}

// Verifica se un endpoint push è già registrato per l’utente
async function existEndpoint(userId, subscription) {
  return await pool.query(
    `SELECT 1 FROM user_push_subscriptions
     WHERE user_id = $1 AND subscription->>'endpoint' = $2`,
    [userId, subscription.endpoint]
  );
}

// Recupera tutte le sottoscrizioni push attive con username associato
async function getAllPushSubscriptions() {
  return await pool.query(
    `SELECT u.username, s.subscription
     FROM user_push_subscriptions s
     JOIN users u ON u.id = s.user_id`
  );
}

// Elimina una sottoscrizione push specifica di un utente
async function deletePushSubscription(id, userId) {
  return await pool.query(
    `DELETE FROM user_push_subscriptions
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
}

// Esporta tutte le funzioni per l'uso nei router
module.exports = {
  getUserByEmail,
  createUser,
  getServices,
  addService,
  existService,
  createAppointment,
  linkServiceToAppointment,
  getAppoinmentsUser,
  getTotalDuration,
  getAppoinmentByDate,
  deleteAppointmentUser,
  submitReview,
  getReviews,
  getUserEndpoint,
  addEndpoint,
  selectEndpoint,
  getAllPushSubscriptions,
  deletePushSubscription,
  existEndpoint
};
