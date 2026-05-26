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
        title.innerText = 'My Account';
        showAccountDetails();
        
    } else if(type === 'edit-profile') {
        title.innerText = 'Edit Profile';
        showEditProfile();
        
    } else if(type === 'login') {
        title.innerText = 'Login';
        showLoginForm();
        
    } else if(type === 'password') {
        title.innerText = 'Change Password';
        showPasswordForm();
        
    } else if(type === 'address') {
        title.innerText = 'Address';
        showAddress();
        
    } else if(type === 'mobile') {
        title.innerText = 'Mobile Number';
        showMobileNumber();
        
    } else if(type === 'help') {
        title.innerText = 'Help & Support';
        content.innerHTML = `
            <p><b>Email:</b> support@example.com</p>
            <p><b>Phone:</b> +91 9999999999</p>
            <p><b>Timing:</b> 9 AM - 6 PM</p>
        `;
        
    } else if(type === 'location') {
        title.innerText = 'Our Location';
        content.innerHTML = `
            <p><b>Address:</b> Greater Noida, UP</p>
            <div style="margin-top:15px;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.48129412968!2d77.06889969016521!3d28.52728034379184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin" width="100%" height="200" style="border:0; border-radius:8px;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        `;
        
    } else if(type === 'privacy') {
        title.innerText = 'Privacy Policy';
        content.innerHTML = `
            <p>We respect your privacy. Your data is encrypted and secure.</p>
            <p>We never share your personal information with third parties.</p>
        `;
        
    } else if(type === 'terms') {
        title.innerText = 'Terms & Conditions';
        content.innerHTML = `
            <p>By using this service, you agree to our terms.</p>
            <p>1. Don't misuse the platform</p>
            <p>2. Keep your password safe</p>
            <p>3. Service provided "as is"</p>
        `;
        
    } else if(type === 'settings') {
        title.innerText = 'Settings';
        showSettings();
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

// Overlay click = close all
document.getElementById('overlay').onclick = function() {
    closeSidebar();
    closeModal();
        }
function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

}
