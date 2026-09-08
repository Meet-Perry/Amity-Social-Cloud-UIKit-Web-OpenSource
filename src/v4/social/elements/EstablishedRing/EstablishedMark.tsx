import React, { useMemo } from 'react';
import { uniqueId } from '~/v4/utils/uniqueId';
import {
  MARK_GEOMETRY,
  MARK_THEME,
  markCanvas,
  type EstablishedTier,
  type MarkSize,
  type MarkTheme,
} from './markGeometry';

type EstablishedMarkProps = {
  tier: Exclude<EstablishedTier, 'none'>;
  theme: MarkTheme;
  size: MarkSize;
  className?: string;
  style?: React.CSSProperties;
};

const NOTCH_ANGLES = [0, 90, 180, 270];

const TIER_LABEL: Record<Exclude<EstablishedTier, 'none'>, string> = {
  established: 'Established member',
  gold: 'Gold Established member',
  platinum: 'Platinum Established member',
  diamond: 'Diamond Established member',
};

export function EstablishedMark({ tier, theme, size, className, style }: EstablishedMarkProps) {
  const uid = useMemo(() => uniqueId('est').replace(/[^a-zA-Z0-9]/g, ''), []);

  const T = MARK_THEME[theme];
  const G = MARK_GEOMETRY[size];
  const { center: c, edge } = markCanvas(size);

  const goldRingId = `goldRing${uid}`;
  const platRingId = `platRing${uid}`;
  const goldOrbId = `goldOrb${uid}`;
  const platOrbId = `platOrb${uid}`;
  const softId = `soft${uid}`;

  const platinumRing = tier === 'platinum' || tier === 'diamond';

  // The seal straddles the ring at 4:30, half of it outside.
  const ang = Math.PI / 4;
  const sx = c + G.ringR * Math.cos(ang);
  const sy = c + G.ringR * Math.sin(ang);
  const sealR = tier === 'diamond' ? G.medOrbR : G.orbR;
  const orbFont = tier === 'diamond' ? G.orbFont + 1 : G.orbFont;

  const bezelR = sealR + G.bezelGap + G.bezelW / 2;
  const fluteR = sealR + G.medHairGap + G.medFlutW / 2;
  const hairlineR = fluteR + G.medFlutW / 2 + 1.1;
  // Lifts the seal clear of the ring and of the avatar behind it.
  const backingR =
    tier === 'established'
      ? sealR + 0.8
      : tier === 'diamond'
        ? hairlineR + 0.8
        : bezelR + G.bezelW / 2 + 0.6;

  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${edge} ${edge}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={TIER_LABEL[tier]}
    >
      <defs>
        <linearGradient id={goldRingId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={T.goldHi} />
          <stop offset="55%" stopColor={T.gold} />
          <stop offset="100%" stopColor={T.goldLo} />
        </linearGradient>
        <linearGradient id={platRingId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={T.platHi} />
          <stop offset="55%" stopColor={T.plat} />
          <stop offset="100%" stopColor={T.platLo} />
        </linearGradient>
        <radialGradient id={goldOrbId} cx="0.35" cy="0.28" r="0.9">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="38%" stopColor={T.goldHi} />
          <stop offset="74%" stopColor={T.gold} />
          <stop offset="100%" stopColor={T.goldDeep} />
        </radialGradient>
        <radialGradient id={platOrbId} cx="0.35" cy="0.28" r="0.9">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="38%" stopColor={T.platHi} />
          <stop offset="74%" stopColor={T.plat} />
          <stop offset="100%" stopColor={T.platDeep} />
        </radialGradient>
        <filter id={softId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy={G.shadow}
            stdDeviation={G.shadow}
            floodColor="#000"
            floodOpacity={theme === 'dark' ? 0.45 : 0.28}
          />
        </filter>
      </defs>

      {platinumRing ? (
        <>
          <circle
            cx={c}
            cy={c}
            r={G.ringR}
            fill="none"
            stroke={`url(#${platRingId})`}
            strokeWidth={G.platW}
          />
          <circle
            cx={c}
            cy={c}
            r={G.ringR}
            fill="none"
            stroke={T.platLo}
            strokeWidth={G.platW}
            strokeDasharray={G.flutDash}
            opacity="0.55"
          />
          {NOTCH_ANGLES.map((deg) => (
            <rect
              key={deg}
              x={c - G.notchW / 2}
              y={c - G.ringR - G.notchH / 2}
              width={G.notchW}
              height={G.notchH}
              rx="0.8"
              fill={T.platHi}
              opacity="0.9"
              transform={`rotate(${deg} ${c} ${c})`}
            />
          ))}
          {tier === 'diamond' && (
            <circle
              cx={c}
              cy={c}
              r={G.ringR + G.platW / 2 + 1.4}
              fill="none"
              stroke={T.gold}
              strokeWidth="0.9"
              opacity="0.9"
            />
          )}
        </>
      ) : (
        <circle
          cx={c}
          cy={c}
          r={G.ringR}
          fill="none"
          stroke={`url(#${goldRingId})`}
          strokeWidth={G.goldW}
        />
      )}

      <g filter={`url(#${softId})`}>
        <circle cx={sx} cy={sy} r={backingR} fill={T.interior} />
        {tier === 'diamond' && (
          <>
            <circle cx={sx} cy={sy} r={hairlineR} fill="none" stroke={T.gold} strokeWidth="0.9" />
            <circle
              cx={sx}
              cy={sy}
              r={fluteR}
              fill="none"
              stroke={`url(#${platRingId})`}
              strokeWidth={G.medFlutW}
            />
            <circle
              cx={sx}
              cy={sy}
              r={fluteR}
              fill="none"
              stroke={T.platLo}
              strokeWidth={G.medFlutW}
              strokeDasharray={G.medFlutDash}
              opacity="0.55"
            />
          </>
        )}
        {(tier === 'gold' || tier === 'platinum') && (
          <circle
            cx={sx}
            cy={sy}
            r={bezelR}
            fill="none"
            stroke={platinumRing ? `url(#${platRingId})` : `url(#${goldRingId})`}
            strokeWidth={G.bezelW}
          />
        )}
        <circle
          cx={sx}
          cy={sy}
          r={sealR}
          fill={platinumRing ? `url(#${platOrbId})` : `url(#${goldOrbId})`}
        />
        <text
          x={sx}
          y={sy}
          textAnchor="middle"
          dominantBaseline="central"
          dy={orbFont * 0.05}
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize={orbFont}
          fill={T.sealInk}
          opacity="0.85"
        >
          mp
        </text>
      </g>
    </svg>
  );
}
