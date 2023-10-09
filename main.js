
let apiUrl = 'https://fakestoreapi.com/products';
let arrayProducts = [];
document.addEventListener('DOMContentLoaded', function () { 
    fetch(apiUrl) 
        .then(response => response.json()) 
        .then(data => { 
            arrayProducts = data;
            console.log(arrayProducts);
        }) 
        .catch(error => { 
            console.log('Error al obtener los datos:', error); 
        }) 
});
