import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './CartPage.css';

export default function CartPage() {
    const { cart, cartTotal, promoCode, promoDiscount, dispatch } = useStore();
    const [promoInput, setPromoInput] = useState('');
    const [promoError, setPromoError] = useState('');

    const shipping = cartTotal >= 2999 ? 0 : 99;
    const discountAmount = promoDiscount ? Math.round(cartTotal * promoDiscount / 100) : 0;
    const total = cartTotal + shipping - discountAmount;

    const handlePromo = (e) => {
        e.preventDefault();
        if (promoInput.toUpperCase() === 'SVNGLOW5') {
            dispatch({ type: 'APPLY_PROMO', payload: { code: promoInput.toUpperCase() } });
            setPromoError('');
        } else {
            setPromoError('Invalid promo code');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page section-padding">
                <div className="container">
                    <div className="cart-empty">
                        <ShoppingBag size={64} strokeWidth={1} />
                        <h2>Your Bag is Empty</h2>
                        <p>Looks like you haven't added any pieces yet.</p>
                        <Link to="/" className="btn btn-primary">
                            Start Shopping <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page section-padding">
            <div className="container">
                <motion.h1 className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Shopping Bag
                </motion.h1>
                <p className="section-subtitle">{cart.length} item{cart.length !== 1 ? 's' : ''} in your bag</p>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {cart.map((item, i) => (
                            <motion.div key={`${item.id}-${item.size}`} className="cart-item glass"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link to={`/product/${item.slug}`} className="cart-item__img">
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <div className="cart-item__details">
                                    <div className="cart-item__top">
                                        <div>
                                            <Link to={`/product/${item.slug}`} className="cart-item__name">{item.name}</Link>
                                            <p className="cart-item__size">Size: {item.size}</p>
                                        </div>
                                        <button className="cart-item__remove"
                                            onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id, size: item.size } })}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <div className="cart-item__bottom">
                                        <div className="cart-item__qty">
                                            <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, size: item.size, quantity: item.quantity - 1 } })}>
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, size: item.size, quantity: item.quantity + 1 } })}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="cart-item__price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary */}
                    <motion.div className="cart-summary glass"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Order Summary</h3>
                        <div className="cart-summary__lines">
                            <div className="cart-summary__line">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="cart-summary__line">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>FREE</span> : `₹${shipping}`}</span>
                            </div>
                            {promoDiscount > 0 && (
                                <div className="cart-summary__line cart-summary__line--discount">
                                    <span>
                                        Promo ({promoCode})
                                        <button onClick={() => dispatch({ type: 'REMOVE_PROMO' })} style={{ marginLeft: 8, color: 'var(--white-30)' }}><X size={12} /></button>
                                    </span>
                                    <span>-₹{discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="cart-summary__divider" />
                            <div className="cart-summary__line cart-summary__line--total">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Promo Code */}
                        {!promoCode && (
                            <form className="cart-promo" onSubmit={handlePromo}>
                                <div className="cart-promo__input">
                                    <Tag size={16} />
                                    <input
                                        type="text"
                                        placeholder="Enter promo code"
                                        value={promoInput}
                                        onChange={e => setPromoInput(e.target.value)}
                                    />
                                    <button type="submit">Apply</button>
                                </div>
                                {promoError && <p className="cart-promo__error">{promoError}</p>}
                            </form>
                        )}

                        {shipping > 0 && (
                            <p className="cart-summary__free-ship">
                                Add ₹{(2999 - cartTotal).toLocaleString()} more for free shipping
                            </p>
                        )}

                        <button className="btn btn-primary cart-summary__checkout">
                            Proceed to Checkout
                        </button>

                        <div className="cart-summary__trust">
                            <span>🔒 Secure Checkout</span>
                            <span>🛡️ BIS Hallmarked</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
