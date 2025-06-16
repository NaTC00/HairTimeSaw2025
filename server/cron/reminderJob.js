const cron = require('node-cron');
const { sendReminderNotifications } = require('../scripts/sendReminderNotifications');

cron.schedule('*/5 * * * *', async () => {
    console.log('Avvio notifiche push...')
    try {
        await sendReminderNotifications();
      } catch (err) {
        console.error('Errore nel task di invio notifiche:', err);
      }
})