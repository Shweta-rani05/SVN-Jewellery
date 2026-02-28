import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories, occasions } from '../data/products';
import './Header.css';

export default function Header() {
    const { cartCount, wishlistCount } = useStore();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setActiveMenu(null);
    }, [location]);

    const svnEditProducts = [
        { name: 'Celestial Solitaire Ring', slug: 'celestial-solitaire-ring' },
        { name: 'Luna Crescent Necklace', slug: 'luna-crescent-necklace' },
        { name: 'Aria Huggie Hoops', slug: 'aria-huggie-hoops' },
        { name: 'Stella Tennis Bracelet', slug: 'stella-tennis-bracelet' },
    ];

    return (
        <>
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <p>✨ Free Shipping on Orders Over ₹2,999 | Use Code <strong>SVNGLOW5</strong> for 5% Off ✨</p>
            </div>

            <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
                <div className="header__inner container">
                    {/* Mobile Menu Toggle */}
                    <button className="header__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Logo */}
                    <Link to="/" className="header__logo">
                        <svg viewBox="0 0 120 40" className="header__logo-svg">
                            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                                fontFamily="Playfair Display, serif" fontSize="32" fontWeight="600" fill="white"
                                letterSpacing="6">SVN</text>
                        </svg>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="header__nav">
                        <div className="header__nav-item"
                            onMouseEnter={() => setActiveMenu('category')}
                            onMouseLeave={() => setActiveMenu(null)}>
                            <button className="header__nav-link">
                                Shop by Category <ChevronDown size={14} />
                            </button>
                            {activeMenu === 'category' && (
                                <div className="header__mega-menu">
                                    <div className="mega-menu__grid">
                                        {categories.map(cat => (
                                            <Link to={`/category/${cat.slug}`} key={cat.slug} className="mega-menu__item">
                                                <div className="mega-menu__img-wrap">
                                                    <img src={cat.image} alt={cat.name} loading="lazy" />
                                                </div>
                                                <span>{cat.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="header__nav-item"
                            onMouseEnter={() => setActiveMenu('occasion')}
                            onMouseLeave={() => setActiveMenu(null)}>
                            <button className="header__nav-link">
                                Shop by Occasion <ChevronDown size={14} />
                            </button>
                            {activeMenu === 'occasion' && (
                                <div className="header__mega-menu">
                                    <div className="mega-menu__grid mega-menu__grid--3">
                                        {occasions.map(occ => (
                                            <Link to={`/category/${occ.slug}`} key={occ.slug} className="mega-menu__item">
                                                <div className="mega-menu__img-wrap">
                                                    <img src={occ.image} alt={occ.name} loading="lazy" />
                                                </div>
                                                <span>{occ.name}</span>
                                                <small>{occ.subtitle}</small>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="header__nav-item"
                            onMouseEnter={() => setActiveMenu('edit')}
                            onMouseLeave={() => setActiveMenu(null)}>
                            <button className="header__nav-link">
                                SVN Edit <ChevronDown size={14} />
                            </button>
                            {activeMenu === 'edit' && (
                                <div className="header__mega-menu header__mega-menu--narrow">
                                    <div className="mega-menu__list">
                                        <p className="mega-menu__heading">Our Curated Favorites</p>
                                        {svnEditProducts.map(p => (
                                            <Link to={`/product/${p.slug}`} key={p.slug} className="mega-menu__list-item">
                                                {p.name}
                                            </Link>
                                        ))}
                                        <Link to="/category/svn-edit" className="mega-menu__view-all">View All →</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Actions */}
                    <div className="header__actions">
                        <button className="header__action-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
                            <Search size={20} />
                        </button>
                        <Link to="/wishlist" className="header__action-btn" aria-label="Wishlist">
                            <Heart size={20} />
                            {wishlistCount > 0 && <span className="header__badge">{wishlistCount}</span>}
                        </Link>
                        <Link to="/cart" className="header__action-btn" aria-label="Cart">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                {searchOpen && (
                    <div className="header__search glass">
                        <div className="container">
                            <div className="header__search-inner">
                                <Search size={20} />
                                <input type="text" placeholder="Search for rings, necklaces, earrings..." autoFocus />
                                <button onClick={() => setSearchOpen(false)}><X size={20} /></button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Menu Drawer */}
            {mobileOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />
                    <div className="mobile-menu__drawer">
                        <div className="mobile-menu__header">
                            <span className="mobile-menu__title">Menu</span>
                            <button onClick={() => setMobileOpen(false)}><X size={24} /></button>
                        </div>
                        <nav className="mobile-menu__nav">
                            <div className="mobile-menu__section">
                                <p className="mobile-menu__label">Shop by Category</p>
                                {categories.map(cat => (
                                    <Link to={`/category/${cat.slug}`} key={cat.slug} className="mobile-menu__link">
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mobile-menu__section">
                                <p className="mobile-menu__label">Shop by Occasion</p>
                                {occasions.map(occ => (
                                    <Link to={`/category/${occ.slug}`} key={occ.slug} className="mobile-menu__link">
                                        {occ.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mobile-menu__section">
                                <p className="mobile-menu__label">SVN Edit</p>
                                <Link to="/category/svn-edit" className="mobile-menu__link">View Curated Collection</Link>
                            </div>
                            <div className="mobile-menu__section">
                                <Link to="/wishlist" className="mobile-menu__link">♡ Wishlist ({wishlistCount})</Link>
                                <Link to="/cart" className="mobile-menu__link">🛍 Cart ({cartCount})</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
