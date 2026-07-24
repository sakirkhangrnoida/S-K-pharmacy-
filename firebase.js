// 1. Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 2. Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD2OyewcF8vJUXnsmF5A131in790XGBW",
  authDomain: "grnoida-store.firebaseapp.com",
  projectId: "grnoida-store",
  storageBucket: "grnoida-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  databaseURL: "https://grnoida-store-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// 3. Firebase Start
const app = initializeApp(firebaseConfig);

// 4. Export सब
export const auth = getAuth(app);
export const db = getFirestore(app);        // Firestore
export const rtdb = getDatabase(app);       // Realtime DB
export { signInWithPhoneNumber, RecaptchaVerifier, collection, addDoc, getDocs, doc, updateDoc, onSnapshot, query, where, ref, set, onValue };

// 5. EmailJS
export const EMAILJS_PUBLIC_KEY = "z3cFw4MCTs6DKv2Cj";
export const EMAILJS_SERVICE_ID = "service_u1c0277";
export const EMAILJS_TEMPLATE_ID = "dg8drle";
export const ADMIN_EMAIL = "sakirkhangrnoida@gmail.com";

// 6. OTP Function
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
