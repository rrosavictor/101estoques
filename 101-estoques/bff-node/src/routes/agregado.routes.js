const { estoquesApi, alugueisApi } = require('../services/api.service');
const express = require('express');
const router = express.Router();

// Retorna dados agregados de estoques e aluguéis
router.get('/estoques-alugueis', async (req, res, next) => {
  try {
    // Busca dados em paralelo
    const [estoquesRes, alugueisRes] = await Promise.all([
      estoquesApi.get('/api/estoques'),
      alugueisApi.get('/api/alugueis')
    ]);

    const estoques = estoquesRes.data;
    const alugueis = alugueisRes.data;

    // Agrega dados de estoque com seus aluguéis
    const agregado = estoques.map(estoque => {
      const alugueisDoEstoque = alugueis.filter(
        aluguel => aluguel.estoqueId === estoque.id
      );

      return {
        ...estoque,
        alugueis: alugueisDoEstoque,
        totalAlugueis: alugueisDoEstoque.length
      };
    });

    res.json(agregado);
  } catch (error) {
    next(error);
  }
});

module.exports = router;