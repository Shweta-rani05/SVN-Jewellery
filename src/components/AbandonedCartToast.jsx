import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Gift } from 'lucide-react';
import './AbandonedCartToast.css';

export default function AbandonedCartToast() {
    const { cart, abandonedCartShown, dispatch } = useStore();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (cart.length > 0 && !abandonedCartShown) {
            const timer = setTimeout(() => {
                setVisible(true);
                dispatch({ type: 'SET_ABANDONED_CART_SHOWN' });
            }, 30000); // Show after 30 seconds if items in cart
            return () => clearTimeout(timer);
        }
    }, [cart.length, abandonedCartShown, dispatch]);

    if (!visible) return null;

    return (
        <div className="abandoned-toast animate-fade-in-up">
            <button className="abandoned-toast__close" onClick={() => setVisible(false)}>
                <X size={16} />
            </button>
            <div className="abandoned-toast__icon">
                <Gift size={24} />
            </div>
            <div className="abandoned-toast__content">
                <p className="abandoned-toast__title">Don't forget your picks!</p>
                <p className="abandoned-toast__text">
                    Use code <strong>SVNGLOW5</strong> for 5% off your order ✨
                </p>
            </div>
        </div>
    );
}
