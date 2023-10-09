const URL = 'https://fakestoreapi.com/products';
const container = document.getElementById("products");
const carrito = [];

const cartPrice = document.getElementById("cartPrice");


document.addEventListener("DOMContentLoaded", function (e) {
  fetchData(URL)
})

async function fetchData(url) {
  try {
      const response = await fetch(url);
      const data = await response.json();
      products = data
      showProducts(products)
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
function addCart(product){
  const name = product.title;
  const price = product.price;
  const stock = product.rating.count;
  carrito.push(product);
}




