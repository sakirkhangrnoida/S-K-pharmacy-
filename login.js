import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn = document.getElementById('loginBtn');
const errorP = document.getElementById('error');

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  errorP.innerText = "";

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Login सफल
    localStorage.setItem('userId', userCredential.user.uid);
    localStorage.setItem('userEmail', email);
    window.location.href = 'index.html'; // Login के बाद Home पर भेज दो
  })
  .catch((error) => {
    errorP.innerText = "गलत Email या Password"; // कोई alert नहीं
  });
});
