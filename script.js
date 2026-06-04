// ========== SK PHARMACY - FULL AMAZON TYPE ==========
let PRODUCT_LINKS = {};
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let comments = JSON.parse(localStorage.getItem('comments')) || {};
let likes = JSON.parse(localStorage.getItem('likes')) || {};

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1CG0ALO22DalxaktdD0ZuNYGSkUiMc5P4lb2fDwWYrS0/export?format=csv';
const STORE_PHONE = '919258751739';
const STORE_PHONE2 = '917983006957';
const STORE_ADDRESS = 'सिलापुर, दनकौर, ग्रेटर नोएडा, उत्तर प्रदेश - 203201';

// ========== GOOGLE SHEET LOAD ==========
async function loadProductsFromSheet() {
  try {
    const res = await fetch(SHEET_CSV_URL);
    const csv = await res.text();
    const rows = csv.split('\n').slice(1);
    PRODUCT_LINKS = {};
    rows.forEach(row => {
      if(!row.trim()) return;
      const c = row.split(',');
      const name = c[0]?.trim();
      if(!name) return;
      PRODUCT_LINKS[name] = {
        stock: parseInt(c[1]) || 0,
        cod: c[2]?.trim().toUpperCase() === 'TRUE',
        price: parseInt(c[3]) || 0,
        mrp: parseInt(c[4]) || 0,
        desc: c[5]?.trim() || '',
        image: c[6]?.trim() || '',
        amazon: c[7]?.trim() || '',
        flipkart: c[8]?.trim() || '',
        meesho: c[9]?.trim() || '',
        category: c[10]?.trim() || 'General',
        bestseller: c[11]?.trim().toUpperCase() === 'TRUE'
      };
    });
    displayProducts(Object.keys(PRODUCT_LINKS));
    showLiveNotification();
  } catch(e) {
    document.getElementById('productContainer').innerHTML = `<div style="color:red;text-align:center;padding:20px;"><h3>Products Load नहीं हुए</h3><p>Sheet को Publish to web करो</p></div>`;
  }
}

// ========== LIVE NOTIFICATION ==========
function showLiveNotification() {
  const names = ['Rahul', 'Priya', 'Amit', 'Neha', 'Vikas'];
  const products = Object.keys(PRODUCT_LINKS);
  if(products.length === 0) return;

  setInterval(() => {
    const name = names[Math.floor(Math.random() * names.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;bottom:20px;left:20px;background:white;padding:10px 15px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;font-size:14px;animation:slideIn 0.5s;';
    notif.innerHTML = `🔥 <b>${name}</b> ने ${product} खरीदा अभी`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
  }, 8000);
}

// ========== LOGIN / SIGNUP SYSTEM ==========
function showLoginModal() {
  closeSidebar();
  document.getElementById('modalTitle').innerText = '👤 Login / Sign Up';
  document.getElementById('modalContent').innerHTML = `
    <div id="loginForm">
      <input type="tel" id="loginPhone" placeholder="Mobile Number" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:5px;">
      <input type="password" id="loginPass" placeholder="Password" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:5px;">
      <button onclick="loginUser()" style="width:100%;background:#FF9900;color:white;padding:12px;border:none;border-radius:5px;font-weight:bold;margin-top:10px;">Login</button>
      <p style="text-align:center;margin:15px 0;">New User? <a href="#" onclick="showSignupForm()" style="color:#0066c0;">Create Account</a></p>
    </div>
    <div id="signupForm" style="display:none;">
      <input type="text" id="signupName" placeholder="Full Name" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:5px;">
      <input type="tel" id="signupPhone" placeholder="Mobile Number" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:5px;">
      <input type="password" id="signupPass" placeholder="Password" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:5px;">
      <input type="text" id="signupAddress" placeholder="Address, Silapur Dankaur" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:5px;">
      <input type="text" id="signupPin" placeholder="Pincode 203201" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:5px;">
      <button onclick="signupUser()" style="width:100%;background:#FF9900;color:white;padding:12px;border:none;border-radius:5px;font-weight:bold;margin-top:10px;">Sign Up</button>
      <p style="text-align:center;margin:15px 0;">Already have account? <a href="#" onclick="showLoginForm()" style="color:#0066c0;">Login</a></p>
    </div>
  `;
  document.getElementById('settingsModal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function showSignupForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
}

function showLoginForm() {
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function signupUser() {
  const user = {
    name: document.getElementById('signupName').value,
    phone: document.getElementById('signupPhone').value,
    pass: document.getElementById('signupPass').value,
    address: document.getElementById('signupAddress').value,
    pin: document.getElementById('signupPin').value
  };
  if(!user.name ||!user.phone ||!user.pass) return alert('सभी Fields भरें');
  localStorage.setItem('user_' + user.phone, JSON.stringify(user));
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  alert('Account Created! Welcome ' + user.name);
  closeModal();
  updateAccountUI();
}

function loginUser() {
  const phone = document.getElementById('loginPhone').value;
  const pass = document.getElementById('loginPass').value;
  const user = JSON.parse(localStorage.getItem('user_' + phone));
  if(user && user.pass === pass) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Welcome Back ' + user.name);
    closeModal();
    updateAccountUI();
  } else {
    alert('Wrong Mobile or Password');
  }
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAccountUI();
  closeSidebar();
}

function updateAccountUI() {
  const accountBtn = document.getElementById('accountBtn');
  if(accountBtn) {
    accountBtn.innerText = currentUser? `Hi, ${currentUser.name.split(' ')[0]}` : 'Hello, Sign In';
  }
}

function openSidebar() {
  let sidebar = document.getElementById('sidebar');
  if (!sidebar) {
    sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.style.cssText = 'position:fixed;top:0;right:-300px;width:280px;height:100%;background:white;z-index:9999;transition:0.3s;box-shadow:-2px 0 10px rgba(0,0,0,0.3);padding:20px;overflow-y:auto;';
    sidebar.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h3 style="margin:0;">Menu</h3>
        <button onclick="closeSidebar()" style="background:none;border:none;font-size:28px;cursor:pointer;">×</button>
      </div>
      <a href="about.html" style="display:block;padding:15px 0;border-bottom:1px solid #eee;color:#333;text-decoration:none;font-weight:bold;">About Us</a>
      <a href="contact.html" style="display:block;padding:15px 0;border-bottom:1px solid #eee;color:#333;text-decoration:none;font-weight:bold;">Contact Us</a>
      <a href="privacy.html" style="display:block;padding:15px 0;border-bottom:1px solid #eee;color:#333;text-decoration:none;font-weight:bold;">Privacy Policy</a>
      <a href="terms.html" style="display:block;padding:15px 0;border-bottom:1px solid #eee;color:#333;text-decoration:none;font-weight:bold;">Terms & Conditions</a>
      <a href="refund.html" style="display:block;padding:15px 0;border-bottom:1px solid #eee;color:#333;text-decoration:none;font-weight:bold;">Refund Policy</a>
      <a href="account.html" style="display:block;padding:15px 0;color:#333;text-decoration:none;font-weight:bold;">My Account</a>
    `;
    document.body.appendChild(sidebar);
  }
sidebar = document.getElementById('sidebar');
  let overlay = document.getElementById('overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9998;display:none;';
    overlay.onclick = closeSidebar;
    document.body.appendChild(overlay);
  }
  
  sidebar.style.right = '0px';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  let sidebar = document.getElementById('sidebar');
  let overlay = document.getElementById('overlay');
  if (sidebar) sidebar.style.right = '-300px';
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}
function openThreeDotMenu() {
  closeSidebar();
  document.getElementById('modalTitle').innerText = '⚙️ Menu';
  document.getElementById('modalContent').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px;">
      <button onclick="filterProducts('bestseller')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">🔥 Bestsellers</button>
      <button onclick="filterProducts('new')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">🆕 New Releases</button>
      <button onclick="filterProducts('health')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">💊 Health</button>
      <button onclick="filterProducts('beauty')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">💄 Beauty</button>
      <button onclick="filterProducts('household')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">🏠 Household</button>
      <button onclick="showOrders()" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">📦 My Orders</button>
      <button onclick="showModalContent('about')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">ℹ️ About Us</button>
      <button onclick="showModalContent('contact')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">📞 Contact</button>
      <button onclick="showModalContent('privacy')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">🔒 Privacy Policy</button>
      <button onclick="showModalContent('refund')" style="padding:12px;text-align:left;background:#f7f7f7;border:none;border-radius:5px;">💰 Refund Policy</button>
    </div>
  `;
  document.getElementById('settingsModal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}
// ========== PRODUCT CARD CLICK - पूरी जानकारी + सभी ऑप्शन ==========
function showProductDetail(name) {
  let p = PRODUCT_LINKS[name];
  if(!p) return;

  let discount = p.mrp? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
  let productComments = comments[name] || [];
  let likeCount = likes[name] || 0;
  let userLiked = currentUser && likes[name + '_' + currentUser.phone];

  // पुराना Modal हटाओ
  let oldModal = document.getElementById('productModal');
  if(oldModal) oldModal.remove();

  let modal = document.createElement('div');
  modal.id = 'productModal';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:1001;display:flex;justify-content:center;align-items:start;overflow-y:auto;padding:20px 0;';

  modal.innerHTML = `
    <div style="background:white;max-width:500px;width:95%;border-radius:10px;overflow:hidden;margin:auto;">
      <div style="position:relative;">
        <img src="${p.image}" onerror="this.src='https://via.placeholder.com/500x300?text=No+Image'" style="width:100%;height:300px;object-fit:contain;background:#f7f7f7;">
        <button onclick="closeProductModal()" style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.6);color:white;border:none;width:35px;height:35px;border-radius:50%;cursor:pointer;font-size:18px;">✕</button>
        ${p.bestseller? `<div style="position:absolute;top:10px;left:10px;background:#FF6F00;color:white;padding:4px 10px;border-radius:3px;font-size:12px;font-weight:bold;">🔥 BESTSELLER</div>` : ''}
      </div>

      <div style="padding:15px;max-height:70vh;overflow-y:auto;">
        <h2 style="margin:0 0 8px 0;font-size:20px;">${name}</h2>

        <div style="margin-bottom:12px;">
          <span style="font-size:28px;font-weight:bold;color:#B12704;">₹${p.price}</span>
          ${p.mrp? `<span style="text-decoration:line-through;color:#565959;margin-left:10px;font-size:16px;">₹${p.mrp}</span>` : ''}
          ${discount > 0? `<span style="background:#CC0C39;color:white;padding:3px 8px;border-radius:3px;margin-left:10px;font-size:13px;">${discount}% OFF</span>` : ''}
        </div>

        <div style="background:#F0F2F2;padding:12px;border-radius:8px;margin-bottom:12px;font-size:14px;">
          <div style="margin-bottom:6px;">🚚 <b>FREE Delivery</b> to ${STORE_ADDRESS}</div>
          <div style="margin-bottom:6px;">📦 <b>Stock:</b> <span style="color:${p.stock > 5? '#007600' : '#CC0C39'};font-weight:bold;">${p.stock > 0? `${p.stock} available` : 'Out of Stock'}</span></div>
          ${p.cod? `<div>💰 <b>Cash on Delivery</b> Available</div>` : ''}
          <div style="margin-top:6px;">⏰ <b>Delivery:</b> 2-3 Days</div>
        </div>

        <p style="color:#0F1111;margin-bottom:15px;font-size:14px;line-height:1.6;">${p.desc || 'No description available'}</p>

        <button onclick="addToCart('${name}')" ${p.stock <= 0? 'disabled' : ''} style="width:100%;background:${p.stock <= 0? '#AAB7B8' : '#FFD814'};color:#0F1111;border:none;padding:13px;border-radius:20px;font-weight:bold;cursor:${p.stock <= 0? 'not-allowed' : 'pointer'};margin-bottom:10px;font-size:15px;box-shadow:0 2px 5px rgba(15,17,17,.15);">
          ${p.stock <= 0? 'Out of Stock' : '🛒 Add to Cart'}
        </button>

        <button onclick="buyNow('${name}')" ${p.stock <= 0? 'disabled' : ''} style="width:100%;background:${p.stock <= 0? '#AAB7B8' : '#FFA41C'};color:#0F1111;border:none;padding:13px;border-radius:20px;font-weight:bold;cursor:${p.stock <= 0? 'not-allowed' : 'pointer'};margin-bottom:15px;font-size:15px;box-shadow:0 2px 5px rgba(15,17,17,.15);">
          ${p.stock <= 0? 'Out of Stock' : '⚡ Buy Now'}
        </button>

        <div style="display:flex;gap:8px;margin-bottom:20px;border-top:1px solid #DDD;padding-top:15px;">
          <button onclick="likeProduct('${name}')" style="flex:1;padding:10px;border:1px solid #D5D9D9;background:${userLiked? '#FFF3F3' : 'white'};border-radius:8px;cursor:pointer;font-size:13px;">
            ${userLiked? '❤️' : '🤍'} Like (${likeCount})
          </button>
          <button onclick="shareProduct('${name}')" style="flex:1;padding:10px;border:1px solid #D5D9D9;background:white;border-radius:8px;cursor:pointer;font-size:13px;">
            📤 Share
          </button>
          <button onclick="followStore()" style="flex:1;padding:10px;border:1px solid #D5D9D9;background:white;border-radius:8px;cursor:pointer;font-size:13px;">
            ➕ Follow
          </button>
        </div>

        ${p.amazon || p.flipkart || p.meesho? `
        <div style="border-top:1px solid #DDD;padding-top:15px;margin-bottom:15px;">
          <b style="font-size:14px;">Also available on:</b>
          <div style="display:flex;gap:8px;margin-top:10px;">
            ${p.amazon? `<a href="${p.amazon}" target="_blank" style="flex:1;background:#232F3E;color:white;text-align:center;padding:8px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:bold;">Amazon</a>` : ''}
            ${p.flipkart? `<a href="${p.flipkart}" target="_blank" style="flex:1;background:#2874F0;color:white;text-align:center;padding:8px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:bold;">Flipkart</a>` : ''}
            ${p.meesho? `<a href="${p.meesho}" target="_blank" style="flex:1;background:#F43397;color:white;text-align:center;padding:8px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:bold;">Meesho</a>` : ''}
          </div>
        </div>` : ''}

        <div style="border-top:1px solid #DDD;padding-top:15px;">
          <h3 style="margin:0 0 12px 0;font-size:16px;">💬 Customer Reviews (${productComments.length})</h3>
          <div style="margin-bottom:12px;">
            <textarea id="commentText" placeholder="${currentUser? 'Write your review...' : 'Login to write review'}" ${!currentUser? 'disabled' : ''} style="width:100%;padding:10px;border:1px solid #D5D9D9;border-radius:8px;height:70px;font-size:14px;resize:none;box-sizing:border-box;"></textarea>
            <button onclick="addComment('${name}')" ${!currentUser? 'disabled' : ''} style="background:#FFD814;color:#0F1111;border:none;padding:8px 20px;border-radius:20px;margin-top:8px;cursor:${!currentUser? 'not-allowed' : 'pointer'};font-weight:bold;">Post Review</button>
            ${!currentUser? '<p style="font-size:12px;color:#CC0C39;margin-top:5px;">Please login to post review</p>' : ''}
          </div>
          <div id="commentsList">
            ${productComments.length === 0? '<p style="color:#565959;font-size:14px;text-align:center;padding:20px;">No reviews yet. Be the first!</p>' :
            productComments.map(c => `
              <div style="background:#F7F8F8;padding:12px;border-radius:8px;margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                  <b style="font-size:14px;">👤 ${c.user}</b>
                  <span style="color:#565959;font-size:11px;">${c.time}</span>
                </div>
                <p style="margin:0;font-size:14px;color:#0F1111;">${c.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeProductModal() {
  let modal = document.getElementById('productModal');
  if(modal) modal.remove();
}

// ========== BUY NOW ==========
function buyNow(name) {
  addToCart(name);
  showCart();
  document.getElementById('cartModal').style.display = 'block';
  closeProductModal();
}

// ========== LIKE + SHARE + COMMENT + FOLLOW ==========
function likeProduct(name) {
  if(!currentUser) { alert('Login करके Like करें'); showLoginModal(); return; }
  const userKey = name + '_' + currentUser.phone;
  if(likes[userKey]) {
    delete likes[userKey];
    likes[name] = Math.max(0, (likes[name] || 1) - 1);
  } else {
    likes[userKey] = true;
    likes[name] = (likes[name] || 0) + 1;
  }
  localStorage.setItem('likes', JSON.stringify(likes));
  closeProductModal();
  showProductDetail(name);
  showToast('❤️ Liked!');
}

function shareProduct(name) {
  const url = window.location.href.split('?')[0] + '?product=' + encodeURIComponent(name);
  const text = `*${name}* - Only ₹${PRODUCT_LINKS[name].price} on S K Pharmacy!%0A🚚 FREE Delivery to ${STORE_ADDRESS}%0A📞 Order: ${STORE_PHONE}`;
  if(navigator.share) {
    navigator.share({title: name, text: text, url: url});
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '%0A' + url)}`, '_blank');
  }
}

function followStore() {
  if(!currentUser) { alert('Login करके Follow करें'); showLoginModal(); return; }
  showToast('✅ Thanks for following S K Pharmacy!');
}

function addComment(name) {
  if(!currentUser) { alert('Login करके Comment करें'); showLoginModal(); return; }
  const text = document.getElementById('commentText').value.trim();
  if(!text) return alert('Review लिखें');
  if(!comments[name]) comments[name] = [];
  comments[name].unshift({
    user: currentUser.name,
    text: text,
    time: new Date().toLocaleString('en-IN', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})
  });
  localStorage.setItem('comments', JSON.stringify(comments));
  closeProductModal();
  showProductDetail(name);
  showToast('✅ Review Posted!');
}
// ========== PRODUCT DISPLAY WITH SEARCH SORT ==========
function displayProducts(productArray) {
  let productContainer = document.getElementById('productContainer');
  if(!productContainer) return;

  // Search के बाद मिला Product ऊपर आएगा
  const searchText = document.getElementById('myInput')?.value.toLowerCase() || '';
  if(searchText) {
    productArray.sort((a, b) => {
      const aMatch = a.toLowerCase().includes(searchText);
      const bMatch = b.toLowerCase().includes(searchText);
      return bMatch - aMatch;
    });
  }

  if(productArray.length === 0) {
    productContainer.innerHTML = `<p style="text-align:center; padding:20px;">No products found</p>`;
    return;
  }

  productContainer.innerHTML = productArray.map(name => {
    let p = PRODUCT_LINKS[name];
    if(!p) return '';
    let discount = p.mrp? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
    let likeCount = likes[name] || 0;
    let commentCount = comments[name]?.length || 0;

    return `
      <div class="product-card" style="border:1px solid #eee; padding:15px; border-radius:8px; margin:10px; width:200px; display:inline-block; vertical-align:top;">
        <img src="${p.image}" onclick="showProductDetail('${name}')" onerror="this.src='https://via.placeholder.com/200x180?text=No+Image'" style="width:100%; height:180px; object-fit:cover; border-radius:5px; cursor:pointer;">
        <h3 onclick="showProductDetail('${name}')" style="margin:10px 0 5px 0; font-size:16px; cursor:pointer;">${name}</h3>
        <div>
          <span style="font-size:18px; font-weight:bold; color:#E47911;">₹${p.price}</span>
          ${p.mrp? `<span style="text-decoration:line-through; color:#888; margin-left:8px; font-size:14px;">₹${p.mrp}</span>` : ''}
          ${discount > 0? `<span style="color:#388E3C; margin-left:8px; font-weight:bold; font-size:14px;">${discount}% off</span>` : ''}
        </div>
        ${p.bestseller? `<div style="background:#FF6F00;color:white;font-size:10px;padding:2px 6px;border-radius:3px;display:inline-block;margin-top:5px;">BESTSELLER</div>` : ''}
        ${p.cod? `<div style="color:#388E3C; font-size:12px; font-weight:bold; margin-top:5px;">✓ COD Available</div>` : ''}
        <div style="color:${p.stock > 5? '#388E3C' : '#ff4444'}; font-size:12px; margin-top:5px;">${p.stock > 0? `Stock: ${p.stock}` : 'Out of Stock'}</div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;border-top:1px solid #eee;padding-top:10px;">
          <button onclick="likeProduct('${name}')" style="background:none;border:none;cursor:pointer;font-size:12px;">❤️ ${likeCount}</button>
          <button onclick="showProductDetail('${name}')" style="background:none;border:none;cursor:pointer;font-size:12px;">💬 ${commentCount}</button>
          <button onclick="shareProduct('${name}')" style="background:none;border:none;cursor:pointer;font-size:12px;">📤 Share</button>
        </div>
      </div>
    `;
  }).join('');
}

// ========== LIKE + SHARE + COMMENT ==========
function likeProduct(name) {
  if(!currentUser) return alert('Login करके Like करें');
  likes[name] = (likes[name] || 0) + 1;
  localStorage.setItem('likes', JSON.stringify(likes));
  displayProducts(Object.keys(PRODUCT_LINKS));
}

function shareProduct(name) {
  const url = window.location.href + '?product=' + encodeURIComponent(name);
  const text = `Check this on S K Pharmacy: ${name} - ₹${PRODUCT_LINKS[name].price}`;
  if(navigator.share) {
    navigator.share({title: name, text: text, url: url});
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  }
}

function addComment(name) {
  if(!currentUser) return alert('Login करके Comment करें');
  const text = document.getElementById('commentText').value;
  if(!text.trim()) return;
  if(!comments[name]) comments[name] = [];
  comments[name].push({user: currentUser.name, text: text, time: new Date().toLocaleString()});
  localStorage.setItem('comments', JSON.stringify(comments));
  showProductDetail(name);
}
function openModal(title, content) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('myModal').style.display = 'block';
}
// ========== PRODUCT DETAIL MODAL ==========
function showProductDetail(name) {
  let p = PRODUCT_LINKS[name];
  if(!p) return;
  let discount = p.mrp? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
  let productComments = comments[name] || [];

  let modal = document.createElement('div');
  modal.id = 'productModal';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:1001;display:flex;justify-content:center;align-items:center;overflow-y:auto;';
  modal.innerHTML = `
    <div style="background:white;max-width:450px;width:90%;border-radius:10px;overflow:hidden;margin:20px;">
      <div style="position:relative;">
        <img src="${p.image}" onerror="this.src='https://via.placeholder.com/450x300?text=No+Image'" style="width:100%;height:250px;object-fit:cover;">
        <button onclick="closeProductModal()" style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.5);color:white;border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;">✕</button>
      </div>
      <div style="padding:15px;max-height:60vh;overflow-y:auto;">
        <h2 style="margin:0 0 10px 0;">${name}</h2>
        <div style="margin-bottom:10px;">
          <span style="font-size:24px;font-weight:bold;color:#E47911;">₹${p.price}</span>
          ${p.mrp? `<span style="text-decoration:line-through;color:#888;margin-left:10px;">₹${p.mrp}</span>` : ''}
          ${discount > 0? `<span style="background:#388E3C;color:white;padding:2px 6px;border-radius:3px;margin-left:10px;font-size:12px;">${discount}% OFF</span>` : ''}
        </div>
        <div style="background:#FFF3CD;padding:8px;border-radius:5px;margin-bottom:10px;font-size:14px;">🚚 Delivery: FREE | ${STORE_ADDRESS}</div>
        ${p.cod? `<div style="color:#388E3C;font-weight:bold;margin-bottom:10px;">✓ Cash on Delivery Available</div>` : ''}
        <div style="color:${p.stock > 5? '#388E3C' : '#ff4444'};margin-bottom:15px;">${p.stock > 0? `Only ${p.stock} left in stock` : 'Out of Stock'}</div>
        <p style="color:#666;margin-bottom:15px;font-size:14px;">${p.desc}</p>
        <button onclick="addToCart('${name}')" ${p.stock <= 0? 'disabled' : ''} style="width:100%;background:${p.stock <= 0? '#ccc' : '#FF9F00'};color:white;border:none;padding:12px;border-radius:5px;font-weight:bold;cursor:${p.stock <= 0? 'not-allowed' : 'pointer'};margin-bottom:10px;">${p.stock <= 0? 'Out of Stock' : 'Add to Cart'}</button>

        <div style="display:flex;gap:10px;margin-bottom:15px;">
          <button onclick="likeProduct('${name}')" style="flex:1;padding:8px;border:1px solid #ddd;background:white;border-radius:5px;">❤️ Like</button>
          <button onclick="shareProduct('${name}')" style="flex:1;padding:8px;border:1px solid #ddd;background:white;border-radius:5px;">📤 Share</button>
        </div>

        <h3 style="margin:15px 0 10px 0;font-size:16px;">💬 Comments (${productComments.length})</h3>
        <div style="margin-bottom:10px;">
          <textarea id="commentText" placeholder="Write a comment..." style="width:100%;padding:8px;border:1px solid #ddd;border-radius:5px;height:60px;"></textarea>
          <button onclick="addComment('${name}')" style="background:#2874F0;color:white;border:none;padding:8px 15px;border-radius:5px;margin-top:5px;cursor:pointer;">Post Comment</button>
        </div>
        <div id="commentsList">
          ${productComments.map(c => `<div style="background:#f7f7f7;padding:8px;border-radius:5px;margin-bottom:8px;"><b>${c.user}</b> <span style="color:#888;font-size:11px;">${c.time}</span><br>${c.text}</div>`).join('')}
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeProductModal() {
  let modal = document.getElementById('productModal');
  if(modal) modal.remove();
      }
// ========== CART SYSTEM ==========
function addToCart(name) {
  if(!currentUser) return alert('Login करके Add to Cart करें');
  let p = PRODUCT_LINKS[name];
  if(!p || p.stock <= 0) return;
  let item = cart.find(i => i.name === name);
  if(item) {
    if(item.qty < p.stock) item.qty++;
  } else {
    cart.push({name: name, price: p.price, qty: 1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
  closeProductModal();
  alert(`${name} added to cart!`);
}

function updateCartIcon() {
  let total = cart.reduce((sum, item) => sum + item.qty, 0);
  let countEl = document.getElementById('cart-count');
  if(countEl) countEl.innerText = total;
}

function showCart() {
  let itemsDiv = document.getElementById('cartItems');
  let totalDiv = document.getElementById('cartTotal');
  if(cart.length === 0) {
    itemsDiv.innerHTML = '<p style="text-align:center;padding:20px;">Cart is empty</p>';
    totalDiv.innerHTML = '';
    return;
  }
  let total = 0;
  itemsDiv.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #eee;">
        <div><div style="font-weight:bold;">${item.name}</div><div style="color:#666;font-size:14px;">₹${item.price} x ${item.qty}</div></div>
        <div style="display:flex;align-items:center;gap:10px;">
          <button onclick="updateQty('${item.name}', -1)" style="width:25px;height:25px;border:1px solid #ddd;background:white;cursor:pointer;">-</button>
          <span>${item.qty}</span>
          <button onclick="updateQty('${item.name}', 1)" style="width:25px;height:25px;border:1px solid #ddd;background:white;cursor:pointer;">+</button>
        </div>
      </div>
    `;
  }).join('');
  totalDiv.innerHTML = `<div style="text-align:right;font-size:18px;font-weight:bold;padding:15px;">Total: ₹${total}</div>`;
}

function updateQty(name, change) {
  let item = cart.find(i => i.name === name);
  if(!item) return;
  let p = PRODUCT_LINKS[name];
  item.qty += change;
  if(item.qty <= 0) cart = cart.filter(i => i.name!== name);
  else if(item.qty > p.stock) item.qty = p.stock;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
  showCart();
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

// ========== CHECKOUT + ORDER TRACK ==========
function checkout() {
  if(cart.length === 0) return;
  if(!currentUser) return alert('Login करके Order करें');

  const orderId = 'SK' + Date.now();
  const order = {
    id: orderId,
    user: currentUser.name,
    phone: currentUser.phone,
    address: currentUser.address,
    items: [...cart],
    total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    status: 'Order Placed',
    time: new Date().toLocaleString()
  };
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  let msg = `🛒 *New Order ${orderId}*%0A%0A`;
  cart.forEach(item => { msg += `${item.name} - ₹${item.price} x ${item.qty}%0A`; });
  msg += `%0A*Total: ₹${order.total}*%0A%0AName: ${currentUser.name}%0AAddress: ${currentUser.address}%0APin: ${currentUser.pin}%0APhone: ${currentUser.phone}`;

  window.open(`https://wa.me/${STORE_PHONE}?text=${msg}`, '_blank');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
  closeCart();
  alert('Order Placed! Track in My Orders');
}

function showOrders() {
  closeModal();
  const userOrders = orders.filter(o => o.phone === currentUser?.phone);
  document.getElementById('modalTitle').innerText = '📦 My Orders';
  document.getElementById('modalContent').innerHTML = userOrders.length === 0? '<p>No orders yet</p>' : userOrders.map(o => `
    <div style="border:1px solid #ddd;padding:10px;border-radius:5px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;"><b>Order ${o.id}</b><span style="color:#388E3C;font-size:12px;">${o.status}</span></div>
      <div style="font-size:12px;color:#666;margin:5px 0;">${o.time}</div>
      ${o.items.map(i => `<div style="font-size:14px;">${i.name} x ${i.qty}</div>`).join('')}
      <div style="text-align:right;font-weight:bold;margin-top:5px;">Total: ₹${o.total}</div>
    </div>
  `).join('');
  document.getElementById('settingsModal').style.display = 'block';
}

// ========== FILTERS ==========
function filterProducts(type) {
  closeModal();
  let filtered = Object.keys(PRODUCT_LINKS);
  if(type === 'bestseller') filtered = filtered.filter(n => PRODUCT_LINKS[n].bestseller);
  else if(type === 'new') filtered = filtered.slice(-10);
  else if(type!== 'all') filtered = filtered.filter(n => PRODUCT_LINKS[n].category.toLowerCase().includes(type));
  displayProducts(filtered);
}

// ========== STATIC PAGES ==========
function showModalContent(type) {
  closeModal();
  let title = '', content = '';
  if(type === 'about') {
    title = 'ℹ️ About S K Pharmacy';
    content = `<p><b>S K Pharmacy</b> - आपकी Health का साथी</p><p>📍 ${STORE_ADDRESS}</p><p>📞 ${STORE_PHONE}, ${STORE_PHONE2}</p><p>हम 100% Genuine Medicines Home Delivery करते हैं।</p>`;
  } else if(type === 'contact') {
    title = '📞 Contact Us';
    content = `<p><b>Phone:</b> ${STORE_PHONE}<br><b>WhatsApp:</b> ${STORE_PHONE2}</p><p><b>Address:</b> ${STORE_ADDRESS}</p><p><b>Time:</b> 9 AM - 9 PM Daily</p>`;
  } else if(type === 'privacy') {
    title = '🔒 Privacy Policy';
    content = `<p>हम आपकी Privacy का सम्मान करते हैं। आपका Data Safe है और Third Party से Share नहीं किया जाता।</p>`;
  } else if(type === 'refund') {
    title = '💰 Refund Policy';
    content = `<p>1. Damaged/Expired Product पर 7 दिन में Full Refund</p><p>2. Wrong Medicine पर 100% Refund</p><p>3. WhatsApp पर Order ID भेजें: ${STORE_PHONE}</p>`;
  }
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('settingsModal').style.display = 'block';
}

// ========== PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
  // Delivery Banner ऊपर
  const banner = document.createElement('div');
  banner.style.cssText = 'background:#232F3E;color:white;text-align:center;padding:8px;font-size:14px;';
  banner.innerHTML = `🚚 FREE Delivery in ${STORE_ADDRESS} | 📞 Call: ${STORE_PHONE}`;
  document.body.prepend(banner);

  // Cart Icon
  let cartIcon = document.createElement('div');
  cartIcon.id = 'cartIcon';
  cartIcon.innerHTML = '🛒 <span id="cart-count">0</span>';
  cartIcon.style.cssText = 'position:fixed;top:55px;left:60px;background:#25D366;color:white;padding:10px 14px;border-radius:50px;cursor:pointer;font-size:16px;z-index:999;box-shadow:0 4px 8px rgba(0,0,0,0.2);display:flex;align-items:center;gap:5px;';
  document.body.appendChild(cartIcon);
  cartIcon.onclick = function() { showCart(); document.getElementById('cartModal').style.display = 'block'; };

  loadProductsFromSheet();
  updateCartIcon();
  updateAccountUI();

  // Search - Type करते ही ऊपर आए
  let searchInput = document.getElementById('myInput');
  if(searchInput) {
    searchInput.addEventListener('input', function() {
      let searchText = searchInput.value.toLowerCase().trim();
      let filtered = Object.keys(PRODUCT_LINKS).filter(name => name.toLowerCase().includes(searchText));
      displayProducts(filtered);
    });
  }
});

function closeModal() {
  document.getElementById('settingsModal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
                          }
