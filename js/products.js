import { addToCart } from "./cart.js";


window.addToCart = addToCart;

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
    productElement.innerHTML = `
    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <p>${product.price}</p>
    <img src="${product.thumbnail}" alt="${product.title}" />
    <button onclick='addToCart(${JSON.stringify(product.title)}, ${product.price}, ${JSON.stringify(product.category)})'>Add to Cart</button>

  `;
    productsContainer.appendChild(productElement);
  });
}
async function loadCategory(category) {
  await fetchProducts(category);
}
loadCategory("smartphones");
loadCategory("laptops");
