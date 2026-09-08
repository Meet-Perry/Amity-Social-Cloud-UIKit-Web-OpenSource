import clsx from 'clsx';
import React from 'react';
import { useTheme } from '~/v4/core/providers/ThemeProvider';
import { EstablishedMark } from './EstablishedMark';
import { markCanvas, type EstablishedTier, type MarkSize, type MarkTheme } from './markGeometry';
import styles from './EstablishedRing.module.css';

type EstablishedRingProps = {
  /** The level to draw. The caller works it out, this element never does. */
  tier?: EstablishedTier;
  size?: MarkSize;
  /** Defaults to the UIKit theme. */
  theme?: MarkTheme;
  className?: string;
  children: React.ReactNode;
};

export function EstablishedRing({
  tier = 'none',
  size = 36,
  theme,
  className,
  children,
}: EstablishedRingProps) {
  const { currentTheme } = useTheme();

  if (tier === 'none') return <>{children}</>;

  const { markScale, photoScale } = markCanvas(size);

  return (
    <span className={clsx(styles.establishedRing, className)}>
      <span className={styles.establishedRing__photo} style={{ transform: `scale(${photoScale})` }}>
        {children}
      </span>
      <EstablishedMark
        tier={tier}
        size={size}
        theme={theme ?? currentTheme}
        className={styles.establishedRing__mark}
        style={{ width: `${markScale * 100}%`, height: `${markScale * 100}%` }}
      />
    </span>
  );
}
