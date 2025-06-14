const cron = require('node-cron');
const { sendReminderNotifications, sendTestNotification } = require('../scripts/sendReminderNotifications');

cron.schedule('*/2 * * * *', () => {
    console.log('Avvio notifiche push...')
    sendTestNotification()
})