import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ShoppingBag, Shield, Truck, RotateCcw, Lock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import products, { categories, occasions, instagramPosts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

/* ---- SVG Monogram Animation Component ---- */
function MonogramAnimation() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="monogram-section section-padding" ref={ref}>
            <div className="container">
                <div className="monogram-grid">
                    <div className="monogram-svg-wrap">
                        <svg viewBox="0 0 400 200" className={`monogram-svg ${isInView ? 'animate' : ''}`}>
                            {/* S */}
                            <path
                                className="monogram-letter monogram-letter--s"
                                d="M 60 40 C 60 40, 120 20, 120 60 C 120 90, 50 80, 50 110 C 50 150, 130 160, 130 120"
                                fill="none" stroke="white" strokeWidth="3"
                                strokeDasharray="400" strokeDashoffset="400"
                            />
                            {/* V */}
                            <path
                                className="monogram-letter monogram-letter--v"
                                d="M 150 40 L 195 160 L 240 40"
                                fill="none" stroke="white" strokeWidth="3"
                                strokeDasharray="300" strokeDashoffset="300"
                            />
                            {/* N */}
                            <path
                                className="monogram-letter monogram-letter--n"
                                d="M 270 160 L 270 40 L 350 160 L 350 40"
                                fill="none" stroke="white" strokeWidth="3"
                                strokeDasharray="400" strokeDashoffset="400"
                            />
                            {/* Interlocking decorative line */}
                            <line
                                className="monogram-line"
                                x1="40" y1="100" x2="370" y2="100"
                                stroke="var(--gold-400)" strokeWidth="1.5"
                                strokeDasharray="330" strokeDashoffset="330"
                            />
                        </svg>
                    </div>
                    <div className={`monogram-story ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: isInView ? 1 : 0 }}>
                        <h2>The SVN Monogram</h2>
                        <div className="gold-divider" style={{ margin: '16px 0 24px' }} />
                        <p>
                            Three letters, one identity. The SVN monogram is more than a logo — it's a seal of
                            craftsmanship, authenticity, and modern elegance. Each letter intertwines to represent
                            the bond between the wearer and the piece they choose.
                        </p>
                        <p>
                            Born from the idea that jewelry should tell a story, SVN was founded to bridge the gap
                            between high-end luxury and accessible demi-fine jewelry. Every piece carries this monogram
                            as a promise of quality.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---- Hero Section ---- */
function HeroSection() {
    return (
        <section className="hero">
            <div className="hero__video-wrap">
                <video
                    autoPlay muted loop playsInline
                    poster="https://images.unsplash.com/photo-1515562141589-67f0d569b74e?w=1920&q=80"
                    className="hero__video"
                >
                    <source src="/hero-jewelry.mp4" type="video/mp4" />
                </video>
                <div className="hero__overlay" />
            </div>

            <div className="hero__content container">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="hero__text"
                >
                    <div className="hero__monogram">
                        <svg viewBox="0 0 200 80" className="hero__logo-svg">
                            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                                fontFamily="Playfair Display, serif" fontSize="60" fontWeight="600" fill="white"
                                letterSpacing="12">SVN</text>
                        </svg>
                    </div>
                    <div className="hero__tagline-ribbon">
                        <span>Wear Your Glow</span>
                    </div>
                    <p className="hero__subtitle">
                        Demi-fine jewelry crafted for the modern you — where botanical elegance meets contemporary design.
                    </p>
                    <div className="hero__ctas">
                        <Link to="/category/necklaces" className="btn btn-primary">
                            Explore Collection <ArrowRight size={16} />
                        </Link>
                        <Link to="/category/svn-edit" className="btn btn-outline">
                            Shop SVN Edit
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className="hero__scroll-indicator">
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}

/* ---- Shop by Category ---- */
function CategorySection() {
    return (
        <section className="categories-section section-padding">
            <div className="container">
                <h2 className="section-title">Shop by Category</h2>
                <p className="section-subtitle">Find your signature piece in our curated collections</p>
                <div className="categories-grid">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Link to={`/category/${cat.slug}`} className="category-card">
                                <div className="category-card__img-wrap">
                                    <img src={cat.image} alt={cat.name} loading="lazy" />
                                    <div className="category-card__overlay" />
                                </div>
                                <div className="category-card__content">
                                    <h3>{cat.name}</h3>
                                    <span className="category-card__cta">Shop Now <ArrowRight size={14} /></span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---- Shop the Look ---- */
function ShopTheLookSection() {
    const tags = [
        { name: 'Chains', slug: 'chains', x: 18, y: 18, lineEndX: 38, lineEndY: 28 },
        { name: 'Earrings', slug: 'earrings', x: 72, y: 22, lineEndX: 62, lineEndY: 35 },
        { name: 'Rings', slug: 'rings', x: 12, y: 48, lineEndX: 35, lineEndY: 45 },
        { name: 'Pendants', slug: 'pendants', x: 72, y: 62, lineEndX: 58, lineEndY: 55 },
        { name: 'Bracelets', slug: 'bracelets', x: 10, y: 76, lineEndX: 38, lineEndY: 60 },
    ];

    return (
        <section className="shop-look section-padding">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Shop the Look
                </motion.h2>
                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Elevate your style game
                </motion.p>

                <motion.div
                    className="shop-look__wrapper"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Model Image */}
                    <div className="shop-look__image-wrap">
                        <img
                            src="/shop-the-look.png"
                            alt="Model wearing SVN jewelry collection"
                            className="shop-look__image"
                        />
                    </div>

                    {/* SVG Connector Lines */}
                    <svg className="shop-look__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {tags.map(tag => (
                            <line
                                key={tag.slug}
                                x1={`${tag.x + 6}%`}
                                y1={`${tag.y + 2}%`}
                                x2={`${tag.lineEndX}%`}
                                y2={`${tag.lineEndY}%`}
                                className="shop-look__connector"
                            />
                        ))}
                    </svg>

                    {/* Category Tags */}
                    {tags.map((tag, i) => (
                        <Link
                            key={tag.slug}
                            to={`/category/${tag.slug}`}
                            className="shop-look__tag"
                            style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                        >
                            <span>{tag.name}</span>
                            <ArrowRight size={14} />
                        </Link>
                    ))}

                    {/* Dot Indicators at line endpoints */}
                    {tags.map(tag => (
                        <span
                            key={`dot-${tag.slug}`}
                            className="shop-look__dot"
                            style={{ left: `${tag.lineEndX}%`, top: `${tag.lineEndY}%` }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ---- Shop by Occasion ---- */
function OccasionSection() {
    return (
        <section className="occasion-section section-padding bg-gradient-radial">
            <div className="container">
                <h2 className="section-title">Shop by Occasion</h2>
                <p className="section-subtitle">The perfect piece for every moment</p>
                <div className="occasion-grid">
                    {occasions.map((occ, i) => (
                        <motion.div
                            key={occ.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                        >
                            <Link to={`/category/${occ.slug}`} className="occasion-card">
                                <img src={occ.image} alt={occ.name} loading="lazy" />
                                <div className="occasion-card__overlay">
                                    <h3>{occ.name}</h3>
                                    <p>{occ.subtitle}</p>
                                    <span className="btn btn-outline occasion-card__btn">Explore</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---- SVN Edit (Bestsellers Carousel) ---- */
function SVNEditSection() {
    const scrollRef = useRef(null);
    const editProducts = products.filter(p => p.badge === 'SVN Edit' || p.badge === 'Bestseller');

    const scroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
        }
    };

    return (
        <section className="svn-edit-section section-padding">
            <div className="container">
                <div className="svn-edit-header">
                    <div>
                        <h2 className="section-title" style={{ textAlign: 'left' }}>The SVN Edit</h2>
                        <p style={{ color: 'var(--white-50)', fontSize: '0.9rem' }}>Our curated selection of bestsellers & favorites</p>
                    </div>
                    <div className="svn-edit-controls">
                        <button className="carousel-btn" onClick={() => scroll(-1)}><ChevronLeft size={20} /></button>
                        <button className="carousel-btn" onClick={() => scroll(1)}><ChevronRight size={20} /></button>
                    </div>
                </div>
            </div>
            <div className="svn-edit-carousel" ref={scrollRef}>
                <div className="svn-edit-carousel__track">
                    {editProducts.map(product => (
                        <div key={product.id} className="svn-edit-carousel__item">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---- Shop the Instagram ---- */
function InstagramSection() {
    return (
        <section className="instagram-section section-padding bg-gradient-cobalt">
            <div className="container">
                <h2 className="section-title">Shop the Look</h2>
                <p className="section-subtitle">Follow @svnjewelry for daily inspiration</p>
                <div className="instagram-grid">
                    {instagramPosts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                            <Link to={`/product/${products.find(p => p.id === post.productId)?.slug || ''}`} className="instagram-card">
                                <img src={post.image} alt="Instagram post" loading="lazy" />
                                <div className="instagram-card__overlay">
                                    <ShoppingBag size={24} />
                                    <span>Shop This Look</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        Follow @svnjewelry
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ---- Trust Bar ---- */
function TrustBar() {
    const trustItems = [
        { icon: <Truck size={28} />, title: 'Free Shipping', desc: 'On orders above ₹2,999' },
        { icon: <Shield size={28} />, title: 'BIS Hallmarked', desc: 'Certified 925 silver' },
        { icon: <RotateCcw size={28} />, title: '30-Day Returns', desc: 'Hassle-free exchanges' },
        { icon: <Lock size={28} />, title: 'Secure Payments', desc: '256-bit SSL encrypted' },
    ];

    return (
        <section className="trust-bar-section">
            <div className="container">
                <div className="trust-bar-grid">
                    {trustItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="trust-bar-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className="trust-bar-item__icon">{item.icon}</div>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---- Featured Products Section ---- */
function FeaturedSection() {
    const featured = products.filter(p => p.badge === 'New Arrival').slice(0, 4);

    return (
        <section className="featured-section section-padding">
            <div className="container">
                <h2 className="section-title">New Arrivals</h2>
                <p className="section-subtitle">Fresh designs just added to the collection</p>
                <div className="product-grid product-grid--4">
                    {featured.map(product => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
                    <Link to="/category/all" className="btn btn-outline">
                        View All Products <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ---- Authenticity Section ---- */
function AuthenticitySection() {
    return (
        <section className="authenticity-section section-padding">
            <div className="container">
                <div className="authenticity-card glass">
                    <div className="authenticity-seal">
                        <div className="authenticity-seal__inner">
                            <Shield size={32} />
                            <span>Certified</span>
                            <strong>SVN Quality</strong>
                        </div>
                    </div>
                    <div className="authenticity-content">
                        <h2>Promise of Authenticity</h2>
                        <div className="gold-divider" style={{ margin: '12px 0 20px' }} />
                        <p>
                            Every SVN piece comes with a certificate of authenticity. Our jewelry is crafted with
                            BIS Hallmarked 925 Sterling Silver and finished with premium gold plating (minimum 2.0 microns).
                        </p>
                        <div className="authenticity-badges">
                            <span className="auth-badge">BIS 925 Hallmarked</span>
                            <span className="auth-badge">18K Gold Plated</span>
                            <span className="auth-badge">Hypoallergenic</span>
                            <span className="auth-badge">Nickel-Free</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


/* ---- HomePage Composition ---- */
export default function HomePage() {
    return (
        <div className="home-page">
            <HeroSection />
            <TrustBar />
            <CategorySection />
            <ShopTheLookSection />
            <MonogramAnimation />
            <FeaturedSection />
            <OccasionSection />
            <SVNEditSection />
            <AuthenticitySection />
            <InstagramSection />
        </div>
    );
}
