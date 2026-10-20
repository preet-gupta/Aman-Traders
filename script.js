const number = "918318001646";
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const search = document.getElementById("productSearch");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll(".product")];
let filter = "all";
function filterProducts() {
  const q = search.value.trim().toLowerCase();
  let count = 0;
  cards.forEach(card => {
    const visible = (filter === "all" || card.dataset.category === filter) &&
      (card.dataset.search + " " + card.innerText).toLowerCase().includes(q);
    card.hidden = !visible;
    if (visible) count++;
  });
  document.getElementById("noResults").hidden = count !== 0;
}
search.addEventListener("input", filterProducts);
filterButtons.forEach(button => button.addEventListener("click", () => {
  filter = button.dataset.filter;
  filterButtons.forEach(b => b.classList.toggle("active", b === button));
  filterProducts();
}));
function whatsapp(message) {
  window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}
document.querySelectorAll(".enquire-product").forEach(button => button.addEventListener("click", () => {
  whatsapp("Hello Aman Traders, I would like to enquire about " + button.dataset.product + ". Please share available options and current pricing.");
}));
document.querySelectorAll(".brand-enquiry").forEach(button => button.addEventListener("click", () => {
  whatsapp("Hello Aman Traders, I would like to enquire about " + button.dataset.brand + ". Please share available products and current pricing.");
}));
document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = (form.get("name") || "").trim();
  const phone = (form.get("phone") || "").trim();
  const product = (form.get("product") || "").trim();
  const quantity = (form.get("quantity") || "").trim();
  const details = (form.get("message") || "").trim();
  const lines = ["Hello Aman Traders, I would like to make an enquiry.", "", "Name: " + name, "My mobile number: " + phone, "Product: " + product];
  if (quantity) lines.push("Quantity / pack size: " + quantity);
  if (details) lines.push("Requirements: " + details);
  lines.push("", "Please share availability and current pricing. Thank you.");
  whatsapp(lines.join("\n"));
});
document.getElementById("year").textContent = new Date().getFullYear();
