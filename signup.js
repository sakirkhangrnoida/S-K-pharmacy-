import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById('signupBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('msg');
  msg.innerText = "";

  try {
    // 1. Account बनाओ
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    // 2. Firestore में Save करो + status = active
    await setDoc(doc(db, "users", uid), { 
      name, email, mobile, 
      status: "active", // Site Rejection के लिए
      createdAt: new Date() 
    });

    msg.style.color = "green";
    msg.innerText = "Account बन गया! Login पर भेज रहे हैं...";
    setTimeout(() => { window.location.href = 'login.html'; }, 2000);

  } catch(error) {
    msg.style.color = "red";
    if(error.code === 'auth/email-already-in-use') msg.innerText = "ये Email पहले से है";
    else msg.innerText = error.message;
  }
});
