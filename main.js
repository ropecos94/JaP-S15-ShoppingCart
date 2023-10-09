const URL = 'https://fakestoreapi.com/products';
const container = document.getElementById("products");
const cart = document.getElementById("cart");

document.addEventListener("DOMContentLoaded", function (e) {
  fetchData(URL);
});

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    products = data;
    showProducts(products);
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

function showProducts(array) {
  for (const item of array) {
    const divDeProducto = document.createElement('div');
    divDeProducto.classList.add('row', 'list-group-item', 'd-flex', 'justify-content-between', 'mt-3');
    const productHTML = `
      <div class="col-3">
          <img src="${item.image}" class="img-thumbnail">
      </div>
      <div class="col-6">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
      </div>
      <div class="col-3 text-muted text-end">
          <small>${item.rating.count} in stock</small><br>
          <h1> $ ${item.price}</h1>
          <button class="B btn btn-success">Add to Cart</button>
      </div>
    `;
    divDeProducto.innerHTML = productHTML;
    container.appendChild(divDeProducto);
    divDeProducto.addEventListener('click', function () {
      addToCart(item);
    });
  }
}

function addToCart(item) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item', 'container', 'row');
  const cartItemHTML = `
    <div class="cart-item-title col-9 mt-2 card"> <h5>${item.title}</h5></div>
    <div class="cart-item-price col-2 mt-2 card"><h5>$${item.price}</h5></div>
    <div class="cart-item-price col-1 mt-2"><button class="B btn btn-danger">X</button></div>
  `;
  cartItem.innerHTML = cartItemHTML;
  cart.appendChild(cartItem);

  const deleteButton = cartItem.querySelector('.B.btn.btn-danger');
  deleteButton.addEventListener('click', function () {
    cart.removeChild(cartItem);
  });
}
