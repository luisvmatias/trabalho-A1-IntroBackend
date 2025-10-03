const express = require('express');
const router = express.Router();
const { database, getNextId } = require('../data/database');

// GET /alunos - Listar todos os alunos
router.get('/', (req, res) => {
  res.status(200).json(database.alunos);
});

// GET /alunos/:id - Buscar aluno por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = database.alunos.find(a => a.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  res.status(200).json(aluno);
});

// POST /alunos - Criar novo aluno
router.post('/', (req, res) => {
  const { nome, email, matricula, dataNascimento, telefone, endereco } = req.body;

  // Validação
  if (!nome || !email || !matricula || !dataNascimento) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: nome, email, matricula, dataNascimento'
    });
  }

  // Verificar se já existe matrícula igual
  const matriculaExiste = database.alunos.find(a => a.matricula === matricula);
  if (matriculaExiste) {
    return res.status(400).json({ erro: 'Matrícula já cadastrada no sistema' });
  }

  // Criar aluno
  const novoAluno = {
    id: getNextId('alunos'),
    nome,
    email,
    matricula,
    dataNascimento,
    telefone: telefone || null,
    endereco: endereco || null
  };

  database.alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// PUT /alunos/:id - Atualizar aluno
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.alunos.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  // Se matrícula foi alterada, verificar duplicata
  if (req.body.matricula && req.body.matricula !== database.alunos[index].matricula) {
    const matriculaExiste = database.alunos.find(a => a.matricula === req.body.matricula);
    if (matriculaExiste) {
      return res.status(400).json({ erro: 'Matrícula já cadastrada no sistema' });
    }
  }

  database.alunos[index] = {
    ...database.alunos[index],
    ...req.body,
    id: database.alunos[index].id
  };

  res.status(200).json(database.alunos[index]);
});

// DELETE /alunos/:id - Remover aluno
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.alunos.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  database.alunos.splice(index, 1);
  res.status(200).json({ mensagem: 'Aluno removido com sucesso' });
});

module.exports = router;
