
let cart = [];


function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById("cart-count").innerText = cart.length;
}


function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").innerText = cart.length;
  openCart();
}

function openCart() {
  document.getElementById("cart-modal").style.display = "block";
  let items = document.getElementById("cart-items");
  items.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {

    items.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>${item.price} F</span>
        <button class="remove" onclick="removeFromCart(${index})">✖</button>
      </div>
    `;
    total += item.price;
  });

  document.getElementById("total").innerText = total;
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function orderWhatsApp() {
  if (cart.length === 0) return alert("Panier vide");

  let message = "Bonjour, je souhaite commander :%0A";

  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} : ${item.price} F%0A`;
    total += item.price;
  });

  message += `%0ATotal : ${total} F`;
  window.open("https://wa.me/221763883938?text=" + message);
}

function getNow(name, price) {
  let msg = `Bonjour, je souhaite obtenir l'ebook : ${name} - ${price} F`;
  window.open("https://wa.me/221763883938?text=" + encodeURIComponent(msg));
}

/* RECHERCHE */
document.getElementById("search").addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  document.querySelectorAll(".ebook").forEach(ebook => {
    ebook.style.display = ebook.dataset.name.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});

function openDetails(img) {
  let ebook = img.parentElement;

  let name = ebook.dataset.name;
  let price = ebook.dataset.price;
  let desc = ebook.dataset.description;
  let image = img.src;

  document.getElementById("details-img").src = image;
  

document.getElementById("details-title").innerText = name;
  document.getElementById("details-desc").innerText = desc;
  document.getElementById("details-price").innerText = price + " F";

  document.getElementById("details-add").onclick = () => addToCart(name, Number(price));

  document.getElementById("details-get").onclick = () => getNow(name, Number(price));

  document.getElementById("details-modal").style.display = "block";
}

function closeDetails() {
  document.getElementById("details-modal").style.display = 

"none";
}


 document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    let cat = this.dataset.category;

    document.querySelectorAll(".ebook").forEach(ebook => {

       if (cat === "all" || ebook.dataset.category === cat) {
        ebook.style.display = "block";
      } else {
        ebook.style.display = "none";
      }
     
    });
  });
 }); 

 


function animateCoverToCart(imgElement) {
  const flyImg = imgElement.cloneNode(true);
  flyImg.classList.add('fly-img');
  document.body.appendChild(flyImg);

  const imgRect = imgElement.getBoundingClientRect();
  flyImg.style.top = imgRect.top + "px";

  flyImg.style.left = imgRect.left + "px";

  const cartBtn = document.querySelector('.cart');
  const cartRect = cartBtn.getBoundingClientRect();

  setTimeout(() => {
    flyImg.style.transform = `translate(${cartRect.left - imgRect.left}px, ${cartRect.top - imgRect.top}px) scale(0.2)`;
    flyImg.style.opacity = '0.5';

  }, 50);

  flyImg.addEventListener('transitionend', () => {
    flyImg.remove();
  });
}
  document.querySelectorAll('.ebook button').forEach(btn => {
  btn.addEventListener('click', function() {
    const ebook = btn.closest('.ebook');
    const productId = 

ebook.dataset.id;

     
    // 2️⃣ lancer l’animation (100% indépendante)
    const img = ebook.querySelector('img');
    animateCoverToCart(img);
  });
});
