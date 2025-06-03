require('dotenv').config();
const express = require('express');
const cors = require('cors');


const initializeDatabase = require('./db/initDb');

initializeDatabase();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());




// Importa il router delle rotte
const appointmentsRouter = require('./routes/appointments');
app.use('/appointments', appointmentsRouter);

const {authRouter} = require('./routes/auth');
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('HairTime backend is running!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
