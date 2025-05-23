const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Importa il router delle rotte
const appointmentsRouter = require('./routes/appointments');
app.use('/appointments', appointmentsRouter);

app.get('/', (req, res) => {
  res.send('HairTime backend is running!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
