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
// ========== काउंट ठीक करने का कोड ==========
function updateCartCountFix() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let countEl = document.getElementById('cartCount');
if(countEl) {
    let totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    countEl.innerText = totalQty;
}


let originalAddToCart = window.addToCart;
window.addToCart = function(name, price) {
    if(originalAddToCart) originalAddToCart(name, price);
    updateCartCountFix();
}

document.addEventListener('DOMContentLoaded', updateCartCountFix);
updateCartCountFix();
// ========== AMAZON STYLE CART BUTTON ==========
function updateProductButton(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(p => p.name === productName);
    let allBtns = document.querySelectorAll('button');
    
    allBtns.forEach(btn => {
        if(btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${productName}'`)) {
            if(item) {
                // Cart में है तो + - वाला बटन दिखा
                btn.outerHTML = `
                <div style="display:flex; border:2px solid #FFD814; border-radius:8px; overflow:hidden; width:140px;">
                    <button onclick="removeFromCart('${productName}')" style="background:#fff; border:none; padding:8px 12px; cursor:pointer; font-size:18px;">🗑️</button>
                    <div style="flex:1; background:#fff; text-align:center; padding:8px 0; font-weight:600;">${item.qty} in cart</div>
                    <button onclick="addToCart('${productName}', ${item.price})" style="background:#fff; border:none; padding:8px 12px; cursor:pointer; font-size:18px;">+</button>
                </div>`;
            } else {
                // Cart में नहीं है तो Add to Cart दिखा
                btn.outerHTML = `<button onclick="addToCart('${productName}', ${btn.dataset.price})" style="background:#FFD814; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer;">Add to Cart</button>`;
            }
        }
    });
}

// Cart से कम करने का फंक्शन
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(p => p.name === productName);
    if(item) {
        if(item.qty > 1) {
            item.qty--;
        } else {
            cart = cart.filter(p => p.name !== productName);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCountFix();
        updateProductButton(productName);
    }
}

// पुराना addToCart अपडेट करो
let originalAddToCart2 = window.addToCart;
window.addToCart = function(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(p => p.name === name);
    if(item) {
        item.qty++;
    } else {
        cart.push({name: name, price: price, qty: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCountFix();
    updateProductButton(name);
}

// पेज लोड पे सब बटन चेक करो
document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => updateProductButton(item.name));
});
