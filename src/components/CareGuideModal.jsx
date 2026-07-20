import { useState, useEffect } from 'react';
import { X, Droplets, Sparkles, ShieldCheck, Package, Ruler } from 'lucide-react';
import './CareGuideModal.css';

export default function CareGuideModal({ isOpen, onClose, initialTab = 'care' }) {
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
        }
    }, [isOpen, initialTab]);

    if (!isOpen) return null;

    return (
        <div className="care-modal__overlay" onClick={onClose}>
            <div className="care-modal glass" onClick={e => e.stopPropagation()}>
                <button className="care-modal__close" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="care-modal__tabs">
                    <button 
                        className={`care-modal__tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                        onClick={() => setActiveTab('care')}
                    >
                        Jewelry Care
                    </button>
                    <button 
                        className={`care-modal__tab-btn ${activeTab === 'size' ? 'active' : ''}`}
                        onClick={() => setActiveTab('size')}
                    >
                        Size Guide
                    </button>
                </div>
                <div className="gold-divider" style={{ margin: '0 auto var(--space-lg)' }} />

                {activeTab === 'care' ? (
                    <div className="care-modal__tips">
                        <div className="care-tip">
                            <div className="care-tip__icon">
                                <Droplets size={22} />
                            </div>
                            <div>
                                <h4>Avoid Moisture</h4>
                                <p>Remove jewelry before showering, swimming, or exercising. Water and sweat can tarnish plating over time.</p>
                            </div>
                        </div>

                        <div className="care-tip">
                            <div className="care-tip__icon">
                                <Sparkles size={22} />
                            </div>
                            <div>
                                <h4>Last On, First Off</h4>
                                <p>Put jewelry on after applying perfume, lotion, and hairspray. Remove it first when undressing.</p>
                            </div>
                        </div>

                        <div className="care-tip">
                            <div className="care-tip__icon">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <h4>Gentle Cleaning</h4>
                                <p>Wipe with a soft microfiber cloth after each wear. For deeper cleaning, use mild soap and lukewarm water.</p>
                            </div>
                        </div>

                        <div className="care-tip">
                            <div className="care-tip__icon">
                                <Package size={22} />
                            </div>
                            <div>
                                <h4>Store Properly</h4>
                                <p>Keep each piece in the SVN pouch or a separate compartment to prevent scratching and tangling.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="size-guide__content">
                        <div className="size-guide__section">
                            <h4><Ruler size={16} /> Rings (Inner Diameter)</h4>
                            <table className="size-table">
                                <thead>
                                    <tr>
                                        <th>US Size</th>
                                        <th>Diameter (mm)</th>
                                        <th>Circumference (mm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>5</td><td>15.7 mm</td><td>49.3 mm</td></tr>
                                    <tr><td>6</td><td>16.5 mm</td><td>51.8 mm</td></tr>
                                    <tr><td>7</td><td>17.3 mm</td><td>54.4 mm</td></tr>
                                    <tr><td>8</td><td>18.2 mm</td><td>56.9 mm</td></tr>
                                    <tr><td>9</td><td>19.0 mm</td><td>59.5 mm</td></tr>
                                    <tr><td>10</td><td>19.8 mm</td><td>62.1 mm</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="size-guide__section" style={{ marginTop: 'var(--space-md)' }}>
                            <h4>📏 Necklaces & Bracelets</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
                                <strong>Necklace Chains:</strong> Available in 16" (choker fit), 18" (standard collarbone fit), and 20" lengths.<br/>
                                <strong>Bracelets:</strong> Standard lengths of 6.5", 7", and 7.5". Cuffs are adjustable.
                            </p>
                        </div>
                    </div>
                )}

                <div className="care-modal__footer">
                    <p>
                        {activeTab === 'care' 
                            ? "With proper care, your SVN jewelry will maintain its glow for years. Each piece comes with a care card and anti-tarnish pouch."
                            : "Still unsure? Feel free to contact our customer support via WhatsApp or email for custom sizing advice."
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
