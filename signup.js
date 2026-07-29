import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 1. EmailJS init - Ghirak को mail भेजने के लिए
(function(){
  emailjs.init("z3cFw4MCTs6DKv2Cj");
})();

document.getElementById('signupBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('msg');
  msg.innerText = "";

  // 2. खाली check
  if(!name || !email || !mobile || !password){
    msg.style.color = "red";
    msg.innerText = "सारी details भरो";
    return;
  }

  // 3. Mobile 10 digit check - नई लाइन
  if(mobile.length !== 10){
    msg.style.color = "red";
    msg.innerText = "10 Digit Mobile Number डालो";
    return;
  }

  try {
    // 4. Account बनाओ
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    // 5. Firestore में Save करो - active की जगह pending
    await setDoc(doc(db, "users", uid), { 
      name, email, mobile, 
      status: "pending", // Site Rejection के लिए
      createdAt: new Date() 
    });

    // 6. Ghirak को Email भेजो - नई लाइन
    await emailjs.send("service_u1c0727", "dg8drle", {
        to_email: "sakirkhangrnoida@gmail.com", // Ghirak यहाँ अपनी email डाल दे
        user_name: name,
        user_email: email,
        user_mobile: mobile
    });

    msg.style.color = "green";
    msg.innerText = "Account बन गया! Approval के लिए Admin को mail भेज दी है";
    setTimeout(() => { window.location.href = 'login.html'; }, 3000);

  } catch(error) {
    msg.style.color = "red";
    if(error.code === 'auth/email-already-in-use') msg.innerText = "ये Email पहले से है";
    else if(error.code === 'auth/weak-password') msg.innerText = "Password 6 digit से कम है";
    else msg.innerText = error.message;
  }
});
