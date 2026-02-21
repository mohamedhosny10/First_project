let currentProduct = null;

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
  loadProduct(productId);
} else {
  document.getElementById("productDetails").innerHTML =
    "<p>No product selected.</p>";
}

async function loadProduct(id) {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/" + id
    );
    const product = await response.json();
    currentProduct = product;
    showProduct(product);
  } catch (err) {
    document.getElementById("productDetails").innerHTML =
      "<p>Product not found.</p>";
  }
}

function showProduct(product) {
  const container = document.getElementById("productDetails");
  container.innerHTML =
    '<div class="row">' +
    '<div class="col-md-6 mb-4">' +
    '<img src="' +
    product.thumbnail +
    '" class="img-fluid" alt="' +
    product.title +
    '">' +
    "</div>" +
    '<div class="col-md-6">' +
    "<h2>" +
    product.title +
    "</h2>" +
    "<p>" +
    product.description +
    "</p>" +
    "<h4 class='mb-4'>$" +
    product.price +
    "</h4>" +
    '<button class="btn btn-primary" onclick="addToCartFromDetails()">Add to Cart</button>' +
    "</div>" +
    "</div>";
}

window.addToCartFromDetails = async function () {
  if (currentProduct) {
    const { addToCart } = await import("./cart.js");
    addToCart(
      currentProduct.title,
      currentProduct.price,
      currentProduct.category
    );
  }
};
