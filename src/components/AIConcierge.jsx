import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateConciergeResponse } from '../services/aiConcierge';
import { useStore } from '../context/StoreContext';
import './AIConcierge.css';

export default function AIConcierge() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: '1',
            type: 'ai', 
            text: "Hello! ✨ I'm your SVN Personal Concierge. I can help you find the perfect gift, suggest styles for an occasion, or answer questions about our jewellery. How can I assist you today?",
            suggestions: ["Gift Assistant 🎁", "Style Finder 🔍", "Jewellery Care ✨"]
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    
    // Grab store context in case the AI needs it (like wishlist count)
    const storeContext = useStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now().toString(), type: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Pass the context for more personalized responses
            const aiResponse = await generateConciergeResponse(text, storeContext);
            
            setMessages(prev => [
                ...prev, 
                { 
                    id: (Date.now() + 1).toString(),
                    type: 'ai',
                    text: aiResponse.text,
                    products: aiResponse.products,
                    suggestions: aiResponse.suggestions
                }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    type: 'ai',
                    text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
                }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(inputValue);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        handleSendMessage(suggestion);
    };

    return (
        <div className="ai-concierge-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="ai-concierge-panel"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                    >
                        <div className="ai-concierge-header">
                            <div className="ai-concierge-header-title">
                                <Sparkles size={20} className="ai-concierge-header-icon" />
                                <span>AI Concierge</span>
                            </div>
                            <button className="ai-concierge-close" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="ai-concierge-messages">
                            {messages.map((msg) => (
                                <motion.div 
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`message-bubble ${msg.type === 'user' ? 'message-user' : 'message-ai'}`}
                                >
                                    {msg.text}
                                    
                                    {/* Render Products if present */}
                                    {msg.products && msg.products.length > 0 && (
                                        <div className="ai-products-grid">
                                            {msg.products.map(product => (
                                                <Link to={`/product/${product.slug}`} key={product.id} className="ai-product-card" onClick={() => setIsOpen(false)}>
                                                    <img src={product.images[0]} alt={product.name} className="ai-product-img" />
                                                    <div className="ai-product-info">
                                                        <h4 className="ai-product-name">{product.name}</h4>
                                                        <p className="ai-product-price">₹{product.price}</p>
                                                    </div>
                                                    <ChevronRight size={16} color="#888" style={{ alignSelf: 'center', marginLeft: 'auto' }} />
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {/* Render Suggestions if present */}
                                    {msg.suggestions && msg.suggestions.length > 0 && (
                                        <div className="ai-concierge-suggestions">
                                            {msg.suggestions.map((suggestion, idx) => (
                                                <button 
                                                    key={idx} 
                                                    className="ai-suggestion-chip"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            
                            {isTyping && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="ai-typing-indicator"
                                >
                                    <div className="ai-typing-dot"></div>
                                    <div className="ai-typing-dot"></div>
                                    <div className="ai-typing-dot"></div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="ai-concierge-input-area">
                            <input 
                                type="text" 
                                className="ai-concierge-input"
                                placeholder="Ask about styling, gifts, sizes..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isTyping}
                            />
                            <button 
                                className="ai-concierge-send"
                                onClick={() => handleSendMessage(inputValue)}
                                disabled={!inputValue.trim() || isTyping}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isOpen && (
                    <motion.button 
                        className="ai-concierge-btn"
                        onClick={() => setIsOpen(true)}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Open AI Concierge"
                    >
                        <div className="ai-concierge-btn__pulse" />
                        <Sparkles size={28} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
