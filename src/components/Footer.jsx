import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone, Shield } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="footer">
            {/* Newsletter */}
            <div className="footer__newsletter">
                <div className="container">
                    <div className="footer__newsletter-inner">
                        <div>
                            <h3>Join the Glow</h3>
                            <p>Subscribe for exclusive drops, early access & styling tips</p>
                        </div>
                        {subscribed ? (
                            <p style={{ color: 'var(--gold-400)', fontWeight: '500' }}>✨ Thank you for subscribing! Keep glowing. ✨</p>
                        ) : (
                            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-primary">Subscribe</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="footer__main">
                <div className="container">
                    <div className="footer__grid">
                        {/* Brand */}
                        <div className="footer__col">
                            <div className="footer__brand">
                                <svg viewBox="0 0 120 40" className="footer__logo-svg">
                                    <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                                        fontFamily="Playfair Display, serif" fontSize="28" fontWeight="600" fill="white"
                                        letterSpacing="5">SVN</text>
                                </svg>
                                <p className="footer__tagline">Wear Your Glow</p>
                            </div>
                            <p className="footer__brand-text">
                                Crafting demi-fine jewelry that celebrates the modern woman. Each piece is designed to be worn,
                                loved, and cherished — blending organic elegance with contemporary sophistication.
                            </p>
                            <div className="footer__social">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer__col">
                            <h4>Shop</h4>
                            <Link to="/category/rings">Rings</Link>
                            <Link to="/category/necklaces">Necklaces</Link>
                            <Link to="/category/earrings">Earrings</Link>
                            <Link to="/category/bracelets">Bracelets</Link>
                            <Link to="/category/svn-edit">SVN Edit</Link>
                        </div>

                        <div className="footer__col">
                            <h4>Help</h4>
                            <a href="#">Shipping & Returns</a>
                            <a href="#">Ring Size Guide</a>
                            <a href="#">Jewelry Care</a>
                            <a href="#">FAQs</a>
                            <a href="#">Track Order</a>
                        </div>

                        <div className="footer__col">
                            <h4>Contact</h4>
                            <a href="#" className="footer__contact-item">
                                <Mail size={14} /> hello@svnjewelry.com
                            </a>
                            <a href="#" className="footer__contact-item">
                                <Phone size={14} /> +91 98765 43210
                            </a>
                            <a href="#" className="footer__contact-item">
                                <MapPin size={14} /> Mumbai, India
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Bar */}
            <div className="footer__trust">
                <div className="container">
                    <div className="footer__trust-items">
                        <div className="footer__trust-item">
                            <Shield size={20} />
                            <span>BIS Hallmarked</span>
                        </div>
                        <div className="footer__trust-item">
                            <span>🔒</span>
                            <span>Secure Payments</span>
                        </div>
                        <div className="footer__trust-item">
                            <span>🚚</span>
                            <span>Free Shipping 2,999+</span>
                        </div>
                        <div className="footer__trust-item">
                            <span>↩️</span>
                            <span>30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer__bottom">
                <div className="container">
                    <p>© 2026 SVN Jewelry. All rights reserved. Designed with ♡ in India.</p>
                </div>
            </div>
        </footer>
    );
}
