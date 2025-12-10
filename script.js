// This is the boilerplate code given for you
// You can modify this code 
// Product data
const products = [ 
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
let cart=[];
if (!sessionStorage.getItem("cart")) {
  const preset = [
    { id: 1, name: "Product 1", price: 10 }, 
    { id: 5, name: "Product 5", price: 50 },
    { id: 1, name: "Product 1", price: 10 }
  ];
  sessionStorage.setItem("cart", JSON.stringify(preset));
}

// Load cart from sessionStorage
cart = JSON.parse(sessionStorage.getItem("cart")) || [];


const cartList=document.getElementById("cart-list");
const totalPriceEl=document.getElementById("total-price");
const clearCartBtn=document.getElementById("clear-cart-btn");
//session storage save
function saveCart(){
		sessionStorage.setItem('cart',JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
	document.querySelectorAll(".add-to-cart-btn").forEach((btn)=>{
		btn.addEventListener('click',()=>{
			addToCart(Number(btn.dataset.id));
		});
	});
}

// Render cart list
function renderCart() {
	cartList.innerHTML="";

	cart.forEach((item)=>{
		const li=document.createElement("li");
			li.innerHTML=`
			${item.name} - $${item.price}
			<button class="remove-btn" data-id="${item.id}">Remove</button>
			`;
		cartList.appendChild(li);
	});

	document.querySelectorAll(".remove-btn").forEach((btn)=>{
		btn.addEventListener('click',()=>{
			removeFromCart(Number(btn.dataset.id));
		});
	});
	const total=cart.reduce((sum,item)=>sum + item.price,0);
	totalPriceEl.textContent="total: $"+total;
}

// Add item to cart
function addToCart(productId) {
	const product=products.find((p)=>p.id===productId);
	if(product){
	cart.push(product);
		saveCart();
	renderCart();
	}
}

// Remove item from cart
function removeFromCart(productId) {
	cart=cart.filter((item)=>item.id!==productId);
	saveCart();
	renderCart();
}

// Clear cart
function clearCart() {
	cart=[];
	sessionStorage.removeItem("cart");
	renderCart();
	
}
clearCartBtn.addEventListener("click",clearCart);

// Initial render
renderProducts();
renderCart();

