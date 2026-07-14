let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function showWishlist(){
  let html = '';
  if(wishlist.length == 0){
    document.getElementById('wishlistList').innerHTML = '<p style="text-align:center;padding:50px">Wishlist खाली है</p>';
    return;
  }

  wishlist.forEach((item, i)=>{
    html += `<div class="wishlist-item">
      <div style="display:flex;gap:15px">
        <img src="${item.img}">
        <div>
          <h4>${item.name}</h4>
          <p class="price">₹${item.price}</p>
        </div>
      </div>
      <div>
        <button class="btn" onclick="addToCartFromWish(${i})">Add to Cart</button>
        <button onclick="removeWish(${i})" style="background:red;color:#fff;border:none;padding:10px;border-radius:4px;cursor:pointer">X</button>
      </div>
    </div>`;
  });
  document.getElementById('wishlistList').innerHTML = html;
}

function removeWish(i){
  wishlist.splice(i,1);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  showWishlist();
}

function addToCartFromWish(i){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(wishlist[i]);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Cart में Add हो गया');
}

showWishlist();
