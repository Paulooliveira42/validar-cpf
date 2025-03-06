function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
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
  
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '') return false;
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
  }
  
  // Captura os elementos HTML
  const documentoInput = document.getElementById('documento');
  const validarButton = document.getElementById('validar');
  const resultadoDiv = document.getElementById('resultado');
  
  // Adiciona um ouvinte de evento ao botão de validação
  validarButton.addEventListener('click', () => {
    const documento = documentoInput.value;
    const cpfValido = validarCPF(documento);
    const cnpjValido = validarCNPJ(documento);
  
    if (cpfValido) {
      resultadoDiv.textContent = 'CPF válido!';
      resultadoDiv.style.color = 'green';
    } else if (cnpjValido) {
      resultadoDiv.textContent = 'CNPJ válido!';
      resultadoDiv.style.color = 'green';
    } else {
      resultadoDiv.textContent = 'CPF/CNPJ inválido!';
      resultadoDiv.style.color = 'red';
    }
  });