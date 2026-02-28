import { createContext, useContext, useReducer, useEffect } from 'react';

const StoreContext = createContext();

const initialState = {
    cart: JSON.parse(localStorage.getItem('svn_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('svn_wishlist') || '[]'),
    abandonedCartShown: false,
    promoCode: null,
    promoDiscount: 0,
};

function storeReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.cart.find(
                item => item.id === action.payload.id && item.size === action.payload.size
            );
            if (existing) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id && item.size === action.payload.size
                            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                            : item
                    ),
                };
            }
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }],
            };
        }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(
                    item => !(item.id === action.payload.id && item.size === action.payload.size)
                ),
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id && item.size === action.payload.size
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                ),
            };
        case 'CLEAR_CART':
            return { ...state, cart: [] };
        case 'ADD_TO_WISHLIST': {
            const exists = state.wishlist.find(item => item.id === action.payload.id);
            if (exists) return state;
            return { ...state, wishlist: [...state.wishlist, action.payload] };
        }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item.id !== action.payload.id),
            };
        case 'SET_ABANDONED_CART_SHOWN':
            return { ...state, abandonedCartShown: true };
        case 'APPLY_PROMO':
            if (action.payload.code === 'SVNGLOW5') {
                return { ...state, promoCode: 'SVNGLOW5', promoDiscount: 5 };
            }
            return state;
        case 'REMOVE_PROMO':
            return { ...state, promoCode: null, promoDiscount: 0 };
        default:
            return state;
    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    useEffect(() => {
        localStorage.setItem('svn_cart', JSON.stringify(state.cart));
    }, [state.cart]);

    useEffect(() => {
        localStorage.setItem('svn_wishlist', JSON.stringify(state.wishlist));
    }, [state.wishlist]);

    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const wishlistCount = state.wishlist.length;

    const isInWishlist = (id) => state.wishlist.some(item => item.id === id);
    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
        } else {
            dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
        }
    };

    return (
        <StoreContext.Provider
            value={{
                ...state,
                dispatch,
                cartCount,
                cartTotal,
                wishlistCount,
                isInWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useStore must be used within StoreProvider');
    return context;
}
