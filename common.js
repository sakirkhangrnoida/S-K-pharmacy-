// S K Pharmacy Common Functions - 1 बार बनाओ, हर पेज में चलाओ
// Version 1.0 - Comment, Like, Signup, Share सब चालू

const SK_PHARMA = {
    phone1: "919258751739",
    phone2: "917983006957",
    shop: "S K Pharmacy",
    
    // Page Load होते ही सब चालू करो
    init: function() {
        this.loadLikes();
        this.loadComments();
        this.loadCart();
        this.setupSignup();
    },
    
    // Product ID निकालो URL से
    getProductId: function() {
        return window.location.pathname.split('/').pop().replace('.html', '') || 'default';
    },
    
    // ===== LIKE SYSTEM =====
    toggleLike: function() {
        const pid = this.getProductId();
        let likes = JSON.parse(localStorage.getItem('sk_likes') || '{}');
        likes[pid] =!likes[pid];
        localStorage.setItem('sk_likes', JSON.stringify(likes));
        this.loadLikes();
    },
    
    loadLikes: function() {
        const pid = this.getProductId();
        const likes = JSON.parse(localStorage.getItem('sk_likes') || '{}');
        const likeBtn = document.getElementById('likeBtn');
        const likeCount = document.getElementById('likeCount');
        if(likeBtn && likeCount) {
            if(likes[pid]) {
                likeBtn.innerHTML = '❤️ Liked';
                likeBtn.style.color = '#CC0C39';
            } else {
                likeBtn.innerHTML = '🤍 Like';
                likeBtn.style.color = '#0F1111';
            }
            // Total likes दिखाओ - Demo के लिए random
            let totalLikes = JSON.parse(localStorage.getItem('sk_total_likes') || '{}');
            if(!totalLikes[pid]) totalLikes[pid] = Math.floor(Math.random() * 50) + 10;
            if(likes[pid]) totalLikes[pid]++;
            localStorage.setItem('sk_total_likes', JSON.stringify(totalLikes));
            likeCount.innerText = totalLikes[pid] + ' Likes';
        }
    },
    
    // ===== COMMENT SYSTEM =====
    addComment: function() {
        const pid = this.getProductId();
        const name = document.getElementById('commentName').value || 'Anonymous';
        const text = document.getElementById('commentText').value;
        if(!text) {alert('Comment लिखो पहले'); return;}
        
        let comments = JSON.parse(localStorage.getItem('sk_comments') || '{}');
        if(!comments[pid]) comments[pid] = [];
        comments[pid].push({name: name, text: text, time: new Date().toLocaleString()});
        localStorage.setItem('sk_comments', JSON.stringify(comments));
        
        document.getElementById('commentName').value = '';
        document.getElementById('commentText').value = '';
        this.loadComments();
    },
    
    loadComments: function() {
        const pid = this.getProductId();
        const comments = JSON.parse(localStorage.getItem('sk_comments') || '{}');
        const commentList = document.getElementById('commentList');
        if(commentList && comments[pid]) {
            commentList.innerHTML = comments[pid].map(c => `
                <div style="border-bottom:1px solid #ddd; padding:10px 0;">
                    <strong>${c.name}</strong> <span style="color:#565959; font-size:12px;">${c.time}</span>
                    <p style="margin:5px 0;">${c.text}</p>
                </div>
            `).join('');
        }
    },
    
    // ===== SIGNUP SYSTEM =====
    setupSignup: function() {
        const user = localStorage.getItem('sk_user');
        if(user) {
            const userBtn = document.getElementById('userBtn');
            if(userBtn) userBtn.innerText = '👤 ' + user;
        }
    },
    
    signup: function() {
        const mob = document.getElementById('mobile').value;
        if (mob.length!== 10) {alert('10 digit mobile डालो'); return;}
        const otp = document.getElementById('otp').value;
        if(otp!== '1234') {alert('Wrong OTP. Demo OTP: 1234'); return;}
        
        localStorage.setItem('sk_user', mob);
        alert('Signup Success ✅\nWelcome ' + mob);
        this.closeModal('signupModal');
        this.setupSignup();
    },
    
    sendOTP: function() {
        const mob = document.getElementById('mobile').value;
        if (mob.length === 10) {
            document.getElementById('otpSection').style.display = 'block';
            alert('OTP sent to ' + mob + ' ✅\nDemo OTP: 1234\nNote: Real SMS के लिए Backend चाहिए');
        } else {alert('10 digit mobile number डालो');}
    },
    
    // ===== CART SYSTEM =====
    addToCart: function() {
        let cart = parseInt(localStorage.getItem('sk_cart') || '0');
        cart++;
        localStorage.setItem('sk_cart', cart);
        document.getElementById('cartCount').innerText = cart;
        alert('Added to cart ✅\nPrescription Required\nWhatsApp: ' + this.phone1);
    },
    
    loadCart: function() {
        const cart = localStorage.getItem('sk_cart') || '0';
        const cartCount = document.getElementById('cartCount');
        if(cartCount) cartCount.innerText = cart;
    },
    
    // ===== WHATSAPP ORDER =====
    orderWhatsApp: function() {
        const pid = this.getProductId();
        const pname = document.querySelector('.product-title').innerText;
        const qty = document.getElementById('qty').value;
        const price = document.querySelector('.price-section span').innerText;
        const msg = `Hi, I want to order:%0A*Product:* ${pname}%0A*Quantity:* ${qty} Strip%0A*Price:* ${price}%0A*Link:* ${window.location.href}%0A%0AName: %0AAddress: %0APrescription: Will share`;
        window.open(`https://wa.me/${this.phone1}?text=${msg}`, '_blank');
    },
    
    // ===== SHARE =====
    shareProduct: function() {
        const url = window.location.href;
        const title = document.querySelector('.product-title').innerText;
        const price = document.querySelector('.price-section span').innerText;
        const text = `${title} - ${price} Only | ${this.shop}\nCOD Available | Same Day Delivery Gr. Noida\nडॉक्टर के पर्चे पर`;
        if (navigator.share) {
            navigator.share({title: title, text: text, url: url});
        } else {
            navigator.clipboard.writeText(url);
            alert('Link Copied ✅\n' + url + '\n\nWhatsApp पर Paste करो, प्रीव्यू आएगा');
        }
    },
    
    // ===== MODAL HELPERS =====
    openModal: function(id) {document.getElementById(id).style.display = 'block';},
    closeModal: function(id) {document.getElementById(id).style.display = 'none';}
};

// Page Load होते ही सब चालू करो
document.addEventListener('DOMContentLoaded', () => SK_PHARMA.init());
