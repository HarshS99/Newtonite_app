import React from 'react';
import type { MascotState } from '../../types';

interface SproutMascotProps {
  state?: MascotState;
  size?: number;
  className?: string;
  showShadow?: boolean;
}

export const SproutMascot: React.FC<SproutMascotProps> = ({
  state = 'welcome',
  size = 120,
  className = '',
  showShadow = true,
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300"
        role="img"
        aria-label={`Sprout Mascot - ${state} state`}
      >
        <defs>
          {/* Subtle gradients */}
          <linearGradient id="leafGradPrimary" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#25895B" />
            <stop offset="100%" stopColor="#176B45" />
          </linearGradient>
          <linearGradient id="leafGradSecondary" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#44B77F" />
            <stop offset="100%" stopColor="#228557" />
          </linearGradient>
          <linearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2EDE6" />
            <stop offset="100%" stopColor="#CFDFD5" />
          </linearGradient>
        </defs>

        {/* 1. Base Soil / Pot: Rounded geometric pebble */}
        <g id="sprout-base">
          <ellipse cx="80" cy="132" rx="36" ry="12" fill="#E2ECE5" />
          <path
            d="M52 120 C52 135 108 135 108 120 C108 116 52 116 52 120 Z"
            fill="url(#potGrad)"
            stroke="#BDD3C5"
            strokeWidth="1.5"
          />
          <ellipse cx="80" cy="118" rx="28" ry="6" fill="#3D4F44" />
        </g>

        {/* 2. Main Stem */}
        <path
          d="M80 118 C80 92 78 76 80 58"
          stroke="#176B45"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 3. Leaves according to state */}
        {state === 'welcome' && (
          <g id="leaves-welcome" className="animate-sprout-bob">
            {/* Left Leaf - Resting */}
            <path
              d="M79 82 C55 80 44 65 48 48 C66 48 76 68 79 82 Z"
              fill="url(#leafGradPrimary)"
            />
            {/* Right Leaf - Waving cheerfully */}
            <path
              d="M81 74 C104 68 114 50 110 34 C94 36 84 56 81 74 Z"
              fill="url(#leafGradSecondary)"
            />
            {/* Tiny sprout tip leaf */}
            <path
              d="M80 58 C80 44 88 38 90 38 C90 48 83 56 80 58 Z"
              fill="#52C48D"
            />
            {/* Minimal Facial Expression: Friendly open eyes and tiny warm smile */}
            <circle cx="74" cy="94" r="2.5" fill="#17251D" />
            <circle cx="86" cy="94" r="2.5" fill="#17251D" />
            <path
              d="M76 101 C78 104 82 104 84 101"
              stroke="#17251D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Subtle soft cheeks */}
            <circle cx="70" cy="99" r="2.5" fill="#E8B4B8" opacity="0.6" />
            <circle cx="90" cy="99" r="2.5" fill="#E8B4B8" opacity="0.6" />
          </g>
        )}

        {state === 'explaining' && (
          <g id="leaves-explaining">
            {/* Left Leaf - Guiding gesture */}
            <path
              d="M78 82 C52 76 46 58 54 44 C69 48 76 68 78 82 Z"
              fill="url(#leafGradPrimary)"
            />
            {/* Right Leaf - Pointing forward */}
            <path
              d="M82 78 C102 74 116 62 114 46 C98 48 86 64 82 78 Z"
              fill="url(#leafGradSecondary)"
            />
            {/* Tiny checklist card held beside */}
            <g transform="translate(100, 70)">
              <rect x="0" y="0" width="28" height="34" rx="4" fill="#FFFFFF" stroke="#BDD3C5" strokeWidth="1.5" />
              <line x1="6" y1="8" x2="16" y2="8" stroke="#176B45" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 16 L9 19 L15 13" stroke="#176B45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="6" y1="26" x2="22" y2="26" stroke="#9BB2A4" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            {/* Facial Expression: Focused, helpful, trustworthy */}
            <circle cx="74" cy="93" r="2.5" fill="#17251D" />
            <circle cx="86" cy="93" r="2.5" fill="#17251D" />
            <path
              d="M77 101 C79 103 81 103 83 101"
              stroke="#17251D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        {state === 'waiting' && (
          <g id="leaves-waiting" className="animate-sprout-pulse">
            {/* Calm, symmetric leaves resting in equilibrium */}
            <path
              d="M79 80 C56 76 48 60 52 46 C68 48 77 66 79 80 Z"
              fill="url(#leafGradPrimary)"
            />
            <path
              d="M81 80 C104 76 112 60 108 46 C92 48 83 66 81 80 Z"
              fill="url(#leafGradSecondary)"
            />
            {/* Floating gentle dew drop above */}
            <g transform="translate(74, 26)">
              <path
                d="M6 0 C6 0 12 7 12 11 C12 14.3 9.3 17 6 17 C2.7 17 0 14.3 0 11 C0 7 6 0 6 0 Z"
                fill="#4FA5DF"
                opacity="0.85"
              />
            </g>
            {/* Facial Expression: Meditative, calm closed eyes (arcs) */}
            <path
              d="M71 95 C73 97 76 97 78 95"
              stroke="#17251D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M82 95 C84 97 87 97 89 95"
              stroke="#17251D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M78 102 C80 103 82 103 84 102"
              stroke="#17251D"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {state === 'celebration' && (
          <g id="leaves-celebration">
            {/* Joyful raised leaves */}
            <path
              d="M77 72 C50 64 42 42 50 26 C68 30 75 52 77 72 Z"
              fill="url(#leafGradPrimary)"
            />
            <path
              d="M83 72 C110 64 118 42 110 26 C92 30 85 52 83 72 Z"
              fill="url(#leafGradSecondary)"
            />
            {/* Golden blossom flower on top */}
            <g transform="translate(72, 14)">
              <circle cx="8" cy="8" r="7" fill="#F4B842" />
              <circle cx="8" cy="8" r="3.5" fill="#FFE898" />
              {/* Petal accents */}
              <circle cx="8" cy="1" r="2.5" fill="#F4B842" />
              <circle cx="15" cy="8" r="2.5" fill="#F4B842" />
              <circle cx="8" cy="15" r="2.5" fill="#F4B842" />
              <circle cx="1" cy="8" r="2.5" fill="#F4B842" />
            </g>
            {/* Sparkles */}
            <path d="M38 34 L40 40 L46 42 L40 44 L38 50 L36 44 L30 42 L36 40 Z" fill="#F4B842" />
            <path d="M122 38 L124 43 L129 44 L124 46 L122 51 L120 46 L115 44 L120 43 Z" fill="#F4B842" />
            {/* Cheerful expression: Smiling eyes and happy mouth */}
            <path
              d="M72 92 C74 90 77 90 79 92"
              stroke="#17251D"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M83 92 C85 90 88 90 90 92"
              stroke="#17251D"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M75 99 C75 105 85 105 85 99 Z"
              fill="#17251D"
            />
            {/* Pink cheeks */}
            <circle cx="69" cy="98" r="3" fill="#E8B4B8" opacity="0.7" />
            <circle cx="91" cy="98" r="3" fill="#E8B4B8" opacity="0.7" />
          </g>
        )}
      </svg>

      {showShadow && (
        <div
          className="rounded-full bg-[#17251D]/8 blur-[2px] mt-[-6px]"
          style={{ width: size * 0.5, height: 8 }}
        />
      )}
    </div>
  );
};
