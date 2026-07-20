// 1. Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 2. तेरा Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD2EoyewcF8vJUXnsmF5A131in790XGBW",
  authDomain: "grnoida-store.firebaseapp.com",
  projectId: "grnoida-store",
  storageBucket: "grnoida-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// 3. Firebase Start
const app = initializeApp(firebaseConfig);

// 4. Export - सब फाइलें इसी से कनेक्ट होंगी
export const auth = getAuth(app);
export const db = getFirestore(app);

// 5. EmailJS की Key - तेरी वाली
export const EMAILJS_PUBLIC_KEY = "z3cFw4MCTs6DKv2Cj";
export const EMAILJS_SERVICE_ID = "service_u1c0727";
export const EMAILJS_TEMPLATE_ID = "dg8drle";
export const ADMIN_EMAIL = "sakirkhangrnoida@gmail.com";

// 6. असली OTP बनाने का Function
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 Digit
}
