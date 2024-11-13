// routes/reservation.js
const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(
      req.body.reservationId,
      req.body.roomId,
      req.body.userId,
      req.body.checkIn,
      req.body.checkOut,
      req.body.totalPrice,
      req.body.isPaid,
      req.body.isCancelled,
      req.body.dateCreated
    );
    await Reservation.save(reservation);
    res.status(201).send('Reservation created');
  } catch (error) {
    res.status(500).send('Error creating reservation: ' + error.message);
  }
});

// Récupérer toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).send('Error retrieving reservations: ' + error.message);
  }
});

// Récupérer une réservation par ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).send('Reservation not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving reservation: ' + error.message);
  }
});

// Mettre à jour une réservation
router.put('/:id', async (req, res) => {
  try {
    await Reservation.update(req.params.id, req.body);
    res.status(200).send('Reservation updated');
  } catch (error) {
    res.status(500).send('Error updating reservation: ' + error.message);
  }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.delete(req.params.id);
    res.status(200).send('Reservation deleted');
  } catch (error) {
    res.status(500).send('Error deleting reservation: ' + error.message);
  }
});

module.exports = router;
