const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['ESTOQUE_CRIADO', 'ALUGUEL_CRIADO', 'ALUGUEL_FINALIZADO']
  },
  dados: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'processado', 'erro'],
    default: 'pendente'
  },
  erro: String,
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evento', eventSchema);