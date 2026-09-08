// Home Academy Utility Helpers

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const LEVEL_TIERS = [
  { level: 1, title: 'English Starter', minXP: 0, maxXP: 300, icon: '🌱' },
  { level: 2, title: 'Word Explorer', minXP: 300, maxXP: 700, icon: '🧭' },
  { level: 3, title: 'Sentence Builder', minXP: 700, maxXP: 1200, icon: '🏗️' },
  { level: 4, title: 'English Learner', minXP: 1200, maxXP: 1800, icon: '📘' },
  { level: 5, title: 'English Explorer', minXP: 1800, maxXP: 2500, icon: '🚀' },
  { level: 6, title: 'English Champion', minXP: 2500, maxXP: Infinity, icon: '👑' }
];

export function getLevelInfo(totalXP) {
  const xp = Math.max(0, Number(totalXP) || 0);
  let currentTier = LEVEL_TIERS[0];
  
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].minXP) {
      currentTier = LEVEL_TIERS[i];
      break;
    }
  }

  const isMaxLevel = currentTier.level === 6;
  const levelMin = currentTier.minXP;
  const levelMax = isMaxLevel ? 3000 : currentTier.maxXP;
  const xpInCurrentLevel = xp - levelMin;
  const xpRequiredForLevel = levelMax - levelMin;
  const progressPercent = isMaxLevel ? 100 : Math.min(100, Math.round((xpInCurrentLevel / xpRequiredForLevel) * 100));
  const xpToNext = isMaxLevel ? 0 : Math.max(0, levelMax - xp);

  return {
    level: currentTier.level,
    title: currentTier.title,
    icon: currentTier.icon,
    totalXP: xp,
    xpInCurrentLevel,
    xpRequiredForLevel,
    progressPercent,
    xpToNext,
    levelMin,
    levelMax
  };
}

export const POSITIVE_FEEDBACKS = [
  '🔥 Correct!',
  'Excellent! +10 XP',
  'Nice one! 😎',
  'You got it!',
  'English power +10!',
  'Brilliant work! ⭐',
  'Super job! 🚀',
  'Spot on! 🎉',
  'You are on fire! 🔥',
  'Awesome effort! 👍'
];

export const ENCOURAGING_TRY_AGAIN = [
  '😂 Almost!',
  'Close one!',
  'Oops! Try again 😄',
  'Not this time, but great try!',
  'Keep going, you can do it! 💪',
  'So close! Give it another shot!'
];

export function getRandomFeedback(isCorrect) {
  const list = isCorrect ? POSITIVE_FEEDBACKS : ENCOURAGING_TRY_AGAIN;
  return list[Math.floor(Math.random() * list.length)];
}

export function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}