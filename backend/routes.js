'use strict'

const express = require('express');
const { models } = require('./db');

const router = express.Router();

const { Form } = models;

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error) {
      return next(error);
    }
  }
}

// GET All Form Data
router.get('/', asyncHandler(async(req, res) => {
  const formData = await Form.findAll();
  res.json(formData);
  res.status(200).end();
}));

// POST Add Form Data
router.post('/', asyncHandler(async(req, res) => {
  const user = req.body;
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  } else {
    const formData = await FormData.create(req.body);
    const formDataId = formData.dataValues.id;
    res.status(201).location(`/formData/${formDataId}`).end();
  }
}));

// PUT Update Form Data
router.put('/formData/:id', asyncHandler(async(req, res) => {
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errorMessages });
  }
  const formData = await FormData.findByPk(req.params.id);
  if (formData) {
    const updated = await formData.update(req.body);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "No data found to update" });
  }
}));

// DELETE Form Data
router.delete('/formData/:id', asyncHandler(async(req, res) => {
  const formData = await FormData.findByPk(req.params.id);
  if (formData) {
    await formData.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: "No data found to delete." });
  }
}))

module.exports = router;