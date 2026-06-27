import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import './OrderSuccessPage.css';

export default function OrderSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, total, name } = location.state || {};

    useEffect(() => {
        // If someone directly navigates to order-success, send them home
        if (!orderId) {
            navigate('/');
        }
    }, [orderId, navigate]);

    if (!orderId) return null;

    return (
        <div className="order-success-page section-padding">
            <div className="container">
                <div className="success-card glass animate-fade-in-up">
                    <div className="success-icon-wrap">
                        <CheckCircle2 className="success-icon" size={72} />
                        <div className="success-icon-pulse" />
                    </div>
                    
                    <h1 className="success-title">Thank You, {name}!</h1>
                    <p className="success-subtitle">Your order has been successfully placed.</p>
                    
                    <div className="gold-divider" style={{ margin: 'var(--space-lg) auto' }} />
                    
                    <div className="order-details">
                        <div className="order-detail-row">
                            <span>Order ID:</span>
                            <strong>{orderId}</strong>
                        </div>
                        <div className="order-detail-row">
                            <span>Total Paid:</span>
                            <strong>₹{total?.toLocaleString()}</strong>
                        </div>
                        <div className="order-detail-row">
                            <span>Estimated Delivery:</span>
                            <strong>3 to 5 business days</strong>
                        </div>
                    </div>
                    
                    <p className="success-info-text">
                        A confirmation email with tracking details has been sent to your email address. 
                        We hope you love your new SVN pieces as much as we loved crafting them.
                    </p>
                    
                    <div className="success-actions">
                        <Link to="/category/all" className="btn btn-primary">
                            Continue Shopping <ShoppingBag size={16} style={{ marginLeft: 8 }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
