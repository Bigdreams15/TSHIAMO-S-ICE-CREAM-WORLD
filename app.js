const products = [
  { id: "strawberry-dream", name: "Strawberry Dream", category: "Cones", price: 35, label: "A FAVOURITE", description: "Creamy strawberry ice cream with a little berry brightness in every scoop.", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=750&q=80", alt: "A soft pink ice cream cone" },
  { id: "chocolate-cloud", name: "Chocolate Cloud", category: "Scoops", price: 38, label: "CHOCOLATE LOVE", description: "A dreamy, chocolatey treat for the days that call for something extra lovely.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=750&q=80", alt: "Rich chocolate ice cream served in a bowl" },
  { id: "berry-sundae", name: "Berry Bliss Sundae", category: "Sundaes", price: 59, label: "MADE FOR SHARING", description: "A cheerful sundae layered with creamy scoops and a fruity berry finish.", image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=750&q=80", alt: "Ice cream scoops in a bowl with colourful sprinkles" },
  { id: "vanilla-cloud", name: "Vanilla Cloud Cup", category: "Cups", price: 32, label: "SIMPLE JOY", description: "A classic, creamy vanilla cup that makes any moment feel a little sweeter.", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=750&q=80", alt: "A bowl of creamy ice cream scoops" },
  { id: "dreamy-shake", name: "Dreamy Shake", category: "Milkshakes", price: 55, label: "SIP THE JOY", description: "A cool, creamy milkshake for taking your sweet time and enjoying the moment.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=750&q=80", alt: "A creamy milkshake topped with whipped cream" },
  { id: "caramel-sundae", name: "Caramel Hug Sundae", category: "Sundaes", price: 62, label: "A LITTLE INDULGENCE", description: "Smooth ice cream with a warm caramel-inspired twist. A hug in sundae form.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=750&q=80", alt: "A sweet ice cream dessert ready to enjoy" },
  { id: "rainbow-cone", name: "Sunshine Scoops", category: "Scoops", price: 39, label: "PURE HAPPINESS", description: "A colourful, feel-good scoop for anyone who believes sprinkles make it better.", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=750&q=80", alt: "A bowl of scoops with a spoon" },
  { id: "family-tub", name: "Happiness to Share", category: "Tubs", price: 120, label: "TAKE SOME HOME", description: "A tub of sample-menu happiness to enjoy at home or share with your favourites.", image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=750&q=80", alt: "Ice cream scoops in a bowl with colourful sprinkles" }
];

const categories = ["All", "Scoops", "Cones", "Cups", "Sundaes", "Milkshakes", "Tubs"];
const money = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" });
const productGrid = document.querySelector(".product-grid");
const filters = document.querySelector(".filters");
const searchInput = document.querySelector("#product-search");
const cartDrawer = document.querySelector(".cart-drawer");
const overlay = document.querySelector(".overlay");
const cartItems = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartSummary = document.querySelector(".cart-summary");
const checkoutForm = document.querySelector("#checkout-form");
const productDialog = document.querySelector(".product-dialog");
let activeCategory = "All";
let cart = loadCart();
let toastTimeout;

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("tshiamo-cart") || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((line) =>
      line && products.some((product) => product.id === line.id) &&
      Number.isInteger(line.quantity) && line.quantity > 0
    );
  } catch (error) {
    console.warn("Saved cart could not be read.", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("tshiamo-cart", JSON.stringify(cart));
  } catch (error) {
    console.warn("Cart changes will not persist after this visit.", error);
    showToast("Your browser could not save the bag for next time.");
  }
}

function renderFilters() {
  filters.innerHTML = categories.map((category) =>
    `<button class="filter-button" type="button" aria-pressed="${category === activeCategory}" data-category="${category}">${category}</button>`
  ).join("");
}

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = products.filter((product) =>
    (activeCategory === "All" || product.category === activeCategory) &&
    `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(term)
  );
  productGrid.innerHTML = visible.length ? visible.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.alt}" loading="lazy">
        <span class="product-label">${product.label}</span>
        <button class="quick-add" type="button" data-add="${product.id}" aria-label="Add ${product.name} to bag">+</button>
      </div>
      <div class="product-info">
        <div class="product-info-top"><button class="product-name" type="button" data-details="${product.id}">${product.name}</button><span class="product-price">${money.format(product.price)}</span></div>
        <p>${product.category} · Sample menu</p>
      </div>
    </article>`).join("") : `<p class="empty-search">No flavours found. Try a different search or category.</p>`;
}

function addToCart(id) {
  const line = cart.find((item) => item.id === id);
  if (line) line.quantity += 1;
  else cart.push({ id, quantity: 1 });
  saveCart();
  renderCart();
  showToast(`${products.find((product) => product.id === id).name} added to your bag.`);
}

function updateQuantity(id, change) {
  const line = cart.find((item) => item.id === id);
  if (!line) return;
  line.quantity += change;
  if (line.quantity < 1) cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  document.querySelector(".cart-count").textContent = quantity;
  document.querySelector(".drawer-count").textContent = `(${quantity})`;
  document.querySelector(".subtotal").textContent = money.format(subtotal);
  cartEmpty.hidden = cart.length > 0;
  cartSummary.hidden = cart.length === 0;
  checkoutForm.hidden = true;
  cartItems.innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return `<article class="cart-line">
      <img src="${product.image}" alt="">
      <div><h3>${product.name}</h3><p>${money.format(product.price)} each</p>
        <div class="quantity-controls" aria-label="${product.name} quantity">
          <button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Decrease ${product.name} quantity">−</button><span>${item.quantity}</span>
          <button type="button" data-quantity="${product.id}" data-change="1" aria-label="Increase ${product.name} quantity">+</button>
        </div>
      </div>
      <div class="cart-line-total">${money.format(product.price * item.quantity)}<button class="remove-line" type="button" data-remove="${product.id}">Remove</button></div>
    </article>`;
  }).join("");
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2500);
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartDrawer.inert = false;
  overlay.hidden = false;
  overlay.inert = true;
  document.querySelectorAll("header.site-header, main, footer.site-footer").forEach((element) => { element.inert = true; });
  document.body.classList.add("drawer-open");
  document.querySelector(".close-drawer").focus();
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartDrawer.inert = true;
  overlay.hidden = true;
  overlay.inert = false;
  document.querySelectorAll("header.site-header, main, footer.site-footer").forEach((element) => { element.inert = false; });
  document.body.classList.remove("drawer-open");
  document.querySelector(".cart-trigger").focus();
}

function showProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  productDialog.querySelector(".dialog-content").innerHTML = `
    <img src="${product.image}" alt="${product.alt}">
    <div class="dialog-copy"><p class="eyebrow"><span></span> ${product.category.toUpperCase()} · SAMPLE MENU</p>
      <h2>${product.name}</h2><p>${product.description}</p><p class="dialog-price">${money.format(product.price)}</p>
      <button class="button button-dark" type="button" data-add="${product.id}">Add to your bag <span aria-hidden="true">↗</span></button>
    </div>`;
  productDialog.showModal();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);
productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const detailsButton = event.target.closest("[data-details]");
  if (addButton) addToCart(addButton.dataset.add);
  if (detailsButton) showProduct(detailsButton.dataset.details);
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) updateQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

document.querySelector(".dialog-content").addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) {
    addToCart(button.dataset.add);
    productDialog.close();
  }
});
document.querySelector(".dialog-close").addEventListener("click", () => productDialog.close());
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});
document.querySelector(".cart-trigger").addEventListener("click", openCart);
document.querySelector(".close-drawer").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.querySelector(".continue-shopping").addEventListener("click", () => {
  closeCart();
  document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".checkout-start").addEventListener("click", () => {
  cartSummary.hidden = true;
  checkoutForm.hidden = false;
  document.querySelector("#order-name").focus();
});
document.querySelector(".back-to-bag").addEventListener("click", () => {
  checkoutForm.hidden = true;
  cartSummary.hidden = cart.length === 0;
});
document.querySelector("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const message = form.querySelector(".checkout-message");
  message.textContent = "This enquiry has not been sent and your order has not been placed. Connect an order service and payment provider before accepting real orders.";
});
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  event.currentTarget.querySelector(".form-message").textContent = "Thanks for filling this out. No message was sent because the shop has not connected an email service yet.";
});
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  event.currentTarget.querySelector(".form-message").textContent = "Your email was not saved or sent. Connect a newsletter service before collecting signups.";
});
document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  button.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  document.querySelector(".main-nav").classList.toggle("is-open", !expanded);
});
document.querySelector(".main-nav").addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  document.querySelector(".main-nav").classList.remove("is-open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  document.querySelector(".menu-toggle").setAttribute("aria-label", "Open navigation");
});
document.addEventListener("keydown", (event) => {
  if (!cartDrawer.classList.contains("is-open")) return;
  if (event.key === "Escape") {
    closeCart();
    return;
  }
  if (event.key === "Tab") {
    const focusable = [...cartDrawer.querySelectorAll('button:not([disabled]):not([hidden]), input:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), a[href]:not([hidden])')]
      .filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
document.querySelector("#current-year").textContent = new Date().getFullYear();

renderFilters();
renderProducts();
renderCart();
