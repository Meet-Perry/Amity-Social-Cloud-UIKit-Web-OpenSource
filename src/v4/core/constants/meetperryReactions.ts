import type { AmityReactionType } from '~/v4/core/providers/CustomReactionProvider';

const emojiDataUrl = (emoji: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="16" y="24" text-anchor="middle" font-size="26">${emoji}</text></svg>`,
  )}`;

export const MEETPERRY_REACTIONS: AmityReactionType[] = [
  { name: 'love', image: emojiDataUrl('❤️') },
  { name: 'haha', image: emojiDataUrl('😂') },
  { name: 'bullish', image: emojiDataUrl('🚀') },
  { name: 'curious', image: emojiDataUrl('👀') },
  { name: 'support', image: emojiDataUrl('🙏') },
  { name: 'insightful', image: emojiDataUrl('💡') },
  { name: 'celebrate', image: emojiDataUrl('👏') },
];

export const MEETPERRY_DEFAULT_REACTION = 'love';
