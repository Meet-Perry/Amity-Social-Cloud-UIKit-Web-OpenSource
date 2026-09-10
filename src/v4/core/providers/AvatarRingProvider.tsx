import React, { ComponentType, createContext, PropsWithChildren, useContext } from 'react';

/**
 * Whatever the host app draws around a member's avatar — a standing ring, say. The UIKit knows
 * neither what it is nor where its data comes from, it only leaves the room for it. Pass a stable
 * component: a new one on every render remounts every avatar below.
 */
export type AvatarRing = ComponentType<PropsWithChildren<{ userId?: string | null }>>;

const Plain: AvatarRing = ({ children }) => <>{children}</>;

const AvatarRingContext = createContext<AvatarRing>(Plain);

/** Gives every avatar below its ring. Without one they render exactly as they did before. */
export const AvatarRingProvider = ({
  ring,
  children,
}: PropsWithChildren<{ ring?: AvatarRing }>) => (
  <AvatarRingContext.Provider value={ring ?? Plain}>{children}</AvatarRingContext.Provider>
);

export const useAvatarRing = (): AvatarRing => useContext(AvatarRingContext);
