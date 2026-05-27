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
// ========= AUTO SHOPPING CART + AMAZON BUTTON - FIXED =========
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
   .modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5)}
   .modal-content{background:#fff;margin:5% auto;padding:20px;border-radius:10px;width:90%;max-width:500px;position:relative}
   .cart-item{display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #ddd}
   .cart-item button{background:red;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer}
    #checkoutBtn{width:100%;padding:15px;background:#25D366;color:white;border:none;border-radius:8px;font-size:16px;cursor:pointer;margin-top:10px}
   .qty-controls{display:flex;border:2px solid #ff9900;border-radius:8px;overflow:hidden;height:40px;max-width:200px;margin-top:8px}
   .qty-controls button{background:#ff9900;color:#fff;border:none;width:40px;font-size:20px;cursor:pointer}
   .qty-controls div{flex:1;background:#fff;text-align:center;line-height:40px;font-weight:bold}
   .external-links{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap}
   .external-links a{padding:8px 12px;border-radius:6px;text-decoration:none;font-size:13px;color:#fff}
   .prime-link{display:block;margin-top:8px;color:#007185;font-size:13px;text-decoration:none}
    `;
    let styleSheet = document.createElement("style");
    styleSheet.innerText = cartCSS;
    document.head.appendChild(styleSheet);

    // 3. Cart का दिमाग + Qty + Stock
    let cart = JSON.parse(localStorage.getItem('cartAuto')) || [];

    function updateCartCount() {
        let totalQty = cart.reduce(function(sum, item) {
            return sum + (item.qty || 1);
        }, 0);
        document.getElementById('cartCount').innerText = totalQty;
    }

    function updateProductButton(productName, price, stock) {
        let item = cart.find(function(p) { return p.name === productName; });
        let allBtns = document.querySelectorAll('[data-product="' + productName + '"]');

        allBtns.forEach(function(btn) {
            let container = btn.parentNode;
            let existingQty = container.querySelector('.qty-controls');
            if(existingQty) existingQty.remove();

            if(item) {
                btn.style.display = 'none';
                let qtyDiv = document.createElement('div');
                qtyDiv.className = 'qty-controls';
                qtyDiv.innerHTML = '<button onclick="removeFromCartAuto(\'' + productName + '\')">🗑️</button><div>' + item.qty + ' in cart</div><button onclick="addToCartAuto(\'' + productName + '\', ' + price + ', ' + stock + ')">+</button>';
                container.appendChild(qtyDiv);
            } else {
                btn.style.display = 'block';
            }
        });
    }

    window.addToCartAuto = function(name, price, stock) {
        stock = parseInt(stock) || 999;
        let item = cart.find(function(p) { return p.name === name; });

        if(item) {
            if(item.qty < stock) {
                item.qty++;
            } else {
                alert('Sorry, only ' + stock + ' items in stock!');
                return;
            }
        } else {
            cart.push({name: name, price: parseInt(price), qty: 1, stock: stock});
        }

        localStorage.setItem('cartAuto', JSON.stringify(cart));
        updateCartCount();
        updateProductButton(name, price, stock);
    }

    window.removeFromCartAuto = function(productName) {
        let item = cart.find(function(p) { return p.name === productName; });
        if(item) {
            if(item.qty > 1) {
                item.qty--;
            } else {
                cart = cart.filter(function(p) { return p.name!== productName; });
            }
        }
        localStorage.setItem('cartAuto', JSON.stringify(cart));
        updateCartCount();
        updateProductButton(productName, item? item.price : 0, item? item.stock : 999);
    }

    window.openCartAuto = function() {
        let cartDiv = document.getElementById('cartItems');
        cartDiv.innerHTML = '';
        let total = 0;

        if(cart.length === 0) {
            cartDiv.innerHTML = '<p>Cart is empty</p>';
        } else {
            cart.forEach(function(item, index) {
                total += item.price * item.qty;
                cartDiv.innerHTML += '<div class="cart-item"><span>' + item.name + ' - ₹' + item.price + ' x ' + item.qty + '</span><button onclick="removeItemCompletely(' + index + ')">Remove</button></div>';
            });
        }

        document.getElementById('totalAmount').innerText = total;
        document.getElementById('cartModal').style.display = 'block';
    }

    window.closeCartAuto = function() {
        document.getElementById('cartModal').style.display = 'none';
    }

    window.removeItemCompletely = function(index) {
        let removedItem = cart[index];
        cart.splice(index, 1);
        localStorage.setItem('cartAuto', JSON.stringify(cart));
        updateCartCount();
        openCartAuto();
        updateProductButton(removedItem.name, removedItem.price, removedItem.stock);
    }

    window.checkoutWhatsAppAuto = function() {
        if(cart.length === 0) {
            alert('Cart is empty!');
            return;
        }

        let phone = "919258751739";
        let message = `Hi S K Pharmacy!%0A%0AMy Order:%0A`;
        let total = 0;

        cart.forEach(function(item, i) {
            message += `${i+1}. ${item.name} - ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}%0A`;
            total += item.price * item.qty;
        });

        message += `%0A*Total: ₹${total}*%0A%0APlease confirm my order.`;
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

        cart = [];
        localStorage.removeItem('cartAuto');
        updateCartCount();
        closeCartAuto();
        location.reload();
    }

    // 4. प्रोडक्ट कार्ड ऑटो सेटअप + Amazon/Flipkart/Meesho लिंक
    function autoSetupButtons() {
        document.querySelectorAll('.product-card,.card,.product').forEach(function(card) {
            let nameEl = card.querySelector('h3, h4,.product-name,.product-title');
            let priceEl = card.querySelector('.price,.product-price');
            let btn = card.querySelector('button');

            if(nameEl && priceEl && btn &&!btn.getAttribute('data-setup')) {
                let name = nameEl.innerText.trim();
                let price = priceEl.innerText.replace(/[^0-9]/g, '');
                let stock = btn.getAttribute('data-stock') || 999;
                let amazonLink = btn.getAttribute('data-amazon') || '';
                let flipkartLink = btn.getAttribute('data-flipkart') || '';
                let meeshoLink = btn.getAttribute('data-meesho') || '';

                btn.setAttribute('data-product', name);
                btn.setAttribute('data-setup', 'true');
                btn.innerText = 'Add to Cart';
                btn.style.cssText = 'background:#ff9900;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;width:100%';
                btn.setAttribute('onclick', `addToCartAuto('${name}', '${price}', '${stock}')`);

                let linksHTML = '<div class="external-links">';
                if(amazonLink) linksHTML += `<a href="${amazonLink}" target="_blank" style="background:#232F3E">Buy on Amazon</a>`;
                if(flipkartLink) linksHTML += `<a href="${flipkartLink}" target="_blank" style="background:#2874F0">Buy on Flipkart</a>`;
                if(meeshoLink) linksHTML += `<a href="${meeshoLink}" target="_blank" style="background:#F43397">Buy on Meesho</a>`;
                linksHTML += '</div>';

                if(amazonLink || flipkartLink || meeshoLink) {
                    btn.insertAdjacentHTML('afterend', linksHTML + '<a href="https://www.amazon.in/amazonprime" target="_blank" class="prime-link">👑 Join Amazon Prime for Free Delivery</a>');
                }

                updateProductButton(name, price, stock);
            }
        });
    }

    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoSetupButtons);
    } else {
        autoSetupButtons();
    }

    updateCartCount();
})();
