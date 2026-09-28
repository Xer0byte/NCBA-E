import React, { useState } from 'react';
import generatedLogo from '../assets/images/ncbae_crest_logo_1790560782051.jpg';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  alt?: string;
}

export const NcbaeLogoImage: React.FC<LogoProps> = ({
  className = '',
  style,
  onClick,
  alt = 'NCBA&E Logo',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''}`}
      style={{ display: 'inline-flex', verticalAlign: 'middle', ...style }}
    >
      {!imgError ? (
        <img
          src={generatedLogo}
          alt={alt}
          className={className}
          style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%', borderRadius: '8px' }}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      ) : (
        <svg
          viewBox="0 0 400 450"
          className={className}
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        >
          <defs>
            <clipPath id="shield">
              <path d="M 20 20 L 380 20 L 380 280 C 380 370 200 430 200 430 C 200 430 20 370 20 280 Z" />
            </clipPath>
          </defs>
          <path
            d="M 20 20 L 380 20 L 380 280 C 380 370 200 430 200 430 C 200 430 20 370 20 280 Z"
            fill="#DFC076"
            stroke="#B88F3A"
            strokeWidth="6"
          />
          <g clipPath="url(#shield)">
            <rect x="20" y="20" width="360" height="75" fill="#E8CD86" />
            <text
              x="200"
              y="72"
              fontFamily="'Cinzel', serif"
              fontSize="46"
              fontWeight="bold"
              fill="#0D0D0D"
              textAnchor="middle"
              letterSpacing="4"
            >
              NCBA&E
            </text>
            <path d="M 20 95 L 380 95 L 200 245 Z" fill="#751A70" />
            <path d="M 200 245 L 20 400 L 200 435 L 380 400 Z" fill="#751A70" />
            <path d="M 20 95 L 200 245 L 20 400 Z" fill="#14662E" />
            <path d="M 380 95 L 200 245 L 380 400 Z" fill="#14662E" />
            <line x1="20" y1="95" x2="380" y2="400" stroke="#DFC076" strokeWidth="8" />
            <line x1="380" y1="95" x2="20" y2="400" stroke="#DFC076" strokeWidth="8" />
          </g>
        </svg>
      )}
    </div>
  );
};
