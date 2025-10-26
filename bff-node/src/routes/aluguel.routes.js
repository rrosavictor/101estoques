const { alugueisApi } = require('../services/api.service');
const express = require('express');
const router = express.Router();

// Listar todos os aluguéis
router.get('/', async (req, res, next) => {
  try {
    const { data } = await alugueisApi.get('/api/alugueis');
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Obter um aluguel específico
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await alugueisApi.get(`/api/alugueis/${id}`);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Criar um novo aluguel
router.post('/', async (req, res, next) => {
  try {
    const { data } = await alugueisApi.post('/api/alugueis', req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Atualizar um aluguel
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await alugueisApi.put(`/api/alugueis/${id}`, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Remover um aluguel
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await alugueisApi.delete(`/api/alugueis/${id}`);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;