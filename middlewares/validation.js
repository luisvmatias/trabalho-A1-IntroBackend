// Middleware de validação de campos obrigatórios

/**
 * Valida se os campos obrigatórios estão presentes no body da requisição
 * @param {Array} camposObrigatorios - Array com os nomes dos campos obrigatórios
 */
function validarCamposObrigatorios(camposObrigatorios) {
  return (req, res, next) => {
    const camposFaltando = [];

    for (const campo of camposObrigatorios) {
      if (!req.body[campo]) {
        camposFaltando.push(campo);
      }
    }

    if (camposFaltando.length > 0) {
      return res.status(400).json({
        erro: 'Campos obrigatórios faltando',
        campos: camposFaltando
      });
    }

    next();
  };
}

/**
 * Valida se o ID é um número válido
 */
function validarId(req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      erro: 'ID inválido',
      mensagem: 'O ID deve ser um número inteiro positivo'
    });
  }

  req.params.id = id;
  next();
}

/**
 * Valida formato de email
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida formato de CPF (formato XXX.XXX.XXX-XX)
 */
function validarCPF(cpf) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
}

/**
 * Valida formato de telefone brasileiro
 */
function validarTelefone(telefone) {
  const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

/**
 * Valida formato de data (YYYY-MM-DD)
 */
function validarData(data) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(data)) return false;

  const date = new Date(data);
  return date instanceof Date && !isNaN(date);
}

module.exports = {
  validarCamposObrigatorios,
  validarId,
  validarEmail,
  validarCPF,
  validarTelefone,
  validarData
};