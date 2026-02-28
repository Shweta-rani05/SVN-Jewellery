import './SVNLogo.css';

/**
 * SVN Brand Logo — inline SVG recreation of the brand identity.
 * Deep royal blue circle, watercolor botanical leaves, white serif SVN,
 * black "Wear Your Glow" ribbon. Renders at any size with zero raster artifacts.
 *
 * @param {'sm'|'md'|'lg'} size - sm (navbar), md (footer), lg (hero)
 */
export default function SVNLogo({ size = 'md', className = '' }) {
    return (
        <div className={`svn-logo svn-logo--${size} ${className}`}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="SVN — Wear Your Glow">
                <defs>
                    {/* Deep blue radial gradient for the main circle */}
                    <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b5dba" />
                        <stop offset="40%" stopColor="#2d4a9e" />
                        <stop offset="80%" stopColor="#1e3a8a" />
                        <stop offset="100%" stopColor="#15297a" />
                    </radialGradient>

                    {/* Darker blue for leaf overlays */}
                    <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a3370" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0e2055" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="leafGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#132d6b" stopOpacity="0.7" />
                    </linearGradient>

                    {/* Clip to circle */}
                    <clipPath id="circleClip">
                        <circle cx="100" cy="100" r="95" />
                    </clipPath>
                </defs>

                {/* Main blue circle */}
                <circle cx="100" cy="100" r="95" fill="url(#circleGrad)" />

                <g clipPath="url(#circleClip)">
                    {/* Botanical leaves — left branch */}
                    <g fill="url(#leafGrad1)" opacity="0.65">
                        {/* Left branch stem */}
                        <path d="M 25 180 Q 40 140, 55 105 Q 60 90, 65 75 Q 70 60, 60 40"
                            fill="none" stroke="#1a3370" strokeWidth="2.5" opacity="0.8" />
                        {/* Leaves along the left branch */}
                        <ellipse cx="38" cy="160" rx="18" ry="8" transform="rotate(-30, 38, 160)" />
                        <ellipse cx="32" cy="145" rx="16" ry="6" transform="rotate(-50, 32, 145)" />
                        <ellipse cx="42" cy="130" rx="14" ry="5.5" transform="rotate(-20, 42, 130)" />
                        <ellipse cx="48" cy="115" rx="13" ry="5" transform="rotate(-40, 48, 115)" />
                        <ellipse cx="55" cy="100" rx="12" ry="5" transform="rotate(-25, 55, 100)" />
                        <ellipse cx="58" cy="85" rx="11" ry="4.5" transform="rotate(-45, 58, 85)" />
                        <ellipse cx="60" cy="70" rx="10" ry="4" transform="rotate(-30, 60, 70)" />
                        <ellipse cx="58" cy="55" rx="9" ry="3.5" transform="rotate(-50, 58, 55)" />
                        {/* Berry clusters */}
                        <circle cx="52" cy="40" r="3" opacity="0.7" />
                        <circle cx="58" cy="35" r="2.5" opacity="0.6" />
                        <circle cx="48" cy="36" r="2" opacity="0.5" />
                    </g>

                    {/* Botanical leaves — right branch */}
                    <g fill="url(#leafGrad2)" opacity="0.55">
                        <path d="M 175 175 Q 160 140, 148 110 Q 142 90, 140 75 Q 138 55, 145 35"
                            fill="none" stroke="#1e3a8a" strokeWidth="2" opacity="0.7" />
                        <ellipse cx="165" cy="155" rx="17" ry="7" transform="rotate(35, 165, 155)" />
                        <ellipse cx="158" cy="140" rx="15" ry="6" transform="rotate(50, 158, 140)" />
                        <ellipse cx="152" cy="125" rx="13" ry="5.5" transform="rotate(25, 152, 125)" />
                        <ellipse cx="148" cy="110" rx="12" ry="5" transform="rotate(40, 148, 110)" />
                        <ellipse cx="144" cy="95" rx="11" ry="4.5" transform="rotate(30, 144, 95)" />
                        <ellipse cx="142" cy="80" rx="10" ry="4" transform="rotate(45, 142, 80)" />
                        <ellipse cx="140" cy="65" rx="9" ry="3.5" transform="rotate(35, 140, 65)" />
                        <ellipse cx="142" cy="50" rx="8" ry="3" transform="rotate(50, 142, 50)" />
                    </g>

                    {/* Thin horizontal lines through the SVN text */}
                    <line x1="25" y1="92" x2="175" y2="92" stroke="white" strokeWidth="0.6" opacity="0.5" />
                    <line x1="25" y1="108" x2="175" y2="108" stroke="white" strokeWidth="0.6" opacity="0.5" />

                    {/* SVN Text — large, white, serif */}
                    <text
                        x="100" y="102"
                        textAnchor="middle" dominantBaseline="central"
                        fontFamily="'Playfair Display', 'Cormorant Garamond', 'Georgia', serif"
                        fontSize="52" fontWeight="600" fill="white" letterSpacing="4"
                    >
                        SVN
                    </text>

                    {/* "Wear Your Glow" ribbon — angled black banner */}
                    <g transform="rotate(-4, 100, 106)">
                        <rect x="38" y="96" width="124" height="22" rx="1" fill="black" />
                        <text
                            x="100" y="109"
                            textAnchor="middle" dominantBaseline="central"
                            fontFamily="'Cormorant Garamond', 'Georgia', cursive, serif"
                            fontSize="13" fontWeight="400" fontStyle="italic" fill="white" letterSpacing="1"
                        >
                            Wear Your Glow
                        </text>
                    </g>
                </g>

                {/* Subtle outer ring for polish */}
                <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </svg>
        </div>
    );
}
