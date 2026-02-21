import { supabase } from "./supabase.js";

let currentUser = null;
let cartItems = [];

const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  window.location.href = "login.html";
} else {
  currentUser = user;
  loadCart();
}

async function loadCart() {
  const { data, error } = await supabase
    .from("cart")
    .select(`
      id,
      quantity,
      product_id (
        title,
        price
      )
    `)
    .eq("user_id", currentUser.id);

  if (error) {
    alert("Something went wrong");
    return;
  }

  cartItems = data.map((row) => {
    const product = row.product_id || row.products;
    let title = "Unknown";
    let price = 0;
    if (product) {
      title = product.title;
      price = product.price;
    }
    return {
      id: row.id,
      quantity: row.quantity,
      title: title,
      price: price,
    };
  });

  displayItems();
  calculateTotal();
}

function displayItems() {
  const container = document.getElementById("orderItems");
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = "<p class='text-white'>Your cart is empty.</p>";
    return;
  }

  cartItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "mb-3";
    div.innerHTML =
      "<p class='mb-0'>" +
      item.title +
      " x " +
      item.quantity +
      " - $" +
      (item.price * item.quantity).toFixed(2) +
      "</p>";
    container.appendChild(div);
  });
}

function calculateTotal() {
  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  document.getElementById("totalPrice").textContent = total.toFixed(2);
}

window.placeOrder = async function () {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  if (!fullName || !email || !address || !phone) {
    alert("Please fill all fields");
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const { error: orderError } = await supabase.from("orders").insert({
    user_id: currentUser.id,
    total_price: total,
  });

  if (orderError) {
    alert("Error placing order");
    return;
  }

  const { error: deleteError } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", currentUser.id);

  if (deleteError) {
    alert("Error clearing cart");
    return;
  }

  window.location.href = "confirmation.html";
};
