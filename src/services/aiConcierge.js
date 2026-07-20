import products from '../data/products';

// Helper to find products
const searchProducts = (query, limit = 3) => {
    const q = query.toLowerCase();
    return products
        .filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.occasion.some(o => o.toLowerCase().includes(q))
        )
        .slice(0, limit);
};

// Mock LLM Response Generator
export const generateConciergeResponse = async (message, context = {}) => {
    // Simulate network delay for realism (1s to 2s)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = message.toLowerCase();

    // 1. Gift Assistant
    if (lowerMessage.includes('gift') || lowerMessage.includes('present')) {
        const giftProducts = searchProducts('gifting', 2);
        return {
            text: "I'd love to help you find the perfect gift! 🎁 Are you looking for something minimal for daily wear, or a statement piece for a special occasion?",
            products: giftProducts,
            suggestions: ["Minimal & Daily Wear", "Statement Piece", "Under ₹3000"]
        };
    }

    // 2. Ring Size Guide
    if (lowerMessage.includes('size') && lowerMessage.includes('ring')) {
        return {
            text: "Finding the right ring size is important! We use standard US sizing (5 to 10). If you're unsure, you can measure the inside diameter of a ring that fits you well:\n\n• Size 5: 15.7mm\n• Size 6: 16.5mm\n• Size 7: 17.3mm\n• Size 8: 18.1mm\n\nNeed more help?",
            suggestions: ["Show me rings", "How to measure at home"]
        };
    }

    // 3. Style Finder / Daily Wear
    if (lowerMessage.includes('daily') || lowerMessage.includes('office') || lowerMessage.includes('everyday')) {
        const dailyProducts = searchProducts('daily', 3);
        return {
            text: "For daily wear, I recommend pieces that are comfortable, lightweight, and versatile. Our 925 Sterling Silver pieces with 18K gold plating are perfect for this. Here are some of our top daily wear picks:",
            products: dailyProducts,
            suggestions: ["View all rings", "View earrings"]
        };
    }

    // 4. Festive / Wedding / Party
    if (lowerMessage.includes('festive') || lowerMessage.includes('wedding') || lowerMessage.includes('party')) {
        const festiveProducts = searchProducts('festive', 3);
        return {
            text: "Getting ready for a celebration? ✨ You deserve something that makes a statement. Here are some stunning pieces that catch the light beautifully:",
            products: festiveProducts,
            suggestions: ["Show me necklaces", "Statement earrings"]
        };
    }

    // 5. Jewellery Care
    if (lowerMessage.includes('care') || lowerMessage.includes('clean') || lowerMessage.includes('water')) {
        return {
            text: "To keep your SVN Jewellery shining:\n\n✨ Store in the provided pouch or a cool, dry place.\n💧 Avoid direct contact with perfumes, lotions, and harsh chemicals.\n🚿 While our pieces are durable, we recommend removing them before showering or swimming to prolong the 18K gold plating.\n\nWould you like to see our most durable daily-wear pieces?",
            suggestions: ["Show daily wear pieces"]
        };
    }

    // 6. Checkout / Shipping / Returns
    if (lowerMessage.includes('shipping') || lowerMessage.includes('return') || lowerMessage.includes('delivery')) {
        return {
            text: "🚚 **Shipping & Returns**\n\n• Free shipping on all orders over ₹2000.\n• Standard delivery takes 3-5 business days.\n• We offer a hassle-free 14-day return policy for unworn items in their original packaging.\n\nAnything else I can help with?",
            suggestions: ["Track order", "Return policy details"]
        };
    }

    // 7. Product Search
    if (lowerMessage.includes('ring') || lowerMessage.includes('necklace') || lowerMessage.includes('earring') || lowerMessage.includes('bracelet')) {
        let category = 'rings';
        if (lowerMessage.includes('necklace')) category = 'necklaces';
        if (lowerMessage.includes('earring')) category = 'earrings';
        if (lowerMessage.includes('bracelet')) category = 'bracelets';
        
        const categoryProducts = searchProducts(category, 3);
        return {
            text: `Absolutely! Here are some of our most loved ${category} for you to explore:`,
            products: categoryProducts,
            suggestions: [`More ${category}`, "Gift recommendations"]
        };
    }

    // 8. Wishlist Assistant (Uses Context)
    if (lowerMessage.includes('wishlist') || lowerMessage.includes('saved')) {
        if (context.wishlistCount > 0) {
            return {
                text: `You have ${context.wishlistCount} items in your wishlist! Ready to make them yours, or are you looking to add something new?`,
                suggestions: ["Go to Wishlist", "Show new arrivals"]
            };
        } else {
            return {
                text: "Your wishlist is currently empty. Let's find some beautiful pieces to save! What kind of jewellery do you usually wear?",
                suggestions: ["Rings", "Necklaces", "Earrings", "Bracelets"]
            };
        }
    }

    // 9. Greeting / Default
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi' || lowerMessage.includes('hey')) {
        return {
            text: "Hello! Welcome to SVN Jewellery. ✨ I'm your personal concierge. I can help you find the perfect gift, suggest styles for an occasion, or answer questions about our pieces. How can I assist you today?",
            suggestions: ["Gift Assistant 🎁", "Style Finder 🔍", "Jewellery Care ✨"]
        };
    }

    // Fallback response for generic search
    const fallbackProducts = searchProducts(lowerMessage, 2);
    if (fallbackProducts.length > 0) {
        return {
            text: `I found some pieces that might match what you're looking for!`,
            products: fallbackProducts,
            suggestions: ["View more like this", "Help me choose"]
        };
    }

    return {
        text: "I'm still learning, but I'd love to help! Could you try asking about a specific style, occasion, or product type (like rings or necklaces)?",
        suggestions: ["Gift Assistant", "Style Finder", "Contact Support"]
    };
};
