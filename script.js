function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cpf === '') return false; // CPF vazio
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // CPF com tamanho incorreto ou todos os dígitos iguais
  
    let soma = 0;
    let resto;
  
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
    return true;
  }
  
  // Captura os elementos HTML
  const cpfInput = document.getElementById('cpf');
  const validarButton = document.getElementById('validar');
  const resultadoDiv = document.getElementById('resultado');
  
  // Adiciona um ouvinte de evento ao botão de validação
  validarButton.addEventListener('click', () => {
    const cpf = cpfInput.value;
    const valido = validarCPF(cpf);
  
    if (valido) {
      resultadoDiv.textContent = 'CPF válido!';
      resultadoDiv.style.color = 'green';
    } else {
      resultadoDiv.textContent = 'CPF inválido!';
      resultadoDiv.style.color = 'red';
    }
  });