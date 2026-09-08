// Brand values and geometry from the approved emblem board, copied from the web app's
// `packages/ui/components/standing/badgeGeometry.ts`. A change to the mark must reach both files.
// Do not snap these colors to `--asc-color-*` tokens: they are brand values, not UI colors.

export type EstablishedTier = 'none' | 'established' | 'gold' | 'platinum' | 'diamond';

export type MarkTheme = 'light' | 'dark';

/** Which set of tuned detail to draw. 36 is feed size. */
export type MarkSize = 88 | 36;

interface MarkThemeTokens {
  interior: string;
  goldHi: string;
  gold: string;
  goldLo: string;
  goldDeep: string;
  platHi: string;
  plat: string;
  platLo: string;
  platDeep: string;
  sealInk: string;
}

export const MARK_THEME: Record<MarkTheme, MarkThemeTokens> = {
  dark: {
    interior: '#12141A',
    goldHi: '#E6CE97',
    gold: '#BE9F67',
    goldLo: '#8F6F35',
    goldDeep: '#6E5322',
    platHi: '#F2F4F7',
    plat: '#C8CDD6',
    platLo: '#98A0AC',
    platDeep: '#7C8592',
    sealInk: '#241C0D',
  },
  light: {
    interior: '#FBFBFC',
    goldHi: '#D3BA84',
    gold: '#A98A54',
    goldLo: '#7E6636',
    goldDeep: '#5C4718',
    platHi: '#D9DEE5',
    plat: '#9AA3AF',
    platLo: '#5D6673',
    platDeep: '#525B67',
    sealInk: '#241C0D',
  },
};

interface MarkGeometry {
  pad: number;
  ringR: number;
  goldW: number;
  orbR: number;
  orbFont: number;
  shadow: number;
  platW: number;
  flutDash: string;
  notchW: number;
  notchH: number;
  bezelGap: number;
  bezelW: number;
  medOrbR: number;
  medFlutW: number;
  medFlutDash: string;
  medHairGap: number;
}

// Tuned per size, not scaled. At 36 the flutes, notches and bezel each need their own value to
// stay legible.
export const MARK_GEOMETRY: Record<MarkSize, MarkGeometry> = {
  88: {
    pad: 11,
    ringR: 41,
    goldW: 3,
    orbR: 8,
    orbFont: 7,
    shadow: 1,
    platW: 3.2,
    flutDash: '1 1',
    notchW: 4,
    notchH: 2,
    bezelGap: 1.6,
    bezelW: 1.2,
    medOrbR: 9,
    medFlutW: 2.2,
    medFlutDash: '0.8 0.85',
    medHairGap: 1.2,
  },
  36: {
    pad: 7,
    ringR: 16.5,
    goldW: 2,
    orbR: 4.2,
    orbFont: 3.8,
    shadow: 0.8,
    platW: 2,
    flutDash: '0.8 0.8',
    notchW: 2.4,
    notchH: 1.2,
    bezelGap: 0.9,
    bezelW: 0.8,
    medOrbR: 5,
    medFlutW: 1.4,
    medFlutDash: '0.6 0.65',
    medHairGap: 0.8,
  },
};

export const markCanvas = (size: MarkSize) => {
  const { ringR, pad, goldW, platW } = MARK_GEOMETRY[size];
  const center = ringR + pad;
  const interiorR = ringR - goldW / 2 - 1;
  // The ring is the part that must line up with a plain avatar, so it sets the scale. The canvas
  // around it is room for the seal, which hangs outside the ring at 4:30.
  const ringD = (ringR + platW / 2) * 2;
  return {
    center,
    edge: center * 2,
    /** Canvas width as a share of the ring, so the ring draws at the avatar size. */
    markScale: (center * 2) / ringD,
    /** The avatar shrinks by this much to sit inside the ring. */
    photoScale: (interiorR * 2) / ringD,
  };
};
