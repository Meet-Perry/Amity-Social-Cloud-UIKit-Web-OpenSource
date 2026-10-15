import React from 'react';
import styles from './Avatar.module.css';

const toInitials = (displayName?: string | null) => {
  const parts = displayName?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (parts.length === 0) return '';
  const first = parts[0].charAt(0);
  return (parts.length === 1 ? first : first + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const AvatarInitials = ({ displayName }: { displayName?: string | null }) => (
  <div className={styles.avatarInitials}>{toInitials(displayName)}</div>
);
