const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Importação das rotas
const alunosRoutes = require('./routes/alunos');
const professoresRoutes = require('./routes/professores');
const turmasRoutes = require('./routes/turmas');
const disciplinasRoutes = require('./routes/disciplinas');
const matriculasRoutes = require('./routes/matriculas');

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API do Sistema de Gerenciamento Escolar',
    versao: '1.0.0',
    documentacao: 'Veja o README.md para detalhes',
    endpoints: {
      alunos: '/alunos',
      professores: '/professores',
      turmas: '/turmas',
      disciplinas: '/disciplinas',
      matriculas: '/matriculas'
    }
  });
});

// Registro das rotas
app.use('/alunos', alunosRoutes);
app.use('/professores', professoresRoutes);
app.use('/turmas', turmasRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/matriculas', matriculasRoutes);

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    mensagem: `A rota ${req.method} ${req.url} não existe nesta API`
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    erro: 'Erro interno do servidor',
    mensagem: err.message
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(' Servidor rodando em http://localhost:' + PORT);
  console.log(' Sistema de Gerenciamento Escolar - API REST');
  console.log(' Iniciado em: ' + new Date().toLocaleString('pt-BR'));
  console.log('='.repeat(50));
});
