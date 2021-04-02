'use strict'

const express = require('express');
const { models } = require('./db');

const router = express.Router();

const { FormData } = models;

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
  const tasks = await Task.findAll();
  res.json(tasks);
  res.status(200).end();
}));

// POST Add Form Data
router.post('/', asyncHandler(async(req, res) => {
  const user = req.body;
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  } else {
    const task = await Task.create(req.body);
    const taskId = task.dataValues.id;
    res.status(201).location(`/tasks/${taskId}`).end();
  }
}));

// PUT Update Form Data
router.put('/tasks/:id', asyncHandler(async(req, res) => {
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errorMessages });
  }
  const task = await Task.findByPk(req.params.id);
  if (task) {
    const updated = await task.update(req.body);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "No tasks found to update" });
  }
}));

// DELETE Form Data
router.delete('/tasks/:id', asyncHandler(async(req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: "No tasks found to delete." });
  }
}))

module.exports = router;