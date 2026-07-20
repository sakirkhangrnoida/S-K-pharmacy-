import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const msg = document.getElementById('msg');

// 1. LOGIN
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  msg.innerText = "";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Site Rejection Check
    const userDoc = await getDoc(doc(db, "users", uid));
    if(userDoc.exists() && userDoc.data().status === "rejected"){
      await signOut(auth); // तुरंत Logout
      msg.style.color = "red";
      msg.innerText = "तुम्हारा Account Block है। Site Rejection";
      return;
    }

    localStorage.setItem('userId', uid);
    window.location.href = 'index.html'; // Login Success

  } catch(error) {
    msg.style.color = "red";
    msg.innerText = "Email या Password गलत है";
  }
});

// 2. FORGET PASSWORD
document.getElementById('forgotBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  if(!email){ msg.innerText = "पहले Email डालो"; return; }
  
  try {
    await sendPasswordResetEmail(auth, email);
    msg.style.color = "green";
    msg.innerText = "Password Reset Link Email पर भेज दिया गया";
  } catch(error) {
    msg.style.color = "red";
    msg.innerText = "ये Email नहीं मिला";
  }
});

// 3. LOGOUT FUNCTION - इसे index.html में use करना
export async function logoutUser(){
  await signOut(auth);
  localStorage.removeItem('userId');
  window.location.href = 'login.html';
}
