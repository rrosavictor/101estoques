const axios = require('axios');

const estoquesApi = axios.create({
  baseURL: process.env.ESTOQUES_API_URL
});

const alugueisApi = axios.create({
  baseURL: process.env.ALUGUEIS_API_URL
});

const eventosApi = axios.create({
  baseURL: process.env.EVENTOS_API_URL
});

module.exports = {
  estoquesApi,
  alugueisApi,
  eventosApi
};