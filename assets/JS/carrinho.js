const cartItems = [];
let total = 0;

function addToCart(itemName, price) {
  cartItems.push({ name: itemName, price: price });
  total += price;
  updateCart();
}

function addToCartAddon(addonName, price) {
  const existingItemIndex = cartItems.findIndex(item => item.name === addonName && item.price === price);

  if (existingItemIndex === -1) {
    cartItems.push({ name: addonName, price: price });
    total += price;
  }
  updateCart();
}

function removeItemFromCart(itemName, price) {
  const index = cartItems.findIndex(item => item.name === itemName && item.price === price);
  if (index !== -1) {
    cartItems.splice(index, 1);
    total -= price;
    updateCart();
  }
}

function removeAddonFromCart(addonName, price) {
  const index = cartItems.findIndex(item => item.name === addonName && item.price === price);
  if (index !== -1) {
    cartItems.splice(index, 1);
    total -= price;

    updateCart();
  }
}

function toggleCheckbox(checkbox) {
  const isChecked = checkbox.checked;
  const addonName = checkbox.dataset.addonName;
  const addonPrice = parseFloat(checkbox.dataset.addonPrice);

  if (isChecked) {
    addToCartAddon(addonName, addonPrice);
  } else {
    removeAddonFromCart(addonName, addonPrice);
  }
}

// Função para atualizar visualmente o carrinho na interface
function updateCart() {
  const cartElement = document.getElementById("cart");
  const totalElement = document.getElementById("total");

  cartElement.innerHTML = "";
  cartItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name}: R$${item.price}/mês`;
    cartElement.appendChild(listItem);
  });

   totalElement.textContent = `R$${total},00`;
}

// Selecionar todos os elementos com a classe 'addon-checkbox' e adicionar o evento de clique
const checkboxes = document.querySelectorAll('.addon-checkbox');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', (event) => {
    toggleCheckbox(checkbox);
  });
});

// Adicionar evento de clique aos botões de adicionar ao carrinho
const addToCartButtons = document.querySelectorAll('.button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const planName = button.parentElement.querySelector('.plan-card-a__plan-name').textContent;
    const price = parseFloat(button.parentElement.querySelector('.plan-card-a__info-preco').textContent.replace('R$', ''));

    addToCart(planName, price);
  });
});

// Função para salvar os dados do carrinho no localStorage
function salvarCarrinhoNoLocalStorage() {
  localStorage.setItem('itensCarrinho', JSON.stringify(cartItems));
  localStorage.setItem('total',`R$ ${total},00`);
}

// Função para carregar os dados do carrinho do localStorage
function carregarCarrinhoDoLocalStorage() {
  const itensCarrinhoArmazenados = JSON.parse(localStorage.getItem('itensCarrinho'));
  const totalArmazenado = localStorage.getItem('total');

  if (itensCarrinhoArmazenados && totalArmazenado) {
    cartItems.length = 0;
    Array.prototype.push.apply(cartItems, itensCarrinhoArmazenados);
    total = totalArmazenado;
    updateCart();
  }
}

// Event listener para finalizar a compra
document.addEventListener('DOMContentLoaded', function () {
  const botaoFinalizar = document.querySelector('.botao-finalizar');

  if (botaoFinalizar) {
    botaoFinalizar.addEventListener('click', () => {
      // Chame a função para salvar os dados do carrinho no localStorage
      salvarCarrinhoNoLocalStorage();
      alert('Compra finalizada! Dados do carrinho salvos.');

      // Redirecione para a página de pagamento
      window.location.href = '../pages/pagamento.html';

      // Adicione o código para exibir o valor no campo correspondente
      const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');

      if (selectedPayment) {
        const valorTotal = document.getElementById('total').textContent;
        switch (selectedPayment.value) {
          case 'pix':
            document.getElementById('valorPix').value = valorTotal;
            break;
          case 'cartao':
            document.getElementById('valorCartao').value = valorTotal;
            break;
          case 'boleto':
            document.getElementById('valorBoleto').value = valorTotal;
            break;
          default:
            console.log('Método de pagamento não reconhecido');
        }
      } else {
        console.log('Nenhum método de pagamento selecionado');
      }
    });
  } else {
    console.error('Botão de finalizar não encontrado.');
  }
});




