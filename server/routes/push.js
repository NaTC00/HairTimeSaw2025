const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { verifyToken } = require('./auth');
const {getUserEndpoint, addEndpoint, deletePushSubscription, existEndpoint} = require('../db/sql/queries');

router.post('/subscriptions', verifyToken, async (req,res) => {
    try{
       const {subscription} = req.body
       const userId = req.user.uid
       if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: 'Dati di iscrizione mancanti o non validi' });
      }
      const exist = await existEndpoint(userId, subscription)
      if(exist.rowCount === 0){
        await addEndpoint(userId, subscription)
        console.log("Sottoscrizione client creata")
        return res.status(201).json({ message: "Sottoscrizione client creata"})
      }else{
        console.log("Già presente")
        return res.status(200).json({message: "Già presente"})
      }
    }catch(err){
        console.error("Errore durante la sottoscrizione della notifica:", err);
        return res.status(500).json({ error: err.message });  
    }
})

router.get('/subscriptions', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const result = await getUserEndpoint(userId)

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("Errore durante il recupero sottoscrizioni:", err);
    return res.status(500).json({ error: err.message });
  }
});



router.delete('/subscriptions/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const result = await deletePushSubscription(id, userId);

    if (result.rowCount > 0) {
      console.log("Sottoscrizione rimossa");
      return res.status(200).json({ message: "Disiscritto con successo" });
    } else {
      return res.status(404).json({ message: "Nessuna sottoscrizione trovata" });
    }
  } catch (err) {
    console.error("Errore durante la disiscrizione:", err);
    return res.status(500).json({ error: err.message });
  }
});



module.exports = router;