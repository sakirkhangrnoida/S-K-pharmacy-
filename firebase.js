// 1. Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 2. Firebase Config - तेरा वाला
const firebaseConfig = {
  apiKey: "AIzaSyD2OyewcF8vJUXnsmF5A131in790XGBW",
  authDomain: "grnoida-store.firebaseapp.com",
  projectId: "grnoida-store",
  storageBucket: "grnoida-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  databaseURL: "https://grnoida-store-default-rtdb.asia-southeast1.firebasedatabase.app" // <-- Realtime के लिए
};

// 3. Firebase Start
const app = initializeApp(firebaseConfig);

// 4. Export सब - अब तेरे पुराने + नए दोनों काम आएंगे
export const auth = getAuth(app);
export const db = getFirestore(app);        // Firestore - तू पहले से use कर रहा
export const rtdb = getDatabase(app);       // Realtime DB - नया जोड़ा
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, collection, addDoc, getDocs, doc, updateDoc, getDoc, setDoc, ref, set, onValue };

// 5. EmailJS - OTP Email भेजने के लिए
export const EMAILJS_PUBLIC_KEY = "z3cFw4MCTs6DKv2Cj";
export const EMAILJS_SERVICE_ID = "service_u1c0277";
export const EMAILJS_TEMPLATE_ID = "dg8drle";

// 6. असली OTP बनाने का Function - नया जोड़ा
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 Digit
}
