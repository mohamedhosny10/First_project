import { supabase } from "./supabase.js";

export async function addToCart(title, price, category) {
  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    alert("Please log in first.");
    return;
  }

  const { data: found } = await supabase
    .from("products")
    .select("id")
    .eq("title", title)
    .eq("category", category)
    .maybeSingle();

  let productId;

  if (found) {
    productId = found.id;
  } else {
    const { data: newRow, error: err } = await supabase
      .from("products")
      .insert({ title, category, price })
      .select("id")
      .single();

    if (err) {
      alert("Something went wrong.");
      return;
    }
    productId = newRow.id;
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
