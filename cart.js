let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showCart(){
  let html = '';
  let total = 0;
  if(cart.length == 0){
    document.getElementById('cartList').innerHTML = '<p style="text-align:center;padding:50px">Cart खाली है</p>';
    return;
  }
  
  cart.forEach((item, i)=>{
    total += item.price * item.qty;
    html += `<div class="cart-item">
      <div style="display:flex;gap:15px">
        <img src="${item.img}">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.qty}</p>
        </div>
      </div>
      <button onclick="removeItem(${i})" style="background:red;color:#fff;border:none;padding:8px 12px;border-radius:4px;cursor:pointer">Remove</button>
    </div>`;
  });
  
  document.getElementById('cartList').innerHTML = html;
  document.getElementById('totalPrice').innerText = 'Total: ₹' + total;
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
}

function goToCheckout(){
  if(cart.length == 0){ alert('Cart खाली है'); return; }
  window.location = 'checkout.html';
}

showCart();
