const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluguelController');

router.get('/alugueis', controller.listarAlugueis);
router.post('/alugueis', controller.criarAluguel);
router.get('/alugueis/:id', controller.buscarAluguel);
router.put('/alugueis/:id', controller.atualizarAluguel);
router.delete('/alugueis/:id', controller.deletarAluguel);

module.exports = router;