const express = require('express');
const router = express.Router();
const { database, getNextId } = require('../data/database');

// GET /turmas - Listar todas as turmas
router.get('/', (req, res) => {
  res.status(200).json(database.turmas);
});

// GET /turmas/:id - Buscar turma por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const turma = database.turmas.find(t => t.id === id);

  if (!turma) {
    return res.status(404).json({ erro: 'Turma não encontrada' });
  }

  res.status(200).json(turma);
});

// POST /turmas - Criar nova turma
router.post('/', (req, res) => {
  const { codigo, nome, turno, ano, capacidade, sala } = req.body;

  // Validação de campos obrigatórios
  if (!codigo || !nome || !turno || !ano) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: codigo, nome, turno, ano'
    });
  }

  // Verificar se código já existe
  const codigoExiste = database.turmas.find(t => t.codigo === codigo);
  if (codigoExiste) {
    return res.status(400).json({
      erro: 'Código de turma já cadastrado no sistema'
    });
  }

  // Criar nova turma
  const novaTurma = {
    id: getNextId('turmas'),
    codigo,
    nome,
    turno,
    ano,
    capacidade: capacidade || null,
    sala: sala || null
  };

  database.turmas.push(novaTurma);

  res.status(201).json(novaTurma);
});

// PUT /turmas/:id - Atualizar turma
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.turmas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Turma não encontrada' });
  }

  // Atualizar apenas os campos enviados
  const turmaAtualizada = {
    ...database.turmas[index],
    ...req.body,
    id: database.turmas[index].id // Garantir que o ID não seja alterado
  };

  // Se o código foi alterado, verificar se não existe
  if (req.body.codigo && req.body.codigo !== database.turmas[index].codigo) {
    const codigoExiste = database.turmas.find(t => t.codigo === req.body.codigo);
    if (codigoExiste) {
      return res.status(400).json({
        erro: 'Código de turma já cadastrado no sistema'
      });
    }
  }

  database.turmas[index] = turmaAtualizada;

  res.status(200).json(turmaAtualizada);
});

// DELETE /turmas/:id - Remover turma
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.turmas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Turma não encontrada' });
  }

  database.turmas.splice(index, 1);

  res.status(200).json({ mensagem: 'Turma removida com sucesso' });
});

module.exports = router;