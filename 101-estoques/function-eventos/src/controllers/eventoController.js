const fetch = require('node-fetch');
const Evento = require('../models/Evento');

// Function para criar novo evento
const criarEvento = async (req, res) => {
  try {
    const { tipo, dados } = req.body;

    // Validar payload
    if (!tipo || !dados) {
      return res.status(400).json({ 
        erro: 'Payload inválido. Necessário: tipo e dados' 
      });
    }

    // Validar tipo de evento
    const tiposValidos = ['ESTOQUE_CRIADO', 'ALUGUEL_CRIADO', 'ALUGUEL_FINALIZADO'];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ 
        erro: 'Tipo de evento inválido' 
      });
    }

    // Criar evento
    const evento = await Evento.create({
      tipo,
      dados,
      status: 'pendente'
    });

    // Trigger processamento assíncrono
    processarEventoAsync(evento);

    res.status(201).json({
      message: 'Evento criado com sucesso',
      evento_id: evento._id
    });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ erro: error.message });
  }
};

// Function para consultar eventos
const consultarEventos = async (req, res) => {
  try {
    const { tipo, status } = req.query;
    const query = {};
    
    if (tipo) query.tipo = tipo;
    if (status) query.status = status;

    const eventos = await Evento.find(query).sort({ created_at: -1 });
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao consultar eventos:', error);
    res.status(500).json({ erro: error.message });
  }
};

// Função auxiliar para processar evento de forma assíncrona
const processarEventoAsync = async (evento) => {
  try {
    console.log(`Processando evento ${evento._id} do tipo ${evento.tipo}...`);

    switch (evento.tipo) {
      case 'ESTOQUE_CRIADO':
        await processarEventoEstoqueCriado(evento);
        break;
      case 'ALUGUEL_CRIADO':
        await processarEventoAluguelCriado(evento);
        break;
      case 'ALUGUEL_FINALIZADO':
        await processarEventoAluguelFinalizado(evento);
        break;
    }

    // Marcar evento como processado
    await Evento.findByIdAndUpdate(evento._id, {
      status: 'processado'
    });

    console.log(`Evento ${evento._id} processado com sucesso`);
  } catch (error) {
    console.error(`Erro ao processar evento ${evento._id}:`, error);
    
    // Marcar evento com erro
    await Evento.findByIdAndUpdate(evento._id, {
      status: 'erro',
      erro: error.message
    });
  }
};

// Processadores específicos por tipo de evento
const processarEventoEstoqueCriado = async (evento) => {
  const { dados } = evento;
  
  // Aqui poderia notificar outros sistemas, atualizar cache, etc.
  console.log('Processando evento ESTOQUE_CRIADO:', dados);
};

const processarEventoAluguelCriado = async (evento) => {
  const { dados } = evento;
  
  try {
    // Atualizar status do estoque para 'ocupado'
    const response = await fetch(`${process.env.MICROSERVICE_ESTOQUES_URL}/api/estoques/${dados.estoque_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'ocupado' })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar status do estoque');
    }
  } catch (error) {
    console.error('Erro ao processar ALUGUEL_CRIADO:', error);
    throw error;
  }
};

const processarEventoAluguelFinalizado = async (evento) => {
  const { dados } = evento;
  
  try {
    // Atualizar status do estoque para 'disponivel'
    const response = await fetch(`${process.env.MICROSERVICE_ESTOQUES_URL}/api/estoques/${dados.estoque_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'disponivel' })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar status do estoque');
    }
  } catch (error) {
    console.error('Erro ao processar ALUGUEL_FINALIZADO:', error);
    throw error;
  }
};

module.exports = {
  criarEvento,
  consultarEventos
};