// medicines.js - इस File को अलग Save कर ले
const MEDICINES_DATA = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        price: 20,
        mrp: 25,
        image: "https://via.placeholder.com/300x300?text=Paracetamol",
        desc: "Bukhar aur Body Pain ke liye. Din me 3 baar le sakte hain.",
        category: "Fever",
        inStock: true
    },
    {
        id: 2,
        name: "Crocin Advance 500mg",
        price: 35,
        mrp: 42,
        image: "https://via.placeholder.com/300x300?text=Crocin",
        desc: "Fast Relief Tablet. Sir dard, bukhar me turant aaram.",
        category: "Pain Relief",
        inStock: true
    },
    {
        id: 3,
        name: "Azithromycin 500",
        price: 120,
        mrp: 150,
        image: "https://via.placeholder.com/300x300?text=Azithro",
        desc: "Antibiotic. Doctor ki salah se hi le. 3 din ka course.",
        category: "Antibiotic",
        inStock: false
    }
    // यहाँ नई दवाई Add करते रहना बस
];

// Google Sheet से Data लाने के लिए - Optional
async function loadFromGoogleSheet() {
    // Step 1: Google Sheet बनाओ → Share → Anyone with link → Copy Link
    // Step 2: Link को CSV में बदलो: /edit#gid=0 को /export?format=csv से Replace करो
    const SHEET_URL = 'YAHAN_APNI_SHEET_KA_CSV_LINK_DALNA';
    
    try {
        const res = await fetch(SHEET_URL);
        const csv = await res.text();
        const rows = csv.split('\n').slice(1); // First row Header छोड़ दो
        
        return rows.map((row, i) => {
            const [name, price, mrp, image, desc, category, inStock] = row.split(',');
            return {
                id: i + 10,
                name: name,
                price: parseInt(price),
                mrp: parseInt(mrp),
                image: image,
                desc: desc,
                category: category,
                inStock: inStock === 'TRUE'
            };
        });
    } catch (e) {
        console.log('Sheet load nahi hui, local data use kar raha hu');
        return MEDICINES_DATA;
    }
}
