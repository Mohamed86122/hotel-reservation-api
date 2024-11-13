// routes/hotel.js
const express = require('express');
const Hotel = require('../models/Hotel');
const router = express.Router();

// Route POST pour créer un nouvel hôtel
router.post('/', async (req, res) => {
  try {
    // Extraire les valeurs correctement depuis req.body
    const { hotelId, name, address, city, country, rooms } = req.body;
    const hotel = new Hotel(hotelId, name, address, city, country, rooms);
    await Hotel.save(hotel);
    res.status(201).send('Hotel saved');
  } catch (error) {
    res.status(500).send('Error saving hotel: ' + error.message);
  }
});

// Route GET pour récupérer tous les hôtels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).send('Error retrieving hotels: ' + error.message);
  }
});

// Route GET pour récupérer un hôtel par ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).send('Hotel not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving hotel: ' + error.message);
  }
});

// Route PUT pour mettre à jour un hôtel par ID
router.put('/:id', async (req, res) => {
  try {
    const updatedFields = req.body;
    await Hotel.update(req.params.id, updatedFields);
    res.status(200).send('Hotel updated');
  } catch (error) {
    res.status(500).send('Error updating hotel: ' + error.message);
  }
});

// Route DELETE pour supprimer un hôtel par ID
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.delete(req.params.id);
    res.status(200).send('Hotel deleted');
  } catch (error) {
    res.status(500).send('Error deleting hotel: ' + error.message);
  }
});

module.exports = router;
