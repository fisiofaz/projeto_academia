// ---------- FUNÇÕES GERAIS -------------- //
function togglePopup(input, label) {
  // Mostrar popup de campo obrigatório
  input.addEventListener("focus", () => {
    label.classList.add("required-popup");
  });

  // Ocultar popup de campo obrigatório
  input.addEventListener("blur", () => {
    label.classList.remove("required-popup");
  });
}

function estilizarInputCorreto(input, helper) {
  helper.classList.remove("visible");
  input.classList.remove("error");
  input.classList.add("correct");
}

function estilizarInputIncorreto(input, helper) {
  helper.classList.add("visible");
  input.classList.add("error");
  input.classList.remove("correct");
}

// ---------- VALIDAÇÃO USERNAME ---------- //
let usernameInput = document.getElementById("username");
let usernameLabel = document.querySelector('label[for="username"]');
let usernameHelper = document.getElementById("username-helper");

togglePopup(usernameInput, usernameLabel)

// Validar valor do input
usernameInput.addEventListener("change", (e)=> {
  let valor = e.target.value

  if(valor.length < 5){
    // Adicionar estilos dinâmicos se o valor tiver menos de 5 caracteres
    usernameHelper.innerText = "Seu username precisa ter 5 ou mais caracteres";
    estilizarInputIncorreto(usernameInput, usernameHelper)
    inputsCorretos.username == false;
  } else {
    // Adicionar estilos dinâmicos se o valor estiver correto
    estilizarInputCorreto(usernameInput, usernameHelper);
    inputsCorretos.username == true;
  }
})

// ---------- VALIDAÇÃO EMAIL ---------- //
let emailInput = document.getElementById("email");
let emailLabel = document.querySelector('label[for="email"]');
let emailHelper = document.getElementById("email-helper");

togglePopup(emailInput, emailLabel)

// Validar valor do input
emailInput.addEventListener("change", (e)=> {
  let valor = e.target.value

  if(valor.includes("@") && valor.includes(".com")){
    // Adicionar estilos dinâmicos se o valor estiver correto
    estilizarInputCorreto(emailInput, emailHelper);
    inputsCorretos.email = true;
  } else {
    // Adicionar estilos dinâmicos se o valor tiver menos de 3 caracteres
    emailHelper.innerText = "Precisa inserir um email válido";
    estilizarInputIncorreto(emailInput, emailHelper);
    inputsCorretos.email = false;
  }
})

// ---------- VALIDAÇÃO  SENHA ---------- //
let senhaInput = document.getElementById("senha");
let senhaLabel = document.querySelector('label[for="senha"]');
let senhaHelper = document.getElementById("senha-helper");

togglePopup(senhaInput, senhaLabel)

// Validar valor do input da senha

senhaInput.addEventListener("blur", (e)=> {
  e.preventDefault(); // Evita o envio do formulário por enquanto para validar primeiro
  let valor = e.target.value
  let valid =true
    // Defina suas regras de validação aqui
    if (valor.length < 8) {
        senhaHelper.innerText = 'A senha deve ter pelo menos 8 caracteres.';
        valid=false        
    }
    // Verifica se a senha contém pelo menos um número
    else if (!/\d/.test(valor)) {
      senhaHelper.innerText = 'A senha deve conter pelo menos um número.';
      valid = false;
    }
    // Verifica se a senha contém pelo menos um caractere especial
     else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(valor)) {
      senhaHelper.innerText = 'A senha deve conter pelo menos um caractere especial.';
      valid = false;
    }
    if (valid) {
      estilizarInputCorreto(senhaInput, senhaHelper);
      inputsCorretos.senha = true;
    } else {
      estilizarInputIncorreto(senhaInput, senhaHelper);
      inputsCorretos.senha = false;
    }


});

// ---------- VALIDAÇÃO  CONFIRMAÇÃO DE SENHA ---------- //

let confirmaSenhaInput = document.getElementById("confirma-senha");
let confirmaSenhaLabel = document.querySelector('label[for="confirma-senha"]');
let confirmaSenhaHelper = document.getElementById("confirma-senha-helper");

togglePopup(confirmaSenhaInput, confirmaSenhaLabel)

// Validar valor do input da confirmação da senha

confirmaSenhaInput.addEventListener("blur", (e)=> {
  let valorConfirmaSenha = e.target.value

  if(valorConfirmaSenha == senhaInput.value){    
    // Adicionar estilos dinâmicos se o valor estiver correto    
    estilizarInputCorreto(confirmaSenhaInput, confirmaSenhaHelper);
    inputsCorretos.confirmaSenha = true;
  } else {      
    // Adicionar estilos dinâmicos se as senha não são iguais
    confirmaSenhaHelper.innerText = "As senhas precisam ser iguais.";
    estilizarInputIncorreto(confirmaSenhaInput, confirmaSenhaHelper);
    inputsCorretos.confirmaSenha = false;
  }
})

// ---------- EITAR O ENVIO DO FORMULÁRIO---------- //

let btnsubmit = document.querySelector('button[type="submit"]');
let inputsCorretos = {
  username: false,
  email: false,
  senha: false,
  confirmaSenha: false
}

btnsubmit.addEventListener('click', (e) => {
  // Verificando se os campos foram preenchidos corretamente
  if(inputsCorretos.username == false || inputsCorretos.email == false || inputsCorretos.senha == false || inputsCorretos.confirmaSenha == false){
    e.preventDefault()
    alert('Os campos obrigatórios precisam ser preenchidos corretamente!')
  } else {
    // Salvar os dados validados no localStorage
    localStorage.setItem('username', usernameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('senha', senhaInput.value);
    

    alert('Formulário enviado com sucesso!')
  }
})

let senha = document.querySelector('.lnr-eye');
senha.addEventListener('click', function() {

    let input = document.querySelector('#senha');

    if(input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'password');
    }

});


let confirmaSenha = document.querySelector('.lnr-eye');

confirmaSenha.addEventListener('click', function() {

    let input = document.querySelector('#confirma-senha');

    if(input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'password');
    }

});