import type { EstablishedTier } from '~/v4/social/elements/EstablishedRing';

/**
 * Answers the Established level of many members in one call. The host app supplies it, so the
 * UIKit needs to know neither the app's API nor how a level is worked out. Members without a
 * level can be left out of the answer.
 */
export type EstablishedTierResolver = (
  userIds: string[],
) => Promise<Record<string, EstablishedTier>>;

export interface EstablishedTierLoader {
  /** The level if it is already known, so a second avatar for the same member draws at once. */
  peek: (userId: string) => EstablishedTier | undefined;
  load: (userId: string) => Promise<EstablishedTier>;
}

export const createEstablishedTierLoader = (
  resolve: EstablishedTierResolver,
): EstablishedTierLoader => {
  const known = new Map<string, EstablishedTier>();
  let queued: string[] = [];
  let batch: Promise<void> | null = null;

  return {
    peek: (userId) => known.get(userId),

    load: async (userId) => {
      const cached = known.get(userId);
      if (cached) return cached;

      queued.push(userId);

      // Every avatar that asks in the same tick joins one request.
      if (!batch) {
        batch = Promise.resolve().then(async () => {
          const userIds = [...new Set(queued)];
          queued = [];
          batch = null;

          try {
            const tiers = await resolve(userIds);
            // A member with no level is absent from the answer, so keep `none` for them too.
            for (const id of userIds) known.set(id, tiers[id] ?? 'none');
          } catch {
            // The mark is decoration, so a failed lookup must not break the feed. Nothing is
            // kept, so the next avatar for this member asks again.
          }
        });
      }

      await batch;
      return known.get(userId) ?? 'none';
    },
  };
};
