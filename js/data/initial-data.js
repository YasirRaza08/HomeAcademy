// Home Academy Initial Data Configuration - Clean Roster (No Fake Students)

export const INITIAL_CLASS = {
  id: 'class_home_english',
  name: 'Home Academy - English Language Program',
  code: 'HOME-ENGLISH',
  teacher: 'Sir Zubair',
  weeklyChallenge: {
    title: 'Class Topic Sprint',
    description: 'Master the 6 active curriculum topics taught by Sir Zubair and practice daily!',
    targetXP: 250,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    bonusXP: 100,
  }
};

// EMPTY ROSTER - Zero fake / demo students!
// Students appear ONLY when real students join via Name + Code (HOME-ENGLISH)
export const INITIAL_STUDENTS = [];

export const ACHIEVEMENTS = [
  {
    id: 'first_join',
    icon: '🎓',
    title: 'Enrolled in Academy',
    description: 'Joined the Home Academy English Language Program',
    requirement: 1,
    type: 'join',
    xpReward: 20
  },
  {
    id: 'streak_3',
    icon: '🔥',
    title: '3-Day Streak',
    description: 'Practice English for 3 consecutive days',
    requirement: 3,
    type: 'streak',
    xpReward: 50
  },
  {
    id: 'streak_7',
    icon: '⚡',
    title: '7-Day Streak',
    description: 'Keep your streak burning for an entire week!',
    requirement: 7,
    type: 'streak',
    xpReward: 120
  },
  {
    id: 'first_100_xp',
    icon: '🌱',
    title: 'First 100 XP',
    description: 'Earn your first 100 XP from real practice',
    requirement: 100,
    type: 'xp',
    xpReward: 25
  },
  {
    id: 'first_500_xp',
    icon: '🚀',
    title: '500 XP Achiever',
    description: 'Climb into the learning zone by reaching 500 XP',
    requirement: 500,
    type: 'xp',
    xpReward: 50
  },
  {
    id: 'perfect_quiz',
    icon: '🎯',
    title: 'Perfect Quiz',
    description: 'Score 100% on any topic quiz',
    requirement: 1,
    type: 'perfect_quiz',
    xpReward: 60
  },
  {
    id: 'topic_master_1',
    icon: '🎨',
    title: 'Adjectives Master',
    description: 'Complete the Adjectives topic quiz with full score',
    requirement: 1,
    type: 'topic_master_adjectives',
    xpReward: 50
  },
  {
    id: 'topic_master_2',
    icon: '🏷️',
    title: "Genitive 's Master",
    description: "Complete the Genitive 's topic quiz with full score",
    requirement: 1,
    type: 'topic_master_genitive_s',
    xpReward: 50
  },
  {
    id: 'topic_master_3',
    icon: '❓',
    title: 'Wh- Questions Master',
    description: 'Complete the Question Words topic quiz with full score',
    requirement: 1,
    type: 'topic_master_question_words',
    xpReward: 50
  },
  {
    id: 'topic_master_4',
    icon: '🎒',
    title: 'Whose Master',
    description: 'Complete the Whose topic quiz with full score',
    requirement: 1,
    type: 'topic_master_whose',
    xpReward: 50
  },
  {
    id: 'topic_master_5',
    icon: '🤝',
    title: 'Possessive Master',
    description: 'Complete the Possessive Adjectives topic quiz with full score',
    requirement: 1,
    type: 'topic_master_possessive_adjectives',
    xpReward: 50
  },
  {
    id: 'topic_master_6',
    icon: '🌈',
    title: 'Color & Genitive Master',
    description: "Complete the What Color + Genitive 's topic quiz with full score",
    requirement: 1,
    type: 'topic_master_what_color_genitive_s',
    xpReward: 50
  },
  {
    id: 'speed_master',
    icon: '⏱️',
    title: 'Speed Master',
    description: 'Answer 5+ questions correctly in Speed Round',
    requirement: 5,
    type: 'speed_correct',
    xpReward: 50
  },
  {
    id: 'game_champion',
    icon: '🎮',
    title: 'Game Champion',
    description: 'Play at least 5 games in the Game Center',
    requirement: 5,
    type: 'games_played',
    xpReward: 60
  },
  {
    id: 'roleplay_1_complete',
    icon: '🏡',
    title: 'Roleplay 1 Complete',
    description: "Completed 'A Friend Visits Another Friend\'s House' presentation",
    requirement: 1,
    type: 'roleplay_complete',
    roleplayId: 'rp_01',
    xpReward: 30
  },
  {
    id: 'roleplay_2_complete',
    icon: '👮',
    title: 'Roleplay 2 Complete',
    description: "Completed 'A Police Officer Asks Questions' presentation",
    requirement: 1,
    type: 'roleplay_complete',
    roleplayId: 'rp_02',
    xpReward: 30
  },
  {
    id: 'roleplay_3_complete',
    icon: '👨‍👩‍👧',
    title: 'Roleplay 3 Complete',
    description: "Completed 'Family Members and Their Jobs' presentation",
    requirement: 1,
    type: 'roleplay_complete',
    roleplayId: 'rp_03',
    xpReward: 30
  },
  {
    id: 'roleplay_4_complete',
    icon: '🔍',
    title: 'Roleplay 4 Complete',
    description: "Completed 'Lost Children Report' presentation",
    requirement: 1,
    type: 'roleplay_complete',
    roleplayId: 'rp_04',
    xpReward: 30
  },
  {
    id: 'roleplay_5_complete',
    icon: '🏫',
    title: 'Roleplay 5 Complete',
    description: "Completed 'New School / Workplace' presentation",
    requirement: 1,
    type: 'roleplay_complete',
    roleplayId: 'rp_05',
    xpReward: 30
  }
];

export const AVATARS = ['🦁', '🚀', '🌟', '🦉', '🦊', '🎨', '⚽', '📚', '🐯', '🐬', '🐼', '🦄', '🦅', '👑', '💡'];