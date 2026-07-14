import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const signupBtn = document.getElementById('signupBtn');
const errorP = document.getElementById('error');

signupBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  const password = document.getElementById('password').value;
  errorP.innerText = "";

  if(mobile.length != 10){ errorP.innerText = "10 Digit Mobile डालें"; return; }

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const userId = userCredential.user.uid;
    
    // Firebase Database में User की डिटेल Save
    set(ref(db, 'users/' + userId), {
      name: name,
      email: email,
      mobile: mobile,
      createdAt: Date.now()
    });

    alert("Account बन गया! अब Login करें");
    window.location.href = 'login.html';
  })
  .catch((error) => {
    errorP.innerText = error.message;
  });
});
