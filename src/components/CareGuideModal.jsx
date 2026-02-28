import { X, Droplets, Sparkles, ShieldCheck, Package } from 'lucide-react';
import './CareGuideModal.css';

export default function CareGuideModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="care-modal__overlay" onClick={onClose}>
            <div className="care-modal glass" onClick={e => e.stopPropagation()}>
                <button className="care-modal__close" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="care-modal__header">
                    <h3>Jewelry Care Guide</h3>
                    <p>Keep your SVN pieces shining for years</p>
                    <div className="gold-divider" />
                </div>

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

                <div className="care-modal__footer">
                    <p>With proper care, your SVN jewelry will maintain its glow for years. Each piece comes with a care card and anti-tarnish pouch.</p>
                </div>
            </div>
        </div>
    );
}
