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
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('settingsModal').style.display = 'none';
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

// Overlay click = close all
document.getElementById('overlay').onclick = function() {
    closeSidebar();
    closeModal();
        }
function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

}

// ========== AMAZON STYLE CART SYSTEM START ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart Icon बनाओ
let cartIcon = document.createElement('div');
cartIcon.id = 'cartIcon';
cartIcon.innerHTML = '🛒';
cartIcon.style.cssText = 'position:fixed;top:15px;left:60px;background:#25D366;color:white;padding:10px 14px;border-radius:50px;cursor:pointer;font-size:16px;z-index:999;box-shadow:0 4px 8px rgba(0,0,0,0.2);display:flex;align-items:center;gap:5px';
document.body.appendChild(cartIcon);

// Cart Modal बनाओ
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
            <button onclick="checkout()" style="width:100%;background:#25D366;color:white;padding:12px;border:none;border-radius:5px;font-size:16px;cursor:pointer;margin-top:10px;font-weight:bold">Checkout on WhatsApp</button>
        </div>
    </div>
</div>
<style>
@keyframes slideDown{from{transform:translateY(-50px);opacity:0}to{transform:translateY(0);opacity:1}}
</style>
`;
document.body.appendChild(cartModal);

// Cart Icon क्लिक
cartIcon.onclick = function() {
    showCart();
    document.querySelector('#cartModal .modal').style.display = 'block';
};

// Cart दिखाओ
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
                </div>
                <button onclick="removeFromCart('${item.name}')" style="background:#ff4444;color:white;border:none;padding:5px 10px;border-radius:3px;cursor:pointer">Remove</button>
            </div>
            `;
        }).join('');
    }
    document.getElementById('cartTotal').textContent = total;
}

// Cart बंद करो
function closeCart() {
    document.querySelector('#cartModal .modal').style.display = 'none';
}

// Cart Icon अपडेट
function updateCartIcon() {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.innerHTML = `🛒 <span style="background:#E47911;border-radius:50%;padding:2px 6px;font-size:12px">${count}</span>`;
}

// Add to Cart - सभी लिंक के साथ
function addToCart(name, price, stock, image, amazon, flipkart, meesho) {
    let item = cart.find(i => i.name === name);
    if(item) {
        if(item.quantity < stock) item.quantity++;
        else {
            alert(`Sorry! Only ${stock} items in stock`);
            return;
        }
    } else {
        cart.push({name, price, stock, image, amazon, flipkart, meesho, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    showButtons(name);
}

// Quantity बढ़ाओ
function increaseQuantity(productName) {
    let item = cart.find(i => i.name === productName);
    if(item && item.quantity < item.stock) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        showButtons(productName);
        showCart();
    } else {
        alert(`Sorry! Only ${item.stock} items in stock`);
    }
}

// Quantity घटाओ
function decreaseQuantity(productName) {
    let item = cart.find(i => i.name === productName);
    if(item) {
        item.quantity--;
        if(item.quantity === 0) {
            cart = cart.filter(i => i.name !== productName);
            resetButton(productName);
        } else {
            showButtons(productName);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        showCart();
    }
}

// Cart से हटाओ
function removeFromCart(productName) {
    cart = cart.filter(i => i.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    showCart();
    resetButton(productName);
}

// Amazon स्टाइल बटन दिखाओ - सभी लिंक के साथ
function showButtons(productName) {
    let item = cart.find(i => i.name === productName);
    if(!item) return;
    
    let amazonBtn = item.amazon ? `<a href="${item.amazon}" target="_blank" style="background:#FF9900;color:white;padding:6px 10px;border-radius:4px;text-decoration:none;font-size:12px">Amazon</a>` : '';
    let primeBtn = item.amazon ? `<a href="https://www.amazon.in/prime" target="_blank" style="background:#00A8E1;color:white;padding:6px 10px;border-radius:4px;text-decoration:none;font-size:12px">Join Prime</a>` : '';
    let flipkartBtn = item.flipkart ? `<a href="${item.flipkart}" target="_blank" style="background:#2874F0;color:white;padding:6px 10px;border-radius:4px;text-decoration:none;font-size:12px">Flipkart</a>` : '';
    let meeshoBtn = item.meesho ? `<a href="${item.meesho}" target="_blank" style="background:#F43397;color:white;padding:6px 10px;border-radius:4px;text-decoration:none;font-size:12px">Meesho</a>` : '';
    
    let html = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;border:2px solid #FF9900;border-radius:8px;background:#FFF9E6;flex-wrap:wrap">
            <button onclick="decreaseQuantity('${productName}')" style="background:#E47911;color:white;border:none;width:30px;height:30px;border-radius:50%;font-size:18px;cursor:pointer">🗑️</button>
            <span style="font-weight:bold">${item.quantity} in cart</span>
            <button onclick="increaseQuantity('${productName}')" style="background:#E47911;color:white;border:none;width:30px;height:30px;border-radius:50%;font-size:18px;cursor:pointer">+</button>
            ${amazonBtn}
            ${primeBtn}
            ${flipkartBtn}
            ${meeshoBtn}
        </div>
    `;
    
    document.querySelectorAll('button').forEach(btn => {
        if(btn.onclick && btn.onclick.toString().includes(productName)) {
            btn.outerHTML = html;
        }
    });
}

// वापस Add to Cart बटन लाओ
function resetButton(productName) {
    location.reload();
}

// Checkout WhatsApp
function checkout() {
    if(cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    let message = 'Hello S K Pharmacy! I want to order:\n\n';
    let total = 0;
    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    message += `\nTotal: ₹${total}\n\nPlease confirm my order.`;
    window.open(`https://wa.me/919117812690?text=${encodeURIComponent(message)}`, '_blank');
}

// Auto Setup - सभी data-attributes पढ़ेगा
function autoSetupButtons() {
    document.querySelectorAll('button').forEach(btn => {
        if(btn.textContent.includes('Add to Cart') || btn.textContent.includes('Buy Now')) {
            let name = btn.parentElement.querySelector('h3, h4, .product-name')?.textContent || 'Product';
            let price = parseInt(btn.parentElement.querySelector('.price, .product-price')?.textContent.replace(/[^0-9]/g, '')) || 0;
            let stock = parseInt(btn.getAttribute('data-stock')) || 999;
            let image = btn.parentElement.querySelector('img')?.src || '';
            
            let amazon = btn.getAttribute('data-amazon') || '';
            let flipkart = btn.getAttribute('data-flipkart') || '';
            let meesho = btn.getAttribute('data-meesho') || '';
            
            let buttonHTML = `
                <button onclick="addToCart('${name}', ${price}, ${stock}, '${image}', '${amazon}', '${flipkart}', '${meesho}')" 
                    style="width:100%;background:#FF9900;color:white;padding:10px;border:none;border-radius:5px;cursor:pointer;font-weight:bold">
                    🛒 Add to Cart
                </button>
            `;
            btn.outerHTML = buttonHTML;
        }
    });
}

// Page Load पर चलाओ
window.onload = function() {
    updateCartIcon();
    autoSetupButtons();
    
    // पुराने cart items के लिए बटन दिखाओ
    cart.forEach(item => showButtons(item.name));
};

// Modal बाहर क्लिक पर बंद
window.onclick = function(event) {
    if(event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};
// ========== AMAZON STYLE CART SYSTEM END ==========
