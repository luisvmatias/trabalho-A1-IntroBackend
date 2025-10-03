const express = require('express');
const router = express.Router();
const { database, getNextId } = require('../data/database');

// GET /matriculas - Listar todas as matrículas
router.get('/', (req, res) => {
  res.status(200).json(database.matriculas);
});

// GET /matriculas/:id - Buscar matrícula por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const matricula = database.matriculas.find(m => m.id === id);

  if (!matricula) {
    return res.status(404).json({ erro: 'Matrícula não encontrada' });
  }

  res.status(200).json(matricula);
});

// POST /matriculas - Criar nova matrícula
router.post('/', (req, res) => {
  const { alunoId, turmaId, disciplinaId, dataMatricula, status, nota } = req.body;

  // Validação de campos obrigatórios
  if (!alunoId || !turmaId || !disciplinaId || !dataMatricula) {
    return res.status(400).json({
      erro: 'Campos obrigatórios: alunoId, turmaId, disciplinaId, dataMatricula'
    });
  }

  // Verificar se aluno existe
  const alunoExiste = database.alunos.find(a => a.id === alunoId);
  if (!alunoExiste) {
    return res.status(400).json({
      erro: 'Aluno não encontrado no sistema'
    });
  }

  // Verificar se turma existe
  const turmaExiste = database.turmas.find(t => t.id === turmaId);
  if (!turmaExiste) {
    return res.status(400).json({
      erro: 'Turma não encontrada no sistema'
    });
  }

  // Verificar se disciplina existe
  const disciplinaExiste = database.disciplinas.find(d => d.id === disciplinaId);
  if (!disciplinaExiste) {
    return res.status(400).json({
      erro: 'Disciplina não encontrada no sistema'
    });
  }

  // Verificar se já existe matrícula para esse aluno, turma e disciplina
  const matriculaExiste = database.matriculas.find(
    m => m.alunoId === alunoId && m.turmaId === turmaId && m.disciplinaId === disciplinaId
  );
  if (matriculaExiste) {
    return res.status(400).json({
      erro: 'Aluno já está matriculado nesta disciplina e turma'
    });
  }

  // Criar nova matrícula
  const novaMatricula = {
    id: getNextId('matriculas'),
    alunoId,
    turmaId,
    disciplinaId,
    dataMatricula,
    status: status || 'Ativa',
    nota: nota || null
  };

  database.matriculas.push(novaMatricula);

  res.status(201).json(novaMatricula);
});

// PUT /matriculas/:id - Atualizar matrícula
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.matriculas.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Matrícula não encontrada' });
  }

  // Validar IDs se foram enviados
  if (req.body.alunoId) {
    const alunoExiste = database.alunos.find(a => a.id === req.body.alunoId);
    if (!alunoExiste) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }
  }

  if (req.body.turmaId) {
    const turmaExiste = database.turmas.find(t => t.id === req.body.turmaId);
    if (!turmaExiste) {
      return res.status(400).json({ erro: 'Turma não encontrada' });
    }
  }

  if (req.body.disciplinaId) {
    const disciplinaExiste = database.disciplinas.find(d => d.id === req.body.disciplinaId);
    if (!disciplinaExiste) {
      return res.status(400).json({ erro: 'Disciplina não encontrada' });
    }
  }

  // Atualizar apenas os campos enviados
  const matriculaAtualizada = {
    ...database.matriculas[index],
    ...req.body,
    id: database.matriculas[index].id // Garantir que o ID não seja alterado
  };

  database.matriculas[index] = matriculaAtualizada;

  res.status(200).json(matriculaAtualizada);
});

// DELETE /matriculas/:id - Remover matrícula
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = database.matriculas.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Matrícula não encontrada' });
  }

  database.matriculas.splice(index, 1);

  res.status(200).json({ mensagem: 'Matrícula removida com sucesso' });
});

module.exports = router;