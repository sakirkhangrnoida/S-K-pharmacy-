import { auth, db, generateOTP, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from './firebase.js';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

// EmailJS Start
emailjs.init(EMAILJS_PUBLIC_KEY);

const msg = document.getElementById('msg');
let currentOTP = ""; // OTP yahi store hoga
let tempUser = null; // Login wale user ko hold karne ke liye

// 1. LOGIN BUTTON
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  msg.innerText = "";

  if(!email || !password){
    msg.style.color = "red";
    msg.innerText = "Email aur Password dono dalo";
    return;
  }

  try {
    // Pehle Firebase se login check
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Site Rejection Check
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists() && userDoc.data().status === "rejected") {
      await signOut(auth);
      msg.style.color = "red";
      msg.innerText = "Tumhara Account Block hai - Site Rejection";
      return;
    }
    
    // Login sahi hai to OTP bhejo
    tempUser = userCredential.user;
    currentOTP = generateOTP(); // 6 digit OTP banaya
    
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: tempUser.email,
      otp: currentOTP
    });

    // Login box chupao, OTP box dikhao
    document.getElementById('auth-box').style.display = 'none';
    document.getElementById('otp-box').style.display = 'block';
    msg.style.color = "green";
    msg.innerText = "OTP bhej diya " + tempUser.email + " par";

  } catch (error) {
    msg.style.color = "red";
    msg.innerText = "Email ya Password galat hai";
  }
});

// 2. OTP VERIFY BUTTON - NAYA
document.getElementById('verifyOtpBtn').addEventListener('click', () => {
  const otpValue = document.getElementById('otp').value;
  if (otpValue === currentOTP) {
    localStorage.setItem('userId', tempUser.uid);
    msg.style.color = "green";
    msg.innerText = "Login Success ✅";
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
  } else {
    msg.style.color = "red";
    msg.innerText = "Galat OTP. Dobara try karo";
  }
});

// 3. FORGOT PASSWORD
document.getElementById('forgotBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  if (!email) { 
    msg.style.color = "red";
    msg.innerText = "Pehle Email dalo"; 
    return; 
  }
  try {
    await sendPasswordResetEmail(auth, email);
    msg.style.color = "green";
    msg.innerText = "Password Reset Link Email par bhej diya gaya";
  } catch (error) {
    msg.style.color = "red";
    msg.innerText = "Ye Email register nahi hai";
  }
});

// 4. LOGOUT FUNCTION
export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem('userId');
  window.location.href = 'login.html';
}
