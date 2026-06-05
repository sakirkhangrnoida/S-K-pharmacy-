[// S K Pharmacy - Complete Working System v4.0
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
        'candiforce-200': {name: 'Candiforce 200 Capsule', price: 250, mrp: 280, rx: true, salt: 'Itraconazole 200mg', company: 'Mankind', image: 'images/candiforce-200.jpg', category: 'Antifungal'
