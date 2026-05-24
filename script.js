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
    
    if(type == 'account') {
        document.getElementById('modalTitle').innerText = 'Login / Account';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('settingsForm').style.display = 'none';
    } else {
        document.getElementById('modalTitle').innerText = 'Settings';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('settingsForm').style.display = 'block';
    }
    
    document.getElementById('settingsModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function login() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    if(user && pass) {
        alert('Login Success: ' + user);
        closeModal();
    } else {
        alert('Email/Username और Password डालो');
    }
}

function saveEdit() {
    let newUser = document.getElementById('editUsername').value;
    let newNumber = document.getElementById('editNumber').value;
    
    if(newUser || newNumber) {
        alert('Update हो गया!\nEmail: ' + newUser + '\nNumber: ' + newNumber);
        closeModal();
    } else {
        alert('कम से कम Email या Number डालो');
    }
}
