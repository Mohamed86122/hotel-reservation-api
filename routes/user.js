// routes/user.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Créer un nouvel utilisateur
router.post('/', async (req, res) => {
  try {
    const user = new User(
      req.body.userId,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.dateCreated
    );
    await User.save(user);
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error creating user: ' + error.message);
  }
});

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users: ' + error.message);
  }
});

// Récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving user: ' + error.message);
  }
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  try {
    await User.update(req.params.id, req.body);
    res.status(200).send('User updated');
  } catch (error) {
    res.status(500).send('Error updating user: ' + error.message);
  }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send('Error deleting user: ' + error.message);
  }
});

module.exports = router;
