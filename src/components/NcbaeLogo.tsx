import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const NcbaeLogo: React.FC<LogoProps> = ({ className = 'h-24 md:h-28 w-auto', size }) => {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`} style={size ? { height: size } : {}}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto drop-shadow-md hover:scale-105 transition-transform duration-300"
      >
        <defs>
          <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBF77" />
            <stop offset="50%" stopColor="#C99E4B" />
            <stop offset="100%" stopColor="#8A6724" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B2F8E" />
            <stop offset="100%" stopColor="#671969" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B7A38" />
            <stop offset="100%" stopColor="#0F4C22" />
          </linearGradient>
          <clipPath id="shieldClip">
            <path d="M10 10 H190 V140 C190 190 100 230 100 230 C100 230 10 190 10 140 Z" />
          </clipPath>
        </defs>

        {/* Shield Outer Golden Border */}
        <path
          d="M10 10 H190 V140 C190 190 100 230 100 230 C100 230 10 190 10 140 Z"
          fill="#DFBF77"
          stroke="#C99E4B"
          strokeWidth="3"
        />

        {/* Shield Inner Content (Clipped) */}
        <g clipPath="url(#shieldClip)">
          {/* Header Banner Background */}
          <rect x="10" y="10" width="180" height="42" fill="#E8CD8C" />
          
          {/* NCBA&E Gothic Text */}
          <text
            x="100"
            y="38"
            fontFamily="'Cinzel', 'Old English Text MT', Georgia, serif"
            fontSize="26"
            fontWeight="bold"
            fill="#1A1A1A"
            textAnchor="middle"
            letterSpacing="2"
          >
            NCBA&E
          </text>

          {/* Banner Border Line */}
          <line x1="10" y1="52" x2="190" y2="52" stroke="#8A6724" strokeWidth="2.5" />

          {/* Checkered / Diamond Quadrants Background */}
          {/* Left top quadrant: Green */}
          <path d="M10 52 L100 140 L10 220 Z" fill="url(#greenGrad)" />
          {/* Right top quadrant: Green */}
          <path d="M190 52 L100 140 L190 220 Z" fill="url(#greenGrad)" />
          {/* Top center triangle: Purple */}
          <path d="M10 52 L190 52 L100 140 Z" fill="url(#purpleGrad)" />
          {/* Bottom center area: Purple */}
          <path d="M100 140 L10 220 C40 232 100 235 100 235 C100 235 160 232 190 220 Z" fill="url(#purpleGrad)" />

          {/* Golden Cross Dividers */}
          <line x1="10" y1="52" x2="190" y2="230" stroke="#DFBF77" strokeWidth="4" />
          <line x1="190" y1="52" x2="10" y2="230" stroke="#DFBF77" strokeWidth="4" />

          {/* Elements on Shield */}
          {/* Top Left: Star */}
          <g transform="translate(60, 95) scale(0.65)">
            <polygon
              points="0,-25 7,-7 25,-7 11,4 16,22 0,11 -16,22 -11,4 -25,-7 -7,-7"
              fill="#DFBF77"
              stroke="#8A6724"
              strokeWidth="1"
            />
          </g>

          {/* Top Right: Eagle */}
          <g transform="translate(140, 95) scale(0.7)">
            <path
              d="M-15,-10 C-5,-20 15,-18 20,-10 C15,-5 12,5 5,12 C-5,5 -10,0 -15,-10 Z M-20,-8 C-10,-5 -5,5 -2,15 C-12,12 -18,5 -20,-8 Z"
              fill="#DFBF77"
            />
          </g>

          {/* Center: Four Leaf Clover */}
          <g transform="translate(100, 140) scale(0.65)">
            {/* 4 petals */}
            <circle cx="-10" cy="-10" r="9" fill="#E8CD8C" />
            <circle cx="10" cy="-10" r="9" fill="#E8CD8C" />
            <circle cx="-10" cy="10" r="9" fill="#E8CD8C" />
            <circle cx="10" cy="10" r="9" fill="#E8CD8C" />
            <path d="M0,0 Q-4,15 0,20" stroke="#E8CD8C" strokeWidth="3" fill="none" />
          </g>

          {/* Bottom Left: Eagle */}
          <g transform="translate(60, 185) scale(0.7)">
            <path
              d="M-15,-10 C-5,-20 15,-18 20,-10 C15,-5 12,5 5,12 C-5,5 -10,0 -15,-10 Z M-20,-8 C-10,-5 -5,5 -2,15 C-12,12 -18,5 -20,-8 Z"
              fill="#DFBF77"
            />
          </g>

          {/* Bottom Right: Star */}
          <g transform="translate(140, 185) scale(0.65)">
            <polygon
              points="0,-25 7,-7 25,-7 11,4 16,22 0,11 -16,22 -11,4 -25,-7 -7,-7"
              fill="#DFBF77"
              stroke="#8A6724"
              strokeWidth="1"
            />
          </g>
        </g>

        {/* Outer Highlight Rim */}
        <path
          d="M10 10 H190 V140 C190 190 100 230 100 230 C100 230 10 190 10 140 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
};
