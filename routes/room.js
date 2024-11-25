// routes/room.js
const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Créer une nouvelle chambre
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body.roomId, req.body.roomNumber, req.body.type, req.body.price, req.body.isAvailable,req.body.image, req.body.hotelId);
    await Room.save(room);
    res.status(201).send('Room created');
  } catch (error) {
    res.status(500).send('Error creating room: ' + error.message);
  }
});
// Route pour récupérer une chambre par roomNumber
// router.get('/:roomNumber', async (req, res) => {
//   try {
//     const room = await Room.findByRoomNumber(req.params.roomNumber);
    
//     if (!room) {
//       return res.status(404).send('Room not found');
//     }
//     res.send(room);
//   } catch (error) {
//     console.error('Error fetching room by number:', error);
//     res.status(500).send('Internal Server Error');
//   }

// });
// Récupérer toutes les chambres
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).send('Error retrieving rooms: ' + error.message);
  }
});

// Récupérer une chambre par ID
router.get('/:roomId', async (req, res) => {
  try {
    console.log(req.params.roomId);
    const room = await Room.findById(req.params.roomId);

    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving room: ' + error.message);
  }
});

// Mettre à jour une chambre
router.put('/:id', async (req, res) => {
  try {
    await Room.update(req.params.id, req.body);
    res.status(200).send('Room updated');
  } catch (error) {
    res.status(500).send('Error updating room: ' + error.message);
  }
});

// Supprimer une chambre
router.delete('/:id', async (req, res) => {
  try {
    await Room.delete(req.params.id);
    res.status(200).send('Room deleted');
  } catch (error) {
    res.status(500).send('Error deleting room: ' + error.message);
  }
});

module.exports = router;
