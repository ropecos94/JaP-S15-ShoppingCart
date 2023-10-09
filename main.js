const URL = 'https://fakestoreapi.com/products'
const container = document.getElementById("products");



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
  divDeProducto.innerHTML = productHTML;

  container.appendChild(divDeProducto);

  divDeProducto.addEventListener('click', function () {
      redirectToProductInfo(item.id);
  });


}
};


