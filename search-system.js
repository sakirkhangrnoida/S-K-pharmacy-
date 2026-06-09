// search-system.js - एक बार बना दे, हर Product में Button Auto आएगा
let allMedicines = [];

function initSearchSystem(targetDivId) {
    const targetDiv = document.getElementById(targetDivId);
    if(!targetDiv) return;
    
    const searchHTML = `
    <div style="padding:15px;background:#f8f8f8;margin-bottom:20px;border-radius:12px;position:sticky;top:0;z-index:998">
        <input type="text" id="medSearchInput" placeholder="🔍 दवाई Search करें... Crocin, Paracetamol" 
               onkeyup="filterMedicines()" 
               style="width:100%;padding:14px;border:2px solid #7c3aed;border-radius:10px;font-size:16px;box-sizing:border-box">
    </div>
    <div id="medSearchResults"></div>
    
    <div id="medPopup" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;align-items:center;justify-content:center;padding:20px;box-sizing:border-box">
        <div style="background:white;width:100%;max-width:420px;border-radius:16px;overflow:hidden;max-height:90vh;overflow-y:auto;position:relative">
            <div id="medPopupContent"></div>
        </div>
    </div>
    `;
    
    targetDiv.innerHTML = searchHTML;
    loadMedicines();
}

async function loadMedicines() {
    allMedicines = await loadFromGoogleSheet();
    showMedicines(allMedicines);
}

function filterMedicines() {
    const query = document.getElementById('medSearchInput').value.toLowerCase();
    if(query === "") {
        showMedicines(allMedicines);
        return;
    }
    const filtered = allMedicines.filter(m => 
        m.name.toLowerCase().includes(query) || 
        m.desc.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query)
    );
    showMedicines(filtered);
}

function showMedicines(meds) {
    const div = document.getElementById('medSearchResults');
    if(meds.length === 0){
        div.innerHTML = `<p style="text-align:center;padding:40px;color:#666">😕 कोई दवाई नहीं मिली<br><small>WhatsApp: 9258751739 पर पूछें</small></p>`;
        return;
    }
    
    div.innerHTML = meds.map(med => `
        <div onclick="openMedDetail(${med.id})" style="border:1px solid #eee;padding:12px;margin:10px 0;border-radius:12px;display:flex;gap:12px;align-items:center;background:white;cursor:pointer">
            <img src="${med.image}" style="width:70px;height:70px;border-radius:10px;object-fit:cover;background:#f5f5f5">
            <div style="flex:1">
                <h4 style="margin:0;font-size:16px;line-height:1.3">${med.name}</h4>
                <p style="margin:4px 0;color:#666;font-size:13px">${med.category}</p>
                <p style="margin:0;font-weight:700;color:#7c3aed;font-size:18px">₹${med.price} 
                    <s style="color:#999;font-size:13px;font-weight:400">₹${med.mrp}</s>
                </p>
            </div>
            ${med.inStock ? '<span style="color:#16a34a;font-size:12px;font-weight:600">✓ Stock</span>' : '<span style="color:#dc2626;font-size:12px;font-weight:600">Out</span>'}
        </div>
    `).join('');
}

function openMedDetail(id) {
    const med = allMedicines.find(m => m.id === id);
    const popup = document.getElementById('medPopup');
    const content = document.getElementById('medPopupContent');
    
    content.innerHTML = `
        <img src="${med.image}" style="width:100%;height:280px;object-fit:cover;background:#f5f5f5">
        <div style="padding:20px">
            <span style="background:#ede9fe;color:#7c3aed;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600">${med.category}</span>
            <h2 style="margin:12px 0 8px 0;font-size:22px">${med.name}</h2>
            <p style="color:#666;margin:0 0 16px 0;line-height:1.5">${med.desc}</p>
            <div style="display:flex;align-items:center;gap:10px;margin:0 0 8px 0">
                <p style="font-size:28px;font-weight:800;margin:0;color:#7c3aed">₹${med.price}</p>
                <s style="color:#999;font-size:18px">₹${med.mrp}</s>
                <span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700">${Math.round((med.mrp-med.price)/med.mrp*100)}% OFF</span>
            </div>
            <p style="color:${med.inStock ? '#16a34a' : '#dc2626'};margin:0 0 20px 0;font-weight:600;font-size:15px">
                ${med.inStock ? '✓ In Stock - आज ही Delivery' : '✗ Out of Stock'}
            </p>
            
            <button onclick="addToCart('${med.name}',${med.price});closeMedPopup()" 
                    ${!med.inStock ? 'disabled' : ''}
                    style="width:100%;background:#7c3aed;color:white;border:none;padding:15px;border-radius:10px;font-size:16px;font-weight:700;margin-bottom:10px;${!med.inStock ? 'opacity:0.4;cursor:not-allowed' : 'cursor:pointer'}">
                🛒 Add to Cart
            </button>
            
            <button onclick="buyNow('${med.name}',${med.price});closeMedPopup()" 
                    ${!med.inStock ? 'disabled' : ''}
                    style="width:100%;background:#25D366;color:white;border:none;padding:15px;border-radius:10px;font-size:16px;font-weight:700;margin-bottom:10px;${!med.inStock ? 'opacity:0.4;cursor:not-allowed' : 'cursor:pointer'}">
                ⚡ Buy Now on WhatsApp
            </button>
            
            <button onclick="shareProduct('${med.name}',${med.price})" 
                    style="width:100%;background:#f3f4f6;color:#111827;border:none;padding:15px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer">
                📤 Share करें
            </button>
        </div>
        <button onclick="closeMedPopup()" style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.6);color:white;border:none;width:36px;height:36px;border-radius:50%;font-size:22px;cursor:pointer">×</button>
    `;
    popup.style.display = 'flex';
}

function closeMedPopup() {
    document.getElementById('medPopup').style.display = 'none';
}

function buyNow(name, price) {
    let msg = `*S K Pharmacy Order*%0A%0A*Product:* ${name}%0A*Price:* ₹${price}%0A*Qty:* 1%0A%0A*Name:* %0A*Address:* %0A*Phone:* %0A%0A_Please confirm my order_`;
    window.open(`https://wa.me/919258751739?text=${msg}`, '_blank');
}

function shareProduct(name, price) {
    const text = `*${name}* - ₹${price}%0AS K Pharmacy Silapur पर उपलब्ध%0A%0AOrder करें: https://wa.me/919258751739%0AWebsite: ${window.location.href}`;
    if (navigator.share) {
        navigator.share({ title: name, text: `${name} - ₹${price} S K Pharmacy पर`, url: window.location.href });
    } else {
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
}
