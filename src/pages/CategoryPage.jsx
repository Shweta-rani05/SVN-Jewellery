import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

export default function CategoryPage() {
    const { slug } = useParams();
    const location = useLocation();
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const searchQuery = searchParams.get('search') || '';

    const isCategorySlug = ['earrings', 'rings', 'necklaces', 'bracelets'].includes(slug);
    
    const [materials, setMaterials] = useState({
        silver: true,
        yellowGold: true,
        roseGold: true,
    });
    
    const [categories, setCategories] = useState({
        earrings: true,
        rings: true,
        necklaces: true,
        bracelets: true,
    });

    useEffect(() => {
        const isCategorySlug = ['earrings', 'rings', 'necklaces', 'bracelets'].includes(slug);
        setCategories({
            earrings: !isCategorySlug || slug === 'earrings',
            rings: !isCategorySlug || slug === 'rings',
            necklaces: !isCategorySlug || slug === 'necklaces',
            bracelets: !isCategorySlug || slug === 'bracelets',
        });
        setMaterials({
            silver: true,
            yellowGold: true,
            roseGold: true,
        });
        setPriceRange([0, 10000]);
    }, [slug, location.search]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by category/occasion/special
        if (slug === 'svn-edit') {
            result = result.filter(p => p.badge === 'SVN Edit' || p.badge === 'Bestseller');
        } else if (slug === 'all') {
            // Show all
        } else if (isCategorySlug) {
            result = result.filter(p => p.category === slug);
        } else if (['daily', 'festive', 'gifting'].includes(slug)) {
            result = result.filter(p => p.occasion.includes(slug));
        }

        // Search Query Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        // Material Filter logic
        result = result.filter(product => {
            const platingLower = (product.materials?.plating || '').toLowerCase();
            const isRoseGold = platingLower.includes('rose gold');
            const isYellowGold = platingLower.includes('yellow gold');
            const isRhodiumOrWhiteGold = platingLower.includes('white gold') || platingLower.includes('rhodium') || platingLower.includes('silver');
            
            if (platingLower.includes('mixed')) {
                return (materials.yellowGold && isYellowGold) || 
                       (materials.roseGold && isRoseGold) || 
                       (materials.silver && isRhodiumOrWhiteGold) ||
                       (materials.yellowGold || materials.roseGold || materials.silver);
            }
            
            if (isRoseGold && materials.roseGold) return true;
            if (isYellowGold && materials.yellowGold) return true;
            if (isRhodiumOrWhiteGold && materials.silver) return true;
            
            if (!isRoseGold && !isYellowGold && !isRhodiumOrWhiteGold && materials.silver) return true;
            
            return false;
        });

        // Category Checkbox Filter logic (only apply if the category slug is NOT the primary route, or let checkboxes work)
        result = result.filter(p => categories[p.category]);

        // Price Filter
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort logic
        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'newest': result.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0)); break;
            default: break;
        }

        return result;
    }, [slug, sortBy, priceRange, materials, categories, searchQuery, isCategorySlug]);

    const titleMap = {
        earrings: 'Earrings',
        rings: 'Rings',
        necklaces: 'Necklaces',
        bracelets: 'Bracelets',
        daily: 'Daily Wear',
        festive: 'Festive Collection',
        gifting: 'Gifting Guide',
        'svn-edit': 'The SVN Edit',
        all: 'All Jewelry',
    };

    let title = titleMap[slug] || 'Collection';
    if (searchQuery) {
        title = `Search Results for "${searchQuery}"`;
    }

    return (
        <div className="category-page section-padding">
            <div className="container">
                <motion.header className="category-header"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                >
                     <h1 className="section-title">{title}</h1>
                     <p className="section-subtitle">
                         {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''} crafted for you
                     </p>
                </motion.header>

                {/* Controls */}
                <div className="category-controls">
                     <button className="category-filter-toggle btn btn-ghost" onClick={() => setFiltersOpen(!filtersOpen)}>
                         <SlidersHorizontal size={16} /> Filters
                     </button>
                     <div className="category-sort">
                         <label>Sort by:</label>
                         <div className="category-sort__select">
                             <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                                 <option value="featured">Featured</option>
                                 <option value="price-low">Price: Low to High</option>
                                 <option value="price-high">Price: High to Low</option>
                                 <option value="rating">Top Rated</option>
                                 <option value="newest">Newest</option>
                             </select>
                             <ChevronDown size={14} />
                         </div>
                     </div>
                </div>

                <div className="category-layout">
                     {/* Sidebar Filters */}
                     <aside className={`category-filters ${filtersOpen ? 'open' : ''}`}>
                         <div className="category-filters__header">
                             <h3>Filters</h3>
                             <button className="category-filters__close" onClick={() => setFiltersOpen(false)}>
                                 <X size={20} />
                             </button>
                         </div>

                         <div className="filter-group">
                             <h4>Price Range</h4>
                             <div className="filter-price-labels">
                                 <span>₹{priceRange[0].toLocaleString()}</span>
                                 <span>₹{priceRange[1].toLocaleString()}</span>
                             </div>
                             <input
                                 type="range"
                                 min="0"
                                 max="10000"
                                 step="500"
                                 value={priceRange[1]}
                                 onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                 className="filter-range"
                             />
                         </div>

                         <div className="filter-group">
                             <h4>Material</h4>
                             <label className="filter-check">
                                 <input 
                                     type="checkbox" 
                                     checked={materials.silver} 
                                     onChange={e => setMaterials(prev => ({ ...prev, silver: e.target.checked }))} 
                                 /> 925 Sterling Silver
                             </label>
                             <label className="filter-check">
                                 <input 
                                     type="checkbox" 
                                     checked={materials.yellowGold} 
                                     onChange={e => setMaterials(prev => ({ ...prev, yellowGold: e.target.checked }))} 
                                 /> 18K Gold Plated
                             </label>
                             <label className="filter-check">
                                 <input 
                                     type="checkbox" 
                                     checked={materials.roseGold} 
                                     onChange={e => setMaterials(prev => ({ ...prev, roseGold: e.target.checked }))} 
                                 /> Rose Gold Plated
                             </label>
                         </div>

                         <div className="filter-group">
                             <h4>Category</h4>
                             <label className="filter-check">
                                 <input 
                                     type="checkbox" 
                                     checked={categories.earrings} 
                                     onChange={e => setCategories(prev => ({ ...prev, earrings: e.target.checked }))} 
                                 /> Earrings
                             </label>
                             <label className="filter-check">
                                 <input 
                                     type="checkbox" 
                                     checked={categories.rings} 
                                     onChange={e => setCategories(prev => ({ ...prev, rings: e.target.checked }))} 
                                 /> Rings
                             </label>
                             <label className="filter-check">
                                 <input 
                                     type="checkbox" 
                                     checked={categories.necklaces} 
                                     onChange={e => setCategories(prev => ({ ...prev, necklaces: e.target.checked }))} 
                                 /> Necklaces
                             </label>
                             <label className="filter-check">
                                 <input 
                                     type="checkbox" 
                                     checked={categories.bracelets} 
                                     onChange={e => setCategories(prev => ({ ...prev, bracelets: e.target.checked }))} 
                                 /> Bracelets
                             </label>
                         </div>
                     </aside>

                    {/* Product Grid */}
                    <div className="category-products">
                        {filteredProducts.length > 0 ? (
                            <div className="product-grid product-grid--3">
                                {filteredProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="category-empty">
                                <p>No products match your filters. Try adjusting your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
