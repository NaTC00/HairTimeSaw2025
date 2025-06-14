const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { verifyToken } = require('./auth');
const {existEndpoint, addEndpoint} = require('../db/sql/queries');

router.post('/subscribe', verifyToken, async (req,res) => {
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

module.exports = router;