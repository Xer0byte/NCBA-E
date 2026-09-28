import React from 'react';

interface XerobyteLogoProps {
  className?: string;
  size?: number | string;
}

export const XerobyteLogo: React.FC<XerobyteLogoProps> = ({ className = 'h-10 w-auto', size }) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`} style={size ? { height: size } : {}}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <rect width="400" height="300" rx="20" fill="#000000" />
        
        {/* Stylized Arch / Letter A */}
        <path
          d="M200 40 L310 200 L245 200 C240 160 215 135 200 135 C185 135 160 160 155 200 L90 200 Z"
          fill="#FFFFFF"
        />

        {/* Inner Silhouette Hood / Figure */}
        <path
          d="M200 135 C215 135 225 155 225 175 C225 190 220 200 200 200 C180 200 175 190 175 175 C175 155 185 135 200 135 Z"
          fill="#000000"
        />

        {/* Xer0byte Wordmark */}
        <text
          x="120"
          y="265"
          fontFamily="'Times New Roman', serif"
          fontSize="48"
          fontWeight="bold"
          fill="#FFFFFF"
        >
          Xer
        </text>
        <text
          x="195"
          y="265"
          fontFamily="'Times New Roman', serif"
          fontSize="52"
          fontWeight="bold"
          fill="#FF2020"
        >
          0
        </text>
        <text
          x="228"
          y="265"
          fontFamily="'Times New Roman', serif"
          fontSize="48"
          fontWeight="bold"
          fill="#FFFFFF"
        >
          byte
        </text>
      </svg>
    </div>
  );
};
