const products = [
  {
    id: 1,
    name: "Celestial Solitaire Ring",
    slug: "celestial-solitaire-ring",
    price: 2499,
    mrp: 3999,
    category: "rings",
    occasion: ["daily", "gifting"],
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller",
    description: "A minimalist gold ring designed for everyday elegance. The Celestial Solitaire features a AAA-grade cubic zirconia set in 18K rose gold plated 925 sterling silver — the perfect bespoke silver ring for modern women.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Rose Gold (2.5 Microns)",
      stone: "AAA Grade Cubic Zirconia",
      weight: "3.2g",
      hallmark: "BIS 925"
    },
    sizes: ["5", "6", "7", "8", "9"],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
  },
  {
    id: 2,
    name: "Luna Crescent Necklace",
    slug: "luna-crescent-necklace",
    price: 3299,
    mrp: 5499,
    category: "necklaces",
    occasion: ["daily", "festive"],
    rating: 4.9,
    reviews: 89,
    badge: "New Arrival",
    description: "A minimalist gold necklace inspired by the crescent moon. Handcrafted in 925 sterling silver with 18K gold plating, adorned with tiny pavé-set stones that catch the light beautifully.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Yellow Gold (3.0 Microns)",
      stone: "Micro Pavé CZ Stones",
      weight: "4.8g",
      hallmark: "BIS 925"
    },
    sizes: ["16 inch", "18 inch", "20 inch"],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b74e?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80"
  },
  {
    id: 3,
    name: "Aurora Drop Earrings",
    slug: "aurora-drop-earrings",
    price: 1899,
    mrp: 2999,
    category: "earrings",
    occasion: ["festive", "gifting"],
    rating: 4.7,
    reviews: 156,
    badge: "SVN Edit",
    description: "Statement drop earrings with cascading CZ stones set in rose gold. These elegant earrings transition effortlessly from day to evening wear, making them an ideal gift for the modern jewelry lover.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Rose Gold (2.5 Microns)",
      stone: "AAA Grade Cubic Zirconia (Cascading)",
      weight: "5.1g",
      hallmark: "BIS 925"
    },
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"
  },
  {
    id: 4,
    name: "Venus Chain Bracelet",
    slug: "venus-chain-bracelet",
    price: 1699,
    mrp: 2799,
    category: "bracelets",
    occasion: ["daily"],
    rating: 4.6,
    reviews: 78,
    badge: null,
    description: "Delicate chain bracelet with interlocking links and a single CZ charm. This minimalist piece is crafted for daily wear and layering, featuring premium 18K gold plating over solid sterling silver.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Yellow Gold (2.0 Microns)",
      stone: "Single CZ Charm (5mm)",
      weight: "3.8g",
      hallmark: "BIS 925"
    },
    sizes: ["6.5 inch", "7 inch", "7.5 inch"],
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
  },
  {
    id: 5,
    name: "Aria Huggie Hoops",
    slug: "aria-huggie-hoops",
    price: 1299,
    mrp: 1999,
    category: "earrings",
    occasion: ["daily", "festive"],
    rating: 4.9,
    reviews: 203,
    badge: "Bestseller",
    description: "Tiny huggie hoop earrings encrusted with micro-pavé CZ stones. Perfect for everyday elegance and ear stacking. Crafted in hypoallergenic 925 sterling silver with 18K gold plating.",
    materials: {
      baseMetal: "925 Sterling Silver (Hypoallergenic)",
      plating: "18K Yellow Gold (2.5 Microns)",
      stone: "Micro Pavé CZ (0.8mm each)",
      weight: "2.4g (pair)",
      hallmark: "BIS 925"
    },
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80"
  },
  {
    id: 6,
    name: "Ophelia Pendant Necklace",
    slug: "ophelia-pendant-necklace",
    price: 2899,
    mrp: 4499,
    category: "necklaces",
    occasion: ["festive", "gifting"],
    rating: 4.8,
    reviews: 67,
    badge: "SVN Edit",
    description: "An exquisite pendant necklace featuring a teardrop CZ stone suspended from a delicate chain. The Ophelia is our signature piece — a minimalist gold necklace that speaks volumes.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Rose Gold (3.0 Microns)",
      stone: "Teardrop AAA CZ (8x5mm)",
      weight: "5.2g",
      hallmark: "BIS 925"
    },
    sizes: ["16 inch", "18 inch", "20 inch"],
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b74e?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80"
  },
  {
    id: 7,
    name: "Seraphina Stacking Rings",
    slug: "seraphina-stacking-rings",
    price: 3499,
    mrp: 5999,
    category: "rings",
    occasion: ["daily", "gifting"],
    rating: 4.7,
    reviews: 91,
    badge: "New Arrival",
    description: "A set of three delicate stacking rings in mixed metals — yellow gold, rose gold, and silver. Each bespoke silver ring features a unique texture: hammered, smooth, and twisted, for endless layering possibilities.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "Mixed — 18K Yellow Gold / Rose Gold / Rhodium",
      stone: "None (Textured Finish)",
      weight: "4.2g (set of 3)",
      hallmark: "BIS 925"
    },
    sizes: ["5", "6", "7", "8"],
    images: [
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80"
  },
  {
    id: 8,
    name: "Elara Cuff Bracelet",
    slug: "elara-cuff-bracelet",
    price: 2199,
    mrp: 3499,
    category: "bracelets",
    occasion: ["festive", "gifting"],
    rating: 4.5,
    reviews: 45,
    badge: null,
    description: "A modern open cuff bracelet with geometric CZ accents. The Elara features clean lines and bold geometry, perfect for the woman who appreciates contemporary demi-fine jewelry design.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Yellow Gold (2.5 Microns)",
      stone: "Geometric CZ Cluster (AAA Grade)",
      weight: "8.5g",
      hallmark: "BIS 925"
    },
    sizes: ["Small", "Medium", "Large"],
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=800&q=80"
  },
  {
    id: 9,
    name: "Iris Ear Cuffs",
    slug: "iris-ear-cuffs",
    price: 999,
    mrp: 1599,
    category: "earrings",
    occasion: ["daily"],
    rating: 4.6,
    reviews: 178,
    badge: "Bestseller",
    description: "No piercing needed. These minimalist ear cuffs wrap elegantly around the cartilage, featuring a single line of CZ stones. Great for ear stacking and daily wear — a modern classic in our demi-fine collection.",
    materials: {
      baseMetal: "925 Sterling Silver (Hypoallergenic)",
      plating: "18K Yellow Gold (2.0 Microns)",
      stone: "Single Row CZ (0.5mm each)",
      weight: "1.8g (pair)",
      hallmark: "BIS 925"
    },
    sizes: ["One Size (Adjustable)"],
    images: [
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80"
  },
  {
    id: 10,
    name: "Celeste Layered Necklace",
    slug: "celeste-layered-necklace",
    price: 4299,
    mrp: 6999,
    category: "necklaces",
    occasion: ["festive", "gifting"],
    rating: 4.9,
    reviews: 52,
    badge: "SVN Edit",
    description: "A pre-layered double chain necklace with a star charm and CZ bar pendant. Effortless layering without the tangle — this minimalist gold necklace is a statement piece for any occasion.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Yellow Gold (3.0 Microns)",
      stone: "Star Charm CZ + Bar Pendant CZ",
      weight: "7.2g",
      hallmark: "BIS 925"
    },
    sizes: ["16+18 inch (Pre-layered)"],
    images: [
      "https://images.unsplash.com/photo-1515562141589-67f0d569b74e?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80"
  },
  {
    id: 11,
    name: "Nova Signet Ring",
    slug: "nova-signet-ring",
    price: 2799,
    mrp: 4299,
    category: "rings",
    occasion: ["daily", "festive"],
    rating: 4.8,
    reviews: 38,
    badge: "New Arrival",
    description: "A modern take on the classic signet ring, featuring a flat oval face with an engraved SVN monogram. This unisex bespoke silver ring blends heritage craftsmanship with contemporary design.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K Yellow Gold (3.0 Microns)",
      stone: "Engraved SVN Monogram (No Stone)",
      weight: "6.1g",
      hallmark: "BIS 925"
    },
    sizes: ["6", "7", "8", "9", "10"],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
  },
  {
    id: 12,
    name: "Stella Tennis Bracelet",
    slug: "stella-tennis-bracelet",
    price: 3899,
    mrp: 5999,
    category: "bracelets",
    occasion: ["festive", "gifting"],
    rating: 4.9,
    reviews: 61,
    badge: "SVN Edit",
    description: "A classic tennis bracelet reimagined with alternating round and baguette CZ stones. This timeless piece channels old-world glamour with a modern, lightweight construction in premium sterling silver.",
    materials: {
      baseMetal: "925 Sterling Silver",
      plating: "18K White Gold / Rhodium (3.0 Microns)",
      stone: "Round + Baguette AAA CZ (42 stones)",
      weight: "9.8g",
      hallmark: "BIS 925"
    },
    sizes: ["6.5 inch", "7 inch", "7.5 inch"],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
    ],
    onPersonImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
  }
];

export default products;

export const categories = [
  { slug: 'rings', name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80' },
  { slug: 'earrings', name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80' },
  { slug: 'bracelets', name: 'Bracelets', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80' },
  { slug: 'pendants', name: 'Pendants', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80' },
  { slug: 'chains', name: 'Chains', image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b74e?w=600&q=80' },
  { slug: 'bangles', name: 'Bangles', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80' },
  { slug: 'sets', name: 'Sets', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80' },
  { slug: 'personalised', name: 'Personalised', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80' },
];

export const occasions = [
  { slug: 'daily', name: 'Daily Wear', subtitle: 'Effortless elegance for every day', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80' },
  { slug: 'festive', name: 'Festive', subtitle: 'Sparkle for celebrations', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80' },
  { slug: 'gifting', name: 'Gifting', subtitle: 'Curated gifts they\'ll treasure', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80' },
];

export const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80', productId: 1 },
  { id: 2, image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80', productId: 2 },
  { id: 3, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80', productId: 3 },
  { id: 4, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80', productId: 4 },
  { id: 5, image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80', productId: 5 },
  { id: 6, image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b74e?w=400&q=80', productId: 6 },
];
