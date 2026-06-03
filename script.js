// ========== SIDEBAR FUNCTIONS ==========
function openSidebar() {
    document.getElementById('sidebar').style.left = '0px';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    document.getElementById('sidebar').style.left = '-300px';
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ========== MODAL FUNCTIONS ==========
function openModal(type) {
    closeSidebar();
    let modal = document.getElementById('settingsModal');
    let overlay = document.getElementById('overlay');
    let title = document.getElementById('modalTitle');
    let content = document.getElementById('modalContent');
    modal.style.display = 'block';
    overlay.style.display = 'block';
    if(type === 'account') {
        title.innerText = '👤 My Account';
        content.innerHTML = '<p><b>Welcome!</b></p><p><b>Mobile:</b> 9258751739</p><p><b>Email:</b> sakirkhangrnoida@gmail.com</p>';
    } else if(type === 'location') {
        title.innerText = '📍 Our Location';
        content.innerHTML = '<p><b>S K Pharmacy</b><br>Greater Noida, UP<br>Home Delivery Available</p>';
    } else if(type === 'privacy') {
        title.innerText = '🔒 Privacy Policy';
        content.innerHTML = '<p>आपका डेटा 100% सुरक्षित है। हम किसी से शेयर नहीं करते।</p>';
    } else if(type === 'terms') {
        title.innerText = '📄 Terms & Conditions';
        content.innerHTML = '<p>1. दवाइयाँ डॉक्टर की सलाह से लें<br>2. होम डिलीवरी 2-3 घंटे में</p>';
    }
}

function closeModal() {
    document.getElementById('settingsModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ========== ACCOUNT RELATED FUNCTIONS ==========
function showAccountDetails() {
    let content = document.getElementById('modalContent');
    try {
        let userData = localStorage.getItem('userData');
        if(userData) {
            let user = JSON.parse(userData);
            content.innerHTML = `
                <div style="text-align:center; margin-bottom:20px;">
                    <img src="https://ui-avatars.com/api/?name=${user.name || 'User'}&background=random" style="width:80px; height:80px; border-radius:50%;">
                    <h3 style="margin:10px 0 5px 0;">${user.name || 'User'}</h3>
                    <p style="color:#666; margin:0;">${user.email || 'No email'}</p>
                </div>
                <div style="background:#f8f9fa; padding:15px; border-radius:8px; line-height:1.8;">
                    <p><b>Name:</b> ${user.name || 'Not set'}</p>
                    <p><b>Email:</b> ${user.email || 'Not set'}</p>
                    <p><b>Mobile:</b> ${user.mobile || 'Not added'}</p>
                    <p><b>Address:</b> ${user.address || 'Not added'}</p>
                    <p><b>Pin Code:</b> ${user.pincode || 'Not added'}</p>
                </div>
                <button onclick="openModal('edit-profile')" style="width:100%; margin-top:15px; padding:12px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer;">Edit Profile</button>
            `;
        } else {
            content.innerHTML = `
                <p style="text-align:center; color:#666;">You are not logged in.</p>
                <button onclick="openModal('login')" style="width:100%; margin-top:15px; padding:12px; background:#28a745; color:white; border:none; border-radius:8px; cursor:pointer;">Login Now</button>
            `;
        }
    } catch(e) {
        content.innerHTML = '<p style="text-align:center; color:red;">Error loading data.</p>';
    }
}

function showEditProfile() {
    let content = document.getElementById('modalContent');
    let user = {};
    try {
        user = JSON.parse(localStorage.getItem('userData')) || {};
    } catch(e) {}
    content.innerHTML = `
        <input type="text" id="editName" placeholder="Name" value="${user.name || ''}" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <input type="email" id="editEmail" placeholder="Email" value="${user.email || ''}" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <input type="tel" id="editMobile" placeholder="Mobile" value="${user.mobile || ''}" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <textarea id="editAddress" placeholder="Address" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px; height:60px;">${user.address || ''}</textarea>
        <input type="text" id="editPincode" placeholder="Pin Code" value="${user.pincode || ''}" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <button onclick="saveProfile()" style="width:100%; margin-top:15px; padding:12px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer;">Save Changes</button>
    `;
}

function saveProfile() {
    let user = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        mobile: document.getElementById('editMobile').value,
        address: document.getElementById('editAddress').value,
        pincode: document.getElementById('editPincode').value
    };
    localStorage.setItem('userData', JSON.stringify(user));
    alert('Profile Updated!');
    openModal('account');
}

function showLoginForm() {
    let content = document.getElementById('modalContent');
    content.innerHTML = `
        <input type="email" id="loginEmail" placeholder="Email" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <input type="password" id="loginPassword" placeholder="Password" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <button onclick="doLogin()" style="width:100%; margin-top:15px; padding:12px; background:#28a745; color:white; border:none; border-radius:8px; cursor:pointer;">Login</button>
    `;
}

function doLogin() {
    let email = document.getElementById('loginEmail').value;
    let user = { name: 'Demo User', email: email, mobile: '', address: '', pincode: '' };
    localStorage.setItem('userData', JSON.stringify(user));
    alert('Login Successful!');
    openModal('account');
}

function showPasswordForm() {
    let content = document.getElementById('modalContent');
    content.innerHTML = `
        <input type="password" placeholder="Old Password" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <input type="password" placeholder="New Password" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <input type="password" placeholder="Confirm Password" style="width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:5px;">
        <button onclick="alert('Password Changed!')" style="width:100%; margin-top:15px; padding:12px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer;">Update Password</button>
    `;
}

function showAddress() {
    let user = JSON.parse(localStorage.getItem('userData') || '{}');
    document.getElementById('modalContent').innerHTML = `
        <p><b>Saved Address:</b></p>
        <p>${user.address || 'No address added'}</p>
        <p><b>Pin Code:</b> ${user.pincode || 'Not set'}</p>
        <button onclick="openModal('edit-profile')" style="width:100%; margin-top:15px; padding:12px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer;">Edit Address</button>
    `;
}

function showMobileNumber() {
    let user = JSON.parse(localStorage.getItem('userData') || '{}');
    document.getElementById('modalContent').innerHTML = `
        <p><b>Mobile Number:</b> ${user.mobile || 'Not added'}</p>
        <button onclick="openModal('edit-profile')" style="width:100%; margin-top:15px; padding:12px; background:#007bff; color:white; border:none; border-radius:8px; cursor:pointer;">Update Number</button>
    `;
}

function showSettings() {
    document.getElementById('modalContent').innerHTML = `
        <div onclick="openModal('password')" style="padding:12px; border-bottom:1px solid #eee; cursor:pointer;">🔒 Change Password</div>
        <div onclick="openModal('edit-profile')" style="padding:12px; border-bottom:1px solid #eee; cursor:pointer;">✏️ Edit Profile</div>
        <div onclick="alert('Logged Out!'); localStorage.removeItem('userData'); closeModal();" style="padding:12px; color:red; cursor:pointer;">🚪 Logout</div>
    `;
}

document.getElementById('overlay').onclick = function() {
    closeSidebar();
    closeModal();
}

function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
}

// ========== PRODUCTS + SEARCH + CART SYSTEM ==========
const PRODUCT_LINKS = {
    "Kesh King Ayurvedic Oil": {
        stock: 10, cod: true, price: 299, mrp: 349,
        desc: "Kesh King Ayurvedic Oil एक आयुर्वेदिक हेयर ऑयल है जो 21 जड़ी-बूटियों से बना है। यह बालों का झड़ना कम करता है, डैंड्रफ हटाता है और नए बाल उगाने में मदद करता है। 100ml की बोतल।",
        image: "kesh-king.jpg", amazon: "https://share.google/nrshbLeq9nIC6AGDN", flipkart: "", meesho: "https://www.meesho.com/s/p/c7vcmm"
    },
    "Himalaya Hair Zone Solution": {
        stock: 25, cod: true, price: 479, mrp: 550,
        desc: "Himalaya Hair Zone Solution में Minoxidil 5% है जो क्लिनिकली प्रूवन है बाल दोबारा उगाने के लिए। गंजेपन और पतले बालों के लिए बेस्ट। 60ml की बोतल।",
        image: "himalaya-hair-zone.jpg", amazon: "", flipkart: "https://dl.flipkart.com/dl/himalaya-hair-zone-solution/p/itm089a2160a028e?pid=AYDGBPYVGERKGMFV", meesho: ""
    },
    "Mamaearth Onion Hair Oil": {
        stock: 15, cod: false, price: 399, mrp: 499,
        desc: "Mamaearth Onion Hair Oil प्याज के रस और रेडेंसिल से बना है। बालों का टूटना रोकता है और ग्रोथ बढ़ाता है। 100% नेचुरल, सल्फेट-पैराबेन फ्री। 250ml की बोतल।",
        image: "mamaearth-onion.jpg", amazon: "https://amazon.in/xxx", flipkart: "https://flipkart.com/xxx", meesho: "https://meesho.com/xxx"
    },
    "Indulekha Bringha Oil": {
        stock: 8, cod: true, price: 432, mrp: 485,
        desc: "Indulekha Bringha Oil भृंगराज, आंवला और नीम से बना आयुर्वेदिक तेल है। सेल्फी ब्रश के साथ आता है। बाल काले, घने और मजबूत बनाता है। 100ml की बोतल।",
        image: "indulekha.jpg", amazon: "", flipkart: "", meesho: ""
    },
    "WOW Skin Science Hair Oil": {
        stock: 20, cod: true, price: 349, mrp: 399,
        desc: "WOW Onion Black Seed Hair Oil प्याज, कलोंजी और 8 नेचुरल ऑयल का ब्लेंड है। बालों को जड़ से पोषण देता है। 200ml की बोतल। केमिकल फ्री।",
        image: "wow-oil.jpg", amazon: "", flipkart: "", meesho: ""
    },
    "crocin 650": {
        stock: 50, cod: true, price: 25, mrp: 30,
        desc: "Crocin 650 बुखार और दर्द में तुरंत आराम। Paracetamol 650mg। 15 Tablets। डॉक्टर की सलाह से लें।",
        image: "https://i.ibb.co/0j1XqGp/crocin.jpg", amazon: "", flipkart: "", meesho: ""
    }
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];
// ========== SEARCH + DISPLAY PRODUCTS - myInput वाला ==========
document.addEventListener('DOMContentLoaded', function() {
    let allProducts = Object.keys(PRODUCT_LINKS);
    displayProducts(allProducts);
    updateCartIcon();

    // यहाँ myInput Use किया है तेरे लिए
    let searchInput = document.getElementById('myInput');
    if(searchInput) {
        searchInput.addEventListener('input', function() {
            let searchText = searchInput.value.toLowerCase().trim();
            let filteredProducts = allProducts.filter(name => {
                return name.toLowerCase().includes(searchText);
            });
            displayProducts(filteredProducts);
        });
    }
});

function displayProducts(productArray) {
    let productContainer = document.getElementById('productContainer');
    if(!productContainer) return;

    if(productArray.length === 0) {
        productContainer.innerHTML = '<p style="text-align:center; padding:20px;">No products found</p>';
        return;
    }

    productContainer.innerHTML = productArray.map(name => {
        let p = PRODUCT_LINKS[name];
        let discount = Math.round((p.mrp - p.price) / p.mrp * 100);
        return `
        <div class="product-card" onclick="showProductDetail('${name}')" style="border:1px solid #eee; padding:15px; border-radius:8px; cursor:pointer; margin:10px; width:200px; display:inline-block; vertical-align:top;">
            <img src="${p.image}" style="width:100%; height:180px; object-fit:cover; border-radius:5px;">
            <h3 style="margin:10px 0 5px 0; font-size:16px;">${name}</h3>
            <div>
                <span style="font-size:18px; font-weight:bold; color:#E47911;">₹${p.price}</span>
                <span style="text-decoration:line-through; color:#888; margin-left:8px; font-size:14px;">₹${p.mrp}</span>
                <span style="color:#388E3C; margin-left:8px; font-weight:bold; font-size:14px;">${discount}% off</span>
            </div>
            ${p.cod? '<div style="color:#388E3C; font-size:12px; font-weight:bold; margin-top:5px;">✓ COD Available</div>' : ''}
        </div>
        `;
    }).join('');
}

// Cart Icon
let cartIcon = document.createElement('div');
cartIcon.id = 'cartIcon';
cartIcon.innerHTML = '🛒';
cartIcon.style.cssText = 'position:fixed;top:15px;left:60px;background:#25D366;color:white;padding:10px 14px;border-radius:50px;cursor:pointer;font-size:16px;z-index:999;box-shadow:0 4px 8px rgba(0,0,0,0.2);display:flex;align-items:center;gap:5px';
document.body.appendChild(cartIcon);

// Product Detail Modal
let productModal = document.createElement('div');
productModal.id = 'productModal';
productModal.innerHTML = `
<div class="modal" style="display:none;position:fixed;z-index:10000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.7);overflow:auto">
    <div class="modal-content" style="background:#fff;margin:30px auto;padding:20px;border-radius:10px;width:90%;max-width:600px;position:relative">
        <span onclick="closeProductModal()" style="position:absolute;top:10px;right:15px;font-size:28px;cursor:pointer;color:#aaa">&times;</span>
        <div id="productDetailContent"></div>
    </div>
</div>`;
document.body.appendChild(productModal);

// Cart Modal
let cartModal = document.createElement('div');
cartModal.id = 'cartModal';
cartModal.style.display = 'none';
cartModal.innerHTML = `
<div class="modal" style="display:none;position:fixed;z-index:9999;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.7);overflow:auto">
    <div class="modal-content" style="background:#fff;margin:50px auto;padding:20px;border-radius:10px;width:90%;max-width:500px;position:relative;animation:slideDown 0.3s">
        <span onclick="closeCart()" style="position:absolute;top:10px;right:15px;font-size:28px;cursor:pointer;color:#aaa">&times;</span>
        <h2>Your Cart</h2>
        <div id="cartItems"></div>
        <div style="border-top:2px solid #eee;margin-top:15px;padding-top:15px">
            <h3>Total: ₹<span id="cartTotal">0</span></h3>
            <div style="margin:10px 0">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                    <input type="checkbox" id="codCheckbox" style="width:18px;height:18px">
                    <span>Cash on Delivery</span>
                </label>
            </div>
            <button onclick="checkout()" style="width:100%;background:#25D366;color:white;padding:12px;border:none;border-radius:5px;font-size:16px;cursor:pointer;margin-top:10px;font-weight:bold">Checkout on WhatsApp</button>
        </div>
    </div>
</div>
<style>
@keyframes slideDown{from{transform:translateY(-50px);opacity:0}to{transform:translateY(0);opacity:1}}
.product-card img,.product-card h3{cursor:pointer}
</style>
`;
document.body.appendChild(cartModal);

cartIcon.onclick = function() {
    showCart();
    document.querySelector('#cartModal.modal').style.display = 'block';
};

function showProductDetail(name) {
    let p = PRODUCT_LINKS[name];
    if(!p) return;

    let discount = Math.round((p.mrp - p.price) / p.mrp * 100);
    let codBadge = p.cod? `<span style="background:#388E3C;color:white;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:bold;margin-left:10px">COD Available</span>` : '';

    let html = `
        <div style="display:flex;gap:20px;flex-wrap:wrap">
            <img src="${p.image}" style="width:250px;height:250px;object-fit:cover;border-radius:8px;border:1px solid #eee">
            <div style="flex:1;min-width:250px">
                <h2 style="margin:0 0 10px 0">${name} ${codBadge}</h2>
                <div style="margin:10px 0">
                    <span style="font-size:24px;font-weight:bold;color:#E47911">₹${p.price}</span>
                    <span style="text-decoration:line-through;color:#888;margin-left:10px">₹${p.mrp}</span>
                    <span style="color:#388E3C;margin-left:10px;font-weight:bold">${discount}% off</span>
                </div>
                <p style="color:#555;line-height:1.6;font-size:14px">${p.desc}</p>
                <p style="color:${p.stock > 5? '#388E3C' : '#ff4444'};font-weight:bold;margin-top:15px">
                    ${p.stock > 0? `Only ${p.stock} left in stock` : 'Out of Stock'}
                </p>
                <div id="modalAddToCartBtn" style="margin-top:20px"></div>
            </div>
        </div>
    `;

    document.getElementById('productDetailContent').innerHTML = html;
    document.querySelector('#productModal.modal').style.display = 'block';

    let modalBtn = `
        <button onclick="addToCart('${name}', ${p.price}, ${p.stock}, '${p.image}', '${p.amazon}', '${p.flipkart}', '${p.meesho}', ${p.cod});closeProductModal()"
            style="width:100%;background:#FF9900;color:white;padding:12px;border:none;border-radius:5px;cursor:pointer;font-weight:bold;font-size:16px">
            🛒 Add to Cart
        </button>
    `;
    document.getElementById('modalAddToCartBtn').innerHTML = modalBtn;
}

function closeProductModal() {
    document.querySelector('#productModal.modal').style.display = 'none';
}

function showCart() {
    let itemsDiv = document.getElementById('cartItems');
    let total = 0;
    if(cart.length === 0) {
        itemsDiv.innerHTML = '<p style="text-align:center;color:#888;padding:20px">Your cart is empty</p>';
    } else {
        itemsDiv.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
            <div style="display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid #eee">
                <img src="${item.image}" style="width:60px;height:60px;object-fit:cover;border-radius:5px">
                <div style="flex:1">
                    <div style="font-weight:bold">${item.name}</div>
                    <div style="color:#E47911">₹${item.price} x ${item.quantity}</div>
                    ${item.cod? '<div style="color:#388E3C;font-size:12px;font-weight:bold">✓ COD Available</div>' : ''}
                </div>
                <button onclick="removeFromCart('${item.name}')" style="background:#ff4444;color:white;border:none;padding:5px 10px;border-radius:3px;cursor:pointer">Remove</button>
            </div>
            `;
        }).join('');
    }
    document.getElementById('cartTotal').textContent = total;
}

function closeCart() {
    document.querySelector('#cartModal.modal').style.display = 'none';
}

function updateCartIcon() {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.innerHTML = `🛒 <span style="background:#E47911;border-radius:50%;padding:2px 6px;font-size:12px">${count}</span>`;
}

function addToCart(name, price, stock, image, amazon, flipkart, meesho, cod) {
    let item = cart.find(i => i.name === name);
    if(item) {
        if(item.quantity < stock) item.quantity++;
        else {
            alert(`Sorry! Only ${stock} items in stock`);
            return;
        }
    } else {
        cart.push({name, price, stock, image, amazon, flipkart, meesho, cod, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function removeFromCart(productName) {
    cart = cart.filter(i => i.name!== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    showCart();
}

function checkout() {
    if(cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    let message = 'Hello! I want to order:\n\n';
    let total = 0;
    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    message += `\nTotal: ₹${total}`;
    let cod = document.getElementById('codCheckbox').checked;
    if(cod) message += '\nPayment: Cash on Delivery';

    let whatsappURL = `https://wa.me/919258751739?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
        }
function filterProducts() {
  let input = document.getElementById('myInput');
  let filter = input.value.toUpperCase();
  let productCards = document.querySelectorAll('.product-card,.card,.product');
  
  for (let i = 0; i < productCards.length; i++) {
    let card = productCards[i];
    let txtValue = card.textContent || card.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
}
