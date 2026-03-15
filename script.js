let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

function addItem(name,price){

let existing = cart.find(item=>item.name===name);

if(existing){
existing.qty++;
}
else{
cart.push({name:name,price:price,qty:1});
}

saveCart();
renderCart();
}

function deleteItem(index){
cart.splice(index,1);
saveCart();
renderCart();
}

function clearCart(){
cart=[];
saveCart();
renderCart();
}

function renderCart(){

let container=document.getElementById("cartItems");
container.innerHTML="";

let subtotal=0;

cart.forEach((item,index)=>{

let total=item.price*item.qty;
subtotal+=total;

container.innerHTML+=`
<div class="cart-item">
<span>${item.name} x${item.qty}</span>
<span>₹${total} 
<button class="delete" onclick="deleteItem(${index})">x</button>
</span>
</div>
`;

});

let discount=0;

if(subtotal>10000){
discount=subtotal*0.05;
}

let finalTotal=subtotal-discount;

document.getElementById("subtotal").innerText=subtotal;
document.getElementById("discount").innerText=discount.toFixed(2);
document.getElementById("finalTotal").innerText=finalTotal.toFixed(2);

}

renderCart();