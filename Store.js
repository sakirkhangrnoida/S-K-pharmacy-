import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
const FAST2SMS_API = "38IAJiVFE0QvLWbu4ZpC5roetzYBMhcRI";

let currentProduct = "", currentPrice = 0, currentQty = 1, currentMobile = "", currentOTP = "", customerAddress = "", currentMRP = 0, currentImg = "", currentSize = "N/A";

function getDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
}

function showMsg(text, type) {
  const msg = document.getElementById('msg');
  msg.innerText = text;
  msg.className = type;
  msg.style.display = "block";
  setTimeout(() => msg.style.display = "none", 3000); // 3 सेकंड बाद खुद हट जाएगा
}

window.goStep2 = () => { document.getElementById('step1').style.display='none'; document.getElementById('step2').style.display='block'; }
window.goStep3 = () => { document.getElementById('step2').style.display='none'; document.getElementById('step3').style.display='block'; }
window.goStep4 = () => { 
  customerAddress = document.getElementById('addressInput').value.trim();
  if(customerAddress.length < 10) { showMsg("पूरा Address डालो भाई", "error"); return; }
  document.getElementById('step3').style.display='none'; document.getElementById('step4').style.display='block';
}

window.startOTP = function(btn) {
  currentProduct = btn.dataset.name;
  currentPrice = parseInt(btn.dataset.price);
  currentMRP = parseInt(btn.dataset.mrp) || currentPrice + 50;
  currentQty = parseInt(btn.dataset.qty) || 1;
  currentImg = btn.dataset.img || "";
  currentSize = btn.dataset.size || "N/A";

  const discount = currentMRP - currentPrice;
  const offPer = Math.round((discount/currentMRP)*100);
  const total = currentPrice * currentQty;

  document.getElementById('pName').innerText = currentProduct;
  document.getElementById('pPrice').innerText = currentPrice;
  document.getElementById('pMRP').innerText = currentMRP;
  document.getElementById('pPrice2').innerText = currentPrice;
  document.getElementById('pMRP2').innerText = currentMRP;
  document.getElementById('pQty').innerText = currentQty;
  document.getElementById('pSize').innerText = currentSize;
  document.getElementById('pTotal').innerText = total;
  document.getElementById('discount').innerText = discount;
  document.getElementById('discount2').innerText = discount;
  document.getElementById('offPer').innerText = offPer;
  document.getElementById('deliveryDate').innerText = getDeliveryDate();
  document.getElementById('pImg').src = currentImg;

  document.getElementById('payCOD').innerText = total;
  document.getElementById('payOnlineMRP').innerText = total;
  document.getElementById('payOnline').innerText = total - 10;

  document.getElementById('otpPopup').style.display = 'flex';
  ['step1','step2','step3','step4','step5'].forEach((id,i)=>document.getElementById(id).style.display=i==0?'block':'none');
  document.getElementById('msg').style.display = 'none';
  document.getElementById('mobileInput').value = '';
  document.getElementById('otpInput').value = '';
  document.getElementById('addressInput').value = '';
}

window.sendOTP = async function() {
  const mobile = document.getElementById('mobileInput').value.trim();
  const sendBtn = document.getElementById('sendBtn');
  
  if(mobile.length!=10 || isNaN(mobile)) { showMsg("10 Digit Mobile Number डालो", "error"); return; }
  
  sendBtn.disabled = true;
  sendBtn.innerText = "भेज रहे हैं...";
  currentMobile = mobile;
  currentOTP = Math.floor(100000 + Math.random() * 900000);

  try {
    await set(ref(db, 'otps/' + mobile), {otp: currentOTP, time: Date.now()});
    await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API}&route=otp&variables_values=${currentOTP}&numbers=${mobile}`);
    
    document.getElementById('otpBox').style.display = 'block';
    sendBtn.innerText = 'OTP भेज दिया ✅';
    showMsg('OTP भेज दिया, Check करो', "success");
  } catch(e) {
    showMsg("OTP भेजने में Error, दोबारा Try करो", "error");
  }
  sendBtn.disabled = false;
}

window.verifyOTP = async function() {
  const inputOTP = document.getElementById('otpInput').value.trim();
  if(inputOTP.length!=6) { showMsg("6 Digit OTP डालो", "error"); return; }

  const snapshot = await get(ref(db, 'otps/' + currentMobile));
  if(!snapshot.exists() || Date.now() - snapshot.val().time > 120000) {
    await remove(ref(db, 'otps/' + currentMobile));
    showMsg("OTP Expire हो गया, दोबारा भेजो", "error"); return;
  }

  if(inputOTP == snapshot.val().otp) {
    await remove(ref(db, 'otps/' + currentMobile));
    showMsg("OTP Verified ✅", "success");
    setTimeout(goStep3, 500);
  } else {
    showMsg("गलत OTP है, दोबारा डालो", "error");
    document.getElementById('otpInput').value = '';
  }
}

window.submitOrder = async function() {
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const total = currentPrice * currentQty;
  const finalTotal = payment == 'UPI' ? total - 10 : total;
  const orderId = 'GRN' + Date.now();

  try {
    await set(ref(db, 'orders/' + orderId), {
      orderId, product: currentProduct, price: currentPrice, mrp: currentMRP, qty: currentQty,
      mobile: currentMobile, address: customerAddress, payment, total: finalTotal,
      size: currentSize, status: "Order Placed", time: Date.now()
    });

    document.getElementById('custMobile').innerText = currentMobile;
    document.getElementById('custAddress').innerText = customerAddress;
    document.getElementById('pName2').innerText = currentProduct;
    document.getElementById('pTotal2').innerText = finalTotal;
    document.getElementById('deliveryDate2').innerText = getDeliveryDate();
    document.getElementById('payMethod').innerText = payment;
    document.getElementById('pImg2').src = currentImg;
    document.getElementById('saved').innerText = payment == 'UPI' ? 10 : 6;

    ['step1','step2','step3','step4','step5'].forEach((id,i)=>document.getElementById(id).style.display=i==4?'block':'none');

    const whatsappMsg = `New Order: ${currentProduct}\nQty: ${currentQty}\nTotal: ₹${finalTotal}\nPayment: ${payment}\nMobile: ${currentMobile}\nAddress: ${customerAddress}\nOrder ID: ${orderId}`;
    setTimeout(() => window.open(`https://wa.me/919258751739?text=${encodeURIComponent(whatsappMsg)}`, '_blank'), 1500);
  } catch(e) {
    showMsg("Order में Error आ गया, दोबारा Try करो", "error");
  }
}

window.closePopup = () => document.getElementById('otpPopup').style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if(e.target.classList.contains('buy-btn')) {
      e.preventDefault();
      startOTP(e.target);
    }
  });
});
