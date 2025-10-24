const Aluguel = require('../models/Aluguel');

const listarAlugueis = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const alugueis = await Aluguel.findAll({ where });
    res.status(200).json(alugueis);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const criarAluguel = async (req, res) => {
  try {
    const { estoque_id, cliente_nome, cliente_email, data_inicio, valor_mensal } = req.body;
    if (!estoque_id) return res.status(400).json({ erro: 'Campo estoque_id é obrigatório' });
    if (!cliente_nome) return res.status(400).json({ erro: 'Campo cliente_nome é obrigatório' });
    if (!cliente_email) return res.status(400).json({ erro: 'Campo cliente_email é obrigatório' });
    if (!data_inicio) return res.status(400).json({ erro: 'Campo data_inicio é obrigatório' });
    if (!valor_mensal && valor_mensal !== 0) return res.status(400).json({ erro: 'Campo valor_mensal é obrigatório' });

    const aluguel = await Aluguel.create(req.body);
    res.status(201).json(aluguel);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const buscarAluguel = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });
    const aluguel = await Aluguel.findByPk(id);
    if (!aluguel) return res.status(404).json({ erro: 'Aluguel não encontrado' });
    res.status(200).json(aluguel);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const atualizarAluguel = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });
    const [updated] = await Aluguel.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ erro: 'Aluguel não encontrado' });
    const aluguel = await Aluguel.findByPk(id);
    res.status(200).json(aluguel);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const deletarAluguel = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });
    const deleted = await Aluguel.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ erro: 'Aluguel não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  listarAlugueis,
  criarAluguel,
  buscarAluguel,
  atualizarAluguel,
  deletarAluguel
};