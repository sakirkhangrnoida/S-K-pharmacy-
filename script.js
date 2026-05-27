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
// ========== AUTO SHOPPING CART - बस पेस्ट कर दे ==========
(function() {
    // 1. Cart का HTML ऑटो बना दो
    if (!document.getElementById('cartIcon')) {
        let cartHTML = `
        <div id="cartIcon" onclick="openCartAuto()">
            🛒 <span id="cartCount">0</span>
        </div>
        
        <div id="cartModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeCartAuto()">&times;</span>
                <h2>Your Cart</h2>
                <div id="cartItems"></div>
                <div id="cartTotal">
                    <h3>Total: ₹<span id="totalAmount">0</span></h3>
                </div>
                <button id="checkoutBtn" onclick="checkoutWhatsAppAuto()">Checkout on WhatsApp</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    // 2. Cart की CSS ऑटो डाल दो
    let cartCSS = `
    #cartIcon{position:fixed;top:20px;right:20px;background:#25D366;color:white;padding:12px 16px;border-radius:50px;cursor:pointer;font-size:18px;z-index:999;box-shadow:0 4px 8px rgba(0,0,0,0.2)}
    #cartCount{background:red;border-radius:50%;padding:2px 6px;font-size:12px;margin-left:4px}
    #cartItems{max-height:300px;overflow-y:auto;margin:20px 0}
    .cart-item{display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #ddd}
    .cart-item button{background:red;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer}
    #checkoutBtn{width:100%;padding:15px;background:#25D366;color:white;border:none;border-radius:8px;font-size:16px;cursor:pointer;margin-top:10px}
    `;
    let styleSheet = document.createElement("style");
    styleSheet.innerText = cartCSS;
    document.head.appendChild(styleSheet);

    // 3. Cart का दिमाग
    let cart = JSON.parse(localStorage.getItem('cartAuto')) || [];
    
    function updateCartCount() {
        document.getElementById('cartCount').innerText = cart.length;
    }

    window.addToCartAuto = function(name, price) {
        cart.push({name: name, price: parseInt(price)});
        localStorage.setItem('cartAuto', JSON.stringify(cart));
        updateCartCount();
        alert(name + ' added to cart!');
    }

    window.openCartAuto = function() {
        let cartDiv = document.getElementById('cartItems');
        cartDiv.innerHTML = '';
        let total = 0;
        
        if(cart.length === 0) {
            cartDiv.innerHTML = '<p>Cart is empty</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartDiv.innerHTML += `
                    <div class="cart-item">
                        <span>${item.name} - ₹${item.price}</span>
                        <button onclick="removeFromCartAuto(${index})">Remove</button>
                    </div>
                `;
            });
        }
        
        document.getElementById('totalAmount').innerText = total;
        document.getElementById('cartModal').style.display = 'block';
    }

    window.closeCartAuto = function() {
        document.getElementById('cartModal').style.display = 'none';
    }

    window.removeFromCartAuto = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cartAuto', JSON.stringify(cart));
        updateCartCount();
        openCartAuto();
    }

    window.checkoutWhatsAppAuto = function() {
        if(cart.length === 0) {
            alert('Cart is empty!');
            return;
        }
        
        let phone = "919258751739"; // अपना नंबर डाल दे
        let message = `Hi S K Pharmacy!%0A%0AMy Order:%0A`;
        let total = 0;
        
        cart.forEach((item, i) => {
            message += `${i+1}. ${item.name} - ₹${item.price}%0A`;
            total += item.price;
        });
        
        message += `%0A*Total: ₹${total}*%0A%0APlease confirm my order.`;
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        
        cart = [];
        localStorage.removeItem('cartAuto');
        updateCartCount();
        closeCartAuto();
    }

    // 4. सारे प्रोडक्ट कार्ड को ऑटो पकड़ो और बटन बदल दो
    function autoSetupButtons() {
        // तेरी साइट के हर प्रोडक्ट कार्ड को ढूंढो
        document.querySelectorAll('.product-card, .card, .product').forEach(card => {
            let nameEl = card.querySelector('h3, h4, .product-name, .product-title');
            let priceEl = card.querySelector('.price, .product-price');
            let btn = card.querySelector('button');
            
            if(nameEl && priceEl && btn) {
                let name = nameEl.innerText.trim();
                let price = priceEl.innerText.replace(/[^0-9]/g, ''); // सिर्फ नंबर निकालो
                
                // बटन का टेक्स्ट और काम बदल दो
                btn.innerText = 'Add to Cart';
                btn.setAttribute('onclick', `addToCartAuto('${name}', '${price}')`);
            }
        });
    }

    // Page लोड होते ही सब सेट कर दो
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoSetupButtons);
    } else {
        autoSetupButtons();
    }
    
    updateCartCount();
})();
