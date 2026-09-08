import React from 'react';
import { EstablishedRing } from './EstablishedRing';
import type { EstablishedTier } from './markGeometry';

export default {
  title: 'v4-social/elements/EstablishedRing',
};

const TIERS: EstablishedTier[] = ['none', 'established', 'gold', 'platinum', 'diamond'];

const Photo = () => (
  <div
    style={{
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 34% 26%, #6E7A8F, #232936)',
      color: 'rgba(255,255,255,.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: "16px/1 'Cormorant Garamond', Georgia, serif",
    }}
  >
    SZ
  </div>
);

export const EveryTier = {
  render: () => (
    <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
      {TIERS.map((tier) => (
        <EstablishedRing key={tier} tier={tier}>
          <Photo />
        </EstablishedRing>
      ))}
    </div>
  ),
};
