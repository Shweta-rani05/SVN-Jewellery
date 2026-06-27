import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import products from '../data/products';
import './WishlistPage.css';

export default function WishlistPage() {
    const { wishlist, dispatch, toggleWishlist } = useStore();

    const moveToCart = (item) => {
        const fullProduct = products.find(p => p.id === item.id);
        const defaultSize = fullProduct && fullProduct.sizes && fullProduct.sizes.length > 0
            ? fullProduct.sizes[0]
            : 'One Size';

        dispatch({
            type: 'ADD_TO_CART',
            payload: { id: item.id, name: item.name, price: item.price, image: item.image, size: defaultSize, slug: item.slug },
        });
        toggleWishlist(item);
    };

    if (wishlist.length === 0) {
        return (
            <div className="wishlist-page section-padding">
                <div className="container">
                    <div className="wishlist-empty">
                        <Heart size={64} strokeWidth={1} />
                        <h2>Your Wishlist is Empty</h2>
                        <p>Save pieces you love and come back to them later.</p>
                        <Link to="/" className="btn btn-primary">
                            Explore Collection <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page section-padding">
            <div className="container">
                <motion.h1 className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Your Wishlist
                </motion.h1>
                <p className="section-subtitle">{wishlist.length} piece{wishlist.length !== 1 ? 's' : ''} saved</p>

                <div className="wishlist-grid">
                    {wishlist.map((item, i) => (
                        <motion.div key={item.id} className="wishlist-card glass"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <button className="wishlist-card__remove" onClick={() => toggleWishlist(item)}>
                                <X size={16} />
                            </button>
                            <Link to={`/product/${item.slug}`} className="wishlist-card__img">
                                <img src={item.image} alt={item.name} />
                            </Link>
                            <div className="wishlist-card__info">
                                <Link to={`/product/${item.slug}`} className="wishlist-card__name">{item.name}</Link>
                                <div className="wishlist-card__price">
                                    <span>₹{item.price?.toLocaleString()}</span>
                                    {item.mrp && <span className="wishlist-card__mrp">₹{item.mrp.toLocaleString()}</span>}
                                </div>
                                <button className="btn btn-primary wishlist-card__add" onClick={() => moveToCart(item)}>
                                    <ShoppingBag size={14} /> Move to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
