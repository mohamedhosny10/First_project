import { addToCart } from "./cart.js";

window.addToCart = addToCart;
window.loadCategory = loadCategory;

async function fetchProducts(category) {
  try {
    let response = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    let data = await response.json();
    displayProducts(data.products);
  } catch (err) {
    console.log("Error:", err);
  }
}
function displayProducts(products) {
  let productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    let productElement = document.createElement("div");
    productElement.className = "col-md-4 mb-4";
    productElement.innerHTML = `
    <div class="card h-100 shadow-sm product-card ">
    <img src="${product.thumbnail}" class="card-img-top p-3" style="height:200px; object-fit:contain;" alt="${product.title}" />
    <div class="card-body d-flex flex-column ">
    <h4 class="card-title">${product.title}</h4>
    <p class="card-text small flex-grow-1">${product.description}</p>
    <h5 class="fw-bold my-2">${product.price}</h5>
    <button class="btn btn-primary mt-2" onclick='addToCart(${JSON.stringify(product.title)}, ${product.price}, ${JSON.stringify(product.category)})'>Add to Cart</button>
    </div>
    </div>

  `;
    productsContainer.appendChild(productElement);
  });
}
async function loadCategory(category) {
  await fetchProducts(category);
}
loadCategory("smartphones");
