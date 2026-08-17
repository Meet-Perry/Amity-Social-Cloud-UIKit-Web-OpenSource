import clsx from 'clsx';
import React, { useId } from 'react';
import styles from './EstablishedBadge.module.css';

export type EstablishedTier = 'established' | 'gold' | 'platinum' | 'diamond';

const GOLD = { hi: '#D3BA84', mid: '#A98A54', lo: '#7E6636', deep: '#5C4718' };
const PLATINUM = { hi: '#EDEFF2', mid: '#C7CBD1', lo: '#9AA0AA', deep: '#71767F' };
const INTERIOR = '#FBFBFC';
const SEAL_INK = '#241C0D';

interface EstablishedBadgeProps {
  tier?: EstablishedTier;
  title?: string;
  className?: string;
}

export function EstablishedBadge({
  tier = 'established',
  title = 'Established member',
  className,
}: EstablishedBadgeProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ringId = `estRing${uid}`;
  const platRingId = `estPlatRing${uid}`;
  const sealId = `estSeal${uid}`;
  const platSealId = `estPlatSeal${uid}`;

  const platinumRing = tier === 'platinum' || tier === 'diamond';
  const platinumSeal = tier === 'platinum';
  const goldBezel = tier === 'gold';
  const diamondMedallion = tier === 'diamond';

  const ringWidth = 4;
  const ringRadius = 50 - ringWidth / 2;
  const angle = Math.PI / 4;
  const sealX = 50 + ringRadius * Math.cos(angle);
  const sealY = 50 + ringRadius * Math.sin(angle);
  const sealRadius = 12;

  const notches = platinumRing
    ? [0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return { deg, x: 50 + ringRadius * Math.cos(rad), y: 50 + ringRadius * Math.sin(rad) };
      })
    : [];

  return (
    <svg
      className={clsx(styles.establishedBadge, className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD.hi} />
          <stop offset="55%" stopColor={GOLD.mid} />
          <stop offset="100%" stopColor={GOLD.lo} />
        </linearGradient>
        <linearGradient id={platRingId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PLATINUM.hi} />
          <stop offset="55%" stopColor={PLATINUM.mid} />
          <stop offset="100%" stopColor={PLATINUM.lo} />
        </linearGradient>
        <radialGradient id={sealId} cx="0.35" cy="0.28" r="0.9">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="38%" stopColor={GOLD.hi} />
          <stop offset="74%" stopColor={GOLD.mid} />
          <stop offset="100%" stopColor={GOLD.deep} />
        </radialGradient>
        <radialGradient id={platSealId} cx="0.35" cy="0.28" r="0.9">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="38%" stopColor={PLATINUM.hi} />
          <stop offset="74%" stopColor={PLATINUM.mid} />
          <stop offset="100%" stopColor={PLATINUM.deep} />
        </radialGradient>
      </defs>

      <circle
        cx="50"
        cy="50"
        r={ringRadius}
        fill="none"
        stroke={platinumRing ? `url(#${platRingId})` : `url(#${ringId})`}
        strokeWidth={ringWidth}
      />
      {notches.map((n) => (
        <circle key={n.deg} cx={n.x} cy={n.y} r={ringWidth * 0.7} fill={INTERIOR} />
      ))}

      {diamondMedallion && (
        <>
          <circle
            cx={sealX}
            cy={sealY}
            r={sealRadius + 2.6}
            fill="none"
            stroke={`url(#${platRingId})`}
            strokeWidth="2.4"
            strokeDasharray="1.2 1.2"
          />
          <circle
            cx={sealX}
            cy={sealY}
            r={sealRadius + 1.2}
            fill="none"
            stroke={GOLD.hi}
            strokeWidth="0.5"
          />
        </>
      )}
      {goldBezel && (
        <circle
          cx={sealX}
          cy={sealY}
          r={sealRadius + 1.8}
          fill="none"
          stroke={`url(#${ringId})`}
          strokeWidth="2"
        />
      )}
      <circle cx={sealX} cy={sealY} r={sealRadius + 1} fill={INTERIOR} />
      <circle
        cx={sealX}
        cy={sealY}
        r={sealRadius}
        fill={platinumSeal ? `url(#${platSealId})` : `url(#${sealId})`}
      />
      <text
        x={sealX}
        y={sealY}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontStyle="italic"
        fontSize={sealRadius * 0.95}
        fill={SEAL_INK}
        opacity="0.85"
      >
        mp
      </text>
    </svg>
  );
}
