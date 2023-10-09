const URL = 'https://fakestoreapi.com/products';
const container = document.getElementById("products");
const carrito = [];

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
        <h3>${item.title} - $ ${item.price}</h3>
        <p>${item.description}</p>
      </div>
      <div class="col-3 text-muted text-end">
        <small>${item.rating.count} in stock</small>
      </div>
    `;
    const btnCart = document.createElement('button');
    btnCart.classList.add('btn', 'btn-primary', 'mt-2');
    btnCart.textContent = 'Agregar al Carrito';

    divDeProducto.innerHTML = productHTML;
    divDeProducto.appendChild(btnCart);

    container.appendChild(divDeProducto);

    btnCart.addEventListener('click', function () {
      addCart(item);
    });
  }
}

function addCart(product) {
  const productoEnCarrito = carrito.find(item => item.id === product.id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const productoNuevo = {
      id: product.id,
      nombre: product.title,
      precio: product.price,
      cantidad: 1
    };
    carrito.push(productoNuevo);
  }

  updateCartUI();
}

function updateCartUI() {
  const carritoDiv = document.getElementById("cartList");
  carritoDiv.innerHTML = "";

  for (const producto of carrito) {
    const productoDiv = document.createElement('div');
    productoDiv.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
    carritoDiv.appendChild(productoDiv);
  }
}

function calculateTotalCost() {
  let costoTotal = 0;

  for (const producto of carrito) {
    costoTotal += producto.precio * producto.cantidad;
  }

  return costoTotal;
}


