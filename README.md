# HOME ACADEMY — English Language Program
> “Learn English. Play. Improve.”

Official digital online learning platform for beginner (A1 level) students of **Home Academy**.

![Home Academy Official Logo](assets/logo.png)

---

## 🎨 Official Brand Identity
- **Primary**: Deep Navy Blue (`#0A2558`)
- **Secondary**: Academy Red (`#C8102E`)
- **Accent**: Golden Yellow (`#F5A623`)
- **Background**: Crisp White & Light Neutrals (`#FFFFFF`, `#F8FAFC`)
- **Brand Tagline**: *“Learn English. Play. Improve.”*
- **Official Asset**: Uses the authentic Home Academy logo image asset across all views.

---

## 🚀 Key Features

### 1. 🏫 Private Classroom System
- **Class Code**: `HOME-ENGLISH` (pre-configured for Home Academy).
- **Roster**: Preloaded with 8 classmates (Ali, Hamza, Sara, Fatima, Zain, Bilal, Ayesha, Usman) with authentic beginner XP, streaks, and ranks.
- **Custom Join**: Any student can enter their name, choose a mascot avatar (🦁 Leo, 🚀 Rocket, 🌟 Star, 🦉 Owl, 🦊 Fox, 🎨 Artist, ⚽ Striker, 📚 Scholar), and instantly join their classmates.
- **Teacher / Admin Portal**: Accessible with password `admin123`.

### 2. ⚡ Gamification & Daily Streaks
- **XP Progression**:
  - Correct answer: +10 XP
  - Word match / picture quiz: +15 XP
  - Word scramble: +20 XP
  - Sentence builder: +25 XP
  - Speaking drill: +30 XP
  - Daily challenge completion: +100 XP
  - Daily streak bonus: +20 XP
- **6 Level Tiers**:
  - Level 1: English Starter
  - Level 2: Word Explorer
  - Level 3: Sentence Builder
  - Level 4: English Learner
  - Level 5: English Explorer
  - Level 6: English Champion
- **Fire Streaks**: Track consecutive active days with motivational feedback.
- **12 Unlockable Badges**: Visual showcase with locked/unlocked progress meters.

### 3. 🎮 6 Dedicated Interactive Games
1. **Word Scramble**: Interactive letter tiles with slots, hint button, delete/clear, and timer.
2. **Word Match**: 3D flip card memory game matching words with pictures (e.g. `APPLE` ↔ 🍎).
3. **Picture Quiz**: Visual cards ("What is this?") with 4 beginner multiple-choice options.
4. **Sentence Builder**: Arrange scrambled word tokens into grammatically correct beginner sentences with text-to-speech listening.
5. **Speed Round**: Rapid-fire 30-second sprint testing reflexes and vocabulary.
6. **True or False**: Tactile, funny beginner statements ("Cats can fly." ➔ FALSE).

### 4. 📚 16 Vocabulary Categories
- Categories: Animals, Food, Family, School, Colors, Numbers, Days, Months, Clothes, Body Parts, Home, Daily Activities, Places, Transportation, Common Verbs, Common Adjectives.
- Each word card includes:
  - English word & definition
  - Native browser audio pronunciation (`speechSynthesis`)
  - Example sentence
  - Visual emoji/illustration
  - Interactive "Test Yourself" Mini-Quiz modal
  - "Mark as Learned" progress tracker

### 5. ✍️ 12 Beginner Grammar Lessons
- Structured 5-step interactive journey:
  `LEARN` ➔ `EXAMPLE` ➔ `MINI-GAME` ➔ `QUIZ` ➔ `XP REWARD`
- Topics: I/You/He/She/It; am/is/are; this/that; these/those; have/has; a/an; singular/plural; basic questions; basic negatives; basic prepositions; simple present; basic pronouns.

### 6. 🗣️ Speaking & 🎧 Listening Zones
- **Listening**: Native speech synthesis with slow (0.75x) and normal (1.0x) toggles and follow-up comprehension quiz.
- **Speaking**: Voice recognition with microphone input (`webkitSpeechRecognition`), "Listen First" preview, and forgiving beginner evaluation.

### 7. 🏆 Class Leaderboard & Weekly Challenge
- Live podium (🥇 1st, 🥈 2nd, 🥉 3rd) with current student rank and XP-to-pass tracker.
- Weekly countdown timer to Sunday reset.

### 8. 📊 Student Profile & Progress Analytics
- Skill breakdown progress bars (Vocabulary, Grammar, Listening, Speaking).
- 7-Day XP activity bar chart (Mon - Sun).
- Avatar selector and quiz accuracy rating.

### 9. 🛠️ Teacher / Organizer Panel
- Password protected (`admin123`).
- Add / remove students.
- Award bonus XP.
- Reset weekly leaderboard.
- Export / import class backup JSON.

---

## 🏃 How to Run Locally

### Option 1: Using the Included Node Server
From this directory, run:
```bash
node server.js
```
Then open your browser at:
`http://localhost:3000/`

### Option 2: Using Python
```bash
python -m http.server 3000
```
Then open `http://localhost:3000/`.

### Option 3: Direct Browser File Open
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox.