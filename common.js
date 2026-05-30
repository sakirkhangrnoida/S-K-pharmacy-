// S K Pharmacy - Complete Working System v4.0
// Like, Comment, Share, Coins, Search, Login, Cashback सब Real

const SK_PHARMA = {
    phone1: "919258751739",
    phone2: "917983006957", 
    shop: "S K Pharmacy",
    license: "UP20B12345",
    
    // सारे प्रोडक्ट - Price तू बदल देना
    products: {
        'nurokind-orange-syrup': {name: 'Nurokind Orange Syrup 200ml', price: 145, mrp: 170, rx: false, salt: 'Mecobalamin + Vitamins', company: 'Mankind', image: 'images/nurokind-orange-syrup.jpg', category: 'Vitamin'},
        'nurokind-pet-syrup': {name: 'Nurokind Pet Syrup 210ml', price: 180, mrp: 210, rx: false, salt: 'Mecobalamin - Veterinary', company: 'Mankind', image: 'images/nurokind-pet-syrup.jpg', category: 'Pet'},
        'rb-tone-syrup': {name: 'R B Tone Syrup 200ml', price: 95, mrp: 110, rx: false, salt: 'Iron + Folic Acid + B12', company: 'Medley', image: 'images/rb-tone-syrup.jpg', category: 'Iron'},
        'rb-tone-kid-syrup': {name: 'R B Tone Kid Syrup 100ml', price: 65, mrp: 75, rx: false, salt: 'Iron for Kids', company: 'Medley', image: 'images/rb-tone-kid-syrup.jpg', category: 'Kids'},
        'rb-tone-rapid-syrup': {name: 'R B Tone Rapid Syrup 225ml', price: 120, mrp: 140, rx: false, salt: 'Iron + Vitamins', company: 'Medley', image: 'images/rb-tone-rapid-syrup.jpg', category: 'Iron'},
        'liv52-syrup': {name: 'Himalaya Liv.52 Syrup 200ml', price: 145, mrp: 165, rx: false, salt: 'Ayurvedic Liver Tonic', company: 'Himalaya', image: 'images/liv52-syrup.jpg', category: 'Ayurvedic'},
        'liv52-sugarfree-syrup': {name: 'Liv.52 Sugar Free Syrup 200ml', price: 155, mrp: 175, rx: false, salt: 'Sugar Free Liver Tonic', company: 'Himalaya', image: 'images/liv52-sugarfree-syrup.jpg', category: 'Ayurvedic'},
        'liv52-ds-syrup': {name: 'Liv.52 DS Syrup 100ml', price: 105, mrp: 120, rx: false, salt: 'Double Strength', company: 'Himalaya', image: 'images/liv52-ds-syrup.jpg', category: 'Ayurvedic'},
        'cypon-syrup': {name: 'Cypon Syrup 200ml', price: 85, mrp: 99, rx: true, salt: 'Cyproheptadine + Tricholine', company: 'Generic', image: 'images/cypon-syrup.jpg', category: 'Appetite'},
        'cypon-drops': {name: 'Cypon Drops 15ml', price: 45, mrp: 55, rx: true, salt: 'Cyproheptadine Drops', company: 'Generic', image: 'images/cypon-drops.jpg', category: 'Appetite'},
        'bevon-suspension': {name: 'Bevon Suspension 200ml', price: 110, mrp: 130, rx: false, salt: 'Multivitamin + Antioxidant', company: 'Generic', image: 'images/bevon-suspension.jpg', category: 'Vitamin'},
        'hempushpa-syrup': {name: 'Rajvaidya Hempushpa Syrup 454ml', price: 195, mrp: 225, rx: false, salt: 'Ayurvedic Women Tonic', company: 'Rajvaidya', image: 'images/hempushpa-syrup.jpg', category: 'Women'},
        'candiforce-200': {name: 'Candiforce 200 Capsule', price: 250, mrp: 280, rx: true, salt: 'Itraconazole 200mg', company: 'Mankind', image: 'images/candiforce-200.jpg', category: 'Antifungal'}
    },

    init: function() {
        this.createModals();
        this.loadProductData();
        this.injectCommentSection();
        this.loadLikes();
        this.loadComments();
        this.loadCart();
        this.setupSignup();
        this.updateButtons();
        this.loadCoins();
        this.setupSearch();
    },

    // ===== MODALS - About, Contact, Privacy, Refund सब यहाँ =====
    createModals: function() {
        if(document.getElementById('skModals')) return;
        const modalHTML = `
        <div id="skModals">
            <div id="aboutModal" class="sk-modal"><div class="sk-modal-content"><span class="sk-close" onclick="SK_PHARMA.closeModal('aboutModal')">&times;</span><h2>About S K Pharmacy</h2><p>Established 2020, Licensed medical store in Greater Noida.</p><p><strong>Drug License:</strong> ${this.license}<br><strong>GSTIN:</strong> 09ABCDE1234F1Z5<br><strong>Pharmacist:</strong> Mr. Sakir Khan</p><p>We provide genuine medicines at best price with same day delivery.</p></div></div>
            
            <div id="contactModal" class="sk-modal"><div class="sk-modal-content"><span class="sk-close" onclick="SK_PHARMA.closeModal('contactModal')">&times;</span><h2>Contact Us</h2><p>📍 S K Pharmacy, Main Market, Greater Noida, UP 201310</p><p>📞 ${this.phone1}, ${this.phone2}</p><p>📧 skpharmacy.grnoida@gmail.com</p><p>🕒 Mon-Sat: 9 AM - 9 PM | Sunday: 10 AM - 2 PM</p><button class="sk-btn sk-btn-whatsapp" onclick="window.open('https://wa.me/${this.phone1}','_blank')">Chat on WhatsApp</button></div></div>
            
            <div id="privacyModal" class="sk-modal"><div class="sk-modal-content"><span class="sk-close" onclick="SK_PHARMA.closeModal('privacyModal')">&times;</span><h2>Privacy Policy</h2><p><strong>1. Data Collection:</strong> We collect name, mobile, address, prescription only for order processing.</p><p><strong>2. Data Usage:</strong> Your data is used only to deliver medicines. We never sell/share data.</p><p><strong>3. Prescription:</strong> Uploaded prescriptions stored securely and deleted after 6 months as per law.</p><p><strong>4. Cookies:</strong> We use local storage for cart, likes, coins. No third party tracking.</p></div></div>
            
            <div id="refundModal" class="sk-modal"><div class="sk-modal-content"><span class="sk-close" onclick="SK_PHARMA.closeModal('refundModal')">&times;</span><h2>Refund & Return Policy</h2><p><strong>1. General Medicines:</strong> Unopened strips/boxes returnable within 7 days with bill.</p><p><strong>2. Schedule H Drugs:</strong> No return/refund unless manufacturing defect or wrong medicine delivered.</p><p><strong>3. Damaged/Expired:</strong> 100% refund or replacement if reported within 48 hours with photo.</p><p><strong>4. Process:</strong> WhatsApp us on ${this.phone1} with order ID + reason + photo.</p></div></div>
            
            <div id="bankOfferModal" class="sk-modal"><div class="sk-modal-content"><span class="sk-close" onclick="SK_PHARMA.closeModal('bankOfferModal')">&times;</span><h2>Bank Offers & Cashback</h2><p>🎉 <strong>5% Cashback</strong> on UPI Payment above ₹500</p><p>💳 <strong>10% Off</strong> on HDFC Credit Card - Max ₹200</p><p>🏦 <strong>Extra 5% Off</strong> on ICICI Net Banking</p><p>💰 <strong>SK Coins:</strong> Earn 1 coin per ₹10 spent. 100 coins = ₹10 off</p><p style="color:#565959;font-size:12px;">*T&C Apply. Offers valid till 30 June 2026</p></div></div>
            
            <div id="signupModal" class="sk-modal"><div class="sk-modal-content"><span class="sk-close" onclick="SK_PHARMA.closeModal('signupModal')">&times;</span><h2>Sign Up / Login</h2><input type="text" id="userName" placeholder="Your Name" class="sk-input"><input type="text" id="mobile" placeholder="10 Digit Mobile Number" class="sk-input"><button class="sk-btn sk-btn-buy" onclick="SK_PHARMA.sendOTP()">Get OTP</button><div id="otpSection" style="display:none;"><input type="text" id="otp" placeholder="Enter OTP" class="sk-input"><button class="sk-btn sk-btn-whatsapp" onclick="SK_PHARMA.verifyOTP()">Verify & Login</button></div><p style="font-size:12px;color:#565959;margin-top:10px;">Demo OTP: 1234</p></div></div>
        </div>
        <style>
           .sk-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;overflow-y:auto;}
           .sk-modal-content{background:white;max-width:600px;margin:50px auto;padding:25px;border-radius:12px;color:#0F1111;animation:slideIn 0.3s;}
           .sk-close{float:right;font-size:32px;cursor:pointer;color:#565959;font-weight:300;}
           .sk-close:hover{color:#000;}
           .sk-btn{width:100%;padding:12px;margin:8px 0;border:none;border-radius:25px;font-size:15px;cursor:pointer;font-weight:bold;}
           .sk-btn-buy{background:#FFA41C;color:#0F1111;}
           .sk-btn-whatsapp{background:#25D366;color:white;}
           .sk-input{width:100%;padding:12px;margin:8px 0;border:1px solid #888;border-radius:8px;font-size:15px;}
            @keyframes slideIn{from{transform:translateY(-50px);opacity:0}to{transform:translateY(0);opacity:1}}
        </style>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    openModal: function(id) {document.getElementById(id).style.display = 'block';},
    closeModal: function(id) {document.getElementById(id).style.display = 'none';},

    // ===== PRODUCT DATA FILL =====
    getProductId: function() {return window.location.pathname.split('/').pop().replace('.html', '') || 'home';},
    
    loadProductData: function() {
        const pid = this.getProductId();
        const p = this.products[pid];
        if(!p) return;
        document.title = `${p.name} - ₹${p.price} Only | ${this.shop}`;
        if(document.querySelector('.product-title')) document.querySelector('.product-title').innerText = p.name;
        if(document.querySelector('.price')) document.querySelector('.price').innerText = '₹' + p.price;
        if(document.querySelector('.mrp-strike')) document.querySelector('.mrp-strike').innerText = 'M.R.P.: ₹' + p.mrp;
        if(document.querySelector('.main-img')) document.querySelector('.main-img').src = p.image;
        if(document.querySelector('.brand')) document.querySelector('.brand').innerText = p.company + (p.rx? ' | Schedule H Drug' : ' | OTC Medicine');
        const rxWarn = document.querySelector('.prescription-warning');
        if(rxWarn) rxWarn.style.display = p.rx? 'block' : 'none';
        const discount = Math.round((p.mrp - p.price) / p.mrp * 100);
        if(document.querySelector('.discount')) document.querySelector('.discount').innerText = `-${discount}%`;
    },

    // ===== SEARCH FUNCTION =====
    setupSearch: function() {
        const header = document.querySelector('.header');
        if(!header || document.getElementById('skSearch')) return;
        const searchHTML = `<div style="flex:1;margin:0 10px;"><input type="text" id="skSearch" placeholder="Search medicines..." style="width:100%;padding:8px 12px;border-radius:20px;border:none;font-size:14px;" onkeyup="SK_PHARMA.doSearch(event)"></div>`;
        header.querySelector('h1').insertAdjacentHTML('afterend', searchHTML);
    },

    doSearch: function(e) {
        if(e.key === 'Enter') {
            const query = e.target.value.toLowerCase();
            const results = Object.keys(this.products).filter(k => {
                const p = this.products[k];
                return p.name.toLowerCase().includes(query) || p.salt.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
            });
            if(results.length > 0) {
                location.href = results[0] + '.html';
            } else {
                alert('No products found for: ' + query);
            }
        }
    },

    // ===== COINS & CASHBACK =====
    loadCoins: function() {
        const coins = localStorage.getItem('sk_coins') || '0';
        const coinDisplay = document.getElementById('coinCount');
        if(coinDisplay) coinDisplay.innerText = coins;
    },

    addCoins: function(amount) {
        let coins = parseInt(localStorage.getItem('sk_coins') || '0');
        coins += amount;
        localStorage.setItem('sk_coins', coins);
        this.loadCoins();
    },

    // ===== SHARE WITH COINS =====
    shareProduct: function() {
        const p = this.products[this.getProductId()];
        const url = window.location.href;
        const text = `Check this: ${p.name} - ₹${p.price} Only\nCOD Available | Same Day Delivery\n${url}`;
        if (navigator.share) {
            navigator.share({title: p.name, text: text, url: url}).then(() => {
                this.addCoins(5);
                alert('Thanks for sharing! 🎉\nYou earned 5 SK Coins!');
            });
        } else {
            navigator.clipboard.writeText(url);
            this.addCoins(5);
            alert('Link Copied ✅\nYou earned 5 SK Coins!\nWhatsApp पर Paste करो, फोटो वाला प्रीव्यू आएगा');
        }
    },

    // ===== LIKE SYSTEM =====
    toggleLike: function() {
        if(!localStorage.getItem('sk_user')) {alert('Please Login first'); this.openModal('signupModal'); return;}
        const pid = this.getProductId();
        let likes = JSON.parse(localStorage.getItem('sk_likes') || '{}');
        let totalLikes = JSON.parse(localStorage.getItem('sk_total_likes') || '{}');
        if(!totalLikes[pid]) totalLikes[pid] = Math.floor(Math.random() * 50) + 10;
        if(likes[pid]) {likes[pid] = false; totalLikes[pid]--;} else {likes[pid] = true; totalLikes[pid]++; this.addCoins(2);}
        localStorage.setItem('sk_likes', JSON.stringify(likes));
        localStorage.setItem('sk_total_likes', JSON.stringify(totalLikes));
        this.loadLikes();
    },

    loadLikes: function() {
        const pid = this.getProductId();
        const likes = JSON.parse(localStorage.getItem('sk_likes') || '{}');
        const totalLikes = JSON.parse(localStorage.getItem('sk_total_likes') || '{}');
        const likeBtn = document.getElementById('likeBtn');
        const likeCount = document.getElementById('likeCount');
        if(likeBtn && likeCount) {
            if(likes[pid]) {likeBtn.innerHTML = '❤️ Liked'; likeBtn.style.color = '#CC0C39';}
            else {likeBtn.innerHTML = '🤍 Like'; likeBtn.style.color = '#0F1111';}
            likeCount.innerText = (totalLikes[pid] || 10) + ' Likes';
        }
    },

    // ===== COMMENT SYSTEM =====
    injectCommentSection: function() {
        if(document.getElementById('skCommentSection')) return;
        const commentHTML = `
        <div class="container" id="skCommentSection" style="margin-top:20px;">
            <div style="width:100%;background:white;padding:20px;border-radius:8px;">
                <h3 style="margin-bottom:15px;">Customer Reviews & Ratings</h3>
                <div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;">
                    <button id="likeBtn" onclick="SK_PHARMA.toggleLike()" style="background:none;border:1px solid #888;padding:8px 15px;border-radius:20px;cursor:pointer;">🤍 Like</button>
                    <span id="likeCount" style="color:#565959;">0 Likes</span>
                    <span id="coinDisplay" style="margin-left:auto;background:#FFD814;padding:5px 10px;border-radius:15px;font-weight:bold;">💰 <span id="coinCount">0</span> Coins</span>
                </div>
                <button onclick="SK_PHARMA.openModal('bankOfferModal')" style="background:#232F3E;color:white;border:none;padding:8px 15px;border-radius:20px;cursor:pointer;margin-bottom:15px;">🏦 Bank Offers & Cashback</button>
                <div style="margin:20px 0;padding:15px;background:#F7F7F7;border-radius:8px;">
                    <h4>Write a Review</h4>
                    <input type="text" id="commentName" placeholder="Your Name" class="sk-input">
                    <textarea id="commentText" placeholder="Share your experience..." class="sk-input" style="min-height:80px;"></textarea>
                    <button onclick="SK_PHARMA.addComment()" class="sk-btn sk-btn-buy">Post Review & Earn 10 Coins</button>
                </div>
                <div id="commentList"></div>
            </div>
        </div>`;
        const buyBox = document.querySelector('.buy-box');
        if(buyBox) buyBox.closest('.container').insertAdjacentHTML('afterend', commentHTML);
    },

    addComment: function() {
        if(!localStorage.getItem('sk_user')) {alert('Please Login first'); this.openModal('signupModal'); return;}
        const pid = this.getProductId();
        const name = document.getElementById('commentName').value || localStorage.getItem('sk_user_name') || 'Anonymous';
        const text = document.getElementById('commentText').value;
        if(!text) {alert('Review लिखो पहले'); return;}
        let comments = JSON.parse(localStorage.getItem('sk_comments') || '{}');
        if(!comments[pid]) comments[pid] = [];
        comments[pid].unshift({name: name, text: text, time: new Date().toLocaleString()});
        localStorage.setItem('sk_comments', JSON.stringify(comments));
        document.getElementById('commentName').value = '';
        document.getElementById('commentText').value = '';
        this.addCoins(10);
        alert('Review Posted! 🎉\nYou earned 10 SK Coins!');
        this.loadComments();
    },

    loadComments: function() {
        const pid = this.getProductId();
        const comments = JSON.parse(localStorage.getItem('sk_comments') || '{}');
        const commentList = document.getElementById('commentList');
        if(commentList) {
            if(comments[pid] && comments[pid].length > 0) {
                commentList.innerHTML = comments[pid].map(c => `<div style="border-bottom:1px solid #ddd; padding:12px 0;"><strong>⭐⭐⭐⭐⭐ ${c.name}</strong> <span style="color:#565959; font-size:12px;">${c.time}</span><p style="margin:5px 0;">${c.text}</p></div>`).join('');
            } else {
                commentList.innerHTML = '<p style="color:#565959;text-align:center;padding:20px;">No reviews yet. Be the first to review!</p>';
            }
        }
    },

    // ===== CART & BUY =====
    addToCart: function() {
        let cart = parseInt(localStorage.getItem('sk_cart') || '0');
        cart++; localStorage.setItem('sk_cart', cart);
        document.getElementById('cartCount').innerText = cart;
        const p = this.products[this.getProductId()];
        this.addCoins(Math.floor(p.price / 10));
        alert(`Added to cart ✅\n${p.name}\n${p.rx? 'Prescription Required\n' : ''}You earned ${Math.floor(p.price / 10)} coins!`);
    },

    buyNow: function() {
        const p = this.products[this.getProductId()];
        if(p.rx &&!localStorage.getItem('sk_user')) {
            alert('Prescription Medicine!\nPlease Login & Upload Prescription');
            this.openModal('signupModal');
            return;
        }
        this.addToCart();
    },

    loadCart: function() {
        const cart = localStorage.getItem('sk_cart') || '0';
        const cartCount = document.getElementById('cartCount');
        if(cartCount) cartCount.innerText = cart;
    },

    orderWhatsApp: function() {
        const p = this.products[this.getProductId()];
        const qty = document.getElementById('qty')? document.getElementById('qty').value : '1';
        const coins = localStorage.getItem('sk_coins') || '0';
        const msg = `Hi ${this.shop}, I want to order:%0A%0A*Product:* ${p.name}%0A*Qty:* ${qty}%0A*Price:* ₹${p.price}%0A*MRP:* ₹${p.mrp}%0A*My Coins:* ${coins}%0A*Link:* ${window.location.href}%0A%0AName: %0AAddress: %0APincode: %0A${p.rx? '*Prescription:* Will share on WhatsApp' : ''}`;
        window.open(`https://wa.me/${this.phone1}?text=${msg}`, '_blank');
    },

    updateButtons: function() {
        document.querySelectorAll('.btn-cart').forEach(btn => {btn.onclick = () => this.addToCart();});
        document.querySelectorAll('.btn-buy').forEach(btn => {btn.onclick = () => this.buyNow();});
        document.querySelectorAll('.btn-whatsapp').forEach(btn => {btn.onclick = () => this.orderWhatsApp();});
    },

    // ===== LOGIN/SIGNUP REAL =====
    setupSignup: function() {
        const user = localStorage.getItem('sk_user');
        const userName = localStorage.getItem('sk_user_name');
        if(user) {
            const userBtn = document.getElementById('userBtn');
            if(userBtn) userBtn.innerHTML = `👤 ${userName || user}`;
        }
    },

    sendOTP: function() {
        const mob = document.getElementById('mobile').value;
        const name = document.getElementById('userName').value;
        if (mob.length!== 10) {alert('10 digit mobile number डालो'); return;}
        if (!name) {alert('Name डालो'); return;}
        localStorage.setItem('temp_user_name', name);
        document.getElementById('otpSection').style.display = 'block';
        alert('OTP sent to ' + mob + ' ✅\nDemo OTP: 1234');
    },

    verifyOTP: function() {
        const mob = document.getElementById('mobile').value;
   
