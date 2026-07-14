import { auth } from './firebase.js';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const resetBtn = document.getElementById('resetBtn');
const msgP = document.getElementById('msg');

resetBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  msgP.innerText = "";

  sendPasswordResetEmail(auth, email)
  .then(() => {
    msgP.style.color = "green";
    msgP.innerText = "Reset Link Email पर भेज दिया गया है";
  })
  .catch((error) => {
    msgP.style.color = "red";
    msgP.innerText = "ये Email रजिस्टर नहीं है";
  });
});
