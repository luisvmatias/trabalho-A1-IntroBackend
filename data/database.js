// Banco de dados em memória
const database = {
  alunos: [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@email.com",
      matricula: "2024001",
      dataNascimento: "2005-03-15",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123"
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@email.com",
      matricula: "2024002",
      dataNascimento: "2006-07-20",
      telefone: "(11) 91234-5678",
      endereco: "Av. Principal, 456"
    }
  ],

  professores: [
    {
      id: 1,
      nome: "Prof. Carlos Mendes",
      email: "carlos.mendes@escola.com",
      cpf: "123.456.789-00",
      especialidade: "Matemática",
      telefone: "(11) 99999-1111",
      salario: 5000.00
    },
    {
      id: 2,
      nome: "Profa. Ana Paula",
      email: "ana.paula@escola.com",
      cpf: "987.654.321-00",
      especialidade: "Português",
      telefone: "(11) 98888-2222",
      salario: 4800.00
    }
  ],

  turmas: [
    {
      id: 1,
      codigo: "3A-2024",
      nome: "3º Ano A",
      turno: "Matutino",
      ano: 2024,
      capacidade: 35,
      sala: "101"
    },
    {
      id: 2,
      codigo: "3B-2024",
      nome: "3º Ano B",
      turno: "Vespertino",
      ano: 2024,
      capacidade: 35,
      sala: "102"
    }
  ],

  disciplinas: [
    {
      id: 1,
      codigo: "MAT101",
      nome: "Matemática Básica",
      cargaHoraria: 80,
      descricao: "Fundamentos de matemática",
      ementa: "Álgebra, geometria e trigonometria básica"
    },
    {
      id: 2,
      codigo: "PORT101",
      nome: "Língua Portuguesa",
      cargaHoraria: 100,
      descricao: "Gramática e literatura",
      ementa: "Gramática, interpretação de texto e literatura brasileira"
    }
  ],

  matriculas: [
    {
      id: 1,
      alunoId: 1,
      turmaId: 1,
      disciplinaId: 1,
      dataMatricula: "2024-02-01",
      status: "Ativa",
      nota: null
    },
    {
      id: 2,
      alunoId: 2,
      turmaId: 1,
      disciplinaId: 2,
      dataMatricula: "2024-02-01",
      status: "Ativa",
      nota: null
    }
  ]
};

// Funções auxiliares para gerar IDs
const nextId = {
  alunos: 3,
  professores: 3,
  turmas: 3,
  disciplinas: 3,
  matriculas: 3
};

function getNextId(resource) {
  return nextId[resource]++;
}

module.exports = {
  database,
  getNextId
};