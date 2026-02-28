import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { isInWishlist, toggleWishlist, dispatch } = useStore();
    const wishlisted = isInWishlist(product.id);
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: product.sizes[0],
                slug: product.slug,
            },
        });
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            image: product.images[0],
            slug: product.slug,
        });
    };

    return (
        <Link to={`/product/${product.slug}`} className="product-card">
            <div className="product-card__image-wrap">
                <img src={product.images[0]} alt={product.name} loading="lazy" />
                <img src={product.images[1]} alt={product.name} loading="lazy" className="product-card__hover-img" />

                {product.badge && (
                    <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(/\s/g, '-')}`}>
                        {product.badge}
                    </span>
                )}

                {discount > 0 && (
                    <span className="product-card__discount">-{discount}%</span>
                )}

                <button className={`product-card__wishlist ${wishlisted ? 'active' : ''}`} onClick={handleWishlist}>
                    <Heart size={18} fill={wishlisted ? 'var(--gold-400)' : 'none'} />
                </button>

                <div className="product-card__overlay">
                    <button className="btn btn-primary product-card__quick-add" onClick={handleQuickAdd}>
                        <ShoppingBag size={16} /> Quick Add
                    </button>
                </div>
            </div>

            <div className="product-card__info">
                <h4 className="product-card__name">{product.name}</h4>
                <div className="product-card__rating">
                    <Star size={12} fill="var(--gold-400)" stroke="var(--gold-400)" />
                    <span>{product.rating}</span>
                    <span className="product-card__reviews">({product.reviews})</span>
                </div>
                <div className="product-card__price">
                    <span className="product-card__current">₹{product.price.toLocaleString()}</span>
                    <span className="product-card__mrp">₹{product.mrp.toLocaleString()}</span>
                </div>
            </div>
        </Link>
    );
}
