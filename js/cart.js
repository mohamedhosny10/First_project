import { supabase } from "./supabase.js";

export async function addToCart(title, price, category) {
  const authData = await supabase.auth.getUser();
  const user = authData.data.user;

  if (!user) {
    alert("Please log in first.");
    return;
  }

  const foundResult = await supabase
    .from("products")
    .select("id")
    .eq("title", title)
    .eq("category", category);

  let productId;
  if (foundResult.data && foundResult.data.length > 0) {
    productId = foundResult.data[0].id;
  } else {
    const insertResult = await supabase
      .from("products")
      .insert({ title, category, price })
      .select("id");
    if (insertResult.error) {
      alert("Something went wrong.");
      return;
    }
    productId = insertResult.data[0].id;
  }

  const { error } = await supabase.from("cart").insert({
    user_id: user.id,
    product_id: productId,
    quantity: 1,
  });
  if (error) {
    alert("Could not add to cart.");
    return;
  }
  alert("Added to cart!");
}

window.removeFromCart = removeFromCart;

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  window.location.href = "login.html";
} else {
  loadCart();
}

// start logic load carts
async function loadCart() {
  const { data, error } = await supabase
    .from("cart")
    .select(`
      id,
      quantity,
      products:product_id (
        title,
        price
      )
    `)
    .eq("user_id", user.id);
  if (error) {
    alert("Something went wrong");
    return;
  }
  const items = data.map((row) => ({
    id: row.id,
    quantity: row.quantity,
    title: row.products ? row.products.title : "Unknown",
    price: row.products ? row.products.price : 0,
  }));
  displayCart(items);
}

// diplay
function displayCart(items) {
  const container = document.getElementById("cartContainer");
  const total = document.getElementById("cartTotlal");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>Your cart is Empty</p>";
    total.textContent = 0;
    return;
  }
  items.map((item) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");
    col.innerHTML = `
     <div class="card bg-custom text-white h-100">
          <div class="card-body">
            <h5>${item.title}</h5>
            <p>$${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="btn btn-danger"
              onclick="removeFromCart('${item.id}')">
              Remove
            </button>
          </div>
        </div>
    `;
    container.appendChild(col);
  });

  const totalItems = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  total.textContent = totalItems;
}

// remove
async function removeFromCart(id) {
  const { error } = await supabase.from("cart").delete().eq("id", id);
  if (error) {
    alert("something went wrong removing");
  } else {
    loadCart();
  }
}
loadCart();
