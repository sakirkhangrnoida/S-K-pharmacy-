import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const FAST2SMS_API = "यहां_तेरी_API_KEY_डाल_दे";

let currentOTP = "";
let currentMobile = "";
let currentProduct = "";

window.startOTP = function(productName, price, qty) {
  currentProduct = productName;
  window.qty = qty;
  window.price = price;
  document.getElementById('otpPopup').style.display = 'flex';
  document.getElementById('productName').innerText = productName;
  document.getElementById('productPrice').innerText = price * qty;
}

window.sendOTP = async function() {
  const mobile = document.getElementById('mobileInput').value;
  if(mobile.length != 10) { alert("10 Digit Mobile डालो"); return; }
  
  currentMobile = mobile;
  currentOTP = Math.floor(100000 + Math.random() * 900000);
  
  await set(ref(db, 'otps/' + mobile), {otp: currentOTP, time: Date.now()});
  fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API}&route=otp&variables_values=${currentOTP}&numbers=${mobile}`);
  
  document.getElementById('otpBox').style.display = 'block';
  document.getElementById('sendBtn').style.display = 'none';
  alert("OTP भेज दिया ✅ 2 मिनट Valid");
}

window.verifyOTP = async function() {
  const inputOTP = document.getElementById('otpInput').value;
  const snapshot = await get(ref(db, 'otps/' + currentMobile));
  
  if(!snapshot.exists() || (Date.now() - snapshot.val().time) > 120000) {
    alert("OTP Expire हो गया ❌"); return;
  }
  
  if(inputOTP == snapshot.val().otp) {
    const msg = `Order Confirmed ✅%0AProduct: ${currentProduct}%0AMobile: ${currentMobile}%0AQty: ${window.qty}%0APrice: ₹${window.price*window.qty}%0AAddress: Greater Noida, PIN 203201`;
    window.open(`https://wa.me/919258751739?text=${msg}`, '_blank');
    set(ref(db, 'otps/' + currentMobile), null);
    closePopup();
  } else {
    alert("गलत OTP ❌ दोबारा डालो");
  }
}

window.closePopup = function() {
  document.getElementById('otpPopup').style.display = 'none';
  document.getElementById('otpBox').style.display = 'none';
  document.getElementById('sendBtn').style.display = 'block';
  document.getElementById('mobileInput').value = '';
  document.getElementById('otpInput').value = '';
}
