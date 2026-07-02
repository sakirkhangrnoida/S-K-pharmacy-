import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// तेरी असली Firebase config - admin.html से उठाई है
const cfg = {
  apiKey: "AIzaSyD2EywrcF8vJUXnsmFSPA3t3inW79UX8Y",
  authDomain: "grnoida-store.firebaseapp.com",
  databaseURL: "https://grnoida-store-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "grnoida-store",
  storageBucket: "grnoida-store.firebasestorage.app",
  messagingSenderId: "665639961400",
  appId: "1:665639961400:web:cb704b0209b910fc6a77cd"
};

const app = initializeApp(cfg);
const db = getDatabase(app);

// जिस div में id="reviewBox" होगा वहीं सारे Review दिख जाएंगे
document.querySelectorAll('#reviewBox').forEach(box=>{
  const productName = box.dataset.product;
  const prodLink = encodeURIComponent(productName);
  const boxId = box.id || 'rev' + Math.random().toString(36).substr(2,9);
  box.id = boxId;
  
  // Instagram जैसा Review Box बना देगा
  box.innerHTML = `
  <div style="margin-top:30px;background:white;padding:20px;border-radius:8px;border:1px solid #ddd">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;flex-wrap:wrap;gap:10px">
      <h3 style="margin:0;color:#0F1111;font-size:22px">Customer Reviews <span id="avg${boxId}" style="color:#ffa41c;font-size:18px;font-weight:normal"></span></h3>
      <a href="add-review.html?product=${prodLink}" style="padding:10px 18px;background:#ffa41c;color:#0F1111;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px">✍️ Review लिखें</a>
    </div>
    <div id="list${boxId}" style="min-height:80px">Reviews लोड हो रहे हैं...</div>
  </div>`;
  
  // Firebase से सिर्फ Approved Review उठाएगा
  onValue(query(ref(db,'reviews'), orderByChild('product'), equalTo(productName)), snap=>{
    let html = '', count = 0, sum = 0;
    
    snap.forEach(child=>{
      let d = child.val();
      if(d.status !== 'approved') return; // Pending वाले नहीं दिखेंगे
      
      count++; 
      sum += d.rating;
      let stars = '★'.repeat(d.rating) + '☆'.repeat(5-d.rating);
      let time = d.date ? new Date(d.date).toLocaleDateString('hi-IN', {day:'numeric', month:'short', year:'numeric'}) : '';
      
      // Instagram comment जैसा लेआउट
      html += `<div style="border-bottom:1px solid #f0f0f0;padding:14px 0">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <b style="color:#0F1111;font-size:15px">${d.name}</b>
          <span style="color:#ffa41c;font-size:18px">${stars}</span>
        </div>
        <p style="margin:6px 0;color:#0F1111;line-height:1.6;font-size:15px">${d.review}</p>
        <p style="font-size:12px;color:#565959;margin:0">${time}</p>
      </div>`;
    });
    
    // Average और Total Count ऊपर दिख जाएगा
    if(count>0){
      let avg = (sum/count).toFixed(1);
      document.getElementById('avg'+boxId).innerHTML = `⭐ ${avg} - ${count} Reviews`;
    } else {
      document.getElementById('avg'+boxId).innerHTML = '';
      html = '<p style="color:#565959;text-align:center;padding:30px;font-size:15px">अभी कोई Review नहीं है। पहले आप लिखें!</p>';
    }
    document.getElementById('list'+boxId).innerHTML = html;
  });
});
