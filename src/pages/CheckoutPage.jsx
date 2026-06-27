import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';
import './CheckoutPage.css';

export default function CheckoutPage() {
    const { cart, cartTotal, promoDiscount, dispatch } = useStore();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        email: '',
        name: '',
        address: '',
        city: '',
        pincode: '',
        phone: '',
        paymentMethod: 'cod'
    });
    
    const [errors, setErrors] = useState({});

    const shipping = cartTotal >= 2999 ? 0 : 99;
    const discountAmount = promoDiscount ? Math.round(cartTotal * promoDiscount / 100) : 0;
    const total = cartTotal + shipping - discountAmount;

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const errs = {};
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Please enter a valid email address';
        if (!form.name.trim()) errs.name = 'Full name is required';
        if (!form.address.trim()) errs.address = 'Address is required';
        if (!form.city.trim()) errs.city = 'City is required';
        if (!form.pincode.match(/^\d{6}$/)) errs.pincode = 'Please enter a valid 6-digit pincode';
        if (!form.phone.match(/^\d{10}$/)) errs.phone = 'Please enter a valid 10-digit mobile number';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Generate a random order ID and navigate
            const orderId = 'SVN-' + Math.floor(100000 + Math.random() * 900000);
            dispatch({ type: 'CLEAR_CART' });
            navigate('/order-success', { state: { orderId, total, name: form.name } });
        }
    };

    return (
        <div className="checkout-page section-padding">
            <div className="container">
                <h1 className="section-title">Checkout</h1>
                <div className="checkout-layout">
                    {/* Form */}
                    <form className="checkout-form glass" onSubmit={handleSubmit}>
                        <h3>Contact Information</h3>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={errors.email ? 'input-error' : ''}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <h3>Shipping Address</h3>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Shweta Rani"
                                className={errors.name ? 'input-error' : ''}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Apartment, suite, unit, street address"
                                className={errors.address ? 'input-error' : ''}
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="Mumbai"
                                    className={errors.city ? 'input-error' : ''}
                                />
                                {errors.city && <span className="error-text">{errors.city}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pincode">Pincode</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    placeholder="400001"
                                    maxLength={6}
                                    className={errors.pincode ? 'input-error' : ''}
                                />
                                {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="9876543210"
                                maxLength={10}
                                className={errors.phone ? 'input-error' : ''}
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        <h3>Payment Method</h3>
                        <div className="payment-options">
                            <label className={`payment-option ${form.paymentMethod === 'cod' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={form.paymentMethod === 'cod'}
                                    onChange={handleChange}
                                />
                                <div className="payment-option__details">
                                    <Truck size={18} />
                                    <div>
                                        <strong>Cash on Delivery (COD)</strong>
                                        <p>Pay with cash upon delivery. Extra ₹49 fee waived.</p>
                                    </div>
                                </div>
                            </label>

                            <label className={`payment-option ${form.paymentMethod === 'card' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={form.paymentMethod === 'card'}
                                    onChange={handleChange}
                                />
                                <div className="payment-option__details">
                                    <CreditCard size={18} />
                                    <div>
                                        <strong>UPI / Credit Card / Debit Card</strong>
                                        <p>Pay securely via standard gateways. 256-bit SSL encrypted.</p>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-checkout-submit">
                            Place Order (₹{total.toLocaleString()})
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="checkout-summary glass">
                        <h3>Your Order</h3>
                        <div className="checkout-summary__items">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.size}`} className="checkout-summary__item">
                                    <div className="checkout-summary__item-info">
                                        <img src={item.image} alt={item.name} />
                                        <div>
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-qty-size">Qty: {item.quantity} | Size: {item.size}</p>
                                        </div>
                                    </div>
                                    <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="checkout-summary__lines">
                            <div className="checkout-summary__line">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="checkout-summary__line">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>FREE</span> : `₹${shipping}`}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="checkout-summary__line checkout-summary__line--discount">
                                    <span>Discount</span>
                                    <span>-₹{discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="checkout-summary__divider" />
                            <div className="checkout-summary__line checkout-summary__line--total">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="checkout-summary__trust">
                            <ShieldCheck size={16} />
                            <span>BIS 925 Hallmarked Certified Quality</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
