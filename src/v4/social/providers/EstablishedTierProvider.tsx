import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { EstablishedTier } from '~/v4/social/elements/EstablishedRing';
import {
  createEstablishedTierLoader,
  type EstablishedTierLoader,
  type EstablishedTierResolver,
} from './establishedTierLoader';

export type { EstablishedTierResolver };

const EstablishedTierContext = createContext<EstablishedTierLoader | null>(null);

export const EstablishedTierProvider = ({
  getEstablishedTiers,
  children,
}: PropsWithChildren<{ getEstablishedTiers?: EstablishedTierResolver }>) => {
  const loader = useMemo(
    () => (getEstablishedTiers ? createEstablishedTierLoader(getEstablishedTiers) : null),
    [getEstablishedTiers],
  );

  return (
    <EstablishedTierContext.Provider value={loader}>{children}</EstablishedTierContext.Provider>
  );
};

/** `none` while the level is unknown, so an avatar draws plain and never waits. */
export const useEstablishedTier = (userId?: string | null): EstablishedTier => {
  const loader = useContext(EstablishedTierContext);
  const [tier, setTier] = useState<EstablishedTier>('none');

  const known = userId ? loader?.peek(userId) : undefined;

  useEffect(() => {
    if (!loader || !userId) return;

    let active = true;
    loader.load(userId).then((loaded) => {
      if (active) setTier(loaded);
    });

    return () => {
      active = false;
    };
  }, [loader, userId]);

  return known ?? tier;
};
