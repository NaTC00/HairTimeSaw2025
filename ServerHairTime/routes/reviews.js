const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { verifyToken } = require('./auth');
const { submitReview, getReviews } = require('../db/sql/queries');


router.post('/sumbit_review',verifyToken, async (req,res) =>{
    console.log("Inviata nuova recensione")
    const {rating, comment} = req.body;
    const user_id = req.user.uid;

    try{
        const result = await submitReview(user_id, rating, comment);
        return res.status(201).json(result.rows[0])

    }catch(err){
        console.error("Errore durante l'inserimento della recensione:", err);
        return res.status(500).json({ error: err.message });
    }

} )

router.get('/', async (req, res) => {
    try{
        const result = await getReviews()
        return res.status(200).json(result.rows)

    }catch(err){
        console.error("Errore durante il recupero delle recensioni:", err);
        return res.status(500).json({ error: err.message });
    }
})

module.exports = router;