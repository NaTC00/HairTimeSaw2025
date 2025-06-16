const webPush = require('web-push');
const { Pool } = require('pg');
const { selectEndpoint, getAllPushSubscriptions } = require('../db/sql/queries');
const db = new Pool({ connectionString: process.env.DATABASE_URL });


webPush.setVapidDetails(
    'mailto:n.ceccarini2@studenti.unipi.it',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

async function sendReminderNotifications() {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dataStr = tomorrow.toISOString().split('T')[0]

    const {rows} = await selectEndpoint(dataStr)

    for (const row of rows){
        const payload = JSON.stringify({
            title: 'Promemoria appuntamento',
            body: `Ciao ${row.username}, ti ricordo che domani hai un appuntamento alle ${row.time_slot}.`,

        })
        try{
            await webPush.sendNotification(row.subscription, payload)
            console.log(`Notifica inviata a ${row.username}`)
        }catch(err){
            console.error(`Errore invio notifica a ${row.username}:`, err.body || err.message )
        }
    }
   


}



module.exports = { sendReminderNotifications };