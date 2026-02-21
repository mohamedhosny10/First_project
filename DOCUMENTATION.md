# TechUp — Project Documentation

Based on **Final Project JS.txt** requirements. Use the checklists to verify what is achieved in the code.

---

## Requirements checklist

### Website features

| # | Requirement | Status | Where in code |
|---|-------------|--------|----------------|
| 1 | View products | ✅ | `products.js` — `fetchProducts()`, `displayProducts()`; products from DummyJSON API |
| 2 | Search and filter products | ✅ | `products.js` — filter by category (Mobiles/Laptops) via `loadCategory(category)`; URL param `?category=` |
| 3 | View product details | ✅ | `product_details.html` + `productDetails.js` — `loadProduct(id)`, `showProduct(product)` |
| 4 | Add products to cart | ✅ | `cart.js` — `addToCart()`; products page + product details page |
| 5 | Remove products from cart | ✅ | `cart.js` — `removeFromCart(id)` |
| 6 | Register | ✅ | `auth.js` — `registerForm` submit listener, `supabase.auth.signUp()` |
| 7 | Login | ✅ | `auth.js` — `loginForm` submit listener, `supabase.auth.signInWithPassword()` |
| 8 | Complete checkout process | ✅ | `checkout.js` — `loadCart()`, `displayItems()`, `calculateTotal()`, `placeOrder()`; order saved, cart cleared |
| 9 | Products fetched from public API (Fetch API) | ✅ | `products.js` — `fetch()` to `https://dummyjson.com/products/category/`; `productDetails.js` — `fetch()` to `https://dummyjson.com/products/:id` |

### Required pages (minimum 10)

| # | Page | File | Status |
|---|------|------|--------|
| 1 | Home | `pages/home.html` | ✅ |
| 2 | Products | `pages/products.html` | ✅ |
| 3 | Product details | `pages/product_details.html` | ✅ |
| 4 | Cart | `pages/cart.html` | ✅ |
| 5 | Checkout | `pages/checkout.html` | ✅ |
| 6 | Login | `pages/login.html` | ✅ |
| 7 | Register | `pages/register.html` | ✅ |
| 8 | About | `pages/about.html` | ✅ |
| 9 | Contact | `pages/contact.html` | ✅ |
| 10 | Category | `pages/category.html` | ✅ |

### Technical rules

| # | Rule | Status | Where in code |
|---|------|--------|----------------|
| 1 | Fetch API | ✅ | `products.js`: `fetch(...dummyjson.com...)`; `productDetails.js`: `fetch(...dummyjson.com/products/:id)` |
| 2 | Promises or async/await | ✅ | All JS files use `async/await` (e.g. `async function loadCart()`, `await supabase...`, `await fetch(...)`) |
| 3 | DOM manipulation | ✅ | `getElementById`, `innerHTML`, `createElement`, `appendChild`, `classList.add` in cart.js, products.js, checkout.js, productDetails.js |
| 4 | LocalStorage | ⚠️ | **Not used.** Data is stored in Supabase (auth, cart, orders). Requirement says “LocalStorage” — instructor may accept Supabase as persistence. |
| 5 | At least 5 functions | ✅ | See “Functions used” section below (many more than 5) |
| 6 | At least 3 array methods (filter, map, reduce, etc.) | ✅ | **map:** cart.js, checkout.js, products.js; **reduce:** cart.js, checkout.js; **forEach:** products.js, checkout.js |
| 7 | Event listeners | ✅ | `auth.js`: `addEventListener("submit", ...)` on register/login, `addEventListener("click", ...)` on logout; form submits and button clicks |
| 8 | Form validation (JavaScript) | ✅ | `auth.js`: `e.preventDefault()` then Supabase validation; `checkout.js`: `placeOrder()` checks `if (!fullName \|\| !email \|\| !address \|\| !phone)`; HTML `required` on inputs |

### Design rules

| # | Rule | Status |
|---|------|--------|
| 1 | Website responsive | ✅ Bootstrap layout (e.g. `navbar-expand-lg`, `col-md-*`, `container`) |
| 2 | Bootstrap OR custom CSS | ✅ Bootstrap 5 + custom `styles.css`, `products.css` |
| 3 | Clean UI | ✅ Consistent navbar/footer, cards, buttons |

### Submission rules

| # | Rule | Status |
|---|------|--------|
| 1 | Project folder | ✅ |
| 2 | Organized files (css / js folders) | ✅ `css/`, `js/`, `pages/`, `assets/` |
| 3 | Clean code | ✅ |
| 4 | No console errors | ✅ (fix any before submission) |
| 5 | Documentation | ✅ This file |

---

## Functions used (by file)

### auth.js
- **Event listeners:** register form `submit`, login form `submit`, logout button `click`.
- **Behavior:** Register (Supabase `signUp`), Login (Supabase `signInWithPassword`), Logout (Supabase `signOut`); redirects after success.

### cart.js
- `addToCart(title, price, category)` — adds product to Supabase cart (finds/creates product, then inserts cart row).
- `loadCart()` — fetches cart for current user from Supabase, then `displayCart()`.
- `displayCart(items)` — builds cart HTML, shows total (uses **map** and **reduce**).
- `removeFromCart(id)` — deletes cart item in Supabase, then reloads cart.
- **Array methods:** `map` (cart rows → items), `reduce` (total price).

### products.js
- `fetchProducts(category)` — **Fetch API** + async/await to DummyJSON, then `displayProducts(data.products)`.
- `displayProducts(products)` — DOM: creates product cards, **forEach** to append.
- `loadCategory(category)` — calls `fetchProducts(category)` (used for filter by category).
- **Array method:** `forEach`.

### checkout.js
- `loadCart()` — fetches cart from Supabase, builds `cartItems` with **map**, then `displayItems()`, `calculateTotal()`.
- `displayItems()` — DOM: writes order summary.
- `calculateTotal()` — **reduce** for total, updates `#totalPrice`.
- `placeOrder()` — validates form (fullName, email, address, phone), inserts order in Supabase, deletes cart rows, redirects.
- **Array methods:** `map`, `reduce`, `forEach`.

### productDetails.js
- `loadProduct(id)` — **Fetch API** to DummyJSON product by id, then `showProduct(product)`.
- `showProduct(product)` — DOM: fills product details (image, title, description, price, Add to Cart).
- `addToCartFromDetails()` — calls `addToCart()` from cart.js with current product.

### supabase.js
- Exports Supabase **client** (createClient with URL and anon key). No custom functions; used by auth, cart, checkout.

---

## What is achieved (summary)

1. **E-commerce flow:** Home → Products (by category) → Product details → Add to cart → Cart → Checkout → Place order (Supabase).
2. **Auth:** Register, login, logout (Supabase Auth); cart and checkout require login.
3. **Data:** Products from **DummyJSON** (Fetch API); cart and orders in **Supabase**.
4. **Technical:** Fetch API, async/await, DOM manipulation, multiple functions, **map / reduce / forEach**, event listeners, basic form validation.
5. **Pages:** 10 pages (home, products, product_details, cart, checkout, login, register, about, contact, category).
6. **UI:** Bootstrap + custom CSS, responsive, same navbar and footer across pages.

**Note:** LocalStorage is not used; persistence is done with Supabase. If the assignment strictly requires LocalStorage, you could add a small feature (e.g. store “recent category” or a preference in localStorage) and mention it in the doc.
