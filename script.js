function closeModal() {
    document.getElementById('settingsModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

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

function openModal(type) {
    closeSidebar();
    document.getElementById('settingsModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    
    let title = document.getElementById('modalTitle');
    let content = document.getElementById('modalContent');
    
    if(type === 'account') {
        title.innerText = 'Account';
        let user = JSON.parse(localStorage.getItem('userData'));
        if(user) {
            content.innerHTML = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3>${user.name}</h3>
                    <p style="color: #666;">${user.email}</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p><b>Name:</b> ${user.name}</p>
                    <p><b>Email:</b> ${user.email}</p>
                    <p><b>Number:</b> ${user.number || 'Not added'}</p>
                    <p><b>Address:</b> ${user.address || 'Not added'}</p>
                </div>
                <button onclick="logout()" style="background: #dc3545; color: white; padding: 12px; border: none; width:100%; margin-bottom:10px; border-radius:5px">Logout</button>
                <button onclick="showEdit()" style="background: #007bff; color: white; padding: 12px; border: none; width:100%; border-radius:5px">Edit Profile</button>
                <div id="editForm" style="display:none; margin-top:15px;">
                    <input id="editName" placeholder="Full Name" value="${user.name}" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                    <input id="editEmail" type="email" placeholder="Email" value="${user.email}" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                    <input id="editNumber" type="number" placeholder="Mobile Number" value="${user.number || ''}" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                    <input id="editAddress" placeholder="Address" value="${user.address || ''}" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                    <button onclick="saveEdit()" style="background: #28a745; color: white; padding: 10px 20px; border: none; width:100%; border-radius:5px">Save Changes</button>
                </div>
            `;
        } else {
            content.innerHTML = `
                <div id="loginForm">
                    <input id="loginEmail" type="email" placeholder="Email" style="width: 100%; padding: 12px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                    <input id="loginPass" type="password" placeholder="Password" style="width: 100%; padding: 12px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                    <button onclick="login()" style="background: #007bff; color: white; padding: 12px; border: none; width:100%; border-radius:5px">Login</button>
                    <p style="text-align: center; margin: 15px 0;">OR</p>
                    <button onclick="showSignup()" style="background: #28a745; color: white; padding: 12px; border: none; width:100%; border-radius:5px">New User? Sign Up</button>
                    <div id="signupForm" style="display:none; margin-top:15px;">
                        <input id="signupName" placeholder="Full Name" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                        <input id="signupEmail" type="email" placeholder="Email" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                        <input id="signupNumber" type="number" placeholder="Mobile Number" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                        <input id="signupPass" type="password" placeholder="Password" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                        <input id="signupAddress" placeholder="Address" style="width: 100%; padding: 10px; margin: 8px 0; box-sizing:border-box; border:1px solid #ddd; border-radius:5px">
                        <button onclick="signup()" style="background: #28a745; color: white; padding: 12px; border: none; width:100%; border-radius:5px">Create Account</button>
                    </div>
                </div>
            `;
        }
    }
    if(type === 'settings') {
        title.innerText = 'Settings';
        content.innerHTML = `
            <p><b>App Version:</b> 1.0</p>
            <p><b>Developer:</b> S K Pharmacy</p>
            <button onclick="alert('Cache Cleared')" style="background: #6c757d; color: white; padding: 10px; border: none; width:100%; border-radius:5px">Clear Cache</button>
        `;
    }
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showEdit() {
    document.getElementById('editForm').style.display = 'block';
}

function signup() {
    let user = {
        name: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        number: document.getElementById('signupNumber').value,
        pass: document.getElementById('signupPass').value,
        address: document.getElementById('signupAddress').value
    };
    if(user.name && user.email && user.number && user.pass) {
        localStorage.setItem('userData', JSON.stringify(user));
        alert('Account बन गया!');
        openModal('account');
    } else {
        alert('सभी फील्ड भरो');
    }
}

function login() {
    let email = document.getElementById('loginEmail').value;
    let pass = document.getElementById('loginPass').value;
    let user = JSON.parse(localStorage.getItem('userData'));
    if(user && user.email === email && user.pass === pass) {
        alert('Login Success: ' + user.name);
        openModal('account');
    } else {
        alert('Email या Password गलत है');
    }
}

function logout() {
    localStorage.removeItem('userData');
    alert('Logout हो गया');
    openModal('account');
}

function saveEdit() {
    let user = JSON.parse(localStorage.getItem('userData')) || {};
    user.name = document.getElementById('editName').value;
    user.email = document.getElementById('editEmail').value;
    user.number = document.getElementById('editNumber').value;
    user.address = document.getElementById('editAddress').value;
    localStorage.setItem('userData', JSON.stringify(user));
    alert('Profile अपडेट हो गया');
    openModal('account');
}
