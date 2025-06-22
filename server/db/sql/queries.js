const pool = require('../db')




async function getAppoinmentsUser(userId){
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
      ORDER BY a.date, a.time_slot`, [userId]);
      
      return result.rows
}

async function deleteAppointmentUser(userId, appointmentId) {
    const result = await pool.query(
        `DELETE
        FROM appointments
        WHERE  user_id = $1 AND id = $2
        `, [userId, appointmentId]) //posso fare questo perchè nella tabella appointment_services ho usato ON DELETE CASCADE
    
}


async function getTotalDuration(serviceIds) {
    const result = await pool.query(
        `SELECT SUM(duration_minutes) AS total_duration
        FROM services
        WHERE id = ANY($1)
        `, [serviceIds])
    return result.rows[0].total_duration
}

async function getAppoinmentByDate(date) {
    const result = await pool.query(
        `SELECT time_slot 
        FROM appointments
        WHERE date = $1 
        `, [date])
    return result.rows
}

async function submitReview(user_id, rating, comment) {
    return await pool.query(
      `INSERT INTO reviews (user_id, rating, comment) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, rating, comment]
    );
  }
  

  async function getReviews() {
    return await pool.query(`
      SELECT 
        reviews.id,
        reviews.rating,
        reviews.comment,
        users.username
      FROM reviews
      JOIN users ON reviews.user_id = users.id
    `);
  }

  async function getUserEndpoint(userId) {
    return await pool.query(
      'SELECT id, subscription->>\'endpoint\' AS endpoint, created_at FROM user_push_subscriptions WHERE user_id = $1',
      [userId]
    );
    
  }

  async function addEndpoint(userId, subscription) {
    return await pool.query(
      `INSERT INTO user_push_subscriptions (user_id, subscription) VALUES ($1, $2)
      `,[userId, subscription]
    );
  }

  async function selectEndpoint(dateStr){
    return await pool.query(
      `SELECT u.username, s.subscription, a.time_slot
        FROM appointments a
        JOIN users u ON u.id = a.user_id
        JOIN user_push_subscriptions s ON u.id = s.user_id
        WHERE a.date = $1`, [dateStr]
    )
  
  }

  async function existEndpoint(userId, subscription) {
    return await pool.query(
      `SELECT 1 FROM user_push_subscriptions
       WHERE user_id = $1 AND subscription->>'endpoint' = $2
      `,[userId, subscription.endpoint]
    )
  }
  
  async function getAllPushSubscriptions() {
    return await pool.query(`
      SELECT u.username, s.subscription
      FROM user_push_subscriptions s
      JOIN users u ON u.id = s.user_id
    `);
  }

  async function deletePushSubscription(id, userId) {
    return await pool.query(
      'DELETE FROM user_push_subscriptions WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
  }

  
  

module.exports = {
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
}