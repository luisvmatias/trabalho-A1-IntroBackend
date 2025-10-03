const express = require('express');
const router = express.Router();
const { database, getNextId } = require('../data/database');

// GET /disciplinas - Listar todas as disciplinas
router.get('/', (req, res) => {
  res.status(200).json(database.disciplinas);
});

// GET /disciplinas/:id - Buscar disciplina por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const disciplina = database.disciplinas.find(d => d.id === id);

  if (!disciplina) {
    return res.status(404).json({ erro: 'Disciplina não encontrada' });
  }

  res.status(200).json(disciplina);
});

// POST /disciplinas - Criar nova disciplina
router.post('/', (req, res) => {
  const { codigo, nome, cargaHoraria, descricao, ementa } = req.body;

  // Validação de campos obrigatórios
  if (!codigo || !nome || !cargaHoraria) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: codigo, nome, cargaHoraria'
    });
  }

  // Verificar se código já existe
  const codigoExiste = database.disciplinas.find(d => d.codigo === codigo);
  if (codigoExiste) {
    return res.status(400).json({
      erro: 'Código de disciplina já cadastrado no sistema'
    });
  }

  // Criar nova disciplina
  const novaDisciplina = {
    id: getNextId('disciplinas'),
    codigo,
    nome,
    cargaHoraria,
    descricao: descricao || null,
    ementa: ementa || null
  };

  database.disciplinas.push(novaDisciplina);

  res.status(201).json(novaDisciplina);
});

// PUT /disciplinas/:id - Atualizar disciplina
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.disciplinas.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Disciplina não encontrada' });
  }

  // Atualizar apenas os campos enviados
  const disciplinaAtualizada = {
    ...database.disciplinas[index],
    ...req.body,
    id: database.disciplinas[index].id // Garantir que o ID não seja alterado
  };

  // Se o código foi alterado, verificar se não existe
  if (req.body.codigo && req.body.codigo !== database.disciplinas[index].codigo) {
    const codigoExiste = database.disciplinas.find(d => d.codigo === req.body.codigo);
    if (codigoExiste) {
      return res.status(400).json({
        erro: 'Código de disciplina já cadastrado no sistema'
      });
    }
  }

  database.disciplinas[index] = disciplinaAtualizada;

  res.status(200).json(disciplinaAtualizada);
});

// DELETE /disciplinas/:id - Remover disciplina
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.disciplinas.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Disciplina não encontrada' });
  }

  database.disciplinas.splice(index, 1);

  res.status(200).json({ mensagem: 'Disciplina removida com sucesso' });
});

module.exports = router;