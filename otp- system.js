import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔥 तेरा Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD2EOywrcF8vJUXnsmF5PA3t3inW79UX8Y",
  authDomain: "grnoida-store.firebaseapp.com",
  databaseURL: "https://grnoida-store-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "grnoida-store",
  storageBucket: "grnoida-store.firebasestorage.app",
  messagingSenderId: "665639961400",
  appId: "1:665639961400:web:cb704b0209b910fc6a77cd"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔑 तेरी Fast2SMS API Key - Screenshot से डाली
const FAST2SMS_API = "38IAJiVFE0QvLWbu4ZpC5roetzYBMhcRI";

let currentProduct = "";
let currentPrice = 0;
let currentQty = 1;
let currentMobile = "";
let currentOTP = "";

window.startOTP = function(productName, price, qty) {
  currentProduct = productName;
  currentPrice = price;
  currentQty = qty;
  document.getElementById('otpPopup').style.display = 'flex';
  document.getElementById('productName').innerText = productName;
  document.getElementById('productPrice').innerText = price * qty;
  document.getElementById('msg').innerText = "";
  document.getElementById('msg').className = "";
  document.getElementById('otpBox').style.display = 'none';
  document.getElementById('sendBtn').innerText = 'OTP भेजो';
  document.getElementById('sendBtn').disabled = false;
  document.getElementById('mobileInput').value = '';
  document.getElementById('otpInput').value = '';
}

window.sendOTP = async function() {
  const mobile = document.getElementById('mobileInput').value;
  const msg = document.getElementById('msg');
  const sendBtn = document.getElementById('sendBtn');
  
  if(mobile.length != 10 || isNaN(mobile)) {
    msg.innerText = "10 Digit Mobile Number डालो";
    msg.className = "error";
    msg.style.display = "block";
    return;
  }
  
  sendBtn.disabled = true;
  sendBtn.innerText = "भेज रहे हैं...";
  msg.style.display = "none";
  
  currentMobile = mobile;
  currentOTP = Math.floor(100000 + Math.random() * 900000);
  
  await set(ref(db, 'otps/' + mobile), {otp: currentOTP, time: Date.now()});
  
  await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API}&route=otp&variables_values=${currentOTP}&numbers=${mobile}`);
  
  document.getElementById('otpBox').style.display = 'block';
  sendBtn.innerText = 'OTP भेज दिया ✅';
  msg.innerText = 'OTP भेज दिया, SMS Check करो';
  msg.className = "success";
  msg.style.display = "block";
}

window.verifyOTP = async function() {
  const inputOTP = document.getElementById('otpInput').value;
  const msg = document.getElementById('msg');
  const verifyBtn = document.getElementById('verifyBtn');
  
  if(inputOTP.length != 6) {
    msg.innerText = "6 Digit OTP डालो";
    msg.className = "error";
    msg.style.display = "block";
    return;
  }
  
  verifyBtn.disabled = true;
  verifyBtn.innerText = "Verify कर रहे हैं...";
  
  const snapshot = await get(ref(db, 'otps/' + currentMobile));
  
  if(!snapshot.exists()) {
    msg.innerText = "OTP Expire हो गया, दोबारा भेजो";
    msg.className = "error";
    msg.style.display = "block";
    verifyBtn.disabled = false;
    verifyBtn.innerText = "Verify करो";
    return;
  }
  
  const data = snapshot.val();
  if(Date.now() - data.time > 120000) {
    await remove(ref(db, 'otps/' + currentMobile));
    msg.innerText = "OTP Expire हो गया, दोबारा भेजो";
    msg.className = "error";
    msg.style.display = "block";
    verifyBtn.disabled = false;
    verifyBtn.innerText = "Verify करो";
    return;
  }
  
  if(inputOTP == data.otp) {
    await remove(ref(db, 'otps/' + currentMobile));
    msg.innerText = "Order Confirm ✅ WhatsApp खुल रहा है";
    msg.className = "success";
    const total = currentPrice * currentQty;
    const whatsappMsg = `Order Confirmed ✅%0AProduct: ${currentProduct}%0AQty: ${currentQty}%0ATotal: ₹${total}%0AMobile: ${currentMobile}`;
    setTimeout(() => {
      // 📱 तेरा WhatsApp - 9258751739
      window.open(`https://wa.me/919258751739?text=${whatsappMsg}`, '_blank');
      closePopup();
    }, 1000);
  } else {
    msg.innerText = "गलत OTP है, दोबारा डालो";
    msg.className = "error";
    msg.style.display = "block";
    document.getElementById('otpInput').value = '';
    verifyBtn.disabled = false;
    verifyBtn.innerText = "Verify करो";
  }
}

window.closePopup = function() {
  document.getElementById('otpPopup').style.display = 'none';
      }
