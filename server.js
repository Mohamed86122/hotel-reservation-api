// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importation des routes
const hotelRoutes = require('./routes/hotel');
const roomRoutes = require('./routes/room');
const reservationRoutes = require('./routes/reservation');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200', // Remplacez par l'origine de votre choix
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
// Utilisation des routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
