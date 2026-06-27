import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Truck, Shield, ChevronRight, Minus, Plus, Info, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import products from '../data/products';
import CareGuideModal from '../components/CareGuideModal';
import ProductCard from '../components/ProductCard';
import './ProductPage.css';

export default function ProductPage() {
    const { slug } = useParams();
    const product = products.find(p => p.slug === slug);
    const { dispatch, isInWishlist, toggleWishlist } = useStore();

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [careOpen, setCareOpen] = useState(false);
    const [careInitialTab, setCareInitialTab] = useState('care');
    const [pincode, setPincode] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [shippingInfo, setShippingInfo] = useState(null);

    if (!product) {
        return (
            <div className="container section-padding" style={{ textAlign: 'center' }}>
                <h2>Product not found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Home</Link>
            </div>
        );
    }

    const allImages = [product.images[0], product.onPersonImage, ...product.images.slice(1)];
    const wishlisted = isInWishlist(product.id);
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: selectedSize || product.sizes[0],
                slug: product.slug,
                quantity,
            },
        });
    };

    const handlePincodeChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
        setPincode(val);
        setPincodeError('');
        setShippingInfo(null);
    };

    const checkShipping = () => {
        if (!/^\d{6}$/.test(pincode)) {
            setPincodeError('Please enter a valid 6-digit pincode');
            setShippingInfo(null);
            return;
        }
        setPincodeError('');
        const total = product.price * quantity;
        const isFree = total >= 2999;
        const days = Math.floor(Math.random() * 3) + 3;
        setShippingInfo({
            available: true,
            deliveryDate: new Date(Date.now() + days * 86400000).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' }),
            cost: isFree ? 0 : 99,
            isFree,
        });
    };

    return (
        <div className="product-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight size={14} />
                    <Link to={`/category/${product.category}`}>{product.category}</Link>
                    <ChevronRight size={14} />
                    <span>{product.name}</span>
                </nav>

                <div className="product-layout">
                    {/* Gallery */}
                    <motion.div className="product-gallery"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="product-gallery__thumbs">
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    className={`product-gallery__thumb ${selectedImage === i ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(i)}
                                >
                                    <img src={img} alt={`${product.name} view ${i + 1}`} loading="lazy" />
                                    {i === 1 && <span className="thumb-label">On Person</span>}
                                </button>
                            ))}
                        </div>
                        <div className="product-gallery__main">
                            <img src={allImages[selectedImage]} alt={product.name} />
                            {product.badge && (
                                <span className="product-page__badge">{product.badge}</span>
                            )}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div className="product-info"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <h1 className="product-info__name">{product.name}</h1>

                        <div className="product-info__rating">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'var(--gold-400)' : 'none'} stroke="var(--gold-400)" />
                            ))}
                            <span>{product.rating}</span>
                            <span className="product-info__reviews">({product.reviews} reviews)</span>
                        </div>

                        <div className="product-info__price">
                            <span className="product-info__current">₹{product.price.toLocaleString()}</span>
                            <span className="product-info__mrp">₹{product.mrp.toLocaleString()}</span>
                            <span className="product-info__discount">{discount}% OFF</span>
                        </div>
                        <p className="product-info__tax">Inclusive of all taxes</p>

                        {/* Material Specs */}
                        <div className="material-specs">
                            <h4 className="material-specs__title">
                                <Shield size={16} /> Material Specifications
                            </h4>
                            <div className="material-specs__grid">
                                <div className="material-spec">
                                    <span className="material-spec__label">Base Metal</span>
                                    <span className="material-spec__value">{product.materials.baseMetal}</span>
                                </div>
                                <div className="material-spec">
                                    <span className="material-spec__label">Plating</span>
                                    <span className="material-spec__value">{product.materials.plating}</span>
                                </div>
                                <div className="material-spec">
                                    <span className="material-spec__label">Stone</span>
                                    <span className="material-spec__value">{product.materials.stone}</span>
                                </div>
                                <div className="material-spec">
                                    <span className="material-spec__label">Weight</span>
                                    <span className="material-spec__value">{product.materials.weight}</span>
                                </div>
                            </div>
                            <div className="material-specs__hallmark">
                                <Shield size={14} />
                                <span>{product.materials.hallmark} — Certified SVN Quality</span>
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="product-info__section">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                                <h4 style={{ margin: 0 }}>Select {product.category === 'rings' ? 'Ring Size' : product.category === 'necklaces' ? 'Chain Length' : 'Size'}</h4>
                                <button 
                                    onClick={() => { setCareInitialTab('size'); setCareOpen(true); }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--gold-400)',
                                        fontSize: '0.8rem',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                        padding: 0
                                    }}
                                >
                                    Size Guide
                                </button>
                            </div>
                            <div className="size-options">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="product-info__section">
                            <h4>Quantity</h4>
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="product-actions">
                            <button className="btn btn-primary product-actions__add" onClick={handleAddToCart}>
                                <ShoppingBag size={18} /> Add to Cart
                            </button>
                            <button className={`product-actions__wishlist ${wishlisted ? 'active' : ''}`}
                                onClick={() => toggleWishlist({
                                    id: product.id, name: product.name, price: product.price,
                                    mrp: product.mrp, image: product.images[0], slug: product.slug,
                                })}
                            >
                                <Heart size={20} fill={wishlisted ? 'var(--gold-400)' : 'none'} />
                            </button>
                        </div>

                        {/* Jewelry Care */}
                        <button className="care-link" onClick={() => { setCareInitialTab('care'); setCareOpen(true); }}>
                            <Info size={14} /> How to Care for Your Jewelry
                        </button>
 
                        {/* Shipping Calculator */}
                        <div className="shipping-calc">
                            <h4><Truck size={16} /> Check Delivery</h4>
                            <div className="shipping-calc__input">
                                <MapPin size={16} />
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit pincode"
                                    value={pincode}
                                    onChange={handlePincodeChange}
                                    maxLength={6}
                                />
                                <button onClick={checkShipping}>Check</button>
                            </div>
                            {pincodeError && (
                                <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '8px', textAlign: 'left' }}>
                                    ⚠️ {pincodeError}
                                </p>
                            )}
                            {shippingInfo && (
                                <div className="shipping-calc__result">
                                    {shippingInfo.available ? (
                                        <>
                                            <p>✅ Delivery by <strong>{shippingInfo.deliveryDate}</strong></p>
                                            <p>Shipping: {shippingInfo.isFree ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `₹${shippingInfo.cost}`}</p>
                                        </>
                                    ) : (
                                        <p className="text-danger">Sorry, delivery not available in this area.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="product-description">
                            <h4>Description</h4>
                            <p>{product.description}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="related-section section-padding">
                        <h2 className="section-title">You May Also Like</h2>
                        <div className="gold-divider" />
                        <div className="product-grid product-grid--4">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <CareGuideModal isOpen={careOpen} onClose={() => setCareOpen(false)} initialTab={careInitialTab} />
        </div>
    );
}
