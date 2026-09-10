(() => {
  // js/data/initial-data.js
  var INITIAL_CLASS = {
    id: "class_home_english",
    name: "Home Academy - English Language Program",
    code: "HOME-ENGLISH",
    teacher: "Sir Zubair",
    weeklyChallenge: {
      title: "Class Topic Sprint",
      description: "Master the 6 active curriculum topics taught by Sir Zubair and practice daily!",
      targetXP: 250,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
      bonusXP: 100
    }
  };
  var ACHIEVEMENTS = [
    {
      id: "first_join",
      icon: "\u{1F393}",
      title: "Enrolled in Academy",
      description: "Joined the Home Academy English Language Program",
      requirement: 1,
      type: "join",
      xpReward: 20
    },
    {
      id: "streak_3",
      icon: "\u{1F525}",
      title: "3-Day Streak",
      description: "Practice English for 3 consecutive days",
      requirement: 3,
      type: "streak",
      xpReward: 50
    },
    {
      id: "streak_7",
      icon: "\u26A1",
      title: "7-Day Streak",
      description: "Keep your streak burning for an entire week!",
      requirement: 7,
      type: "streak",
      xpReward: 120
    },
    {
      id: "first_100_xp",
      icon: "\u{1F331}",
      title: "First 100 XP",
      description: "Earn your first 100 XP from real practice",
      requirement: 100,
      type: "xp",
      xpReward: 25
    },
    {
      id: "first_500_xp",
      icon: "\u{1F680}",
      title: "500 XP Achiever",
      description: "Climb into the learning zone by reaching 500 XP",
      requirement: 500,
      type: "xp",
      xpReward: 50
    },
    {
      id: "perfect_quiz",
      icon: "\u{1F3AF}",
      title: "Perfect Quiz",
      description: "Score 100% on any topic quiz",
      requirement: 1,
      type: "perfect_quiz",
      xpReward: 60
    },
    {
      id: "topic_master_1",
      icon: "\u{1F3A8}",
      title: "Adjectives Master",
      description: "Complete the Adjectives topic quiz with full score",
      requirement: 1,
      type: "topic_master_adjectives",
      xpReward: 50
    },
    {
      id: "topic_master_2",
      icon: "\u{1F3F7}\uFE0F",
      title: "Genitive 's Master",
      description: "Complete the Genitive 's topic quiz with full score",
      requirement: 1,
      type: "topic_master_genitive_s",
      xpReward: 50
    },
    {
      id: "topic_master_3",
      icon: "\u2753",
      title: "Wh- Questions Master",
      description: "Complete the Question Words topic quiz with full score",
      requirement: 1,
      type: "topic_master_question_words",
      xpReward: 50
    },
    {
      id: "topic_master_4",
      icon: "\u{1F392}",
      title: "Whose Master",
      description: "Complete the Whose topic quiz with full score",
      requirement: 1,
      type: "topic_master_whose",
      xpReward: 50
    },
    {
      id: "topic_master_5",
      icon: "\u{1F91D}",
      title: "Possessive Master",
      description: "Complete the Possessive Adjectives topic quiz with full score",
      requirement: 1,
      type: "topic_master_possessive_adjectives",
      xpReward: 50
    },
    {
      id: "topic_master_6",
      icon: "\u{1F308}",
      title: "Color & Genitive Master",
      description: "Complete the What Color + Genitive 's topic quiz with full score",
      requirement: 1,
      type: "topic_master_what_color_genitive_s",
      xpReward: 50
    },
    {
      id: "speed_master",
      icon: "\u23F1\uFE0F",
      title: "Speed Master",
      description: "Answer 5+ questions correctly in Speed Round",
      requirement: 5,
      type: "speed_correct",
      xpReward: 50
    },
    {
      id: "game_champion",
      icon: "\u{1F3AE}",
      title: "Game Champion",
      description: "Play at least 5 games in the Game Center",
      requirement: 5,
      type: "games_played",
      xpReward: 60
    },
    {
      id: "roleplay_1_complete",
      icon: "\u{1F3E1}",
      title: "Roleplay 1 Complete",
      description: "Completed 'A Friend Visits Another Friend's House' presentation",
      requirement: 1,
      type: "roleplay_complete",
      roleplayId: "rp_01",
      xpReward: 30
    },
    {
      id: "roleplay_2_complete",
      icon: "\u{1F46E}",
      title: "Roleplay 2 Complete",
      description: "Completed 'A Police Officer Asks Questions' presentation",
      requirement: 1,
      type: "roleplay_complete",
      roleplayId: "rp_02",
      xpReward: 30
    },
    {
      id: "roleplay_3_complete",
      icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
      title: "Roleplay 3 Complete",
      description: "Completed 'Family Members and Their Jobs' presentation",
      requirement: 1,
      type: "roleplay_complete",
      roleplayId: "rp_03",
      xpReward: 30
    },
    {
      id: "roleplay_4_complete",
      icon: "\u{1F50D}",
      title: "Roleplay 4 Complete",
      description: "Completed 'Lost Children Report' presentation",
      requirement: 1,
      type: "roleplay_complete",
      roleplayId: "rp_04",
      xpReward: 30
    },
    {
      id: "roleplay_5_complete",
      icon: "\u{1F3EB}",
      title: "Roleplay 5 Complete",
      description: "Completed 'New School / Workplace' presentation",
      requirement: 1,
      type: "roleplay_complete",
      roleplayId: "rp_05",
      xpReward: 30
    }
  ];
  var AVATARS = ["\u{1F981}", "\u{1F680}", "\u{1F31F}", "\u{1F989}", "\u{1F98A}", "\u{1F3A8}", "\u26BD", "\u{1F4DA}", "\u{1F42F}", "\u{1F42C}", "\u{1F43C}", "\u{1F984}", "\u{1F985}", "\u{1F451}", "\u{1F4A1}"];

  // js/data/curriculum.js
  var OFFICIAL_TOPICS = [
    {
      id: "adjectives",
      number: "01",
      title: "Adjectives",
      subtitle: "Describing words for size, age, quality, and condition",
      icon: "\u{1F3A8}",
      color: "#2563eb",
      active: true,
      summary: "Adjectives are words that describe nouns (people, places, things). In English, adjectives usually go before the noun (e.g. 'a big car') or after the verb 'to be' (e.g. 'The car is big').",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Kisi bhi shakhs, cheez ya jagah ki khasiyat, size, rang ya halat batane ke liye taake sunne wale ko poori baat wazeh samajh aaye.",
          english: "To describe and give clear details about a person, place, or thing so the listener knows what it looks, feels, or is like."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "English mein Adjective do tarah se lagte hain: 1) Noun se foran pehle (a red car), ya 2) is/am/are ke foran baad (The car is red).",
          english: "1) Directly before the noun: [Adjective + Noun] e.g. 'a big house'. 2) After the verb to be: [Subject + is/am/are + Adjective] e.g. 'The house is big'.",
          formula: "a/an + Adjective + Noun  YA  Subject + is/am/are + Adjective"
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Rozmarrah zindagi mein size (bara/chota), umr (naya/purana), rang (surkh/neela), aur quality (acha/bura) bayan karne ke liye.",
          english: "Use it whenever you want to describe size, age, condition, temperature, speed, and quality.",
          points: [
            "\u{1F4CF} Size & Height: big, small, tall, short",
            "\u{1F3A8} Colors & Appearance: red, blue, beautiful",
            "\u23F3 Age & Condition: old, young, new",
            "\u2B50 Quality & Speed: good, bad, fast, slow",
            "\u{1F321}\uFE0F Temperature: hot, cold, warm"
          ]
        },
        audioNarration: "Topic 1: Adjectives. Why do we use them? We use adjectives to describe nouns like people, places, and things to give more detail. How do we use them? In English, adjectives go before the noun, like 'a red car', or after the verb to be, like 'The car is fast'. What for? Use them every day to describe size, age, condition, temperature, and quality."
      },
      vocab: [
        { word: "big", opposite: "small", category: "Size", example: "The elephant is big." },
        { word: "small", opposite: "big", category: "Size", example: "The mouse is small." },
        { word: "tall", opposite: "short", category: "Height", example: "Ali is very tall." },
        { word: "short", opposite: "tall", category: "Height", example: "The chair is short." },
        { word: "beautiful", opposite: "ugly", category: "Appearance", example: "It is a beautiful garden." },
        { word: "old", opposite: "young / new", category: "Age", example: "My grandfather is old." },
        { word: "young", opposite: "old", category: "Age", example: "The young boy is running." },
        { word: "new", opposite: "old", category: "Condition", example: "I have a new laptop." },
        { word: "good", opposite: "bad", category: "Quality", example: "She is a good student." },
        { word: "bad", opposite: "good", category: "Quality", example: "Bad weather today." },
        { word: "fast", opposite: "slow", category: "Speed", example: "The red car is fast." },
        { word: "slow", opposite: "fast", category: "Speed", example: "Turtles are slow animals." },
        { word: "hot", opposite: "cold", category: "Temperature", example: "The tea is very hot." },
        { word: "cold", opposite: "hot", category: "Temperature", example: "Winter is cold in the mountains." }
      ],
      examples: [
        { english: "The car is fast.", note: "Adjective after verb 'is'" },
        { english: "This is a big house.", note: "Adjective before noun 'house'" },
        { english: "Sara is a young girl.", note: "Adjective describing age" },
        { english: "The coffee is hot, not cold.", note: "Contrasting two adjectives" },
        { english: "They have a beautiful garden.", note: "Describing appearance" }
      ],
      practiceQuestions: [
        {
          type: "mcq",
          question: "What is the opposite of 'big'?",
          options: ["fast", "small", "young", "tall"],
          answer: 1,
          explanation: "'Small' is the exact opposite of 'big'.",
          imageContext: { topic: "Adjectives", concept: "big elephant", keywords: ["elephant", "big"] }
        },
        {
          type: "mcq",
          question: "Choose the correct sentence:",
          options: ["He has a car red.", "He has a red car.", "He has red a car.", "He a red car has."],
          answer: 1,
          explanation: "In English, the adjective ('red') comes before the noun ('car').",
          imageContext: { topic: "What Color", concept: "red car", keywords: ["red", "car"] }
        },
        {
          type: "fill",
          question: "The weather in summer is very _____ (hot / cold).",
          answer: "hot",
          options: ["hot", "cold", "slow", "tall"],
          explanation: "Summer is the hot season.",
          imageContext: { topic: "Adjectives", concept: "hot tea coffee cup", keywords: ["hot"] }
        },
        {
          type: "mcq",
          question: "A cheetah can run 100 km/h. A cheetah is ______.",
          options: ["slow", "old", "fast", "bad"],
          answer: 2,
          explanation: "Running at high speed means 'fast'.",
          imageContext: { topic: "Adjectives", concept: "fast red car", keywords: ["fast"] }
        }
      ],
      quizQuestions: [
        {
          question: "The giraffe has a _____ neck.",
          options: ["short", "tall", "slow", "cold"],
          answer: 1,
          explanation: "We use 'tall' (or long) for height.",
          imageContext: { topic: "Adjectives", concept: "tall giraffe", keywords: ["giraffe", "tall"] }
        },
        {
          question: "What is the opposite of 'slow'?",
          options: ["bad", "old", "fast", "hot"],
          answer: 2,
          explanation: "'Fast' is the opposite of 'slow'.",
          imageContext: { topic: "Adjectives", concept: "slow turtle", keywords: ["turtle", "slow"] }
        },
        {
          question: "This phone was bought yesterday. It is ______.",
          options: ["old", "new", "short", "bad"],
          answer: 1,
          explanation: "Something recently bought is 'new'."
        },
        {
          question: "Complete: 'Ice cream is _______.'",
          options: ["cold", "hot", "tall", "fast"],
          answer: 0,
          explanation: "Ice cream is cold.",
          imageContext: { topic: "Adjectives", concept: "cold winter snow", keywords: ["cold"] }
        },
        {
          question: "Identify the adjective in: 'Sara read a good book.'",
          options: ["Sara", "read", "good", "book"],
          answer: 2,
          explanation: "'Good' is the adjective describing the noun 'book'.",
          imageContext: { topic: "Possessive Adjectives", concept: "boy reading his book", keywords: ["book"] }
        }
      ]
    },
    {
      id: "genitive_s",
      number: "02",
      title: "Genitive 's (Possession)",
      subtitle: "Showing ownership and relationships with 's",
      icon: "\u{1F3F7}\uFE0F",
      color: "#dc2626",
      active: true,
      summary: "The Genitive 's (also called possessive 's) shows that something belongs to a person or animal. Rule: Add 's to a singular noun (e.g. Tom's bag, Sara's book, Ali's car).",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Milkiyat (ownership) ya rishta (relationship) dikhane ke liye ke koi cheez kis ki hai ya koi shakhs kis ka rishtedaar hai.",
          english: "To show ownership, possession, or relationships\u2014telling everyone who an object belongs to or how people are related."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "Shakhs ke naam ke aage apostrophe (') aur 's' lagate hain: [Naam + 's + Cheez]. Jaise Tom's bag, Sara's book, Ali's car.",
          english: "Add an apostrophe (') and the letter 's' to the person's name: [Name + 's + Noun]. Example: 'Sara's book', 'Tom's bag', 'Ali's car'.",
          formula: "Owner's Name + 's + Object (e.g. Ali's car, Sara's book)"
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "School, ghar aur office mein kisi ki gari, kitaab, bag, ya family members (Ali's brother, my teacher's desk) batane ke liye.",
          english: "Use it to identify owners of objects and describe family relationships without awkward phrasing like 'the book of Sara'.",
          points: [
            "\u{1F392} Personal Belongings: Tom's bag, Ali's car, John's phone",
            "\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Family Relationships: Sara's brother, my mother's friend",
            "\u{1F3EB} Classroom objects: The teacher's desk, Ali's notebook",
            "\u{1F4A1} Special Rule: Singular name takes 's (Ali's). Regular plural takes only apostrophe (the boys' room)."
          ]
        },
        audioNarration: "Topic 2: Genitive S. Why do we use it? We use the Genitive S to show ownership and possession\u2014to show who something belongs to. How do we use it? Add an apostrophe and the letter S to the person's name, followed by the item, like 'Tom's bag' or 'Sara's book'. What for? Use it to talk about people's personal belongings and family relationships."
      },
      vocab: [
        { word: "Tom's bag", category: "Possession", example: "This is Tom's bag." },
        { word: "Sara's book", category: "Possession", example: "Where is Sara's book?" },
        { word: "Ali's car", category: "Possession", example: "Ali's car is blue." },
        { word: "John's phone", category: "Possession", example: "John's phone is ringing." },
        { word: "The teacher's desk", category: "Possession", example: "The teacher's desk is near the board." },
        { word: "My mother's cake", category: "Possession", example: "My mother's cake is delicious." }
      ],
      examples: [
        { english: "This is Tom's bag.", note: "The bag belongs to Tom." },
        { english: "Sara's book is on the table.", note: "The book of Sara." },
        { english: "Ali's car is outside.", note: "The car belongs to Ali." },
        { english: "Is this John's phone?", note: "Asking about John's possession." },
        { english: "The doctor's office is closed.", note: "The office of the doctor." }
      ],
      practiceQuestions: [
        {
          type: "mcq",
          question: "How do we say 'the book of Sara'?",
          options: ["Saras book", "Sara's book", "Sara book's", "Book's Sara"],
          answer: 1,
          explanation: "Add an apostrophe and s: Sara's book.",
          imageContext: { topic: "Possessive Adjectives", concept: "boy reading his book", keywords: ["book"] }
        },
        {
          type: "mcq",
          question: "The car belongs to Ali. It is ________.",
          options: ["Ali car", "Alis' car", "Ali's car", "Car of Ali's"],
          answer: 2,
          explanation: "Ali + 's = Ali's car.",
          imageContext: { topic: "What Color", concept: "red car", keywords: ["car"] }
        },
        {
          type: "fill",
          question: "That is Tom_____ backpack (add 's or s').",
          answer: "'s",
          options: ["'s", "s'", "s", "is"],
          explanation: "Tom's backpack.",
          imageContext: { topic: "Whose", concept: "backpack school bag possession", keywords: ["backpack", "bag"] }
        },
        {
          type: "mcq",
          question: "Which sentence is correct?",
          options: ["John's phone is ringing.", "John phone is ringing.", "Johns' phone is ringing.", "Phone's John is ringing."],
          answer: 0,
          explanation: "Singular name John takes 's: John's phone."
        }
      ],
      quizQuestions: [
        {
          question: "Whose notebook is on the table? (It belongs to Sara)",
          options: ["It is Saras notebook.", "It is Sara's notebook.", "It is notebook's Sara.", "It is Sara of notebook."],
          answer: 1,
          explanation: "Sara + 's = Sara's notebook."
        },
        {
          question: "Where is the cat_____ food bowl?",
          options: ["'s", "s'", "is", "es"],
          answer: 0,
          explanation: "Cat's food bowl.",
          imageContext: { topic: "Possessive Adjectives", concept: "girl holding her cat pet", keywords: ["cat"] }
        },
        {
          question: "Select the correct punctuation for Mark's sister:",
          options: ["Marks sister", "Mark's sister", "Marks' sister", "Mark sister's"],
          answer: 1,
          explanation: "Mark's sister shows possession."
        },
        {
          question: "My father has a bicycle. That is my __________.",
          options: ["father bicycle", "father's bicycle", "fathers' bicycle", "bicycle's father"],
          answer: 1,
          explanation: "My father's bicycle.",
          imageContext: { topic: "What Color", concept: "blue bicycle", keywords: ["bicycle"] }
        },
        {
          question: "'Ali's car is fast.' What does 'Ali's' show?",
          options: ["Ali is a car", "The car belongs to Ali", "There are many Alis", "Ali is driving fast"],
          answer: 1,
          explanation: "Genitive 's shows possession/ownership.",
          imageContext: { topic: "What Color", concept: "red car", keywords: ["car"] }
        }
      ]
    },
    {
      id: "question_words",
      number: "03",
      title: "Question Words (Wh- Questions)",
      subtitle: "What, Who, Where, When, Why, How",
      icon: "\u2753",
      color: "#059669",
      active: true,
      summary: "Question words (also known as Wh- words) are used to ask specific questions: What (things), Who (people), Where (places), When (time), Why (reasons), and How (manner/way).",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Mukammal aur wazeh maaloomat (specific information) hasil karne ke liye. Sirf Haan ya Naa (Yes/No) ke bajaye poori tafseel lene ke liye.",
          english: "To ask for specific details and information instead of receiving a simple yes or no answer."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "Sawal ke bilkul shuru mein Question Word lagate hain, phir Helping Verb (is/are/do), phir Subject aata hai.",
          english: "Place the Wh- word first, followed by the helping verb and subject: [Question Word + is/are/do + Subject + ...?]",
          formula: "Wh- Word + Helping Verb (is/are/do) + Subject + ...?"
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Alag alag maqsad ke liye alag word istemal hota hai: cheez ke liye What, shakhs ke liye Who, jagah ke liye Where, waqt ke liye When, wajah ke liye Why, aur tareeqay ke liye How.",
          english: "Match each specific Wh- word with what you want to discover:",
          points: [
            "\u2753 What: Cheez ya kaam janne ke liye (What is your name? What is this?)",
            "\u{1F464} Who: Shakhs ya insan janne ke liye (Who is your teacher? Who is that?)",
            "\u{1F4CD} Where: Jagah ya location janne ke liye (Where is Home Academy?)",
            "\u23F0 When: Waqt ya date janne ke liye (When does class start?)",
            "\u{1F4A1} Why: Wajah / Reason janne ke liye (Why are you happy? - Because...)",
            "\u{1F6E0}\uFE0F How: Tareeqa ya haal-chaal janne ke liye (How are you? How do you travel?)"
          ]
        },
        audioNarration: "Topic 3: Question Words. Why do we use them? We use question words to ask for specific information. How do we use them? Put the question word first, followed by the helping verb and subject. What for? Use 'What' for things, 'Who' for people, 'Where' for places, 'When' for time, 'Why' for reasons, and 'How' for manner."
      },
      vocab: [
        { word: "What", category: "Thing / Action", example: "What is your name?" },
        { word: "Who", category: "Person", example: "Who is your English teacher?" },
        { word: "Where", category: "Place", example: "Where is Home Academy located?" },
        { word: "When", category: "Time", example: "When does the class start?" },
        { word: "Why", category: "Reason", example: "Why are you studying English?" },
        { word: "How", category: "Manner / Condition", example: "How are you today?" }
      ],
      examples: [
        { english: "What is this? - It is a dictionary.", note: "Asking about an object" },
        { english: "Who is that man? - He is Mr. Ahmad.", note: "Asking about a person" },
        { english: "Where are you going? - To school.", note: "Asking about a destination" },
        { english: "When is the exam? - At 9:00 AM.", note: "Asking about time" },
        { english: "Why are you happy? - Because I passed the test.", note: "Asking for a reason ('Because...')" },
        { english: "How do you spell your name? - Y-A-S-I-R.", note: "Asking about manner or method" }
      ],
      practiceQuestions: [
        {
          type: "mcq",
          question: "______ is your best friend? (Answer: Hamza)",
          options: ["Where", "Who", "What", "When"],
          answer: 1,
          explanation: "'Who' asks about a person."
        },
        {
          type: "mcq",
          question: "______ is the library? (Answer: Next to the park)",
          options: ["Where", "When", "Why", "Who"],
          answer: 0,
          explanation: "'Where' asks about location."
        },
        {
          type: "fill",
          question: "_____ are you late? - Because the bus was delayed.",
          answer: "Why",
          options: ["Why", "Where", "Who", "What"],
          explanation: "'Why' asks for a reason (answered by 'Because')."
        },
        {
          type: "mcq",
          question: "______ time do you wake up?",
          options: ["What", "Who", "Why", "How"],
          answer: 0,
          explanation: "'What time' asks for the specific hour."
        }
      ],
      quizQuestions: [
        {
          question: "'______ is that girl?' - 'She is my sister Sara.'",
          options: ["Who", "What", "Where", "When"],
          answer: 0,
          explanation: "Sara is a person, so we use 'Who'."
        },
        {
          question: "'______ is your birthday?' - 'In July.'",
          options: ["Where", "When", "Why", "Who"],
          answer: 1,
          explanation: "'When' asks about time or dates."
        },
        {
          question: "'______ do you come to school?' - 'By bus.'",
          options: ["How", "Why", "Where", "What"],
          answer: 0,
          explanation: "'How' asks about the mode of transportation."
        },
        {
          question: "'______ is in your backpack?' - 'Books and pens.'",
          options: ["Who", "What", "When", "Why"],
          answer: 1,
          explanation: "'What' asks about objects."
        },
        {
          question: "Which question word matches with the answer 'Because it is raining'?",
          options: ["Why", "Where", "Who", "When"],
          answer: 0,
          explanation: "'Why' asks why something happened."
        }
      ]
    },
    {
      id: "whose",
      number: "04",
      title: "Whose (Inquiring Ownership)",
      subtitle: "Asking who owns an object: 'Whose bag is this?'",
      icon: "\u{1F392}",
      color: "#d97706",
      active: true,
      summary: "Use 'Whose' to ask who owns an item. Pattern: 'Whose + noun + is this / are these?' Response: 'It is + Name's + noun' or 'It is + Possessive Pronoun'.",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Kisi cheez ke maalik (owner) ke bare mein sawal karne ke liye ke 'Ye kis ka hai?' / 'Ye cheez kis ki hai?'.",
          english: "To inquire about ownership\u2014asking specifically who owns an object."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "Sawal mein 'Whose + Noun + is this/are these?' lagate hain. Jawab mein 'It is + Name's + Noun' (Genitive 's) istemal hota hai.",
          english: "Question pattern: [Whose + Noun + is this / are these?]. Answer pattern: [It is + Name's + Noun] or [They are + Name's + Nouns].",
          formula: "Q: Whose + [Item] + is this? \u2794 A: It is [Name]'s [Item]."
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Classroom ya ghar mein koi gumshuda ya rakhi hui cheez (pen, bag, phone, kitaab) ka maalik janne ke liye.",
          english: "Use it whenever an object is found, shared, or questioned to locate its rightful owner.",
          points: [
            "\u{1F392} Single cheez: Whose bag is this? \u2794 It is Tom's bag.",
            "\u{1F697} Door ki cheez: Whose car is that? \u2794 It is Ali's car.",
            "\u{1F4DA} Plural cheezein: Whose books are these? \u2794 They are Sara's books.",
            "\u{1F4A1} Difference: 'Whose' (kis ka) vs 'Who's' (Who is = kaun hai)."
          ]
        },
        audioNarration: "Topic 4: Whose. Why do we use it? We use 'Whose' to ask who owns an item. How do we use it? Ask: 'Whose bag is this?' And answer: 'It is Tom's bag' using Genitive S. What for? Use it in class or at home whenever you want to find the owner of a bag, pen, book, or phone."
      },
      vocab: [
        { word: "Whose bag is this?", category: "Singular Question", example: "It is Tom's bag." },
        { word: "Whose phone is that?", category: "Singular Question", example: "It is Sara's phone." },
        { word: "Whose books are these?", category: "Plural Question", example: "They are Ali's books." },
        { word: "Whose shoes are those?", category: "Plural Question", example: "They are John's shoes." },
        { word: "Whose pen is on the desk?", category: "Location Question", example: "It is the teacher's pen." }
      ],
      examples: [
        { english: "Whose bag is this? - It is Tom's bag.", note: "Singular near object" },
        { english: "Whose jacket is that? - It is Sara's jacket.", note: "Singular distant object" },
        { english: "Whose pens are these? - They are Ali's pens.", note: "Plural near objects" },
        { english: "Whose keys are on the floor? - They are mine.", note: "Asking about ownership" },
        { english: "Whose car is outside? - It is my father's car.", note: "Family ownership" }
      ],
      practiceQuestions: [
        {
          type: "mcq",
          question: "______ pen is this? (Asking about owner)",
          options: ["Who", "Whose", "Who's", "Which"],
          answer: 1,
          explanation: "'Whose' asks about possession. 'Who's' means 'who is'."
        },
        {
          type: "mcq",
          question: "'Whose book is this?' - 'It is _______.'",
          options: ["Tom", "Tom's", "Toms", "of Tom"],
          answer: 1,
          explanation: "Answer with the Genitive 's: It is Tom's."
        },
        {
          type: "fill",
          question: "______ keys are these? (Who / Whose)",
          answer: "Whose",
          options: ["Whose", "Who", "What", "Where"],
          explanation: "'Whose' asks about ownership of the keys."
        },
        {
          type: "mcq",
          question: "Whose bag is this? - 'It is _______ bag.'",
          options: ["Sara", "Sara's", "Saras", "her's"],
          answer: 1,
          explanation: "Sara's bag.",
          imageContext: { topic: "Whose", concept: "backpack school bag possession", keywords: ["bag", "backpack"] }
        }
      ],
      quizQuestions: [
        {
          question: "Choose the correct question: '______ dog is barking?'",
          options: ["Who's", "Whose", "Who", "Whom"],
          answer: 1,
          explanation: "'Whose' asks about ownership of the dog."
        },
        {
          question: "'Whose notebook is this?' - Complete the answer: 'It is ______.'",
          options: ["Ali's notebook", "Ali notebook", "Notebook of Ali's", "Alis notebook"],
          answer: 0,
          explanation: "It is Ali's notebook."
        },
        {
          question: "Difference check: 'Who's' means:",
          options: ["Whose", "Who is", "Who has not", "Whom"],
          answer: 1,
          explanation: "'Who's' is a contraction for 'Who is'."
        },
        {
          question: "'Whose pencils are these?' - 'They are ______.'",
          options: ["Sara's", "Sara", "Sara is", "Saras'"],
          answer: 0,
          explanation: "They are Sara's."
        },
        {
          question: "Which sentence asks about ownership correctly?",
          options: ["Whose watch is this?", "Who watch is this?", "Who is watch is this?", "Which watch is whose?"],
          answer: 0,
          explanation: "'Whose watch is this?' is the standard grammatical structure.",
          imageContext: { topic: "Whose", concept: "wrist watch on table", keywords: ["watch"] }
        }
      ]
    },
    {
      id: "possessive_adjectives",
      number: "05",
      title: "Possessive Adjectives",
      subtitle: "my, your, his, her, its, our, their",
      icon: "\u{1F91D}",
      color: "#7c3aed",
      active: true,
      summary: "Possessive adjectives show that something belongs to someone. They always come BEFORE a noun: my book, your car, his phone (male), her bag (female), its tail (thing/animal), our class, their house.",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Bina baar baar naam dohrane ke, aasan aur mukhtasar tareeqay se apni ya doosron ki milkiyat (ownership) zahir karne ke liye.",
          english: "To show who owns a noun easily and naturally without having to repeat names over and over."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "Hamesha kisi Noun se foran pehle aate hain: [my/your/his/her/its/our/their + Noun].",
          english: "Always place them directly before the noun: [Possessive Adjective + Noun]. For example: 'my book', 'your car', 'our academy'.",
          formula: "my / your / his / her / its / our / their + Noun"
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Apni cheezon, doston, family members, aur school ke bare mein baat karne ke liye.",
          english: "Use them in every conversation to refer to your personal possessions and relationships:",
          points: [
            "\u{1F464} I \u2794 my (my pencil, my teacher)",
            "\u{1F465} You \u2794 your (your name, your book)",
            "\u{1F468} He (Larka) \u2794 his (his bike, his brother)",
            "\u{1F469} She (Larki) \u2794 her (her cat, her jacket)",
            "\u{1F431} It (Cheez/Janwar) \u2794 its (its tail, its color - no apostrophe!)",
            "\u{1F46B} We \u2794 our (our class, our academy)",
            "\u{1F468}\u200D\u{1F469}\u200D\u{1F466} They \u2794 their (their house, their project)"
          ]
        },
        audioNarration: "Topic 5: Possessive Adjectives. Why do we use them? We use possessive adjectives to clearly show ownership without repeating names. How do we use them? Place them directly before the noun: 'my book', 'your pen', 'his car', 'her cat', 'our school', and 'their team'. What for? Use them in daily conversations to describe your belongings and relationships."
      },
      vocab: [
        { word: "my", pronoun: "I", example: "This is my pencil." },
        { word: "your", pronoun: "You", example: "What is your name?" },
        { word: "his", pronoun: "He", example: "His brother is a doctor." },
        { word: "her", pronoun: "She", example: "Her cat is white." },
        { word: "its", pronoun: "It", example: "The dog wagged its tail." },
        { word: "our", pronoun: "We", example: "Our school is Home Academy." },
        { word: "their", pronoun: "They", example: "Their parents are here." }
      ],
      examples: [
        { english: "I have a bag. It is my bag.", note: "I -> my" },
        { english: "You have a key. It is your key.", note: "You -> your" },
        { english: "Tom has a bike. It is his bike.", note: "He -> his" },
        { english: "Sara has a coat. It is her coat.", note: "She -> her" },
        { english: "The bird opened its wings.", note: "It -> its (no apostrophe!)" },
        { english: "We love our English class.", note: "We -> our" },
        { english: "They cleaned their room.", note: "They -> their" }
      ],
      practiceQuestions: [
        {
          type: "mcq",
          question: "Sara lost ______ pencil case.",
          options: ["his", "her", "its", "their"],
          answer: 1,
          explanation: "Sara is female (she), so we use 'her'."
        },
        {
          type: "mcq",
          question: "Ali forgot ______ homework at home.",
          options: ["her", "his", "my", "our"],
          answer: 1,
          explanation: "Ali is male (he), so we use 'his'."
        },
        {
          type: "fill",
          question: "We study English together. ______ teacher is great!",
          answer: "Our",
          options: ["Our", "Their", "His", "My"],
          explanation: "For 'we', the possessive adjective is 'our'."
        },
        {
          type: "mcq",
          question: "Look at the cat! ______ eyes are green.",
          options: ["It's", "Its", "His", "Her"],
          answer: 1,
          explanation: "'Its' is the possessive form for animals/things without an apostrophe.",
          imageContext: { topic: "Possessive Adjectives", concept: "girl holding her cat pet", keywords: ["cat"] }
        }
      ],
      quizQuestions: [
        {
          question: "John is washing ______ car right now.",
          options: ["her", "his", "their", "its"],
          answer: 1,
          explanation: "John is male, so we use 'his'.",
          imageContext: { topic: "What Color", concept: "red car", keywords: ["car"] }
        },
        {
          question: "Mary and Sara are doing ______ project.",
          options: ["their", "our", "her", "his"],
          answer: 0,
          explanation: "Mary and Sara = They, so we use 'their'."
        },
        {
          question: "I love ______ English program at Home Academy.",
          options: ["my", "his", "its", "her"],
          answer: 0,
          explanation: "For 'I', use 'my'."
        },
        {
          question: "You need to put ______ books on the table.",
          options: ["your", "you're", "its", "her"],
          answer: 0,
          explanation: "'Your' is the possessive adjective for 'you'.",
          imageContext: { topic: "Possessive Adjectives", concept: "boy reading his book", keywords: ["book"] }
        },
        {
          question: "Which pair is correct?",
          options: ["He -> her", "She -> his", "We -> our", "They -> its"],
          answer: 2,
          explanation: "'We' corresponds to 'our'."
        }
      ]
    },
    {
      id: "what_color_genitive_s",
      number: "06",
      title: "What Color + Genitive 's",
      subtitle: "Asking and answering colors of possessions",
      icon: "\u{1F308}",
      color: "#0891b2",
      active: true,
      summary: "Combining color questions with Genitive 's: Question: 'What color is Tom's car?' Answer: 'The car is red' or 'Tom's car is red' or 'It is red'. For plural items: 'What color are Sara's shoes?' -> 'They are black'.",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Kisi shakhs ki cheezon ke rang (colors) ke bare mein sawal karne aur jawab dene ke liye.",
          english: "To ask about and describe the specific color of someone's personal belongings."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "'What color' ke sath Genitive 's milate hain: Sawal: 'What color is Tom's car?' Jawab: 'It is red' ya 'Tom's car is red'.",
          english: "Combine 'What color' with Genitive 's: [What color is + Person's + Object?]. Answer: [It is + Color] or [Person's + Object + is + Color].",
          formula: "What color is [Name]'s [Item]? \u2794 It is [Color]."
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Classroom objects, kapray, gariyan aur Home Academy ke official colors (navy blue, red, golden yellow) bayan karne ke liye.",
          english: "Use it to describe clothes, cars, classroom stationery, and academy items by their colors:",
          points: [
            "\u{1F697} Singular item: What color is Tom's car? \u2794 It is red.",
            "\u{1F45F} Plural items: What color are Ali's shoes? \u2794 They are black.",
            "\u{1F4D2} Possessive: What color is your notebook? \u2794 My notebook is yellow.",
            "\u{1F3EB} Home Academy logo: It is navy blue, red, and golden yellow!"
          ]
        },
        audioNarration: "Topic 6: What Color plus Genitive S. Why do we use it? We use this structure to ask about and describe the color of someone's possession. How do we use it? Ask: 'What color is Tom's car?' and answer: 'Tom's car is red' or 'It is red'. What for? Use it to identify clothes, vehicles, classroom supplies, and logo colors."
      },
      vocab: [
        { word: "What color is Tom's car?", category: "Question (Singular)", example: "Tom's car is red." },
        { word: "What color is Sara's bag?", category: "Question (Singular)", example: "The bag is blue." },
        { word: "What color are Ali's shoes?", category: "Question (Plural)", example: "Ali's shoes are black." },
        { word: "What color is the teacher's pen?", category: "Question (Singular)", example: "The pen is green." },
        { word: "What color is your notebook?", category: "Question (Possessive)", example: "My notebook is yellow." }
      ],
      examples: [
        { english: "What color is Tom's car? - Tom's car is red.", note: "Full answer with Genitive 's" },
        { english: "What color is Sara's dress? - It is yellow.", note: "Short pronoun answer" },
        { english: "What color are John's eyes? - His eyes are brown.", note: "Plural question with 'are'" },
        { english: "What color is Ali's backpack? - The backpack is blue.", note: "Singular with definite article 'The'" },
        { english: "What color is the Home Academy logo? - It is navy blue, red, and golden yellow.", note: "Real academy colors!" }
      ],
      practiceQuestions: [
        {
          type: "mcq",
          question: "Question: 'What color ______ Tom's car?'",
          options: ["is", "are", "do", "does"],
          answer: 0,
          explanation: "'Tom's car' is singular, so we use 'is'.",
          imageContext: { topic: "What Color", concept: "red car", keywords: ["car"] }
        },
        {
          type: "mcq",
          question: "Question: 'What color ______ Sara's shoes?'",
          options: ["is", "are", "have", "am"],
          answer: 1,
          explanation: "'Sara's shoes' is plural, so we use 'are'."
        },
        {
          type: "fill",
          question: "'What color is Ali's bike?' - 'Ali's bike _____ red.'",
          answer: "is",
          options: ["is", "are", "have", "has"],
          explanation: "Bike is singular, so use 'is'.",
          imageContext: { topic: "What Color", concept: "blue bicycle", keywords: ["bicycle", "bike"] }
        },
        {
          type: "mcq",
          question: "Choose the correct full answer: 'What color is John's phone?'",
          options: [
            "John's phone is black.",
            "Phone's John is black.",
            "John phone black is.",
            "The black is John phone."
          ],
          answer: 0,
          explanation: "'John's phone is black' is grammatically correct."
        }
      ],
      quizQuestions: [
        {
          question: "'What color is Tom's jacket?' Choose the best answer:",
          options: [
            "Tom jacket is brown.",
            "Tom's jacket is brown.",
            "Jacket Tom is brown.",
            "Brown is Tom jacket."
          ],
          answer: 1,
          explanation: "Genitive 's is required: Tom's jacket is brown."
        },
        {
          question: "Complete the question: 'What color ______ Mary's eyes?'",
          options: ["is", "are", "was", "has"],
          answer: 1,
          explanation: "Eyes are plural, so we use 'are'."
        },
        {
          question: "'What color is the Home Academy logo?'",
          options: [
            "Navy blue, red, and golden yellow",
            "Pink and purple only",
            "Neon green and orange",
            "Grey and brown"
          ],
          answer: 0,
          explanation: "Home Academy brand colors are Navy Blue, Red, and Golden Yellow."
        },
        {
          question: "'What color are Ali's notebooks?' - '______ are green.'",
          options: ["It", "They", "He", "She"],
          answer: 1,
          explanation: "'Notebooks' is plural, so the subject pronoun is 'They'."
        },
        {
          question: "Which sentence combines 'What color' and 'Genitive 's' correctly?",
          options: [
            "What color is Sara's car?",
            "What color Sara car is?",
            "What color are Sara car?",
            "Sara's what color is car?"
          ],
          answer: 0,
          explanation: "'What color is Sara's car?' follows the correct question order."
        }
      ]
    },
    {
      id: "could_requests",
      number: "07",
      title: "Could \u2014 Polite Requests",
      subtitle: "Asking politely with 'Could you...?'",
      icon: "\u{1F91D}",
      color: "#7c3aed",
      active: true,
      summary: "We use 'Could you...?' when we want to politely ask someone to do something. Structure: Could you + base verb + ...? (e.g. 'Could you please open the door?'). Always use the base form of the verb (never past tense or -ing).",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Kisi se koi kaam nihayat shistagi aur adab (polite request) ke sath karwane ke liye taake samne wale ko bura na lage.",
          english: "To make polite and respectful requests when asking someone to do something for you."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "Jumle ke shuru mein 'Could you' lagate hain aur uske foran baad verb ki pehli (base) form aati hai. Sath mein 'please' bhi laga sakte hain.",
          english: "Start with 'Could you' followed immediately by the base verb: [Could you + base verb + ... ?]. You can add 'please' for extra politeness.",
          formula: "Could you + base verb + ... ?  (e.g. Could you please open the door?)"
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Classroom, office, ghar ya bazaar mein kisi se madad maangne ya koi cheez pakarwane ke liye.",
          english: "Use it whenever asking for help, asking someone to open a door or window, pass an object, or speak slowly.",
          points: [
            "\u{1F6AA} Actions: Could you please open the door? / Could you close the window?",
            "\u{1F4F1} Passing Objects: Could you pass the phone, please? / Could you give me a pen?",
            "\u{1F91D} Asking for Help: Could you please help me with this?",
            "\u{1F4A7} Everyday Favors: Could you bring me some water? / Could you turn on the light?",
            "\u{1F5E3}\uFE0F Classroom Communication: Could you please repeat that? / Could you speak slowly?",
            "\u26A0\uFE0F REMEMBER: Always use base verb! Say 'Could you open', NOT 'Could you opening' or 'Could you opened'."
          ]
        },
        audioNarration: "Topic 7: Could \u2014 Polite Requests. Why do we use it? We use 'Could you' when we want to politely ask someone to do something. How is it formed? Use 'Could you' followed by the base verb: Could you please open the door? Remember: always use the base form of the verb, like 'open', 'help', or 'pass'. Never use past tense or ing."
      },
      vocab: [
        { word: "open", category: "Action", example: "Could you please open the door?" },
        { word: "close", category: "Action", example: "Could you close the window, please?" },
        { word: "help", category: "Assistance", example: "Could you please help me with this?" },
        { word: "pass", category: "Favor", example: "Could you pass the phone, please?" },
        { word: "give", category: "Object", example: "Could you please give me a pen?" },
        { word: "bring", category: "Object", example: "Could you please bring me some water?" },
        { word: "repeat", category: "Speech", example: "Could you please repeat that?" },
        { word: "speak slowly", category: "Speech", example: "Could you please speak slowly?" },
        { word: "turn on", category: "Action", example: "Could you please turn on the light?" },
        { word: "turn off", category: "Action", example: "Could you please turn off the fan?" },
        { word: "wait", category: "Action", example: "Could you please wait here?" },
        { word: "write it down", category: "Action", example: "Could you please write it down?" }
      ],
      examples: [
        { english: "Could you please open the door?", note: "Polite request with 'please'" },
        { english: "Could you pass the phone, please?", note: "Natural short form with 'please' at the end" },
        { english: "Could you please close the window?", note: "Base verb 'close'" },
        { english: "Could you please help me with this?", note: "Polite request for assistance" },
        { english: "Could you please bring me some water?", note: "Polite request for an item" },
        { english: "Could you please speak slowly?", note: "Polite request in English conversation" }
      ],
      practiceQuestions: [
        {
          type: "mcq",
          question: "Choose the correct polite sentence:",
          options: [
            "Could you please open the door?",
            "Could you opening the door?",
            "Could you opened the door?",
            "Could you opens the door?"
          ],
          answer: 0,
          explanation: "Always use 'Could you' + base verb ('open')."
        },
        {
          type: "fill",
          question: "Could you please _____ the window?",
          options: ["close", "closed", "closing", "closes"],
          answer: "close",
          explanation: "After 'Could you please', we use the base verb 'close'."
        },
        {
          type: "choose_sentence",
          question: "Complete the conversation: A: 'I can't hear the teacher.' B: '______'",
          options: [
            "Could you please speak slowly?",
            "Could you speaking slowly?",
            "Could you spoke slowly?",
            "Could you speaks slowly?"
          ],
          answer: 0,
          explanation: "'Could you please speak slowly?' is the polite request using base verb 'speak'."
        },
        {
          type: "true_false",
          question: "True or False: We can say 'Could you pass the phone, please?' with 'please' at the end.",
          options: [
            "True \u2014 'Please' at the end is very natural and polite",
            "False \u2014 'Please' is never allowed at the end"
          ],
          answer: 0,
          explanation: "Yes! Both 'Could you please pass...' and 'Could you pass..., please?' are correct."
        },
        {
          type: "mcq",
          question: "Which verb form is correct after 'Could you please'?",
          options: [
            "Base verb (e.g. give, help, open)",
            "Past verb (e.g. gave, helped, opened)",
            "-ing verb (e.g. giving, helping, opening)",
            "-ed verb (e.g. closed, walked)"
          ],
          answer: 0,
          explanation: "Always use the base form of the verb after 'Could you'."
        }
      ],
      quizQuestions: [
        {
          question: "Choose the grammatically correct polite request:",
          options: [
            "Could you please help me?",
            "Could you helping me?",
            "Could you helped me?",
            "Could you helps me?"
          ],
          answer: 0,
          explanation: "'Could you' must be followed by base verb 'help'."
        },
        {
          question: "Complete: 'Could you please ______ me some water?'",
          options: ["bring", "brought", "bringing", "brings"],
          answer: 0,
          explanation: "'Bring' is the base verb."
        },
        {
          question: "You want your classmate to give you a pen. What do you say?",
          options: [
            "Could you please give me a pen?",
            "Could you gave me a pen?",
            "Could you giving me a pen?",
            "You give me a pen now."
          ],
          answer: 0,
          explanation: "'Could you please give me a pen?' is polite and uses the base verb 'give'."
        },
        {
          question: "Complete: 'Could you please ______ the fan?'",
          options: ["turn off", "turned off", "turning off", "turns off"],
          answer: 0,
          explanation: "Base form 'turn off' is correct."
        },
        {
          question: "A friend is speaking too fast. You politely ask: 'Could you please ______ that?'",
          options: ["repeat", "repeated", "repeating", "repeats"],
          answer: 0,
          explanation: "'Could you please repeat that?' uses the base verb 'repeat'."
        }
      ]
    },
    {
      id: "how_much_price",
      number: "08",
      title: "How Much \u2014 Singular and Plural",
      subtitle: "Asking about price for one and multiple items",
      icon: "\u{1F3F7}\uFE0F",
      color: "#0d9488",
      active: true,
      summary: "We use 'How much...?' to ask about the price of something. Rule: Use 'How much is' for ONE item (singular) and 'How much are' for MORE THAN ONE item (plural). Examples: 'How much is this bag?' (1 bag) vs 'How much are these shoes?' (2 shoes).",
      explanationGuide: {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: "Bazaar, dukaan ya shopping mall mein kisi bhi cheez ki qeemat (price) maloom karne ke liye.",
          english: "To ask the price or cost of an item or multiple items in everyday shopping and life."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "Agar aik cheez (singular) ho to 'How much is' bolte hain. Agar aik se zyada cheezein (plural) hon to 'How much are' bolte hain.",
          english: "Use 'How much is' + singular noun. Use 'How much are' + plural noun.",
          formula: "ONE ITEM: How much is + singular item?  \u2022  MULTIPLE ITEMS: How much are + plural items?"
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Rozmarrah khareedari (shopping) mein kapre, joote, phone, kitaabein aur deegar cheezon ki qeemat poochne ke liye.",
          english: "Use it whenever you go shopping or ask anyone how much something costs.",
          points: [
            "\u{1F6CD}\uFE0F ONE ITEM (Singular): How much is this phone? / How much is that bag?",
            "\u{1F45F} MULTIPLE ITEMS (Plural): How much are these shoes? / How much are those books?",
            "\u{1F4A1} Pronouns for Singular: How much is this? / How much is that? / How much is it?",
            "\u{1F4A1} Pronouns for Plural: How much are these? / How much are those? / How much are they?",
            "\u26A0\uFE0F CORE RULE: IS = 1 item (phone, bag, shirt) \u2022 ARE = 2+ items (shoes, books, glasses)."
          ]
        },
        audioNarration: "Topic 8: How Much \u2014 Singular and Plural. Why do we use it? We use 'How much' to ask the price of something. How is it formed? For one item, use 'How much is': How much is this phone? How much is that bag? For multiple items, use 'How much are': How much are these shoes? How much are those books? Remember: use 'is' for one item and 'are' for more than one."
      },
      vocab: [
        { word: "How much is this?", category: "Singular Price", example: "How much is this? (One item near you)" },
        { word: "How much is that?", category: "Singular Price", example: "How much is that? (One item further away)" },
        { word: "How much is the phone?", category: "Singular Price", example: "How much is the phone? (Single phone)" },
        { word: "How much is this bag?", category: "Singular Price", example: "How much is this bag? (Single bag)" },
        { word: "How much is that shirt?", category: "Singular Price", example: "How much is that shirt? (Single shirt)" },
        { word: "How much is this book?", category: "Singular Price", example: "How much is this book? (Single book)" },
        { word: "How much are these?", category: "Plural Price", example: "How much are these? (Multiple items near you)" },
        { word: "How much are those?", category: "Plural Price", example: "How much are those? (Multiple items far)" },
        { word: "How much are the shoes?", category: "Plural Price", example: "How much are the shoes? (Pair of shoes)" },
        { word: "How much are these bags?", category: "Plural Price", example: "How much are these bags? (Multiple bags)" },
        { word: "How much are those books?", category: "Plural Price", example: "How much are those books? (Multiple books)" },
        { word: "How much are the glasses?", category: "Plural Price", example: "How much are the glasses? (Plural item)" }
      ],
      examples: [
        { english: "How much is this phone?", note: "Singular: 1 phone -> uses 'is'" },
        { english: "How much are these phones?", note: "Plural: 2+ phones -> uses 'are'" },
        { english: "How much is that bag?", note: "Singular: 1 bag -> uses 'is'" },
        { english: "How much are those bags?", note: "Plural: 2+ bags -> uses 'are'" },
        { english: "How much are the shoes?", note: "Plural: shoes -> uses 'are'" },
        { english: "How much is the chair?", note: "Singular: chair -> uses 'is'" }
      ],
      practiceQuestions: [
        {
          type: "choose_sentence",
          question: "Choose the correct sentence to ask the price of one bag:",
          options: [
            "How much is this bag?",
            "How much are this bag?",
            "How much is these bag?",
            "How much are this bags?"
          ],
          answer: 0,
          explanation: "'This bag' is singular (one item), so we use 'How much is'."
        },
        {
          type: "choose_sentence",
          question: "Choose the correct sentence to ask the price of multiple shoes:",
          options: [
            "How much are these shoes?",
            "How much is these shoes?",
            "How much are this shoes?",
            "How much is those shoes?"
          ],
          answer: 0,
          explanation: "'Shoes' is plural, so we use 'How much are these shoes?'."
        },
        {
          type: "fill",
          question: "How much _____ that phone?",
          options: ["is", "are", "am", "be"],
          answer: "is",
          explanation: "'That phone' is singular, so we use 'is'."
        },
        {
          type: "fill",
          question: "How much _____ these shoes?",
          options: ["are", "is", "am", "be"],
          answer: "are",
          explanation: "'These shoes' are plural, so we use 'are'."
        },
        {
          type: "mcq",
          question: "You point to ONE shirt in a shop. What do you ask?",
          options: [
            "How much is that shirt?",
            "How much are that shirt?",
            "How much is those shirts?",
            "How much are that shirts?"
          ],
          answer: 0,
          explanation: "'That shirt' is one item, so use 'How much is'."
        }
      ],
      quizQuestions: [
        {
          question: "Complete: 'How much _____ this bag?'",
          options: ["is", "are", "am", "be"],
          answer: 0,
          explanation: "'This bag' is singular, so we use 'is'."
        },
        {
          question: "Complete: 'How much _____ those books?'",
          options: ["are", "is", "am", "be"],
          answer: 0,
          explanation: "'Those books' is plural, so we use 'are'."
        },
        {
          question: "Which question is correct for multiple shirts?",
          options: [
            "How much are these shirts?",
            "How much is these shirts?",
            "How much are this shirt?",
            "How much is this shirts?"
          ],
          answer: 0,
          explanation: "'These shirts' is plural, so we use 'How much are'."
        },
        {
          question: "Complete: 'How much _____ they?'",
          options: ["are", "is", "am", "be"],
          answer: 0,
          explanation: "'They' is plural, so we use 'are': 'How much are they?'."
        },
        {
          question: "'How much is the pen?' \u2014 Why do we use 'is' here?",
          options: [
            "Because 'the pen' is singular (one pen)",
            "Because 'the pen' is plural",
            "Because 'is' means past tense",
            "Because pens are always plural"
          ],
          answer: 0,
          explanation: "We use 'is' because 'the pen' is a single item."
        }
      ]
    }
  ];
  function getActiveTopics(topics = OFFICIAL_TOPICS) {
    return topics.filter((t) => t.active !== false);
  }
  function getTopicById(id, topics = OFFICIAL_TOPICS) {
    return topics.find((t) => t.id === id) || null;
  }
  function generateDailyDrill(topics = OFFICIAL_TOPICS) {
    const active = getActiveTopics(topics);
    const questions = [];
    active.forEach((topic) => {
      if (topic.practiceQuestions && topic.practiceQuestions.length > 0) {
        const q = topic.practiceQuestions[Math.floor(Math.random() * topic.practiceQuestions.length)];
        questions.push({
          ...q,
          topicId: topic.id,
          topicTitle: topic.title,
          topicIcon: topic.icon
        });
      }
    });
    return questions;
  }

  // js/data/roleplay-data.js
  var OFFICIAL_ROLEPLAYS = [
    {
      id: "rp_01",
      number: "01",
      title: "A Friend Visits Another Friend's House",
      subtitle: "Describing people, rooms, and items in the house using adjectives",
      icon: "\u{1F3E1}",
      color: "#0A2558",
      active: true,
      scenario: "You are visiting your friend's house. You talk about the people and things in the house and describe them using adjectives.",
      grammarFocus: ["Adjectives"],
      grammarDescription: "Use descriptive words (adjectives) such as tall, friendly, helpful, clean, big, tidy, and modern to describe people, rooms, and furniture.",
      imageContext: {
        url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
        alt: "Friends having a polite and comfortable conversation inside a clean, modern, spacious living room",
        photographer: "Priscilla Du Preez",
        photographerUrl: "https://unsplash.com/@priscilladupreez",
        searchQuery: "clean big living room conversation"
      },
      // Exact expressions given by Sir Zubair
      spokenExpressions: [
        {
          id: "rp1_exp_1",
          text: "Welcome to my house.",
          meaning: "A polite and warm greeting when someone arrives at your home.",
          context: "Greeting guest at entrance"
        },
        {
          id: "rp1_exp_2",
          text: "Make yourself comfortable.",
          meaning: "Telling your guest to relax and feel at home.",
          context: "Inviting guest to sit down"
        },
        {
          id: "rp1_exp_3",
          text: "Who is knocking on the door?",
          meaning: "Asking about someone making a sound outside the entrance.",
          context: "Hearing a knock"
        },
        {
          id: "rp1_exp_4",
          text: "My brother is helpful and friendly.",
          meaning: "Describing a family member's positive personality traits.",
          context: "Introducing or describing family"
        },
        {
          id: "rp1_exp_5",
          text: "That's nice.",
          meaning: "A friendly response showing you appreciate what the other person said.",
          context: "Responding politely"
        },
        {
          id: "rp1_exp_6",
          text: "Is your brother tall?",
          meaning: "Asking about physical appearance using an adjective.",
          context: "Asking about a person"
        },
        {
          id: "rp1_exp_7",
          text: "Your living room is very clean and big.",
          meaning: "Complimenting a room using descriptive adjectives.",
          context: "Complimenting the host's house"
        },
        {
          id: "rp1_exp_8",
          text: "Thank you for visiting. See you again.",
          meaning: "Polite farewell when a guest leaves.",
          context: "Saying goodbye at the door"
        }
      ],
      keyVocab: [
        { word: "Friendly", meaning: "Kind and pleasant to others", type: "Adjective", example: "He is very friendly." },
        { word: "Helpful", meaning: "Ready to assist or give help", type: "Adjective", example: "My sister is helpful." },
        { word: "Comfortable", meaning: "Relaxing and pleasant", type: "Adjective", example: "This sofa is comfortable." },
        { word: "Spacious / Big", meaning: "Having a lot of room or space", type: "Adjective", example: "The kitchen is big." },
        { word: "Clean / Tidy", meaning: "Free from dirt, neat and organized", type: "Adjective", example: "Your room is clean." }
      ],
      // Practice Question Pool (Sampled and randomized)
      practiceQuestions: [
        {
          id: "rp1_q1",
          type: "mcq",
          question: "When a guest arrives at your front door, what is the best greeting to say?",
          options: ["Welcome to my house.", "Where are my shoes?", "Close the door now.", "I am very tired."],
          correct: 0,
          explanation: "'Welcome to my house' is the polite, friendly greeting Sir Zubair taught for inviting someone inside."
        },
        {
          id: "rp1_q2",
          type: "fill",
          question: "Complete the compliment: 'Your living room is very ______ and big.'",
          options: ["clean", "shout", "yesterday", "door"],
          correct: 0,
          explanation: "'Clean' is an adjective that describes the pleasant condition of the room."
        },
        {
          id: "rp1_q3",
          type: "expression_match",
          question: "Your friend says: 'Make yourself comfortable.' What does this mean?",
          options: ["Please relax and feel at home.", "Please clean my room.", "You should leave now.", "Please stand outside."],
          correct: 0,
          explanation: "'Make yourself comfortable' means sit down, relax, and feel at home."
        },
        {
          id: "rp1_q4",
          type: "grammar_check",
          question: "Which sentence correctly uses an adjective to describe a brother?",
          options: [
            "My brother is helpful and friendly.",
            "My brother is run fast yesterday.",
            "My brother house is big door.",
            "My brother on the table."
          ],
          correct: 0,
          explanation: "'Helpful' and 'friendly' are adjectives describing the brother."
        },
        {
          id: "rp1_q5",
          type: "mcq",
          question: "Your friend asks: 'Is your brother tall?' What is a good grammatically correct response?",
          options: [
            "Yes, he is very tall and athletic.",
            "No, he is yesterday.",
            "He have three books.",
            "Yes, he door is open."
          ],
          correct: 0,
          explanation: "'Yes, he is very tall' directly answers the question using the adjective 'tall'."
        },
        {
          id: "rp1_q6",
          type: "mcq",
          question: "When your friend is leaving after the visit, what should you say?",
          options: [
            "Thank you for visiting. See you again.",
            "Why are you here?",
            "Knock on the door.",
            "The house is clean."
          ],
          correct: 0,
          explanation: "'Thank you for visiting. See you again' is the warm farewell expression taught by Sir Zubair."
        }
      ],
      // Prompts for "Create Your Own Sentence"
      sentencePrompts: [
        {
          id: "rp1_sp_1",
          title: "Describe a Family Member",
          instruction: "Describe your brother, sister, mother, or father using at least one adjective (e.g. tall, kind, helpful, friendly, smart).",
          example: "My brother is helpful and friendly.",
          targetCategory: "person",
          requiredAdjectives: ["helpful", "friendly", "tall", "short", "kind", "smart", "nice", "polite", "caring", "hardworking", "funny", "cheerful", "young", "old"]
        },
        {
          id: "rp1_sp_2",
          title: "Describe a Room or House",
          instruction: "Describe your living room, bedroom, kitchen, or house using adjectives (e.g. big, clean, bright, comfortable, tidy, modern, beautiful).",
          example: "Our living room is very clean and comfortable.",
          targetCategory: "room",
          requiredAdjectives: ["clean", "big", "small", "comfortable", "tidy", "bright", "modern", "beautiful", "spacious", "quiet", "neat", "cozy", "warm"]
        },
        {
          id: "rp1_sp_3",
          title: "Describe an Item of Furniture",
          instruction: "Describe a sofa, chair, table, or bed in the house using an adjective (e.g. soft, wooden, new, comfortable, large).",
          example: "This sofa is very soft and comfortable.",
          targetCategory: "item",
          requiredAdjectives: ["comfortable", "soft", "new", "old", "wooden", "large", "small", "heavy", "nice", "brown", "white", "black", "clean"]
        }
      ],
      // Dialogue for Mini Roleplay
      miniRoleplay: {
        roleA: "Friend (Host)",
        roleB: "Friend (Guest)",
        starterSpeaker: "Host",
        turns: [
          {
            speaker: "Host",
            text: "Welcome to my house! Please make yourself comfortable.",
            options: [
              "Thank you! Your living room is very big and clean.",
              "I want to go to school now.",
              "Whose car are you?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Host",
            text: "Thank you! That is my brother in the picture. He is very helpful and friendly.",
            options: [
              "That's nice! Is your brother tall?",
              "What color are your yesterday?",
              "Who bag is this table?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Host",
            text: "Yes, he is tall and plays basketball. Would you like some cold juice?",
            options: [
              "Yes, please! That would be lovely.",
              "My brother is a pen.",
              "There are two book."
            ],
            correctIndex: 0
          },
          {
            speaker: "Host",
            text: "Here you go! Thank you for visiting my home today.",
            options: [
              "Thank you for having me! See you again soon.",
              "No, is this bag?",
              "Knock knock on door."
            ],
            correctIndex: 0
          }
        ]
      },
      // Speaking Drills
      speakingSentences: [
        "Welcome to my house. Make yourself comfortable.",
        "My brother is helpful and friendly.",
        "Your living room is very clean and big.",
        "Thank you for visiting. See you again."
      ]
    },
    {
      id: "rp_02",
      number: "02",
      title: "A Police Officer Asks Questions About People, Things and Possessions",
      subtitle: "Using What, Who, Whose and Genitive 's to investigate items and owners",
      icon: "\u{1F46E}",
      color: "#0A2558",
      active: true,
      scenario: "A police officer has entered a room and is asking a person about things, people and possessions.",
      grammarFocus: ["What", "Who", "Whose", "Genitive 's"],
      grammarDescription: "Practice forming investigative questions using What (identifying objects), Who (identifying people), Whose (asking about ownership), and Genitive 's (showing possession like John's bag or the officer's badge).",
      imageContext: {
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
        alt: "Professional police consultation desk with documentation, notebook, and personal belongings being identified",
        photographer: "King's Church International",
        photographerUrl: "https://unsplash.com/@kingschurchinternational",
        searchQuery: "police officer asking questions interview room"
      },
      spokenExpressions: [
        {
          id: "rp2_exp_1",
          text: "I need to ask you a few questions.",
          meaning: "A formal and polite phrase used by an officer to begin an interview.",
          context: "Starting an investigation"
        },
        {
          id: "rp2_exp_2",
          text: "Please stay calm.",
          meaning: "Reassuring someone not to panic or worry.",
          context: "Calming a nervous person"
        },
        {
          id: "rp2_exp_3",
          text: "What exactly is this?",
          meaning: "Asking for precise clarification about an object.",
          context: "Inspecting an unknown object"
        },
        {
          id: "rp2_exp_4",
          text: "Is there anything else I should know?",
          meaning: "Asking if there are additional details or facts.",
          context: "Gathering full information"
        },
        {
          id: "rp2_exp_5",
          text: "Let me think.",
          meaning: "Pausing politely while remembering details.",
          context: "Thinking before answering"
        },
        {
          id: "rp2_exp_6",
          text: "As far as I know.",
          meaning: "Stating what you believe based on your current knowledge.",
          context: "Answering carefully"
        }
      ],
      keyVocab: [
        { word: "Whose", meaning: "Question word asking about ownership or possession", type: "Question Word", example: "Whose bag is this?" },
        { word: "Possession", meaning: "Something that belongs to someone", type: "Noun", example: "This wallet is Ali's possession." },
        { word: "Genitive 's", meaning: "A punctuation and letter 's added to a name to show ownership", type: "Grammar Rule", example: "Sara's phone, John's bag" },
        { word: "Calm", meaning: "Peaceful, quiet, not worried or panicked", type: "Adjective", example: "Please stay calm." },
        { word: "Officer", meaning: "A member of the police force", type: "Noun", example: "The police officer asked questions." }
      ],
      practiceQuestions: [
        {
          id: "rp2_q1",
          type: "mcq",
          question: "The police officer points to a leather wallet on the desk. How should the officer ask about its owner?",
          options: ["Whose wallet is this?", "What color are yesterday?", "Where is brother?", "Who are wallet?"],
          correct: 0,
          explanation: "'Whose' is the question word specifically used to ask about ownership."
        },
        {
          id: "rp2_q2",
          type: "grammar_check",
          question: "Which sentence correctly uses Genitive 's to state that the bag belongs to John?",
          options: ["This is John's bag.", "This is John bag.", "This is bag of John's.", "This are Johns bags."],
          correct: 0,
          explanation: "Add 's to John to form 'John's bag'."
        },
        {
          id: "rp2_q3",
          type: "mcq",
          question: "The officer enters and wants to begin talking. What expression should the officer use?",
          options: ["I need to ask you a few questions.", "Give me all your food.", "Who is door?", "Make yourself brother."],
          correct: 0,
          explanation: "'I need to ask you a few questions' is the official spoken expression taught by Sir Zubair."
        },
        {
          id: "rp2_q4",
          type: "fill",
          question: "Complete the question: '______ owns this smartphone?'",
          options: ["Who", "Whose", "What color", "How many"],
          correct: 0,
          explanation: "'Who' asks about the person performing the action (who owns)."
        },
        {
          id: "rp2_q5",
          type: "mcq",
          question: "The officer asks: 'Is this your jacket?' You want to answer carefully based on what you remember. What do you say?",
          options: [
            "Let me think... As far as I know, it belongs to David.",
            "Welcome to my house.",
            "There is three cars.",
            "I am running door."
          ],
          correct: 0,
          explanation: "'Let me think... As far as I know' is the natural, polite response."
        },
        {
          id: "rp2_q6",
          type: "mcq",
          question: "Which question is asking about the identity of an object in the room?",
          options: ["What exactly is this?", "Whose brother is tall?", "Where are David?", "Who is knocking?"],
          correct: 0,
          explanation: "'What exactly is this?' is used when inspecting an unfamiliar object."
        }
      ],
      sentencePrompts: [
        {
          id: "rp2_sp_1",
          title: "Ask a Question with 'Whose'",
          instruction: "Write a question asking who owns an item (e.g. bag, phone, keys, watch, wallet, book, laptop) using 'Whose'.",
          example: "Whose phone is this on the table?",
          targetCategory: "whose_question",
          requiredKeywords: ["whose", "is", "this", "that", "these", "bag", "phone", "wallet", "watch", "keys", "book", "laptop", "car"]
        },
        {
          id: "rp2_sp_2",
          title: "Answer using Genitive 's",
          instruction: "Write a sentence stating that an item belongs to a specific person (e.g. John's, Sara's, Ali's, my friend's, the teacher's).",
          example: "This is John's bag.",
          targetCategory: "genitive_statement",
          requiredKeywords: ["'s", "is", "this", "that", "it", "bag", "phone", "wallet", "car", "book"]
        },
        {
          id: "rp2_sp_3",
          title: "Ask What or Who Question",
          instruction: "Write an investigative question starting with 'What' or 'Who'.",
          example: "What exactly is this strange box?",
          targetCategory: "what_who_question",
          requiredKeywords: ["what", "who", "is", "owns", "this", "that", "person"]
        }
      ],
      miniRoleplay: {
        roleA: "Police Officer",
        roleB: "Resident / Witness",
        starterSpeaker: "Police Officer",
        turns: [
          {
            speaker: "Police Officer",
            text: "Good afternoon. Please stay calm, I need to ask you a few questions.",
            options: [
              "Yes, officer. How can I help you?",
              "My house has big rooms.",
              "Whose are you?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Police Officer",
            text: "What exactly is this blue backpack on the floor? Whose bag is this?",
            options: [
              "Let me think... As far as I know, it is Ali's bag.",
              "My brother is tall and friendly.",
              "There are one backpack."
            ],
            correctIndex: 0
          },
          {
            speaker: "Police Officer",
            text: "And who owns this phone next to it? Is it also Ali's phone?",
            options: [
              "No, officer. That is Sara's phone. Her name is on the back.",
              "Welcome to my house.",
              "What color are your clothes?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Police Officer",
            text: "Understood. Is there anything else I should know about these items?",
            options: [
              "No, officer. That is everything as far as I know.",
              "Yes, the brother is tall.",
              "There are many student."
            ],
            correctIndex: 0
          }
        ]
      },
      speakingSentences: [
        "I need to ask you a few questions. Please stay calm.",
        "What exactly is this? Whose bag is this?",
        "Let me think. As far as I know, it is John's phone.",
        "Is there anything else I should know?"
      ]
    },
    {
      id: "rp_03",
      number: "03",
      title: "A Person Visits His Friend's House and Asks About Family Members and Their Jobs",
      subtitle: "Discussing relatives, occupations, qualities, and possessions",
      icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
      color: "#0A2558",
      active: true,
      scenario: "A person visits his friend's house and asks about family members and their jobs.",
      grammarFocus: ["Adjectives", "Possessive Adjectives", "Genitive 's"],
      grammarDescription: "Practice combining Possessive Adjectives (my, his, her, their), Genitive 's (father's job, sister's car), and descriptive Adjectives (friendly, hardworking, interesting, new) to talk about family and work.",
      imageContext: {
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
        alt: "Friendly gathering in a warm home discussing family members, career paths, and occupations",
        photographer: "Tyler Nix",
        photographerUrl: "https://unsplash.com/@jtylernix",
        searchQuery: "friends talking family members jobs living room"
      },
      spokenExpressions: [
        {
          id: "rp3_exp_1",
          text: "Oh really?",
          meaning: "An enthusiastic expression showing interest or mild surprise.",
          context: "Reacting to interesting family news"
        },
        {
          id: "rp3_exp_2",
          text: "What is that exactly?",
          meaning: "Asking for more detail about a specific job or role.",
          context: "Asking about an unfamiliar profession"
        },
        {
          id: "rp3_exp_3",
          text: "Is she a housekeeper?",
          meaning: "Asking about someone's specific profession.",
          context: "Inquiring about occupation"
        },
        {
          id: "rp3_exp_4",
          text: "That sounds interesting.",
          meaning: "Praising someone's job or hobby as engaging.",
          context: "Commenting on a career"
        },
        {
          id: "rp3_exp_5",
          text: "In my opinion.",
          meaning: "Sharing your personal perspective politely.",
          context: "Giving a viewpoint on a career or person"
        }
      ],
      keyVocab: [
        { word: "Housekeeper", meaning: "A person responsible for managing and cleaning a household", type: "Noun (Job)", example: "Is she a housekeeper?" },
        { word: "Interesting", meaning: "Engaging and holding your attention", type: "Adjective", example: "Her job is very interesting." },
        { word: "Possessive Adjective", meaning: "Words like my, your, his, her, our, their", type: "Grammar Concept", example: "His father, Her mother, My brother" },
        { word: "Hardworking", meaning: "Working with a lot of effort and dedication", type: "Adjective", example: "His father is hardworking." },
        { word: "Occupation / Job", meaning: "The regular work a person does to earn a living", type: "Noun", example: "What is your sister's job?" }
      ],
      practiceQuestions: [
        {
          id: "rp3_q1",
          type: "mcq",
          question: "Your friend says: 'My mother is an engineer.' You want to show interest. What do you say?",
          options: ["Oh really? That sounds interesting!", "Stay calm, officer.", "Whose bag are you?", "There is three books."],
          correct: 0,
          explanation: "'Oh really? That sounds interesting!' is the natural, friendly response."
        },
        {
          id: "rp3_q2",
          type: "grammar_check",
          question: "Which sentence correctly combines a possessive adjective and Genitive 's to describe a car?",
          options: ["His father's car is new.", "His father car is new.", "He father's car are new.", "Him father car new."],
          correct: 0,
          explanation: "'His father's car is new' uses possessive 'His' and Genitive 'father's' accurately."
        },
        {
          id: "rp3_q3",
          type: "fill",
          question: "Fill in the blank: 'My sister is very friendly. ______ job is very interesting.'",
          options: ["Her", "His", "Their", "He"],
          correct: 0,
          explanation: "'Her' is the correct possessive adjective for a female (sister)."
        },
        {
          id: "rp3_q4",
          type: "mcq",
          question: "Your friend mentions an unusual job title. How do you ask for clarification?",
          options: ["What is that exactly?", "Who are door?", "What color is shoes?", "Where your sister house?"],
          correct: 0,
          explanation: "'What is that exactly?' is the expression taught by Sir Zubair for asking about details."
        },
        {
          id: "rp3_q5",
          type: "mcq",
          question: "Which sentence accurately describes a family member's occupation and qualities?",
          options: [
            "My brother is a doctor and he is very hardworking.",
            "My brother is a doctoring yesterday.",
            "His sister car are blue table.",
            "Her mother house is doctor."
          ],
          correct: 0,
          explanation: "Combines the job 'doctor' with the descriptive adjective 'hardworking'."
        },
        {
          id: "rp3_q6",
          type: "expression_match",
          question: "When you want to share what you personally think about a career, how do you begin?",
          options: ["In my opinion...", "Please stay calm...", "Welcome to my house...", "There are two..."],
          correct: 0,
          explanation: "'In my opinion' signals that you are sharing your personal perspective."
        }
      ],
      sentencePrompts: [
        {
          id: "rp3_sp_1",
          title: "Describe a Family Member's Job",
          instruction: "Write a sentence mentioning a family member and their job (e.g. teacher, doctor, engineer, manager, driver, nurse, housekeeper).",
          example: "My father is a teacher and he loves his job.",
          targetCategory: "job_sentence",
          requiredKeywords: ["my", "his", "her", "father", "mother", "brother", "sister", "is", "job", "teacher", "doctor", "engineer", "nurse", "housekeeper", "manager", "driver", "worker"]
        },
        {
          id: "rp3_sp_2",
          title: "Combine Possession & Adjectives",
          instruction: "Write a sentence using a possessive adjective or Genitive 's with an adjective (e.g. His father's car is new, My sister is friendly).",
          example: "His father's car is new and clean.",
          targetCategory: "possession_adjective",
          requiredKeywords: ["his", "her", "my", "'s", "is", "friendly", "new", "old", "hardworking", "interesting", "tall", "kind"]
        }
      ],
      miniRoleplay: {
        roleA: "Friend (Visitor)",
        roleB: "Friend (Host)",
        starterSpeaker: "Visitor",
        turns: [
          {
            speaker: "Visitor",
            text: "You have a lovely home! Tell me, what is your father's job?",
            options: [
              "My father is a civil engineer. His job is very interesting.",
              "My father is knocking on the door.",
              "There is three fathers."
            ],
            correctIndex: 0
          },
          {
            speaker: "Host",
            text: "Oh really? What is that exactly? Does he design big buildings?",
            options: [
              "Yes, exactly! He designs modern bridges and buildings.",
              "No, he is yesterday.",
              "Whose bag is this?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Host",
            text: "That sounds interesting! And how about your older sister? Is she a teacher?",
            options: [
              "No, she is a computer programmer. In my opinion, it is a great job.",
              "She is knocking door.",
              "What color are your uniforms?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Host",
            text: "Your family members are very talented and hardworking!",
            options: [
              "Thank you so much! That is very kind of you.",
              "There are two classrooms.",
              "Officer, please stay calm."
            ],
            correctIndex: 0
          }
        ]
      },
      speakingSentences: [
        "My father's job is very interesting.",
        "His sister is friendly and hardworking.",
        "Oh really? What is that exactly?",
        "In my opinion, that sounds like a wonderful career."
      ]
    },
    {
      id: "rp_04",
      number: "04",
      title: "A Person Reports His Lost Children at the Police Station",
      subtitle: "Describing children's clothing colors, appearance, and personal items",
      icon: "\u{1F50D}",
      color: "#0A2558",
      active: true,
      scenario: "A person is at the police station to report his lost children \u2014 a boy and a girl.",
      grammarFocus: ["Possessive Adjectives", "What color", "Whose"],
      grammarDescription: "Practice asking and describing clothing colors using What color (What color are their clothes?), possessive adjectives (His shirt is blue, Her dress is red), and ownership (Whose backpack was left behind?).",
      imageContext: {
        url: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
        alt: "Supportive official assistance and information desk at a public service station for reporting details",
        photographer: "CDC",
        photographerUrl: "https://unsplash.com/@cdc",
        searchQuery: "police station information desk assistance parent report"
      },
      spokenExpressions: [
        {
          id: "rp4_exp_1",
          text: "Please stay calm.",
          meaning: "Reassurance given by the police desk officer to the anxious parent.",
          context: "Police comforting the parent"
        },
        {
          id: "rp4_exp_2",
          text: "What color are their clothes?",
          meaning: "Asking about the specific colors of the lost children's garments.",
          context: "Officer requesting visual description"
        },
        {
          id: "rp4_exp_3",
          text: "Please help me.",
          meaning: "An urgent, polite appeal for assistance.",
          context: "Parent asking for help"
        },
        {
          id: "rp4_exp_4",
          text: "What do they look like?",
          meaning: "Asking for a physical description of appearance and features.",
          context: "Officer gathering identification details"
        },
        {
          id: "rp4_exp_5",
          text: "Do you have any recent pictures of them?",
          meaning: "Asking for photographic proof to identify the missing persons.",
          context: "Requesting photos"
        }
      ],
      keyVocab: [
        { word: "What color", meaning: "Question phrase used to ask for the color of items", type: "Question Phrase", example: "What color are their clothes?" },
        { word: "Shirt", meaning: "A garment for the upper body", type: "Noun", example: "His shirt is blue." },
        { word: "Dress", meaning: "A one-piece garment for a girl or woman", type: "Noun", example: "Her dress is yellow." },
        { word: "Recent", meaning: "Happened or taken not long ago", type: "Adjective", example: "Here is a recent photo." },
        { word: "Appearance", meaning: "The way someone or something looks", type: "Noun", example: "They have brown hair." }
      ],
      practiceQuestions: [
        {
          id: "rp4_q1",
          type: "mcq",
          question: "The police officer wants to know the colors of the children's clothes. What does the officer ask?",
          options: [
            "What color are their clothes?",
            "How many rooms are there?",
            "Welcome to my house.",
            "Make yourself comfortable."
          ],
          correct: 0,
          explanation: "'What color are their clothes?' is the exact expression taught by Sir Zubair."
        },
        {
          id: "rp4_q2",
          type: "fill",
          question: "The parent describes the boy: '______ shirt is blue and his cap is black.'",
          options: ["His", "Her", "Their", "She"],
          correct: 0,
          explanation: "'His' is the possessive adjective used for a boy."
        },
        {
          id: "rp4_q3",
          type: "fill",
          question: "The parent describes the girl: '______ dress is pink and her shoes are white.'",
          options: ["Her", "His", "Him", "He"],
          correct: 0,
          explanation: "'Her' is the possessive adjective used for a girl."
        },
        {
          id: "rp4_q4",
          type: "mcq",
          question: "The officer finds a red schoolbag nearby and asks the parent:",
          options: [
            "Whose bag is this? Does it belong to your daughter?",
            "How many schools are there?",
            "Is your father a housekeeper?",
            "There is two bags."
          ],
          correct: 0,
          explanation: "'Whose bag is this?' investigates the ownership of the found item."
        },
        {
          id: "rp4_q5",
          type: "mcq",
          question: "How does the parent politely ask the police for urgent assistance?",
          options: [
            "Please help me, officer! My children are lost.",
            "In my opinion, the car is new.",
            "There are three classrooms.",
            "Thank you for visiting."
          ],
          correct: 0,
          explanation: "'Please help me' is the direct expression taught by the teacher for this scenario."
        },
        {
          id: "rp4_q6",
          type: "mcq",
          question: "The officer asks: 'Do you have any recent pictures of them?' What does the parent reply?",
          options: [
            "Yes, officer. Here is a recent picture on my phone.",
            "Welcome to my house.",
            "The living room is big.",
            "There are no student."
          ],
          correct: 0,
          explanation: "Shows photographic identification to help find the children."
        }
      ],
      sentencePrompts: [
        {
          id: "rp4_sp_1",
          title: "Describe Clothing Colors for a Boy",
          instruction: "Describe the boy's clothes using 'His' and color words (e.g. blue, red, green, black, white, yellow).",
          example: "His shirt is blue and his trousers are dark grey.",
          targetCategory: "clothing_boy",
          requiredKeywords: ["his", "shirt", "pants", "trousers", "cap", "jacket", "shoes", "is", "are", "blue", "red", "green", "black", "white", "yellow", "brown"]
        },
        {
          id: "rp4_sp_2",
          title: "Describe Clothing Colors for a Girl",
          instruction: "Describe the girl's clothes using 'Her' and color words (e.g. pink, red, yellow, purple, white).",
          example: "Her dress is bright yellow and her shoes are white.",
          targetCategory: "clothing_girl",
          requiredKeywords: ["her", "dress", "skirt", "shirt", "shoes", "jacket", "hat", "is", "are", "pink", "red", "yellow", "purple", "white", "blue"]
        }
      ],
      miniRoleplay: {
        roleA: "Police Officer",
        roleB: "Anxious Parent",
        starterSpeaker: "Anxious Parent",
        turns: [
          {
            speaker: "Anxious Parent",
            text: "Officer, please help me! I cannot find my two children in the park.",
            options: [
              "Please stay calm, sir. What do they look like?",
              "Make yourself comfortable in my kitchen.",
              "How many rooms are there?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Police Officer",
            text: "I am writing down every detail. What color are their clothes?",
            options: [
              "His shirt is blue and her dress is yellow. Their shoes are white.",
              "There is many classrooms.",
              "Is she a housekeeper?"
            ],
            correctIndex: 0
          },
          {
            speaker: "Police Officer",
            text: "Understood. We found a small backpack near the fountain. Whose bag is this?",
            options: [
              "Yes! That is my daughter's bag. Her name is written on it.",
              "Welcome to my house.",
              "My brother is tall."
            ],
            correctIndex: 0
          },
          {
            speaker: "Police Officer",
            text: "Do you have any recent pictures of them on your phone?",
            options: [
              "Yes, here is a recent photo of both of them taken this morning.",
              "No, there is three rooms.",
              "In my opinion, the car is fast."
            ],
            correctIndex: 0
          }
        ]
      },
      speakingSentences: [
        "Please help me, officer. My children are lost.",
        "What color are their clothes?",
        "His shirt is blue and her dress is yellow.",
        "Do you have any recent pictures of them?"
      ]
    },
    {
      id: "rp_05",
      number: "05",
      title: "Two Friends Talk About Their New School, College or Workplace",
      subtitle: "Describing facilities and rooms using 'There is' (singular) and 'There are' (plural)",
      icon: "\u{1F3EB}",
      color: "#0A2558",
      active: true,
      scenario: "Two friends are talking about their new school, college, workplace or another place.",
      grammarFocus: ["There is", "There are"],
      grammarDescription: "Master the essential rule: Use 'There is' for ONE item / singular noun (There is a library, There is a big computer lab). Use 'There are' for TWO OR MORE items / plural nouns (There are three science rooms, There are many students).",
      imageContext: {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        alt: "Two university students walking through a bright modern educational campus discussing classrooms and library facilities",
        photographer: "MD Duran",
        photographerUrl: "https://unsplash.com/@mdduran",
        searchQuery: "students campus new college school workplace discussion"
      },
      spokenExpressions: [
        {
          id: "rp5_exp_1",
          text: "One thing I really like about this...",
          meaning: "Highlighting a specific positive feature of your new school or office.",
          context: "Pointing out a favorite benefit"
        },
        {
          id: "rp5_exp_2",
          text: "You should visit sometime.",
          meaning: "Inviting a friend to come and see the new location.",
          context: "Friendly invitation"
        },
        {
          id: "rp5_exp_3",
          text: "How many rooms are there?",
          meaning: "Asking for the quantity of rooms using 'are there'.",
          context: "Inquiring about size"
        },
        {
          id: "rp5_exp_4",
          text: "Overall, it's a great place.",
          meaning: "Giving a positive general summary of the venue.",
          context: "Summarizing your feelings"
        },
        {
          id: "rp5_exp_5",
          text: "It's quite different from that house.",
          meaning: "Comparing the new environment to a previously discussed place.",
          context: "Making a comparison"
        },
        {
          id: "rp5_exp_6",
          text: "Whose watch is it?",
          meaning: "Review question asking about ownership of a discovered watch.",
          context: "Noticing an accessory"
        },
        {
          id: "rp5_exp_7",
          text: "What color is your uniform?",
          meaning: "Review question asking about the color of the official uniform.",
          context: "Asking about school/work clothes"
        }
      ],
      keyVocab: [
        { word: "There is", meaning: "Used to state the existence of ONE singular thing", type: "Grammar Structure", example: "There is a modern library." },
        { word: "There are", meaning: "Used to state the existence of TWO OR MORE plural things", type: "Grammar Structure", example: "There are twenty classrooms." },
        { word: "Campus / College", meaning: "The grounds and buildings of an educational institution", type: "Noun", example: "Our college campus is very big." },
        { word: "Workplace", meaning: "A building, office, or site where people do their jobs", type: "Noun", example: "There is a cafeteria in my workplace." },
        { word: "Uniform", meaning: "Distinctive clothing worn by members of a school or organization", type: "Noun", example: "What color is your uniform?" }
      ],
      practiceQuestions: [
        {
          id: "rp5_q1",
          type: "fill",
          question: "Select the correct form: 'There ______ a large library in our new school.'",
          options: ["is", "are", "were", "be"],
          correct: 0,
          explanation: "Use 'There is' because 'a large library' is singular (one library)."
        },
        {
          id: "rp5_q2",
          type: "fill",
          question: "Select the correct form: 'There ______ three computer labs on the second floor.'",
          options: ["are", "is", "have", "am"],
          correct: 0,
          explanation: "Use 'There are' because 'three computer labs' is plural (more than one)."
        },
        {
          id: "rp5_q3",
          type: "mcq",
          question: "How do you ask about the quantity of rooms in your friend's new college?",
          options: [
            "How many rooms are there?",
            "What color are your clothes?",
            "Who is knocking on the door?",
            "Whose bag is this?"
          ],
          correct: 0,
          explanation: "'How many rooms are there?' uses the plural inverted question form 'are there'."
        },
        {
          id: "rp5_q4",
          type: "grammar_check",
          question: "Which sentence is 100% grammatically correct?",
          options: [
            "There is a cafeteria and there are many friendly students.",
            "There are a cafeteria and there is many students.",
            "There is three classrooms in my school.",
            "There are one big playground."
          ],
          correct: 0,
          explanation: "'There is a cafeteria' (singular) and 'there are many friendly students' (plural) follow the exact rules."
        },
        {
          id: "rp5_q5",
          type: "mcq",
          question: "You want to invite your friend to see your new workplace. What do you say?",
          options: [
            "You should visit sometime.",
            "Please stay calm, officer.",
            "What color is your uniform?",
            "Whose watch is it?"
          ],
          correct: 0,
          explanation: "'You should visit sometime' is the friendly invitation expression taught by Sir Zubair."
        },
        {
          id: "rp5_q6",
          type: "fill",
          question: "Complete the sentence: 'There ______ many books in the study hall.'",
          options: ["are", "is", "has", "it"],
          correct: 0,
          explanation: "'Many books' is plural, so use 'There are'."
        }
      ],
      sentencePrompts: [
        {
          id: "rp5_sp_1",
          title: "Use 'There is' for Singular",
          instruction: "Write a sentence describing ONE thing in your school, college, workplace, or house using 'There is a...'",
          example: "There is a big library in my new college.",
          targetCategory: "there_is",
          requiredKeywords: ["there", "is", "a", "library", "playground", "cafeteria", "classroom", "garden", "lab", "office", "canteen", "gym"]
        },
        {
          id: "rp5_sp_2",
          title: "Use 'There are' for Plural",
          instruction: "Write a sentence describing TWO OR MORE things using 'There are...' and a number or word like 'many'.",
          example: "There are four classrooms and many students.",
          targetCategory: "there_are",
          requiredKeywords: ["there", "are", "rooms", "classrooms", "students", "teachers", "computers", "desks", "books", "many", "two", "three", "four", "five"]
        }
      ],
      miniRoleplay: {
        roleA: "Friend A (Asking)",
        roleB: "Friend B (Describing New Place)",
        starterSpeaker: "Friend A",
        turns: [
          {
            speaker: "Friend A",
            text: "Hey! How is your new college? Tell me about the campus!",
            options: [
              "Overall, it's a great place! There is a huge library and a beautiful cafeteria.",
              "Please stay calm, officer.",
              "My brother is a housekeeper."
            ],
            correctIndex: 0
          },
          {
            speaker: "Friend A",
            text: "That sounds awesome! How many rooms are there in the main building?",
            options: [
              "There are twenty modern classrooms and three science labs.",
              "There is three science labs.",
              "Welcome to my house."
            ],
            correctIndex: 0
          },
          {
            speaker: "Friend A",
            text: "Wow, twenty classrooms! What color is your official uniform?",
            options: [
              "Our uniform is dark blue and white. You should visit sometime!",
              "Who owns this phone?",
              "His shirt is yesterday."
            ],
            correctIndex: 0
          },
          {
            speaker: "Friend A",
            text: "I would love to! One thing I really like about your college is the big playground.",
            options: [
              "Yes, there is plenty of space to play football and cricket!",
              "My sister is doctor car.",
              "Whose bag are you?"
            ],
            correctIndex: 0
          }
        ]
      },
      speakingSentences: [
        "There is a big library in my new school.",
        "There are many students in the classroom.",
        "How many rooms are there?",
        "Overall, it's a great place. You should visit sometime."
      ]
    }
  ];
  function validateStudentSentence(roleplayId, promptId, rawSentence) {
    const text = (rawSentence || "").trim();
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/).filter(Boolean);
    if (words.length < 3) {
      return {
        valid: false,
        feedback: "\u{1F4A1} Try writing a complete sentence with at least 3 to 4 words. For example: 'My brother is friendly and tall.'"
      };
    }
    if (roleplayId === "rp_01") {
      const commonAdjectives = [
        "tall",
        "short",
        "friendly",
        "helpful",
        "clean",
        "big",
        "small",
        "tidy",
        "nice",
        "kind",
        "smart",
        "polite",
        "caring",
        "hardworking",
        "funny",
        "cheerful",
        "young",
        "old",
        "comfortable",
        "spacious",
        "quiet",
        "neat",
        "cozy",
        "warm",
        "modern",
        "beautiful",
        "soft",
        "large",
        "good",
        "great"
      ];
      const foundAdjectives = commonAdjectives.filter((adj) => lower.includes(adj));
      const hasCopula = words.some((w) => ["is", "'s", "are", "'re", "looks", "seems", "very", "really"].includes(w));
      if (foundAdjectives.length === 0) {
        return {
          valid: false,
          feedback: "\u{1F4A1} Good start! Remember the grammar focus is Adjectives. Add a descriptive word like 'tall', 'friendly', 'clean', or 'comfortable'."
        };
      }
      if (!hasCopula) {
        return {
          valid: false,
          feedback: "\u{1F4A1} Almost there! Make sure to include a linking verb like 'is' or 'are' (e.g. 'My sister IS friendly')."
        };
      }
      return {
        valid: true,
        adjectivesUsed: foundAdjectives,
        feedback: `\u{1F389} Excellent! You used the descriptive adjective "${foundAdjectives[0]}" very well in your sentence.`
      };
    }
    if (roleplayId === "rp_02") {
      if (promptId === "rp2_sp_1") {
        if (!lower.startsWith("whose") && !lower.includes("whose")) {
          return {
            valid: false,
            feedback: "\u{1F4A1} Start your question with 'Whose' to ask about ownership (e.g. 'Whose bag is this?')."
          };
        }
        return {
          valid: true,
          feedback: "\u{1F389} Well done! You formed an investigative 'Whose' question properly."
        };
      }
      if (promptId === "rp2_sp_2") {
        const hasGenitive = text.includes("'s") || text.includes("\u2019s");
        if (!hasGenitive) {
          return {
            valid: false,
            feedback: "\u{1F4A1} Remember to use Genitive 's to show ownership (e.g. 'This is John's bag' or 'It is Ali's phone')."
          };
        }
        return {
          valid: true,
          feedback: "\u{1F389} Spot on! You used Genitive 's to show who owns the item."
        };
      }
      const hasWhatOrWho = lower.includes("what") || lower.includes("who");
      if (!hasWhatOrWho) {
        return {
          valid: false,
          feedback: "\u{1F4A1} Start your question with 'What' or 'Who' (e.g. 'What exactly is this?' or 'Who owns this phone?')."
        };
      }
      return {
        valid: true,
        feedback: "\u{1F389} Great investigative question! Sir Zubair would be proud."
      };
    }
    if (roleplayId === "rp_03") {
      const possessives = ["my", "his", "her", "their", "our", "'s", "\u2019s"];
      const hasPossessive = possessives.some((p) => lower.includes(p));
      if (!hasPossessive) {
        return {
          valid: false,
          feedback: "\u{1F4A1} Use a possessive word like 'My', 'His', 'Her', or a name with 's (e.g. 'My father is a teacher' or 'His sister's job is interesting')."
        };
      }
      return {
        valid: true,
        feedback: "\u{1F389} Great job! You talked about your family and their qualities clearly."
      };
    }
    if (roleplayId === "rp_04") {
      const colors = ["blue", "red", "green", "black", "white", "yellow", "pink", "purple", "grey", "gray", "brown", "orange", "dark", "light"];
      const hasColor = colors.some((c) => lower.includes(c));
      if (!hasColor) {
        return {
          valid: false,
          feedback: "\u{1F4A1} Remember to include a color word to help the officer identify the clothing (e.g. 'blue', 'yellow', 'white', 'black')."
        };
      }
      const hasPossessive = lower.includes("his") || lower.includes("her") || lower.includes("their") || lower.includes("my");
      if (!hasPossessive) {
        return {
          valid: false,
          feedback: "\u{1F4A1} Use 'His' for the boy or 'Her' for the girl (e.g. 'His shirt is blue' or 'Her dress is pink')."
        };
      }
      return {
        valid: true,
        feedback: "\u{1F389} Wonderful description! The color and possessive adjective are used accurately."
      };
    }
    if (roleplayId === "rp_05") {
      if (promptId === "rp5_sp_1") {
        const hasThereIs = lower.includes("there is") || lower.includes("there's");
        if (!hasThereIs) {
          return {
            valid: false,
            feedback: "\u{1F4A1} Remember to use 'There is' for a single item (e.g. 'There is a library' or 'There is a big cafeteria')."
          };
        }
        return {
          valid: true,
          feedback: "\u{1F389} Perfect! You correctly used 'There is' for a singular place or facility."
        };
      }
      if (promptId === "rp5_sp_2") {
        const hasThereAre = lower.includes("there are");
        if (!hasThereAre) {
          return {
            valid: false,
            feedback: "\u{1F4A1} Remember to use 'There are' for two or more items (e.g. 'There are twenty classrooms' or 'There are many students')."
          };
        }
        return {
          valid: true,
          feedback: "\u{1F389} Excellent! You correctly used 'There are' for plural nouns."
        };
      }
      const hasThere = lower.includes("there is") || lower.includes("there are") || lower.includes("there's");
      if (!hasThere) {
        return {
          valid: false,
          feedback: "\u{1F4A1} Practice using 'There is' (one item) or 'There are' (many items)."
        };
      }
      return {
        valid: true,
        feedback: "\u{1F389} Great sentence! You practiced the There is / There are structure."
      };
    }
    return {
      valid: true,
      feedback: "\u{1F389} Good English sentence! Well done."
    };
  }

  // js/utils/helpers.js
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  var LEVEL_TIERS = [
    { level: 1, title: "English Starter", minXP: 0, maxXP: 300, icon: "\u{1F331}" },
    { level: 2, title: "Word Explorer", minXP: 300, maxXP: 700, icon: "\u{1F9ED}" },
    { level: 3, title: "Sentence Builder", minXP: 700, maxXP: 1200, icon: "\u{1F3D7}\uFE0F" },
    { level: 4, title: "English Learner", minXP: 1200, maxXP: 1800, icon: "\u{1F4D8}" },
    { level: 5, title: "English Explorer", minXP: 1800, maxXP: 2500, icon: "\u{1F680}" },
    { level: 6, title: "English Champion", minXP: 2500, maxXP: Infinity, icon: "\u{1F451}" }
  ];
  function getLevelInfo(totalXP) {
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
    const levelMax = isMaxLevel ? 3e3 : currentTier.maxXP;
    const xpInCurrentLevel = xp - levelMin;
    const xpRequiredForLevel = levelMax - levelMin;
    const progressPercent = isMaxLevel ? 100 : Math.min(100, Math.round(xpInCurrentLevel / xpRequiredForLevel * 100));
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
  var POSITIVE_FEEDBACKS = [
    "\u{1F525} Correct!",
    "Excellent! +10 XP",
    "Nice one! \u{1F60E}",
    "You got it!",
    "English power +10!",
    "Brilliant work! \u2B50",
    "Super job! \u{1F680}",
    "Spot on! \u{1F389}",
    "You are on fire! \u{1F525}",
    "Awesome effort! \u{1F44D}"
  ];
  var ENCOURAGING_TRY_AGAIN = [
    "\u{1F602} Almost!",
    "Close one!",
    "Oops! Try again \u{1F604}",
    "Not this time, but great try!",
    "Keep going, you can do it! \u{1F4AA}",
    "So close! Give it another shot!"
  ];
  function getRandomFeedback(isCorrect) {
    const list = isCorrect ? POSITIVE_FEEDBACKS : ENCOURAGING_TRY_AGAIN;
    return list[Math.floor(Math.random() * list.length)];
  }

  // js/audio.js
  var SoundEngine = class {
    constructor() {
      this.ctx = null;
      this.muted = typeof localStorage !== "undefined" ? localStorage.getItem("ha_sound_muted") === "true" : false;
      this.synth = typeof window !== "undefined" && window.speechSynthesis ? window.speechSynthesis : null;
      this.recognition = null;
      if (typeof window !== "undefined") {
        this.initRecognition();
      }
    }
    initAudioContext() {
      if (typeof window === "undefined") return;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }
    isMuted() {
      return this.muted;
    }
    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem("ha_sound_muted", this.muted);
      return this.muted;
    }
    playTone(freq, type = "sine", duration = 0.15, startTime = 0, gainLevel = 0.1) {
      if (this.muted) return;
      try {
        this.initAudioContext();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(1e-3, this.ctx.currentTime + startTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
      } catch (e) {
        console.warn("Audio play error:", e);
      }
    }
    // Correct answer sound: Bright pleasant chime
    playCorrect() {
      if (this.muted) return;
      this.playTone(523.25, "triangle", 0.12, 0, 0.15);
      this.playTone(659.25, "triangle", 0.12, 0.08, 0.15);
      this.playTone(783.99, "triangle", 0.25, 0.16, 0.18);
    }
    playSuccess() {
      this.playCorrect();
    }
    // Wrong answer sound: Gentle low bump
    playWrong() {
      if (this.muted) return;
      this.playTone(220, "sawtooth", 0.15, 0, 0.1);
      this.playTone(196, "sawtooth", 0.25, 0.12, 0.12);
    }
    // Level Up / Big Achievement Fanfare
    playLevelUp() {
      if (this.muted) return;
      const notes = [261.63, 329.63, 392, 523.25, 659.25, 783.99];
      notes.forEach((note, index) => {
        this.playTone(note, "sine", 0.2, index * 0.09, 0.15);
      });
    }
    // Soft button click
    playClick() {
      if (this.muted) return;
      this.playTone(400, "sine", 0.05, 0, 0.05);
    }
    // Speed round countdown tick
    playTick() {
      if (this.muted) return;
      this.playTone(800, "triangle", 0.04, 0, 0.04);
    }
    // Text-To-Speech (Pronunciation & Voice Narration)
    speak(text, optionsOrRate = 0.9, pitch = 1) {
      if (!this.synth) {
        console.warn("SpeechSynthesis is not supported in this browser.");
        return false;
      }
      this.synth.cancel();
      let rate = 0.9;
      let onStart = null;
      let onEnd = null;
      let lang = "en-US";
      if (typeof optionsOrRate === "object" && optionsOrRate !== null) {
        rate = optionsOrRate.rate !== void 0 ? optionsOrRate.rate : 0.9;
        pitch = optionsOrRate.pitch !== void 0 ? optionsOrRate.pitch : 1;
        lang = optionsOrRate.lang || "en-US";
        onStart = optionsOrRate.onStart || null;
        onEnd = optionsOrRate.onEnd || null;
      } else if (typeof optionsOrRate === "number") {
        rate = optionsOrRate;
      }
      const cleanText = (text || "").replace(/[*_#]/g, "").trim();
      if (!cleanText) return false;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.lang = lang;
      if (onStart) utterance.onstart = onStart;
      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }
      try {
        const voices = this.synth.getVoices();
        const enVoice = voices.find((v) => (v.lang.startsWith("en") || v.lang.includes("US") || v.lang.includes("GB")) && !v.name.includes("Bad"));
        if (enVoice) {
          utterance.voice = enVoice;
        }
      } catch (e) {
      }
      this.synth.speak(utterance);
      return true;
    }
    isSpeaking() {
      return !!(this.synth && this.synth.speaking);
    }
    stopSpeech() {
      if (this.synth) {
        this.synth.cancel();
      }
    }
    // Web Speech Recognition for Speaking Practice
    initRecognition() {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.lang = "en-US";
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 3;
      }
    }
    hasSpeechRecognition() {
      return !!this.recognition;
    }
    listenForSpeech(onResult, onError, onEnd) {
      if (!this.recognition) {
        if (onError) onError("Speech recognition is not available in this browser. You can still practice by speaking out loud!");
        return false;
      }
      try {
        this.recognition.onresult = (event) => {
          if (event.results && event.results[0]) {
            const spokenText = event.results[0][0].transcript;
            const confidence = event.results[0][0].confidence;
            if (onResult) onResult(spokenText, confidence);
          }
        };
        this.recognition.onerror = (event) => {
          console.warn("Speech recognition error:", event.error);
          if (onError) onError(event.error);
        };
        this.recognition.onend = () => {
          if (onEnd) onEnd();
        };
        this.recognition.start();
        return true;
      } catch (err) {
        console.warn("Failed to start speech recognition:", err);
        if (onError) onError(err.message);
        return false;
      }
    }
    stopListening() {
      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (e) {
        }
      }
    }
  };
  var sound = new SoundEngine();

  // js/confetti.js
  function fireConfetti(durationMs = 2500) {
    if (typeof document === "undefined") return;
    let canvas = document.getElementById("ha-confetti-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "ha-confetti-canvas";
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "999999";
      document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext("2d");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const colors = ["#0a2558", "#c8102e", "#f5a623", "#ffbe1a", "#ffffff", "#1e3a8a"];
    const particles = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 200,
        y: height * 0.4 + (Math.random() - 0.5) * 100,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 18,
        vy: Math.random() * -16 - 6,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }
    const startTime = Date.now();
    function animate() {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);
      let activeParticles = 0;
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        if (elapsed > durationMs * 0.6) {
          p.opacity = Math.max(0, 1 - (elapsed - durationMs * 0.6) / (durationMs * 0.4));
        }
        if (p.opacity > 0 && p.y < height + 50) {
          activeParticles++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }
      if (activeParticles > 0 && elapsed < durationMs) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }
    requestAnimationFrame(animate);
  }

  // js/utils/crypto.js
  function generateSalt(length = 16) {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const bytes = new Uint8Array(length);
      crypto.getRandomValues(bytes);
      return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    let salt = "";
    const chars = "abcdef0123456789";
    for (let i = 0; i < length * 2; i++) {
      salt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return salt;
  }
  async function hashPassword(password, salt) {
    const salted = `${salt}:${password}`;
    const enc = new TextEncoder();
    const data = enc.encode(salted);
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const buffer = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    let hash = 0;
    for (let i = 0; i < salted.length; i++) {
      const char = salted.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return "ha_fallback_" + Math.abs(hash).toString(16);
  }
  async function verifyPassword(inputPassword, storedHash, salt) {
    if (!inputPassword || !storedHash || !salt) return false;
    const inputHash = await hashPassword(inputPassword, salt);
    return inputHash === storedHash;
  }

  // js/services/apiClient.js
  var TOKEN_KEY = "home_academy_auth_token";
  var ADMIN_TOKEN_KEY = "home_academy_admin_token";
  var ApiClient = class {
    constructor() {
      this.token = this.loadToken(TOKEN_KEY);
      this.adminToken = this.loadToken(ADMIN_TOKEN_KEY);
      this.eventSource = null;
      this.eventListeners = /* @__PURE__ */ new Set();
    }
    loadToken(key) {
      try {
        if (typeof localStorage !== "undefined") {
          return localStorage.getItem(key);
        }
      } catch (e) {
      }
      return null;
    }
    setToken(token) {
      this.token = token;
      try {
        if (typeof localStorage !== "undefined") {
          if (token) localStorage.setItem(TOKEN_KEY, token);
          else localStorage.removeItem(TOKEN_KEY);
        }
      } catch (e) {
      }
    }
    clearToken() {
      this.setToken(null);
    }
    setAdminToken(token) {
      this.adminToken = token;
      try {
        if (typeof localStorage !== "undefined") {
          if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
          else localStorage.removeItem(ADMIN_TOKEN_KEY);
        }
      } catch (e) {
      }
    }
    clearAdminToken() {
      this.setAdminToken(null);
    }
    async request(path, options = {}) {
      const headers = {
        "Content-Type": "application/json",
        ...options.headers || {}
      };
      const isAdminPath = path.startsWith("/api/admin/");
      if (options.isAdmin || isAdminPath) {
        if (this.adminToken) {
          headers["Authorization"] = `Bearer ${this.adminToken}`;
        }
      } else if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }
      const config = {
        credentials: "include",
        // Send and receive HTTP-only cookies
        ...options,
        headers
      };
      if (config.body && typeof config.body === "object") {
        config.body = JSON.stringify(config.body);
      }
      const baseUrl = typeof window !== "undefined" ? "" : process.env.API_BASE_URL || "http://localhost:3000";
      const fullUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;
      try {
        const response = await fetch(fullUrl, config);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const error = new Error(data.error || `HTTP ${response.status}: Request failed`);
          error.status = response.status;
          error.data = data;
          throw error;
        }
        return data;
      } catch (err) {
        throw err;
      }
    }
    // ------------------------------------------------------------------------
    // AUTHENTICATION
    // ------------------------------------------------------------------------
    async getClassInfo() {
      return this.request("/api/class-info");
    }
    async register({ name, email, password, avatar, classCode }) {
      const res = await this.request("/api/auth/register", {
        method: "POST",
        body: { name, email, password, avatar, classCode }
      });
      if (res.token) this.setToken(res.token);
      return res;
    }
    async login({ email, password }) {
      const res = await this.request("/api/auth/login", {
        method: "POST",
        body: { email, password }
      });
      if (res.token) this.setToken(res.token);
      return res;
    }
    async getMe() {
      try {
        const res = await this.request("/api/auth/me");
        if (res && res.role === "student" && res.student) {
          return res.student;
        }
        return null;
      } catch (err) {
        if (err.status === 401) {
          this.setToken(null);
        }
        return null;
      }
    }
    async logout() {
      try {
        await this.request("/api/auth/logout", { method: "POST" });
      } catch (e) {
      }
      this.setToken(null);
    }
    // ------------------------------------------------------------------------
    // TEACHER / ADMIN
    // ------------------------------------------------------------------------
    async adminLogin(arg1, arg2, arg3) {
      let payload = {};
      if (typeof arg1 === "object" && arg1 !== null) {
        payload = arg1;
      } else if (arg2 !== void 0) {
        payload = { emailOrUsername: arg1, password: arg2, rememberMe: Boolean(arg3) };
      } else {
        payload = { password: arg1, rememberMe: true };
      }
      const res = await this.request("/api/admin/login", {
        method: "POST",
        body: payload
      });
      if (res.token) this.setAdminToken(res.token);
      return res;
    }
    async adminGetMe() {
      try {
        const res = await this.request("/api/admin/me", { isAdmin: true });
        return res && Boolean(res.authenticated);
      } catch (e) {
        this.setAdminToken(null);
        return false;
      }
    }
    async adminLogout() {
      try {
        await this.request("/api/auth/logout", { method: "POST", isAdmin: true });
      } catch (e) {
      }
      this.setAdminToken(null);
    }
    async adminLogoutAll() {
      const res = await this.request("/api/admin/security/logout-all", {
        method: "POST",
        isAdmin: true
      });
      this.setAdminToken(null);
      return res;
    }
    async adminGetRoster() {
      return this.request("/api/admin/students", { isAdmin: true });
    }
    async adminGetStudentProfile(studentId) {
      return this.request(`/api/admin/students/${encodeURIComponent(studentId)}`, { isAdmin: true });
    }
    async adminAwardXP(studentId, amount, reason) {
      return this.request("/api/admin/award-xp", {
        method: "POST",
        isAdmin: true,
        body: { studentId, amount, reason }
      });
    }
    async adminDeleteStudent(studentId) {
      return this.request(`/api/admin/students/${encodeURIComponent(studentId)}`, {
        method: "DELETE",
        isAdmin: true
      });
    }
    async adminGetQuestions(topicId = null) {
      const query = topicId ? `?topicId=${encodeURIComponent(topicId)}` : "";
      return this.request(`/api/admin/questions${query}`, { isAdmin: true });
    }
    async adminCreateQuestion(data) {
      return this.request("/api/admin/questions", {
        method: "POST",
        isAdmin: true,
        body: data
      });
    }
    async adminDeleteQuestion(questionId) {
      return this.request(`/api/admin/questions/${encodeURIComponent(questionId)}`, {
        method: "DELETE",
        isAdmin: true
      });
    }
    async adminGetNotifications(limit = 50) {
      return this.request(`/api/admin/notifications?limit=${limit}`, { isAdmin: true });
    }
    async adminMarkNotificationsRead() {
      return this.request("/api/admin/notifications/read", {
        method: "PATCH",
        isAdmin: true
      });
    }
    async adminGetSettings() {
      return this.request("/api/admin/settings", { isAdmin: true });
    }
    async adminUpdateSettings(settings) {
      return this.request("/api/admin/settings", {
        method: "PUT",
        isAdmin: true,
        body: settings
      });
    }
    async adminChangePassword(arg1, arg2) {
      let payload = {};
      if (typeof arg1 === "object" && arg1 !== null) {
        payload = arg1;
      } else {
        payload = { newPassword: arg1, currentPassword: arg2 };
      }
      const res = await this.request("/api/admin/security/change-password", {
        method: "POST",
        isAdmin: true,
        body: payload
      });
      if (res.token) this.setAdminToken(res.token);
      return res;
    }
    async adminGetCurriculum() {
      return this.request("/api/admin/curriculum", { isAdmin: true });
    }
    async adminToggleCurriculum(topicId) {
      return this.request(`/api/admin/curriculum/${encodeURIComponent(topicId)}/toggle`, {
        method: "PATCH",
        isAdmin: true
      });
    }
    async adminDeleteCurriculum(topicId) {
      return this.request(`/api/admin/curriculum/${encodeURIComponent(topicId)}`, {
        method: "DELETE",
        isAdmin: true
      });
    }
    async adminResetCurriculum() {
      return this.request("/api/admin/curriculum/reset", {
        method: "POST",
        isAdmin: true
      });
    }
    async adminGetRoleplays() {
      return this.request("/api/admin/roleplays", { isAdmin: true });
    }
    async adminToggleRoleplay(id) {
      return this.request(`/api/admin/roleplays/${encodeURIComponent(id)}/toggle`, {
        method: "PATCH",
        isAdmin: true
      });
    }
    async adminUpdateRoleplay(id, data) {
      return this.request(`/api/admin/roleplays/${encodeURIComponent(id)}`, {
        method: "PUT",
        isAdmin: true,
        body: data
      });
    }
    async adminDeleteRoleplay(id) {
      return this.request(`/api/admin/roleplays/${encodeURIComponent(id)}`, {
        method: "DELETE",
        isAdmin: true
      });
    }
    async adminResetRoleplays() {
      return this.request("/api/admin/roleplays/reset", {
        method: "POST",
        isAdmin: true
      });
    }
    // ------------------------------------------------------------------------
    // LEARNING, PROGRESS & SERVER-VERIFIED XP
    // ------------------------------------------------------------------------
    async getCurriculum() {
      return this.request("/api/curriculum");
    }
    async getRoleplays() {
      return this.request("/api/roleplays");
    }
    async getLeaderboard(limit = 50) {
      return this.request(`/api/leaderboard?limit=${limit}`);
    }
    async recordTopicLearn(topicId) {
      return this.request(`/api/curriculum/${encodeURIComponent(topicId)}/learn`, {
        method: "POST"
      });
    }
    async recordTopicPractice(topicId, count = 1) {
      return this.request(`/api/curriculum/${encodeURIComponent(topicId)}/practice`, {
        method: "POST",
        body: { count }
      });
    }
    async recordTopicQuiz(topicId, quizData) {
      return this.request(`/api/curriculum/${encodeURIComponent(topicId)}/quiz`, {
        method: "POST",
        body: quizData
      });
    }
    async recordFullGrammarTest(testData) {
      return this.request("/api/full-test/submit", {
        method: "POST",
        body: testData
      });
    }
    async recordActivityCompletion(activityData) {
      return this.request("/api/activities/submit", {
        method: "POST",
        body: activityData
      });
    }
    async recordRoleplayCompletion(roleplayId, percent = 100) {
      return this.request(`/api/roleplays/${encodeURIComponent(roleplayId)}/complete`, {
        method: "POST",
        body: { percent }
      });
    }
    async recordXP({ amount, activityType = "general", idempotencyKey = null }) {
      return this.request("/api/student/xp", {
        method: "POST",
        body: { amount, activityType, idempotencyKey }
      });
    }
    async syncStudent(data) {
      return this.request("/api/student/sync", {
        method: "POST",
        body: data
      });
    }
    // ------------------------------------------------------------------------
    // STUDENT ↔ TEACHER CHAT (MESSAGES)
    // ------------------------------------------------------------------------
    async getChatMessages() {
      return this.request("/api/messages");
    }
    async sendChatMessage({ senderName, content, studentId, studentEmail }) {
      return this.request("/api/messages", {
        method: "POST",
        body: { senderName, content, studentId, studentEmail }
      });
    }
    async adminGetMessages() {
      return this.request("/api/admin/messages", { isAdmin: true });
    }
    async adminReplyMessage(messageId, replyText) {
      return this.request("/api/admin/messages/reply", {
        method: "POST",
        isAdmin: true,
        body: { messageId, replyText }
      });
    }
    async adminDeleteMessage(messageId) {
      return this.request(`/api/admin/messages/${encodeURIComponent(messageId)}`, {
        method: "DELETE",
        isAdmin: true
      });
    }
    // ------------------------------------------------------------------------
    // REAL-TIME SERVER-SENT EVENTS (SSE)
    // ------------------------------------------------------------------------
    subscribeEvents(listener) {
      this.eventListeners.add(listener);
      if (!this.eventSource && typeof window !== "undefined" && window.EventSource) {
        this.initEventSource();
      }
      return () => {
        this.eventListeners.delete(listener);
      };
    }
    initEventSource() {
      try {
        this.eventSource = new EventSource("/api/events");
        const dispatch = (type, data) => {
          for (const listener of this.eventListeners) {
            try {
              listener(type, data);
            } catch (e) {
              console.error("SSE listener error:", e);
            }
          }
        };
        this.eventSource.addEventListener("leaderboard_update", (e) => {
          try {
            dispatch("leaderboard_update", JSON.parse(e.data));
          } catch (err) {
          }
        });
        this.eventSource.addEventListener("student_joined", (e) => {
          try {
            dispatch("student_joined", JSON.parse(e.data));
          } catch (err) {
          }
        });
        this.eventSource.addEventListener("curriculum_updated", (e) => {
          try {
            dispatch("curriculum_updated", JSON.parse(e.data));
          } catch (err) {
          }
        });
        this.eventSource.addEventListener("roleplay_updated", (e) => {
          try {
            dispatch("roleplay_updated", JSON.parse(e.data));
          } catch (err) {
          }
        });
        this.eventSource.addEventListener("settings_updated", (e) => {
          try {
            dispatch("settings_updated", JSON.parse(e.data));
          } catch (err) {
          }
        });
        this.eventSource.onerror = () => {
        };
      } catch (e) {
        console.warn("SSE not initialized:", e);
      }
    }
  };
  var apiClient2 = new ApiClient();

  // js/state.js
  var STORAGE_KEY = "home_academy_v3_production";
  var SESSION_KEY = "home_academy_active_session";
  var StateManager = class {
    constructor() {
      this.listeners = [];
      this.state = this.loadState();
      if (typeof window !== "undefined") {
        setTimeout(() => {
          this.initBackend().catch((err) => console.warn("Backend sync notice:", err));
        }, 0);
      }
    }
    loadState() {
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem("home_academy_v1_state");
          localStorage.removeItem("home_academy_v2_clean");
          localStorage.removeItem("home_academy_test_state");
        }
      } catch (e) {
      }
      let activeSessionId = null;
      try {
        if (typeof localStorage !== "undefined") {
          activeSessionId = localStorage.getItem(SESSION_KEY);
        }
      } catch (e) {
      }
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (!Array.isArray(parsed.students)) {
            parsed.students = [];
          }
          if (!parsed.classInfo) {
            parsed.classInfo = INITIAL_CLASS;
          } else if (!parsed.classInfo.teacher || parsed.classInfo.teacher === "Home Academy Instructor") {
            parsed.classInfo.teacher = "Sir Zubair";
          }
          if (!parsed.achievements) {
            parsed.achievements = ACHIEVEMENTS;
          }
          if (!Array.isArray(parsed.curriculumTopics)) {
            parsed.curriculumTopics = OFFICIAL_TOPICS;
          } else if (parsed.curriculumTopics.length === 0 && !parsed.curriculumCustomized) {
            parsed.curriculumTopics = OFFICIAL_TOPICS;
          }
          if (!Array.isArray(parsed.roleplays) || parsed.roleplays.length === 0) {
            parsed.roleplays = JSON.parse(JSON.stringify(OFFICIAL_ROLEPLAYS));
          }
          if (Array.isArray(parsed.students)) {
            parsed.students.forEach((s) => {
              if (!s.roleplayProgress) s.roleplayProgress = {};
            });
          }
          if (activeSessionId && parsed.students.length > 0) {
            const matched = parsed.students.find((s) => s.id === activeSessionId);
            if (matched) {
              parsed.currentStudentId = matched.id;
            } else {
              parsed.currentStudentId = null;
            }
          } else {
            parsed.currentStudentId = null;
          }
          delete parsed.teacherAuth;
          if (!parsed.teacherProfile) {
            parsed.teacherProfile = {
              name: "Sir Zubair",
              email: "teacher@homeacademy.com",
              role: "teacher"
            };
          }
          parsed.isAdmin = false;
          return parsed;
        } catch (e) {
          console.warn("Failed to parse stored state, initializing clean defaults:", e);
        }
      }
      const defaultState = {
        currentStudentId: null,
        classInfo: INITIAL_CLASS,
        students: [],
        // EMPTY ROSTER
        curriculumTopics: JSON.parse(JSON.stringify(OFFICIAL_TOPICS)),
        curriculumCustomized: false,
        roleplays: JSON.parse(JSON.stringify(OFFICIAL_ROLEPLAYS)),
        achievements: ACHIEVEMENTS,
        teacherProfile: {
          name: "Sir Zubair",
          email: "teacher@homeacademy.com",
          role: "teacher"
        },
        dailyChallenge: {
          id: "dc_" + (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          title: "Today's Academy Practice",
          description: "Complete practice across the active class topics to earn +50 bonus XP!",
          targetTasks: 1,
          xpReward: 50,
          completedDate: null
        },
        todayActivityCount: 0,
        lastActiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        isAdmin: false
      };
      this.saveState(defaultState);
      return defaultState;
    }
    saveState(stateToSave = this.state) {
      try {
        if (typeof localStorage !== "undefined") {
          const cleanState = { ...stateToSave, isAdmin: false };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
        }
      } catch (e) {
        console.warn("Error saving state:", e);
      }
    }
    saveSession(studentId) {
      try {
        if (typeof localStorage !== "undefined") {
          if (studentId) {
            localStorage.setItem(SESSION_KEY, studentId);
          } else {
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (e) {
        console.warn("Error saving session:", e);
      }
    }
    subscribe(callback) {
      this.listeners.push(callback);
      return () => {
        this.listeners = this.listeners.filter((cb) => cb !== callback);
      };
    }
    notify(event, payload) {
      this.saveState();
      this.listeners.forEach((cb) => {
        try {
          cb(event, payload, this.state);
        } catch (err) {
          console.error("Listener callback error:", err);
        }
      });
    }
    // ------------------------------------------------------------------------
    // BACKEND REAL-TIME SYNCHRONIZATION
    // ------------------------------------------------------------------------
    async initBackend() {
      if (typeof window === "undefined") return;
      try {
        const classRes = await apiClient2.getClassInfo().catch(() => null);
        if (classRes && classRes.success) {
          if (!this.state.classInfo) this.state.classInfo = {};
          this.state.classInfo.name = classRes.className || this.state.classInfo.name;
          this.state.classInfo.code = classRes.classCode || this.state.classInfo.code;
          this.state.classInfo.teacher = classRes.teacher || this.state.classInfo.teacher;
        }
        const currRes = await apiClient2.getCurriculum().catch(() => null);
        if (currRes && Array.isArray(currRes.topics) && currRes.topics.length > 0) {
          this.state.curriculumTopics = currRes.topics;
        }
        const rpRes = await apiClient2.getRoleplays().catch(() => null);
        if (rpRes && Array.isArray(rpRes.roleplays) && rpRes.roleplays.length > 0) {
          this.state.roleplays = rpRes.roleplays;
        }
        const localStudentsCopy = Array.isArray(this.state.students) ? [...this.state.students] : [];
        const lbRes = await apiClient2.getLeaderboard(100).catch(() => null);
        if (lbRes && Array.isArray(lbRes.leaderboard)) {
          this.state.students = lbRes.leaderboard.map((s) => ({ ...s }));
        }
        const me = await apiClient2.getMe().catch(() => null);
        if (me) {
          this.state.currentStudentId = me.id;
          const currentLocal = localStudentsCopy.find((s) => s.id === me.id || s.email && me.email && s.email.toLowerCase() === me.email.toLowerCase());
          const localXP = Number(currentLocal?.xp || 0);
          const serverXP = Number(me.xp || 0);
          if (localXP > serverXP) {
            try {
              const syncRes = await apiClient2.syncStudent({
                xp: localXP,
                streak: Math.max(Number(currentLocal?.streak) || 0, Number(me.streak) || 0),
                level: Math.max(Number(currentLocal?.level) || 1, Number(me.level) || 1),
                topicProgress: currentLocal?.topicProgress || {},
                roleplayProgress: currentLocal?.roleplayProgress || {},
                stats: currentLocal?.stats || {}
              });
              if (syncRes && syncRes.student) {
                me.xp = syncRes.student.xp;
                me.level = syncRes.student.level;
                me.streak = syncRes.student.streak;
              }
            } catch (e) {
            }
          }
          const idx = this.state.students.findIndex((s) => s.id === me.id);
          if (idx >= 0) {
            this.state.students[idx] = { ...this.state.students[idx], ...me };
          } else {
            this.state.students.push(me);
          }
          this.saveSession(me.id);
          this.notify("STUDENT_LOGGED_IN", me);
          this.notify("LEADERBOARD_UPDATED", this.state.students);
        } else if (!this.state.currentStudentId) {
          this.saveSession(null);
          apiClient2.clearToken();
        }
        const isAdmin = await apiClient2.adminGetMe().catch(() => false);
        if (isAdmin) {
          this.state.isAdmin = true;
          this.notify("ADMIN_STATUS_CHANGED", true);
        }
        this.saveState();
        apiClient2.subscribeEvents(async (eventType, eventData) => {
          if (eventType === "leaderboard_update" || eventType === "student_joined") {
            const freshLb = await apiClient2.getLeaderboard(100).catch(() => null);
            if (freshLb && Array.isArray(freshLb.leaderboard)) {
              this.state.students = freshLb.leaderboard.map((s) => ({ ...s }));
              const current = this.getCurrentStudent();
              if (current && !this.state.students.some((s) => s.id === current.id)) {
                this.state.students.push(current);
              }
              this.notify("LEADERBOARD_UPDATED", this.state.students);
            }
            if (this.state.currentStudentId) {
              const freshMe = await apiClient2.getMe().catch(() => null);
              if (freshMe) {
                const idx = this.state.students.findIndex((s) => s.id === freshMe.id);
                if (idx >= 0) this.state.students[idx] = freshMe;
                this.notify("STUDENT_UPDATED", freshMe);
              }
            }
          } else if (eventType === "curriculum_updated") {
            const curr = await apiClient2.getCurriculum().catch(() => null);
            if (curr && Array.isArray(curr.topics)) {
              this.state.curriculumTopics = curr.topics;
              this.notify("CURRICULUM_UPDATED", curr.topics);
            }
          } else if (eventType === "roleplay_updated") {
            const rps = await apiClient2.getRoleplays().catch(() => null);
            if (rps && Array.isArray(rps.roleplays)) {
              this.state.roleplays = rps.roleplays;
              this.notify("ROLEPLAYS_UPDATED", rps.roleplays);
            }
          } else if (eventType === "settings_updated") {
            if (eventData) {
              this.state.classInfo = { ...this.state.classInfo, ...eventData };
              this.notify("CLASS_SETTINGS_UPDATED", this.state.classInfo);
            }
          }
        });
      } catch (err) {
        console.warn("Backend sync failed:", err);
      }
    }
    // ------------------------------------------------------------------------
    // STUDENT QUERIES & GETTERS
    // ------------------------------------------------------------------------
    getCurrentStudent() {
      if (!this.state.currentStudentId) return null;
      return this.state.students.find((s) => s.id === this.state.currentStudentId) || null;
    }
    checkActiveSession() {
      return this.getCurrentStudent();
    }
    setCurrentStudent(studentId) {
      this.state.currentStudentId = studentId;
      this.saveSession(studentId);
      this.notify("STUDENT_SWITCHED", this.getCurrentStudent());
    }
    logout() {
      this.state.currentStudentId = null;
      this.state.isAdmin = false;
      this.saveSession(null);
      apiClient2.logout().catch(() => {
      });
      apiClient2.adminLogout().catch(() => {
      });
      this.notify("STUDENT_LOGGED_OUT", null);
    }
    logoutStudent() {
      this.logout();
    }
    setAdmin(isAdmin) {
      this.state.isAdmin = Boolean(isAdmin);
      this.notify("ADMIN_STATUS_CHANGED", this.state.isAdmin);
    }
    // Teacher Authentication: Authenticate against backend REST API & Turso database
    async verifyTeacherLogin(identifierOrPassword, optionalPassword, rememberMe = true) {
      let identifier = null;
      let password = null;
      let remember = true;
      if (typeof identifierOrPassword === "object" && identifierOrPassword !== null) {
        identifier = identifierOrPassword.identifier || identifierOrPassword.emailOrUsername || identifierOrPassword.username || identifierOrPassword.email;
        password = identifierOrPassword.password;
        remember = identifierOrPassword.rememberMe !== void 0 ? Boolean(identifierOrPassword.rememberMe) : true;
      } else if (optionalPassword !== void 0) {
        identifier = identifierOrPassword;
        password = optionalPassword;
        remember = Boolean(rememberMe);
      } else {
        password = identifierOrPassword;
        remember = true;
      }
      const cleanPass = (password || "").trim();
      if (!cleanPass) {
        throw new Error("Please enter the Teacher Password.");
      }
      const res = await apiClient2.adminLogin({
        emailOrUsername: identifier,
        password: cleanPass,
        rememberMe: remember
      });
      this.setAdmin(true);
      if (res.user || res.teacher) {
        this.state.teacherProfile = res.user || res.teacher;
      }
      return res;
    }
    // Teacher Security Settings: Change Teacher Portal Password
    async updateTeacherPassword(currentPassword, newPassword, confirmPassword) {
      if (!currentPassword) {
        throw new Error("Please enter your current password.");
      }
      if (!newPassword || newPassword.length < 6) {
        throw new Error("New teacher password must be at least 6 characters long.");
      }
      if (confirmPassword && newPassword !== confirmPassword) {
        throw new Error("New passwords do not match.");
      }
      if (newPassword === currentPassword) {
        throw new Error("New password must be different from your current password.");
      }
      const res = await apiClient2.adminChangePassword({
        currentPassword,
        newPassword,
        confirmPassword
      });
      this.notify("TEACHER_PASSWORD_CHANGED", { updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
      return res;
    }
    async logoutAdmin() {
      try {
        await apiClient2.adminLogout();
      } catch (e) {
      }
      this.setAdmin(false);
    }
    async logoutAdminAllDevices() {
      try {
        await apiClient2.adminLogoutAll();
      } catch (e) {
      }
      this.setAdmin(false);
    }
    // Teacher Management: Update Class Name, Private Class Code & Teacher Name
    updateClassSettings({ name, code, teacher }) {
      const cleanName = (name || "").trim();
      const cleanCode = (code || "").trim().toUpperCase();
      const cleanTeacher = (teacher || "").trim();
      if (!cleanName) throw new Error("Class name cannot be empty.");
      if (!cleanCode || cleanCode.length < 3) throw new Error("Class code must be at least 3 characters.");
      if (!this.state.classInfo) this.state.classInfo = {};
      this.state.classInfo.name = cleanName;
      this.state.classInfo.code = cleanCode;
      if (cleanTeacher) {
        this.state.classInfo.teacher = cleanTeacher;
      } else if (!this.state.classInfo.teacher) {
        this.state.classInfo.teacher = "Sir Zubair";
      }
      this.saveState();
      apiClient2.adminUpdateSettings({ name: cleanName, code: cleanCode, teacher: this.state.classInfo.teacher }).catch((err) => {
        console.warn("Backend class settings update:", err.message);
      });
      this.notify("CLASS_SETTINGS_UPDATED", this.state.classInfo);
      return this.state.classInfo;
    }
    // ------------------------------------------------------------------------
    // STUDENT REGISTRATION & LOGIN
    // ------------------------------------------------------------------------
    async registerStudent({ name, email, password, classCode, avatar = "\u{1F981}" }) {
      const cleanCode = (classCode || "").trim().toUpperCase();
      const expectedCode = (this.state.classInfo?.code || "HOME-ENGLISH").toUpperCase();
      if (cleanCode !== expectedCode) {
        throw new Error(`Invalid class code "${classCode}". Please enter the official class code: ${expectedCode}`);
      }
      const cleanName = (name || "").trim();
      if (!cleanName) throw new Error("Please enter your full name.");
      const cleanEmail = (email || "").trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
        throw new Error("Please enter a valid email address.");
      }
      if (!password || password.length < 4) {
        throw new Error("Password must be at least 4 characters long.");
      }
      const existing = this.state.students.find((s) => s.email && s.email.toLowerCase() === cleanEmail);
      if (existing) {
        throw new Error('An account with this email already exists. Please switch to the "Student Login" tab to enter your password.');
      }
      let backendStudent = null;
      try {
        const res = await apiClient2.register({
          name: cleanName,
          email: cleanEmail,
          password,
          avatar: avatar || "\u{1F981}",
          classCode: expectedCode
        });
        if (res && res.student) {
          backendStudent = res.student;
        }
      } catch (err) {
        if (err.data && err.data.error) {
          throw new Error(err.data.error);
        }
        console.warn("Backend register fallback to local:", err.message);
      }
      const salt = generateSalt();
      const hash = await hashPassword(password, salt);
      const student = backendStudent || {
        id: "ha_stu_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8),
        name: cleanName,
        email: cleanEmail,
        passwordHash: hash,
        passwordSalt: salt,
        avatar: avatar || "\u{1F981}",
        classCode: expectedCode,
        level: 1,
        xp: 0,
        streak: 0,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastActiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        topicProgress: {},
        roleplayProgress: {},
        stats: {
          quizzesTaken: 0,
          correctAnswers: 0,
          totalQuestions: 0,
          topicsCompleted: 0,
          gamesPlayed: 0,
          practiceRounds: 0
        },
        unlockedAchievements: ["first_join"],
        weeklyXP: [0, 0, 0, 0, 0, 0, 0]
      };
      const existingIndex = this.state.students.findIndex((s) => s.id === student.id || s.email === student.email);
      if (existingIndex >= 0) {
        this.state.students[existingIndex] = student;
      } else {
        this.state.students.push(student);
      }
      this.state.currentStudentId = student.id;
      this.saveSession(student.id);
      this.saveState();
      sound.playSuccess();
      fireConfetti(2e3);
      this.notify("STUDENT_JOINED", student);
      return student;
    }
    async loginStudent({ email, password }) {
      const cleanEmail = (email || "").trim().toLowerCase();
      if (!cleanEmail) throw new Error("Please enter your email address.");
      if (!password) throw new Error("Please enter your password.");
      let backendStudent = null;
      try {
        const res = await apiClient2.login({ email: cleanEmail, password });
        if (res && res.student) {
          backendStudent = res.student;
        }
      } catch (err) {
        if (err.data && err.data.error) {
          throw new Error(err.data.error);
        }
        console.warn("Backend login fallback to local:", err.message);
      }
      const localExisting = this.state.students.find((s) => backendStudent && s.id === backendStudent.id || s.email && s.email.toLowerCase() === cleanEmail);
      const student = backendStudent || localExisting;
      if (!student) {
        throw new Error('No student account found with this email. Please check your spelling or register under "New Student Join".');
      }
      if (!backendStudent) {
        if (student.passwordHash && student.passwordSalt) {
          const isValid = await verifyPassword(password, student.passwordHash, student.passwordSalt);
          if (!isValid) {
            throw new Error("Incorrect password. Please verify your password and try again.");
          }
        } else {
          const salt = generateSalt();
          student.passwordSalt = salt;
          student.passwordHash = await hashPassword(password, salt);
        }
      } else if (localExisting && (Number(localExisting.xp) || 0) > (Number(backendStudent.xp) || 0)) {
        try {
          const syncRes = await apiClient2.syncStudent({
            xp: Number(localExisting.xp) || 0,
            streak: Math.max(Number(localExisting.streak) || 0, Number(backendStudent.streak) || 0),
            level: Math.max(Number(localExisting.level) || 1, Number(backendStudent.level) || 1),
            topicProgress: localExisting.topicProgress || {},
            roleplayProgress: localExisting.roleplayProgress || {},
            stats: localExisting.stats || {}
          });
          if (syncRes && syncRes.student) {
            student.xp = syncRes.student.xp;
            student.level = syncRes.student.level;
            student.streak = syncRes.student.streak;
          }
        } catch (syncErr) {
          console.warn("Sync on login failed:", syncErr);
        }
      }
      const existingIndex = this.state.students.findIndex((s) => s.id === student.id || s.email === student.email);
      if (existingIndex >= 0) {
        this.state.students[existingIndex] = student;
      } else {
        this.state.students.push(student);
      }
      this.state.currentStudentId = student.id;
      this.saveSession(student.id);
      this.saveState();
      sound.playSuccess();
      this.notify("STUDENT_LOGGED_IN", student);
      this.notify("LEADERBOARD_UPDATED", this.state.students);
      return student;
    }
    async registerOrLoginStudent({ name, email, password = null, classCode = "HOME-ENGLISH", avatar = "\u{1F981}" }) {
      const cleanEmail = (email || "").trim().toLowerCase();
      const existing = this.state.students.find((s) => s.email && s.email.toLowerCase() === cleanEmail);
      if (existing) {
        if (password && existing.passwordHash) {
          return { student: await this.loginStudent({ email: cleanEmail, password }), isReturning: true };
        }
        this.state.currentStudentId = existing.id;
        this.saveSession(existing.id);
        this.saveState();
        this.notify("STUDENT_LOGGED_IN", existing);
        return { student: existing, isReturning: true };
      }
      const effectivePass = password || "student123";
      const student = await this.registerStudent({ name, email: cleanEmail, password: effectivePass, classCode, avatar });
      return { student, isReturning: false };
    }
    async joinClass(name, classCode, avatar = "\u{1F981}", email = null) {
      const autoEmail = email || `${name.toLowerCase().replace(/[^a-z0-9]/g, "") || "student"}@homeacademy.edu`;
      const res = await this.registerOrLoginStudent({ name, email: autoEmail, password: "password123", classCode, avatar });
      return res.student;
    }
    // ------------------------------------------------------------------------
    // XP, STREAKS & ACHIEVEMENTS
    // ------------------------------------------------------------------------
    addXP(amount, activityType = "general") {
      const student = this.getCurrentStudent();
      if (!student) return;
      const prevXP = student.xp || 0;
      const prevLevelInfo = getLevelInfo(prevXP);
      student.xp = (student.xp || 0) + amount;
      const newLevelInfo = getLevelInfo(student.xp);
      student.level = newLevelInfo.level;
      const dayOfWeek = ((/* @__PURE__ */ new Date()).getDay() + 6) % 7;
      if (!Array.isArray(student.weeklyXP)) student.weeklyXP = [0, 0, 0, 0, 0, 0, 0];
      student.weeklyXP[dayOfWeek] = (student.weeklyXP[dayOfWeek] || 0) + amount;
      this.updateDailyStreak(student);
      this.state.todayActivityCount = (this.state.todayActivityCount || 0) + 1;
      if (this.state.todayActivityCount >= this.state.dailyChallenge.targetTasks && !this.state.dailyChallenge.completedDate) {
        this.state.dailyChallenge.completedDate = (/* @__PURE__ */ new Date()).toISOString();
        student.xp += this.state.dailyChallenge.xpReward;
        this.notify("DAILY_CHALLENGE_COMPLETED", {
          title: this.state.dailyChallenge.title,
          reward: this.state.dailyChallenge.xpReward
        });
      }
      if (newLevelInfo.level > prevLevelInfo.level) {
        sound.playLevelUp();
        fireConfetti(3500);
        this.notify("LEVEL_UP", {
          student,
          oldLevel: prevLevelInfo,
          newLevel: newLevelInfo
        });
      }
      this.checkAchievements(student);
      this.notify("XP_GAINED", { student, amount, activityType });
      if (this.state.currentStudentId) {
        apiClient2.recordXP({
          amount,
          activityType,
          idempotencyKey: `xp_${student.id}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
        }).then((res) => {
          if (res && res.student && res.student.xp !== void 0) {
            student.xp = res.student.xp;
            student.level = res.student.level || student.level;
            const idx = this.state.students.findIndex((s) => s.id === student.id);
            if (idx >= 0) this.state.students[idx] = { ...this.state.students[idx], ...student };
            this.saveState();
            this.notify("LEADERBOARD_UPDATED", this.state.students);
          }
        }).catch((err) => {
          console.warn("Background XP sync notice:", err.message);
        });
      }
    }
    updateDailyStreak(student) {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      if (student.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 864e5).toISOString().split("T")[0];
        if (student.lastActiveDate === yesterday) {
          student.streak = (student.streak || 0) + 1;
          student.xp = (student.xp || 0) + 20;
          this.notify("STREAK_INCREASED", { streak: student.streak });
        } else if (!student.lastActiveDate) {
          student.streak = 1;
        }
        student.lastActiveDate = today;
      }
    }
    // ------------------------------------------------------------------------
    // TOPIC & CURRICULUM PROGRESS
    // ------------------------------------------------------------------------
    recordTopicProgress(topicId, step, data = {}) {
      const student = this.getCurrentStudent();
      if (!student) return;
      if (!student.topicProgress) student.topicProgress = {};
      if (!student.topicProgress[topicId]) {
        student.topicProgress[topicId] = {
          learned: false,
          practiceCount: 0,
          quizScore: 0,
          passed: false,
          completedAt: null
        };
      }
      const prog = student.topicProgress[topicId];
      if (step === "learn") {
        if (!prog.learned) {
          prog.learned = true;
          this.addXP(10, `learn_${topicId}`);
          apiClient2.recordTopicLearn(topicId).catch(() => {
          });
        }
      } else if (step === "practice") {
        prog.practiceCount = (prog.practiceCount || 0) + 1;
        const earnedXP = data.xp || 15;
        this.addXP(earnedXP, `practice_${topicId}`);
        if (!student.stats) student.stats = {};
        student.stats.practiceRounds = (student.stats.practiceRounds || 0) + 1;
        if (data.correctCount) {
          student.stats.correctAnswers = (student.stats.correctAnswers || 0) + data.correctCount;
          student.stats.totalQuestions = (student.stats.totalQuestions || 0) + (data.totalCount || data.correctCount);
        }
        apiClient2.recordTopicPractice(topicId, 1).catch(() => {
        });
      } else if (step === "quiz") {
        const scorePercent = data.scorePercent || 0;
        prog.quizScore = Math.max(prog.quizScore || 0, scorePercent);
        if (!student.stats) student.stats = {};
        student.stats.quizzesTaken = (student.stats.quizzesTaken || 0) + 1;
        if (data.correctCount) {
          student.stats.correctAnswers = (student.stats.correctAnswers || 0) + data.correctCount;
          student.stats.totalQuestions = (student.stats.totalQuestions || 0) + (data.totalCount || 5);
        }
        if (scorePercent >= 80) {
          const firstPass = !prog.passed;
          prog.passed = true;
          prog.completedAt = (/* @__PURE__ */ new Date()).toISOString();
          if (firstPass) {
            student.stats.topicsCompleted = (student.stats.topicsCompleted || 0) + 1;
            this.addXP(50, `quiz_pass_${topicId}`);
          } else {
            this.addXP(20, `quiz_retake_${topicId}`);
          }
        }
        const submissionToken = data.submissionToken || "qtok_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
        apiClient2.recordTopicQuiz(topicId, {
          submissionToken,
          score: data.correctCount || 0,
          total: data.totalCount || 5,
          percent: scorePercent
        }).catch(() => {
        });
      }
      this.checkAchievements(student);
      this.notify("TOPIC_PROGRESS_UPDATED", { student, topicId, step, prog });
    }
    markQuestionsSeen(topicId, questionIds) {
      const student = this.getCurrentStudent();
      if (!student || !Array.isArray(questionIds)) return;
      if (!student.seenQuestionIds) student.seenQuestionIds = {};
      if (!Array.isArray(student.seenQuestionIds[topicId])) student.seenQuestionIds[topicId] = [];
      questionIds.forEach((id) => {
        if (!student.seenQuestionIds[topicId].includes(id)) {
          student.seenQuestionIds[topicId].push(id);
        }
      });
      this.saveState();
    }
    getSeenQuestionIds(topicId) {
      const student = this.getCurrentStudent();
      if (!student || !student.seenQuestionIds) return [];
      return student.seenQuestionIds[topicId] || [];
    }
    // ------------------------------------------------------------------------
    // FULL GRAMMAR TEST
    // ------------------------------------------------------------------------
    recordFullTestResult(result) {
      const student = this.getCurrentStudent();
      if (!student) return { error: "No active student" };
      if (!student.fullTestHistory) student.fullTestHistory = [];
      if (!student.stats) student.stats = {};
      const isDuplicate = student.fullTestHistory.some((h) => h.submissionToken === result.submissionToken);
      if (isDuplicate) {
        return { success: false, duplicate: true, alreadyRecorded: true, xpEarned: 0 };
      }
      student.stats.fullTestsTaken = (student.stats.fullTestsTaken || 0) + 1;
      student.stats.bestFullTestScore = Math.max(student.stats.bestFullTestScore || 0, result.percent || 0);
      const submissionToken = result.submissionToken || "tok_" + Date.now() + "_" + Math.random();
      const historyEntry = {
        id: "ft_" + Date.now(),
        submissionToken,
        date: (/* @__PURE__ */ new Date()).toISOString(),
        score: result.score || 0,
        total: result.total || 0,
        percent: result.percent || 0,
        passed: result.percent >= 80,
        xpEarned: result.xpEarned || 0,
        topicBreakdown: result.topicBreakdown || {},
        answers: result.answers || []
      };
      student.fullTestHistory.unshift(historyEntry);
      if (result.xpEarned && result.xpEarned > 0) {
        this.addXP(result.xpEarned, "full_grammar_test");
      }
      apiClient2.recordFullGrammarTest({
        submissionToken,
        score: result.score || 0,
        total: result.total || 0,
        percent: result.percent || 0,
        topicBreakdown: result.topicBreakdown || {}
      }).catch(() => {
      });
      if (Array.isArray(result.questionIds)) {
        result.questionIds.forEach((item) => {
          if (item && item.topicId && item.id) {
            this.markQuestionsSeen(item.topicId, [item.id]);
          }
        });
      }
      this.checkAchievements(student);
      this.notify("FULL_TEST_COMPLETED", { student, result: historyEntry });
      return { success: true, xpEarned: result.xpEarned || 0, historyEntry };
    }
    // ------------------------------------------------------------------------
    // ACTIVITIES (GAMES)
    // ------------------------------------------------------------------------
    recordActivityCompletion(topicId, activityType, xpReward = 15) {
      const student = this.getCurrentStudent();
      if (!student) return;
      if (!student.activityHistory) student.activityHistory = [];
      if (!student.stats) student.stats = {};
      student.stats.activitiesCompleted = (student.stats.activitiesCompleted || 0) + 1;
      student.stats.gamesPlayed = (student.stats.gamesPlayed || 0) + 1;
      student.activityHistory.unshift({
        id: "act_" + Date.now(),
        topicId,
        activityType,
        date: (/* @__PURE__ */ new Date()).toISOString(),
        xpReward
      });
      this.addXP(xpReward, `activity_${topicId}_${activityType}`);
      apiClient2.recordActivityCompletion({
        topicId,
        activityType,
        xpReward
      }).catch(() => {
      });
      this.checkAchievements(student);
      this.notify("ACTIVITY_COMPLETED", { student, topicId, activityType });
    }
    recordActivityStats(statKey, count = 1) {
      const student = this.getCurrentStudent();
      if (!student) return;
      if (!student.stats) student.stats = {};
      student.stats[statKey] = (student.stats[statKey] || 0) + count;
      this.checkAchievements(student);
      this.notify("STATS_UPDATED", student);
    }
    checkAchievements(student) {
      const newlyUnlocked = [];
      if (!Array.isArray(student.unlockedAchievements)) {
        student.unlockedAchievements = [];
      }
      this.state.achievements.forEach((ach) => {
        if (student.unlockedAchievements.includes(ach.id)) return;
        let qualified = false;
        switch (ach.type) {
          case "join":
            qualified = true;
            break;
          case "streak":
            qualified = (student.streak || 0) >= ach.requirement;
            break;
          case "xp":
            qualified = (student.xp || 0) >= ach.requirement;
            break;
          case "games_played":
            qualified = (student.stats?.gamesPlayed || 0) >= ach.requirement;
            break;
          case "topic_master_adjectives":
            qualified = student.topicProgress?.adjectives?.quizScore === 100;
            break;
          case "topic_master_genitive_s":
            qualified = student.topicProgress?.genitive_s?.quizScore === 100;
            break;
          case "topic_master_question_words":
            qualified = student.topicProgress?.question_words?.quizScore === 100;
            break;
          case "topic_master_whose":
            qualified = student.topicProgress?.whose?.quizScore === 100;
            break;
          case "topic_master_possessive_adjectives":
            qualified = student.topicProgress?.possessive_adjectives?.quizScore === 100;
            break;
          case "topic_master_what_color_genitive_s":
            qualified = student.topicProgress?.what_color_genitive_s?.quizScore === 100;
            break;
          case "perfect_quiz":
            qualified = Object.values(student.topicProgress || {}).some((p) => p.quizScore === 100);
            break;
          case "roleplay_complete":
            qualified = Boolean(student.roleplayProgress && ach.roleplayId && student.roleplayProgress[ach.roleplayId]?.completed);
            break;
        }
        if (qualified) {
          student.unlockedAchievements.push(ach.id);
          student.xp = (student.xp || 0) + (ach.xpReward || 0);
          newlyUnlocked.push(ach);
        }
      });
      if (newlyUnlocked.length > 0) {
        sound.playLevelUp();
        fireConfetti(3e3);
        newlyUnlocked.forEach((ach) => {
          this.notify("ACHIEVEMENT_UNLOCKED", { student, achievement: ach });
        });
      }
    }
    // ------------------------------------------------------------------------
    // LEADERBOARD
    // ------------------------------------------------------------------------
    getLeaderboard() {
      return [...this.state.students].sort((a, b) => (b.xp || 0) - (a.xp || 0));
    }
    getStudentRank(studentId = this.state.currentStudentId) {
      const list = this.getLeaderboard();
      const index = list.findIndex((s) => s.id === studentId);
      if (index === -1) {
        return {
          rank: null,
          totalStudents: list.length,
          student: null,
          nextStudent: null,
          xpToNextRank: 0
        };
      }
      return {
        rank: index + 1,
        totalStudents: list.length,
        student: list[index],
        nextStudent: index > 0 ? list[index - 1] : null,
        xpToNextRank: index > 0 ? (list[index - 1].xp || 0) - (list[index].xp || 0) : 0
      };
    }
    updateAvatar(avatar) {
      const student = this.getCurrentStudent();
      if (student) {
        student.avatar = avatar;
        this.notify("AVATAR_UPDATED", student);
      }
    }
    // ------------------------------------------------------------------------
    // CURRICULUM
    // ------------------------------------------------------------------------
    getActiveCurriculum() {
      const list = this.state.curriculumTopics || OFFICIAL_TOPICS;
      return list.filter((t) => t.active !== false);
    }
    // Admin capabilities
    adminDeleteStudent(studentId) {
      this.state.students = this.state.students.filter((s) => s.id !== studentId);
      if (this.state.currentStudentId === studentId) {
        this.state.currentStudentId = this.state.students.length ? this.state.students[0].id : null;
        this.saveSession(this.state.currentStudentId);
      }
      apiClient2.adminDeleteStudent(studentId).catch(() => {
      });
      this.notify("ADMIN_STUDENT_DELETED", studentId);
    }
    adminAddTopic(topicData) {
      if (!topicData.title) throw new Error("Topic title is required.");
      const newTopic = {
        id: topicData.id || "topic_" + Date.now(),
        number: String(this.state.curriculumTopics.length + 1).padStart(2, "0"),
        title: topicData.title,
        subtitle: topicData.subtitle || "",
        icon: topicData.icon || "\u{1F4D6}",
        color: topicData.color || "#2563eb",
        active: topicData.active !== false,
        summary: topicData.summary || "",
        vocab: topicData.vocab || [],
        examples: topicData.examples || [],
        practiceQuestions: topicData.practiceQuestions || [],
        quizQuestions: topicData.quizQuestions || []
      };
      this.state.curriculumTopics.push(newTopic);
      this.notify("ADMIN_TOPIC_ADDED", newTopic);
      return newTopic;
    }
    adminToggleTopic(topicId) {
      const topic = this.state.curriculumTopics.find((t) => t.id === topicId);
      if (topic) {
        topic.active = !topic.active;
        this.state.curriculumCustomized = true;
        apiClient2.adminToggleCurriculum(topicId).catch(() => {
        });
        this.notify("ADMIN_TOPIC_TOGGLED", topic);
      }
    }
    adminDeleteTopic(topicId) {
      if (!topicId) throw new Error("Topic ID is required to delete.");
      const index = this.state.curriculumTopics.findIndex((t) => t.id === topicId);
      if (index === -1) throw new Error("Topic not found in curriculum.");
      const deletedTopic = this.state.curriculumTopics[index];
      this.state.curriculumTopics = this.state.curriculumTopics.filter((t) => t.id !== topicId);
      this.state.curriculumCustomized = true;
      this.state.curriculumTopics.forEach((t, i) => {
        t.number = String(i + 1).padStart(2, "0");
      });
      apiClient2.adminDeleteCurriculum(topicId).catch(() => {
      });
      this.notify("ADMIN_TOPIC_DELETED", deletedTopic);
      return deletedTopic;
    }
    adminResetCurriculum() {
      this.state.curriculumTopics = JSON.parse(JSON.stringify(OFFICIAL_TOPICS));
      this.state.curriculumCustomized = false;
      apiClient2.adminResetCurriculum().catch(() => {
      });
      this.notify("ADMIN_CURRICULUM_RESET", this.state.curriculumTopics);
      return this.state.curriculumTopics;
    }
    adminResetRoster() {
      this.state.students = [];
      this.state.currentStudentId = null;
      this.saveSession(null);
      this.notify("ADMIN_ROSTER_RESET", null);
    }
    // ------------------------------------------------------------------------
    // ROLEPLAY PRESENTATIONS
    // ------------------------------------------------------------------------
    getRoleplays() {
      const list = this.state.roleplays || OFFICIAL_ROLEPLAYS;
      return list.filter((r) => r.active !== false);
    }
    getAllRoleplays() {
      return this.state.roleplays || OFFICIAL_ROLEPLAYS;
    }
    getRoleplayById(roleplayId) {
      const list = this.state.roleplays || OFFICIAL_ROLEPLAYS;
      return list.find((r) => r.id === roleplayId) || null;
    }
    getStudentRoleplayProgress(studentId = this.state.currentStudentId) {
      const student = studentId ? this.state.students.find((s) => s.id === studentId) : this.getCurrentStudent();
      if (!student) return { completedCount: 0, totalCount: 5, overallPercent: 0, items: {} };
      if (!student.roleplayProgress) student.roleplayProgress = {};
      const activeList = this.getRoleplays();
      let completedCount = 0;
      activeList.forEach((rp) => {
        const prog = student.roleplayProgress[rp.id];
        if (prog && prog.completed) {
          completedCount++;
        }
      });
      const overallPercent = activeList.length > 0 ? Math.round(completedCount / activeList.length * 100) : 0;
      return {
        completedCount,
        totalCount: activeList.length,
        overallPercent,
        percent: overallPercent,
        items: student.roleplayProgress
      };
    }
    recordRoleplayCompletion(roleplayId, result = {}) {
      if (typeof result === "number") {
        result = { percent: result, score: result, submissionToken: arguments[2] };
      }
      const student = this.getCurrentStudent();
      if (!student) return { error: "No active student" };
      if (!student.roleplayProgress) student.roleplayProgress = {};
      if (!student.stats) student.stats = {};
      const prevProg = student.roleplayProgress[roleplayId] || { completed: false, percent: 0, score: 0, attempts: 0 };
      if (result.submissionToken && prevProg.lastSubmissionToken === result.submissionToken) {
        return { success: false, duplicate: true, alreadyRecorded: true, xpEarned: 0 };
      }
      const isFirstTime = !prevProg.completed;
      const isPerfect = (result.percent || 0) >= 100;
      const xpReward = result.xpReward !== void 0 ? result.xpReward : isPerfect ? 50 : 25;
      const updatedProg = {
        completed: true,
        percent: Math.max(prevProg.percent || 0, result.percent || 100),
        score: Math.max(prevProg.score || 0, result.score || 0),
        totalQuestions: result.totalQuestions || 5,
        sentencesCreated: (prevProg.sentencesCreated || 0) + (result.sentencesCreated || 1),
        attempts: (prevProg.attempts || 0) + 1,
        lastCompletedDate: (/* @__PURE__ */ new Date()).toISOString(),
        lastSubmissionToken: result.submissionToken || "sub_rp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6)
      };
      student.roleplayProgress[roleplayId] = updatedProg;
      student.stats.roleplaysCompleted = Object.values(student.roleplayProgress).filter((p) => p.completed).length;
      let xpEarned = 0;
      if (isFirstTime) {
        xpEarned = xpReward;
        this.addXP(xpEarned, `roleplay_${roleplayId}`);
      } else if (isPerfect && (prevProg.percent || 0) < 100) {
        xpEarned = 25;
        this.addXP(xpEarned, `roleplay_${roleplayId}_perfection`);
      }
      apiClient2.recordRoleplayCompletion(roleplayId, updatedProg.percent).catch(() => {
      });
      this.checkAchievements(student);
      this.notify("ROLEPLAY_COMPLETED", { student, roleplayId, result: updatedProg, xpEarned });
      return { success: true, xpEarned, progress: updatedProg };
    }
    // Admin Roleplay Controls
    adminAddRoleplay(data) {
      if (!data.title) throw new Error("Roleplay title is required.");
      const nextNum = String(this.state.roleplays.length + 1).padStart(2, "0");
      const newRoleplay = {
        id: data.id || "rp_" + Date.now(),
        number: data.number || nextNum,
        title: data.title,
        subtitle: data.subtitle || "",
        icon: data.icon || "\u{1F3AD}",
        color: data.color || "#0A2558",
        active: data.active !== false,
        scenario: data.scenario || "",
        grammarFocus: Array.isArray(data.grammarFocus) ? data.grammarFocus : [data.grammarFocus || "General English"],
        grammarDescription: data.grammarDescription || "",
        spokenExpressions: Array.isArray(data.spokenExpressions) ? data.spokenExpressions : [],
        keyVocab: Array.isArray(data.keyVocab) ? data.keyVocab : [],
        practiceQuestions: Array.isArray(data.practiceQuestions) ? data.practiceQuestions : [],
        sentencePrompts: Array.isArray(data.sentencePrompts) ? data.sentencePrompts : [],
        speakingSentences: Array.isArray(data.speakingSentences) ? data.speakingSentences : []
      };
      this.state.roleplays.push(newRoleplay);
      this.notify("ADMIN_ROLEPLAY_ADDED", newRoleplay);
      return newRoleplay;
    }
    adminUpdateRoleplay(id, updateData) {
      const rp = this.state.roleplays.find((r) => r.id === id);
      if (!rp) throw new Error("Roleplay not found.");
      Object.assign(rp, updateData);
      apiClient2.adminUpdateRoleplay(id, updateData).catch(() => {
      });
      this.notify("ADMIN_ROLEPLAY_UPDATED", rp);
      return rp;
    }
    adminToggleRoleplayActive(id) {
      const rp = this.state.roleplays.find((r) => r.id === id);
      if (rp) {
        rp.active = !rp.active;
        apiClient2.adminToggleRoleplay(id).catch(() => {
        });
        this.notify("ADMIN_ROLEPLAY_TOGGLED", rp);
        return rp;
      }
    }
    adminDeleteRoleplay(id) {
      const index = this.state.roleplays.findIndex((r) => r.id === id);
      if (index === -1) throw new Error("Roleplay not found.");
      const deleted = this.state.roleplays.splice(index, 1)[0];
      this.state.roleplays.forEach((r, i) => {
        r.number = String(i + 1).padStart(2, "0");
      });
      apiClient2.adminDeleteRoleplay(id).catch(() => {
      });
      this.notify("ADMIN_ROLEPLAY_DELETED", deleted);
      return deleted;
    }
    adminResetRoleplays() {
      this.state.roleplays = JSON.parse(JSON.stringify(OFFICIAL_ROLEPLAYS));
      apiClient2.adminResetRoleplays().catch(() => {
      });
      this.notify("ADMIN_ROLEPLAYS_RESET", this.state.roleplays);
      return this.state.roleplays;
    }
  };
  var stateManager = new StateManager();

  // js/components/icons.js
  function createSvgIcon(svgContent, size = 20, className = "", viewBox = "0 0 24 24") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ha-icon ${className}" aria-hidden="true">${svgContent}</svg>`;
  }
  function dashboardIcon(size = 20, className = "") {
    return createSvgIcon('<rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect>', size, className);
  }
  function bookIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>', size, className);
  }
  function roleplayIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h.01"></path><path d="M12 9h.01"></path><path d="M16 9h.01"></path>', size, className);
  }
  function puzzleIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M19.439 7.85c0-1.57.802-2.54 2.14-2.54V4.19c-.836 0-1.612-.224-2.268-.61-.714-.42-1.222-1.07-1.442-1.84A2.99 2.99 0 0 0 14.97 0h-1.12c0 1.338-.97 2.14-2.54 2.14-1.57 0-2.54-.802-2.54-2.14H7.65c-.004.992-.358 1.93-1.002 2.62-.68.73-1.61 1.15-2.618 1.19v1.12c1.338 0 2.14.97 2.14 2.54 0 1.57-.802 2.54-2.14 2.54v1.12c1.008.04 1.938.46 2.618 1.19.644.69.998 1.628 1.002 2.62h1.12c0-1.338.97-2.14 2.54-2.14 1.57 0 2.54.802 2.54 2.14h1.12a2.99 2.99 0 0 0 2.899-1.74c.22-.77.728-1.42 1.442-1.84.656-.386 1.432-.61 2.268-.61v-1.12c-1.338 0-2.14-.97-2.14-2.54z"></path>', size, className, "0 0 24 24");
  }
  function graduationCapIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>', size, className);
  }
  function trophyIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>', size, className);
  }
  function speakerIcon(size = 20, className = "") {
    return createSvgIcon('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>', size, className);
  }
  function micIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', size, className);
  }
  function gamepadIcon(size = 20, className = "") {
    return createSvgIcon('<line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="6"></rect>', size, className);
  }
  function userIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', size, className);
  }
  function usersIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', size, className);
  }
  function keyIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5L11 9l-1.5-1.5L8 9l-1.5-1.5L2 12l5 5 1.5-1.5L10 17l1.5-1.5L13 17l1.5-1.5L16 17l5.5-5.5a4.5 4.5 0 0 0-6.36-6.36z"></path>', size, className);
  }
  function schoolIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M18 2h-3a5 5 0 0 0-5 5v14h10V4a2 2 0 0 0-2-2z"></path><path d="M10 10H6a2 2 0 0 0-2 2v9h6"></path><circle cx="14" cy="7" r="1"></circle>', size, className);
  }
  function pencilIcon(size = 18, className = "") {
    return createSvgIcon('<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>', size, className);
  }
  function refreshIcon(size = 18, className = "") {
    return createSvgIcon('<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>', size, className);
  }
  function checkIcon(size = 18, className = "") {
    return createSvgIcon('<polyline points="20 6 9 17 4 12"></polyline>', size, className);
  }
  function checkCircleIcon(size = 20, className = "") {
    return createSvgIcon('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', size, className);
  }
  function infoIcon(size = 18, className = "") {
    return createSvgIcon('<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>', size, className);
  }
  function arrowLeftIcon(size = 18, className = "") {
    return createSvgIcon('<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>', size, className);
  }
  function sparkIcon(size = 18, className = "") {
    return createSvgIcon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>', size, className);
  }

  // js/components/landing.js
  function renderLanding(container, onNavigate) {
    const currentStudent = stateManager.getCurrentStudent();
    const students = stateManager.getLeaderboard();
    const activeTopics = stateManager.getActiveCurriculum();
    container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-brand-tag">
            <span class="ha-nav-icon" style="color: var(--ha-gold);">${sparkIcon(16)}</span> Official Online Learning Platform
          </div>
          <h1 class="hero-title">
            Learn English.<br>
            <span style="color: var(--ha-red);">Play.</span> 
            <span style="color: var(--ha-gold-dark);">Improve.</span>
          </h1>
          <p class="hero-subtitle">
            Welcome to the digital companion for the <strong>Home Academy English Language Program</strong> taught by <strong>Sir Zubair</strong>. 
            Master the 6 foundational grammar and speaking topics taught in class through daily drills, exercises, and interactive games.
          </p>
          <div class="hero-buttons">
            ${currentStudent ? `
              <button class="btn btn-primary btn-lg" id="landing-dash-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${dashboardIcon(18)} GO TO MY DASHBOARD
              </button>
              <button class="btn btn-outline btn-lg" id="landing-topics-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${bookIcon(18)} VIEW 6 TOPICS
              </button>
            ` : `
              <button class="btn btn-primary btn-lg" id="landing-login-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${keyIcon(18)} STUDENT LOGIN
              </button>
              <button class="btn btn-secondary btn-lg" id="landing-join-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${schoolIcon(18)} JOIN WITH CLASS CODE
              </button>
              <button class="btn btn-outline btn-lg" id="landing-explore-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                ${bookIcon(18)} EXPLORE CURRICULUM
              </button>
            `}
          </div>
          <div class="hero-highlights">
            <div class="hero-highlight-item"><span style="color: var(--ha-navy);">${schoolIcon(16)}</span> Class Teacher: <strong>Sir Zubair</strong></div>
            <div class="hero-highlight-item"><span style="color: var(--ha-red);">${bookIcon(16)}</span> 6 Active Class Topics</div>
            <div class="hero-highlight-item"><span style="color: var(--ha-gold-dark);">${keyIcon(16)}</span> Class Code: <strong>HOME-ENGLISH</strong></div>
            <div class="hero-highlight-item"><span style="color: #059669;">${gamepadIcon(16)}</span> 6 Practice Activities</div>
          </div>
        </div>

        <!-- Official Logo & Active Student Hero Showcase Card -->
        <div class="hero-preview-card" style="text-align: center;">
          <div style="padding: 12px 0 20px;">
            <img src="assets/logo.png" alt="Home Academy English Language Program" 
              style="max-width: 240px; width: 100%; height: auto; object-fit: contain; margin: 0 auto; display: block; filter: drop-shadow(0 4px 12px rgba(10,37,88,0.1));" />
          </div>

          ${currentStudent ? `
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 20px; text-align: left;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 2.2rem; background: #fff; width: 48px; height: 48px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; box-shadow: var(--ha-shadow-xs);">${currentStudent.avatar}</span>
                  <div>
                    <strong style="color: var(--ha-navy); font-size: 1.1rem;">${currentStudent.name}</strong>
                    <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-gold-dark);">Level ${currentStudent.level} Student</div>
                  </div>
                </div>
                <span class="badge badge-gold">${currentStudent.xp || 0} XP</span>
              </div>
              <div class="progress-container" style="height: 6px;">
                <div class="progress-bar-fill" style="width: ${Math.min(100, (currentStudent.xp || 0) % 500 / 5)}%;"></div>
              </div>
            </div>
          ` : `
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 20px; text-align: center;">
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px;">
                Private Classroom Platform \u2022 Sir Zubair
              </div>
              <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 12px;">
                Taught by <strong>Sir Zubair</strong>. Enroll with your name & code:
              </p>
              <div style="display: inline-block; background: #FFFFFF; border: 2px dashed var(--ha-navy); padding: 6px 16px; border-radius: var(--radius-md); font-weight: 800; color: var(--ha-navy); font-size: 1.1rem; letter-spacing: 0.08em;">
                HOME-ENGLISH
              </div>
            </div>
          `}

          <!-- Live Sample Question from Topic 04: Whose -->
          <div class="hero-mini-quiz-card" style="text-align: left;">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-red); text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span>${sparkIcon(14)}</span> Quick Class Question (Whose)
            </div>
            <div class="hero-quiz-question">"Whose bag is this?" (Belongs to Tom)</div>
            <div class="hero-quiz-options">
              <button class="hero-option-btn" data-answer="Tom bag">Tom bag</button>
              <button class="hero-option-btn" data-answer="It is Tom's bag." id="hero-correct-opt">It is Tom's bag. \u2713</button>
              <button class="hero-option-btn" data-answer="Bag of Tom">Bag of Tom</button>
              <button class="hero-option-btn" data-answer="Tom is bag">Tom is bag</button>
            </div>
            <div id="hero-quiz-feedback" style="display: none; margin-top: 10px; font-size: 0.85rem; font-weight: 700;"></div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--ha-border); font-size: 0.85rem;">
            <span style="font-weight: 700; color: var(--ha-navy); display: inline-flex; align-items: center; gap: 6px;">
              ${usersIcon(16)} Joined Students: <strong>${students.length}</strong>
            </span>
            <button class="btn btn-secondary btn-sm" id="hero-open-app-btn">
              ${currentStudent ? "Open Dashboard \u2192" : "Join Classroom \u2192"}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- The 6 Active Curriculum Topics Showcase -->
    <section style="padding: clamp(36px, 6vw, 70px) 0; background: #FFFFFF;">
      <div class="container">
        <div style="text-align: center; max-width: 680px; margin: 0 auto clamp(24px, 4vw, 50px);">
          <span class="badge badge-navy" style="margin-bottom: 12px;">Active Class Curriculum \u2022 Sir Zubair</span>
          <h2 style="font-size: clamp(1.6rem, 4vw, 2.2rem); margin-bottom: 14px; color: var(--ha-navy);">
            ${activeTopics.length > 0 ? `The ${activeTopics.length} Topics Taught in Class` : `Class Curriculum`}
          </h2>
          <p style="font-size: clamp(0.92rem, 2.5vw, 1.05rem); color: var(--ha-text-muted); line-height: 1.6;">
            Every topic taught by <strong>Sir Zubair</strong> has a dedicated 5-step learning path: Rule explanation, classroom examples, interactive practice, 5-question quiz, and real XP rewards!
          </p>
        </div>

        ${activeTopics.length === 0 ? `
          <div class="ha-card" style="padding: 40px 20px; text-align: center; max-width: 520px; margin: 0 auto; border-top: 4px solid var(--ha-navy);">
            <div style="display: flex; justify-content: center; margin-bottom: 10px; color: var(--ha-navy);">${bookIcon(42)}</div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 8px;">Curriculum Under Update</h3>
            <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 16px;">
              Sir Zubair is currently updating the active class curriculum. Check back shortly or join the practice games!
            </p>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 20px;">
            ${activeTopics.map((t) => `
              <div class="ha-card" style="border-top: 5px solid ${t.color};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 1.6rem; color: ${t.color};">${bookIcon(28)}</span>
                  <span class="badge badge-navy">Topic ${t.number}</span>
                </div>
                <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 8px;">${t.title}</h3>
                <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 16px; line-height: 1.5;">
                  ${t.subtitle}
                </p>
                <div style="border-top: 1px solid var(--ha-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.8rem; font-weight: 700; color: ${t.color};">5-Step Master Path</span>
                  <span style="font-size: 0.85rem; font-weight: 800; color: var(--ha-gold-dark);">+50 XP</span>
                </div>
              </div>
            `).join("")}
          </div>

          <div style="text-align: center; margin-top: 36px;">
            <button class="btn btn-primary btn-lg" id="landing-curriculum-explore-btn">
              Explore All ${activeTopics.length} Class Topics \u2192
            </button>
          </div>
        `}
      </div>
    </section>

    <!-- Why Home Academy Digital Companion -->
    <section style="padding: clamp(36px, 6vw, 70px) 0; background: var(--ha-bg);">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto 32px;">
          <span class="badge badge-gold" style="margin-bottom: 12px;">Student Experience</span>
          <h2 style="font-size: clamp(1.5rem, 4vw, 2rem); color: var(--ha-navy);">Built For Classroom Success</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 18px;">
          <div class="ha-card" style="text-align: center; padding: 26px 18px;">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-red);">${bookIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Zero Confusing Extras</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
              Only the exact grammar and vocabulary lessons you learn in physical class. No irrelevant content.
            </p>
          </div>

          <div class="ha-card" style="text-align: center; padding: 32px 24px;">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-gold);">${sparkIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Daily 6-Topic Drill</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
              A fresh 6-question quick drill drawn from all 6 active topics to keep your English sharp every single day.
            </p>
          </div>

          <div class="ha-card" style="text-align: center; padding: 26px 18px; border-top: 4px solid var(--ha-red);">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-navy);">${roleplayIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Roleplay Presentations</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted); margin-bottom: 16px;">
              Practice real conversations from your English class. Learn spoken expressions, create your own sentences, and build speaking confidence.
            </p>
            <button class="btn btn-primary btn-sm" id="landing-roleplays-btn">
              PRACTICE ROLEPLAYS \u2192
            </button>
          </div>

          <div class="ha-card" style="text-align: center; padding: 32px 24px;">
            <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--ha-gold-dark);">${trophyIcon(42)}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Real Class Leaderboard</h3>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
              No fake or simulated students. Earn real XP through real practice and climb the classroom ranks.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
    container.querySelector("#landing-roleplays-btn")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("roleplays");
    });
    container.querySelector("#landing-dash-btn")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("dashboard");
    });
    container.querySelector("#landing-topics-btn")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("topics");
    });
    container.querySelector("#landing-login-btn")?.addEventListener("click", () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: { tab: "login" } }));
    });
    container.querySelector("#landing-join-btn")?.addEventListener("click", () => {
      sound.playClick();
      window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: { tab: "register" } }));
    });
    container.querySelector("#landing-explore-btn")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("topics");
    });
    container.querySelector("#landing-curriculum-explore-btn")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("topics");
    });
    container.querySelector("#hero-open-app-btn")?.addEventListener("click", () => {
      sound.playClick();
      if (currentStudent) {
        onNavigate("dashboard");
      } else {
        window.dispatchEvent(new CustomEvent("ha:open-join-modal"));
      }
    });
    const correctOpt = container.querySelector("#hero-correct-opt");
    const feedback = container.querySelector("#hero-quiz-feedback");
    container.querySelectorAll(".hero-option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isCorrect = btn === correctOpt;
        if (isCorrect) {
          sound.playCorrect();
          btn.classList.add("correct");
          feedback.style.color = "var(--ha-success)";
          feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(16)} Correct! Genitive 's shows possession: It is Tom's bag.</span>`;
        } else {
          sound.playWrong();
          btn.style.borderColor = "var(--ha-error)";
          btn.style.color = "var(--ha-error)";
          feedback.style.color = "var(--ha-error)";
          feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(16)} Not quite. Rule: Use Tom's bag to show it belongs to Tom.</span>`;
        }
        feedback.style.display = "block";
      });
    });
  }

  // js/components/dashboard.js
  function renderDashboard(container, onNavigate) {
    const student = stateManager.getCurrentStudent();
    if (!student) {
      container.innerHTML = `
      <div class="container" style="padding-top: 50px; padding-bottom: 70px; text-align: center; max-width: 650px;">
        <div class="ha-card" style="padding: 48px 32px; border-top: 6px solid var(--ha-navy);">
          <img src="assets/logo.png" alt="Home Academy Logo" style="height: 75px; width: auto; object-fit: contain; margin-bottom: 20px;" />
          <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 10px;">Welcome to Home Academy</h2>
          <p style="font-size: 1rem; color: var(--ha-text-muted); margin-bottom: 24px; line-height: 1.6;">
            English Language Program taught by <strong>Sir Zubair</strong>. Log in with your email and password, or join the class with code <strong>HOME-ENGLISH</strong> to access your personal dashboard and track your learning progress.
          </p>
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-lg" id="dash-empty-login-btn" style="display: inline-flex; align-items: center; gap: 8px;">
              ${keyIcon(18)} Student Log In
            </button>
            <button class="btn btn-secondary btn-lg" id="dash-empty-join-btn" style="display: inline-flex; align-items: center; gap: 8px;">
              ${schoolIcon(18)} Join Class
            </button>
            <button class="btn btn-outline btn-lg" id="dash-empty-explore-btn" style="display: inline-flex; align-items: center; gap: 8px;">
              ${bookIcon(18)} Preview Curriculum
            </button>
          </div>
        </div>
      </div>
    `;
      container.querySelector("#dash-empty-login-btn")?.addEventListener("click", () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: { tab: "login" } }));
      });
      container.querySelector("#dash-empty-join-btn")?.addEventListener("click", () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: { tab: "register" } }));
      });
      container.querySelector("#dash-empty-explore-btn")?.addEventListener("click", () => {
        sound.playClick();
        onNavigate("topics");
      });
      return;
    }
    const levelInfo = getLevelInfo(student.xp || 0);
    const rankInfo = stateManager.getStudentRank(student.id);
    const activeTopics = stateManager.getActiveCurriculum();
    const studentTopicProg = student.topicProgress || {};
    const roleplayProg = stateManager.getStudentRoleplayProgress(student.id);
    const isReturning = student.xp > 0 || student.topicProgress && Object.keys(student.topicProgress).length > 0;
    const welcomeHeadline = isReturning ? `Welcome back, ${student.name}!` : `Welcome, ${student.name}!`;
    const welcomeSubtext = isReturning ? "Ready to continue your English practice?" : "Your personal learning account is ready. Let's start with your first class topic!";
    const masteredCount = activeTopics.filter((t) => {
      const p = studentTopicProg[t.id];
      return p && (p.passed || p.quizScore && p.quizScore >= 80);
    }).length;
    container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
      
      <!-- Welcome Back Experience Banner -->
      <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: 26px 30px; margin-bottom: 28px; box-shadow: var(--ha-shadow-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px;">
        <div style="display: flex; align-items: center; gap: 18px;">
          <div style="font-size: 2.2rem; background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3); border-radius: var(--radius-pill); width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; color: #FFF;">
            ${userIcon(32)}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 4px;">
              <h1 style="font-size: 1.85rem; color: #FFFFFF; font-weight: 800; line-height: 1.2;">${welcomeHeadline}</h1>
              <span class="badge" style="background: var(--ha-gold); color: #061838; font-weight: 800;">Level ${student.level} \u2022 ${levelInfo.title}</span>
            </div>
            <p style="font-size: 0.95rem; color: #E2E8F0;">
              ${welcomeSubtext} \u2022 Class Teacher: <strong>Sir Zubair</strong>
            </p>
          </div>
        </div>

        <!-- Top-Right Actions: Continue Learning, My Profile, Logout -->
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-accent btn-sm" id="btn-welcome-continue" style="display: inline-flex; align-items: center; gap: 6px;">
            ${sparkIcon(14)} CONTINUE LEARNING
          </button>
          <button class="btn btn-outline btn-sm" id="btn-dash-profile" style="background: rgba(255,255,255,0.15); color: #FFF; border-color: rgba(255,255,255,0.4); display: inline-flex; align-items: center; gap: 6px;">
            ${userIcon(14)} My Profile
          </button>
          <button class="btn btn-outline btn-sm" id="btn-dash-logout" style="background: rgba(200,16,46,0.25); color: #FFF; border-color: rgba(200,16,46,0.6); display: inline-flex; align-items: center; gap: 6px;" title="Log out of this account">
            ${keyIcon(14)} Logout
          </button>
        </div>
      </div>

      <!-- Stats Overview Grid -->
      <div class="stats-grid">
        <div class="stat-pill-card">
          <div class="stat-icon-bubble gold" style="display: flex; align-items: center; justify-content: center; color: var(--ha-gold-dark);">
            ${trophyIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">CURRENT LEVEL</div>
            <div class="stat-value">Level ${levelInfo.level}</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-gold-dark);">
              ${levelInfo.title}
            </div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble navy" style="display: flex; align-items: center; justify-content: center; color: var(--ha-navy);">
            ${sparkIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">TOTAL XP</div>
            <div class="stat-value">${student.xp || 0} XP</div>
            <div style="font-size: 0.78rem; color: var(--ha-text-muted);">
              ${levelInfo.xpToNext} XP to next level
            </div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble red" style="display: flex; align-items: center; justify-content: center; color: var(--ha-red);">
            ${checkCircleIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">DAY STREAK</div>
            <div class="stat-value">${student.streak || 0} Days</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-red);">
              ${student.streak > 0 ? "Active streak!" : "Practice today to begin!"}
            </div>
          </div>
        </div>

        <div class="stat-pill-card">
          <div class="stat-icon-bubble gold" style="display: flex; align-items: center; justify-content: center; color: var(--ha-gold-dark);">
            ${trophyIcon(22)}
          </div>
          <div class="stat-content">
            <div class="stat-label">CLASS RANK</div>
            <div class="stat-value">Rank #${rankInfo.rank || 1}</div>
            <div style="font-size: 0.78rem; color: var(--ha-text-muted);">
              Out of ${rankInfo.totalStudents} classmates
            </div>
          </div>
        </div>
      </div>

      <!-- Today's English Practice Drill (6 Topics) -->
      <div class="challenge-hero-card" id="todays-drill-section" style="margin-bottom: 36px;">
        <div style="max-width: 650px;">
          <div class="challenge-badge-row">
            <span class="badge badge-gold">Daily English Practice</span>
            <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff;">+50 Bonus XP</span>
          </div>
          <h2 class="challenge-title">Today's Practice</h2>
          <p class="challenge-desc">
            Complete your daily 6-question quick drill drawn from each of the 6 active topics:
            <em>Adjectives, Genitive 's, Question Words, Whose, Possessive Adjectives, and What Color.</em>
          </p>
          <button class="btn btn-accent btn-lg" id="btn-start-daily-drill" style="display: inline-flex; align-items: center; gap: 8px;">
            ${sparkIcon(16)} START TODAY'S PRACTICE
          </button>
        </div>
      </div>

      <!-- Pillar 1: Topic Practice (The 6 Active Class Topics) -->
      <div style="margin-bottom: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-navy">Pillar 1</span>
              <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--ha-navy);">${bookIcon(22)}</span> Topic Practice
              </h2>
            </div>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-top: 4px;">
              Master lessons taught in class by <strong>Sir Zubair</strong> (${masteredCount} of ${activeTopics.length} Mastered) \u2022 Fresh questions every time!
            </p>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-view-all-topics">
            Open Topics Library \u2192
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px;">
          ${activeTopics.map((topic) => {
      const prog = studentTopicProg[topic.id] || {};
      const isMastered = prog.passed || prog.quizScore && prog.quizScore >= 80;
      const inProgress = prog.learned || prog.practiceCount && prog.practiceCount > 0;
      let statusText = "Not Started";
      let statusBadge = "badge-navy";
      let percent = 0;
      if (isMastered) {
        statusText = "Mastered";
        statusBadge = "badge-success";
        percent = 100;
      } else if (inProgress) {
        statusText = "In Practice";
        statusBadge = "badge-gold";
        percent = prog.learned && prog.practiceCount ? 60 : 30;
      }
      return `
              <div class="ha-card topic-dash-card" data-id="${topic.id}" style="padding: 20px; cursor: pointer; border-top: 4px solid ${topic.color}; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.5rem; color: ${topic.color};">${bookIcon(24)}</span>
                      <div>
                        <span style="font-size: 0.75rem; font-weight: 800; color: ${topic.color}; text-transform: uppercase;">Topic ${topic.number}</span>
                        <h3 style="font-size: 1.1rem; color: var(--ha-navy);">${topic.title}</h3>
                      </div>
                    </div>
                    <span class="badge ${statusBadge}">${statusText}</span>
                  </div>

                  <p style="font-size: 0.82rem; color: var(--ha-text-muted); margin-bottom: 14px; line-height: 1.4;">
                    ${topic.subtitle}
                  </p>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 4px;">
                    <span>Progress</span>
                    <span style="color: ${percent === 100 ? "var(--ha-success)" : "var(--ha-navy)"};">${percent}%</span>
                  </div>
                  <div class="progress-container" style="height: 7px; margin-bottom: 12px;">
                    <div class="progress-bar-fill" style="width: ${percent}%; background: ${topic.color};"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: var(--ha-text-muted);">5-Step Mastery</span>
                    <button class="btn btn-primary btn-sm" style="background: ${topic.color}; padding: 4px 12px; font-size: 0.8rem;">
                      ${isMastered ? "Review \u2192" : "Practice \u2192"}
                    </button>
                  </div>
                </div>
              </div>
            `;
    }).join("")}
        </div>
      </div>

      <!-- Pillar 2: Grammar Activities Hub -->
      <div style="margin-bottom: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-gold">Pillar 2</span>
              <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                <span style="color: #059669;">${gamepadIcon(22)}</span> Grammar Activities
              </h2>
            </div>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-top: 4px;">
              Interactive skill activities for every topic: matching, scrambles, true/false, and sentence building!
            </p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-open-activities-hub">
            View All Activities Hub \u2192
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;">
          
          <div class="ha-card dash-activity-card" data-activity="scramble" style="cursor: pointer; border-top: 4px solid #2563eb; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #2563eb;">${puzzleIcon(24)}</span>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">Sentence Scramble</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Unscramble words to construct grammatically correct class sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #2563eb;">Play Scramble \u2192</button>
          </div>

          <div class="ha-card dash-activity-card" data-activity="matching" style="cursor: pointer; border-top: 4px solid #059669; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #059669;">${refreshIcon(24)}</span>
              <span class="badge badge-success">+30 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">Pair Matching</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Match opposites, owner-possessions, and question-word targets.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #059669;">Play Matching \u2192</button>
          </div>

          <div class="ha-card dash-activity-card" data-activity="true_false" style="cursor: pointer; border-top: 4px solid #d97706; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #d97706;">${checkCircleIcon(24)}</span>
              <span class="badge badge-gold">+20 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">True or False</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Test grammar rules and learn with Sir Zubair's explanations.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #d97706;">Play True/False \u2192</button>
          </div>

          <div class="ha-card dash-activity-card" data-activity="builder" style="cursor: pointer; border-top: 4px solid #7c3aed; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="color: #7c3aed;">${pencilIcon(24)}</span>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">Sentence Builder</h3>
            <p style="font-size: 0.82rem; color: var(--ha-text-muted); line-height: 1.4; margin-bottom: 14px;">
              Assemble word chips in proper English grammar order.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #7c3aed;">Build Sentences \u2192</button>
          </div>

        </div>
      </div>

      <!-- Pillar 3: Full Grammar Test (Comprehensive Assessment Zone) -->
      <div style="margin-bottom: 42px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
          <span class="badge badge-red">Pillar 3</span>
          <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--ha-red);">${graduationCapIcon(22)}</span> Full Grammar Test
          </h2>
        </div>

        <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); border-radius: var(--radius-xl); padding: 30px; color: #FFFFFF; box-shadow: var(--ha-shadow-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
          <div style="max-width: 600px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="badge badge-gold">Mastery Exam</span>
              <span style="font-size: 0.8rem; color: #E2E8F0;">Covers all ${activeTopics.length} Active Topics</span>
            </div>
            <h3 style="font-size: 1.65rem; color: #FFFFFF; font-weight: 800; margin: 0 0 8px; line-height: 1.25;">
              Official Full Grammar Assessment
            </h3>
            <p style="font-size: 0.92rem; color: #E2E8F0; line-height: 1.5; margin-bottom: 18px;">
              One combined exam testing all 6 active grammar topics taught by <strong>Sir Zubair</strong>.
              Generates a <strong>fresh set of randomized questions every single attempt</strong>.
            </p>
            <div style="display: flex; gap: 14px; flex-wrap: wrap;">
              <div style="background: rgba(255,255,255,0.12); padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 0.72rem; text-transform: uppercase; color: #CBD5E1;">BEST SCORE</div>
                <div style="font-size: 1.3rem; font-weight: 800; color: var(--ha-gold);">${student.stats?.bestFullTestScore || 0}%</div>
              </div>
              <div style="background: rgba(255,255,255,0.12); padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 0.72rem; text-transform: uppercase; color: #CBD5E1;">TESTS TAKEN</div>
                <div style="font-size: 1.3rem; font-weight: 800; color: #FFFFFF;">${(student.fullTestHistory || []).length}</div>
              </div>
              <div style="background: rgba(255,255,255,0.12); padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.2);">
                <div style="font-size: 0.72rem; text-transform: uppercase; color: #CBD5E1;">PASS REWARD</div>
                <div style="font-size: 1.3rem; font-weight: 800; color: #34D399;">+75 XP</div>
              </div>
            </div>
          </div>

          <div>
            <button class="btn btn-accent btn-lg" id="btn-launch-full-test" style="padding: 16px 28px; font-size: 1.1rem; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4); font-weight: 800; display: inline-flex; align-items: center; gap: 10px;">
              ${graduationCapIcon(20)} START FULL GRAMMAR TEST
            </button>
          </div>
        </div>
      </div>

      <!-- Roleplay Presentations Module -->
      <div style="margin-bottom: 42px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-red">Speaking & Real Class</span>
              <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin: 0; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--ha-red);">${roleplayIcon(22)}</span> Roleplay Presentations
              </h2>
            </div>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-top: 4px;">
              Practice the real-life conversations and presentations you've already performed in class with <strong>Sir Zubair</strong>.
            </p>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-dash-open-roleplays">
            Practice Roleplays \u2192
          </button>
        </div>

        <div class="ha-card" style="padding: 24px; border-radius: var(--radius-xl); border-left: 6px solid var(--ha-navy); background: #FFFFFF; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
          <div style="max-width: 580px;">
            <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
              5 Real Classroom Presentations
            </h3>
            <p style="font-size: 0.9rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 12px;">
              Build spoken fluency, explore teacher expressions, create your own sentences, and engage in interactive dialogues across all 5 physical class presentations.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">01. Friend's House</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">02. Police Officer</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">03. Family & Jobs</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">04. Lost Children</span>
              <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700;">05. New School / College</span>
            </div>
          </div>

          <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-lg); padding: 18px 24px; min-width: 210px; text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase; margin-bottom: 4px;">
              ROLEPLAY PROGRESS
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 2px;">
              ${roleplayProg.completedCount} / ${roleplayProg.totalCount}
            </div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--ha-gold-dark); margin-bottom: 8px;">
              ${roleplayProg.overallPercent}% Completed
            </div>
            <div class="progress-container" style="height: 6px; width: 140px; margin: 0 auto; background: #CBD5E1;">
              <div class="progress-bar-fill" style="width: ${roleplayProg.overallPercent}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div>
        <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 16px;">Quick Actions</h2>
        <div class="quick-play-grid">
          <div class="quick-play-card" id="qa-topics">
            <span class="quick-play-icon" style="color: var(--ha-navy);">${bookIcon(28)}</span>
            <div class="quick-play-title">Class Topics</div>
            <div class="quick-play-meta">Study the 6 physical class topics</div>
          </div>

          <div class="quick-play-card" id="qa-roleplays">
            <span class="quick-play-icon" style="color: var(--ha-red);">${roleplayIcon(28)}</span>
            <div class="quick-play-title">Roleplays</div>
            <div class="quick-play-meta">5 real class speaking presentations</div>
          </div>

          <div class="quick-play-card" id="qa-activities">
            <span class="quick-play-icon" style="color: #059669;">${puzzleIcon(28)}</span>
            <div class="quick-play-title">Activities Hub</div>
            <div class="quick-play-meta">Sentence Scramble, Matching, True/False</div>
          </div>

          <div class="quick-play-card" id="qa-fulltest">
            <span class="quick-play-icon" style="color: var(--ha-navy);">${graduationCapIcon(28)}</span>
            <div class="quick-play-title">Full Grammar Test</div>
            <div class="quick-play-meta">Comprehensive combined assessment</div>
          </div>

          <div class="quick-play-card" id="qa-leaderboard">
            <span class="quick-play-icon" style="color: var(--ha-gold-dark);">${trophyIcon(28)}</span>
            <div class="quick-play-title">Class Leaderboard</div>
            <div class="quick-play-meta">See your rank among classmates</div>
          </div>

          <div class="quick-play-card" id="qa-profile">
            <span class="quick-play-icon" style="color: var(--ha-navy);">${userIcon(28)}</span>
            <div class="quick-play-title">My Account</div>
            <div class="quick-play-meta">View profile, email & settings</div>
          </div>
        </div>
      </div>

      <!-- Mount for Today's Drill Modal -->
      <div id="daily-drill-mount"></div>

    </div>
  `;
    container.querySelector("#btn-welcome-continue")?.addEventListener("click", () => {
      sound.playClick();
      const drillSection = container.querySelector("#todays-drill-section");
      if (drillSection) {
        drillSection.scrollIntoView({ behavior: "smooth" });
      } else {
        onNavigate("topics");
      }
    });
    container.querySelector("#btn-dash-profile")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("profile");
    });
    container.querySelector("#btn-dash-logout")?.addEventListener("click", () => {
      sound.playClick();
      if (confirm(`Are you sure you want to log out of ${student.name}'s account?`)) {
        stateManager.logout();
        onNavigate("home");
      }
    });
    container.querySelector("#btn-view-all-topics")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("topics");
    });
    container.querySelectorAll(".topic-dash-card").forEach((card) => {
      card.addEventListener("click", () => {
        sound.playClick();
        const topicId = card.dataset.id;
        onNavigate("topics");
        window.dispatchEvent(new CustomEvent("ha:open-topic", { detail: topicId }));
      });
    });
    container.querySelector("#btn-open-activities-hub")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("activities");
    });
    container.querySelectorAll(".dash-activity-card").forEach((card) => {
      card.addEventListener("click", () => {
        sound.playClick();
        const activityType = card.dataset.activity;
        onNavigate("activities");
        window.dispatchEvent(new CustomEvent("ha:open-activity", {
          detail: { activityType }
        }));
      });
    });
    container.querySelector("#btn-launch-full-test")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("full-test");
    });
    container.querySelector("#btn-dash-open-roleplays")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("roleplays");
    });
    container.querySelector("#qa-topics")?.addEventListener("click", () => onNavigate("topics"));
    container.querySelector("#qa-roleplays")?.addEventListener("click", () => onNavigate("roleplays"));
    container.querySelector("#qa-activities")?.addEventListener("click", () => onNavigate("activities"));
    container.querySelector("#qa-fulltest")?.addEventListener("click", () => onNavigate("full-test"));
    container.querySelector("#qa-leaderboard")?.addEventListener("click", () => onNavigate("leaderboard"));
    container.querySelector("#qa-profile")?.addEventListener("click", () => onNavigate("profile"));
    container.querySelector("#btn-start-daily-drill")?.addEventListener("click", () => {
      sound.playClick();
      launchDailyDrill(container.querySelector("#daily-drill-mount"));
    });
    function launchDailyDrill(mount) {
      const drillQuestions = generateDailyDrill(activeTopics);
      let drillIndex = 0;
      let drillScore = 0;
      function renderDrillStep() {
        if (drillIndex >= drillQuestions.length) {
          sound.playLevelUp();
          stateManager.addXP(50, "daily_drill_complete");
          stateManager.recordActivityStats("practiceRounds", 1);
          mount.innerHTML = `
          <div class="ha-modal-backdrop" style="display: flex;">
            <div class="ha-modal-dialog" style="text-align: center;">
              <div style="display: flex; justify-content: center; margin-bottom: 16px; color: var(--ha-gold);">
                ${trophyIcon(60)}
              </div>
              <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin: 10px 0;">Daily Practice Complete!</h2>
              <p style="font-size: 1rem; color: var(--ha-text-muted); margin-bottom: 16px;">
                Great work! You completed today's practice drill across all 6 topics! You scored <strong>${drillScore} / ${drillQuestions.length}</strong> and earned <strong>+50 Bonus XP</strong>!
              </p>
              <button class="btn btn-primary" id="btn-close-drill">Return to Dashboard</button>
            </div>
          </div>
        `;
          mount.querySelector("#btn-close-drill")?.addEventListener("click", () => {
            mount.innerHTML = "";
            renderDashboard(container, onNavigate);
          });
          return;
        }
        const q = drillQuestions[drillIndex];
        mount.innerHTML = `
        <div class="ha-modal-backdrop" style="display: flex;">
          <div class="ha-modal-dialog">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="badge badge-navy" style="display: inline-flex; align-items: center; gap: 6px;">
                ${bookIcon(14)} ${q.topicTitle}
              </span>
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--ha-navy);">Question ${drillIndex + 1} of ${drillQuestions.length}</span>
            </div>

            <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 20px;">
              ${q.question}
            </h3>

            <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px;" id="drill-options">
              ${(q.options || []).map((opt, idx) => `
                <button class="drill-opt-btn" data-index="${idx}" data-text="${opt}"
                  style="padding: 12px 16px; font-size: 0.95rem; font-weight: 700; color: var(--ha-navy); background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer;">
                  ${opt}
                </button>
              `).join("")}
            </div>

            <div id="drill-feedback" style="display: none; padding: 12px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.9rem; font-weight: 700;"></div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="btn-drill-next" style="display: none;">Next \u2192</button>
            </div>
          </div>
        </div>
      `;
        const optBtns = mount.querySelectorAll(".drill-opt-btn");
        const feedback = mount.querySelector("#drill-feedback");
        const nextBtn = mount.querySelector("#btn-drill-next");
        optBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            optBtns.forEach((b) => b.disabled = true);
            const chosen = btn.dataset.text;
            const chosenIdx = parseInt(btn.dataset.index);
            const isCorrect = q.type === "fill" ? chosen.toLowerCase() === q.answer.toLowerCase() : chosenIdx === q.answer;
            if (isCorrect) {
              drillScore++;
              sound.playCorrect();
              btn.style.borderColor = "var(--ha-success)";
              btn.style.background = "var(--ha-success-bg)";
              btn.style.color = "var(--ha-success)";
              feedback.style.background = "var(--ha-success-bg)";
              feedback.style.color = "var(--ha-success)";
              feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(16)} Correct!</span>`;
            } else {
              sound.playWrong();
              btn.style.borderColor = "var(--ha-error)";
              btn.style.background = "var(--ha-red-light)";
              btn.style.color = "var(--ha-red)";
              feedback.style.background = "var(--ha-red-light)";
              feedback.style.color = "var(--ha-red)";
              feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(16)} ${q.explanation || "Incorrect"}</span>`;
            }
            feedback.style.display = "block";
            nextBtn.style.display = "inline-flex";
          });
        });
        nextBtn.addEventListener("click", () => {
          sound.playClick();
          drillIndex++;
          renderDrillStep();
        });
      }
      renderDrillStep();
    }
  }

  // js/data/topic-activities.js
  var TOPIC_QUESTION_BANKS = {
    adjectives: [
      {
        id: "adj_01",
        topicId: "adjectives",
        type: "mcq",
        question: 'Which word is the adjective in: "The happy boy is singing."?',
        options: ["boy", "happy", "singing", "The"],
        answer: 1,
        explanation: '"Happy" is the adjective describing the boy.'
      },
      {
        id: "adj_02",
        topicId: "adjectives",
        type: "choose_sentence",
        question: "Choose the correct English sentence:",
        options: ["Ali drives a red car.", "Ali drives a car red.", "Ali a red car drives.", "Ali drives red a car."],
        answer: 0,
        explanation: 'In English, the adjective ("red") comes before the noun ("car").'
      },
      {
        id: "adj_03",
        topicId: "adjectives",
        type: "mcq",
        question: 'What is the opposite of the adjective "hot"?',
        options: ["warm", "cold", "slow", "dark"],
        answer: 1,
        explanation: '"Cold" is the exact opposite of "hot".'
      },
      {
        id: "adj_04",
        topicId: "adjectives",
        type: "fill",
        question: "The giraffe has a very _____ neck.",
        options: ["tall", "short", "cold", "fast"],
        answer: 0,
        explanation: 'We use "tall" or long to describe great height.'
      },
      {
        id: "adj_05",
        topicId: "adjectives",
        type: "mcq",
        question: 'Complete: "Turtles move very _____, but cheetahs are fast."',
        options: ["slow", "quick", "hot", "tall"],
        answer: 0,
        explanation: '"Slow" is the opposite of "fast".'
      },
      {
        id: "adj_06",
        topicId: "adjectives",
        type: "choose_sentence",
        question: "Choose the grammatically correct sentence:",
        options: ["This is an old house.", "This is a house old.", "This house old is an.", "This is old house an."],
        answer: 0,
        explanation: '"An old house" follows [article + adjective + noun].'
      },
      {
        id: "adj_07",
        topicId: "adjectives",
        type: "mcq",
        question: "My grandfather is 85 years old. He is ______.",
        options: ["young", "old", "new", "cold"],
        answer: 1,
        explanation: '"Old" describes advanced age.'
      },
      {
        id: "adj_08",
        topicId: "adjectives",
        type: "true_false",
        question: 'True or False: In English, adjectives change their spelling for plural nouns (e.g. "two bigs cars").',
        options: ['False \u2014 Adjectives never take an "s" in English', "True \u2014 Adjectives must always be pluralized"],
        answer: 0,
        explanation: 'English adjectives never add "s" for plurals ("two big cars", not "bigs").'
      },
      {
        id: "adj_09",
        topicId: "adjectives",
        type: "mcq",
        question: "I bought this phone this morning. It is ______.",
        options: ["old", "slow", "new", "bad"],
        answer: 2,
        explanation: 'Something newly bought is "new".'
      },
      {
        id: "adj_10",
        topicId: "adjectives",
        type: "fill",
        question: "Ice cream is always _____ when fresh.",
        options: ["hot", "cold", "tall", "slow"],
        answer: 1,
        explanation: "Ice cream is cold."
      },
      {
        id: "adj_11",
        topicId: "adjectives",
        type: "choose_sentence",
        question: "Which sentence has the adjective in the predicate (after verb to be)?",
        options: ["The soup is hot.", "I like hot soup.", "Hot soup is ready.", "Eat the hot soup."],
        answer: 0,
        explanation: 'In "The soup is hot", "hot" comes after the verb "is".'
      },
      {
        id: "adj_12",
        topicId: "adjectives",
        type: "mcq",
        question: 'What is the opposite of "good"?',
        options: ["bad", "old", "fast", "small"],
        answer: 0,
        explanation: '"Bad" is the opposite of "good".'
      },
      {
        id: "adj_13",
        topicId: "adjectives",
        type: "picture",
        icon: "\u{1F418}",
        question: 'Look at the elephant: "The elephant is ______."',
        options: ["small", "big", "cold", "short"],
        answer: 1,
        explanation: "An elephant is a big animal."
      },
      {
        id: "adj_14",
        topicId: "adjectives",
        type: "mcq",
        question: "Which word is NOT an adjective?",
        options: ["beautiful", "tall", "run", "fast"],
        answer: 2,
        explanation: '"Run" is an action verb, not a describing adjective.'
      },
      {
        id: "adj_15",
        topicId: "adjectives",
        type: "choose_sentence",
        question: "Choose the correct sentence with two adjectives:",
        options: ["She has a big, beautiful garden.", "She has garden big beautiful.", "She a garden has big beautiful.", "Big garden she has beautiful."],
        answer: 0,
        explanation: 'Adjectives precede the noun: "a big, beautiful garden".'
      }
    ],
    genitive_s: [
      {
        id: "gen_01",
        topicId: "genitive_s",
        type: "mcq",
        question: "The book belongs to Sara. It is ______ book.",
        options: ["Sara's", "Saras", "Sara'", "of Sara"],
        answer: 0,
        explanation: "Add apostrophe + s (Sara's) to show singular possession."
      },
      {
        id: "gen_02",
        topicId: "genitive_s",
        type: "choose_sentence",
        question: "Choose the sentence with the correct Genitive 's:",
        options: ["Ali's father is a doctor.", "Alis father is a doctor.", "Ali father's is a doctor.", "Father of Ali is doctor."],
        answer: 0,
        explanation: `"Ali's father" correctly indicates the father of Ali.`
      },
      {
        id: "gen_03",
        topicId: "genitive_s",
        type: "fill",
        question: "This is _____ (Tom) new school bag.",
        options: ["Tom's", "Toms", "Tom", "Tom'"],
        answer: 0,
        explanation: `We write "Tom's" for the bag belonging to Tom.`
      },
      {
        id: "gen_04",
        topicId: "genitive_s",
        type: "mcq",
        question: `"The cat has a toy." How do we write this with Genitive 's?`,
        options: ["The cat's toy", "The cats toy", "The toy cat", "The toy's cat"],
        answer: 0,
        explanation: `The owner comes first with 's: "The cat's toy".`
      },
      {
        id: "gen_05",
        topicId: "genitive_s",
        type: "true_false",
        question: 'True or False: "Ahmeds laptop" is grammatically correct without an apostrophe.',
        options: ["False \u2014 Possession requires an apostrophe (Ahmed's)", "True \u2014 Apostrophe is optional in English"],
        answer: 0,
        explanation: "Possession always requires an apostrophe: Ahmed's laptop."
      },
      {
        id: "gen_06",
        topicId: "genitive_s",
        type: "choose_sentence",
        question: "Which of the following is INCORRECT?",
        options: ["This is John car.", "This is John's car.", "That is Maria's jacket.", "Where is Usman's desk?"],
        answer: 0,
        explanation: `"This is John car" is missing the Genitive 's.`
      },
      {
        id: "gen_07",
        topicId: "genitive_s",
        type: "mcq",
        question: 'Complete: "The teacher______ chair is in front of the class."',
        options: ["'s", "s'", "s", "is"],
        answer: 0,
        explanation: `Singular noun "teacher" takes "'s".`
      },
      {
        id: "gen_08",
        topicId: "genitive_s",
        type: "fill",
        question: "My _____ (sister) birthday is tomorrow.",
        options: ["sister's", "sisters", "sister", "sisters'"],
        answer: 0,
        explanation: "Singular possession: sister's birthday."
      },
      {
        id: "gen_09",
        topicId: "genitive_s",
        type: "picture",
        icon: "\u{1F697}",
        question: 'The car belongs to Mr. Bilal. We say: "It is ______ car."',
        options: ["Mr. Bilal's", "Mr. Bilals", "Car of Mr. Bilal", "Mr. Bilal is"],
        answer: 0,
        explanation: "Mr. Bilal's car indicates ownership."
      },
      {
        id: "gen_10",
        topicId: "genitive_s",
        type: "choose_sentence",
        question: "Choose the sentence with correct punctuation:",
        options: ["Zainab's house is near the park.", "Zainabs' house is near the park.", "Zainabs house is near the park.", "Zainab house's is near the park."],
        answer: 0,
        explanation: `"Zainab's" is the correct singular possessive form.`
      },
      {
        id: "gen_11",
        topicId: "genitive_s",
        type: "mcq",
        question: `What does "Sir Zubair's class" mean?`,
        options: ["The class taught by Sir Zubair", "Sir Zubair is a class", "Classes of all Zubairs", "Sir Zubair in class"],
        answer: 0,
        explanation: "Genitive 's indicates Sir Zubair's class."
      },
      {
        id: "gen_12",
        topicId: "genitive_s",
        type: "fill",
        question: "Is that _____ (David) jacket on the hanger?",
        options: ["David's", "Davids", "David", "of David's"],
        answer: 0,
        explanation: "David's jacket shows who owns the jacket."
      },
      {
        id: "gen_13",
        topicId: "genitive_s",
        type: "mcq",
        question: '"The phone of my mother" is more naturally said as:',
        options: ["My mother's phone", "My mothers phone", "The phone my mother", "Mother my phone"],
        answer: 0,
        explanation: `English speakers use "My mother's phone".`
      },
      {
        id: "gen_14",
        topicId: "genitive_s",
        type: "true_false",
        question: `True or False: We can use Genitive 's for pets and animals (e.g. "the dog's tail").`,
        options: ["True \u2014 Animals take 's just like people", "False \u2014 Only humans can take 's"],
        answer: 0,
        explanation: "Yes, animals take 's: the dog's tail, the lion's roar."
      },
      {
        id: "gen_15",
        topicId: "genitive_s",
        type: "choose_sentence",
        question: "Which question correctly asks about someone's father?",
        options: ["What is your father's job?", "What is your fathers job?", "What is your father job's?", "What is father your job?"],
        answer: 0,
        explanation: `"Your father's job" is the correct possessive form.`
      }
    ],
    question_words: [
      {
        id: "qw_01",
        topicId: "question_words",
        type: "mcq",
        question: '"______ is your English teacher?" (Asking about a person)',
        options: ["Who", "What", "Where", "When"],
        answer: 0,
        explanation: 'We use "Who" to ask about people.'
      },
      {
        id: "qw_02",
        topicId: "question_words",
        type: "mcq",
        question: '"______ is the library?" (Asking about location/place)',
        options: ["Where", "Who", "Why", "When"],
        answer: 0,
        explanation: 'We use "Where" to ask about places and locations.'
      },
      {
        id: "qw_03",
        topicId: "question_words",
        type: "mcq",
        question: '"______ does the class start?" (Asking about time)',
        options: ["When", "What", "Who", "Where"],
        answer: 0,
        explanation: 'We use "When" to ask about time.'
      },
      {
        id: "qw_04",
        topicId: "question_words",
        type: "choose_sentence",
        question: "Which question correctly asks for a reason?",
        options: ["Why are you late?", "Where are you late?", "What are you late?", "Who are you late?"],
        answer: 0,
        explanation: '"Why" asks for a reason or cause.'
      },
      {
        id: "qw_05",
        topicId: "question_words",
        type: "fill",
        question: '"_____ is your favorite color?"',
        options: ["What", "Who", "Where", "Why"],
        answer: 0,
        explanation: '"What" is used to ask for specific information about things.'
      },
      {
        id: "qw_06",
        topicId: "question_words",
        type: "mcq",
        question: '"______ are you feeling today?" (Asking about condition/health)',
        options: ["How", "What", "Who", "Where"],
        answer: 0,
        explanation: 'We use "How" to ask about state, health, or method.'
      },
      {
        id: "qw_07",
        topicId: "question_words",
        type: "true_false",
        question: 'True or False: "Where" is used to ask about the time of an event.',
        options: ['False \u2014 "When" is for time, "Where" is for place', 'True \u2014 "Where" can be used for both place and time'],
        answer: 0,
        explanation: '"When" asks about time, while "Where" asks about place.'
      },
      {
        id: "qw_08",
        topicId: "question_words",
        type: "choose_sentence",
        question: "Choose the correct question to find someone's name:",
        options: ["What is your name?", "Who is your name?", "Where is your name?", "Why is your name?"],
        answer: 0,
        explanation: '"What is your name?" is the standard question.'
      },
      {
        id: "qw_09",
        topicId: "question_words",
        type: "fill",
        question: '"_____ is that girl sitting next to Sara?"',
        options: ["Who", "What", "Where", "When"],
        answer: 0,
        explanation: '"Who" is used because the question is about a person (girl).'
      },
      {
        id: "qw_10",
        topicId: "question_words",
        type: "mcq",
        question: 'Match the answer: "At 9:00 AM." Which question was asked?',
        options: ["When does the academy open?", "Where is the academy?", "Who is at the academy?", "Why is the academy?"],
        answer: 0,
        explanation: 'A time answer ("At 9:00 AM") corresponds to a "When" question.'
      },
      {
        id: "qw_11",
        topicId: "question_words",
        type: "choose_sentence",
        question: "Choose the question with correct word order:",
        options: ["Where do you live?", "Where you do live?", "Where you live do?", "You live where do?"],
        answer: 0,
        explanation: "Formula: [Question Word + auxiliary verb + subject + main verb]."
      },
      {
        id: "qw_12",
        topicId: "question_words",
        type: "mcq",
        question: '"______ old are you?"',
        options: ["How", "What", "Where", "Who"],
        answer: 0,
        explanation: 'We say "How old are you?".'
      },
      {
        id: "qw_13",
        topicId: "question_words",
        type: "fill",
        question: '"_____ are my keys? I cannot find them in my bag."',
        options: ["Where", "When", "Who", "Why"],
        answer: 0,
        explanation: 'Asking for the location of the keys requires "Where".'
      },
      {
        id: "qw_14",
        topicId: "question_words",
        type: "picture",
        icon: "\u{1F3EB}",
        question: "To ask about the location of Home Academy, which question word do you use?",
        options: ["Where", "Who", "When", "Why"],
        answer: 0,
        explanation: 'Location questions begin with "Where".'
      },
      {
        id: "qw_15",
        topicId: "question_words",
        type: "true_false",
        question: 'True or False: "Why" questions are usually answered with "Because...".',
        options: ['True \u2014 "Because" provides the reason requested by "Why"', 'False \u2014 "Why" is never answered with "Because"'],
        answer: 0,
        explanation: '"Why" asks for a reason, so answers typically start with "Because".'
      }
    ],
    whose: [
      {
        id: "who_01",
        topicId: "whose",
        type: "mcq",
        question: '"______ pen is this on my desk?"',
        options: ["Whose", "Who", "Who's", "Where"],
        answer: 0,
        explanation: '"Whose" asks about ownership or possession of an item.'
      },
      {
        id: "who_02",
        topicId: "whose",
        type: "choose_sentence",
        question: "Which question correctly asks about ownership of a car?",
        options: ["Whose car is this?", "Who car is this?", "Whos car is this?", "Whose is car this?"],
        answer: 0,
        explanation: "Formula: [Whose + noun + is this / that?]."
      },
      {
        id: "who_03",
        topicId: "whose",
        type: "mcq",
        question: '"Whose bag is this?" \u2014 "It is ______."',
        options: ["Tom's", "Tom", "to Tom", "of Tom"],
        answer: 0,
        explanation: `Answer a "Whose" question with the possessive: "It is Tom's."`
      },
      {
        id: "who_04",
        topicId: "whose",
        type: "true_false",
        question: `True or False: "Who's" (short for who is) is the same as "Whose" (asking about possession).`,
        options: [`False \u2014 "Who's" means "Who is", while "Whose" means ownership`, "True \u2014 They mean the exact same thing"],
        answer: 0,
        explanation: `"Who's" = Who is. "Whose" = belonging to whom.`
      },
      {
        id: "who_05",
        topicId: "whose",
        type: "fill",
        question: '"_____ shoes are these near the door?"',
        options: ["Whose", "Who", "Who's", "Which"],
        answer: 0,
        explanation: 'We use "Whose" with plural items too: "Whose shoes are these?".'
      },
      {
        id: "who_06",
        topicId: "whose",
        type: "choose_sentence",
        question: "Choose the correct plural question for books:",
        options: ["Whose books are these?", "Whose books is these?", "Whose book are these?", "Who books are these?"],
        answer: 0,
        explanation: 'Plural noun takes "are these": "Whose books are these?".'
      },
      {
        id: "who_07",
        topicId: "whose",
        type: "mcq",
        question: '"Whose jacket is that?" \u2014 "It is ______."',
        options: ["mine (or Ali's)", "me", "I", "to me"],
        answer: 0,
        explanation: "We answer with a possessive noun or pronoun (mine, Ali's, his)."
      },
      {
        id: "who_08",
        topicId: "whose",
        type: "fill",
        question: '"Whose cat is outside?" \u2014 "It is _____ (Sara)."',
        options: ["Sara's", "Sara", "to Sara", "of Sara"],
        answer: 0,
        explanation: `We say: "It is Sara's."`
      },
      {
        id: "who_09",
        topicId: "whose",
        type: "choose_sentence",
        question: `Which sentence correctly uses "Who's" vs "Whose"?`,
        options: ["Who's calling, and whose phone is that?", "Whose calling, and who's phone is that?", "Whose is calling and whose phone?", "Who's phone is that on desk?"],
        answer: 0,
        explanation: `"Who's calling" (who is) + "whose phone" (possession).`
      },
      {
        id: "who_10",
        topicId: "whose",
        type: "picture",
        icon: "\u{1F392}",
        question: 'You find a red backpack in the classroom. You ask: "______ is this?"',
        options: ["Whose backpack", "Who backpack", "Where backpack", "What backpack"],
        answer: 0,
        explanation: '"Whose backpack is this?" asks who owns it.'
      },
      {
        id: "who_11",
        topicId: "whose",
        type: "mcq",
        question: '"Whose glasses are those?" \u2014 "They are ______."',
        options: ["grandfather's", "grandfather", "to grandfather", "of grandfather"],
        answer: 0,
        explanation: `"They are grandfather's."`
      },
      {
        id: "who_12",
        topicId: "whose",
        type: "true_false",
        question: `True or False: When answering "Whose...?", we can omit the noun if it is already understood (e.g. "It is Ahmed's").`,
        options: [`True \u2014 We can say "It is Ahmed's" without repeating the item`, "False \u2014 We must always repeat the noun"],
        answer: 0,
        explanation: `Yes! "Whose book is this?" -> "It's Ahmed's."`
      },
      {
        id: "who_13",
        topicId: "whose",
        type: "fill",
        question: '"_____ turn is it to speak in English?"',
        options: ["Whose", "Who", "Who's", "Where"],
        answer: 0,
        explanation: '"Whose turn is it?" is the correct idiom for asking whose turn it is.'
      },
      {
        id: "who_14",
        topicId: "whose",
        type: "choose_sentence",
        question: "Choose the correct question about a laptop:",
        options: ["Whose laptop is on the table?", "Who laptop is on table?", "Whose is laptop on table?", "Whom laptop is table on?"],
        answer: 0,
        explanation: '"Whose laptop is on the table?" is grammatically sound.'
      },
      {
        id: "who_15",
        topicId: "whose",
        type: "mcq",
        question: '"Whose pencils are these?" \u2014 "They are ______."',
        options: ["the students'", "student", "the students", "to students"],
        answer: 0,
        explanation: `Plural possessive: "the students'" (belonging to students).`
      }
    ],
    possessive_adjectives: [
      {
        id: "pa_01",
        topicId: "possessive_adjectives",
        type: "mcq",
        question: "I have a car. ______ car is red.",
        options: ["My", "His", "Her", "Their"],
        answer: 0,
        explanation: 'The possessive adjective for "I" is "My".'
      },
      {
        id: "pa_02",
        topicId: "possessive_adjectives",
        type: "mcq",
        question: "She has a new dress. ______ dress is blue.",
        options: ["Her", "His", "Its", "Our"],
        answer: 0,
        explanation: 'The possessive adjective for "She" is "Her".'
      },
      {
        id: "pa_03",
        topicId: "possessive_adjectives",
        type: "mcq",
        question: "He is doing ______ homework right now.",
        options: ["his", "her", "its", "their"],
        answer: 0,
        explanation: 'The possessive adjective for "He" is "his".'
      },
      {
        id: "pa_04",
        topicId: "possessive_adjectives",
        type: "choose_sentence",
        question: 'Choose the correct sentence for "We":',
        options: ["We love our classroom.", "We love their classroom.", "We love your classroom.", "We love its classroom."],
        answer: 0,
        explanation: '"We" matches with possessive adjective "our".'
      },
      {
        id: "pa_05",
        topicId: "possessive_adjectives",
        type: "fill",
        question: "They are washing _____ (they) car.",
        options: ["their", "there", "our", "his"],
        answer: 0,
        explanation: '"Their" is the possessive adjective for "they".'
      },
      {
        id: "pa_06",
        topicId: "possessive_adjectives",
        type: "true_false",
        question: 'True or False: "Its" (possessive, e.g. "The cat licked its paw") does NOT have an apostrophe.',
        options: [`True \u2014 Possessive "its" has NO apostrophe ("it's" = it is)`, 'False \u2014 Possessive "its" must have an apostrophe'],
        answer: 0,
        explanation: `"Its" = possessive. "It's" = contraction of "it is".`
      },
      {
        id: "pa_07",
        topicId: "possessive_adjectives",
        type: "mcq",
        question: "You must bring ______ notebook tomorrow.",
        options: ["your", "you", "you're", "our"],
        answer: 0,
        explanation: 'The possessive adjective for "You" is "your".'
      },
      {
        id: "pa_08",
        topicId: "possessive_adjectives",
        type: "fill",
        question: "Ahmed loves _____ (he) pet cat.",
        options: ["his", "her", "its", "my"],
        answer: 0,
        explanation: 'Ahmed is male ("He"), so the possessive adjective is "his".'
      },
      {
        id: "pa_09",
        topicId: "possessive_adjectives",
        type: "choose_sentence",
        question: "Which sentence has a possessive adjective mismatch?",
        options: ["Sara washed his hair.", "Sara washed her hair.", "Ali washed his hands.", "We cleaned our room."],
        answer: 0,
        explanation: 'Sara is female, so washing her own hair would be "her hair".'
      },
      {
        id: "pa_10",
        topicId: "possessive_adjectives",
        type: "picture",
        icon: "\u{1F415}",
        question: "The puppy wagged ______ tail happily.",
        options: ["its", "it's", "his", "her"],
        answer: 0,
        explanation: 'We use possessive "its" for animals when gender is unspecified.'
      },
      {
        id: "pa_11",
        topicId: "possessive_adjectives",
        type: "mcq",
        question: '"We live in Lahore. ______ house is near the river."',
        options: ["Our", "Their", "Your", "His"],
        answer: 0,
        explanation: 'Subject "We" takes possessive adjective "Our".'
      },
      {
        id: "pa_12",
        topicId: "possessive_adjectives",
        type: "fill",
        question: "The students put _____ (they) backpacks in the locker.",
        options: ["their", "there", "our", "them"],
        answer: 0,
        explanation: 'Students = "they", so possessive is "their".'
      },
      {
        id: "pa_13",
        topicId: "possessive_adjectives",
        type: "choose_sentence",
        question: "Choose the correct greeting sentence:",
        options: ["What is your name?", "What is you name?", "What is you're name?", "What is yours name?"],
        answer: 0,
        explanation: '"Your" is the possessive adjective modifying "name".'
      },
      {
        id: "pa_14",
        topicId: "possessive_adjectives",
        type: "true_false",
        question: "True or False: Possessive adjectives (my, your, his, her, its, our, their) must always be followed by a noun.",
        options: ['True \u2014 They always modify a noun (e.g. "my book")', "False \u2014 They can stand alone without a noun"],
        answer: 0,
        explanation: "Possessive adjectives must accompany a noun (my car, her pen)."
      },
      {
        id: "pa_15",
        topicId: "possessive_adjectives",
        type: "mcq",
        question: "Maria is talking to ______ brother on the phone.",
        options: ["her", "his", "its", "their"],
        answer: 0,
        explanation: 'Maria is female, so we use "her brother".'
      }
    ],
    what_color_genitive_s: [
      {
        id: "wc_01",
        topicId: "what_color_genitive_s",
        type: "mcq",
        question: `"What color is Ali's car?" \u2014 "______ is white."`,
        options: ["It", "They", "He", "She"],
        answer: 0,
        explanation: 'A singular object (car) takes the pronoun "It": "It is white."'
      },
      {
        id: "wc_02",
        topicId: "what_color_genitive_s",
        type: "choose_sentence",
        question: "Which question correctly asks for the color of Sara's shoes?",
        options: ["What color are Sara's shoes?", "What color is Sara's shoes?", "What color Sara's shoes are?", "What are color Sara's shoes?"],
        answer: 0,
        explanation: 'Plural noun ("shoes") takes the plural verb "are".'
      },
      {
        id: "wc_03",
        topicId: "what_color_genitive_s",
        type: "fill",
        question: `"What color _____ (is/are) Tom's new bicycle?"`,
        options: ["is", "are", "am", "be"],
        answer: 0,
        explanation: '"Bicycle" is singular, so we use "is".'
      },
      {
        id: "wc_04",
        topicId: "what_color_genitive_s",
        type: "mcq",
        question: `"What color are the teacher's pens?" \u2014 "______ are blue and red."`,
        options: ["They", "It", "He", "There"],
        answer: 0,
        explanation: 'Plural objects (pens) are referred to with "They": "They are...".'
      },
      {
        id: "wc_05",
        topicId: "what_color_genitive_s",
        type: "true_false",
        question: `True or False: We say "What color is Ahmed's eyes?" for plural eyes.`,
        options: [`False \u2014 Eyes are plural, so we must say "What color are Ahmed's eyes?"`, 'True \u2014 "is" can be used for plural eyes'],
        answer: 0,
        explanation: `Plural nouns always use "are": "What color are Ahmed's eyes?".`
      },
      {
        id: "wc_06",
        topicId: "what_color_genitive_s",
        type: "choose_sentence",
        question: `Choose the correct answer to: "What color is Maryam's hijab?"`,
        options: ["It is green.", "They are green.", "She is green.", "Green is."],
        answer: 0,
        explanation: '"It is green" correctly answers for singular hijab.'
      },
      {
        id: "wc_07",
        topicId: "what_color_genitive_s",
        type: "fill",
        question: '"What color are _____ (Usman) notebooks?"',
        options: ["Usman's", "Usmans", "Usman", "of Usman"],
        answer: 0,
        explanation: `Genitive 's: "What color are Usman's notebooks?".`
      },
      {
        id: "wc_08",
        topicId: "what_color_genitive_s",
        type: "picture",
        icon: "\u{1F392}",
        question: `Looking at the blue bag: "What color is Hamza's bag?"`,
        options: ["It is blue.", "They are blue.", "He is blue.", "Blue bag."],
        answer: 0,
        explanation: '"It is blue" matches the singular bag.'
      },
      {
        id: "wc_09",
        topicId: "what_color_genitive_s",
        type: "choose_sentence",
        question: `Which question correctly combines "What color" and Genitive 's?`,
        options: ["What color is your father's jacket?", "What color your father's jacket is?", "What is color your father jacket?", "Color what is your father's jacket?"],
        answer: 0,
        explanation: "Formula: [What color + is/are + Owner's + Item?]."
      },
      {
        id: "wc_10",
        topicId: "what_color_genitive_s",
        type: "mcq",
        question: `"What color is the doctor's coat?" \u2014 "It is ______."`,
        options: ["white", "fast", "tall", "slow"],
        answer: 0,
        explanation: '"White" is a color word.'
      },
      {
        id: "wc_11",
        topicId: "what_color_genitive_s",
        type: "fill",
        question: `"What color _____ your sister's cats?"`,
        options: ["are", "is", "am", "was"],
        answer: 0,
        explanation: 'Plural "cats" requires "are".'
      },
      {
        id: "wc_12",
        topicId: "what_color_genitive_s",
        type: "true_false",
        question: `True or False: "What color is John's hair?" uses "is" because hair is an uncountable noun.`,
        options: ['True \u2014 Hair is uncountable in this context, so we use "is"', 'False \u2014 Hair is always plural and takes "are"'],
        answer: 0,
        explanation: `"Hair" is treated as singular uncountable: "What color is John's hair?".`
      },
      {
        id: "wc_13",
        topicId: "what_color_genitive_s",
        type: "choose_sentence",
        question: "Choose the correct answer for plural socks:",
        options: ["They are black and grey.", "It is black and grey.", "Socks is black.", "Black are socks."],
        answer: 0,
        explanation: 'Plural items take "They are...".'
      },
      {
        id: "wc_14",
        topicId: "what_color_genitive_s",
        type: "mcq",
        question: 'Complete the question: "What color is ______ notebook?"',
        options: ["Sara's", "Saras", "Sara", "to Sara"],
        answer: 0,
        explanation: "Genitive 's indicates Sara's notebook."
      },
      {
        id: "wc_15",
        topicId: "what_color_genitive_s",
        type: "choose_sentence",
        question: "Which question is punctuated and spelled completely correctly?",
        options: ["What color is Sir Zubair's whiteboard marker?", "What color Sir Zubair's whiteboard marker is?", "What color is Sir Zubairs whiteboard marker?", "Color what is Sir Zubair's marker?"],
        answer: 0,
        explanation: `"What color is Sir Zubair's whiteboard marker?" is completely accurate.`
      }
    ],
    could_requests: [
      {
        id: "cr_01",
        topicId: "could_requests",
        type: "choose_sentence",
        question: "Which sentence is a correct polite request?",
        options: ["Could you please open the door?", "Could you opening the door?", "Could you opened the door?", "Could you opens the door?"],
        answer: 0,
        explanation: 'We always use "Could you" + base verb ("open").'
      },
      {
        id: "cr_02",
        topicId: "could_requests",
        type: "fill",
        question: "Could you please _____ (close) the window?",
        options: ["close", "closed", "closing", "closes"],
        answer: 0,
        explanation: 'After "Could you please", always use the base form "close".'
      },
      {
        id: "cr_03",
        topicId: "could_requests",
        type: "mcq",
        question: "You want someone to hand you a pen. How do you ask politely?",
        options: ["Could you please pass the pen?", "Could you passing the pen?", "You give pen now.", "Could you passed the pen?"],
        answer: 0,
        explanation: '"Could you please pass the pen?" is respectful and grammatically correct.'
      },
      {
        id: "cr_04",
        topicId: "could_requests",
        type: "choose_sentence",
        question: "Choose the correct request to ask someone to speak more slowly:",
        options: ["Could you please speak slowly?", "Could you speaking slowly?", "Could you spoke slowly?", "Could you speaks slowly?"],
        answer: 0,
        explanation: '"Speak" is the base verb form.'
      },
      {
        id: "cr_05",
        topicId: "could_requests",
        type: "true_false",
        question: 'True or False: We can say "Could you pass the phone, please?" with "please" at the end.',
        options: ['True \u2014 "Please" can naturally be placed at the beginning or at the end', 'False \u2014 "Please" is only allowed at the very start of a sentence'],
        answer: 0,
        explanation: 'Both "Could you please pass..." and "Could you pass..., please?" are polite and correct.'
      },
      {
        id: "cr_06",
        topicId: "could_requests",
        type: "mcq",
        question: 'Complete: "Could you please ______ me some water?"',
        options: ["bring", "brought", "bringing", "brings"],
        answer: 0,
        explanation: 'Base form of the verb is "bring".'
      },
      {
        id: "cr_07",
        topicId: "could_requests",
        type: "fill",
        question: "Could you please _____ (help) me with this exercise?",
        options: ["help", "helped", "helping", "helps"],
        answer: 0,
        explanation: 'Use the base verb "help" after "Could you please".'
      },
      {
        id: "cr_08",
        topicId: "could_requests",
        type: "choose_sentence",
        question: "You did not understand what the teacher said. What is the polite request?",
        options: ["Could you please repeat that?", "Could you repeating that?", "Could you repeated that?", "What you said repeat."],
        answer: 0,
        explanation: '"Could you please repeat that?" uses base verb "repeat".'
      },
      {
        id: "cr_09",
        topicId: "could_requests",
        type: "mcq",
        question: "It is dark in the classroom. What do you politely say?",
        options: ["Could you please turn on the light?", "Could you turned on the light?", "Could you turning on the light?", "Could you turns on the light?"],
        answer: 0,
        explanation: 'Base form "turn on" is correct.'
      },
      {
        id: "cr_10",
        topicId: "could_requests",
        type: "true_false",
        question: 'True or False: In "Could you please helping me?", the verb form "helping" is correct.',
        options: ['False \u2014 We must use base verb "help", not the "-ing" form', 'True \u2014 "-ing" verbs are always used with could'],
        answer: 0,
        explanation: 'Always use base verb: "Could you please help me?".'
      },
      {
        id: "cr_11",
        topicId: "could_requests",
        type: "fill",
        question: "Could you please _____ (give) me your notebook for a minute?",
        options: ["give", "gave", "giving", "given"],
        answer: 0,
        explanation: '"Give" is the base verb form.'
      },
      {
        id: "cr_12",
        topicId: "could_requests",
        type: "choose_sentence",
        question: "Choose the correct request to ask someone to wait:",
        options: ["Could you please wait for a moment?", "Could you waiting for a moment?", "Could you waited for a moment?", "Could you to wait for a moment?"],
        answer: 0,
        explanation: '"Wait" is the base verb without "to" or "-ing".'
      },
      {
        id: "cr_13",
        topicId: "could_requests",
        type: "mcq",
        question: "Which of the following is the most polite way to ask for a favor?",
        options: ["Could you please explain this rule?", "Explain this rule to me.", "You must explain this rule.", "Explain this rule now."],
        answer: 0,
        explanation: '"Could you please..." is polite and respectful.'
      },
      {
        id: "cr_14",
        topicId: "could_requests",
        type: "fill",
        question: "Could you please _____ (turn off) the fan? It is cold.",
        options: ["turn off", "turned off", "turning off", "turns off"],
        answer: 0,
        explanation: '"Turn off" is the base phrasal verb.'
      },
      {
        id: "cr_15",
        topicId: "could_requests",
        type: "choose_sentence",
        question: 'Which formula accurately represents a polite request with "Could"?',
        options: ["Could you + base verb + ...?", "Could you + verb-ing + ...?", "Could you + past verb + ...?", "Could you + to + verb + ...?"],
        answer: 0,
        explanation: "The formula is [Could you + base verb + ...?]."
      }
    ],
    how_much_price: [
      {
        id: "hm_01",
        topicId: "how_much_price",
        type: "choose_sentence",
        question: "Choose the correct question to ask the price of ONE bag:",
        options: ["How much is this bag?", "How much are this bag?", "How much is these bag?", "How much are this bags?"],
        answer: 0,
        explanation: '"This bag" is singular (1 item), so we use "How much is".'
      },
      {
        id: "hm_02",
        topicId: "how_much_price",
        type: "choose_sentence",
        question: "Choose the correct question to ask the price of MULTIPLE shoes:",
        options: ["How much are these shoes?", "How much is these shoes?", "How much are this shoes?", "How much is those shoes?"],
        answer: 0,
        explanation: '"Shoes" is plural (2+ items), so we use "How much are".'
      },
      {
        id: "hm_03",
        topicId: "how_much_price",
        type: "fill",
        question: "How much _____ that smartphone on the table?",
        options: ["is", "are", "am", "be"],
        answer: 0,
        explanation: '"That smartphone" is singular, so we use "is".'
      },
      {
        id: "hm_04",
        topicId: "how_much_price",
        type: "fill",
        question: "How much _____ these books in the bookstore?",
        options: ["are", "is", "am", "be"],
        answer: 0,
        explanation: '"These books" are plural, so we use "are".'
      },
      {
        id: "hm_05",
        topicId: "how_much_price",
        type: "mcq",
        question: "You want to know the price of ONE jacket. What do you say?",
        options: ["How much is that jacket?", "How much are that jacket?", "How much is those jackets?", "How much are this jacket?"],
        answer: 0,
        explanation: 'Singular jacket requires "is".'
      },
      {
        id: "hm_06",
        topicId: "how_much_price",
        type: "true_false",
        question: 'True or False: We ask "How much are this phone?" for a single phone.',
        options: ['False \u2014 A single phone is singular, so we must say "How much is this phone?"', 'True \u2014 "are" can be used for any phone'],
        answer: 0,
        explanation: 'Use "is" for one phone: "How much is this phone?".'
      },
      {
        id: "hm_07",
        topicId: "how_much_price",
        type: "choose_sentence",
        question: "Which question correctly asks the price of glasses (plural item)?",
        options: ["How much are these glasses?", "How much is these glasses?", "How much is this glasses?", "How much are that glasses?"],
        answer: 0,
        explanation: '"Glasses" is always grammatically plural and takes "are".'
      },
      {
        id: "hm_08",
        topicId: "how_much_price",
        type: "fill",
        question: "How much _____ the ticket to Karachi?",
        options: ["is", "are", "am", "be"],
        answer: 0,
        explanation: '"The ticket" is singular, so use "is".'
      },
      {
        id: "hm_09",
        topicId: "how_much_price",
        type: "mcq",
        question: 'Complete: "Look at those watches! How much ______?"',
        options: ["are they", "is it", "is they", "are it"],
        answer: 0,
        explanation: '"Watches" is plural, so we use "are they".'
      },
      {
        id: "hm_10",
        topicId: "how_much_price",
        type: "true_false",
        question: 'True or False: We use "How much is" for singular items and "How much are" for plural items.',
        options: ['True \u2014 "is" is for singular (1 item) and "are" is for plural (2+ items)', 'False \u2014 "How much" is only ever followed by "are"'],
        answer: 0,
        explanation: 'Exactly right! "is" for singular, "are" for plural.'
      },
      {
        id: "hm_11",
        topicId: "how_much_price",
        type: "choose_sentence",
        question: "You hold up ONE pen. Which question is correct?",
        options: ["How much is this pen?", "How much are this pen?", "How much is these pens?", "How much are this pens?"],
        answer: 0,
        explanation: '"This pen" is singular, requiring "is".'
      },
      {
        id: "hm_12",
        topicId: "how_much_price",
        type: "fill",
        question: "How much _____ those blue shirts on the rack?",
        options: ["are", "is", "am", "be"],
        answer: 0,
        explanation: '"Those blue shirts" is plural, so use "are".'
      },
      {
        id: "hm_13",
        topicId: "how_much_price",
        type: "mcq",
        question: 'A customer points to a laptop: "How much ______ it?"',
        options: ["is", "are", "were", "am"],
        answer: 0,
        explanation: '"It" is singular, so "How much is it?".'
      },
      {
        id: "hm_14",
        topicId: "how_much_price",
        type: "choose_sentence",
        question: "Which question correctly asks the price of multiple bags?",
        options: ["How much are those bags?", "How much is those bags?", "How much are that bags?", "How much is that bag? (This is singular)"],
        answer: 0,
        explanation: '"Those bags" is plural, so use "How much are those bags?".'
      },
      {
        id: "hm_15",
        topicId: "how_much_price",
        type: "fill",
        question: '"How much is this chair?" \u2014 "It _____ 50 dollars."',
        options: ["is", "are", "have", "were"],
        answer: 0,
        explanation: 'Singular chair: "It is 50 dollars".'
      }
    ]
  };
  var TOPIC_ACTIVITIES = {
    adjectives: {
      title: "Adjectives Activities",
      icon: "\u{1F3A8}",
      color: "#2563eb",
      matching: [
        { left: "big", right: "small", category: "Opposites" },
        { left: "hot", right: "cold", category: "Opposites" },
        { left: "fast", right: "slow", category: "Opposites" },
        { left: "old", right: "new", category: "Opposites" },
        { left: "tall", right: "short", category: "Opposites" },
        { left: "good", right: "bad", category: "Opposites" }
      ],
      scrambles: [
        { words: ["The", "red", "car", "is", "very", "fast"], answer: "The red car is very fast." },
        { words: ["Sara", "lives", "in", "a", "beautiful", "house"], answer: "Sara lives in a beautiful house." },
        { words: ["Winter", "is", "a", "cold", "season"], answer: "Winter is a cold season." },
        { words: ["Ali", "bought", "a", "new", "laptop"], answer: "Ali bought a new laptop." }
      ],
      trueFalse: [
        { statement: 'In English, adjectives usually go before the noun (e.g. "a red car").', isTrue: true, explanation: "Correct! English places adjectives before nouns." },
        { statement: 'We add an "s" to an adjective when describing two objects ("two bigs houses").', isTrue: false, explanation: 'False! English adjectives never take an "s" for plural nouns.' },
        { statement: 'Adjectives can come after the verb "to be" (e.g. "The tea is hot").', isTrue: true, explanation: "Correct! Predicate adjectives follow is/am/are." }
      ],
      sentenceBuilder: [
        { prompt: "Build sentence describing a big building:", chips: ["This", "is", "a", "big", "building", "."], correct: "This is a big building ." },
        { prompt: "Build sentence with adjective after verb:", chips: ["The", "soup", "is", "very", "hot", "."], correct: "The soup is very hot ." }
      ]
    },
    genitive_s: {
      title: "Genitive 's Activities",
      icon: "\u{1F3F7}\uFE0F",
      color: "#dc2626",
      matching: [
        { left: "Ali", right: "Ali's car", category: "Owner -> Possession" },
        { left: "Sara", right: "Sara's book", category: "Owner -> Possession" },
        { left: "Teacher", right: "Teacher's desk", category: "Owner -> Possession" },
        { left: "Cat", right: "Cat's toy", category: "Owner -> Possession" },
        { left: "Doctor", right: "Doctor's coat", category: "Owner -> Possession" },
        { left: "Brother", right: "Brother's bike", category: "Owner -> Possession" }
      ],
      scrambles: [
        { words: ["This", "is", "Tom's", "school", "bag"], answer: "This is Tom's school bag." },
        { words: ["Ali's", "father", "is", "a", "doctor"], answer: "Ali's father is a doctor." },
        { words: ["Sara's", "cat", "is", "very", "playful"], answer: "Sara's cat is very playful." },
        { words: ["Where", "is", "Ahmed's", "blue", "bicycle"], answer: "Where is Ahmed's blue bicycle?" }
      ],
      trueFalse: [
        { statement: "The Genitive 's is used to show ownership and personal relationships.", isTrue: true, explanation: "Correct! Tom's bag means the bag of Tom." },
        { statement: "We write 'Saras book' without an apostrophe to show possession.", isTrue: false, explanation: "False! An apostrophe is mandatory: Sara's book." },
        { statement: "Animals can also take Genitive 's (e.g. the dog's tail).", isTrue: true, explanation: "Correct! Living beings including pets take 's." }
      ],
      sentenceBuilder: [
        { prompt: "Assemble ownership sentence:", chips: ["That", "is", "Hamza's", "new", "laptop", "."], correct: "That is Hamza's new laptop ." },
        { prompt: "Build sentence about teacher desk:", chips: ["The", "teacher's", "pen", "is", "on", "desk", "."], correct: "The teacher's pen is on desk ." }
      ]
    },
    question_words: {
      title: "Question Words Activities",
      icon: "\u2753",
      color: "#7c3aed",
      matching: [
        { left: "Who", right: "Person (Ali, Teacher)", category: "Question Word -> Target" },
        { left: "Where", right: "Place (Lahore, School)", category: "Question Word -> Target" },
        { left: "When", right: "Time (9:00 AM, Sunday)", category: "Question Word -> Target" },
        { left: "Why", right: "Reason (Because it is hot)", category: "Question Word -> Target" },
        { left: "What", right: "Thing / Information", category: "Question Word -> Target" },
        { left: "How", right: "Manner / Condition", category: "Question Word -> Target" }
      ],
      scrambles: [
        { words: ["Where", "do", "you", "live", "now"], answer: "Where do you live now?" },
        { words: ["What", "is", "your", "favorite", "subject"], answer: "What is your favorite subject?" },
        { words: ["Who", "is", "your", "class", "teacher"], answer: "Who is your class teacher?" },
        { words: ["When", "does", "the", "class", "start"], answer: "When does the class start?" }
      ],
      trueFalse: [
        { statement: '"Where" asks about location or place.', isTrue: true, explanation: "Correct! Where is used for places." },
        { statement: '"Who" is used to ask about an object like a chair.', isTrue: false, explanation: 'False! "What" is for objects; "Who" is for people.' },
        { statement: '"Why" questions are answered by explaining a reason (often with "Because").', isTrue: true, explanation: "Correct! Why asks for a reason." }
      ],
      sentenceBuilder: [
        { prompt: "Form question asking about teacher:", chips: ["Who", "is", "our", "English", "teacher", "?"], correct: "Who is our English teacher ?" },
        { prompt: "Form question asking about time:", chips: ["When", "does", "the", "lesson", "begin", "?"], correct: "When does the lesson begin ?" }
      ]
    },
    whose: {
      title: "Whose Activities",
      icon: "\u{1F45C}",
      color: "#059669",
      matching: [
        { left: "Whose pen?", right: "It's Ali's", category: "Question -> Answer" },
        { left: "Whose books?", right: "They're Sara's", category: "Question -> Answer" },
        { left: "Whose jacket?", right: "It's mine", category: "Question -> Answer" },
        { left: "Whose car?", right: "It's my father's", category: "Question -> Answer" },
        { left: "Whose shoes?", right: "They're Tom's", category: "Question -> Answer" }
      ],
      scrambles: [
        { words: ["Whose", "bag", "is", "this", "here"], answer: "Whose bag is this here?" },
        { words: ["Whose", "shoes", "are", "these", "outside"], answer: "Whose shoes are these outside?" },
        { words: ["It", "is", "Tom's", "blue", "notebook"], answer: "It is Tom's blue notebook." },
        { words: ["They", "are", "Sara's", "reading", "glasses"], answer: "They are Sara's reading glasses." }
      ],
      trueFalse: [
        { statement: '"Whose" is used to ask about who owns or possesses an object.', isTrue: true, explanation: "Correct! Whose asks for ownership." },
        { statement: `"Who's" with an apostrophe means the same as "Whose".`, isTrue: false, explanation: "False! Who's = Who is. Whose = ownership." },
        { statement: `When answering "Whose...?", we say "It is Tom's" or "They are Tom's".`, isTrue: true, explanation: "Correct! We use singular or plural possessive response." }
      ],
      sentenceBuilder: [
        { prompt: "Ask about ownership of phone:", chips: ["Whose", "phone", "is", "this", "on", "desk", "?"], correct: "Whose phone is this on desk ?" },
        { prompt: "Answer with possession:", chips: ["It", "is", "Ahmed's", "mobile", "phone", "."], correct: "It is Ahmed's mobile phone ." }
      ]
    },
    possessive_adjectives: {
      title: "Possessive Adjectives Activities",
      icon: "\u{1F465}",
      color: "#d97706",
      matching: [
        { left: "I", right: "my", category: "Pronoun -> Possessive" },
        { left: "You", right: "your", category: "Pronoun -> Possessive" },
        { left: "He", right: "his", category: "Pronoun -> Possessive" },
        { left: "She", right: "her", category: "Pronoun -> Possessive" },
        { left: "It", right: "its", category: "Pronoun -> Possessive" },
        { left: "We", right: "our", category: "Pronoun -> Possessive" },
        { left: "They", right: "their", category: "Pronoun -> Possessive" }
      ],
      scrambles: [
        { words: ["She", "loves", "her", "new", "school"], answer: "She loves her new school." },
        { words: ["We", "clean", "our", "classroom", "daily"], answer: "We clean our classroom daily." },
        { words: ["Ahmed", "drives", "his", "red", "car"], answer: "Ahmed drives his red car." },
        { words: ["They", "lost", "their", "football", "yesterday"], answer: "They lost their football yesterday." }
      ],
      trueFalse: [
        { statement: 'The possessive adjective for "He" is "his".', isTrue: true, explanation: "Correct! He -> his." },
        { statement: `"Its" showing possession should have an apostrophe ("it's").`, isTrue: false, explanation: `False! Possessive "its" has NO apostrophe. "It's" means "it is".` },
        { statement: 'Possessive adjectives must be followed by a noun (e.g. "our classroom").', isTrue: true, explanation: "Correct! They always modify a noun." }
      ],
      sentenceBuilder: [
        { prompt: 'Build sentence with "our":', chips: ["We", "respect", "our", "English", "teacher", "."], correct: "We respect our English teacher ." },
        { prompt: 'Build sentence with "her":', chips: ["Sara", "finished", "her", "homework", "early", "."], correct: "Sara finished her homework early ." }
      ]
    },
    what_color_genitive_s: {
      title: "What Color + Genitive 's Activities",
      icon: "\u{1F3A8}",
      color: "#0284c7",
      matching: [
        { left: "Car (singular)", right: "It is red", category: "Object -> Answer" },
        { left: "Shoes (plural)", right: "They are black", category: "Object -> Answer" },
        { left: "Bicycle (singular)", right: "It is blue", category: "Object -> Answer" },
        { left: "Eyes (plural)", right: "They are brown", category: "Object -> Answer" },
        { left: "Jacket (singular)", right: "It is green", category: "Object -> Answer" }
      ],
      scrambles: [
        { words: ["What", "color", "is", "Ali's", "jacket"], answer: "What color is Ali's jacket?" },
        { words: ["What", "color", "are", "Sara's", "shoes"], answer: "What color are Sara's shoes?" },
        { words: ["It", "is", "a", "bright", "yellow", "bag"], answer: "It is a bright yellow bag." },
        { words: ["They", "are", "black", "and", "white", "shoes"], answer: "They are black and white shoes." }
      ],
      trueFalse: [
        { statement: `For a singular item, we ask: "What color is [Name]'s [item]?"`, isTrue: true, explanation: 'Correct! Singular items take "is".' },
        { statement: `For plural items like shoes, we say "What color is Sara's shoes?".`, isTrue: false, explanation: `False! Shoes are plural, so we must use "are": "What color are Sara's shoes?".` },
        { statement: 'We answer a singular color question with "It is [color]".', isTrue: true, explanation: 'Correct! "It is white" for singular.' }
      ],
      sentenceBuilder: [
        { prompt: "Ask color of Ali's car:", chips: ["What", "color", "is", "Ali's", "car", "?"], correct: "What color is Ali's car ?" },
        { prompt: "Ask color of Sara's pens:", chips: ["What", "color", "are", "Sara's", "pens", "?"], correct: "What color are Sara's pens ?" }
      ]
    },
    could_requests: {
      title: "Could Polite Requests Activities",
      icon: "\u{1F91D}",
      color: "#7c3aed",
      matching: [
        { left: "open", right: "the door, please", category: "Action" },
        { left: "close", right: "the window, please", category: "Action" },
        { left: "pass", right: "the phone, please", category: "Favor" },
        { left: "bring", right: "me some water, please", category: "Favor" },
        { left: "speak", right: "slowly, please", category: "Speech" },
        { left: "repeat", right: "that, please", category: "Speech" }
      ],
      scrambles: [
        { words: ["Could", "you", "please", "open", "the", "door"], answer: "Could you please open the door?" },
        { words: ["Could", "you", "pass", "the", "phone", "please"], answer: "Could you pass the phone, please?" },
        { words: ["Could", "you", "please", "help", "me", "with", "this"], answer: "Could you please help me with this?" },
        { words: ["Could", "you", "please", "speak", "slowly"], answer: "Could you please speak slowly?" }
      ],
      trueFalse: [
        { statement: 'We say "Could you please open the door?" with the base verb "open".', isTrue: true, explanation: 'Correct! Always use base verb after "Could you".' },
        { statement: 'It is correct to say "Could you please helping me?".', isTrue: false, explanation: 'False! Never use "-ing" after "Could you". Say "Could you please help me?".' },
        { statement: 'Placing "please" at the end like "Could you pass the pen, please?" is completely polite.', isTrue: true, explanation: 'Correct! "Please" can be at the start or end.' }
      ],
      sentenceBuilder: [
        { prompt: "Build polite request to open the door:", chips: ["Could", "you", "please", "open", "the", "door", "?"], correct: "Could you please open the door ?" },
        { prompt: "Build polite request to pass the phone:", chips: ["Could", "you", "pass", "the", "phone", ",", "please", "?"], correct: "Could you pass the phone , please ?" }
      ]
    },
    how_much_price: {
      title: "How Much Price Activities",
      icon: "\u{1F3F7}\uFE0F",
      color: "#0d9488",
      matching: [
        { left: "How much is", right: "this phone? (1 item)", category: "Singular" },
        { left: "How much are", right: "these shoes? (2+ items)", category: "Plural" },
        { left: "How much is", right: "that bag? (1 item)", category: "Singular" },
        { left: "How much are", right: "those books? (2+ items)", category: "Plural" },
        { left: "How much is", right: "it? (Singular pronoun)", category: "Singular" },
        { left: "How much are", right: "they? (Plural pronoun)", category: "Plural" }
      ],
      scrambles: [
        { words: ["How", "much", "is", "this", "phone"], answer: "How much is this phone?" },
        { words: ["How", "much", "are", "these", "shoes"], answer: "How much are these shoes?" },
        { words: ["How", "much", "is", "that", "leather", "bag"], answer: "How much is that leather bag?" },
        { words: ["How", "much", "are", "those", "new", "books"], answer: "How much are those new books?" }
      ],
      trueFalse: [
        { statement: 'For ONE item (singular), we always ask "How much is...?"', isTrue: true, explanation: 'Correct! "is" is for one item (phone, bag, shirt).' },
        { statement: 'For MULTIPLE items like shoes or books, we ask "How much is these shoes?".', isTrue: false, explanation: 'False! Multiple items require "are": "How much are these shoes?".' },
        { statement: '"How much are they?" is the correct plural question for multiple items.', isTrue: true, explanation: 'Correct! "They" and "are" are used for plural items.' }
      ],
      sentenceBuilder: [
        { prompt: "Ask price of one phone:", chips: ["How", "much", "is", "this", "phone", "?"], correct: "How much is this phone ?" },
        { prompt: "Ask price of multiple shoes:", chips: ["How", "much", "are", "these", "shoes", "?"], correct: "How much are these shoes ?" }
      ]
    }
  };
  function shuffleArray2(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function shuffleQuestion(question) {
    if (!question || !Array.isArray(question.options) || question.options.length <= 1) {
      return { ...question };
    }
    const originalOptions = question.options;
    const correctOptionText = originalOptions[question.answer];
    const shuffledOptions = shuffleArray2(originalOptions);
    const newAnswerIndex = shuffledOptions.indexOf(correctOptionText);
    return {
      ...question,
      options: shuffledOptions,
      answer: newAnswerIndex !== -1 ? newAnswerIndex : question.answer
    };
  }
  function getFreshQuestionsForTopic(topicId, seenIds = [], count = 5) {
    const bank = TOPIC_QUESTION_BANKS[topicId] || [];
    if (bank.length === 0) return { questions: [], selectedIds: [] };
    const seenSet = new Set(seenIds || []);
    let pool = bank.filter((q) => !seenSet.has(q.id));
    if (pool.length < count) {
      pool = [...bank];
    }
    const shuffledPool = shuffleArray2(pool);
    const selected = shuffledPool.slice(0, Math.min(count, shuffledPool.length));
    const finalQuestions = selected.map((q) => shuffleQuestion(q));
    const selectedIds = finalQuestions.map((q) => q.id);
    return {
      questions: finalQuestions,
      selectedIds
    };
  }
  function generateFullGrammarTest(activeTopics = [], seenIds = [], questionsPerTopic = 2) {
    if (!activeTopics || activeTopics.length === 0) {
      return { questions: [], selectedIds: [], topicBreakdown: {} };
    }
    const allSelected = [];
    const selectedIds = [];
    const topicBreakdown = {};
    activeTopics.forEach((topic) => {
      const { questions, selectedIds: ids } = getFreshQuestionsForTopic(topic.id, seenIds, questionsPerTopic);
      questions.forEach((q) => {
        allSelected.push({
          ...q,
          topicId: topic.id,
          topicNumber: topic.number,
          topicTitle: topic.title,
          topicIcon: topic.icon,
          topicColor: topic.color
        });
        selectedIds.push(q.id);
      });
      topicBreakdown[topic.id] = {
        title: topic.title,
        icon: topic.icon,
        count: questions.length
      };
    });
    const randomizedTest = shuffleArray2(allSelected);
    return {
      questions: randomizedTest,
      selectedIds,
      topicBreakdown
    };
  }

  // js/components/creativeVisuals.js
  function renderRoleplayCreativeBanner(roleplay, isLarge = false) {
    const num = String(roleplay.number || "01");
    const height = isLarge ? "210px" : "150px";
    switch (num) {
      case "01":
        return renderHouseVisitVisual(roleplay, isLarge, height);
      case "02":
        return renderPoliceInquiryVisual(roleplay, isLarge, height);
      case "03":
        return renderFamilyCareersVisual(roleplay, isLarge, height);
      case "04":
        return renderLostChildrenVisual(roleplay, isLarge, height);
      case "05":
        return renderCampusWorkplaceVisual(roleplay, isLarge, height);
      default:
        return renderGenericScenarioVisual(roleplay, isLarge, height);
    }
  }
  function renderHouseVisitVisual(rp, isLarge, height) {
    return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #0A2558 0%, #1E3A8A 50%, #312E81 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <!-- Subtle Architectural Blueprint Grid Overlay -->
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#FFFFFF 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>
      
      <!-- Left Content & Grammatical Highlights -->
      <div style="position: relative; z-index: 2; max-width: ${isLarge ? "560px" : "70%"};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(245, 166, 35, 0.22); border: 1px solid #F5A623; color: #F5A623; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            PHYSICAL CLASS PRESENTATION
          </span>
          <span style="color: #94A3B8; font-size: 0.75rem; font-weight: 600;">Adjectives in Daily Life</span>
        </div>

        <div style="font-size: ${isLarge ? "1.35rem" : "1.1rem"}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Warm Hospitality & Home Description
        </div>

        <!-- Descriptive Contrast Badges -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #E2E8F0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2);">
            \u2728 spacious room
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #E2E8F0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2);">
            \u{1F6CB}\uFE0F comfortable sofa
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #E2E8F0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2);">
            \u{1F9FC} clean & tidy
          </span>
        </div>
      </div>

      <!-- Right Graphic: Architectural Modern Villa Vector Silhouette -->
      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? "130" : "90"}" height="${isLarge ? "130" : "90"}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#1E3A8A" fill-opacity="0.4" stroke="#F5A623" stroke-width="1.5" stroke-dasharray="3 3"/>
          <path d="M25 78L60 45L95 78V95H25V78Z" fill="#0A2558" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M60 30L15 70L22 76L60 42L98 76L105 70L60 30Z" fill="#F5A623"/>
          <rect x="52" y="68" width="16" height="27" rx="2" fill="#F5A623" stroke="#FFFFFF" stroke-width="1.5"/>
          <circle cx="63" cy="82" r="1.5" fill="#0A2558"/>
          <rect x="33" y="62" width="14" height="14" rx="2" fill="#FEF08A" stroke="#FFFFFF" stroke-width="1.5"/>
          <rect x="73" y="62" width="14" height="14" rx="2" fill="#FEF08A" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M40 70H44L46 76H38L40 70Z" fill="#CA8A04"/>
        </svg>
      </div>
    </div>
  `;
  }
  function renderPoliceInquiryVisual(rp, isLarge, height) {
    return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1D4ED8 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#60A5FA 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? "560px" : "70%"};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(59, 130, 246, 0.25); border: 1px solid #60A5FA; color: #93C5FD; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            INVESTIGATION DESK
          </span>
          <span style="color: #94A3B8; font-size: 0.75rem; font-weight: 600;">Question Words & Genitive 's</span>
        </div>

        <div style="font-size: ${isLarge ? "1.35rem" : "1.1rem"}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Police Questions & Possession
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #93C5FD; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(147,197,253,0.3);">
            \u{1F50D} Who is this?
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FCD34D; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(252,211,77,0.3);">
            \u2753 Whose bag?
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #86EFAC; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(134,239,172,0.3);">
            \u{1F3F7}\uFE0F Ali's passport
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? "130" : "90"}" height="${isLarge ? "130" : "90"}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#1E293B" fill-opacity="0.5" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4 4"/>
          <path d="M60 26L85 36V62C85 80 60 94 60 94C60 94 35 80 35 62V36L60 26Z" fill="#1E40AF" stroke="#60A5FA" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M60 33L80 41V60C80 74 60 86 60 86C60 86 40 74 40 60V41L60 33Z" fill="#0F172A"/>
          <polygon points="60,44 63,53 72,53 65,58 68,67 60,62 52,67 55,58 48,53 57,53" fill="#F5A623"/>
          <circle cx="60" cy="57" r="3" fill="#FFFFFF"/>
        </svg>
      </div>
    </div>
  `;
  }
  function renderFamilyCareersVisual(rp, isLarge, height) {
    return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #064E3B 0%, #065F46 50%, #0F766E 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#34D399 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? "560px" : "70%"};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(52, 211, 153, 0.22); border: 1px solid #34D399; color: #6EE7B7; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            FAMILY & PROFESSIONS
          </span>
          <span style="color: #A7F3D0; font-size: 0.75rem; font-weight: 600;">Possessive Adjectives & Jobs</span>
        </div>

        <div style="font-size: ${isLarge ? "1.35rem" : "1.1rem"}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Family Members & Their Careers
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #A7F3D0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(167,243,208,0.3);">
            \u{1F468}\u200D\u2695\uFE0F my father's job
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FDE047; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(253,224,71,0.3);">
            \u{1F469}\u200D\u{1F3EB} her sister
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #BAE6FD; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(186,230,253,0.3);">
            \u{1F454} his career
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? "130" : "90"}" height="${isLarge ? "130" : "90"}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#047857" fill-opacity="0.3" stroke="#34D399" stroke-width="1.5" stroke-dasharray="3 3"/>
          <circle cx="60" cy="38" r="14" fill="#064E3B" stroke="#34D399" stroke-width="2"/>
          <path d="M55 35C55 32.2 57.2 30 60 30C62.8 30 65 32.2 65 35C65 37.8 62.8 40 60 40C57.2 40 55 37.8 55 35Z" fill="#FCD34D"/>
          <line x1="60" y1="52" x2="60" y2="65" stroke="#34D399" stroke-width="2"/>
          <line x1="38" y1="65" x2="82" y2="65" stroke="#34D399" stroke-width="2"/>
          <line x1="38" y1="65" x2="38" y2="74" stroke="#34D399" stroke-width="2"/>
          <line x1="82" y1="65" x2="82" y2="74" stroke="#34D399" stroke-width="2"/>
          <circle cx="38" cy="85" r="12" fill="#064E3B" stroke="#FDE047" stroke-width="2"/>
          <circle cx="82" cy="85" r="12" fill="#064E3B" stroke="#60A5FA" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `;
  }
  function renderLostChildrenVisual(rp, isLarge, height) {
    return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #881337 0%, #9F1239 50%, #BE123C 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#FDA4AF 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? "560px" : "70%"};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(253, 164, 175, 0.22); border: 1px solid #FDA4AF; color: #FECDD3; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            OFFICIAL REPORT
          </span>
          <span style="color: #FFE4E6; font-size: 0.75rem; font-weight: 600;">Colors, Possessives & Identifiers</span>
        </div>

        <div style="font-size: ${isLarge ? "1.35rem" : "1.1rem"}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Lost Children Identification
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FECDD3; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(254,205,211,0.3);">
            \u{1F534} red jacket
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #93C5FD; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(147,197,253,0.3);">
            \u{1F392} blue backpack
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FDE047; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(253,224,71,0.3);">
            \u{1F467} their clothes
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? "130" : "90"}" height="${isLarge ? "130" : "90"}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#9F1239" fill-opacity="0.4" stroke="#FECDD3" stroke-width="1.5" stroke-dasharray="4 4"/>
          <rect x="35" y="30" width="50" height="66" rx="4" fill="#FFFFFF" stroke="#BE123C" stroke-width="2"/>
          <line x1="45" y1="44" x2="75" y2="44" stroke="#BE123C" stroke-width="3" stroke-linecap="round"/>
          <line x1="45" y1="54" x2="65" y2="54" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <line x1="45" y1="62" x2="72" y2="62" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <line x1="45" y1="70" x2="60" y2="70" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <circle cx="60" cy="84" r="5" fill="#BE123C"/>
        </svg>
      </div>
    </div>
  `;
  }
  function renderCampusWorkplaceVisual(rp, isLarge, height) {
    return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #0284C7 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#BAE6FD 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? "560px" : "70%"};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(186, 230, 253, 0.22); border: 1px solid #BAE6FD; color: #E0F2FE; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            CAMPUS & WORKPLACE
          </span>
          <span style="color: #BAE6FD; font-size: 0.75rem; font-weight: 600;">Singular vs Plural Existence</span>
        </div>

        <div style="font-size: ${isLarge ? "1.35rem" : "1.1rem"}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          There is (1) vs There are (2+)
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #BAE6FD; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(186,230,253,0.3);">
            \u{1F3DB}\uFE0F There is a library
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FDE047; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(253,224,71,0.3);">
            \u{1F3E2} There are 40 rooms
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? "130" : "90"}" height="${isLarge ? "130" : "90"}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#1D4ED8" fill-opacity="0.3" stroke="#93C5FD" stroke-width="1.5" stroke-dasharray="3 3"/>
          <polygon points="60,30 25,48 95,48" fill="#F5A623" stroke="#FFFFFF" stroke-width="1.5"/>
          <rect x="28" y="48" width="64" height="6" fill="#0A2558"/>
          <rect x="34" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="50" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="64" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="80" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="22" y="88" width="76" height="6" fill="#0A2558"/>
        </svg>
      </div>
    </div>
  `;
  }
  function renderGenericScenarioVisual(rp, isLarge, height) {
    return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #0A2558 0%, #1E3A8A 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: relative; z-index: 2;">
        <div style="font-size: 1.15rem; font-weight: 800; color: #FFFFFF; line-height: 1.3;">
          ${rp.title}
        </div>
        <p style="font-size: 0.85rem; color: #CBD5E1; margin: 4px 0 0;">
          ${rp.scenario || "Official Physical Class Roleplay"}
        </p>
      </div>
      <div style="font-size: 2.2rem; color: #F5A623; opacity: 0.85;">
        ${roleplayIcon(36)}
      </div>
    </div>
  `;
  }
  function renderConceptVisual(topicId, questionObj = {}) {
    const qText = (questionObj.question || "").toLowerCase();
    if (topicId === "adjectives" || topicId === "topic_01") {
      let focus = "Descriptive Adjective";
      let example = "[Subject] + is/are + [ADJECTIVE]";
      if (qText.includes("elephant") || qText.includes("size") || qText.includes("big") || qText.includes("tall")) {
        focus = "Size & Dimension";
        example = "Big \u2194 Small \u2022 Tall \u2194 Short";
      } else if (qText.includes("fast") || qText.includes("cheetah") || qText.includes("slow")) {
        focus = "Speed & Motion";
        example = "Fast \u2194 Slow \u2022 Quick \u2194 Heavy";
      } else if (qText.includes("clean") || qText.includes("room") || qText.includes("sofa") || qText.includes("house")) {
        focus = "Room Quality";
        example = "Spacious \u2022 Clean \u2022 Comfortable";
      }
      return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #2563EB; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #EFF6FF; color: #2563EB; font-weight: 800;">
            ${bookIcon(18)}
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.04em;">
              GRAMMAR CONCEPT: ${focus}
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              ${example}
            </div>
          </div>
        </div>
        <span class="badge" style="background: #EFF6FF; color: #2563EB; font-weight: 700; font-size: 0.75rem;">
          Adjective Rule
        </span>
      </div>
    `;
    }
    if (topicId === "genitive_s" || topicId === "topic_02") {
      return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #D97706; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #FEF3C7; color: #D97706; font-weight: 800;">
            \u2019s
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #D97706; text-transform: uppercase; letter-spacing: 0.04em;">
              POSSESSION RULE: GENITIVE \u2019S
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              [Owner] + \u2019s + [Possession] (e.g. <em>Ali\u2019s car</em>)
            </div>
          </div>
        </div>
        <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 700; font-size: 0.75rem;">
          Ownership
        </span>
      </div>
    `;
    }
    if (topicId === "whose" || topicId === "topic_04") {
      return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #7C3AED; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #EDE9FE; color: #7C3AED; font-weight: 800;">
            ?
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.04em;">
              INQUIRY RULE: WHOSE (Malik Kaun Hai?)
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              Whose + [Item] + is this? \u2192 It is [Owner]\u2019s.
            </div>
          </div>
        </div>
        <span class="badge" style="background: #EDE9FE; color: #6D28D9; font-weight: 700; font-size: 0.75rem;">
          Asking Owner
        </span>
      </div>
    `;
    }
    if (topicId === "possessive_adj" || topicId === "topic_05") {
      return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #059669; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #D1FAE5; color: #059669; font-weight: 800;">
            ${usersIcon(18)}
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.04em;">
              POSSESSIVE ADJECTIVES MATRIX
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              I \u2192 My \u2022 He \u2192 His \u2022 She \u2192 Her \u2022 They \u2192 Their
            </div>
          </div>
        </div>
        <span class="badge" style="background: #D1FAE5; color: #065F46; font-weight: 700; font-size: 0.75rem;">
          Grammar Blueprint
        </span>
      </div>
    `;
    }
    if (topicId === "what_color" || topicId === "topic_06" || topicId === "what_color_genitive_s") {
      return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #DC2626; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #FEE2E2; color: #DC2626; font-weight: 800;">
            \u{1F3A8}
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #DC2626; text-transform: uppercase; letter-spacing: 0.04em;">
              COLOR INQUIRY & GENITIVE \u2019S
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              What color is + [Owner]\u2019s + [Noun]? \u2192 It is [Color].
            </div>
          </div>
        </div>
        <span class="badge" style="background: #FEE2E2; color: #991B1B; font-weight: 700; font-size: 0.75rem;">
          Compound Structure
        </span>
      </div>
    `;
    }
    if (topicId === "could_requests" || topicId === "topic_07") {
      return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #7C3AED; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #EDE9FE; color: #7C3AED; font-weight: 800;">
            \u{1F91D}
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.04em;">
              POLITE REQUEST: COULD YOU + BASE VERB
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              Could you please + [Base Verb] (open / help / pass)?
            </div>
          </div>
        </div>
        <span class="badge" style="background: #EDE9FE; color: #6D28D9; font-weight: 700; font-size: 0.75rem;">
          Polite Request
        </span>
      </div>
    `;
    }
    if (topicId === "how_much_price" || topicId === "topic_08") {
      return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #0D9488; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #CCFBF1; color: #0D9488; font-weight: 800;">
            \u{1F3F7}\uFE0F
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #0D9488; text-transform: uppercase; letter-spacing: 0.04em;">
              PRICE INQUIRY: 1 ITEM vs 2+ ITEMS
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              Singular (1): How much is...? \u2022 Plural (2+): How much are...?
            </div>
          </div>
        </div>
        <span class="badge" style="background: #CCFBF1; color: #0F766E; font-weight: 700; font-size: 0.75rem;">
          Price Inquiry
        </span>
      </div>
    `;
    }
    return `
    <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid var(--ha-navy); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 800;">
          ${sparkIcon(18)}
        </span>
        <div>
          <div style="font-size: 0.72rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; letter-spacing: 0.04em;">
            GRAMMAR EXERCISE BLUEPRINT
          </div>
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
            Analyze sentence structure & select the accurate grammatical token.
          </div>
        </div>
      </div>
      <span class="badge badge-navy" style="font-weight: 700; font-size: 0.75rem;">
        Active Drill
      </span>
    </div>
  `;
  }

  // js/components/curriculumZone.js
  function renderCurriculumZone(container, onNavigate, initialTopicId = null) {
    const student = stateManager.getCurrentStudent();
    const topics = stateManager.getActiveCurriculum();
    let selectedTopic = initialTopicId ? getTopicById(initialTopicId, topics) : null;
    let currentStep = "learn";
    let practiceIndex = 0;
    let practiceAnswers = [];
    let practiceQuestionsList = [];
    let quizIndex = 0;
    let quizAnswers = [];
    let quizQuestionsList = [];
    let lastQuizResult = null;
    function initPracticeQuestions() {
      if (!selectedTopic) return;
      const seenIds = stateManager.getSeenQuestionIds(selectedTopic.id);
      const { questions, selectedIds } = getFreshQuestionsForTopic(selectedTopic.id, seenIds, 5);
      if (questions && questions.length > 0) {
        practiceQuestionsList = questions;
        stateManager.markQuestionsSeen(selectedTopic.id, selectedIds);
      } else {
        practiceQuestionsList = (selectedTopic.practiceQuestions || []).map((q) => shuffleQuestion(q));
      }
      practiceIndex = 0;
      practiceAnswers = [];
    }
    function initQuizQuestions() {
      if (!selectedTopic) return;
      const seenIds = stateManager.getSeenQuestionIds(selectedTopic.id);
      const { questions, selectedIds } = getFreshQuestionsForTopic(selectedTopic.id, seenIds, 5);
      if (questions && questions.length > 0) {
        quizQuestionsList = questions;
        stateManager.markQuestionsSeen(selectedTopic.id, selectedIds);
      } else {
        quizQuestionsList = (selectedTopic.quizQuestions || []).map((q) => shuffleQuestion(q));
      }
      quizIndex = 0;
      quizAnswers = [];
    }
    function render() {
      if (!selectedTopic) {
        renderTopicSelection();
      } else {
        switch (currentStep) {
          case "learn":
            renderLearnStep();
            break;
          case "practice":
            renderPracticeStep();
            break;
          case "quiz":
            renderQuizStep();
            break;
          case "result":
            renderResultStep();
            break;
          default:
            renderLearnStep();
        }
      }
    }
    function renderTopicSelection() {
      const studentProgress = student?.topicProgress || {};
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span class="badge badge-navy">Official Class Curriculum</span>
            <span class="badge badge-red">Taught by Sir Zubair</span>
          </div>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 8px;">English Language Program</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 620px; margin: 0 auto 28px;">
            The foundational grammar and speaking topics taught in class by <strong>Sir Zubair</strong>. Follow the 5-step path: <strong>Learn \u2192 Practice \u2192 Quiz \u2192 Result \u2192 Earn XP!</strong>
          </p>

        ${topics.length === 0 ? `
          <div class="ha-card" style="padding: 48px 24px; text-align: center; max-width: 540px; margin: 20px auto; border-top: 4px solid var(--ha-navy);">
            <span style="display: flex; justify-content: center; margin-bottom: 12px; color: var(--ha-navy);">${bookIcon(42)}</span>
            <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 8px;">Curriculum Under Update</h2>
            <p style="font-size: 0.95rem; color: var(--ha-text-muted); line-height: 1.6; margin-bottom: 20px;">
              Curriculum topics are currently being updated by <strong>Sir Zubair</strong>. Please check back soon or practice in the Games & Practice Zone!
            </p>
            <button class="btn btn-primary btn-sm" id="btn-curriculum-goto-games" style="display: inline-flex; align-items: center; gap: 6px;">
              ${gamepadIcon(15)} Play Practice Games \u2192
            </button>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 24px;">
            ${topics.map((t) => {
        const prog = studentProgress[t.id] || {};
        const isPassed = prog.passed || prog.quizScore >= 80;
        const statusLabel = isPassed ? `${checkCircleIcon(13)} Mastered (100%)` : prog.learned ? "In Practice" : "Ready to Start";
        const statusBadgeClass = isPassed ? "badge-success" : prog.learned ? "badge-gold" : "badge-navy";
        return `
                <div class="ha-card topic-card" data-id="${t.id}" style="cursor: pointer; border-top: 5px solid ${t.color}; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                      <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--ha-navy-subtle); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.95rem; color: var(--ha-navy);">
                        ${t.number}
                      </div>
                      <span class="badge ${statusBadgeClass}" style="display: inline-flex; align-items: center; gap: 4px;">${statusLabel}</span>
                    </div>
                    <div style="font-size: 0.8rem; font-weight: 800; color: ${t.color}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
                      Topic ${t.number}
                    </div>
                    <h3 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 8px;">${t.title}</h3>
                    <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 16px; line-height: 1.5;">
                      ${t.subtitle}
                    </p>
                  </div>

                  <div style="border-top: 1px solid var(--ha-border); padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.82rem; font-weight: 700; color: var(--ha-navy);">
                      Reward: +50 XP
                    </span>
                    <button class="btn btn-primary btn-sm btn-start-topic" data-id="${t.id}" style="background: ${t.color};">
                      ${isPassed ? "Review Topic \u2192" : "Start Learning \u2192"}
                    </button>
                  </div>
                </div>
              `;
      }).join("")}
          </div>
        `}
      </div>
    `;
      container.querySelector("#btn-curriculum-goto-games")?.addEventListener("click", () => {
        sound.playClick();
        if (onNavigate) onNavigate("games");
      });
      container.querySelectorAll(".topic-card, .btn-start-topic").forEach((el) => {
        el.addEventListener("click", (e) => {
          const id = el.dataset.id || el.closest(".topic-card")?.dataset.id;
          if (id) {
            sound.playClick();
            selectedTopic = getTopicById(id, topics);
            currentStep = "learn";
            render();
            window.scrollTo(0, 0);
          }
        });
      });
    }
    function renderLearnStep() {
      const guide = selectedTopic.explanationGuide || {
        kyun: {
          title: "Kyun Istemal Hota Hai? (Why do we use it?)",
          urdu: selectedTopic.summary,
          english: selectedTopic.subtitle || "To build proper English grammar and communication skills."
        },
        kaise: {
          title: "Kaise Istemal Hota Hai? (How is it formed?)",
          urdu: "Class rules ke mutabiq sahi tarteeb mein alfaz ka istemal karein.",
          english: "Follow standard English word order and grammar rules.",
          formula: "Grammar Pattern: " + selectedTopic.title
        },
        kisLiye: {
          title: "Kis Liye Istemal Hota Hai? (When & What for?)",
          urdu: "Rozmarrah English bol-chaal aur writing ko behtar banane ke liye.",
          english: "For daily conversational clarity and accurate English writing.",
          points: ["Classroom conversation", "Daily speaking practice", "Written exercises"]
        },
        audioNarration: `${selectedTopic.title}. ${selectedTopic.summary}`
      };
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 880px;">
        
        <!-- Header & Breadcrumbs -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-topics" style="display: inline-flex; align-items: center; gap: 6px;">
            ${arrowLeftIcon(14)} Back to All Topics
          </button>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <span class="badge badge-navy" style="background: var(--ha-navy); color: #fff;">1. LEARN</span>
            <span class="badge badge-navy" style="opacity: 0.5;">2. PRACTICE</span>
            <span class="badge badge-navy" style="opacity: 0.5;">3. QUIZ</span>
            <span class="badge badge-navy" style="opacity: 0.5;">4. RESULT</span>
          </div>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 6px solid ${selectedTopic.color}; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
            <div style="width: 56px; height: 56px; border-radius: var(--radius-lg); background: var(--ha-navy-subtle); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; color: var(--ha-navy);">
              ${selectedTopic.number}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 0.85rem; font-weight: 800; color: ${selectedTopic.color}; text-transform: uppercase;">
                  Topic ${selectedTopic.number} \u2014 Class Master Lesson
                </span>
                <span class="badge badge-red" style="font-size: 0.68rem; padding: 2px 6px;">Taught by Sir Zubair</span>
              </div>
              <h1 style="font-size: 2.1rem; color: var(--ha-navy); margin-top: 2px; line-height: 1.2;">${selectedTopic.title}</h1>
            </div>
          </div>

          <!-- Interactive Teacher Explanation Box (Sir Zubair ki Wazahath: Kyun, Kaise, Kis Liye) -->
          <div class="grammar-explanation-hub" style="background: #FFFFFF; border: 2px solid ${selectedTopic.color}33; border-radius: var(--radius-lg); padding: 22px; margin-bottom: 28px; box-shadow: var(--ha-shadow-sm);">
            
            <!-- Voice Audio Bar Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--ha-border);">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-pill); background: ${selectedTopic.color}; color: #fff; display: flex; align-items: center; justify-content: center;">
                  ${schoolIcon(22)}
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">
                      Sir Zubair's Grammar Masterclass
                    </h3>
                    <span class="badge badge-navy" style="font-size: 0.7rem;">Official Explanation</span>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--ha-text-muted);">
                    Topic ${selectedTopic.number}: ${selectedTopic.title} \u2022 <strong>Kyun, Kaise aur Kis Liye</strong>
                  </div>
                </div>
              </div>

              <!-- Voice Audio Narration Button -->
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="btn btn-secondary btn-sm btn-audio-explain" id="btn-topic-audio-explain" style="background: ${selectedTopic.color}; border-color: ${selectedTopic.color}; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px;">
                  <span id="audio-explain-icon">${speakerIcon(16)}</span>
                  <span id="audio-explain-text">Bol Kar Suniye (Listen Explanation)</span>
                </button>
              </div>
            </div>

            <!-- 3 Pillars Grid: KYUN, KAISE, KIS LIYE -->
            <div class="explanation-pillars-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
              
              <!-- 1. KYUN Istemal Hota Hai? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #2563eb; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #1e3a8a; margin: 0;">1. KYUN? (Why?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.04em;">Wajah / Purpose:</div>
                <p style="font-size: 0.88rem; color: var(--ha-text-main); line-height: 1.5; margin-bottom: 10px;">
                  ${guide.kyun.urdu}
                </p>
                <div style="font-size: 0.8rem; color: var(--ha-text-muted); background: #FFFFFF; border-radius: var(--radius-sm); padding: 8px 10px; border-left: 3px solid #2563eb; line-height: 1.4;">
                  <em>"${guide.kyun.english}"</em>
                </div>
              </div>

              <!-- 2. KAISE Istemal Hota Hai? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #d97706; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #b45309; margin: 0;">2. KAISE? (How?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.04em;">Formula & Rule:</div>
                <p style="font-size: 0.88rem; color: var(--ha-text-main); line-height: 1.5; margin-bottom: 10px;">
                  ${guide.kaise.urdu}
                </p>
                <div style="background: #FFFBEB; border: 1px dashed #d97706; border-radius: var(--radius-sm); padding: 8px 10px; font-size: 0.82rem; font-weight: 800; color: #92400e; line-height: 1.4;">
                  ${guide.kaise.formula}
                </div>
              </div>

              <!-- 3. KIS LIYE Istemal Hota Hai? -->
              <div class="explanation-pillar-card" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-top: 4px solid #059669; border-radius: var(--radius-md); padding: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <h4 style="font-size: 0.98rem; font-weight: 800; color: #065f46; margin: 0;">3. KIS LIYE? (What for?)</h4>
                </div>
                <div style="font-size: 0.74rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.04em;">Rozmarrah Istemal:</div>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; color: var(--ha-text-main); display: flex; flex-direction: column; gap: 5px; line-height: 1.35;">
                  ${(guide.kisLiye.points || []).map((pt) => `<li>${pt}</li>`).join("")}
                </ul>
              </div>

            </div>
          </div>

          <!-- Vocabulary / Rule Reference Table -->
          <div style="margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0;">
                Key Vocabulary & Forms Taught in Class
              </h3>
              <span style="font-size: 0.8rem; color: var(--ha-text-muted); display: flex; align-items: center; gap: 4px;">
                ${speakerIcon(13)} Click icon to listen pronunciation
              </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
              ${(selectedTopic.vocab || []).map((v) => `
                <div style="background: #FFFFFF; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 12px 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: var(--ha-navy); font-size: 1.05rem;">${v.word}</strong>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span style="font-size: 0.75rem; font-weight: 700; color: ${selectedTopic.color}; background: var(--ha-navy-subtle); padding: 2px 8px; border-radius: var(--radius-pill);">${v.category || v.pronoun || ""}</span>
                      <button class="btn-speak-mini" data-word="${v.word}" title="Listen to pronunciation" style="background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; color: var(--ha-navy);">
                        ${speakerIcon(14)}
                      </button>
                    </div>
                  </div>
                  ${v.opposite ? `<div style="font-size: 0.82rem; color: var(--ha-red); margin-bottom: 4px;">Opposite: <strong>${v.opposite}</strong></div>` : ""}
                  <div style="font-size: 0.88rem; color: var(--ha-text-muted); font-style: italic;">
                    \u201C${v.example}\u201D
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Classroom Examples -->
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 12px;">
              Real Classroom Sentences
            </h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${(selectedTopic.examples || []).map((ex, idx) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); flex-wrap: wrap; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="background: var(--ha-navy); color: #fff; width: 26px; height: 26px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800;">${idx + 1}</span>
                    <div>
                      <div style="font-size: 1.05rem; font-weight: 700; color: var(--ha-navy);">${ex.english}</div>
                      <div style="font-size: 0.82rem; color: var(--ha-text-muted);">${ex.note}</div>
                    </div>
                  </div>
                  <button class="btn btn-outline btn-sm btn-speak-sentence" data-sentence="${ex.english}" title="Listen to pronunciation" style="display: inline-flex; align-items: center; gap: 6px;">
                    ${speakerIcon(14)} Speak
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Interactive Topic Activities Hub Link -->
          <div style="margin-bottom: 28px; background: #F8FAFC; border: 1.5px solid var(--ha-border); border-left: 5px solid ${selectedTopic.color}; border-radius: var(--radius-lg); padding: 20px 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <div>
                <span class="badge badge-navy" style="font-size: 0.72rem;">Multi-Format Practice</span>
                <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 2px 0 0;">Practice ${selectedTopic.title} Through Activities</h3>
              </div>
              <span style="font-size: 0.8rem; color: var(--ha-text-muted);">Play beyond regular MCQs</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="scramble" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${puzzleIcon(15)} <span>Sentence Scramble</span>
              </button>
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="matching" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${refreshIcon(15)} <span>Pair Matching</span>
              </button>
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="true_false" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${checkCircleIcon(15)} <span>True or False</span>
              </button>
              <button class="btn btn-outline btn-sm btn-open-act-type" data-act="builder" style="text-align: left; padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
                ${bookIcon(15)} <span>Sentence Builder</span>
              </button>
            </div>
          </div>

          <!-- Action Button to step 2 -->
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 16px; border-top: 1px solid var(--ha-border); padding-top: 20px;">
            <span style="font-size: 0.88rem; color: var(--ha-text-muted);">
              Learned the concept? Let's practice!
            </span>
            <button class="btn btn-primary btn-lg" id="btn-goto-practice" style="background: ${selectedTopic.color};">
              Start Practice Exercises \u2192
            </button>
          </div>
        </div>

      </div>
    `;
      if (student) {
        stateManager.recordTopicProgress(selectedTopic.id, "learn");
      }
      container.querySelectorAll(".btn-open-act-type").forEach((btn) => {
        btn.addEventListener("click", () => {
          sound.stopSpeech();
          sound.playClick();
          const act = btn.dataset.act;
          if (onNavigate) {
            onNavigate("activities");
            window.dispatchEvent(new CustomEvent("ha:open-activity", {
              detail: { topicId: selectedTopic.id, activityType: act }
            }));
          }
        });
      });
      const audioExplainBtn = container.querySelector("#btn-topic-audio-explain");
      const audioIcon = container.querySelector("#audio-explain-icon");
      const audioText = container.querySelector("#audio-explain-text");
      audioExplainBtn?.addEventListener("click", () => {
        if (sound.isSpeaking()) {
          sound.stopSpeech();
          audioExplainBtn.classList.remove("is-speaking");
          if (audioIcon) audioIcon.textContent = "\u{1F50A}";
          if (audioText) audioText.textContent = "Bol Kar Suniye (Listen Explanation)";
        } else {
          const narration = guide.audioNarration || selectedTopic.summary;
          sound.playClick();
          audioExplainBtn.classList.add("is-speaking");
          if (audioIcon) audioIcon.textContent = "\u23F9\uFE0F";
          if (audioText) audioText.textContent = "Sir Zubair is speaking... (Click to stop)";
          sound.speak(narration, {
            rate: 0.88,
            pitch: 1,
            onEnd: () => {
              audioExplainBtn.classList.remove("is-speaking");
              if (audioIcon) audioIcon.textContent = "\u{1F50A}";
              if (audioText) audioText.textContent = "Bol Kar Suniye (Listen Explanation)";
            }
          });
        }
      });
      container.querySelector("#btn-back-to-topics")?.addEventListener("click", () => {
        sound.stopSpeech();
        sound.playClick();
        selectedTopic = null;
        render();
      });
      container.querySelector("#btn-goto-practice")?.addEventListener("click", () => {
        sound.stopSpeech();
        sound.playClick();
        initPracticeQuestions();
        currentStep = "practice";
        render();
        window.scrollTo(0, 0);
      });
      container.querySelectorAll(".btn-speak-mini").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const word = btn.dataset.word;
          if (word) sound.speak(word, 0.85);
        });
      });
      container.querySelectorAll(".btn-speak-sentence").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sentence = btn.dataset.sentence;
          if (sentence) sound.speak(sentence, 0.88);
        });
      });
    }
    function renderPracticeStep() {
      if (!practiceQuestionsList || practiceQuestionsList.length === 0) {
        initPracticeQuestions();
      }
      const questions = practiceQuestionsList;
      if (practiceIndex >= questions.length) {
        sound.playSuccess();
        if (student) {
          stateManager.recordTopicProgress(selectedTopic.id, "practice", {
            xp: 15,
            correctCount: practiceAnswers.filter((a) => a.isCorrect).length,
            totalCount: questions.length
          });
        }
        container.innerHTML = `
        <div class="container" style="padding-top: 40px; text-align: center; max-width: 600px;">
          <div class="ha-card" style="padding: 40px 28px;">
            <span style="font-size: 4rem;">\u{1F3AF}</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 12px 0;">Practice Complete!</h2>
            <p style="font-size: 1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              Great job practicing <strong>${selectedTopic.title}</strong>! You earned <strong>+15 XP</strong>.
              Now, prove your mastery in the official 5-question Topic Quiz!
            </p>
            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
              <button class="btn btn-outline" id="btn-repractice">Practice Again</button>
              <button class="btn btn-primary btn-lg" id="btn-goto-quiz" style="background: var(--ha-red); display: inline-flex; align-items: center; gap: 8px;">
                ${graduationCapIcon(18)} Take Official Topic Quiz
              </button>
            </div>
          </div>
        </div>
      `;
        container.querySelector("#btn-repractice")?.addEventListener("click", () => {
          sound.playClick();
          initPracticeQuestions();
          render();
          window.scrollTo(0, 0);
        });
        container.querySelector("#btn-goto-quiz")?.addEventListener("click", () => {
          sound.playClick();
          initQuizQuestions();
          currentStep = "quiz";
          render();
          window.scrollTo(0, 0);
        });
        return;
      }
      const q = questions[practiceIndex];
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 760px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <button class="btn btn-outline btn-sm" id="btn-back-learn">\u2190 Back to Lesson</button>
          <span class="badge badge-gold">2. PRACTICE (${practiceIndex + 1} / ${questions.length})</span>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 5px solid ${selectedTopic.color};">
          <div style="font-size: 0.82rem; font-weight: 800; color: ${selectedTopic.color}; text-transform: uppercase; margin-bottom: 6px;">
            Practice Exercise ${practiceIndex + 1}
          </div>

          ${renderConceptVisual(selectedTopic.id, q)}

          <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 24px;">
            ${q.question}
          </h2>

          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="practice-options-grid">
            ${(q.options || []).map((opt, idx) => `
              <button class="practice-opt-btn" data-index="${idx}" data-text="${opt}"
                style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #F8FAFC; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                ${opt}
              </button>
            `).join("")}
          </div>

          <div id="practice-feedback-box" style="display: none; padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
            <div id="practice-feedback-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;"></div>
            <div id="practice-feedback-text" style="font-size: 0.9rem;"></div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" id="btn-next-practice" style="display: none; background: ${selectedTopic.color};">
              Next Question \u2192
            </button>
          </div>
        </div>
      </div>
    `;
      container.querySelector("#btn-back-learn")?.addEventListener("click", () => {
        currentStep = "learn";
        render();
      });
      const optButtons = container.querySelectorAll(".practice-opt-btn");
      const feedbackBox = container.querySelector("#practice-feedback-box");
      const feedbackTitle = container.querySelector("#practice-feedback-title");
      const feedbackText = container.querySelector("#practice-feedback-text");
      const nextBtn = container.querySelector("#btn-next-practice");
      optButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          optButtons.forEach((b) => b.disabled = true);
          const chosenIdx = parseInt(btn.dataset.index);
          const chosenText = btn.dataset.text;
          const isCorrect = q.type === "fill" ? chosenText.toLowerCase() === q.answer.toLowerCase() : chosenIdx === q.answer;
          practiceAnswers.push({ question: q.question, chosen: chosenText, isCorrect });
          if (isCorrect) {
            sound.playCorrect();
            btn.style.borderColor = "var(--ha-success)";
            btn.style.background = "var(--ha-success-bg)";
            btn.style.color = "var(--ha-success)";
            feedbackBox.style.background = "var(--ha-success-bg)";
            feedbackBox.style.color = "#065F46";
            feedbackBox.style.border = "1px solid var(--ha-success)";
            feedbackTitle.innerHTML = `${checkCircleIcon(18)} Correct!`;
          } else {
            sound.playWrong();
            btn.style.borderColor = "var(--ha-error)";
            btn.style.background = "var(--ha-red-light)";
            btn.style.color = "var(--ha-red)";
            feedbackBox.style.background = "var(--ha-red-light)";
            feedbackBox.style.color = "#991B1B";
            feedbackBox.style.border = "1px solid var(--ha-red)";
            feedbackTitle.innerHTML = `${infoIcon(18)} Not quite!`;
          }
          feedbackText.textContent = q.explanation || "";
          feedbackBox.style.display = "block";
          nextBtn.style.display = "inline-flex";
        });
      });
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        practiceIndex++;
        render();
        window.scrollTo(0, 0);
      });
    }
    function renderQuizStep() {
      if (!quizQuestionsList || quizQuestionsList.length === 0) {
        initQuizQuestions();
      }
      const questions = quizQuestionsList;
      if (quizIndex >= questions.length) {
        const correctCount = quizAnswers.filter((a) => a.isCorrect).length;
        const totalCount = questions.length;
        const scorePercent = Math.round(correctCount / totalCount * 100);
        const passed = scorePercent >= 80;
        lastQuizResult = {
          correctCount,
          totalCount,
          scorePercent,
          passed,
          answers: quizAnswers
        };
        if (passed) {
          sound.playLevelUp();
          fireConfetti(3500);
        } else {
          sound.playClick();
        }
        if (student) {
          stateManager.recordTopicProgress(selectedTopic.id, "quiz", {
            scorePercent,
            correctCount,
            totalCount
          });
        }
        currentStep = "result";
        render();
        window.scrollTo(0, 0);
        return;
      }
      const q = questions[quizIndex];
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 760px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <span class="badge badge-red">3. OFFICIAL TOPIC QUIZ</span>
          <span style="font-weight: 700; color: var(--ha-navy);">Question ${quizIndex + 1} of ${questions.length}</span>
        </div>

        <div class="progress-container" style="margin-bottom: 24px; height: 8px;">
          <div class="progress-bar-fill red" style="width: ${(quizIndex + 1) / questions.length * 100}%;"></div>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 5px solid var(--ha-red);">
          <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-red); text-transform: uppercase; margin-bottom: 8px;">
            ${selectedTopic.title} Quiz
          </div>

          ${renderConceptVisual(selectedTopic.id, q)}

          <h2 style="font-size: 1.45rem; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.4;">
            ${q.question}
          </h2>

          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="quiz-options-grid">
            ${(q.options || []).map((opt, idx) => `
              <button class="quiz-opt-btn" data-index="${idx}" data-text="${opt}"
                style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                ${opt}
              </button>
            `).join("")}
          </div>

          <div id="quiz-feedback-box" style="display: none; padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
            <div id="quiz-feedback-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;"></div>
            <div id="quiz-feedback-text" style="font-size: 0.9rem;"></div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-lg" id="btn-next-quiz" style="display: none;">
              ${quizIndex === questions.length - 1 ? "Finish Quiz & View Results \u2192" : "Next Question \u2192"}
            </button>
          </div>
        </div>
      </div>
    `;
      const optButtons = container.querySelectorAll(".quiz-opt-btn");
      const feedbackBox = container.querySelector("#quiz-feedback-box");
      const feedbackTitle = container.querySelector("#quiz-feedback-title");
      const feedbackText = container.querySelector("#quiz-feedback-text");
      const nextBtn = container.querySelector("#btn-next-quiz");
      optButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          optButtons.forEach((b) => b.disabled = true);
          const chosenIdx = parseInt(btn.dataset.index);
          const chosenText = btn.dataset.text;
          const isCorrect = chosenIdx === q.answer;
          quizAnswers.push({
            question: q.question,
            chosen: chosenText,
            correctText: q.options[q.answer],
            isCorrect,
            explanation: q.explanation
          });
          if (isCorrect) {
            sound.playCorrect();
            btn.style.borderColor = "var(--ha-success)";
            btn.style.background = "var(--ha-success-bg)";
            btn.style.color = "var(--ha-success)";
            feedbackBox.style.background = "var(--ha-success-bg)";
            feedbackBox.style.color = "#065F46";
            feedbackBox.style.border = "1px solid var(--ha-success)";
            feedbackTitle.innerHTML = `${checkCircleIcon(18)} Correct Answer!`;
          } else {
            sound.playWrong();
            btn.style.borderColor = "var(--ha-error)";
            btn.style.background = "var(--ha-red-light)";
            btn.style.color = "var(--ha-red)";
            feedbackBox.style.background = "var(--ha-red-light)";
            feedbackBox.style.color = "#991B1B";
            feedbackBox.style.border = "1px solid var(--ha-red)";
            feedbackTitle.innerHTML = `${infoIcon(18)} Incorrect (Correct: "${q.options[q.answer]}")`;
          }
          feedbackText.textContent = q.explanation || "";
          feedbackBox.style.display = "block";
          nextBtn.style.display = "inline-flex";
        });
      });
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        quizIndex++;
        render();
        window.scrollTo(0, 0);
      });
    }
    function renderResultStep() {
      const res = lastQuizResult;
      if (!res) {
        renderTopicSelection();
        return;
      }
      container.innerHTML = `
      <div class="container" style="padding-top: 30px; padding-bottom: 60px; max-width: 760px;">
        
        <!-- Score Card -->
        <div class="ha-card topic-master-card" style="text-align: center; border-top: 6px solid ${res.passed ? "var(--ha-gold)" : "var(--ha-red)"}; margin-bottom: 30px;">
          <div style="display: flex; justify-content: center; margin-bottom: 16px; color: ${res.passed ? "var(--ha-gold)" : "var(--ha-navy)"};">
            ${res.passed ? trophyIcon(64) : bookIcon(64)}
          </div>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">
            ${res.passed ? "Topic Mastered!" : "Keep Practicing!"}
          </h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            ${res.passed ? `Outstanding work on <strong>${selectedTopic.title}</strong>! You passed the official quiz.` : `You scored ${res.scorePercent}%. Review your mistakes below and retake the quiz to earn the full 50 XP!`}
          </p>

          <!-- Big Score Badge -->
          <div style="display: inline-flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; background: var(--ha-navy-subtle); padding: 14px 22px; border-radius: var(--radius-lg); margin-bottom: 24px; max-width: 100%;">
            <div>
              <div style="font-size: 0.8rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">YOUR SCORE</div>
              <div style="font-size: 2.2rem; font-weight: 800; color: ${res.passed ? "var(--ha-navy)" : "var(--ha-red)"};">
                ${res.correctCount} / ${res.totalCount} (${res.scorePercent}%)
              </div>
            </div>
            ${res.passed ? `
              <div style="border-left: 2px solid var(--ha-border); padding-left: 16px; text-align: left;">
                <div style="font-size: 0.8rem; font-weight: 800; color: var(--ha-gold-dark); text-transform: uppercase;">REWARD EARNED</div>
                <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-gold-dark);">+50 XP</div>
              </div>
            ` : ""}
          </div>

          <!-- Buttons -->
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-outline" id="btn-retake-quiz" style="display: inline-flex; align-items: center; gap: 8px;">
              ${refreshIcon(16)} Retake Quiz (Fresh Questions)
            </button>
            <button class="btn btn-secondary" id="btn-result-activities" style="display: inline-flex; align-items: center; gap: 8px;">
              ${gamepadIcon(16)} Play Topic Activities
            </button>
            <button class="btn btn-primary" id="btn-result-fulltest" style="background: var(--ha-navy); display: inline-flex; align-items: center; gap: 8px;">
              ${graduationCapIcon(16)} Take Full Grammar Test
            </button>
            <button class="btn btn-outline" id="btn-finish-topic">
              All Topics \u2192
            </button>
          </div>
        </div>

        <!-- Mistake / Question Breakdown -->
        <div class="ha-card" style="padding: 28px;">
          <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 18px;">
            Question Breakdown
          </h3>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${res.answers.map((ans, idx) => `
              <div style="padding: 14px 18px; border-radius: var(--radius-md); border: 1.5px solid ${ans.isCorrect ? "var(--ha-success)" : "var(--ha-red)"}; background: ${ans.isCorrect ? "var(--ha-success-bg)" : "var(--ha-red-light)"};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: var(--ha-navy); font-size: 0.95rem;">Q${idx + 1}: ${ans.question}</strong>
                  <span style="font-size: 0.8rem; font-weight: 800; color: ${ans.isCorrect ? "var(--ha-success)" : "var(--ha-red)"}; display: inline-flex; align-items: center; gap: 4px;">
                    ${ans.isCorrect ? `${checkCircleIcon(14)} CORRECT` : `${infoIcon(14)} INCORRECT`}
                  </span>
                </div>
                <div style="font-size: 0.85rem; margin-bottom: 4px;">
                  Your answer: <strong>${ans.chosen}</strong>
                  ${!ans.isCorrect ? ` \u2022 Correct answer: <strong style="color: var(--ha-navy);">${ans.correctText}</strong>` : ""}
                </div>
                ${ans.explanation ? `<div style="font-size: 0.82rem; opacity: 0.85; font-style: italic; display: flex; align-items: flex-start; gap: 6px; margin-top: 4px;">${infoIcon(13)} <span>${ans.explanation}</span></div>` : ""}
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    `;
      container.querySelector("#btn-retake-quiz")?.addEventListener("click", () => {
        sound.playClick();
        initQuizQuestions();
        currentStep = "quiz";
        render();
        window.scrollTo(0, 0);
      });
      container.querySelector("#btn-result-activities")?.addEventListener("click", () => {
        sound.playClick();
        if (onNavigate) {
          onNavigate("activities");
          window.dispatchEvent(new CustomEvent("ha:open-activity", {
            detail: { topicId: selectedTopic.id }
          }));
        }
      });
      container.querySelector("#btn-result-fulltest")?.addEventListener("click", () => {
        sound.playClick();
        if (onNavigate) onNavigate("full-test");
      });
      container.querySelector("#btn-finish-topic")?.addEventListener("click", () => {
        sound.playClick();
        selectedTopic = null;
        render();
        window.scrollTo(0, 0);
      });
    }
    render();
  }

  // js/data/games-data.js
  var SCRAMBLE_WORDS = [
    { word: "BEAUTIFUL", hint: "Pleasing to look at; opposite of ugly", category: "Adjectives", icon: "\u{1F338}" },
    { word: "WHOSE", hint: "Question word asking about ownership", category: "Whose", icon: "\u{1F392}" },
    { word: "GENITIVE", hint: "The grammar form using apostrophe s to show possession", category: "Genitive 's", icon: "\u{1F3F7}\uFE0F" },
    { word: "POSSESSIVE", hint: "Adjectives like my, your, his, her, our, their", category: "Possessives", icon: "\u{1F91D}" },
    { word: "YELLOW", hint: "One of the Home Academy brand colors", category: "Colors", icon: "\u{1F7E1}" },
    { word: "QUESTION", hint: "Sentence starting with What, Who, Where, When, Why, How", category: "Questions", icon: "\u2753" },
    { word: "FAST", hint: "Opposite of slow; high speed", category: "Adjectives", icon: "\u{1F3CE}\uFE0F" },
    { word: "YOUNG", hint: "Opposite of old; early in life", category: "Adjectives", icon: "\u{1F9D2}" },
    { word: "SMALL", hint: "Opposite of big; little in size", category: "Adjectives", icon: "\u{1F42D}" },
    { word: "COLD", hint: "Opposite of hot; low temperature", category: "Adjectives", icon: "\u2744\uFE0F" },
    { word: "WHERE", hint: "Question word asking about place or location", category: "Questions", icon: "\u{1F4CD}" },
    { word: "THEIR", hint: "Belonging to them (possessive adjective)", category: "Possessives", icon: "\u{1F465}" },
    { word: "COULD", hint: "Polite modal verb for respectful requests", category: "Could Requests", icon: "\u{1F91D}" },
    { word: "POLITE", hint: "Showing respectful and courteous behavior", category: "Could Requests", icon: "\u{1F64F}" },
    { word: "PRICE", hint: "The cost of an item asked with How Much", category: "How Much", icon: "\u{1F3F7}\uFE0F" },
    { word: "PLURAL", hint: "More than one item (uses How much are)", category: "How Much", icon: "\u{1F45F}" }
  ];
  var MATCH_PAIRS = [
    { word: "BIG", emoji: "\u{1F418}", label: "Opposite of Small" },
    { word: "SMALL", emoji: "\u{1F42D}", label: "Opposite of Big" },
    { word: "HOT", emoji: "\u{1F525}", label: "Opposite of Cold" },
    { word: "COLD", emoji: "\u2744\uFE0F", label: "Opposite of Hot" },
    { word: "FAST", emoji: "\u{1F3CE}\uFE0F", label: "Opposite of Slow" },
    { word: "SLOW", emoji: "\u{1F422}", label: "Opposite of Fast" },
    { word: "TALL", emoji: "\u{1F992}", label: "Opposite of Short" },
    { word: "SHORT", emoji: "\u{1FA91}", label: "Opposite of Tall" }
  ];
  var SENTENCE_BUILDER_DATA = [
    {
      id: "sb1",
      tokens: ["Whose", "bag", "is", "this?"],
      scrambled: ["is", "bag", "Whose", "this?"],
      translation: "Asking about ownership",
      hint: 'Starts with "Whose" and ends with "this?"'
    },
    {
      id: "sb2",
      tokens: ["It", "is", "Tom's", "bag."],
      scrambled: ["Tom's", "bag.", "It", "is"],
      translation: "Answering with Genitive 's",
      hint: 'Starts with "It"'
    },
    {
      id: "sb3",
      tokens: ["What", "color", "is", "Tom's", "car?"],
      scrambled: ["Tom's", "What", "is", "color", "car?"],
      translation: "Asking color of possession",
      hint: 'Starts with "What color"'
    },
    {
      id: "sb4",
      tokens: ["Tom's", "car", "is", "red."],
      scrambled: ["is", "red.", "car", "Tom's"],
      translation: "Answering color with Genitive 's",
      hint: `Starts with "Tom's"`
    },
    {
      id: "sb5",
      tokens: ["This", "is", "my", "new", "book."],
      scrambled: ["new", "is", "book.", "This", "my"],
      translation: "Possessive adjective + Adjective",
      hint: 'Starts with "This"'
    },
    {
      id: "sb6",
      tokens: ["Where", "is", "Sara's", "notebook?"],
      scrambled: ["notebook?", "is", "Where", "Sara's"],
      translation: "Wh- question + Genitive 's",
      hint: 'Starts with "Where"'
    },
    {
      id: "sb7",
      tokens: ["She", "cleaned", "her", "beautiful", "room."],
      scrambled: ["beautiful", "her", "She", "room.", "cleaned"],
      translation: 'Possessive "her" + Adjective',
      hint: 'Starts with "She"'
    },
    {
      id: "sb8",
      tokens: ["We", "love", "our", "English", "class."],
      scrambled: ["English", "our", "class.", "We", "love"],
      translation: 'Possessive "our" with class',
      hint: 'Starts with "We"'
    },
    {
      id: "sb9",
      tokens: ["Could", "you", "please", "open", "the", "door?"],
      scrambled: ["door?", "open", "Could", "the", "you", "please"],
      translation: "Polite request with Could you",
      hint: 'Starts with "Could you please"'
    },
    {
      id: "sb10",
      tokens: ["Could", "you", "pass", "the", "phone,", "please?"],
      scrambled: ["phone,", "Could", "the", "pass", "please?", "you"],
      translation: "Polite request with please at the end",
      hint: 'Starts with "Could you pass"'
    },
    {
      id: "sb11",
      tokens: ["How", "much", "is", "this", "phone?"],
      scrambled: ["phone?", "is", "How", "this", "much"],
      translation: "Singular price question (1 item)",
      hint: 'Starts with "How much is"'
    },
    {
      id: "sb12",
      tokens: ["How", "much", "are", "these", "shoes?"],
      scrambled: ["shoes?", "are", "How", "these", "much"],
      translation: "Plural price question (2+ items)",
      hint: 'Starts with "How much are"'
    }
  ];
  var TRUE_FALSE_DATA = [
    {
      statement: '"Small" is the opposite of "big".',
      isTrue: true,
      explanation: "Big and small are direct antonyms."
    },
    {
      statement: 'In English, we say "a car red" instead of "a red car".',
      isTrue: false,
      explanation: 'Adjectives go BEFORE the noun in English: "a red car".'
    },
    {
      statement: `"Tom's bag" means the bag belongs to Tom.`,
      isTrue: true,
      explanation: "The Genitive 's shows ownership."
    },
    {
      statement: '"Who" is used to ask about places and locations.',
      isTrue: false,
      explanation: '"Where" asks about places. "Who" asks about people!'
    },
    {
      statement: '"Whose" asks who owns an object.',
      isTrue: true,
      explanation: `Example: "Whose book is this? - It is Sara's book."`
    },
    {
      statement: '"Their" is the possessive adjective for "They".',
      isTrue: true,
      explanation: 'They -> their (e.g. "their house").'
    },
    {
      statement: `"Its" (possessive) has an apostrophe like "it's".`,
      isTrue: false,
      explanation: `"Its" has no apostrophe! "It's" means "it is".`
    },
    {
      statement: `To ask the color of Ali's car, we say: "What color is Ali's car?"`,
      isTrue: true,
      explanation: "Correct sentence combining What color + Genitive 's!"
    },
    {
      statement: 'After "Could you", we always use the base verb (e.g. open, help, pass).',
      isTrue: true,
      explanation: "Correct! Always use the base verb form with could (never -ing or past)."
    },
    {
      statement: '"How much are" is used when asking the price of a single phone.',
      isTrue: false,
      explanation: 'False! A single phone is singular, so we must say "How much is this phone?".'
    },
    {
      statement: 'We use "How much is" for one item and "How much are" for multiple items.',
      isTrue: true,
      explanation: 'Correct! "is" for singular (1 item), "are" for plural (2+ items).'
    }
  ];

  // js/components/games/scramble.js
  function runScrambleGame(container, onBackToHub) {
    const words = shuffleArray(SCRAMBLE_WORDS);
    let wordIndex = 0;
    let score = 0;
    function renderRound() {
      if (wordIndex >= words.length) {
        sound.playLevelUp();
        fireConfetti(3e3);
        stateManager.addXP(50, "game_scramble");
        stateManager.recordActivityStats("gamesPlayed", 1);
        container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">\u{1F3C6}</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Scramble Champion!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You solved all scrambled words and earned <strong>+50 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="scramble-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
        container.querySelector("#scramble-back-hub")?.addEventListener("click", onBackToHub);
        return;
      }
      const item = words[wordIndex];
      const targetWord = item.word.toUpperCase();
      let letters = shuffleArray(targetWord.split(""));
      if (letters.join("") === targetWord && letters.length > 2) {
        letters.reverse();
      }
      let currentInput = [];
      let availableTiles = letters.map((l, idx) => ({ id: idx, letter: l, used: false }));
      container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="scramble-exit-btn">\u2190 Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">\u26A1 XP: +${score}</span>
            <span class="score-chip">Word ${wordIndex + 1} of ${words.length}</span>
          </div>
        </div>

        <div class="scramble-box">
          <div style="font-size: 3rem; margin-bottom: 8px;">${item.icon}</div>
          <div class="scramble-hint-pill">
            <span>\u{1F4A1}</span> Hint: ${item.hint} (${item.category})
          </div>

          <div class="scramble-slots" id="scramble-slots-row">
            ${Array.from({ length: targetWord.length }).map((_, i) => `
              <div class="scramble-slot" data-slot="${i}"></div>
            `).join("")}
          </div>

          <div class="scramble-letters-pool" id="scramble-pool">
            ${availableTiles.map((t) => `
              <button class="letter-tile-btn" data-tile-id="${t.id}">${t.letter}</button>
            `).join("")}
          </div>

          <div class="scramble-controls">
            <button class="btn btn-outline btn-sm" id="scramble-backspace-btn">\u232B Delete</button>
            <button class="btn btn-outline btn-sm" id="scramble-reset-btn">\u{1F504} Clear</button>
            <button class="btn btn-primary" id="scramble-check-btn" disabled>Check Word \u2192</button>
          </div>

          <div id="scramble-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;
      const slotsRow = container.querySelector("#scramble-slots-row");
      const pool = container.querySelector("#scramble-pool");
      const checkBtn = container.querySelector("#scramble-check-btn");
      const feedback = container.querySelector("#scramble-feedback");
      function updateSlots() {
        const slots = slotsRow.querySelectorAll(".scramble-slot");
        slots.forEach((slot, idx) => {
          if (idx < currentInput.length) {
            slot.textContent = currentInput[idx].letter;
            slot.classList.add("filled");
          } else {
            slot.textContent = "";
            slot.classList.remove("filled");
          }
        });
        checkBtn.disabled = currentInput.length !== targetWord.length;
      }
      container.querySelectorAll(".letter-tile-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tileId = Number(btn.dataset.tileId);
          const tile = availableTiles.find((t) => t.id === tileId);
          if (tile && !tile.used) {
            tile.used = true;
            btn.disabled = true;
            currentInput.push(tile);
            sound.playClick();
            updateSlots();
          }
        });
      });
      container.querySelector("#scramble-backspace-btn")?.addEventListener("click", () => {
        if (currentInput.length > 0) {
          const lastTile = currentInput.pop();
          lastTile.used = false;
          const btn = pool.querySelector(`[data-tile-id="${lastTile.id}"]`);
          if (btn) btn.disabled = false;
          sound.playClick();
          updateSlots();
        }
      });
      container.querySelector("#scramble-reset-btn")?.addEventListener("click", () => {
        currentInput = [];
        availableTiles.forEach((t) => t.used = false);
        pool.querySelectorAll(".letter-tile-btn").forEach((b) => b.disabled = false);
        sound.playClick();
        updateSlots();
      });
      checkBtn.addEventListener("click", () => {
        const formedWord = currentInput.map((t) => t.letter).join("");
        if (formedWord === targetWord) {
          sound.playCorrect();
          score += 20;
          stateManager.addXP(20, "scramble_correct");
          stateManager.recordActivityStats("correctAnswers", 1);
          feedback.className = "quiz-feedback-banner correct";
          feedback.textContent = getRandomFeedback(true) + ` "${targetWord}" is correct! (+20 XP)`;
          feedback.style.display = "block";
          setTimeout(() => {
            wordIndex++;
            renderRound();
          }, 1300);
        } else {
          sound.playWrong();
          feedback.className = "quiz-feedback-banner wrong";
          feedback.textContent = getRandomFeedback(false) + ` That spelled "${formedWord}". Try again!`;
          feedback.style.display = "block";
        }
      });
      container.querySelector("#scramble-exit-btn")?.addEventListener("click", onBackToHub);
    }
    renderRound();
  }

  // js/components/games/match.js
  function runMatchGame(container, onBackToHub) {
    const sample = shuffleArray(MATCH_PAIRS).slice(0, 6);
    const cards = [];
    sample.forEach((item, idx) => {
      cards.push({
        id: `word_${idx}`,
        matchKey: item.word,
        type: "word",
        content: item.word,
        emoji: null
      });
      cards.push({
        id: `emoji_${idx}`,
        matchKey: item.word,
        type: "emoji",
        content: null,
        emoji: item.emoji
      });
    });
    const shuffledCards = shuffleArray(cards);
    let flippedCards = [];
    let matchedKeys = /* @__PURE__ */ new Set();
    let score = 0;
    container.innerHTML = `
    <div class="container game-zone-container">
      <div class="game-header-bar">
        <button class="game-back-btn" id="match-exit-btn">\u2190 Back to Hub</button>
        <div class="game-score-tracker">
          <span class="score-chip xp">\u26A1 Score: +${score} XP</span>
          <span class="score-chip" id="pairs-left-chip">Pairs: 0 / ${sample.length}</span>
        </div>
      </div>

      <div class="ha-card" style="padding: 24px; text-align: center; margin-bottom: 20px;">
        <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 6px;">Word & Picture Match</h2>
        <p style="font-size: 0.9rem; color: var(--ha-text-muted);">
          Match the English word card to its matching picture!
        </p>

        <div class="match-grid" id="match-cards-grid">
          ${shuffledCards.map((card, i) => `
            <div class="match-card" data-index="${i}" data-key="${card.matchKey}" data-type="${card.type}">
              <div class="match-card-inner">
                <div class="match-card-front">
                  <span class="card-logo-mini">\u{1F393}</span>
                  <span style="font-size: 0.75rem; font-weight: 700; margin-top: 4px;">HOME</span>
                </div>
                <div class="match-card-back">
                  <div class="match-card-content">
                    ${card.type === "emoji" ? `<span class="match-emoji">${card.emoji}</span>` : `<span class="match-word">${card.content}</span>`}
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
    const grid = container.querySelector("#match-cards-grid");
    const pairsChip = container.querySelector("#pairs-left-chip");
    grid.querySelectorAll(".match-card").forEach((cardEl) => {
      cardEl.addEventListener("click", () => {
        if (cardEl.classList.contains("flipped") || cardEl.classList.contains("matched") || flippedCards.length >= 2) {
          return;
        }
        sound.playClick();
        cardEl.classList.add("flipped");
        flippedCards.push(cardEl);
        if (flippedCards.length === 2) {
          const [first, second] = flippedCards;
          const key1 = first.dataset.key;
          const key2 = second.dataset.key;
          if (key1 === key2) {
            sound.playCorrect();
            matchedKeys.add(key1);
            score += 15;
            stateManager.addXP(15, "match_pair");
            stateManager.recordActivityStats("correctAnswers", 1);
            first.classList.add("matched");
            second.classList.add("matched");
            flippedCards = [];
            pairsChip.textContent = `Pairs: ${matchedKeys.size} / ${sample.length}`;
            if (matchedKeys.size === sample.length) {
              sound.playLevelUp();
              fireConfetti(3500);
              stateManager.addXP(50, "match_perfect");
              stateManager.recordActivityStats("gamesPlayed", 1);
              setTimeout(() => {
                container.innerHTML = `
                <div class="container game-zone-container" style="text-align: center;">
                  <div class="ha-card" style="padding: 40px 24px;">
                    <span style="font-size: 4rem;">\u{1F389}</span>
                    <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">All Pairs Matched!</h2>
                    <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
                      Fantastic memory! You matched all words and earned <strong>+50 Bonus XP</strong>!
                    </p>
                    <button class="btn btn-primary" id="match-again-btn">Play Again</button>
                    <button class="btn btn-outline" id="match-done-hub-btn" style="margin-left: 10px;">Return to Hub</button>
                  </div>
                </div>
              `;
                container.querySelector("#match-again-btn")?.addEventListener("click", () => runMatchGame(container, onBackToHub));
                container.querySelector("#match-done-hub-btn")?.addEventListener("click", onBackToHub);
              }, 800);
            }
          } else {
            sound.playWrong();
            setTimeout(() => {
              first.classList.remove("flipped");
              second.classList.remove("flipped");
              flippedCards = [];
            }, 900);
          }
        }
      });
    });
    container.querySelector("#match-exit-btn")?.addEventListener("click", onBackToHub);
  }

  // js/data/questions.js
  var QUESTIONS_DATABASE = [
    {
      id: "q1",
      question: 'What is the opposite of "hot"?',
      options: ["Cold", "Warm", "Bright", "Fast"],
      correctAnswer: "Cold",
      category: "Vocabulary",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Ice is cold, but the sun is hot!"
    },
    {
      id: "q2",
      question: 'Complete the sentence: "My name ______ Ali."',
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: '"My name is" is how we introduce ourselves.'
    },
    {
      id: "q3",
      question: "Which of these is a fruit?",
      options: ["Apple", "Chair", "Pencil", "Shoe"],
      correctAnswer: "Apple",
      category: "Vocabulary",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Apples grow on trees and are super healthy."
    },
    {
      id: "q4",
      question: "How do you say goodbye to a friend?",
      options: ["See you later!", "Good morning", "Thank you", "Excuse me"],
      correctAnswer: "See you later!",
      category: "Conversations",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: '"Bye" or "See you later" are friendly goodbyes.'
    },
    {
      id: "q5",
      question: "What color do you get when you mix blue and yellow?",
      options: ["Green", "Red", "Black", "White"],
      correctAnswer: "Green",
      category: "General",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Grass is green!"
    },
    {
      id: "q6",
      question: 'Choose the correct word: "I ______ to school by bus."',
      options: ["go", "goes", "going", "gone"],
      correctAnswer: "go",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: 'We say "I go", but "He goes".'
    },
    {
      id: "q7",
      question: "What do you use to write in your notebook?",
      options: ["Pen", "Spoon", "Car", "Shoe"],
      correctAnswer: "Pen",
      category: "School",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Home Academy logo has a pencil right in the center!"
    },
    {
      id: "q8",
      question: "Which day comes right after Tuesday?",
      options: ["Wednesday", "Monday", "Friday", "Saturday"],
      correctAnswer: "Wednesday",
      category: "Days & Time",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Wednesday is right in the middle of the week."
    },
    {
      id: "q9",
      question: 'Complete: "She is ______ sister."',
      options: ["my", "me", "mine", "I"],
      correctAnswer: "my",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: '"My" is a possessive word showing relation.'
    },
    {
      id: "q10",
      question: "How many days are there in one week?",
      options: ["Seven", "Five", "Ten", "Twelve"],
      correctAnswer: "Seven",
      category: "Numbers",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "7 days = 1 full week!"
    },
    {
      id: "q11",
      question: "What do you say when someone gives you a gift?",
      options: ["Thank you!", "Sorry", "Hello", "Good night"],
      correctAnswer: "Thank you!",
      category: "Conversations",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Politeness makes everyone smile."
    },
    {
      id: "q12",
      question: 'Which animal says "Woof"?',
      options: ["Dog", "Cat", "Duck", "Cow"],
      correctAnswer: "Dog",
      category: "Animals",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Dogs are loyal pets."
    },
    {
      id: "q13",
      question: 'Complete: "This is ______ orange."',
      options: ["an", "a", "two", "many"],
      correctAnswer: "an",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: 'Use "an" before vowel sounds: a, e, i, o, u.'
    },
    {
      id: "q14",
      question: "Where do you sleep at night?",
      options: ["In bed", "In the kitchen", "In the car", "On the roof"],
      correctAnswer: "In bed",
      category: "Home",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "A cozy bed gives you good rest."
    },
    {
      id: "q15",
      question: "Which one is a drink?",
      options: ["Milk", "Pizza", "Cake", "Bread"],
      correctAnswer: "Milk",
      category: "Food",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Milk has calcium for strong bones."
    },
    {
      id: "q16",
      question: 'Complete: "He ______ football on Sundays."',
      options: ["plays", "play", "playing", "player"],
      correctAnswer: "plays",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Add -s for he/she/it in simple present."
    },
    {
      id: "q17",
      question: "What do you wear on your head when it is sunny?",
      options: ["Hat", "Socks", "Gloves", "Belt"],
      correctAnswer: "Hat",
      category: "Clothes",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Hats keep your head cool."
    },
    {
      id: "q18",
      question: "What time of day do you eat breakfast?",
      options: ["Morning", "Night", "Midnight", "Evening"],
      correctAnswer: "Morning",
      category: "Daily Activities",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Breakfast is the first meal of the day."
    },
    {
      id: "q19",
      question: 'Choose the correct plural: "one book, two ______."',
      options: ["books", "bookes", "book", "bookies"],
      correctAnswer: "books",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Just add -s to make most words plural."
    },
    {
      id: "q20",
      question: "What color is a ripe banana?",
      options: ["Yellow", "Blue", "Purple", "Grey"],
      correctAnswer: "Yellow",
      category: "Colors",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: "Yellow is one of Home Academy logo colors!"
    },
    {
      id: "q21",
      question: 'Complete the polite request: "Could you please ______ the door?"',
      options: ["open", "opening", "opened", "opens"],
      correctAnswer: "open",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: 'Always use the base verb after "Could you"!'
    },
    {
      id: "q22",
      question: 'Asking price for ONE item: "How much ______ this bag?"',
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: 'Use "is" for one item (singular)!'
    },
    {
      id: "q23",
      question: 'Asking price for multiple items: "How much ______ these shoes?"',
      options: ["are", "is", "am", "be"],
      correctAnswer: "are",
      category: "Grammar",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: 'Use "are" for plural items (shoes, books)!'
    },
    {
      id: "q24",
      question: 'Complete the polite question: "Could you pass the phone, ______?"',
      options: ["please", "thank", "sorry", "welcome"],
      correctAnswer: "please",
      category: "Conversations",
      difficulty: "Beginner",
      xpReward: 10,
      funFact: '"Please" makes requests extra polite.'
    }
  ];
  var PICTURE_QUIZ_QUESTIONS = [
    {
      id: "pq1",
      imageEmoji: "\u{1F34E}",
      question: "What is this fresh fruit?",
      options: ["Apple", "Banana", "Carrot", "Potato"],
      correctAnswer: "Apple",
      hint: "It is round, sweet, and usually red or green."
    },
    {
      id: "pq2",
      imageEmoji: "\u{1F697}",
      question: "What vehicle is this?",
      options: ["Car", "Bicycle", "Airplane", "Boat"],
      correctAnswer: "Car",
      hint: "It has four wheels and an engine."
    },
    {
      id: "pq3",
      imageEmoji: "\u{1F4D6}",
      question: "What object is this?",
      options: ["Book", "Clock", "Door", "Bed"],
      correctAnswer: "Book",
      hint: "You open it to read stories and learn English."
    },
    {
      id: "pq4",
      imageEmoji: "\u{1F431}",
      question: "What pet animal is this?",
      options: ["Cat", "Dog", "Elephant", "Horse"],
      correctAnswer: "Cat",
      hint: "It loves milk and says meow."
    },
    {
      id: "pq5",
      imageEmoji: "\u270F\uFE0F",
      question: "What study tool is this?",
      options: ["Pencil", "Ruler", "Backpack", "Eraser"],
      correctAnswer: "Pencil",
      hint: "It is used for writing and is on the Home Academy logo!"
    },
    {
      id: "pq6",
      imageEmoji: "\u{1F3EB}",
      question: "What place is this?",
      options: ["School", "Supermarket", "Airport", "Zoo"],
      correctAnswer: "School",
      hint: "Students go here to study with their teachers."
    },
    {
      id: "pq7",
      imageEmoji: "\u2600\uFE0F",
      question: "What shines bright in the sky?",
      options: ["Sun", "Moon", "Cloud", "Rain"],
      correctAnswer: "Sun",
      hint: "It gives us light and warm daylight."
    },
    {
      id: "pq8",
      imageEmoji: "\u{1F45F}",
      question: "What do you wear on your feet?",
      options: ["Shoes", "Shirt", "Hat", "Glasses"],
      correctAnswer: "Shoes",
      hint: "You tie the laces before running."
    },
    {
      id: "pq9",
      imageEmoji: "\u{1F6AA}",
      question: 'What do you politely ask to open? ("Could you please open the ______?")',
      options: ["Door", "Pencil", "Chair", "Shoe"],
      correctAnswer: "Door",
      hint: "You open it to enter the English classroom."
    },
    {
      id: "pq10",
      imageEmoji: "\u{1F3F7}\uFE0F",
      question: "What do we ask when we want to know the price of this item?",
      options: ["How much is it?", "Where are you going?", "What time is it?", "Who is he?"],
      correctAnswer: "How much is it?",
      hint: 'We use "How much" to ask about price or cost.'
    }
  ];

  // js/components/games/pictureQuiz.js
  function runPictureQuizGame(container, onBackToHub) {
    const questions = shuffleArray(PICTURE_QUIZ_QUESTIONS);
    let currentIndex = 0;
    let score = 0;
    function renderQuestion() {
      if (currentIndex >= questions.length) {
        sound.playLevelUp();
        fireConfetti(3e3);
        stateManager.addXP(40, "picture_quiz_complete");
        stateManager.recordActivityStats("gamesPlayed", 1);
        container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">\u{1F5BC}\uFE0F</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Picture Quiz Completed!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You identified every picture accurately and earned <strong>+40 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="pq-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
        container.querySelector("#pq-back-hub")?.addEventListener("click", onBackToHub);
        return;
      }
      const q = questions[currentIndex];
      const randomizedOptions = shuffleArray(q.options);
      container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="pq-exit-btn">\u2190 Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">\u26A1 XP: +${score}</span>
            <span class="score-chip">Question ${currentIndex + 1} of ${questions.length}</span>
          </div>
        </div>

        <div class="pic-quiz-wrapper">
          <div class="pic-quiz-display">
            <div class="pic-quiz-emoji">${q.imageEmoji}</div>
            <h2 class="pic-quiz-prompt">${q.question}</h2>
            <p class="pic-quiz-hint">\u{1F4A1} Hint: ${q.hint}</p>
          </div>

          <div class="pic-quiz-options-grid" id="pq-options-box">
            ${randomizedOptions.map((opt) => `
              <button class="quiz-option-btn" data-answer="${opt}">${opt}</button>
            `).join("")}
          </div>

          <div id="pq-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;
      const optionsBox = container.querySelector("#pq-options-box");
      const feedback = container.querySelector("#pq-feedback");
      optionsBox.querySelectorAll(".quiz-option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosen = btn.dataset.answer;
          const isCorrect = chosen === q.correctAnswer;
          optionsBox.querySelectorAll(".quiz-option-btn").forEach((b) => b.disabled = true);
          if (isCorrect) {
            sound.playCorrect();
            btn.classList.add("correct");
            score += 15;
            stateManager.addXP(15, "picture_quiz_answer");
            stateManager.recordActivityStats("correctAnswers", 1);
            feedback.className = "quiz-feedback-banner correct";
            feedback.textContent = getRandomFeedback(true) + ` That is a ${q.correctAnswer}! (+15 XP)`;
            feedback.style.display = "block";
            setTimeout(() => {
              currentIndex++;
              renderQuestion();
            }, 1300);
          } else {
            sound.playWrong();
            btn.classList.add("wrong");
            optionsBox.querySelectorAll(".quiz-option-btn").forEach((b) => {
              if (b.dataset.answer === q.correctAnswer) b.classList.add("correct");
            });
            feedback.className = "quiz-feedback-banner wrong";
            feedback.textContent = getRandomFeedback(false) + ` It is a ${q.correctAnswer}!`;
            feedback.style.display = "block";
            setTimeout(() => {
              currentIndex++;
              renderQuestion();
            }, 1800);
          }
        });
      });
      container.querySelector("#pq-exit-btn")?.addEventListener("click", onBackToHub);
    }
    renderQuestion();
  }

  // js/components/games/sentenceBuilder.js
  function runSentenceBuilderGame(container, onBackToHub) {
    const sentences = shuffleArray(SENTENCE_BUILDER_DATA);
    let currentIndex = 0;
    let score = 0;
    function renderSentence() {
      if (currentIndex >= sentences.length) {
        sound.playLevelUp();
        fireConfetti(3e3);
        stateManager.addXP(60, "sentence_builder_complete");
        stateManager.recordActivityStats("gamesPlayed", 1);
        container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">\u270D\uFE0F</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">Sentence Master!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You arranged all beginner English sentences properly! +60 XP earned!
            </p>
            <button class="btn btn-primary" id="sb-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
        container.querySelector("#sb-back-hub")?.addEventListener("click", onBackToHub);
        return;
      }
      const item = sentences[currentIndex];
      const targetSentence = item.tokens.join(" ");
      let availableTokens = shuffleArray(item.tokens).map((tok, id) => ({ id, text: tok, used: false }));
      let assembledTokens = [];
      container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="sb-exit-btn">\u2190 Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">\u26A1 Score: +${score} XP</span>
            <span class="score-chip">Sentence ${currentIndex + 1} of ${sentences.length}</span>
          </div>
        </div>

        <div class="ha-card" style="padding: 36px 24px; text-align: center;">
          <span class="badge badge-navy" style="margin-bottom: 12px;">Sentence Builder</span>
          <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 6px;">Arrange the Words in Order</h2>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 20px;">
            \u{1F4A1} Hint: ${item.hint}
          </p>

          <div class="sb-target-zone" id="sb-target-area">
            <span style="color: var(--ha-text-muted); font-size: 0.95rem; font-style: italic;" id="sb-empty-prompt">
              Tap words below to build the sentence
            </span>
          </div>

          <div class="word-chip-bank" id="sb-bank">
            ${availableTokens.map((tok) => `
              <button class="word-chip" data-token-id="${tok.id}">${tok.text}</button>
            `).join("")}
          </div>

          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" id="sb-read-btn">
              <span>\u{1F50A}</span> Listen
            </button>
            <button class="btn btn-outline btn-sm" id="sb-clear-btn">
              <span>\u{1F504}</span> Clear
            </button>
            <button class="btn btn-primary" id="sb-check-btn" disabled>
              Check Sentence \u2192
            </button>
          </div>

          <div id="sb-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;
      const targetArea = container.querySelector("#sb-target-area");
      const bank = container.querySelector("#sb-bank");
      const checkBtn = container.querySelector("#sb-check-btn");
      const feedback = container.querySelector("#sb-feedback");
      const emptyPrompt = container.querySelector("#sb-empty-prompt");
      function updateUI() {
        targetArea.innerHTML = "";
        if (assembledTokens.length === 0) {
          targetArea.appendChild(emptyPrompt);
        } else {
          assembledTokens.forEach((tok) => {
            const chip = document.createElement("button");
            chip.className = "word-chip";
            chip.textContent = tok.text;
            chip.style.backgroundColor = "var(--ha-navy)";
            chip.style.color = "#FFFFFF";
            chip.title = "Click to remove";
            chip.addEventListener("click", () => {
              assembledTokens = assembledTokens.filter((t) => t.id !== tok.id);
              tok.used = false;
              const bankBtn = bank.querySelector(`[data-token-id="${tok.id}"]`);
              if (bankBtn) bankBtn.disabled = false;
              sound.playClick();
              updateUI();
            });
            targetArea.appendChild(chip);
          });
        }
        checkBtn.disabled = assembledTokens.length !== item.tokens.length;
      }
      container.querySelectorAll(".word-chip").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tokenId = Number(btn.dataset.tokenId);
          const tok = availableTokens.find((t) => t.id === tokenId);
          if (tok && !tok.used) {
            tok.used = true;
            btn.disabled = true;
            assembledTokens.push(tok);
            sound.playClick();
            updateUI();
          }
        });
      });
      container.querySelector("#sb-read-btn")?.addEventListener("click", () => {
        sound.speak(targetSentence);
      });
      container.querySelector("#sb-clear-btn")?.addEventListener("click", () => {
        assembledTokens = [];
        availableTokens.forEach((t) => t.used = false);
        bank.querySelectorAll(".word-chip").forEach((b) => b.disabled = false);
        sound.playClick();
        updateUI();
      });
      checkBtn.addEventListener("click", () => {
        const built = assembledTokens.map((t) => t.text).join(" ");
        if (built === targetSentence) {
          sound.playCorrect();
          score += 25;
          stateManager.addXP(25, "sentence_builder");
          stateManager.recordActivityStats("correctAnswers", 1);
          feedback.className = "quiz-feedback-banner correct";
          feedback.textContent = getRandomFeedback(true) + ` "${targetSentence}" (+25 XP)`;
          feedback.style.display = "block";
          setTimeout(() => {
            currentIndex++;
            renderSentence();
          }, 1400);
        } else {
          sound.playWrong();
          feedback.className = "quiz-feedback-banner wrong";
          feedback.textContent = getRandomFeedback(false) + ` Check the word order and try again!`;
          feedback.style.display = "block";
        }
      });
      container.querySelector("#sb-exit-btn")?.addEventListener("click", onBackToHub);
    }
    renderSentence();
  }

  // js/components/games/speedRound.js
  function runSpeedRoundGame(container, onBackToHub) {
    let timeLeft = 30;
    let timerInterval = null;
    let correctCount = 0;
    let totalAnswered = 0;
    const questions = shuffleArray(QUESTIONS_DATABASE);
    let qIndex = 0;
    container.innerHTML = `
    <div class="container game-zone-container">
      <div class="game-header-bar">
        <button class="game-back-btn" id="speed-exit-btn">\u2190 Quit Round</button>
        <div class="game-score-tracker">
          <span class="score-chip streak" id="speed-timer-badge">\u23F1\uFE0F 30s remaining</span>
          <span class="score-chip xp" id="speed-score-badge">Score: 0</span>
        </div>
      </div>

      <div class="speed-timer-bar">
        <div class="speed-timer-fill" id="speed-bar-fill" style="width: 100%;"></div>
      </div>

      <div class="speed-question-box" id="speed-box">
        <div id="speed-q-container"></div>
      </div>
    </div>
  `;
    const timerBadge = container.querySelector("#speed-timer-badge");
    const scoreBadge = container.querySelector("#speed-score-badge");
    const barFill = container.querySelector("#speed-bar-fill");
    const qContainer = container.querySelector("#speed-q-container");
    function showCurrentQuestion() {
      if (qIndex >= questions.length) qIndex = 0;
      const q = questions[qIndex];
      const opts = shuffleArray(q.options);
      qContainer.innerHTML = `
      <div style="font-size: 0.85rem; font-weight: 700; color: var(--ha-red); text-transform: uppercase; margin-bottom: 8px;">
        ${q.category} \u2022 Speed Question
      </div>
      <h2 style="font-size: 1.5rem; color: var(--ha-navy); margin-bottom: 24px;">${q.question}</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 500px; margin: 0 auto;">
        ${opts.map((opt) => `
          <button class="quiz-option-btn speed-opt-btn" data-ans="${opt}" style="padding: 14px;">${opt}</button>
        `).join("")}
      </div>
    `;
      qContainer.querySelectorAll(".speed-opt-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          totalAnswered++;
          const ans = btn.dataset.ans;
          if (ans === q.correctAnswer) {
            sound.playCorrect();
            correctCount++;
            stateManager.addXP(10, "speed_round");
            stateManager.recordActivityStats("correctAnswers", 1);
            scoreBadge.textContent = `Score: ${correctCount * 10}`;
          } else {
            sound.playWrong();
          }
          qIndex++;
          showCurrentQuestion();
        });
      });
    }
    showCurrentQuestion();
    timerInterval = setInterval(() => {
      timeLeft--;
      timerBadge.textContent = `\u23F1\uFE0F ${timeLeft}s remaining`;
      const pct = timeLeft / 30 * 100;
      barFill.style.width = pct + "%";
      if (timeLeft <= 5) sound.playTick();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endRound();
      }
    }, 1e3);
    function endRound() {
      sound.playLevelUp();
      fireConfetti(3e3);
      const bonusXP = correctCount * 10;
      stateManager.recordActivityStats("gamesPlayed", 1);
      const accuracy = totalAnswered > 0 ? Math.round(correctCount / totalAnswered * 100) : 0;
      container.innerHTML = `
      <div class="container game-zone-container" style="text-align: center;">
        <div class="ha-card" style="padding: 40px 24px;">
          <span style="font-size: 4rem;">\u26A1</span>
          <h2 style="font-size: 2.2rem; color: var(--ha-navy); margin: 12px 0;">Time\u2019s Up!</h2>
          <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            You completed the 30-second rapid sprint!
          </p>

          <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
            <div class="stat-pill-card" style="min-width: 140px; text-align: center;">
              <div style="width: 100%;">
                <div class="stat-label">CORRECT</div>
                <div class="stat-value" style="color: var(--ha-success);">${correctCount} / ${totalAnswered}</div>
              </div>
            </div>
            <div class="stat-pill-card" style="min-width: 140px; text-align: center;">
              <div style="width: 100%;">
                <div class="stat-label">ACCURACY</div>
                <div class="stat-value" style="color: var(--ha-navy);">${accuracy}%</div>
              </div>
            </div>
            <div class="stat-pill-card" style="min-width: 140px; text-align: center;">
              <div style="width: 100%;">
                <div class="stat-label">XP EARNED</div>
                <div class="stat-value" style="color: var(--ha-gold-dark);">+${bonusXP} XP</div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary" id="speed-again-btn">Try Speed Round Again</button>
          <button class="btn btn-outline" id="speed-hub-btn" style="margin-left: 10px;">Return to Hub</button>
        </div>
      </div>
    `;
      container.querySelector("#speed-again-btn")?.addEventListener("click", () => runSpeedRoundGame(container, onBackToHub));
      container.querySelector("#speed-hub-btn")?.addEventListener("click", onBackToHub);
    }
    container.querySelector("#speed-exit-btn")?.addEventListener("click", () => {
      clearInterval(timerInterval);
      onBackToHub();
    });
  }

  // js/components/games/trueFalse.js
  function runTrueFalseGame(container, onBackToHub) {
    const items = shuffleArray(TRUE_FALSE_DATA);
    let index = 0;
    let score = 0;
    function renderItem() {
      if (index >= items.length) {
        sound.playLevelUp();
        fireConfetti(3e3);
        stateManager.addXP(40, "true_false_complete");
        stateManager.recordActivityStats("gamesPlayed", 1);
        container.innerHTML = `
        <div class="container game-zone-container" style="text-align: center;">
          <div class="ha-card" style="padding: 40px 24px;">
            <span style="font-size: 4rem;">\u{1F389}</span>
            <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 14px 0;">True or False Champion!</h2>
            <p style="font-size: 1.1rem; color: var(--ha-text-muted); margin-bottom: 20px;">
              You answered all statements and earned <strong>+40 Bonus XP</strong>!
            </p>
            <button class="btn btn-primary" id="tf-back-hub">Return to Game Center</button>
          </div>
        </div>
      `;
        container.querySelector("#tf-back-hub")?.addEventListener("click", onBackToHub);
        return;
      }
      const item = items[index];
      container.innerHTML = `
      <div class="container game-zone-container">
        <div class="game-header-bar">
          <button class="game-back-btn" id="tf-exit-btn">\u2190 Back to Hub</button>
          <div class="game-score-tracker">
            <span class="score-chip xp">\u26A1 Score: +${score} XP</span>
            <span class="score-chip">Statement ${index + 1} of ${items.length}</span>
          </div>
        </div>

        <div class="tf-statement-card">
          <span class="badge badge-gold" style="margin-bottom: 16px;">True or False?</span>
          <div class="tf-statement-text">"${item.statement}"</div>

          <div class="tf-buttons-row">
            <button class="btn-tf btn-tf-true" id="btn-answer-true">
              <span>\u{1F44D}</span> TRUE
            </button>
            <button class="btn-tf btn-tf-false" id="btn-answer-false">
              <span>\u{1F44E}</span> FALSE
            </button>
          </div>

          <div id="tf-feedback" style="display: none;" class="quiz-feedback-banner"></div>
        </div>
      </div>
    `;
      const feedback = container.querySelector("#tf-feedback");
      const btnTrue = container.querySelector("#btn-answer-true");
      const btnFalse = container.querySelector("#btn-answer-false");
      function handleAnswer(choice) {
        btnTrue.disabled = true;
        btnFalse.disabled = true;
        const isCorrect = choice === item.isTrue;
        if (isCorrect) {
          sound.playCorrect();
          score += 10;
          stateManager.addXP(10, "true_false_answer");
          stateManager.recordActivityStats("correctAnswers", 1);
          feedback.className = "quiz-feedback-banner correct";
          feedback.textContent = getRandomFeedback(true) + ` ${item.explanation} (+10 XP)`;
          feedback.style.display = "block";
          setTimeout(() => {
            index++;
            renderItem();
          }, 1400);
        } else {
          sound.playWrong();
          feedback.className = "quiz-feedback-banner wrong";
          feedback.textContent = getRandomFeedback(false) + ` ${item.explanation}`;
          feedback.style.display = "block";
          setTimeout(() => {
            index++;
            renderItem();
          }, 1800);
        }
      }
      btnTrue.addEventListener("click", () => handleAnswer(true));
      btnFalse.addEventListener("click", () => handleAnswer(false));
      container.querySelector("#tf-exit-btn")?.addEventListener("click", onBackToHub);
    }
    renderItem();
  }

  // js/components/gameCenter.js
  function renderGameCenter(container, onNavigate, initialGame = null) {
    function renderHub() {
      container.innerHTML = `
      <div class="container game-zone-container">
        <div style="text-align: center; margin-bottom: 36px;">
          <span class="badge badge-red" style="margin-bottom: 10px;">Play & Practice</span>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 8px;">Academy Game Center</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 600px; margin: 0 auto;">
            Compete, practice beginner English words and sentences, and earn XP to climb the class leaderboard!
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
          
          <!-- Game 1: Word Scramble -->
          <div class="ha-card game-select-card" data-game="scramble" style="cursor: pointer; border-top: 4px solid var(--ha-navy);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">\u{1F524}</span>
              <span class="badge badge-gold">+20 XP per word</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 1: Word Scramble</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Unscramble mixed-up letters to discover the hidden English word before time runs out!
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%;">Play Scramble \u2192</button>
          </div>

          <!-- Game 2: Word Match -->
          <div class="ha-card game-select-card" data-game="match" style="cursor: pointer; border-top: 4px solid var(--ha-red);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">\u{1F0CF}</span>
              <span class="badge badge-red">+30 XP Match Bonus</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 2: Word Match</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Flip cards and match beginner English words to their pictures: APPLE \u2194 \u{1F34E}, DOG \u2194 \u{1F436}!
            </p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;">Play Word Match \u2192</button>
          </div>

          <!-- Game 3: Picture Quiz -->
          <div class="ha-card game-select-card" data-game="picture" style="cursor: pointer; border-top: 4px solid var(--ha-gold);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">\u{1F5BC}\uFE0F</span>
              <span class="badge badge-gold">+15 XP per image</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 3: Picture Quiz</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Look at the picture: "What is this?" Pick the right English answer from 4 options.
            </p>
            <button class="btn btn-accent btn-sm" style="width: 100%;">Play Picture Quiz \u2192</button>
          </div>

          <!-- Game 4: Sentence Builder -->
          <div class="ha-card game-select-card" data-game="sentence" style="cursor: pointer; border-top: 4px solid var(--ha-navy);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">\u270D\uFE0F</span>
              <span class="badge badge-navy">+25 XP per sentence</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 4: Sentence Builder</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Rearrange scrambled word chips into perfect beginner sentences like "I go to school."
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%;">Play Sentence Builder \u2192</button>
          </div>

          <!-- Game 5: Speed Round -->
          <div class="ha-card game-select-card" data-game="speed" style="cursor: pointer; border-top: 4px solid var(--ha-red);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">\u26A1</span>
              <span class="badge badge-red">30-Second Rush!</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 5: Speed Round</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Fast-paced 30-second rush! Answer as many beginner questions as you can.
            </p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;">Start Speed Round \u2192</button>
          </div>

          <!-- Game 6: True or False -->
          <div class="ha-card game-select-card" data-game="truefalse" style="cursor: pointer; border-top: 4px solid var(--ha-gold);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="font-size: 2.5rem;">\u{1F914}</span>
              <span class="badge badge-gold">+10 XP Funny Drill</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Game 6: True or False</h3>
            <p style="font-size: 0.9rem; margin-bottom: 16px;">
              Test funny beginner statements: "Cats can fly." Quick, funny, and educational!
            </p>
            <button class="btn btn-accent btn-sm" style="width: 100%;">Play True or False \u2192</button>
          </div>

        </div>
      </div>
    `;
      container.querySelectorAll(".game-select-card").forEach((card) => {
        card.addEventListener("click", () => {
          sound.playClick();
          loadGame(card.dataset.game);
        });
      });
    }
    function loadGame(gameName) {
      if (gameName === "scramble") runScrambleGame(container, renderHub);
      else if (gameName === "match") runMatchGame(container, renderHub);
      else if (gameName === "picture" || gameName === "quiz") runPictureQuizGame(container, renderHub);
      else if (gameName === "sentence") runSentenceBuilderGame(container, renderHub);
      else if (gameName === "speed") runSpeedRoundGame(container, renderHub);
      else if (gameName === "truefalse") runTrueFalseGame(container, renderHub);
      else renderHub();
    }
    if (initialGame) {
      loadGame(initialGame);
    } else {
      renderHub();
    }
  }

  // js/components/leaderboard.js
  function renderLeaderboard(container, onNavigate) {
    let unsub = null;
    function renderContent() {
      if (!container.isConnected) {
        if (unsub) unsub();
        return;
      }
      const currentStudent = stateManager.getCurrentStudent();
      const students = stateManager.getLeaderboard();
      if (students.length === 0) {
        container.innerHTML = `
        <div class="container" style="padding-top: 40px; padding-bottom: 60px; max-width: 680px; text-align: center;">
          <div class="ha-card" style="padding: 48px 32px; border-top: 6px solid var(--ha-gold);">
            <span style="font-size: 4rem; display: inline-block; margin-bottom: 12px;">\u{1F3C6}</span>
            <h1 style="font-size: 2rem; color: var(--ha-navy); margin-bottom: 8px;">Classroom Leaderboard</h1>
            <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
              No students have joined yet.
            </p>
            <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 28px;">
              <p style="font-size: 0.95rem; color: var(--ha-navy); font-weight: 600; margin-bottom: 6px;">
                Be the first student to join <strong>${stateManager.state.classInfo.name}</strong>!
              </p>
              <div style="font-size: 0.88rem; color: var(--ha-text-muted);">
                Use Class Code: <strong>${stateManager.state.classInfo.code}</strong> and claim the #1 spot!
              </div>
            </div>
            <button class="btn btn-primary btn-lg" id="btn-leaderboard-join">
              <span>\u{1F3EB}</span> Join Class Now
            </button>
          </div>
        </div>
      `;
        container.querySelector("#btn-leaderboard-join")?.addEventListener("click", () => {
          sound.playClick();
          window.dispatchEvent(new CustomEvent("ha:open-join-modal"));
        });
        return;
      }
      const rankInfo = currentStudent ? stateManager.getStudentRank(currentStudent.id) : null;
      const champion = students[0];
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px;">
        
        <!-- Leaderboard Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <span class="badge badge-gold" style="margin-bottom: 8px;">Official Class Competition</span>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">Classroom Leaderboard</h1>
          <p style="font-size: 1rem; color: var(--ha-text-muted);">
            Private rankings for <strong>${stateManager.state.classInfo.name}</strong> (${students.length} Joined)
          </p>
        </div>

        <!-- Current Class Champion Banner -->
        <div style="background: linear-gradient(135deg, #F5A623 0%, #D4880E 100%); border-radius: var(--radius-xl); padding: clamp(16px, 3.5vw, 28px); color: #FFFFFF; display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; box-shadow: var(--ha-shadow-md); flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: clamp(10px, 3vw, 18px);">
            <div style="font-size: clamp(2rem, 5vw, 3rem); background: rgba(255,255,255,0.25); border-radius: var(--radius-pill); width: clamp(52px, 12vw, 68px); height: clamp(52px, 12vw, 68px); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              \u{1F3C6}
            </div>
            <div>
              <span class="badge" style="background: #FFFFFF; color: var(--ha-navy); font-weight: 800; margin-bottom: 4px; font-size: 0.72rem;">
                CURRENT CLASS LEADER
              </span>
              <div style="font-size: clamp(1.2rem, 4vw, 1.6rem); font-weight: 800; word-break: break-word;">
                ${champion.avatar} ${champion.name} (${champion.xp || 0} XP)
              </div>
              <div style="font-size: 0.85rem; opacity: 0.95;">
                Level ${champion.level || 1} \u2022 Streak: ${champion.streak || 0} days
              </div>
            </div>
          </div>

          <div>
            <button class="btn btn-primary" id="btn-compete-now" style="background: var(--ha-navy);">
              Practice to Earn XP \u2192
            </button>
          </div>
        </div>

        <!-- User Position Banner (if logged in) -->
        ${currentStudent && rankInfo ? `
          <div style="background: var(--ha-navy-subtle); border: 2px solid var(--ha-navy); border-radius: var(--radius-lg); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="font-size: 2rem; flex-shrink: 0;">${currentStudent.avatar}</div>
              <div>
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-red); text-transform: uppercase;">
                  YOUR POSITION
                </div>
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--ha-navy);">
                  Rank #${rankInfo.rank} \u2014 ${currentStudent.name}
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
              <div>
                <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 600;">TOTAL XP</div>
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--ha-navy);">${currentStudent.xp || 0} XP</div>
              </div>
              ${rankInfo.xpToNextRank > 0 ? `
                <div class="badge badge-gold" style="font-size: 0.8rem; padding: 5px 12px;">
                  ${rankInfo.xpToNextRank} XP to pass ${rankInfo.nextStudent?.name}
                </div>
              ` : `
                <div class="badge badge-gold" style="font-size: 0.8rem; padding: 5px 12px;">
                  \u{1F451} You are #1 in class!
                </div>
              `}
            </div>
          </div>
        ` : ""}

        <!-- Podium for Top 3 (if 2 or more students) -->
        ${students.length >= 2 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 14px; margin-bottom: 30px;">
            ${students.slice(0, 3).map((s, idx) => {
        const medals = ["\u{1F947} 1st Place", "\u{1F948} 2nd Place", "\u{1F949} 3rd Place"];
        const borders = ["var(--ha-gold)", "#94A3B8", "#D97706"];
        const isMe = currentStudent && s.id === currentStudent.id;
        return `
                <div class="ha-card" style="text-align: center; border-top: 4px solid ${borders[idx]}; padding: 20px 14px; background: ${isMe ? "#FFFDF5" : "#FFF"};">
                  <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 6px;">
                    ${medals[idx]}
                  </div>
                  <div style="font-size: 2.6rem; margin-bottom: 6px;">${s.avatar}</div>
                  <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 4px;">
                    ${s.name} ${isMe ? '<span style="color: var(--ha-red); font-size: 0.78rem;">(YOU)</span>' : ""}
                  </h3>
                  <div style="font-size: 1.1rem; font-weight: 800; color: var(--ha-red); margin-bottom: 4px;">
                    ${s.xp || 0} <span style="font-size: 0.8rem; color: var(--ha-navy);">XP</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--ha-text-muted);">
                    Level ${s.level || 1} \u2022 Streak ${s.streak || 0}d
                  </div>
                </div>
              `;
      }).join("")}
          </div>
        ` : ""}

        <!-- Complete Student Roster Rankings Table -->
        <div class="ha-card" style="padding: 0; overflow: hidden;">
          <div style="padding: 14px 18px; background: var(--ha-navy-subtle); border-bottom: 1px solid var(--ha-border); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.05rem; color: var(--ha-navy);">Full Class Roster (${students.length} Students)</h3>
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--ha-text-muted);">RANKED BY XP</span>
          </div>

          <div style="display: flex; flex-direction: column;">
            ${students.map((s, idx) => {
        const isMe = currentStudent && s.id === currentStudent.id;
        return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--ha-border); background: ${isMe ? "rgba(245, 166, 35, 0.08)" : "#FFF"}; flex-wrap: wrap; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
                    <span style="font-size: 1rem; font-weight: 800; color: ${idx < 3 ? "var(--ha-red)" : "var(--ha-text-muted)"}; min-width: 24px;">
                      #${idx + 1}
                    </span>
                    <span style="font-size: 1.5rem; flex-shrink: 0;">${s.avatar}</span>
                    <div style="min-width: 0;">
                      <strong style="color: var(--ha-navy); font-size: 0.95rem; word-break: break-word;">
                        ${s.name} ${isMe ? '<span style="color: var(--ha-red); font-size: 0.75rem;">(YOU)</span>' : ""}
                      </strong>
                      <div style="font-size: 0.75rem; color: var(--ha-text-muted);">
                        Level ${s.level || 1} \u2022 \u{1F525} ${s.streak || 0}d Streak
                      </div>
                    </div>
                  </div>

                  <div style="text-align: right; flex-shrink: 0;">
                    <div style="font-size: 1.1rem; font-weight: 800; color: var(--ha-navy);">
                      ${s.xp || 0} <span style="font-size: 0.75rem; color: var(--ha-text-muted);">XP</span>
                    </div>
                  </div>
                </div>
              `;
      }).join("")}
          </div>
        </div>

      </div>
    `;
      container.querySelector("#btn-compete-now")?.addEventListener("click", () => {
        sound.playClick();
        onNavigate("topics");
      });
    }
    renderContent();
    apiClient2.getLeaderboard(100).then((res) => {
      if (res && Array.isArray(res.leaderboard)) {
        stateManager.state.students = res.leaderboard.map((s) => ({ ...s }));
        const current = stateManager.getCurrentStudent();
        if (current && !stateManager.state.students.some((s) => s.id === current.id)) {
          stateManager.state.students.push(current);
        }
        renderContent();
      }
    }).catch(() => {
    });
    unsub = stateManager.subscribe((event) => {
      if (!container.isConnected) {
        if (unsub) unsub();
        return;
      }
      if (event === "LEADERBOARD_UPDATED" || event === "XP_GAINED" || event === "STUDENT_UPDATED" || event === "STUDENT_JOINED") {
        renderContent();
      }
    });
  }

  // js/components/profile.js
  function renderProfile(container, onNavigate) {
    const student = stateManager.getCurrentStudent();
    if (!student) {
      container.innerHTML = `
      <div class="container" style="padding-top: 50px; padding-bottom: 70px; text-align: center; max-width: 600px;">
        <div class="ha-card" style="padding: 40px 24px; border-top: 6px solid var(--ha-navy);">
          <span style="font-size: 3.5rem; display: block; margin-bottom: 12px;">\u{1F464}</span>
          <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 8px;">No Student Enrolled</h2>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 20px;">
            Please join the class with your name, email, and class code <strong>HOME-ENGLISH</strong> to access your profile.
          </p>
          <button class="btn btn-primary" id="profile-empty-join">Join Class Now</button>
        </div>
      </div>
    `;
      container.querySelector("#profile-empty-join")?.addEventListener("click", () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent("ha:open-join-modal"));
      });
      return;
    }
    const levelInfo = getLevelInfo(student.xp || 0);
    const totalQ = student.stats?.totalQuestions || 0;
    const correctQ = student.stats?.correctAnswers || 0;
    const accuracy = totalQ > 0 ? Math.round(correctQ / totalQ * 100) : 0;
    const activeTopics = stateManager.getActiveCurriculum();
    const completedTopics = Object.values(student.topicProgress || {}).filter((p) => p.passed || p.quizScore && p.quizScore >= 80).length;
    const overallPercent = activeTopics.length > 0 ? Math.round(completedTopics / activeTopics.length * 100) : 0;
    container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 820px;">
      
      <!-- Top Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="badge badge-navy" style="margin-bottom: 6px;">Personal Student Account</span>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy);">My Profile</h1>
          <p style="font-size: 0.92rem; color: var(--ha-text-muted);">
            Class: <strong>${stateManager.state.classInfo.name}</strong> \u2022 Class Teacher: <strong>${stateManager.state.classInfo.teacher || "Sir Zubair"}</strong> \u2022 Code: <strong>${student.classCode || "HOME-ENGLISH"}</strong>
          </p>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-profile-back-dash">
            \u2190 Back to Dashboard
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-profile-logout" style="background: var(--ha-red);">
            <span>\u{1F6AA}</span> Logout
          </button>
        </div>
      </div>

      <!-- Main Identity Card -->
      <div class="ha-card" style="padding: 32px; margin-bottom: 24px; border-top: 6px solid var(--ha-navy);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="font-size: 3.8rem; width: 92px; height: 92px; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); display: flex; align-items: center; justify-content: center; border: 3px solid var(--ha-navy); box-shadow: var(--ha-shadow-sm);">
              ${student.avatar}
            </div>
            <div>
              <h2 style="font-size: 1.85rem; color: var(--ha-navy); margin-bottom: 4px;">${student.name}</h2>
              <div style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>\u{1F4E7}</span> <strong>${student.email || "No email attached"}</strong>
                <span class="badge badge-navy" style="font-size: 0.7rem; padding: 2px 6px;">Private</span>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <span class="badge badge-gold">Level ${levelInfo.level} \u2014 ${levelInfo.title}</span>
                <span class="badge badge-red">\u{1F525} ${student.streak || 0} Day Streak</span>
                <span style="font-size: 0.75rem; color: var(--ha-text-light);">ID: ${student.id}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Avatar Icon Selector -->
        <div style="padding: 16px 20px; background: #F8FAFC; border-radius: var(--radius-lg); margin-bottom: 24px; border: 1px solid var(--ha-border);">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 10px;">
            CHANGE YOUR AVATAR:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${AVATARS.map((av) => `
              <button class="profile-avatar-btn" data-av="${av}"
                style="font-size: 1.4rem; width: 44px; height: 44px; border-radius: var(--radius-md); border: 2px solid ${av === student.avatar ? "var(--ha-navy)" : "var(--ha-border)"}; background: ${av === student.avatar ? "var(--ha-navy-subtle)" : "#FFF"}; cursor: pointer; transition: transform 0.15s;">
                ${av}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Overall Progress Meter -->
        <div style="margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 6px;">
            <span>Overall Curriculum Mastery (${completedTopics} / ${activeTopics.length} Topics)</span>
            <span style="color: var(--ha-gold-dark);">${overallPercent}%</span>
          </div>
          <div class="progress-container" style="height: 10px;">
            <div class="progress-bar-fill" style="width: ${overallPercent}%;"></div>
          </div>
        </div>

        <!-- Key Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px;">
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">TOTAL XP</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-navy);">${student.xp || 0}</div>
          </div>
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">QUIZ ACCURACY</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-success);">${accuracy}%</div>
          </div>
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">QUIZZES TAKEN</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-red);">${student.stats?.quizzesTaken || 0}</div>
          </div>
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--ha-text-muted);">GAMES PLAYED</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-gold-dark);">${student.stats?.gamesPlayed || 0}</div>
          </div>
        </div>
      </div>

      <!-- Unlocked Badges & Achievements -->
      <div class="ha-card" style="padding: 28px; margin-bottom: 24px;">
        <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin-bottom: 16px;">
          Achievements & Badges (${student.unlockedAchievements?.length || 0})
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          ${(stateManager.state.achievements || []).map((ach) => {
      const isUnlocked = student.unlockedAchievements?.includes(ach.id);
      return `
              <div style="padding: 14px; border-radius: var(--radius-md); border: 1.5px solid ${isUnlocked ? "var(--ha-gold)" : "var(--ha-border)"}; background: ${isUnlocked ? "var(--ha-gold-light)" : "#F8FAFC"}; opacity: ${isUnlocked ? "1" : "0.55"}; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">${ach.icon}</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 800; color: var(--ha-navy);">${ach.title}</div>
                  <div style="font-size: 0.75rem; color: var(--ha-text-muted);">${ach.description}</div>
                  ${isUnlocked ? `<span style="font-size: 0.72rem; font-weight: 800; color: var(--ha-gold-dark);">+${ach.xpReward} XP Unlocked</span>` : ""}
                </div>
              </div>
            `;
    }).join("")}
        </div>
      </div>

      <!-- Account Settings & Logout -->
      <div class="ha-card" style="padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border: 1px solid var(--ha-border);">
        <div>
          <h4 style="font-size: 1.05rem; color: var(--ha-navy); margin-bottom: 2px;">Session Management</h4>
          <p style="font-size: 0.85rem; color: var(--ha-text-muted);">
            Logging out will end your current session on this device. You can log back in anytime using your email.
          </p>
        </div>
        <button class="btn btn-outline" id="btn-settings-logout" style="color: var(--ha-red); border-color: var(--ha-red); font-weight: 700;">
          <span>\u{1F6AA}</span> Logout of Account
        </button>
      </div>

    </div>
  `;
    container.querySelectorAll(".profile-avatar-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const newAv = btn.dataset.av;
        stateManager.updateAvatar(newAv);
        sound.playClick();
        renderProfile(container, onNavigate);
      });
    });
    container.querySelector("#btn-profile-back-dash")?.addEventListener("click", () => {
      sound.playClick();
      onNavigate("dashboard");
    });
    const handleLogout = () => {
      sound.playClick();
      if (confirm(`Log out of ${student.name}'s account? You will need your email and password to log back in.`)) {
        stateManager.logout();
        onNavigate("home");
      }
    };
    container.querySelector("#btn-profile-logout")?.addEventListener("click", handleLogout);
    container.querySelector("#btn-settings-logout")?.addEventListener("click", handleLogout);
  }

  // js/components/admin.js
  var currentAdminTab = "overview";
  async function renderAdmin(container, onNavigate) {
    if (!stateManager.state.isAdmin) {
      if (onNavigate) onNavigate("home");
      window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: "teacher" }));
      return;
    }
    try {
      const rosterRes = await apiClient2.adminGetRoster();
      if (rosterRes && Array.isArray(rosterRes.students)) {
        stateManager.state.students = rosterRes.students.map((s) => ({ ...s }));
      }
    } catch (e) {
    }
    const classInfo = stateManager.state.classInfo || { name: "Home Academy: English Language Program", code: "HOME-ENGLISH", teacher: "Sir Zubair" };
    const students = stateManager.state.students || [];
    const curriculumTopics = stateManager.state.curriculumTopics || [];
    const roleplays = stateManager.state.roleplays || [];
    let notifications = [];
    try {
      const notifRes = await apiClient2.adminGetNotifications(25);
      if (notifRes && notifRes.notifications) {
        notifications = notifRes.notifications;
      }
    } catch (e) {
    }
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    const totalStudents = students.length;
    const totalClassXP = students.reduce((sum, s) => sum + (s.xp || 0), 0);
    const activeTopicsCount = curriculumTopics.filter((t) => t.active !== false).length;
    container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 1100px;">
      
      <!-- Admin Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <span class="badge badge-red">Class Teacher: ${classInfo.teacher || "Sir Zubair"}</span>
            <span class="badge badge-navy">Class Code: ${classInfo.code}</span>
            ${unreadCount > 0 ? `<span class="badge" style="background: #ef4444; color: #fff; font-weight: 800;">\u{1F514} ${unreadCount} New Notification${unreadCount > 1 ? "s" : ""}</span>` : ""}
          </div>
          <h1 style="font-size: 2rem; color: var(--ha-navy); margin: 0 0 4px;">Faculty Management Console</h1>
          <p style="font-size: 0.92rem; color: var(--ha-text-muted); margin: 0;">
            Managing <strong>${classInfo.name}</strong> \u2022 Real database persistence & live student telemetry
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" id="admin-switch-dash">
            View Student Dashboard \u2192
          </button>

          <!-- Professional Teacher/Admin Account Menu (Section 21) -->
          <div style="position: relative;" id="admin-account-menu-wrapper">
            <button id="admin-account-btn" type="button" class="btn btn-outline btn-sm"
              style="display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 5px 12px; cursor: pointer;">
              <span style="font-size: 1.1rem;">\u{1F468}\u200D\u{1F3EB}</span>
              <div style="text-align: left; line-height: 1.15;">
                <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy);">${classInfo.teacher || "Sir Zubair"}</div>
                <div style="font-size: 0.68rem; color: var(--ha-text-muted);">Teacher / Admin</div>
              </div>
              <span style="font-size: 0.65rem; color: var(--ha-text-muted); margin-left: 2px;">\u25BC</span>
            </button>

            <!-- Dropdown Popover -->
            <div id="admin-account-dropdown" style="display: none; position: absolute; right: 0; top: calc(100% + 6px); width: 220px; background: #ffffff; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); z-index: 1000; overflow: hidden; padding: 4px 0;">
              <div style="padding: 10px 14px; background: #f8fafc; border-bottom: 1px solid var(--ha-border);">
                <div style="font-weight: 800; font-size: 0.86rem; color: var(--ha-navy); display: flex; align-items: center; gap: 6px;">
                  <span>\u{1F464}</span> ${classInfo.teacher || "Sir Zubair"}
                </div>
                <div style="font-size: 0.72rem; color: var(--ha-text-muted); margin-top: 2px;">Teacher / Admin Portal</div>
              </div>
              <button type="button" class="admin-drop-btn" id="menu-go-security" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-navy); text-align: left;">
                <span>\u2699\uFE0F</span> Security
              </button>
              <button type="button" class="admin-drop-btn" id="menu-go-changepass" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-navy); text-align: left;">
                <span>\u{1F511}</span> Change Password
              </button>
              <div style="height: 1px; background: var(--ha-border); margin: 3px 0;"></div>
              <button type="button" class="admin-drop-btn text-danger" id="menu-logout-all" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-red); text-align: left;">
                <span>\u{1F4F1}</span> Log out of all devices
              </button>
              <button type="button" class="admin-drop-btn text-danger" id="menu-admin-logout" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: none; background: transparent; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: var(--ha-red); text-align: left;">
                <span>\u{1F6AA}</span> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 11-Section Secondary Navigation Bar -->
      <div class="admin-tab-bar">
        <button class="admin-tab-btn ${currentAdminTab === "overview" ? "active" : ""}" data-tab="overview">\u{1F4CA} Overview</button>
        <button class="admin-tab-btn ${currentAdminTab === "students" ? "active" : ""}" data-tab="students">\u{1F465} Students (${totalStudents})</button>
        <button class="admin-tab-btn ${currentAdminTab === "curriculum" ? "active" : ""}" data-tab="curriculum">\u{1F4DA} Curriculum (${activeTopicsCount})</button>
        <button class="admin-tab-btn ${currentAdminTab === "questions" ? "active" : ""}" data-tab="questions">\u2753 Questions</button>
        <button class="admin-tab-btn ${currentAdminTab === "quizzes" ? "active" : ""}" data-tab="quizzes">\u{1F4DD} Quizzes</button>
        <button class="admin-tab-btn ${currentAdminTab === "activities" ? "active" : ""}" data-tab="activities">\u{1F3AE} Activities</button>
        <button class="admin-tab-btn ${currentAdminTab === "roleplays" ? "active" : ""}" data-tab="roleplays">\u{1F3AD} Roleplays (${roleplays.length})</button>
        <button class="admin-tab-btn ${currentAdminTab === "messages" ? "active" : ""}" data-tab="messages">\u{1F4AC} Messages</button>
        <button class="admin-tab-btn ${currentAdminTab === "leaderboard" ? "active" : ""}" data-tab="leaderboard">\u{1F3C6} Leaderboard</button>
        <button class="admin-tab-btn ${currentAdminTab === "notifications" ? "active" : ""}" data-tab="notifications">\u{1F514} Notifications ${unreadCount > 0 ? `(${unreadCount})` : ""}</button>
        <button class="admin-tab-btn ${currentAdminTab === "settings" ? "active" : ""}" data-tab="settings">\u2699\uFE0F Settings</button>
        <button class="admin-tab-btn ${currentAdminTab === "security" ? "active" : ""}" data-tab="security">\u{1F512} Security</button>
      </div>

      <!-- Tab Content Area -->
      <div id="admin-tab-content"></div>

      <!-- Student Detail Modal Mount -->
      <div id="student-dossier-modal-container"></div>
    </div>
  `;
    if (!document.getElementById("admin-tab-styles")) {
      const style = document.createElement("style");
      style.id = "admin-tab-styles";
      style.textContent = `
      .admin-tab-bar {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding: 8px;
        background: #ffffff;
        border: 1.5px solid var(--ha-border);
        border-radius: var(--radius-lg);
        margin-bottom: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .admin-tab-bar::-webkit-scrollbar {
        display: none;
      }
      .admin-tab-btn {
        padding: 9px 16px;
        background: transparent;
        border: none;
        border-radius: var(--radius-md);
        font-size: 0.86rem;
        font-weight: 700;
        color: var(--ha-text-muted);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }
      .admin-tab-btn:hover {
        background: var(--ha-navy-subtle);
        color: var(--ha-navy);
      }
      .admin-tab-btn.active {
        background: var(--ha-navy);
        color: #fff;
        box-shadow: 0 2px 8px rgba(10, 37, 88, 0.25);
      }
      .admin-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.9rem;
      }
      .admin-table th {
        background: var(--ha-navy-subtle);
        padding: 13px 16px;
        color: var(--ha-navy);
        font-weight: 800;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        border-bottom: 2px solid var(--ha-border);
        white-space: nowrap;
        vertical-align: middle;
      }
      .admin-table td {
        padding: 14px 16px;
        border-bottom: 1px solid var(--ha-border);
        vertical-align: middle;
      }
      .admin-table tbody tr {
        transition: background 0.15s ease;
      }
      .admin-table tbody tr:hover {
        background: #f8fafc;
      }
      .admin-level-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 4px 12px;
        border-radius: 9999px;
        background: var(--ha-navy-subtle);
        color: var(--ha-navy);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .admin-actions-cell {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
        white-space: nowrap;
      }
      .admin-actions-cell button {
        margin: 0 !important;
      }
    `;
      document.head.appendChild(style);
    }
    const tabContent = container.querySelector("#admin-tab-content");
    const switchTab = (tab) => {
      currentAdminTab = tab;
      const currentStudents = stateManager.state.students || [];
      const currentClassXP = currentStudents.reduce((sum, s) => sum + (s.xp || 0), 0);
      container.querySelectorAll(".admin-tab-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tab === tab);
      });
      renderActiveTab(tab, tabContent, container, onNavigate, {
        students: currentStudents,
        classInfo,
        curriculumTopics,
        roleplays,
        notifications,
        totalStudents: currentStudents.length,
        totalClassXP: currentClassXP,
        activeTopicsCount
      });
    };
    container.querySelectorAll(".admin-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        switchTab(btn.dataset.tab);
      });
    });
    switchTab(currentAdminTab);
    const accountBtn = container.querySelector("#admin-account-btn");
    const accountDropdown = container.querySelector("#admin-account-dropdown");
    accountBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      sound.playClick();
      if (accountDropdown) {
        accountDropdown.style.display = accountDropdown.style.display === "block" ? "none" : "block";
      }
    });
    document.addEventListener("click", () => {
      if (accountDropdown) accountDropdown.style.display = "none";
    });
    accountDropdown?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    container.querySelector("#menu-go-security")?.addEventListener("click", () => {
      sound.playClick();
      if (accountDropdown) accountDropdown.style.display = "none";
      switchTab("security");
    });
    container.querySelector("#menu-go-changepass")?.addEventListener("click", () => {
      sound.playClick();
      if (accountDropdown) accountDropdown.style.display = "none";
      switchTab("security");
      setTimeout(() => {
        container.querySelector("#sec-curr-pass")?.focus();
      }, 100);
    });
    container.querySelector("#menu-admin-logout")?.addEventListener("click", async () => {
      sound.playClick();
      if (accountDropdown) accountDropdown.style.display = "none";
      await stateManager.logoutAdmin();
      if (onNavigate) onNavigate("home");
      window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: "teacher" }));
    });
    container.querySelector("#menu-logout-all")?.addEventListener("click", () => {
      sound.playClick();
      if (accountDropdown) accountDropdown.style.display = "none";
      showLogoutAllModal();
    });
    function showLogoutAllModal() {
      let modal = document.getElementById("ha-logout-all-modal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "ha-logout-all-modal";
        modal.innerHTML = `
        <div class="ha-modal-backdrop" id="logout-all-backdrop" style="position: fixed; inset: 0; background: rgba(10, 37, 88, 0.6); z-index: 9999; display: flex; align-items: center; justify-content: center;">
          <div class="ha-modal-dialog" style="max-width: 440px; width: 92%; background: #fff; border-radius: var(--radius-lg); padding: 26px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">\u{1F4F1}</div>
            <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 8px; font-weight: 800;">Log out from all other devices?</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 22px; line-height: 1.45;">
              This will revoke all active teacher sessions across all browsers and devices. You will need to log in again.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center;">
              <button type="button" class="btn btn-outline" id="btn-cancel-logout-all" style="flex: 1; padding: 10px; font-weight: 700;">Cancel</button>
              <button type="button" class="btn btn-secondary" id="btn-confirm-logout-all" style="flex: 1; padding: 10px; font-weight: 800; background: var(--ha-red); border-color: var(--ha-red);">Confirm Logout</button>
            </div>
          </div>
        </div>
      `;
        document.body.appendChild(modal);
        modal.querySelector("#btn-cancel-logout-all")?.addEventListener("click", () => {
          modal.style.display = "none";
        });
        modal.querySelector("#logout-all-backdrop")?.addEventListener("click", (e) => {
          if (e.target.id === "logout-all-backdrop") modal.style.display = "none";
        });
        modal.querySelector("#btn-confirm-logout-all")?.addEventListener("click", async () => {
          modal.style.display = "none";
          await stateManager.logoutAdminAllDevices();
          if (onNavigate) onNavigate("home");
          window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: "teacher" }));
        });
      }
      modal.style.display = "block";
    }
    container.querySelector("#admin-switch-dash")?.addEventListener("click", () => {
      sound.playClick();
      if (onNavigate) onNavigate("dashboard");
    });
    const unsubAdmin = stateManager.subscribe((event) => {
      if (!container.isConnected) {
        if (unsubAdmin) unsubAdmin();
        return;
      }
      if (event === "LEADERBOARD_UPDATED" || event === "STUDENT_UPDATED" || event === "STUDENT_JOINED" || event === "XP_GAINED") {
        switchTab(currentAdminTab);
      }
    });
  }
  async function renderActiveTab(tab, contentMount, mainContainer, onNavigate, data) {
    const { students, classInfo, curriculumTopics, roleplays, notifications, totalStudents, totalClassXP, activeTopicsCount } = data;
    switch (tab) {
      case "overview":
        renderOverviewTab(contentMount, { totalStudents, totalClassXP, activeTopicsCount, students, notifications });
        break;
      case "students":
        renderStudentsTab(contentMount, mainContainer, students, classInfo);
        break;
      case "curriculum":
        renderCurriculumTab(contentMount, curriculumTopics, mainContainer, onNavigate);
        break;
      case "questions":
        renderQuestionsTab(contentMount, curriculumTopics);
        break;
      case "quizzes":
        renderQuizzesTab(contentMount, curriculumTopics, students);
        break;
      case "activities":
        renderActivitiesTab(contentMount, curriculumTopics, students);
        break;
      case "roleplays":
        renderRoleplaysTab(contentMount, roleplays, mainContainer, onNavigate);
        break;
      case "messages":
        renderMessagesTab(contentMount);
        break;
      case "leaderboard":
        renderLeaderboardTab(contentMount, students);
        break;
      case "notifications":
        renderNotificationsTab(contentMount, notifications, mainContainer);
        break;
      case "settings":
        renderSettingsTab(contentMount, classInfo);
        break;
      case "security":
        renderSecurityTab(contentMount);
        break;
      default:
        renderOverviewTab(contentMount, data);
    }
  }
  function renderOverviewTab(mount, { totalStudents, totalClassXP, activeTopicsCount, students, notifications }) {
    const recentNotifications = (notifications || []).slice(0, 5);
    mount.innerHTML = `
    <div class="stats-grid" style="margin-bottom: 24px;">
      <div class="stat-pill-card">
        <div class="stat-icon-bubble navy">${usersIcon(20)}</div>
        <div class="stat-content">
          <div class="stat-label">ENROLLED STUDENTS</div>
          <div class="stat-value">${totalStudents} Active</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Real persistent database records</div>
        </div>
      </div>

      <div class="stat-pill-card">
        <div class="stat-icon-bubble gold">${sparkIcon(20)}</div>
        <div class="stat-content">
          <div class="stat-label">TOTAL CLASS XP</div>
          <div class="stat-value">${totalClassXP} XP</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">From real practice & quizzes</div>
        </div>
      </div>

      <div class="stat-pill-card">
        <div class="stat-icon-bubble red">${bookIcon(20)}</div>
        <div class="stat-content">
          <div class="stat-label">ACTIVE TOPICS</div>
          <div class="stat-value">${activeTopicsCount} Active</div>
          <div style="font-size: 0.75rem; color: var(--ha-text-muted);">Taught by Sir Zubair</div>
        </div>
      </div>
    </div>

    <!-- Live Activity & Notification Feed -->
    <div class="ha-card" style="padding: 24px; margin-bottom: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="margin: 0; font-size: 1.15rem; color: var(--ha-navy);">\u{1F514} Live Classroom Notification Feed</h3>
        <span class="badge badge-gold" style="font-size: 0.75rem;">Real-Time Database Stream</span>
      </div>

      ${recentNotifications.length === 0 ? `
        <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin: 0; padding: 16px; text-align: center; background: #f8fafc; border-radius: var(--radius-md);">
          No notifications recorded yet. When students join or complete milestones, live alerts appear here automatically.
        </p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${recentNotifications.map((n) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid ${n.type === "new_student" ? "var(--ha-navy)" : "var(--ha-gold)"};">
              <div>
                <strong style="color: var(--ha-navy); font-size: 0.92rem; display: block;">${n.title}</strong>
                <span style="font-size: 0.85rem; color: var(--ha-text-muted);">${n.message}</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--ha-text-muted); white-space: nowrap;">${new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          `).join("")}
        </div>
      `}
    </div>
  `;
  }
  function renderStudentsTab(mount, mainContainer, students, classInfo) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
            <h2 style="font-size: 1.3rem; color: var(--ha-navy); margin: 0;">Enrolled Student Roster</h2>
            <span class="badge badge-navy" style="font-size: 0.75rem;">${students.length} Total</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Click any student row or "View Dossier" to inspect full audit history, quiz results, and roleplay telemetry.
          </p>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-outline btn-sm" id="btn-export-csv" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>\u{1F4E5}</span> Export CSV
          </button>
          <button class="btn btn-primary btn-sm" id="btn-admin-add-student-modal" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>\u2795</span> Enroll Student
          </button>
        </div>
      </div>

      ${students.length === 0 ? `
        <div style="padding: 48px 20px; text-align: center; background: #f8fafc; border-radius: var(--radius-lg); border: 1.5px dashed var(--ha-border);">
          <span style="font-size: 2.5rem; display: inline-block; margin-bottom: 8px;">\u{1F465}</span>
          <strong style="font-size: 1.1rem; color: var(--ha-navy); display: block; margin-bottom: 6px;">No students enrolled yet</strong>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); max-width: 450px; margin: 0 auto;">
            Students will automatically appear here the instant they join with Class Code <strong>${classInfo.code}</strong>.
          </p>
        </div>
      ` : `
        <div class="table-responsive-wrapper" style="overflow-x: auto; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="min-width: 170px;">Student</th>
                <th style="min-width: 210px;">Email</th>
                <th style="text-align: center; min-width: 100px;">XP</th>
                <th style="text-align: center; min-width: 150px;">Level Title</th>
                <th style="text-align: center; min-width: 90px;">Streak</th>
                <th style="text-align: center; min-width: 120px;">Roleplay %</th>
                <th style="text-align: right; min-width: 210px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((s) => `
                <tr class="student-row" data-id="${s.id}" style="cursor: pointer;">
                  <td style="white-space: nowrap; font-weight: 700; color: var(--ha-navy);">
                    <div style="display: inline-flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.35rem; line-height: 1; flex-shrink: 0;">${s.avatar || "\u{1F981}"}</span>
                      <span style="white-space: nowrap;">${s.name}</span>
                    </div>
                  </td>
                  <td style="white-space: nowrap; color: var(--ha-text-muted); font-size: 0.85rem;" title="${s.email || ""}">
                    ${s.email || "N/A"}
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <span style="font-weight: 800; color: #b45309; font-variant-numeric: tabular-nums;">\u26A1 ${s.xp || 0} XP</span>
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <span class="admin-level-badge">${s.levelTitle || `Level ${s.level || 1}`}</span>
                  </td>
                  <td style="text-align: center; white-space: nowrap; font-weight: 700; color: var(--ha-navy);">
                    \u{1F525} ${s.streak || 0}d
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <div style="display: inline-flex; align-items: center; gap: 6px; justify-content: center;">
                      <div style="width: 44px; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; display: inline-block;">
                        <div style="width: ${Math.min(100, s.roleplayProgressPercent || 0)}%; height: 100%; background: var(--ha-gold); border-radius: 999px;"></div>
                      </div>
                      <span style="font-size: 0.8rem; font-weight: 700; color: var(--ha-navy); min-width: 28px;">${s.roleplayProgressPercent || 0}%</span>
                    </div>
                  </td>
                  <td style="text-align: right; white-space: nowrap;" onclick="event.stopPropagation();">
                    <div class="admin-actions-cell">
                      <button class="btn btn-outline btn-xs btn-view-dossier" data-id="${s.id}">Dossier</button>
                      <button class="btn btn-outline btn-xs btn-award-xp" data-id="${s.id}" data-name="${s.name}">+XP</button>
                      <button class="btn btn-danger btn-xs btn-delete-student" data-id="${s.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
    mount.querySelectorAll(".student-row, .btn-view-dossier").forEach((el) => {
      el.addEventListener("click", () => {
        sound.playClick();
        const studentId = el.dataset.id;
        showStudentDossierModal(studentId, mainContainer);
      });
    });
    mount.querySelectorAll(".btn-award-xp").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const studentId = btn.dataset.id;
        const studentName = btn.dataset.name;
        const amountStr = prompt(`Enter bonus XP to award to ${studentName}:`, "25");
        if (!amountStr) return;
        const amount = parseInt(amountStr, 10);
        if (isNaN(amount) || amount <= 0) return alert("Please enter a valid positive number.");
        const reason = prompt("Reason for bonus XP (optional):", "Great classroom participation") || "Faculty Award";
        try {
          await apiClient2.adminAwardXP(studentId, amount, reason);
          sound.playSuccess();
          alert(`Awarded +${amount} XP to ${studentName}!`);
          window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
        } catch (err) {
          alert(err.message);
        }
      });
    });
    mount.querySelectorAll(".btn-delete-student").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const studentId = btn.dataset.id;
        if (confirm("Are you sure you want to permanently remove this student from the class database?")) {
          try {
            await apiClient2.adminDeleteStudent(studentId);
            stateManager.adminDeleteStudent(studentId);
            sound.playClick();
            window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
          } catch (err) {
            alert(err.message);
          }
        }
      });
    });
    mount.querySelector("#btn-admin-add-student-modal")?.addEventListener("click", async () => {
      const name = prompt("Enter student full name to enroll:");
      if (!name || !name.trim()) return;
      const email = prompt("Enter student email address:") || `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@gmail.com`;
      const password = prompt("Enter student login password:", "password123");
      try {
        await stateManager.registerStudent({
          name: name.trim(),
          email: email.trim(),
          password,
          classCode: classInfo.code,
          avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)]
        });
        sound.playSuccess();
        window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
      } catch (err) {
        alert(err.message);
      }
    });
  }
  async function showStudentDossierModal(studentId, mainContainer) {
    const mount = mainContainer.querySelector("#student-dossier-modal-container");
    if (!mount) return;
    let profileData = null;
    try {
      const res = await apiClient2.adminGetStudentProfile(studentId);
      if (res && res.profile) profileData = res.profile;
    } catch (e) {
    }
    if (!profileData) {
      const fallback = stateManager.state.students.find((s) => s.id === studentId);
      if (!fallback) return alert("Student not found.");
      profileData = { student: fallback, quizHistory: [], activityHistory: [], roleplayHistory: [], xpLedger: [] };
    }
    const { student, quizHistory, activityHistory, roleplayHistory, xpLedger } = profileData;
    mount.innerHTML = `
    <div class="modal-overlay active" id="dossier-modal" style="display: flex; align-items: center; justify-content: center; position: fixed; inset: 0; background: rgba(10, 37, 88, 0.65); z-index: 9999; padding: 20px;">
      <div class="modal-content" style="background: #fff; border-radius: var(--radius-lg); max-width: 780px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.25);">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 2px solid var(--ha-navy-subtle); padding-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="font-size: 2.5rem; background: var(--ha-navy-subtle); padding: 8px 12px; border-radius: 50%;">${student.avatar || "\u{1F981}"}</div>
            <div>
              <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin: 0 0 4px;">${student.name || student.fullName}</h2>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <span class="badge badge-navy">${student.levelTitle || `Level ${student.level || 1}`}</span>
                <span class="badge badge-gold">XP: ${student.xp || 0}</span>
                <span class="badge badge-outline">Email: ${student.email}</span>
                <span class="badge badge-outline">Enrolled: ${student.joinDate || "Today"}</span>
              </div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-close-dossier">\u2715 Close</button>
        </div>

        <!-- Metric Highlights -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 20px;">
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">DAILY STREAK</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #ef4444;">\u{1F525} ${student.streak || 0} Days</div>
          </div>
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">QUIZZES PASSED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--ha-navy);">${student.stats?.topicsCompleted || 0} / 6</div>
          </div>
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">GAMES PLAYED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #10b981;">\u{1F3AE} ${student.stats?.gamesPlayed || 0}</div>
          </div>
          <div style="padding: 12px; background: #f8fafc; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--ha-text-muted); font-weight: 800;">ROLEPLAY MASTERY</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #8b5cf6;">\u{1F3AD} ${student.roleplayProgressPercent || 0}%</div>
          </div>
        </div>

        <!-- Topic Progress Breakdown -->
        <div style="margin-bottom: 22px;">
          <h4 style="margin: 0 0 10px; font-size: 1rem; color: var(--ha-navy);">Curriculum Topic Mastery</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
            ${Object.entries(student.topicProgress || {}).map(([tId, p]) => `
              <div style="padding: 10px; border: 1px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.82rem; background: ${p.passed ? "rgba(16,185,129,0.06)" : "#fff"};">
                <strong style="color: var(--ha-navy); display: block; text-transform: capitalize;">${tId.replace(/_/g, " ")}</strong>
                <div style="display: flex; justify-content: space-between; margin-top: 4px; color: var(--ha-text-muted);">
                  <span>Learned: ${p.learned ? "\u2713" : "\u2014"}</span>
                  <span>Quiz: ${p.quizScore || 0}%</span>
                  <span style="font-weight: 700; color: ${p.passed ? "#10b981" : "#f59e0b"};">${p.passed ? "Passed" : "In Progress"}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Quiz Attempts History -->
        <div style="margin-bottom: 22px;">
          <h4 style="margin: 0 0 10px; font-size: 1rem; color: var(--ha-navy);">Quiz Submissions History</h4>
          ${!quizHistory || quizHistory.length === 0 ? `
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0;">No quizzes taken yet.</p>
          ` : `
            <div style="max-height: 160px; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
                <thead>
                  <tr style="background: #f1f5f9; text-align: left;">
                    <th style="padding: 6px 8px;">Topic</th>
                    <th style="padding: 6px 8px;">Score</th>
                    <th style="padding: 6px 8px;">Percent</th>
                    <th style="padding: 6px 8px;">XP Earned</th>
                    <th style="padding: 6px 8px;">Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${quizHistory.map((q) => `
                    <tr style="border-bottom: 1px solid var(--ha-border);">
                      <td style="padding: 6px 8px; font-weight: 700;">${q.topic_id}</td>
                      <td style="padding: 6px 8px;">${q.score} / ${q.total_questions}</td>
                      <td style="padding: 6px 8px; color: ${q.percentage >= 80 ? "#10b981" : "#ef4444"}; font-weight: 700;">${q.percentage}%</td>
                      <td style="padding: 6px 8px; color: #b45309;">+${q.xp_earned} XP</td>
                      <td style="padding: 6px 8px; color: var(--ha-text-muted);">${new Date(q.completed_at).toLocaleDateString()}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- XP Transaction Ledger -->
        <div>
          <h4 style="margin: 0 0 10px; font-size: 1rem; color: var(--ha-navy);">Auditable XP Transaction Ledger</h4>
          ${!xpLedger || xpLedger.length === 0 ? `
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0;">No XP transactions logged yet.</p>
          ` : `
            <div style="max-height: 140px; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem;">
                <tbody>
                  ${xpLedger.map((tx) => `
                    <tr style="border-bottom: 1px solid var(--ha-border);">
                      <td style="padding: 4px 6px; font-weight: 700; color: #b45309;">+${tx.amount} XP</td>
                      <td style="padding: 4px 6px; color: var(--ha-navy);">${tx.source}</td>
                      <td style="padding: 4px 6px; color: var(--ha-text-muted); font-size: 0.75rem;">${tx.created_at}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>

      </div>
    </div>
  `;
    mount.querySelector("#btn-close-dossier")?.addEventListener("click", () => {
      mount.innerHTML = "";
    });
  }
  function renderCurriculumTab(mount, topics, mainContainer, onNavigate) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Curriculum Topics Manager</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Activate, deactivate, renumber or delete topics. Physical class taught by Sir Zubair.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-admin-reset-curriculum">Reset to Official Topics</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${topics.map((t) => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); background: ${t.active !== false ? "#fff" : "#f8fafc"}; opacity: ${t.active !== false ? "1" : "0.6"};">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-navy">${t.number}</span>
                <strong style="font-size: 1rem; color: var(--ha-navy);">${t.title}</strong>
                ${t.active !== false ? '<span class="badge badge-green">Active</span>' : '<span class="badge badge-outline">Inactive</span>'}
              </div>
              <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 4px 0 0;">${t.subtitle || t.summary || ""}</p>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline btn-xs btn-toggle-topic" data-id="${t.id}">${t.active !== false ? "Deactivate" : "Activate"}</button>
              <button class="btn btn-danger btn-xs btn-delete-topic" data-id="${t.id}">Delete</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
    mount.querySelectorAll(".btn-toggle-topic").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        try {
          await apiClient2.adminToggleCurriculum(id);
          stateManager.adminToggleTopic(id);
          sound.playClick();
          window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
        } catch (err) {
          alert(err.message);
        }
      });
    });
    mount.querySelectorAll(".btn-delete-topic").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (confirm(`Delete topic "${id}"? Remaining topics will be renumbered automatically.`)) {
          try {
            await apiClient2.adminDeleteCurriculum(id);
            stateManager.adminDeleteTopic(id);
            sound.playClick();
            window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
          } catch (err) {
            alert(err.message);
          }
        }
      });
    });
    mount.querySelector("#btn-admin-reset-curriculum")?.addEventListener("click", async () => {
      if (confirm("Reset curriculum to the 6 official class topics?")) {
        try {
          await apiClient2.adminResetCurriculum();
          stateManager.adminResetCurriculum();
          sound.playSuccess();
          window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
        } catch (err) {
          alert(err.message);
        }
      }
    });
  }
  async function renderQuestionsTab(mount, topics) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Server-Side Questions Database</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Real question records stored in the SQLite database. Dynamically sampled during practice & quizzes.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <select id="q-filter-topic" style="padding: 6px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.85rem;">
            <option value="">All Topics</option>
            ${topics.map((t) => `<option value="${t.id}">${t.title}</option>`).join("")}
          </select>
          <button class="btn btn-primary btn-sm" id="btn-add-question">+ Add Question</button>
        </div>
      </div>

      <div id="questions-list-mount">
        <p style="padding: 20px; text-align: center; color: var(--ha-text-muted);">Loading questions from database...</p>
      </div>
    </div>
  `;
    const qListMount = mount.querySelector("#questions-list-mount");
    const loadQuestions = async (topicId = null) => {
      try {
        const res = await apiClient2.adminGetQuestions(topicId);
        const questions = res.questions || [];
        if (questions.length === 0) {
          qListMount.innerHTML = `<p style="padding: 20px; text-align: center; color: var(--ha-text-muted);">No questions found.</p>`;
          return;
        }
        qListMount.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px; max-height: 500px; overflow-y: auto;">
          ${questions.map((q, idx) => `
            <div style="padding: 12px 14px; border: 1px solid var(--ha-border); border-radius: var(--radius-md); background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span class="badge badge-navy" style="font-size: 0.72rem;">#${idx + 1} \u2022 ${q.topicId}</span>
                <span class="badge badge-outline" style="font-size: 0.7rem;">Diff: ${q.difficulty} | +${q.xpReward} XP</span>
              </div>
              <strong style="color: var(--ha-navy); font-size: 0.95rem; display: block; margin-bottom: 6px;">${q.question}</strong>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px;">
                ${q.options.map((opt, oIdx) => `
                  <span style="padding: 3px 8px; border-radius: var(--radius-sm); font-size: 0.78rem; background: ${oIdx === q.answer ? "#d1fae5; color: #065f46; font-weight: 700;" : "#f1f5f9; color: var(--ha-navy);"};">
                    ${opt} ${oIdx === q.answer ? "\u2713" : ""}
                  </span>
                `).join("")}
              </div>
              ${q.explanation ? `<p style="font-size: 0.8rem; color: var(--ha-text-muted); margin: 0;"><em>Explanation: ${q.explanation}</em></p>` : ""}
            </div>
          `).join("")}
        </div>
      `;
      } catch (e) {
        qListMount.innerHTML = `<p style="color: #ef4444;">Failed to load questions: ${e.message}</p>`;
      }
    };
    loadQuestions();
    mount.querySelector("#q-filter-topic")?.addEventListener("change", (e) => {
      loadQuestions(e.target.value);
    });
    mount.querySelector("#btn-add-question")?.addEventListener("click", async () => {
      const topicId = prompt("Enter topic ID (e.g. adjectives, genitive_s, whose):", "adjectives");
      if (!topicId) return;
      const question = prompt("Enter question text:");
      if (!question) return;
      const optStr = prompt("Enter 4 options separated by comma (e.g. red, blue, green, yellow):");
      if (!optStr) return;
      const options = optStr.split(",").map((s) => s.trim());
      const answer = parseInt(prompt("Index of correct option (0, 1, 2, or 3):", "0"), 10) || 0;
      const explanation = prompt("Explanation (optional):") || "";
      try {
        await apiClient2.adminCreateQuestion({ topicId, question, options, correctAnswer: answer, explanation });
        sound.playSuccess();
        alert("Question created in persistent database!");
        loadQuestions();
      } catch (err) {
        alert(err.message);
      }
    });
  }
  function renderQuizzesTab(mount, topics, students) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 6px;">Curriculum Quizzes Performance</h2>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
        Topic quiz mastery benchmarks across enrolled students.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        ${topics.map((t) => {
      const passCount = students.filter((s) => s.topicProgress && s.topicProgress[t.id] && s.topicProgress[t.id].passed).length;
      const passRate = students.length > 0 ? Math.round(passCount / students.length * 100) : 0;
      return `
            <div style="padding: 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: var(--ha-navy); font-size: 1rem;">${t.title}</strong>
                <span class="badge badge-navy">${passCount} / ${students.length} Passed</span>
              </div>
              <div class="progress-bar-bg" style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 8px;">
                <div style="height: 100%; width: ${passRate}%; background: var(--ha-navy);"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--ha-text-muted);">
                <span>Passing Standard: 80%</span>
                <span>Pass Rate: ${passRate}%</span>
              </div>
            </div>
          `;
    }).join("")}
      </div>
    </div>
  `;
  }
  function renderActivitiesTab(mount, topics, students) {
    const totalGames = students.reduce((sum, s) => sum + (s.stats?.gamesPlayed || 0), 0);
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0;">Interactive Game Center Telemetry</h2>
        <span class="badge badge-green" style="font-size: 0.8rem;">Total Plays: ${totalGames}</span>
      </div>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
        Tracking Sentence Scramble, Word Match, Sentence Builder, and True/False across topics.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #3b82f6;">
          <strong style="display: block; color: var(--ha-navy);">Sentence Scramble</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Syntax & Word Order</span>
        </div>
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #10b981;">
          <strong style="display: block; color: var(--ha-navy);">Sentence Builder</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Grammar Construction</span>
        </div>
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #f59e0b;">
          <strong style="display: block; color: var(--ha-navy);">Word Match</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Vocabulary Associations</span>
        </div>
        <div style="padding: 16px; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid #8b5cf6;">
          <strong style="display: block; color: var(--ha-navy);">True / False Drills</strong>
          <span style="font-size: 0.82rem; color: var(--ha-text-muted);">Rapid Comprehension</span>
        </div>
      </div>
    </div>
  `;
  }
  function renderRoleplaysTab(mount, roleplays, mainContainer, onNavigate) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Physical Class Roleplay Presentations</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            The 5 official spoken presentations taught by Sir Zubair.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-admin-reset-rp">Reset to 5 Official Roleplays</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${roleplays.map((rp) => `
          <div style="padding: 16px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); background: ${rp.active !== false ? "#fff" : "#f8fafc"}; opacity: ${rp.active !== false ? "1" : "0.6"};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-navy">Roleplay ${rp.number}</span>
                <strong style="font-size: 1.05rem; color: var(--ha-navy);">${rp.title}</strong>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-outline btn-xs btn-toggle-rp" data-id="${rp.id}">${rp.active !== false ? "Deactivate" : "Activate"}</button>
                <button class="btn btn-outline btn-xs btn-edit-rp" data-id="${rp.id}">Edit</button>
              </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0 0 4px;"><strong>Scenario:</strong> ${rp.scenario}</p>
            <p style="font-size: 0.8rem; color: var(--ha-navy); margin: 0;"><strong>Grammar Focus:</strong> ${Array.isArray(rp.grammarFocus) ? rp.grammarFocus.join(", ") : rp.grammarFocus || ""}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
    mount.querySelectorAll(".btn-toggle-rp").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        try {
          await apiClient2.adminToggleRoleplay(id);
          stateManager.adminToggleRoleplayActive(id);
          sound.playClick();
          window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
        } catch (err) {
          alert(err.message);
        }
      });
    });
    mount.querySelectorAll(".btn-edit-rp").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const rp = roleplays.find((r) => r.id === id);
        if (!rp) return;
        const title = prompt("Edit title:", rp.title);
        if (!title) return;
        const scenario = prompt("Edit scenario:", rp.scenario);
        if (!scenario) return;
        try {
          await apiClient2.adminUpdateRoleplay(id, { title, scenario });
          stateManager.adminUpdateRoleplay(id, { title, scenario });
          sound.playSuccess();
          window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
        } catch (err) {
          alert(err.message);
        }
      });
    });
    mount.querySelector("#btn-admin-reset-rp")?.addEventListener("click", async () => {
      if (confirm("Reset to the 5 official roleplay presentations?")) {
        try {
          await apiClient2.adminResetRoleplays();
          stateManager.adminResetRoleplays();
          sound.playSuccess();
          window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
        } catch (err) {
          alert(err.message);
        }
      }
    });
  }
  function renderLeaderboardTab(mount, students) {
    const sorted = [...students].sort((a, b) => (b.xp || 0) - (a.xp || 0));
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 6px;">Real Class Leaderboard</h2>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 18px;">
        Live database ranking by XP and level. Zero fake students.
      </p>

      ${sorted.length === 0 ? `
        <p style="padding: 20px; text-align: center; color: var(--ha-text-muted);">No students have joined the class yet.</p>
      ` : `
        <div class="table-responsive-wrapper" style="overflow-x: auto; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="text-align: center; min-width: 80px;">Rank</th>
                <th style="min-width: 170px;">Student</th>
                <th style="text-align: center; min-width: 150px;">Level Title</th>
                <th style="text-align: center; min-width: 90px;">Streak</th>
                <th style="text-align: right; min-width: 120px;">Total XP</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map((s, idx) => `
                <tr>
                  <td style="text-align: center; font-weight: 800; color: ${idx === 0 ? "#b45309" : "var(--ha-navy)"}; white-space: nowrap;">
                    ${idx === 0 ? "\u{1F947} 1" : idx === 1 ? "\u{1F948} 2" : idx === 2 ? "\u{1F949} 3" : `#${idx + 1}`}
                  </td>
                  <td style="white-space: nowrap; font-weight: 700; color: var(--ha-navy);">
                    <div style="display: inline-flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.35rem; line-height: 1; flex-shrink: 0;">${s.avatar || "\u{1F981}"}</span>
                      <span style="white-space: nowrap;">${s.name}</span>
                    </div>
                  </td>
                  <td style="text-align: center; white-space: nowrap;">
                    <span class="admin-level-badge">${s.levelTitle || `Level ${s.level || 1}`}</span>
                  </td>
                  <td style="text-align: center; white-space: nowrap; font-weight: 700; color: var(--ha-navy);">\u{1F525} ${s.streak || 0}d</td>
                  <td style="text-align: right; white-space: nowrap; font-weight: 800; color: #b45309;">\u26A1 ${s.xp || 0} XP</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
  }
  async function renderMessagesTab(mount) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">\u{1F4AC} Student Questions & Messages</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Live questions sent by students through the Ask Sir Zubair chat box. Reply directly to assist them.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-refresh-messages">\u{1F504} Refresh Messages</button>
      </div>

      <div id="messages-list-container">
        <p style="padding: 30px; text-align: center; color: var(--ha-text-muted);">Loading student questions...</p>
      </div>
    </div>
  `;
    async function loadAndRender() {
      const listMount = mount.querySelector("#messages-list-container");
      if (!listMount) return;
      try {
        const res = await apiClient2.adminGetMessages();
        const messages = res?.messages || [];
        if (messages.length === 0) {
          listMount.innerHTML = `
          <div style="padding: 36px 20px; text-align: center; background: #f8fafc; border-radius: var(--radius-md);">
            <div style="font-size: 2rem; margin-bottom: 8px;">\u{1F4AC}</div>
            <p style="font-size: 0.92rem; color: var(--ha-text-muted); margin: 0;">No student questions yet. When students ask questions via the chat box, they will appear here.</p>
          </div>
        `;
          return;
        }
        listMount.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${messages.map((m) => `
            <div class="message-card-admin" style="padding: 16px 18px; background: #ffffff; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <span style="font-weight: 800; color: var(--ha-navy); font-size: 0.95rem;">\u{1F464} ${m.senderName || "Student"}</span>
                  ${m.studentEmail ? `<span style="font-size: 0.76rem; color: var(--ha-text-muted); margin-left: 6px;">(${m.studentEmail})</span>` : ""}
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 0.72rem; color: var(--ha-text-muted);">${m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}</span>
                  <button type="button" class="btn btn-outline btn-xs btn-delete-msg" data-id="${m.messageId}" style="padding: 2px 6px; font-size: 0.7rem; color: var(--ha-red);">\u{1F5D1}\uFE0F</button>
                </div>
              </div>
              <div style="font-size: 0.92rem; color: #1e293b; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border-left: 3px solid var(--ha-navy); margin-bottom: 10px;">
                ${m.content}
              </div>

              ${m.replyText ? `
                <div style="background: #eff6ff; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #3b82f6; margin-bottom: 8px;">
                  <div style="font-size: 0.75rem; font-weight: 800; color: #1d4ed8; margin-bottom: 3px;">
                    \u{1F468}\u200D\u{1F3EB} Your Reply:
                  </div>
                  <div style="font-size: 0.88rem; color: #1e293b;">${m.replyText}</div>
                </div>
              ` : `
                <div class="reply-form-mount" style="margin-top: 10px;">
                  <div style="display: flex; gap: 8px;">
                    <input type="text" class="input-reply-text" placeholder="Type your reply to ${m.senderName}..." style="flex: 1; padding: 8px 12px; font-size: 0.85rem; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); outline: none;" />
                    <button type="button" class="btn btn-secondary btn-sm btn-send-reply" data-id="${m.messageId}">Reply</button>
                  </div>
                </div>
              `}
            </div>
          `).join("")}
        </div>
      `;
        listMount.querySelectorAll(".btn-send-reply").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            const input = btn.closest(".reply-form-mount")?.querySelector(".input-reply-text");
            const replyText = input?.value?.trim();
            if (!replyText) return alert("Please enter reply text");
            btn.disabled = true;
            btn.textContent = "Sending...";
            try {
              await apiClient2.adminReplyMessage(id, replyText);
              sound.playSuccess();
              loadAndRender();
            } catch (e) {
              alert(e.message);
              btn.disabled = false;
              btn.textContent = "Reply";
            }
          });
        });
        listMount.querySelectorAll(".btn-delete-msg").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            if (!confirm("Delete this message?")) return;
            try {
              await apiClient2.adminDeleteMessage(id);
              sound.playSuccess();
              loadAndRender();
            } catch (e) {
              alert(e.message);
            }
          });
        });
      } catch (err) {
        listMount.innerHTML = `<p style="color: var(--ha-red); padding: 20px;">Failed to load messages: ${err.message}</p>`;
      }
    }
    mount.querySelector("#btn-refresh-messages")?.addEventListener("click", () => {
      sound.playClick();
      loadAndRender();
    });
    loadAndRender();
  }
  function renderNotificationsTab(mount, notifications, mainContainer) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-navy);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
        <div>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Classroom Notifications Feed</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0;">
            Persisted notifications generated by student enrollments and academic milestones.
          </p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-mark-all-read">Mark All Read</button>
      </div>

      ${!notifications || notifications.length === 0 ? `
        <p style="padding: 30px; text-align: center; color: var(--ha-text-muted);">No notifications yet.</p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${notifications.map((n) => `
            <div style="padding: 14px 16px; border-radius: var(--radius-md); background: ${n.isRead ? "#f8fafc" : "#eff6ff"}; border-left: 4px solid ${n.isRead ? "var(--ha-border)" : "var(--ha-navy)"}; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: var(--ha-navy); font-size: 0.95rem; display: block;">${n.title}</strong>
                <span style="font-size: 0.88rem; color: var(--ha-text-muted);">${n.message}</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--ha-text-muted);">${new Date(n.createdAt).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>
      `}
    </div>
  `;
    mount.querySelector("#btn-mark-all-read")?.addEventListener("click", async () => {
      try {
        await apiClient2.adminMarkNotificationsRead();
        sound.playSuccess();
        window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
      } catch (e) {
        alert(e.message);
      }
    });
  }
  function renderSettingsTab(mount, classInfo) {
    mount.innerHTML = `
    <div class="ha-card" style="padding: 24px; max-width: 600px; border-top: 4px solid var(--ha-navy);">
      <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 6px;">Classroom Settings</h2>
      <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
        Update the class title, private class code, or instructor name.
      </p>

      <form id="form-class-settings" style="display: flex; flex-direction: column; gap: 14px;">
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CLASS NAME</label>
          <input type="text" id="set-class-name" value="${classInfo.name || ""}" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md);" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CLASS CODE (Used by students to join)</label>
          <input type="text" id="set-class-code" value="${classInfo.code || ""}" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); text-transform: uppercase;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">CLASS TEACHER</label>
          <input type="text" id="set-class-teacher" value="${classInfo.teacher || ""}" required style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md);" />
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top: 8px;">Save Settings</button>
      </form>
    </div>
  `;
    mount.querySelector("#form-class-settings")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = mount.querySelector("#set-class-name").value;
      const code = mount.querySelector("#set-class-code").value;
      const teacher = mount.querySelector("#set-class-teacher").value;
      try {
        await apiClient2.adminUpdateSettings({ name, code, teacher });
        stateManager.updateClassSettings({ name, code, teacher });
        sound.playSuccess();
        alert("Class settings updated successfully!");
        window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
      } catch (err) {
        alert(err.message);
      }
    });
  }
  function renderSecurityTab(mount) {
    mount.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 620px;">
      
      <!-- Card 1: Change Password -->
      <div class="ha-card" style="padding: 24px; border-top: 4px solid var(--ha-red);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.3rem;">\u{1F511}</span>
          <h2 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Change Teacher Password</h2>
        </div>
        <p style="font-size: 0.86rem; color: var(--ha-text-muted); margin: 0 0 18px;">
          Update the Teacher Portal password. Current password verification and bcrypt hashing (cost 10) are enforced server-side.
        </p>

        <div id="sec-feedback-success" style="display: none; padding: 11px 14px; background: rgba(34, 197, 94, 0.12); color: #166534; border-radius: var(--radius-sm); font-size: 0.86rem; font-weight: 700; border-left: 4px solid #22c55e; margin-bottom: 14px;">
          \u2713 Your password has been changed successfully.
        </div>

        <div id="sec-feedback-error" style="display: none; padding: 11px 14px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.86rem; font-weight: 700; border-left: 4px solid var(--ha-red); margin-bottom: 14px;"></div>

        <form id="form-admin-password" style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label for="sec-curr-pass" style="display: block; font-size: 0.78rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
              CURRENT PASSWORD *
            </label>
            <div style="position: relative;">
              <input type="password" id="sec-curr-pass" required autocomplete="current-password"
                placeholder="Enter current teacher password"
                style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              <button type="button" class="toggle-pass-inline" data-target="sec-curr-pass"
                style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;">
                \u{1F441}\uFE0F
              </button>
            </div>
          </div>

          <div>
            <label for="sec-new-pass" style="display: block; font-size: 0.78rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
              NEW PASSWORD * (Minimum 6 characters)
            </label>
            <div style="position: relative;">
              <input type="password" id="sec-new-pass" minlength="6" required autocomplete="new-password"
                placeholder="Create new secure password"
                style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              <button type="button" class="toggle-pass-inline" data-target="sec-new-pass"
                style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;">
                \u{1F441}\uFE0F
              </button>
            </div>
          </div>

          <div>
            <label for="sec-conf-pass" style="display: block; font-size: 0.78rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
              CONFIRM NEW PASSWORD *
            </label>
            <div style="position: relative;">
              <input type="password" id="sec-conf-pass" minlength="6" required autocomplete="new-password"
                placeholder="Re-enter new password"
                style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              <button type="button" class="toggle-pass-inline" data-target="sec-conf-pass"
                style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;">
                \u{1F441}\uFE0F
              </button>
            </div>
          </div>

          <button type="submit" id="btn-submit-change-pass" class="btn btn-secondary" style="background: var(--ha-red); border-color: var(--ha-red); margin-top: 6px; padding: 11px; font-weight: 800;">
            Change Password
          </button>
        </form>
      </div>

      <!-- Card 2: Active Sessions & Multi-Device Security -->
      <div class="ha-card" style="padding: 22px; border-top: 4px solid var(--ha-navy);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.3rem;">\u{1F4F1}</span>
          <h2 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Session & Device Management</h2>
        </div>
        <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0 0 16px; line-height: 1.4;">
          Your login session is securely maintained with persistent HTTP-only cookies in Turso Cloud. If you used other devices, you can revoke them here.
        </p>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="button" class="btn btn-outline" id="btn-sec-logout-all" style="border-color: var(--ha-red); color: var(--ha-red); font-weight: 700;">
            <span>\u{1F4F1}</span> Log out of all devices
          </button>
        </div>
      </div>

    </div>
  `;
    mount.querySelectorAll(".toggle-pass-inline").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetInput = mount.querySelector(`#${btn.dataset.target}`);
        if (targetInput) {
          if (targetInput.type === "password") {
            targetInput.type = "text";
            btn.textContent = "\u{1F648}";
          } else {
            targetInput.type = "password";
            btn.textContent = "\u{1F441}\uFE0F";
          }
        }
      });
    });
    mount.querySelector("#form-admin-password")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const currInput = mount.querySelector("#sec-curr-pass");
      const newInput = mount.querySelector("#sec-new-pass");
      const confInput = mount.querySelector("#sec-conf-pass");
      const successBox = mount.querySelector("#sec-feedback-success");
      const errorBox = mount.querySelector("#sec-feedback-error");
      const submitBtn = mount.querySelector("#btn-submit-change-pass");
      if (successBox) successBox.style.display = "none";
      if (errorBox) errorBox.style.display = "none";
      const currentPassword = currInput?.value;
      const newPassword = newInput?.value;
      const confirmPassword = confInput?.value;
      if (newPassword !== confirmPassword) {
        if (errorBox) {
          errorBox.textContent = "New passwords do not match. Please re-enter.";
          errorBox.style.display = "block";
        }
        return;
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>\u23F3</span> Changing password...";
      }
      try {
        await stateManager.updateTeacherPassword(currentPassword, newPassword, confirmPassword);
        sound.playSuccess();
        if (successBox) {
          successBox.textContent = "Your password has been changed successfully.";
          successBox.style.display = "block";
        }
        if (currInput) currInput.value = "";
        if (newInput) newInput.value = "";
        if (confInput) confInput.value = "";
      } catch (err) {
        sound.playWrong();
        if (errorBox) {
          errorBox.textContent = err.message || "Failed to change password.";
          errorBox.style.display = "block";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Change Password";
        }
      }
    });
    mount.querySelector("#btn-sec-logout-all")?.addEventListener("click", () => {
      sound.playClick();
      const trigger = document.getElementById("menu-logout-all");
      if (trigger) trigger.click();
    });
  }

  // js/components/auth.js
  function setupAuthModal(modalContainer, onStudentJoined) {
    let selectedAvatar = "\u{1F981}";
    let viewMode = "dual";
    function renderModalContent() {
      const students = stateManager.state.students || [];
      modalContainer.innerHTML = `
      <div class="ha-modal-backdrop hidden" id="auth-modal-backdrop">
        <div class="ha-modal-dialog" style="max-width: 860px; width: 96%; padding: 26px;">
          <button class="modal-close-btn" id="auth-close-btn" title="Close modal">&times;</button>
          
          <!-- Official Logo Presentation -->
          <div style="text-align: center; margin-bottom: 16px;">
            <img src="assets/logo.png" alt="Home Academy English Language Program" 
              style="max-width: 190px; width: 100%; height: auto; object-fit: contain; margin: 0 auto 6px; display: block;" />
            <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 3px;">Home Academy Access Portal</h2>
            <p style="font-size: 0.85rem; color: var(--ha-text-muted); margin: 0;">
              English Language Program \u2022 Select your access portal below
            </p>
          </div>

          <!-- DUAL SIDE-BY-SIDE VIEW -->
          <div id="side-by-side-view">
            <!-- Mobile Segmented Tabs (Shown only on small screens <= 768px) -->
            <div class="auth-mobile-tabs" id="auth-mobile-tabs">
              <button type="button" class="auth-tab-btn active" id="btn-tab-student">
                <span>\u{1F393}</span> Student Login
              </button>
              <button type="button" class="auth-tab-btn" id="btn-tab-teacher">
                <span>\u{1F468}\u200D\u{1F3EB}</span> Teacher Portal
              </button>
            </div>

            <div class="auth-dual-grid">
              
              <!-- LEFT PANEL: STUDENT LOGIN -->
              <div class="auth-box-student" id="auth-box-student" style="display: flex; flex-direction: column; justify-content: space-between; background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-lg); padding: 22px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <div style="width: 38px; height: 38px; border-radius: var(--radius-md); background: var(--ha-navy); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">\u{1F393}</div>
                    <div>
                      <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Student Login</h3>
                      <span style="font-size: 0.76rem; color: var(--ha-text-muted);">Personal Dashboard & Learning Progress</span>
                    </div>
                  </div>

                  <form id="student-side-login-form" style="display: flex; flex-direction: column; gap: 12px;">
                    <div>
                      <label for="student-side-email" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px; letter-spacing: 0.03em;">
                        EMAIL *
                      </label>
                      <input type="email" id="student-side-email" placeholder="e.g. student@gmail.com" required autocomplete="email"
                        style="width: 100%; padding: 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none; background: #fff;" />
                    </div>

                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <label for="student-side-password" style="font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); letter-spacing: 0.03em;">
                          PASSWORD *
                        </label>
                      </div>
                      <div style="position: relative;">
                        <input type="password" id="student-side-password" placeholder="Enter your password" required autocomplete="current-password"
                          style="width: 100%; padding: 11px 38px 11px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none; background: #fff;" />
                        <button type="button" class="toggle-password-btn" data-target="student-side-password"
                          style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;" title="Show or hide password">
                          \u{1F441}\uFE0F
                        </button>
                      </div>
                    </div>

                    <div id="student-side-error" style="display: none; padding: 9px 12px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; border-left: 3px solid var(--ha-red);"></div>

                    <button type="submit" id="student-side-submit-btn" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 800; letter-spacing: 0.04em;">
                      LOGIN
                    </button>
                  </form>

                  <!-- Quick account select chips -->
                  ${students.length > 0 ? `
                    <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--ha-border);">
                      <div style="font-size: 0.72rem; font-weight: 700; color: var(--ha-text-muted); text-transform: uppercase; margin-bottom: 6px;">
                        Select Profile:
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                        ${students.map((s) => `
                          <button type="button" class="side-quick-chip" data-email="${s.email || ""}" data-name="${s.name}"
                            style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: #fff; border: 1px solid var(--ha-border); border-radius: var(--radius-pill); font-size: 0.78rem; font-weight: 700; color: var(--ha-navy); cursor: pointer;" title="Log in as ${s.name}">
                            <span>${s.avatar}</span> ${s.name}
                          </button>
                        `).join("")}
                      </div>
                    </div>
                  ` : ""}
                </div>

                <div style="margin-top: 14px; text-align: center; font-size: 0.82rem; color: var(--ha-text-muted); padding-top: 8px;">
                  New student? <a href="#" id="link-open-registration" style="color: var(--ha-navy); font-weight: 800; text-decoration: underline;">Join Class & Register</a>
                </div>
              </div>

              <!-- MIDDLE SEPARATOR -->
              <div class="auth-separator" style="display: flex; align-items: center; justify-content: center; position: relative;">
                <div style="width: 1px; height: 100%; background: var(--ha-border);"></div>
                <div style="position: absolute; background: #fff; border: 1px solid var(--ha-border); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: var(--ha-text-muted);">
                  OR
                </div>
              </div>

              <!-- RIGHT PANEL: TEACHER PORTAL -->
              <div class="auth-box-teacher mobile-hidden" id="auth-box-teacher" style="display: flex; flex-direction: column; justify-content: space-between; background: #FFF9F7; border: 1.5px solid rgba(217,4,41,0.25); border-radius: var(--radius-lg); padding: 22px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <div style="width: 38px; height: 38px; border-radius: var(--radius-md); background: var(--ha-red); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">\u{1F468}\u200D\u{1F3EB}</div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin: 0; font-weight: 800;">Teacher Portal</h3>
                        <span class="badge badge-red" style="font-size: 0.65rem; padding: 2px 5px;">Sir Zubair</span>
                      </div>
                      <span style="font-size: 0.76rem; color: var(--ha-text-muted);">Class Teacher: <strong>Sir Zubair</strong></span>
                    </div>
                  </div>

                  <form id="teacher-side-login-form" style="display: flex; flex-direction: column; gap: 14px;">
                    <div style="background: #fff; border: 1.5px solid rgba(217,4,41,0.2); border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
                      <div>
                        <div style="font-size: 0.68rem; text-transform: uppercase; font-weight: 800; color: var(--ha-red); letter-spacing: 0.05em;">TEACHER ACCOUNT</div>
                        <div style="font-size: 0.95rem; font-weight: 800; color: var(--ha-navy);">Sir Zubair</div>
                      </div>
                      <span class="badge badge-red" style="font-size: 0.7rem; padding: 3px 8px;">Faculty Portal</span>
                    </div>

                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <label for="teacher-side-password" style="font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); letter-spacing: 0.03em;">
                          ENTER TEACHER PASSWORD *
                        </label>
                      </div>
                      <div style="position: relative;">
                        <input type="password" id="teacher-side-password" placeholder="Enter teacher password" required autocomplete="current-password" autofocus
                          style="width: 100%; padding: 12px 38px 12px 14px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.95rem; outline: none; background: #fff;" />
                        <button type="button" class="toggle-password-btn" data-target="teacher-side-password"
                          style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1.1rem; color: var(--ha-text-muted); padding: 4px;" title="Show or hide password">
                          \u{1F441}\uFE0F
                        </button>
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: var(--ha-text-muted);">
                      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; user-select: none;">
                        <input type="checkbox" id="teacher-side-remember" checked style="accent-color: var(--ha-red); width: 15px; height: 15px; cursor: pointer;" />
                        <span>Keep me logged in (30 days)</span>
                      </label>
                    </div>

                    <div id="teacher-side-error" style="display: none; padding: 9px 12px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; border-left: 3px solid var(--ha-red);"></div>

                    <button type="submit" id="teacher-side-submit-btn" class="btn btn-secondary" style="width: 100%; padding: 12px; font-weight: 800; letter-spacing: 0.04em; background: var(--ha-red); border-color: var(--ha-red);">
                      TEACHER LOGIN
                    </button>
                  </form>
                </div>

                <div style="margin-top: 14px; padding: 9px 11px; background: rgba(217,4,41,0.06); border-radius: var(--radius-sm); font-size: 0.74rem; color: var(--ha-text-muted); line-height: 1.4;">
                  \u{1F512} <strong>Protected Faculty Portal</strong>: Manage students, monitor XP & quizzes, manage curriculum, update class code, and adjust security settings.
                </div>
              </div>

            </div>
          </div>

          <!-- NEW STUDENT REGISTRATION VIEW -->
          <div id="register-student-view" style="display: none;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <button type="button" id="btn-back-to-dual" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                \u2190 Back to Login Portals
              </button>
              <span class="badge badge-navy" style="font-size: 0.78rem;">New Student Registration</span>
            </div>

            <form id="new-student-enroll-form" style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
              <div>
                <label for="enroll-name" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  FULL NAME *
                </label>
                <input type="text" id="enroll-name" placeholder="e.g. Yasir Ahmad" required autocomplete="name"
                  style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              </div>

              <div>
                <label for="enroll-email" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  EMAIL ADDRESS * (Used to save your personal dashboard & log in)
                </label>
                <input type="email" id="enroll-email" placeholder="e.g. student@gmail.com" required autocomplete="email"
                  style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
              </div>

              <div>
                <label for="enroll-password" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  CREATE PASSWORD * (Minimum 4 characters)
                </label>
                <div style="position: relative;">
                  <input type="password" id="enroll-password" placeholder="Create your login password" minlength="4" required autocomplete="new-password"
                    style="width: 100%; padding: 10px 38px 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; outline: none;" />
                  <button type="button" class="toggle-password-btn" data-target="enroll-password"
                    style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--ha-text-muted); padding: 4px;" title="Show or hide password">
                    \u{1F441}\uFE0F
                  </button>
                </div>
              </div>

              <div>
                <label for="enroll-code" style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  CLASS CODE *
                </label>
                <input type="text" id="enroll-code" value="${stateManager.state.classInfo?.code || "HOME-ENGLISH"}" required
                  style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); font-size: 0.92rem; font-weight: 700; color: var(--ha-navy); background: #F8FAFC;" />
              </div>

              <div>
                <label style="display: block; font-size: 0.76rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 4px;">
                  SELECT AVATAR
                </label>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;">
                  ${AVATARS.map((av) => `
                    <div class="avatar-option ${av === selectedAvatar ? "active" : ""}" data-avatar="${av}"
                      style="font-size: 1.3rem; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); border: 2px solid ${av === selectedAvatar ? "var(--ha-navy)" : "var(--ha-border)"}; cursor: pointer; background: ${av === selectedAvatar ? "var(--ha-navy-subtle)" : "#FFF"};">
                      ${av}
                    </div>
                  `).join("")}
                </div>
              </div>

              <div id="enroll-error-msg" style="display: none; padding: 9px 12px; background: var(--ha-red-light); color: var(--ha-red); border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; border-left: 3px solid var(--ha-red);"></div>

              <button type="submit" id="enroll-submit-btn" class="btn btn-secondary btn-lg" style="width: 100%; margin-top: 4px;">
                <span>\u2728</span> CREATE ACCOUNT & JOIN
              </button>
            </form>
          </div>

        </div>
      </div>
    `;
      attachEvents();
    }
    function setViewMode(mode) {
      viewMode = mode;
      const dualView = modalContainer.querySelector("#side-by-side-view");
      const regView = modalContainer.querySelector("#register-student-view");
      if (dualView) dualView.style.display = mode === "dual" ? "block" : "none";
      if (regView) regView.style.display = mode === "register" ? "block" : "none";
      const stuErr = modalContainer.querySelector("#student-side-error");
      const teaErr = modalContainer.querySelector("#teacher-side-error");
      const enrErr = modalContainer.querySelector("#enroll-error-msg");
      if (stuErr) stuErr.style.display = "none";
      if (teaErr) teaErr.style.display = "none";
      if (enrErr) enrErr.style.display = "none";
    }
    function attachEvents() {
      const backdrop = modalContainer.querySelector("#auth-modal-backdrop");
      const closeBtn = modalContainer.querySelector("#auth-close-btn");
      closeBtn?.addEventListener("click", closeModal);
      backdrop?.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
      });
      const btnTabStudent = modalContainer.querySelector("#btn-tab-student");
      const btnTabTeacher = modalContainer.querySelector("#btn-tab-teacher");
      const boxStudent = modalContainer.querySelector("#auth-box-student");
      const boxTeacher = modalContainer.querySelector("#auth-box-teacher");
      btnTabStudent?.addEventListener("click", () => {
        sound.playClick();
        btnTabStudent.classList.add("active");
        btnTabTeacher?.classList.remove("active", "teacher-active");
        boxStudent?.classList.remove("mobile-hidden");
        boxTeacher?.classList.add("mobile-hidden");
      });
      btnTabTeacher?.addEventListener("click", () => {
        sound.playClick();
        btnTabTeacher.classList.add("active", "teacher-active");
        btnTabStudent?.classList.remove("active");
        boxTeacher?.classList.remove("mobile-hidden");
        boxStudent?.classList.add("mobile-hidden");
      });
      modalContainer.querySelector("#link-open-registration")?.addEventListener("click", (e) => {
        e.preventDefault();
        sound.playClick();
        setViewMode("register");
      });
      modalContainer.querySelector("#btn-back-to-dual")?.addEventListener("click", () => {
        sound.playClick();
        setViewMode("dual");
      });
      modalContainer.querySelectorAll(".toggle-password-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetId = btn.dataset.target;
          const input = modalContainer.querySelector(`#${targetId}`);
          if (input) {
            if (input.type === "password") {
              input.type = "text";
              btn.textContent = "\u{1F648}";
            } else {
              input.type = "password";
              btn.textContent = "\u{1F441}\uFE0F";
            }
          }
        });
      });
      modalContainer.querySelectorAll(".avatar-option").forEach((el) => {
        el.addEventListener("click", () => {
          selectedAvatar = el.dataset.avatar;
          modalContainer.querySelectorAll(".avatar-option").forEach((opt) => {
            const isCurrent = opt.dataset.avatar === selectedAvatar;
            opt.style.borderColor = isCurrent ? "var(--ha-navy)" : "var(--ha-border)";
            opt.style.background = isCurrent ? "var(--ha-navy-subtle)" : "#FFF";
          });
        });
      });
      modalContainer.querySelectorAll(".side-quick-chip").forEach((btn) => {
        btn.addEventListener("click", () => {
          sound.playClick();
          const email = btn.dataset.email;
          const name = btn.dataset.name;
          const emailInput = modalContainer.querySelector("#student-side-email");
          const passInput = modalContainer.querySelector("#student-side-password");
          if (emailInput && email) {
            emailInput.value = email;
          }
          if (passInput) {
            passInput.focus();
            passInput.placeholder = `Enter password for ${name}`;
          }
        });
      });
      const studentForm = modalContainer.querySelector("#student-side-login-form");
      studentForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = modalContainer.querySelector("#student-side-email")?.value.trim();
        const password = modalContainer.querySelector("#student-side-password")?.value;
        const errorMsg = modalContainer.querySelector("#student-side-error");
        const submitBtn = modalContainer.querySelector("#student-side-submit-btn");
        if (errorMsg) errorMsg.style.display = "none";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "<span>\u23F3</span> Logging in...";
        }
        try {
          const student = await stateManager.loginStudent({ email, password });
          sound.playSuccess();
          closeModal();
          if (onStudentJoined) onStudentJoined(student, true);
        } catch (err) {
          sound.playWrong();
          if (errorMsg) {
            errorMsg.textContent = err.message || "Login failed. Please check your email and password.";
            errorMsg.style.display = "block";
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "LOGIN";
          }
        }
      });
      const teacherForm = modalContainer.querySelector("#teacher-side-login-form");
      teacherForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const password = modalContainer.querySelector("#teacher-side-password")?.value;
        const rememberMe = modalContainer.querySelector("#teacher-side-remember")?.checked;
        const errorMsg = modalContainer.querySelector("#teacher-side-error");
        const submitBtn = modalContainer.querySelector("#teacher-side-submit-btn");
        if (!password || !password.trim()) {
          if (errorMsg) {
            errorMsg.textContent = "Please enter the teacher password.";
            errorMsg.style.display = "block";
          }
          return;
        }
        if (errorMsg) errorMsg.style.display = "none";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "<span>\u23F3</span> Verifying password...";
        }
        try {
          await stateManager.verifyTeacherLogin({ password: password.trim(), rememberMe });
          sound.playCorrect();
          closeModal();
          window.dispatchEvent(new CustomEvent("ha:navigate", { detail: "admin" }));
        } catch (err) {
          sound.playWrong();
          if (errorMsg) {
            errorMsg.textContent = err.message || "Incorrect password. Please try again.";
            errorMsg.style.display = "block";
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "TEACHER LOGIN";
          }
        }
      });
      const enrollForm = modalContainer.querySelector("#new-student-enroll-form");
      enrollForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = modalContainer.querySelector("#enroll-name")?.value.trim();
        const email = modalContainer.querySelector("#enroll-email")?.value.trim();
        const password = modalContainer.querySelector("#enroll-password")?.value;
        const code = modalContainer.querySelector("#enroll-code")?.value.trim();
        const errorMsg = modalContainer.querySelector("#enroll-error-msg");
        const submitBtn = modalContainer.querySelector("#enroll-submit-btn");
        if (errorMsg) errorMsg.style.display = "none";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "<span>\u23F3</span> Creating Account...";
        }
        try {
          const student = await stateManager.registerStudent({
            name,
            email,
            password,
            classCode: code,
            avatar: selectedAvatar
          });
          sound.playSuccess();
          closeModal();
          if (onStudentJoined) onStudentJoined(student, false);
        } catch (err) {
          sound.playWrong();
          if (errorMsg) {
            errorMsg.textContent = err.message || "Registration failed.";
            errorMsg.style.display = "block";
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "<span>\u2728</span> CREATE ACCOUNT & JOIN";
          }
        }
      });
    }
    function openModal(mode) {
      renderModalContent();
      const backdrop = modalContainer.querySelector("#auth-modal-backdrop");
      if (backdrop) {
        backdrop.classList.remove("hidden");
        backdrop.style.display = "flex";
      }
      if (mode === "register") {
        setViewMode("register");
      } else {
        setViewMode("dual");
        if (mode === "teacher" || mode === "admin") {
          setTimeout(() => {
            modalContainer.querySelector("#teacher-side-password")?.focus();
          }, 100);
        } else {
          setTimeout(() => {
            modalContainer.querySelector("#student-side-email")?.focus();
          }, 100);
        }
      }
    }
    function closeModal() {
      const backdrop = modalContainer.querySelector("#auth-modal-backdrop");
      if (backdrop) {
        backdrop.classList.add("hidden");
        backdrop.style.display = "none";
      }
    }
    window.addEventListener("ha:open-join-modal", (e) => {
      let mode = "dual";
      if (e && e.detail) {
        if (typeof e.detail === "string") mode = e.detail;
        else if (e.detail.tab) mode = e.detail.tab;
      }
      openModal(mode);
    });
    renderModalContent();
    return { openModal, closeModal };
  }

  // js/components/fullTest.js
  function renderFullTest(container, onNavigate) {
    const student = stateManager.getCurrentStudent();
    const activeTopics = stateManager.getActiveCurriculum();
    if (!student) {
      container.innerHTML = `
      <div class="container" style="padding-top: 50px; padding-bottom: 70px; text-align: center; max-width: 620px;">
        <div class="ha-card" style="padding: 40px 24px; border-top: 6px solid var(--ha-navy);">
          <span style="font-size: 3.5rem; display: block; margin-bottom: 12px;">\u{1F393}</span>
          <h2 style="font-size: 1.8rem; color: var(--ha-navy); margin-bottom: 8px;">Full Grammar Test</h2>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            Please log in or join the class with code <strong>HOME-ENGLISH</strong> to take the Comprehensive Full Grammar Test and record your score on the leaderboard.
          </p>
          <button class="btn btn-primary btn-lg" id="btn-fulltest-login">
            \u{1F511} Log In to Take Test
          </button>
        </div>
      </div>
    `;
      container.querySelector("#btn-fulltest-login")?.addEventListener("click", () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: { tab: "login" } }));
      });
      return;
    }
    let testState = "intro";
    let currentQuestions = [];
    let currentIndex = 0;
    let userAnswers = [];
    let submissionToken = null;
    let testResult = null;
    function initTest() {
      submissionToken = "sub_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      let allSeen = [];
      activeTopics.forEach((t) => {
        const seen = stateManager.getSeenQuestionIds(t.id);
        allSeen = allSeen.concat(seen);
      });
      const { questions } = generateFullGrammarTest(activeTopics, allSeen, 2);
      currentQuestions = questions;
      currentIndex = 0;
      userAnswers = [];
      testResult = null;
      testState = "testing";
      render();
      window.scrollTo(0, 0);
    }
    function render() {
      if (testState === "intro") {
        renderIntro();
      } else if (testState === "testing") {
        renderQuestion();
      } else if (testState === "results") {
        renderResults();
      }
    }
    function renderIntro() {
      const history = student.fullTestHistory || [];
      const bestScore = student.stats?.bestFullTestScore || 0;
      const totalTaken = history.length;
      const totalQuestions = activeTopics.length * 2;
      container.innerHTML = `
      <div class="container" style="padding-top: 28px; padding-bottom: 60px; max-width: 820px;">
        
        <!-- Breadcrumb / Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-test-back-dash">\u2190 Back to Dashboard</button>
          <div style="display: flex; gap: 8px;">
            <span class="badge badge-navy">Official Comprehensive Exam</span>
            <span class="badge badge-red">Sir Zubair</span>
          </div>
        </div>

        <!-- Hero Card -->
        <div class="ha-card topic-master-card" style="padding: 36px 30px; border-top: 6px solid var(--ha-navy); margin-bottom: 28px;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
            <span style="font-size: 3.5rem; background: var(--ha-navy-subtle); width: 72px; height: 72px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center;">
              \u{1F393}
            </span>
            <div>
              <h1 style="font-size: 2rem; color: var(--ha-navy); margin: 0 0 4px;">Full Grammar Test</h1>
              <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin: 0;">
                One combined test covering <strong>all ${activeTopics.length} active grammar topics</strong> taught in class by Sir Zubair.
              </p>
            </div>
          </div>

          <!-- Quick Overview Metrics -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 24px;">
            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">EXAM QUESTIONS</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--ha-navy);">${totalQuestions} Questions</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">2 from each active topic</div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">PASSING CRITERIA</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--ha-success);">80% or Higher</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">Mastery benchmark</div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">PASS REWARD</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--ha-gold-dark);">+75 XP \u26A1</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">Added to profile & rank</div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">YOUR BEST SCORE</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: ${bestScore >= 80 ? "var(--ha-success)" : "var(--ha-navy)"};">${bestScore}%</div>
              <div style="font-size: 0.78rem; color: var(--ha-text-muted);">${totalTaken} attempts taken</div>
            </div>
          </div>

          <!-- Topics Included in Test -->
          <div style="margin-bottom: 26px;">
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.04em;">
              Active Topics Tested in this Exam:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${activeTopics.map((t) => `
                <span class="badge" style="background: #F1F5F9; color: var(--ha-navy); border: 1px solid var(--ha-border); padding: 6px 12px; font-size: 0.85rem; font-weight: 700;">
                  <span>${t.icon}</span> Topic ${t.number}: ${t.title}
                </span>
              `).join("")}
            </div>
          </div>

          <!-- Features list -->
          <div style="background: var(--ha-navy-subtle); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 26px;">
            <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: var(--ha-navy); display: flex; flex-direction: column; gap: 6px; font-weight: 600;">
              <li>\u{1F504} <strong>Fresh Questions Every Time</strong>: Questions and choices are randomized on every test.</li>
              <li>\u{1F3AF} <strong>Balanced Representation</strong>: Equal questions selected from each active topic.</li>
              <li>\u{1F4CA} <strong>Topic-by-Topic Breakdown</strong>: Detailed post-test review of your accuracy per grammar topic.</li>
              <li>\u{1F6E1}\uFE0F <strong>Anti-Duplicate Protection</strong>: Test results are securely validated so XP cannot be duplicated.</li>
            </ul>
          </div>

          <!-- Action Button -->
          <div style="text-align: center;">
            <button class="btn btn-primary btn-lg" id="btn-start-full-test" style="background: var(--ha-red); padding: 16px 36px; font-size: 1.15rem; box-shadow: 0 6px 20px rgba(200, 16, 46, 0.35);">
              <span>\u{1F680}</span> START FULL GRAMMAR TEST
            </button>
          </div>
        </div>

        <!-- Recent Attempts History -->
        ${history.length > 0 ? `
          <div class="ha-card" style="padding: 24px;">
            <h3 style="font-size: 1.15rem; color: var(--ha-navy); margin-bottom: 14px;">Your Test History</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${history.slice(0, 5).map((h) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #F8FAFC; border-radius: var(--radius-sm); border: 1px solid var(--ha-border); flex-wrap: wrap; gap: 8px;">
                  <div>
                    <strong style="color: var(--ha-navy); font-size: 0.95rem;">Score: ${h.score} / ${h.total} (${h.percent}%)</strong>
                    <div style="font-size: 0.78rem; color: var(--ha-text-muted);">${new Date(h.date).toLocaleDateString()} at ${new Date(h.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="badge ${h.passed ? "badge-success" : "badge-navy"}">
                      ${h.passed ? "PASSED (80%+)" : "Needs Practice"}
                    </span>
                    ${h.xpEarned ? `<span class="badge badge-gold">+${h.xpEarned} XP</span>` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

      </div>
    `;
      container.querySelector("#btn-test-back-dash")?.addEventListener("click", () => {
        sound.playClick();
        onNavigate("dashboard");
      });
      container.querySelector("#btn-start-full-test")?.addEventListener("click", () => {
        sound.playClick();
        initTest();
      });
    }
    function renderQuestion() {
      const total = currentQuestions.length;
      const q = currentQuestions[currentIndex];
      if (!q) {
        finishTest();
        return;
      }
      const progressPercent = (currentIndex + 1) / total * 100;
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 50px; max-width: 760px;">
        
        <!-- Header status -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
          <span class="badge badge-navy" style="font-size: 0.85rem;">
            ${q.topicIcon || "\u{1F4D6}"} Topic ${q.topicNumber || ""}: ${q.topicTitle || "Grammar"}
          </span>
          <span style="font-weight: 800; color: var(--ha-navy); font-size: 0.95rem;">
            Question ${currentIndex + 1} of ${total}
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="progress-container" style="margin-bottom: 24px; height: 8px;">
          <div class="progress-bar-fill red" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="ha-card topic-master-card" style="border-top: 5px solid ${q.topicColor || "var(--ha-navy)"};">
          
          <div style="font-size: 0.78rem; font-weight: 800; color: ${q.topicColor || "var(--ha-navy)"}; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.04em;">
            Comprehensive Grammar Question
          </div>

          <h2 style="font-size: 1.45rem; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.45;">
            ${q.question}
          </h2>

          <!-- Options Grid -->
          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="ft-options-grid">
            ${(q.options || []).map((opt, idx) => `
              <button class="ft-opt-btn" data-index="${idx}" data-text="${opt}"
                style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s; display: flex; align-items: center;">
                <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem; flex-shrink: 0;">${String.fromCharCode(65 + idx)}</span>
                <span>${opt}</span>
              </button>
            `).join("")}
          </div>

          <!-- Feedback Box -->
          <div id="ft-feedback-box" style="display: none; padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
            <div id="ft-feedback-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 4px;"></div>
            <div id="ft-feedback-text" style="font-size: 0.9rem;"></div>
          </div>

          <!-- Next Button -->
          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary btn-lg" id="btn-next-ft-question" style="display: none; background: var(--ha-navy);">
              ${currentIndex === total - 1 ? "Finish Exam & View Report \u2192" : "Next Question \u2192"}
            </button>
          </div>
        </div>

      </div>
    `;
      const optButtons = container.querySelectorAll(".ft-opt-btn");
      const feedbackBox = container.querySelector("#ft-feedback-box");
      const feedbackTitle = container.querySelector("#ft-feedback-title");
      const feedbackText = container.querySelector("#ft-feedback-text");
      const nextBtn = container.querySelector("#btn-next-ft-question");
      optButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          optButtons.forEach((b) => b.disabled = true);
          const chosenIdx = parseInt(btn.dataset.index);
          const chosenText = btn.dataset.text;
          const isCorrect = chosenIdx === q.answer;
          userAnswers.push({
            questionId: q.id,
            topicId: q.topicId,
            topicTitle: q.topicTitle,
            topicIcon: q.topicIcon,
            question: q.question,
            chosenText,
            correctText: q.options[q.answer],
            isCorrect,
            explanation: q.explanation
          });
          if (isCorrect) {
            sound.playCorrect();
            btn.style.borderColor = "var(--ha-success)";
            btn.style.background = "var(--ha-success-bg)";
            btn.style.color = "var(--ha-success)";
            feedbackBox.style.background = "var(--ha-success-bg)";
            feedbackBox.style.color = "#065F46";
            feedbackBox.style.border = "1px solid var(--ha-success)";
            feedbackTitle.innerHTML = "\u{1F389} Correct!";
          } else {
            sound.playWrong();
            btn.style.borderColor = "var(--ha-error)";
            btn.style.background = "var(--ha-red-light)";
            btn.style.color = "var(--ha-red)";
            feedbackBox.style.background = "var(--ha-red-light)";
            feedbackBox.style.color = "#991B1B";
            feedbackBox.style.border = "1px solid var(--ha-red)";
            feedbackTitle.innerHTML = `\u274C Incorrect (Correct: "${q.options[q.answer]}")`;
          }
          feedbackText.textContent = q.explanation || "";
          feedbackBox.style.display = "block";
          nextBtn.style.display = "inline-flex";
        });
      });
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        currentIndex++;
        if (currentIndex >= total) {
          finishTest();
        } else {
          render();
          window.scrollTo(0, 0);
        }
      });
    }
    function finishTest() {
      const total = currentQuestions.length;
      const correctCount = userAnswers.filter((a) => a.isCorrect).length;
      const percent = Math.round(correctCount / total * 100);
      const passed = percent >= 80;
      const xpEarned = passed ? 75 : 20;
      const breakdown = {};
      activeTopics.forEach((t) => {
        const answersForTopic = userAnswers.filter((a) => a.topicId === t.id);
        const correctForTopic = answersForTopic.filter((a) => a.isCorrect).length;
        const totalForTopic = answersForTopic.length;
        const topicPercent = totalForTopic > 0 ? Math.round(correctForTopic / totalForTopic * 100) : 0;
        breakdown[t.id] = {
          title: t.title,
          icon: t.icon,
          correct: correctForTopic,
          total: totalForTopic,
          percent: topicPercent
        };
      });
      const recordPayload = {
        submissionToken,
        score: correctCount,
        total,
        percent,
        xpEarned,
        topicBreakdown: breakdown,
        answers: userAnswers,
        questionIds: currentQuestions.map((q) => ({ id: q.id, topicId: q.topicId }))
      };
      stateManager.recordFullTestResult(recordPayload);
      testResult = {
        correctCount,
        total,
        percent,
        passed,
        xpEarned,
        breakdown,
        answers: userAnswers
      };
      if (passed) {
        sound.playLevelUp();
        fireConfetti(4e3);
      } else {
        sound.playClick();
      }
      testState = "results";
      render();
      window.scrollTo(0, 0);
    }
    function renderResults() {
      const res = testResult;
      if (!res) {
        testState = "intro";
        render();
        return;
      }
      container.innerHTML = `
      <div class="container" style="padding-top: 30px; padding-bottom: 70px; max-width: 820px;">
        
        <!-- Score Banner Card -->
        <div class="ha-card topic-master-card" style="text-align: center; border-top: 6px solid ${res.passed ? "var(--ha-gold)" : "var(--ha-red)"}; margin-bottom: 30px;">
          <span style="font-size: 4.5rem; display: inline-block; margin-bottom: 12px;">
            ${res.passed ? "\u{1F3C6}" : "\u{1F4DA}"}
          </span>
          
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 6px;">
            ${res.passed ? "Full Grammar Test Passed!" : "Exam Completed \u2014 Review Mistakes"}
          </h1>

          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 580px; margin: 0 auto 24px; line-height: 1.6;">
            ${res.passed ? `Outstanding achievement, <strong>${student.name}</strong>! You mastered the 6 class topics taught by <strong>Sir Zubair</strong>.` : `You scored ${res.percent}%. 80% is required to pass the exam. Review your topic breakdown and mistakes below, then take a fresh test!`}
          </p>

          <!-- Big Metric Badges -->
          <div style="display: inline-flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; background: var(--ha-navy-subtle); padding: 16px 26px; border-radius: var(--radius-lg); margin-bottom: 26px;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">EXAM SCORE</div>
              <div style="font-size: 2.3rem; font-weight: 800; color: ${res.passed ? "var(--ha-navy)" : "var(--ha-red)"};">
                ${res.correctCount} / ${res.total} (${res.percent}%)
              </div>
            </div>

            <div style="border-left: 2px solid var(--ha-border); padding-left: 20px; text-align: left;">
              <div style="font-size: 0.78rem; font-weight: 800; color: var(--ha-gold-dark); text-transform: uppercase;">XP AWARDED</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--ha-gold-dark);">
                +${res.xpEarned} XP \u26A1
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-lg" id="btn-retake-fresh-test" style="background: var(--ha-red);">
              <span>\u{1F504}</span> Take Fresh Test (New Questions)
            </button>
            <button class="btn btn-outline btn-lg" id="btn-results-goto-dash">
              <span>\u{1F4CA}</span> Return to Dashboard
            </button>
          </div>
        </div>

        <!-- Topic-by-Topic Performance Breakdown -->
        <div class="ha-card" style="padding: 26px; margin-bottom: 30px;">
          <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 4px;">Topic-by-Topic Performance</h3>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 0 0 20px;">
            See how you performed across each individual grammar topic:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            ${Object.entries(res.breakdown).map(([tId, info]) => `
              <div style="background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 1.3rem;">${info.icon}</span>
                  <span class="badge ${info.percent >= 80 ? "badge-success" : "badge-navy"}">
                    ${info.correct} / ${info.total} (${info.percent}%)
                  </span>
                </div>
                <strong style="color: var(--ha-navy); font-size: 0.92rem; display: block; margin-bottom: 8px;">${info.title}</strong>
                <div class="progress-container" style="height: 6px;">
                  <div class="progress-bar-fill" style="width: ${info.percent}%; background: ${info.percent >= 80 ? "var(--ha-success)" : "var(--ha-red)"};"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Mistakes & Answers Review -->
        <div class="ha-card" style="padding: 26px;">
          <h3 style="font-size: 1.25rem; color: var(--ha-navy); margin: 0 0 16px;">Question-by-Question Review</h3>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${res.answers.map((ans, idx) => `
              <div style="padding: 14px 18px; border-radius: var(--radius-md); border: 1.5px solid ${ans.isCorrect ? "var(--ha-success)" : "var(--ha-red)"}; background: ${ans.isCorrect ? "var(--ha-success-bg)" : "var(--ha-red-light)"};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="background: var(--ha-navy); color: #fff; width: 24px; height: 24px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800;">${idx + 1}</span>
                    <span class="badge badge-navy" style="font-size: 0.75rem;">${ans.topicIcon} ${ans.topicTitle}</span>
                  </div>
                  <span style="font-size: 0.8rem; font-weight: 800; color: ${ans.isCorrect ? "var(--ha-success)" : "var(--ha-red)"};">
                    ${ans.isCorrect ? "\u2713 CORRECT" : "\u2717 INCORRECT"}
                  </span>
                </div>
                <div style="font-size: 1rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 6px;">
                  ${ans.question}
                </div>
                <div style="font-size: 0.88rem; margin-bottom: 4px;">
                  Your answer: <strong>${ans.chosenText}</strong>
                  ${!ans.isCorrect ? ` \u2022 Correct answer: <strong style="color: var(--ha-navy);">${ans.correctText}</strong>` : ""}
                </div>
                ${ans.explanation ? `<div style="font-size: 0.82rem; opacity: 0.9; font-style: italic;">\u{1F4A1} ${ans.explanation}</div>` : ""}
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    `;
      container.querySelector("#btn-retake-fresh-test")?.addEventListener("click", () => {
        sound.playClick();
        initTest();
      });
      container.querySelector("#btn-results-goto-dash")?.addEventListener("click", () => {
        sound.playClick();
        onNavigate("dashboard");
      });
    }
    render();
  }

  // js/components/activitiesHub.js
  function renderActivitiesHub(container, onNavigate, initialTopicId = null, initialActivityType = null) {
    const student = stateManager.getCurrentStudent();
    const activeTopics = stateManager.getActiveCurriculum();
    let selectedTopicId = initialTopicId || (activeTopics.length > 0 ? activeTopics[0].id : "adjectives");
    let currentActivity = initialActivityType || null;
    function render() {
      if (!currentActivity) {
        renderActivitySelector();
      } else {
        renderActivityRunner();
      }
    }
    function renderActivitySelector() {
      const topicData = TOPIC_ACTIVITIES[selectedTopicId] || TOPIC_ACTIVITIES.adjectives;
      const activeTopicObj = activeTopics.find((t) => t.id === selectedTopicId) || activeTopics[0];
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 900px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span class="badge badge-navy">Interactive Practice</span>
            <span class="badge badge-red">Sir Zubair's Class Activities</span>
          </div>
          <h1 style="font-size: 2.2rem; color: var(--ha-navy); margin-bottom: 8px;">Grammar Activities Hub</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); max-width: 620px; margin: 0 auto 20px;">
            Choose a class topic and practice through <strong>matching pairs, sentence scrambles, true/false, and sentence building</strong>.
          </p>
        </div>

        <!-- Topic Selector Tabs -->
        <div style="margin-bottom: 28px;">
          <div style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 10px; text-align: center;">
            Select Grammar Topic:
          </div>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
            ${activeTopics.map((t) => {
        const isSelected = t.id === selectedTopicId;
        return `
                <button class="topic-filter-pill ${isSelected ? "active" : ""}" data-topic-id="${t.id}"
                  style="padding: 9px 16px; border-radius: var(--radius-pill); font-size: 0.9rem; font-weight: 700; cursor: pointer; border: 2px solid ${isSelected ? t.color : "var(--ha-border)"}; background: ${isSelected ? t.color : "#FFFFFF"}; color: ${isSelected ? "#FFFFFF" : "var(--ha-navy)"}; transition: all 0.2s; display: flex; align-items: center; gap: 6px;">
                  <span>Topic ${t.number}: ${t.title}</span>
                </button>
              `;
      }).join("")}
          </div>
        </div>

        <!-- Active Topic Summary Banner -->
        ${activeTopicObj ? `
          <div class="ha-card" style="border-left: 6px solid ${activeTopicObj.color}; padding: 18px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="background: var(--ha-navy-subtle); width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: ${activeTopicObj.color};">
                ${bookIcon(26)}
              </div>
              <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: ${activeTopicObj.color}; text-transform: uppercase;">Active Topic Practice</span>
                <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin: 0;">${activeTopicObj.title}</h2>
                <div style="font-size: 0.88rem; color: var(--ha-text-muted);">${activeTopicObj.subtitle}</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" id="btn-open-topic-lesson" style="display: inline-flex; align-items: center; gap: 6px;">
              ${bookIcon(15)} Open Full Lesson
            </button>
          </div>
        ` : ""}

        <!-- 6 Interactive Activity Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 36px;">
          
          <!-- Activity 1: Sentence Scramble / Arrange the Words -->
          <div class="ha-card activity-select-card" data-activity="scramble" style="cursor: pointer; border-top: 5px solid #2563eb; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #2563eb; background: #EFF6FF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${puzzleIcon(26)}
              </div>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Sentence Scramble</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Arrange jumbled class words into correct grammatical sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #2563eb;">Play Scramble \u2192</button>
          </div>

          <!-- Activity 2: Matching Pairs -->
          <div class="ha-card activity-select-card" data-activity="matching" style="cursor: pointer; border-top: 5px solid #059669; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #059669; background: #ECFDF5; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${refreshIcon(26)}
              </div>
              <span class="badge badge-success">+30 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Grammar Matching</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Tap and match opposites, ownerships, question targets, and pronouns.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #059669;">Play Matching \u2192</button>
          </div>

          <!-- Activity 3: True or False -->
          <div class="ha-card activity-select-card" data-activity="true_false" style="cursor: pointer; border-top: 5px solid #d97706; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #d97706; background: #FFFBEB; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${checkCircleIcon(26)}
              </div>
              <span class="badge badge-gold">+20 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">True or False</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Test grammar rules and identify correct vs incorrect English forms.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #d97706;">Play True or False \u2192</button>
          </div>

          <!-- Activity 4: Sentence Builder -->
          <div class="ha-card activity-select-card" data-activity="builder" style="cursor: pointer; border-top: 5px solid #7c3aed; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #7c3aed; background: #F5F3FF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${pencilIcon(26)}
              </div>
              <span class="badge badge-navy">+25 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Sentence Builder</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Assemble word chips in proper grammatical sequence to build sentences.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #7c3aed;">Build Sentences \u2192</button>
          </div>

          <!-- Activity 5: Fill in the Blank -->
          <div class="ha-card activity-select-card" data-activity="fill" style="cursor: pointer; border-top: 5px solid #0891b2; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #0891b2; background: #ECFEFF; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${bookIcon(26)}
              </div>
              <span class="badge badge-navy">+20 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Complete the Sentence</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Choose the missing adjective, question word, or possessive form.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #0891b2;">Fill in the Blank \u2192</button>
          </div>

          <!-- Activity 6: Choose Correct Sentence -->
          <div class="ha-card activity-select-card" data-activity="picture" style="cursor: pointer; border-top: 5px solid #dc2626; transition: transform 0.2s, box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="color: #dc2626; background: #FEF2F2; width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                ${checkIcon(26)}
              </div>
              <span class="badge badge-red">+20 XP</span>
            </div>
            <h3 style="font-size: 1.2rem; color: var(--ha-navy); margin-bottom: 6px;">Choose Correct Sentence</h3>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.45; margin-bottom: 18px;">
              Identify the 100% grammatically correct sentence from the options.
            </p>
            <button class="btn btn-primary btn-sm" style="width: 100%; background: #dc2626;">Choose Sentence \u2192</button>
          </div>

        </div>

        <!-- Full Grammar Test Callout Banner -->
        <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge badge-gold">Mastery Exam</span>
              <span style="font-size: 0.8rem; color: #E2E8F0;">Combined 6 Topics</span>
            </div>
            <h3 style="font-size: 1.35rem; color: #FFFFFF; margin: 0 0 4px;">Ready to test all grammar topics together?</h3>
            <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0;">
              Take the Full Grammar Test with fresh questions every attempt. Earn +75 XP!
            </p>
          </div>
          <button class="btn btn-accent btn-lg" id="btn-hub-goto-fulltest" style="display: inline-flex; align-items: center; gap: 8px;">
            ${graduationCapIcon(18)} Take Full Grammar Test
          </button>
        </div>

      </div>
    `;
      container.querySelectorAll(".topic-filter-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          sound.playClick();
          selectedTopicId = btn.dataset.topicId;
          render();
        });
      });
      container.querySelectorAll(".activity-select-card").forEach((card) => {
        card.addEventListener("click", () => {
          sound.playClick();
          currentActivity = card.dataset.activity;
          render();
          window.scrollTo(0, 0);
        });
      });
      container.querySelector("#btn-open-topic-lesson")?.addEventListener("click", () => {
        sound.playClick();
        if (onNavigate) {
          window.dispatchEvent(new CustomEvent("ha:open-topic", { detail: selectedTopicId }));
        }
      });
      container.querySelector("#btn-hub-goto-fulltest")?.addEventListener("click", () => {
        sound.playClick();
        if (onNavigate) onNavigate("full-test");
      });
    }
    function renderActivityRunner() {
      const topicData = TOPIC_ACTIVITIES[selectedTopicId] || TOPIC_ACTIVITIES.adjectives;
      const activeTopicObj = activeTopics.find((t) => t.id === selectedTopicId) || activeTopics[0];
      switch (currentActivity) {
        case "scramble":
          runSentenceScramble(topicData, activeTopicObj);
          break;
        case "matching":
          runMatchingPairs(topicData, activeTopicObj);
          break;
        case "true_false":
          runTrueFalse(topicData, activeTopicObj);
          break;
        case "builder":
          runSentenceBuilder(topicData, activeTopicObj);
          break;
        case "fill":
          runFillInBlank(activeTopicObj);
          break;
        case "picture":
          runChooseCorrectSentence(activeTopicObj);
          break;
        default:
          currentActivity = null;
          render();
      }
    }
    function runSentenceScramble(topicData, topicObj) {
      const scrambles = topicData.scrambles || [];
      if (scrambles.length === 0) {
        currentActivity = null;
        render();
        return;
      }
      let currentIndex = 0;
      let earnedXP = 0;
      function renderItem() {
        if (currentIndex >= scrambles.length) {
          sound.playLevelUp();
          fireConfetti(3e3);
          stateManager.recordActivityCompletion(topicObj.id, "scramble", 25);
          renderCompletionView(
            puzzleIcon(64),
            "Sentence Scramble Master!",
            `You successfully arranged all sentences for <strong>${topicObj.title}</strong>!`,
            25
          );
          return;
        }
        const item = scrambles[currentIndex];
        const targetTokens = [...item.words];
        const cleanAnswer = item.answer.replace(/[.?]/g, "").trim();
        let availableTokens = shuffleArray2([...targetTokens]).map((word, idx) => ({ id: idx, text: word, placed: false }));
        let assembledTokens = [];
        container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-runner-back">\u2190 Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-navy">Scramble ${currentIndex + 1} of ${scrambles.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid ${topicObj.color}; text-align: center; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: ${topicObj.color}; text-transform: uppercase; margin-bottom: 6px;">
              Arrange the Words in Order
            </div>

            ${renderConceptVisual(topicObj.id, { question: item.answer })}

            <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 8px;">
              Tap words in correct English order:
            </h2>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 24px;">
              Click each word chip to place it in the sentence slot below.
            </p>

            <!-- Target Slot -->
            <div id="scramble-target-zone" style="min-height: 64px; background: #F8FAFC; border: 2px dashed var(--ha-border); border-radius: var(--radius-lg); padding: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
              <span id="target-placeholder" style="color: var(--ha-text-muted); font-size: 0.92rem; font-style: italic;">
                Tap words below to build the sentence
              </span>
            </div>

            <!-- Chips Bank -->
            <div id="scramble-chips-bank" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
              ${availableTokens.map((tok) => `
                <button class="word-chip-btn" data-id="${tok.id}" data-word="${tok.text}"
                  style="padding: 10px 18px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); cursor: pointer; transition: all 0.15s; box-shadow: var(--ha-shadow-sm);">
                  ${tok.text}
                </button>
              `).join("")}
            </div>

            <!-- Feedback Message -->
            <div id="scramble-feedback" style="display: none; padding: 12px; border-radius: var(--radius-md); margin-bottom: 20px; font-weight: 700;"></div>

            <!-- Action Controls -->
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-outline" id="btn-reset-scramble">Reset</button>
              <button class="btn btn-primary" id="btn-check-scramble" style="background: ${topicObj.color};" disabled>Check Sentence</button>
              <button class="btn btn-secondary" id="btn-next-scramble" style="display: none;">Next Sentence \u2192</button>
            </div>
          </div>

        </div>
      `;
        container.querySelector("#btn-runner-back")?.addEventListener("click", () => {
          sound.playClick();
          currentActivity = null;
          render();
        });
        const targetZone = container.querySelector("#scramble-target-zone");
        const placeholder = container.querySelector("#target-placeholder");
        const bank = container.querySelector("#scramble-chips-bank");
        const checkBtn = container.querySelector("#btn-check-scramble");
        const resetBtn = container.querySelector("#btn-reset-scramble");
        const nextBtn = container.querySelector("#btn-next-scramble");
        const feedback = container.querySelector("#scramble-feedback");
        function updateTargetUI() {
          if (assembledTokens.length === 0) {
            if (placeholder) placeholder.style.display = "inline";
            targetZone.querySelectorAll(".placed-chip-btn").forEach((el) => el.remove());
            checkBtn.disabled = true;
            return;
          }
          if (placeholder) placeholder.style.display = "none";
          targetZone.innerHTML = "";
          assembledTokens.forEach((tok, idx) => {
            const btn = document.createElement("button");
            btn.className = "placed-chip-btn";
            btn.textContent = tok.text;
            btn.style.cssText = "padding: 8px 16px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: var(--ha-navy); color: #FFF; border: none; cursor: pointer;";
            btn.title = "Click to remove";
            btn.addEventListener("click", () => {
              sound.playClick();
              assembledTokens.splice(idx, 1);
              const bankBtn = bank.querySelector(`[data-id="${tok.id}"]`);
              if (bankBtn) bankBtn.style.visibility = "visible";
              updateTargetUI();
            });
            targetZone.appendChild(btn);
          });
          checkBtn.disabled = assembledTokens.length !== availableTokens.length;
        }
        bank.querySelectorAll(".word-chip-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            sound.playClick();
            const id = parseInt(btn.dataset.id);
            const word = btn.dataset.word;
            btn.style.visibility = "hidden";
            assembledTokens.push({ id, text: word });
            updateTargetUI();
          });
        });
        resetBtn?.addEventListener("click", () => {
          sound.playClick();
          assembledTokens = [];
          bank.querySelectorAll(".word-chip-btn").forEach((btn) => btn.style.visibility = "visible");
          feedback.style.display = "none";
          updateTargetUI();
        });
        checkBtn?.addEventListener("click", () => {
          const studentSentence = assembledTokens.map((t) => t.text).join(" ");
          const isCorrect = studentSentence.toLowerCase() === cleanAnswer.toLowerCase() || studentSentence.toLowerCase() + "." === item.answer.toLowerCase() || studentSentence.toLowerCase() + "?" === item.answer.toLowerCase();
          if (isCorrect) {
            sound.playCorrect();
            feedback.style.display = "block";
            feedback.style.background = "var(--ha-success-bg)";
            feedback.style.color = "#065F46";
            feedback.style.border = "1px solid var(--ha-success)";
            feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Correct! <strong>"${item.answer}"</strong></span>`;
            checkBtn.style.display = "none";
            resetBtn.style.display = "none";
            nextBtn.style.display = "inline-flex";
          } else {
            sound.playWrong();
            feedback.style.display = "block";
            feedback.style.background = "var(--ha-red-light)";
            feedback.style.color = "#991B1B";
            feedback.style.border = "1px solid var(--ha-red)";
            feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Not quite in order! Try resetting and listening to the word flow.</span>`;
          }
        });
        nextBtn?.addEventListener("click", () => {
          sound.playClick();
          currentIndex++;
          renderItem();
        });
      }
      renderItem();
    }
    function runMatchingPairs(topicData, topicObj) {
      const rawPairs = topicData.matching || [];
      if (rawPairs.length === 0) {
        currentActivity = null;
        render();
        return;
      }
      const selectedPairs = rawPairs.slice(0, 5);
      const leftItems = selectedPairs.map((p, idx) => ({ id: idx, text: p.left, matched: false }));
      const rightItems = shuffleArray2(selectedPairs.map((p, idx) => ({ id: idx, text: p.right, matched: false })));
      let selectedLeftId = null;
      let selectedRightId = null;
      let matchedCount = 0;
      container.innerHTML = `
      <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 820px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-matching-back">\u2190 Back to Activities</button>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
            <span class="badge badge-success" id="match-counter-badge">Matched: 0 / ${selectedPairs.length}</span>
          </div>
        </div>

        <div class="ha-card topic-master-card" style="border-top: 5px solid #059669; padding: 32px 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 4px;">
              Grammar Pair Matching
            </div>
            <h2 style="font-size: 1.45rem; color: var(--ha-navy); margin-bottom: 6px;">
              Tap one item on the left, then tap its match on the right!
            </h2>
            <p style="font-size: 0.88rem; color: var(--ha-text-muted);">
              Practice connecting grammar concepts, ownerships, and vocabulary.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <!-- Left Column -->
            <div style="display: flex; flex-direction: column; gap: 12px;" id="left-column">
              ${leftItems.map((item) => `
                <button class="match-item-btn match-left" data-id="${item.id}"
                  style="padding: 16px 18px; border-radius: var(--radius-md); font-size: 1.05rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); text-align: center; cursor: pointer; transition: all 0.15s;">
                  ${item.text}
                </button>
              `).join("")}
            </div>

            <!-- Right Column -->
            <div style="display: flex; flex-direction: column; gap: 12px;" id="right-column">
              ${rightItems.map((item) => `
                <button class="match-item-btn match-right" data-id="${item.id}"
                  style="padding: 16px 18px; border-radius: var(--radius-md); font-size: 1.05rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); text-align: center; cursor: pointer; transition: all 0.15s;">
                  ${item.text}
                </button>
              `).join("")}
            </div>
          </div>

          <div id="matching-feedback" style="display: none; text-align: center; padding: 14px; border-radius: var(--radius-md); font-weight: 700;"></div>
        </div>

      </div>
    `;
      container.querySelector("#btn-matching-back")?.addEventListener("click", () => {
        sound.playClick();
        currentActivity = null;
        render();
      });
      const leftBtns = container.querySelectorAll(".match-left");
      const rightBtns = container.querySelectorAll(".match-right");
      const counterBadge = container.querySelector("#match-counter-badge");
      const feedback = container.querySelector("#matching-feedback");
      function checkPair() {
        if (selectedLeftId !== null && selectedRightId !== null) {
          if (selectedLeftId === selectedRightId) {
            sound.playCorrect();
            const lBtn = container.querySelector(`.match-left[data-id="${selectedLeftId}"]`);
            const rBtn = container.querySelector(`.match-right[data-id="${selectedRightId}"]`);
            if (lBtn && rBtn) {
              lBtn.style.background = "var(--ha-success-bg)";
              lBtn.style.borderColor = "var(--ha-success)";
              lBtn.style.color = "#065F46";
              lBtn.disabled = true;
              rBtn.style.background = "var(--ha-success-bg)";
              rBtn.style.borderColor = "var(--ha-success)";
              rBtn.style.color = "#065F46";
              rBtn.disabled = true;
            }
            matchedCount++;
            if (counterBadge) counterBadge.textContent = `Matched: ${matchedCount} / ${selectedPairs.length}`;
            selectedLeftId = null;
            selectedRightId = null;
            if (matchedCount >= selectedPairs.length) {
              sound.playLevelUp();
              fireConfetti(3e3);
              stateManager.recordActivityCompletion(topicObj.id, "matching", 30);
              setTimeout(() => {
                renderCompletionView(
                  refreshIcon(64),
                  "Pair Matching Complete!",
                  `You matched all grammar pairs for <strong>${topicObj.title}</strong>!`,
                  30
                );
              }, 600);
            }
          } else {
            sound.playWrong();
            const lBtn = container.querySelector(`.match-left[data-id="${selectedLeftId}"]`);
            const rBtn = container.querySelector(`.match-right[data-id="${selectedRightId}"]`);
            if (lBtn) lBtn.style.borderColor = "var(--ha-red)";
            if (rBtn) rBtn.style.borderColor = "var(--ha-red)";
            setTimeout(() => {
              if (lBtn && !lBtn.disabled) lBtn.style.borderColor = "var(--ha-border)";
              if (rBtn && !rBtn.disabled) rBtn.style.borderColor = "var(--ha-border)";
              selectedLeftId = null;
              selectedRightId = null;
            }, 600);
          }
        }
      }
      leftBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          sound.playClick();
          leftBtns.forEach((b) => {
            if (!b.disabled) b.style.borderColor = "var(--ha-border)";
          });
          btn.style.borderColor = "#2563eb";
          btn.style.background = "#EFF6FF";
          selectedLeftId = parseInt(btn.dataset.id);
          checkPair();
        });
      });
      rightBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          sound.playClick();
          rightBtns.forEach((b) => {
            if (!b.disabled) b.style.borderColor = "var(--ha-border)";
          });
          btn.style.borderColor = "#2563eb";
          btn.style.background = "#EFF6FF";
          selectedRightId = parseInt(btn.dataset.id);
          checkPair();
        });
      });
    }
    function runTrueFalse(topicData, topicObj) {
      const items = topicData.trueFalse || [];
      if (items.length === 0) {
        currentActivity = null;
        render();
        return;
      }
      let currentIndex = 0;
      let correctCount = 0;
      function renderItem() {
        if (currentIndex >= items.length) {
          sound.playLevelUp();
          fireConfetti(3e3);
          stateManager.recordActivityCompletion(topicObj.id, "true_false", 20);
          renderCompletionView(
            checkCircleIcon(64),
            "True or False Master!",
            `You answered ${correctCount} of ${items.length} questions correctly on <strong>${topicObj.title}</strong>!`,
            20
          );
          return;
        }
        const item = items[currentIndex];
        container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-tf-back">\u2190 Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-gold">Question ${currentIndex + 1} of ${items.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #d97706; text-align: center; padding: 36px 28px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #d97706; text-transform: uppercase; margin-bottom: 8px;">
              Grammar Rule Challenge
            </div>
            
            <div style="background: #F8FAFC; border: 2px solid var(--ha-border); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 28px;">
              <p style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 700; line-height: 1.45; margin: 0;">
                \u201C${item.statement}\u201D
              </p>
            </div>

            <!-- Big True / False Buttons -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
              <button class="btn-tf-choice" data-choice="true"
                style="padding: 20px; font-size: 1.25rem; font-weight: 800; border-radius: var(--radius-lg); border: 2px solid var(--ha-success); background: #FFFFFF; color: var(--ha-success); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span style="font-size: 1.6rem;">\u2713</span> TRUE
              </button>

              <button class="btn-tf-choice" data-choice="false"
                style="padding: 20px; font-size: 1.25rem; font-weight: 800; border-radius: var(--radius-lg); border: 2px solid var(--ha-red); background: #FFFFFF; color: var(--ha-red); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span style="font-size: 1.6rem;">\u2717</span> FALSE
              </button>
            </div>

            <!-- Feedback & Explanation Box -->
            <div id="tf-feedback-box" style="display: none; padding: 18px; border-radius: var(--radius-md); text-align: left; margin-bottom: 24px;">
              <div id="tf-feedback-title" style="font-size: 1.1rem; font-weight: 800; margin-bottom: 6px;"></div>
              <div id="tf-feedback-explanation" style="font-size: 0.92rem; line-height: 1.5;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary btn-lg" id="btn-next-tf" style="display: none; background: #d97706;">
                Next Statement \u2192
              </button>
            </div>
          </div>

        </div>
      `;
        container.querySelector("#btn-tf-back")?.addEventListener("click", () => {
          sound.playClick();
          currentActivity = null;
          render();
        });
        const tfButtons = container.querySelectorAll(".btn-tf-choice");
        const feedbackBox = container.querySelector("#tf-feedback-box");
        const feedbackTitle = container.querySelector("#tf-feedback-title");
        const feedbackExpl = container.querySelector("#tf-feedback-explanation");
        const nextBtn = container.querySelector("#btn-next-tf");
        tfButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            tfButtons.forEach((b) => b.disabled = true);
            const chosenBool = btn.dataset.choice === "true";
            const isCorrect = chosenBool === item.isTrue;
            if (isCorrect) {
              correctCount++;
              sound.playCorrect();
              btn.style.background = "var(--ha-success-bg)";
              feedbackBox.style.background = "var(--ha-success-bg)";
              feedbackBox.style.color = "#065F46";
              feedbackBox.style.border = "1.5px solid var(--ha-success)";
              feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} That is correct!</span>`;
            } else {
              sound.playWrong();
              btn.style.background = "var(--ha-red-light)";
              feedbackBox.style.background = "var(--ha-red-light)";
              feedbackBox.style.color = "#991B1B";
              feedbackBox.style.border = "1.5px solid var(--ha-red)";
              feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Incorrect (It is actually ${item.isTrue ? "TRUE" : "FALSE"})</span>`;
            }
            feedbackExpl.textContent = item.explanation || "";
            feedbackBox.style.display = "block";
            nextBtn.style.display = "inline-flex";
          });
        });
        nextBtn?.addEventListener("click", () => {
          sound.playClick();
          currentIndex++;
          renderItem();
        });
      }
      renderItem();
    }
    function runSentenceBuilder(topicData, topicObj) {
      const items = topicData.sentenceBuilder || [];
      if (items.length === 0) {
        currentActivity = null;
        render();
        return;
      }
      let currentIndex = 0;
      function renderItem() {
        if (currentIndex >= items.length) {
          sound.playLevelUp();
          fireConfetti(3e3);
          stateManager.recordActivityCompletion(topicObj.id, "builder", 25);
          renderCompletionView(
            pencilIcon(64),
            "Sentence Builder Champion!",
            `You assembled all sentences successfully for <strong>${topicObj.title}</strong>!`,
            25
          );
          return;
        }
        const item = items[currentIndex];
        const targetTokens = [...item.chips];
        let availableTokens = shuffleArray2([...targetTokens]).map((tok, idx) => ({ id: idx, text: tok }));
        let assembledTokens = [];
        container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-builder-back">\u2190 Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-navy">Exercise ${currentIndex + 1} of ${items.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #7c3aed; text-align: center; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #7c3aed; text-transform: uppercase; margin-bottom: 6px;">
              Sentence Builder
            </div>

            ${renderConceptVisual(topicObj.id, { question: item.prompt })}

            <h2 style="font-size: 1.35rem; color: var(--ha-navy); margin-bottom: 8px;">
              ${item.prompt}
            </h2>

            <!-- Slot Zone -->
            <div id="builder-slot-zone" style="min-height: 64px; background: #F8FAFC; border: 2px dashed var(--ha-border); border-radius: var(--radius-lg); padding: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
              <span id="builder-placeholder" style="color: var(--ha-text-muted); font-size: 0.92rem; font-style: italic;">
                Tap chips below in proper grammatical sequence
              </span>
            </div>

            <!-- Chips -->
            <div id="builder-chips-bank" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
              ${availableTokens.map((tok) => `
                <button class="builder-chip-btn" data-id="${tok.id}" data-text="${tok.text}"
                  style="padding: 10px 18px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: #FFFFFF; border: 2px solid var(--ha-border); color: var(--ha-navy); cursor: pointer; transition: all 0.15s; box-shadow: var(--ha-shadow-sm);">
                  ${tok.text}
                </button>
              `).join("")}
            </div>

            <div id="builder-feedback" style="display: none; padding: 12px; border-radius: var(--radius-md); margin-bottom: 20px; font-weight: 700;"></div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-outline" id="btn-builder-reset">Reset</button>
              <button class="btn btn-primary" id="btn-builder-check" style="background: #7c3aed;" disabled>Check Sentence</button>
              <button class="btn btn-secondary" id="btn-builder-next" style="display: none;">Next Exercise \u2192</button>
            </div>
          </div>

        </div>
      `;
        container.querySelector("#btn-builder-back")?.addEventListener("click", () => {
          sound.playClick();
          currentActivity = null;
          render();
        });
        const slotZone = container.querySelector("#builder-slot-zone");
        const placeholder = container.querySelector("#builder-placeholder");
        const bank = container.querySelector("#builder-chips-bank");
        const checkBtn = container.querySelector("#btn-builder-check");
        const resetBtn = container.querySelector("#btn-builder-reset");
        const nextBtn = container.querySelector("#btn-builder-next");
        const feedback = container.querySelector("#builder-feedback");
        function updateSlotUI() {
          if (assembledTokens.length === 0) {
            if (placeholder) placeholder.style.display = "inline";
            slotZone.querySelectorAll(".builder-placed-chip").forEach((el) => el.remove());
            checkBtn.disabled = true;
            return;
          }
          if (placeholder) placeholder.style.display = "none";
          slotZone.innerHTML = "";
          assembledTokens.forEach((tok, idx) => {
            const btn = document.createElement("button");
            btn.className = "builder-placed-chip";
            btn.textContent = tok.text;
            btn.style.cssText = "padding: 8px 16px; border-radius: var(--radius-pill); font-size: 1rem; font-weight: 700; background: #7c3aed; color: #FFF; border: none; cursor: pointer;";
            btn.title = "Click to remove";
            btn.addEventListener("click", () => {
              sound.playClick();
              assembledTokens.splice(idx, 1);
              const bankBtn = bank.querySelector(`[data-id="${tok.id}"]`);
              if (bankBtn) bankBtn.style.visibility = "visible";
              updateSlotUI();
            });
            slotZone.appendChild(btn);
          });
          checkBtn.disabled = assembledTokens.length !== availableTokens.length;
        }
        bank.querySelectorAll(".builder-chip-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            sound.playClick();
            const id = parseInt(btn.dataset.id);
            const text = btn.dataset.text;
            btn.style.visibility = "hidden";
            assembledTokens.push({ id, text });
            updateSlotUI();
          });
        });
        resetBtn?.addEventListener("click", () => {
          sound.playClick();
          assembledTokens = [];
          bank.querySelectorAll(".builder-chip-btn").forEach((b) => b.style.visibility = "visible");
          feedback.style.display = "none";
          updateSlotUI();
        });
        checkBtn?.addEventListener("click", () => {
          const studentSentence = assembledTokens.map((t) => t.text).join(" ");
          const isCorrect = studentSentence.trim() === item.correct.trim();
          if (isCorrect) {
            sound.playCorrect();
            feedback.style.display = "block";
            feedback.style.background = "var(--ha-success-bg)";
            feedback.style.color = "#065F46";
            feedback.style.border = "1px solid var(--ha-success)";
            feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Correct sentence constructed!</span>`;
            checkBtn.style.display = "none";
            resetBtn.style.display = "none";
            nextBtn.style.display = "inline-flex";
          } else {
            sound.playWrong();
            feedback.style.display = "block";
            feedback.style.background = "var(--ha-red-light)";
            feedback.style.color = "#991B1B";
            feedback.style.border = "1px solid var(--ha-red)";
            feedback.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Words are not in standard English order. Try again!</span>`;
          }
        });
        nextBtn?.addEventListener("click", () => {
          sound.playClick();
          currentIndex++;
          renderItem();
        });
      }
      renderItem();
    }
    function runFillInBlank(topicObj) {
      const bank = TOPIC_QUESTION_BANKS[topicObj.id] || [];
      const fillQuestions = bank.filter((q) => q.type === "fill" || q.question.includes("_____"));
      const pool = fillQuestions.length > 0 ? fillQuestions : bank.slice(0, 4);
      let currentIndex = 0;
      let correctCount = 0;
      function renderItem() {
        if (currentIndex >= pool.length) {
          sound.playLevelUp();
          fireConfetti(3e3);
          stateManager.recordActivityCompletion(topicObj.id, "fill", 20);
          renderCompletionView(
            bookIcon(64),
            "Fill in the Blank Complete!",
            `You completed all sentence exercises for <strong>${topicObj.title}</strong>!`,
            20
          );
          return;
        }
        const q = pool[currentIndex];
        container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-fill-back">\u2190 Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-navy">Sentence ${currentIndex + 1} of ${pool.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #0891b2; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #0891b2; text-transform: uppercase; margin-bottom: 6px;">
              Complete the Sentence
            </div>

            ${renderConceptVisual(topicObj.id, q)}

            <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 24px; line-height: 1.4;">
              ${q.question}
            </h2>

            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" id="fill-options-grid">
              ${(q.options || []).map((opt, idx) => `
                <button class="fill-opt-btn" data-index="${idx}" data-text="${opt}"
                  style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                  <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                  ${opt}
                </button>
              `).join("")}
            </div>

            <div id="fill-feedback-box" style="display: none; padding: 14px; border-radius: var(--radius-md); margin-bottom: 20px;">
              <div id="fill-feedback-title" style="font-weight: 800; margin-bottom: 4px;"></div>
              <div id="fill-feedback-text" style="font-size: 0.9rem;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="btn-next-fill" style="display: none; background: #0891b2;">
                Next Sentence \u2192
              </button>
            </div>
          </div>

        </div>
      `;
        container.querySelector("#btn-fill-back")?.addEventListener("click", () => {
          sound.playClick();
          currentActivity = null;
          render();
        });
        const optButtons = container.querySelectorAll(".fill-opt-btn");
        const feedbackBox = container.querySelector("#fill-feedback-box");
        const feedbackTitle = container.querySelector("#fill-feedback-title");
        const feedbackText = container.querySelector("#fill-feedback-text");
        const nextBtn = container.querySelector("#btn-next-fill");
        optButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            optButtons.forEach((b) => b.disabled = true);
            const chosenIdx = parseInt(btn.dataset.index);
            const isCorrect = chosenIdx === q.answer;
            if (isCorrect) {
              correctCount++;
              sound.playCorrect();
              btn.style.borderColor = "var(--ha-success)";
              btn.style.background = "var(--ha-success-bg)";
              btn.style.color = "var(--ha-success)";
              feedbackBox.style.background = "var(--ha-success-bg)";
              feedbackBox.style.color = "#065F46";
              feedbackBox.style.border = "1px solid var(--ha-success)";
              feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Correct!</span>`;
            } else {
              sound.playWrong();
              btn.style.borderColor = "var(--ha-red)";
              btn.style.background = "var(--ha-red-light)";
              btn.style.color = "var(--ha-red)";
              feedbackBox.style.background = "var(--ha-red-light)";
              feedbackBox.style.color = "#991B1B";
              feedbackBox.style.border = "1px solid var(--ha-red)";
              feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Incorrect (Correct: "${q.options[q.answer]}")</span>`;
            }
            feedbackText.textContent = q.explanation || "";
            feedbackBox.style.display = "block";
            nextBtn.style.display = "inline-flex";
          });
        });
        nextBtn?.addEventListener("click", () => {
          sound.playClick();
          currentIndex++;
          renderItem();
        });
      }
      renderItem();
    }
    function runChooseCorrectSentence(topicObj) {
      const bank = TOPIC_QUESTION_BANKS[topicObj.id] || [];
      const chooseQuestions = bank.filter((q) => q.type === "choose_sentence");
      const pool = chooseQuestions.length > 0 ? chooseQuestions : bank.slice(0, 4);
      let currentIndex = 0;
      let correctCount = 0;
      function renderItem() {
        if (currentIndex >= pool.length) {
          sound.playLevelUp();
          fireConfetti(3e3);
          stateManager.recordActivityCompletion(topicObj.id, "picture", 20);
          renderCompletionView(
            checkIcon(64),
            "Sentence Master!",
            `You selected the correct sentences for <strong>${topicObj.title}</strong>!`,
            20
          );
          return;
        }
        const q = pool[currentIndex];
        container.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px; max-width: 760px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-outline btn-sm" id="btn-choose-back">\u2190 Back to Activities</button>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="badge" style="background: ${topicObj.color}; color: #FFF;">${topicObj.title}</span>
              <span class="badge badge-red">Question ${currentIndex + 1} of ${pool.length}</span>
            </div>
          </div>

          <div class="ha-card topic-master-card" style="border-top: 5px solid #dc2626; padding: 32px 24px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #dc2626; text-transform: uppercase; margin-bottom: 6px;">
              Choose the Correct Sentence
            </div>

            ${renderConceptVisual(topicObj.id, q)}

            <h2 style="font-size: 1.4rem; color: var(--ha-navy); margin-bottom: 24px;">
              ${q.question}
            </h2>

            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;">
              ${(q.options || []).map((opt, idx) => `
                <button class="choose-opt-btn" data-index="${idx}"
                  style="padding: 14px 20px; font-size: 1rem; font-weight: 700; color: var(--ha-navy); background: #FFFFFF; border: 2px solid var(--ha-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: all 0.15s;">
                  <span style="display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; border-radius: var(--radius-pill); background: var(--ha-navy-subtle); margin-right: 12px; font-size: 0.85rem;">${String.fromCharCode(65 + idx)}</span>
                  ${opt}
                </button>
              `).join("")}
            </div>

            <div id="choose-feedback-box" style="display: none; padding: 14px; border-radius: var(--radius-md); margin-bottom: 20px;">
              <div id="choose-feedback-title" style="font-weight: 800; margin-bottom: 4px;"></div>
              <div id="choose-feedback-text" style="font-size: 0.9rem;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="btn-next-choose" style="display: none; background: #dc2626;">
                Next Question \u2192
              </button>
            </div>
          </div>

        </div>
      `;
        container.querySelector("#btn-choose-back")?.addEventListener("click", () => {
          sound.playClick();
          currentActivity = null;
          render();
        });
        const optButtons = container.querySelectorAll(".choose-opt-btn");
        const feedbackBox = container.querySelector("#choose-feedback-box");
        const feedbackTitle = container.querySelector("#choose-feedback-title");
        const feedbackText = container.querySelector("#choose-feedback-text");
        const nextBtn = container.querySelector("#btn-next-choose");
        optButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            optButtons.forEach((b) => b.disabled = true);
            const chosenIdx = parseInt(btn.dataset.index);
            const isCorrect = chosenIdx === q.answer;
            if (isCorrect) {
              correctCount++;
              sound.playCorrect();
              btn.style.borderColor = "var(--ha-success)";
              btn.style.background = "var(--ha-success-bg)";
              btn.style.color = "var(--ha-success)";
              feedbackBox.style.background = "var(--ha-success-bg)";
              feedbackBox.style.color = "#065F46";
              feedbackBox.style.border = "1px solid var(--ha-success)";
              feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${checkCircleIcon(18)} Perfect choice!</span>`;
            } else {
              sound.playWrong();
              btn.style.borderColor = "var(--ha-red)";
              btn.style.background = "var(--ha-red-light)";
              btn.style.color = "var(--ha-red)";
              feedbackBox.style.background = "var(--ha-red-light)";
              feedbackBox.style.color = "#991B1B";
              feedbackBox.style.border = "1px solid var(--ha-red)";
              feedbackTitle.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 6px;">${infoIcon(18)} Incorrect (Correct: "${q.options[q.answer]}")</span>`;
            }
            feedbackText.textContent = q.explanation || "";
            feedbackBox.style.display = "block";
            nextBtn.style.display = "inline-flex";
          });
        });
        nextBtn?.addEventListener("click", () => {
          sound.playClick();
          currentIndex++;
          renderItem();
        });
      }
      renderItem();
    }
    function renderCompletionView(icon, title, message, xpEarned) {
      container.innerHTML = `
      <div class="container" style="padding-top: 40px; padding-bottom: 60px; max-width: 620px; text-align: center;">
        <div class="ha-card topic-master-card" style="padding: 40px 28px; border-top: 6px solid var(--ha-gold);">
          <div style="display: flex; justify-content: center; margin-bottom: 16px; color: var(--ha-gold);">
            ${icon}
          </div>
          <h1 style="font-size: 2rem; color: var(--ha-navy); margin-bottom: 8px;">${title}</h1>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px; line-height: 1.5;">
            ${message}
          </p>

          <div style="display: inline-flex; align-items: center; gap: 8px; background: var(--ha-navy-subtle); padding: 10px 22px; border-radius: var(--radius-pill); margin-bottom: 28px;">
            <span style="font-size: 1.2rem; font-weight: 800; color: var(--ha-gold-dark);">+${xpEarned} XP Awarded</span>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-outline" id="btn-comp-another-act" style="display: inline-flex; align-items: center; gap: 8px;">
              ${gamepadIcon(16)} Other Activities
            </button>
            <button class="btn btn-primary" id="btn-comp-goto-test" style="background: var(--ha-navy); display: inline-flex; align-items: center; gap: 8px;">
              ${graduationCapIcon(16)} Take Full Grammar Test
            </button>
          </div>
        </div>
      </div>
    `;
      container.querySelector("#btn-comp-another-act")?.addEventListener("click", () => {
        sound.playClick();
        currentActivity = null;
        render();
        window.scrollTo(0, 0);
      });
      container.querySelector("#btn-comp-goto-test")?.addEventListener("click", () => {
        sound.playClick();
        if (onNavigate) onNavigate("full-test");
      });
    }
    render();
  }

  // js/components/roleplayView.js
  function playPronunciation(text) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.88;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
        return true;
      } catch (e) {
        console.warn("Speech synthesis error:", e);
      }
    }
    sound.playClick();
    return false;
  }
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function renderRoleplaysHub(container, onNavigate, activeRoleplayId = null) {
    if (activeRoleplayId) {
      const roleplay = stateManager.getRoleplayById(activeRoleplayId);
      if (roleplay) {
        renderRoleplayRunner(container, onNavigate, roleplay);
        return;
      }
    }
    const student = stateManager.getCurrentStudent();
    const roleplays = stateManager.getRoleplays();
    const progressInfo = stateManager.getStudentRoleplayProgress(student?.id);
    container.innerHTML = `
    <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
      
      <!-- Top Hero Header -->
      <div style="background: linear-gradient(135deg, #0A2558 0%, #163B7C 100%); color: #FFFFFF; border-radius: var(--radius-xl); padding: 30px 28px; margin-bottom: 30px; box-shadow: var(--ha-shadow-md); position: relative; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
          <div style="max-width: 680px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: var(--radius-pill); padding: 5px 14px; font-size: 0.82rem; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.04em;">
              ${roleplayIcon(16)} REAL CLASSROOM PRESENTATIONS
            </div>
            <h1 style="font-size: clamp(1.6rem, 3.8vw, 2.3rem); color: #FFFFFF; font-weight: 800; line-height: 1.25; margin-bottom: 10px;">
              Roleplay Presentations
            </h1>
            <p style="font-size: 0.98rem; color: #E2E8F0; line-height: 1.6; margin-bottom: 16px;">
              Practice the real-life conversations and speaking presentations taught by <strong>Sir Zubair</strong> in our physical English class. Learn the situation, master useful spoken expressions, create your own sentences, and speak with confidence.
            </p>
            <div style="display: flex; gap: 14px; flex-wrap: wrap; font-size: 0.85rem; font-weight: 600; color: #CBD5E1;">
              <span>Class Teacher: <strong style="color: #FFFFFF;">Sir Zubair</strong></span>
              <span>\u2022</span>
              <span>5 Real Class Presentations</span>
              <span>\u2022</span>
              <span>Learn \u2192 Create \u2192 Speak</span>
            </div>
          </div>

          <!-- Overall Progress Card -->
          <div class="ha-card" style="background: rgba(255, 255, 255, 0.96); border: 1.5px solid rgba(255, 255, 255, 0.4); padding: 20px 22px; border-radius: var(--radius-lg); min-width: 230px; text-align: center; color: var(--ha-navy); box-shadow: 0 10px 24px rgba(0,0,0,0.12);">
            <div style="font-size: 0.78rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
              YOUR ROLEPLAY PROGRESS
            </div>
            <div style="font-size: 2.2rem; font-weight: 800; color: var(--ha-navy); line-height: 1; margin-bottom: 4px;">
              ${progressInfo.completedCount} <span style="font-size: 1.2rem; color: var(--ha-text-muted); font-weight: 600;">/ ${progressInfo.totalCount}</span>
            </div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--ha-gold-dark); margin-bottom: 10px;">
              ${progressInfo.overallPercent}% Completed
            </div>
            <div class="progress-container" style="height: 8px; margin: 0 auto; background: #E2E8F0;">
              <div class="progress-bar-fill" style="width: ${progressInfo.overallPercent}%; background: linear-gradient(90deg, var(--ha-red), var(--ha-gold));"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Title -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 800; margin: 0;">Class Presentations List</h2>
          <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin: 2px 0 0;">
            Presented in the exact chronological order taught in our physical class (01 through 05).
          </p>
        </div>
      </div>

      <!-- Roleplay Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
        ${roleplays.map((rp) => {
      const prog = student?.roleplayProgress?.[rp.id];
      const isDone = Boolean(prog && prog.completed);
      const scorePercent = prog?.percent || 0;
      return `
            <div class="ha-card roleplay-card" style="border-radius: var(--radius-lg); border-top: 5px solid ${rp.color || "var(--ha-navy)"}; display: flex; flex-direction: column; justify-content: space-between; height: 100%; overflow: hidden; padding: 0;">
              <!-- Card Creative Scenario Banner -->
              <div style="width: 100%; border-bottom: 1px solid var(--ha-border);">
                ${renderRoleplayCreativeBanner(rp, false)}
              </div>

              <div style="padding: 20px 22px 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <!-- Card Header -->
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 8px;">
                    <div>
                      <span style="font-size: 0.72rem; font-weight: 800; color: var(--ha-red); text-transform: uppercase; letter-spacing: 0.05em;">ROLEPLAY ${rp.number}</span>
                      <h3 style="font-size: 1.15rem; color: var(--ha-navy); font-weight: 800; line-height: 1.3; margin: 2px 0 0;">
                        ${rp.title}
                      </h3>
                    </div>
                    ${isDone ? `
                      <span class="badge" style="background: var(--ha-success-bg); color: var(--ha-success); font-weight: 800; font-size: 0.75rem; padding: 4px 8px; flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px;">
                        ${checkCircleIcon(14)} Complete (${scorePercent}%)
                      </span>
                    ` : `
                      <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-text-muted); font-weight: 700; font-size: 0.75rem; padding: 4px 8px; flex-shrink: 0;">
                        Not Started
                      </span>
                    `}
                  </div>

                  <!-- Scenario Explanation -->
                  <p style="font-size: 0.88rem; color: var(--ha-text-muted); line-height: 1.5; margin-bottom: 14px;">
                    ${rp.scenario}
                  </p>

                  <!-- Grammar Focus Pills -->
                  <div style="margin-bottom: 16px;">
                    <div style="font-size: 0.72rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
                      ${bookIcon(13)} Grammar Focus:
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                      ${rp.grammarFocus.map((g) => `
                        <span class="badge" style="background: #FEF7E8; border: 1px solid rgba(245, 166, 35, 0.4); color: var(--ha-gold-dark); font-weight: 700; font-size: 0.76rem;">
                          ${g}
                        </span>
                      `).join("")}
                    </div>
                  </div>

                  <!-- Features list -->
                  <div style="background: #F8FAFC; border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 18px; font-size: 0.8rem; color: var(--ha-text-muted); display: flex; flex-direction: column; gap: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${speakerIcon(14)}</span>
                      <span><strong>${rp.spokenExpressions.length}</strong> Spoken Expressions from Teacher</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${pencilIcon(14)}</span>
                      <span>Create Your Own Sentences</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${roleplayIcon(14)}</span>
                      <span>Interactive Mini Roleplay Dialogue</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="color: var(--ha-navy);">${micIcon(14)}</span>
                      <span>Speaking Pronunciation Practice</span>
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div style="padding-top: 4px;">
                  <button class="btn ${isDone ? "btn-outline" : "btn-primary"} btn-block start-roleplay-btn" data-rpid="${rp.id}" style="width: 100%;">
                    ${isDone ? "Practice Again" : "Start Presentation"}
                  </button>
                </div>
              </div>
            </div>
          `;
    }).join("")}
      </div>
    </div>
  `;
    container.querySelectorAll(".start-roleplay-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        const rpId = btn.dataset.rpid;
        const rp = stateManager.getRoleplayById(rpId);
        if (rp) {
          renderRoleplayRunner(container, onNavigate, rp);
          window.scrollTo(0, 0);
        }
      });
    });
  }
  function renderRoleplayRunner(container, onNavigate, roleplayOrId) {
    const roleplay = typeof roleplayOrId === "string" ? stateManager.getRoleplayById(roleplayOrId) : roleplayOrId;
    if (!roleplay) {
      renderRoleplaysHub(container, onNavigate);
      return;
    }
    let currentStep = "learn";
    let practiceIndex = 0;
    let practiceScore = 0;
    let userSentencesCreated = [];
    let currentPromptIndex = 0;
    let dialogueTurnIndex = 0;
    let speakingDrillIndex = 0;
    let submissionToken = "rp_sub_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const sessionQuestions = shuffle(roleplay.practiceQuestions || []).map((q) => {
      const shuffledOpts = shuffle(q.options);
      const correctText = q.options[q.correct];
      const newCorrectIdx = shuffledOpts.indexOf(correctText);
      return {
        ...q,
        options: shuffledOpts,
        correct: newCorrectIdx
      };
    });
    function renderView() {
      container.innerHTML = `
      <div class="container" style="padding-top: 20px; padding-bottom: 60px; max-width: 920px;">
        
        <!-- Top Back Navigation Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-hub" style="display: inline-flex; align-items: center; gap: 6px;">
            ${arrowLeftIcon(15)} All Roleplays
          </button>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-navy">Roleplay ${roleplay.number} of 05</span>
            <span class="badge badge-gold">Sir Zubair's Class</span>
          </div>
        </div>

        <!-- Roleplay Banner Header with Creative Scenario Visualizer -->
        <div class="ha-card" style="padding: 0; border-radius: var(--radius-lg); border-top: 6px solid ${roleplay.color || "var(--ha-navy)"}; margin-bottom: 22px; overflow: hidden;">
          <div style="width: 100%; border-bottom: 1px solid var(--ha-border);">
            ${renderRoleplayCreativeBanner(roleplay, true)}
          </div>

          <div style="padding: 20px 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
              <span style="background: var(--ha-navy); color: #fff; padding: 4px 10px; border-radius: var(--radius-sm); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                ROLEPLAY ${roleplay.number}
              </span>
              <h1 style="font-size: clamp(1.35rem, 3vw, 1.85rem); color: var(--ha-navy); font-weight: 800; margin: 0; line-height: 1.25;">
                ${roleplay.title}
              </h1>
            </div>
            
            <p style="font-size: 0.95rem; color: var(--ha-text-main); line-height: 1.5; margin-bottom: 12px; background: #F8FAFC; padding: 10px 14px; border-radius: var(--radius-sm); border-left: 3px solid var(--ha-navy);">
              <strong>Scenario:</strong> ${roleplay.scenario}
            </p>

            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <strong style="font-size: 0.8rem; color: var(--ha-navy); text-transform: uppercase; display: flex; align-items: center; gap: 5px;">
                ${bookIcon(13)} Grammar Focus:
              </strong>
              ${roleplay.grammarFocus.map((g) => `
                <span class="badge" style="background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 700; font-size: 0.78rem;">${g}</span>
              `).join("")}
              <span style="font-size: 0.8rem; color: var(--ha-text-muted); margin-left: 6px;">${roleplay.grammarDescription}</span>
            </div>
          </div>
        </div>

        <!-- Interactive Step Tabs -->
        <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 22px; -webkit-overflow-scrolling: touch;">
          <button class="btn btn-sm step-tab ${currentStep === "learn" ? "btn-primary" : "btn-outline"}" data-step="learn" style="display: inline-flex; align-items: center; gap: 6px;">
            ${bookIcon(14)} 1. Spoken Expressions
          </button>
          <button class="btn btn-sm step-tab ${currentStep === "practice" ? "btn-primary" : "btn-outline"}" data-step="practice" style="display: inline-flex; align-items: center; gap: 6px;">
            ${puzzleIcon(14)} 2. Practice (${sessionQuestions.length})
          </button>
          <button class="btn btn-sm step-tab ${currentStep === "create" ? "btn-primary" : "btn-outline"}" data-step="create" style="display: inline-flex; align-items: center; gap: 6px;">
            ${pencilIcon(14)} 3. Create Your Own
          </button>
          <button class="btn btn-sm step-tab ${currentStep === "dialogue" ? "btn-primary" : "btn-outline"}" data-step="dialogue" style="display: inline-flex; align-items: center; gap: 6px;">
            ${roleplayIcon(14)} 4. Mini Roleplay
          </button>
          <button class="btn btn-sm step-tab ${currentStep === "speaking" ? "btn-primary" : "btn-outline"}" data-step="speaking" style="display: inline-flex; align-items: center; gap: 6px;">
            ${micIcon(14)} 5. Speaking Drills
          </button>
        </div>

        <!-- Dynamic Step Content Body -->
        <div id="roleplay-step-mount"></div>

      </div>
    `;
      container.querySelector("#btn-back-to-hub")?.addEventListener("click", () => {
        sound.playClick();
        renderRoleplaysHub(container, onNavigate, null);
        window.scrollTo(0, 0);
      });
      container.querySelectorAll(".step-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
          sound.playClick();
          currentStep = btn.dataset.step;
          renderView();
        });
      });
      const mount = container.querySelector("#roleplay-step-mount");
      if (!mount) return;
      switch (currentStep) {
        case "learn":
          renderLearnStep(mount);
          break;
        case "practice":
          renderPracticeStep(mount);
          break;
        case "create":
          renderCreateStep(mount);
          break;
        case "dialogue":
          renderDialogueStep(mount);
          break;
        case "speaking":
          renderSpeakingStep(mount);
          break;
        case "result":
          renderResultStep(mount);
          break;
        default:
          renderLearnStep(mount);
      }
    }
    function renderLearnStep(mount) {
      mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 1.3rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
            Spoken Expressions Taught by Sir Zubair
          </h2>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin: 0;">
            Click the <strong>Listen</strong> button on each expression to hear the pronunciation. Remember: these expressions are examples \u2014 you will also create your own sentences!
          </p>
        </div>

        <!-- Spoken Expressions Cards -->
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 26px;">
          ${roleplay.spokenExpressions.map((exp, idx) => `
            <div style="background: #F8FAFC; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; transition: border-color 0.2s ease;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="background: var(--ha-navy); color: #fff; border-radius: var(--radius-pill); width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800; flex-shrink: 0; margin-top: 2px;">
                  ${idx + 1}
                </span>
                <div>
                  <div style="font-size: 1.05rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 2px;">
                    \u201C${exp.text}\u201D
                  </div>
                  <div style="font-size: 0.82rem; color: var(--ha-text-muted);">
                    <em>${exp.meaning}</em> ${exp.context ? `\u2022 <span style="color: var(--ha-gold-dark); font-weight: 600;">[${exp.context}]</span>` : ""}
                  </div>
                </div>
              </div>

              <button class="btn btn-outline btn-sm tts-listen-btn" data-text="${exp.text}" style="background: #FFFFFF; font-size: 0.8rem; border-radius: var(--radius-pill); display: inline-flex; align-items: center; gap: 6px;">
                ${speakerIcon(14)} Listen
              </button>
            </div>
          `).join("")}
        </div>

        <!-- Key Vocabulary Section -->
        ${roleplay.keyVocab?.length ? `
          <div style="margin-bottom: 26px;">
            <h3 style="font-size: 1.1rem; color: var(--ha-navy); font-weight: 800; margin-bottom: 12px;">
              Key Vocabulary & Terms
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
              ${roleplay.keyVocab.map((v) => `
                <div style="background: #FFFFFF; border: 1px solid var(--ha-border); border-radius: var(--radius-sm); padding: 10px 14px; box-shadow: var(--ha-shadow-xs);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: var(--ha-navy); font-size: 0.95rem;">${v.word}</strong>
                    <span style="font-size: 0.7rem; color: var(--ha-gold-dark); font-weight: 700;">${v.type}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--ha-text-muted); margin-bottom: 4px;">${v.meaning}</div>
                  <div style="font-size: 0.76rem; color: var(--ha-navy); font-style: italic;">e.g. \u201C${v.example}\u201D</div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Next Action Button -->
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary btn-lg" id="btn-next-to-practice">
            Start Practice Mode \u2192
          </button>
        </div>
      </div>
    `;
      mount.querySelectorAll(".tts-listen-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          playPronunciation(btn.dataset.text);
        });
      });
      mount.querySelector("#btn-next-to-practice")?.addEventListener("click", () => {
        sound.playClick();
        currentStep = "practice";
        renderView();
        window.scrollTo(0, 0);
      });
    }
    function renderPracticeStep(mount) {
      if (practiceIndex >= sessionQuestions.length) {
        currentStep = "create";
        renderView();
        return;
      }
      const q = sessionQuestions[practiceIndex];
      mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: var(--ha-navy);">
            Practice Question ${practiceIndex + 1} of ${sessionQuestions.length}
          </span>
          <span class="badge badge-gold">Score: ${practiceScore} / ${practiceIndex}</span>
        </div>

        <div class="progress-container" style="height: 6px; margin-bottom: 20px;">
          <div class="progress-bar-fill" style="width: ${practiceIndex / sessionQuestions.length * 100}%;"></div>
        </div>

        <h3 style="font-size: 1.25rem; color: var(--ha-navy); font-weight: 800; line-height: 1.4; margin-bottom: 20px;">
          ${q.question}
        </h3>

        <!-- Options -->
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;" id="practice-options-mount">
          ${q.options.map((opt, optIdx) => `
            <button class="btn btn-outline practice-opt-btn" data-optidx="${optIdx}" style="text-align: left; justify-content: flex-start; padding: 14px 18px; font-size: 0.95rem; line-height: 1.4; border-radius: var(--radius-md);">
              <span style="font-weight: 800; width: 24px; color: var(--ha-text-muted);">${String.fromCharCode(65 + optIdx)}.</span>
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>

        <div id="practice-feedback-mount" style="display: none; margin-bottom: 20px;"></div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-outline btn-sm" id="btn-skip-practice">Skip</button>
          <button class="btn btn-primary" id="btn-next-practice-q" style="display: none;">Continue \u2192</button>
        </div>
      </div>
    `;
      let answered = false;
      const feedbackMount = mount.querySelector("#practice-feedback-mount");
      const nextBtn = mount.querySelector("#btn-next-practice-q");
      mount.querySelectorAll(".practice-opt-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const chosen = parseInt(btn.dataset.optidx, 10);
          const isCorrect = chosen === q.correct;
          if (isCorrect) {
            practiceScore++;
            sound.playSuccess();
            btn.style.borderColor = "var(--ha-success)";
            btn.style.backgroundColor = "var(--ha-success-bg)";
            btn.style.color = "var(--ha-success)";
          } else {
            sound.playError();
            btn.style.borderColor = "var(--ha-error)";
            btn.style.backgroundColor = "#FEF2F2";
            btn.style.color = "var(--ha-error)";
            const correctBtn = mount.querySelector(`.practice-opt-btn[data-optidx="${q.correct}"]`);
            if (correctBtn) {
              correctBtn.style.borderColor = "var(--ha-success)";
              correctBtn.style.backgroundColor = "var(--ha-success-bg)";
            }
          }
          feedbackMount.style.display = "block";
          feedbackMount.innerHTML = `
          <div style="padding: 12px 16px; border-radius: var(--radius-sm); background: ${isCorrect ? "var(--ha-success-bg)" : "#FEF2F2"}; color: ${isCorrect ? "var(--ha-success)" : "var(--ha-error)"}; font-size: 0.9rem; display: flex; align-items: flex-start; gap: 8px;">
            <span style="flex-shrink: 0; margin-top: 1px;">${isCorrect ? checkCircleIcon(16) : infoIcon(16)}</span>
            <div><strong>${isCorrect ? "Correct!" : "Incorrect."}</strong> ${q.explanation}</div>
          </div>
        `;
          if (nextBtn) nextBtn.style.display = "inline-flex";
        });
      });
      nextBtn?.addEventListener("click", () => {
        sound.playClick();
        practiceIndex++;
        if (practiceIndex >= sessionQuestions.length) {
          currentStep = "create";
        }
        renderView();
        window.scrollTo(0, 0);
      });
      mount.querySelector("#btn-skip-practice")?.addEventListener("click", () => {
        sound.playClick();
        practiceIndex++;
        if (practiceIndex >= sessionQuestions.length) {
          currentStep = "create";
        }
        renderView();
        window.scrollTo(0, 0);
      });
    }
    function renderCreateStep(mount) {
      const prompts = roleplay.sentencePrompts || [];
      const prompt2 = prompts[currentPromptIndex] || prompts[0];
      mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span class="badge badge-red">STEP 3 \u2022 REAL PRODUCTION</span>
            <span style="font-size: 0.82rem; color: var(--ha-text-muted); font-weight: 700;">Prompt ${currentPromptIndex + 1} of ${prompts.length}</span>
          </div>
          <h2 style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
            Create Your Own Sentence
          </h2>
          <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin: 0;">
            Do not just memorize the teacher's example! Form your OWN real English sentence based on this situation.
          </p>
        </div>

        <!-- Prompt Card -->
        <div style="background: #F8FAFC; border: 2px dashed rgba(10, 37, 88, 0.2); border-radius: var(--radius-md); padding: 18px 20px; margin-bottom: 20px;">
          <h3 style="font-size: 1.1rem; color: var(--ha-navy); margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
            ${pencilIcon(16)} ${prompt2.title}
          </h3>
          <p style="font-size: 0.95rem; color: var(--ha-text-main); margin-bottom: 10px; line-height: 1.5;">
            ${prompt2.instruction}
          </p>
          <div style="font-size: 0.85rem; color: var(--ha-text-muted); background: #FFFFFF; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--ha-border);">
            <strong>Teacher's Example Idea:</strong> <em>\u201C${prompt2.example}\u201D</em>
          </div>
        </div>

        <!-- Student Input -->
        <div style="margin-bottom: 18px;">
          <label style="display: block; font-size: 0.88rem; font-weight: 700; color: var(--ha-navy); margin-bottom: 8px;">
            Type your sentence here:
          </label>
          <textarea id="student-sentence-input" rows="3" placeholder="e.g. Type your own English sentence..." 
            style="width: 100%; border: 1.5px solid var(--ha-border); border-radius: var(--radius-md); padding: 12px 14px; font-size: 1rem; color: var(--ha-text-main); font-family: inherit; resize: vertical; box-sizing: border-box; outline: none; transition: border-color 0.2s ease;"></textarea>
        </div>

        <div id="sentence-feedback-box" style="display: none; margin-bottom: 20px;"></div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-skip-prompt">Skip Prompt</button>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" id="btn-check-sentence">
              Check My Sentence
            </button>
            <button class="btn btn-primary" id="btn-continue-next-step" style="display: none;">
              Next Step \u2192
            </button>
          </div>
        </div>
      </div>
    `;
      const input = mount.querySelector("#student-sentence-input");
      const feedbackBox = mount.querySelector("#sentence-feedback-box");
      const checkBtn = mount.querySelector("#btn-check-sentence");
      const nextBtn = mount.querySelector("#btn-continue-next-step");
      checkBtn?.addEventListener("click", () => {
        const text = input?.value || "";
        const validation = validateStudentSentence(roleplay.id, prompt2.id, text);
        feedbackBox.style.display = "block";
        if (validation.valid) {
          sound.playSuccess();
          userSentencesCreated.push(text.trim());
          feedbackBox.innerHTML = `
          <div style="padding: 14px 18px; border-radius: var(--radius-md); background: var(--ha-success-bg); border: 1.5px solid var(--ha-success); color: var(--ha-navy);">
            <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px; color: var(--ha-success);">
              ${validation.feedback}
            </div>
            <div style="font-size: 0.85rem; color: var(--ha-text-muted);">
              Sentence recorded: <em>\u201C${text.trim()}\u201D</em>
            </div>
          </div>
        `;
          checkBtn.style.display = "none";
          nextBtn.style.display = "inline-flex";
        } else {
          sound.playError();
          feedbackBox.innerHTML = `
          <div style="padding: 14px 18px; border-radius: var(--radius-md); background: #FEF2F2; border: 1.5px solid var(--ha-error); color: var(--ha-navy);">
            <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 4px; color: var(--ha-error);">
              Needs A Little Adjustment
            </div>
            <div style="font-size: 0.88rem; color: var(--ha-text-main);">
              ${validation.feedback}
            </div>
          </div>
        `;
        }
      });
      nextBtn?.addEventListener("click", () => {
        sound.playClick();
        currentPromptIndex++;
        if (currentPromptIndex < prompts.length) {
          renderView();
        } else {
          currentStep = "dialogue";
          renderView();
        }
        window.scrollTo(0, 0);
      });
      mount.querySelector("#btn-skip-prompt")?.addEventListener("click", () => {
        sound.playClick();
        currentPromptIndex++;
        if (currentPromptIndex < prompts.length) {
          renderView();
        } else {
          currentStep = "dialogue";
          renderView();
        }
        window.scrollTo(0, 0);
      });
    }
    function renderDialogueStep(mount) {
      const dialogue = roleplay.miniRoleplay;
      const turns = dialogue?.turns || [];
      if (dialogueTurnIndex >= turns.length) {
        currentStep = "speaking";
        renderView();
        return;
      }
      const currentTurn = turns[dialogueTurnIndex];
      mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <span class="badge badge-navy">STEP 4 \u2022 CONVERSATION PRACTICE</span>
            <h2 style="font-size: 1.3rem; color: var(--ha-navy); font-weight: 800; margin: 4px 0 0;">
              Interactive Mini Roleplay
            </h2>
          </div>
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--ha-text-muted);">
            Turn ${dialogueTurnIndex + 1} of ${turns.length}
          </span>
        </div>

        <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 20px;">
          Practice responding naturally to the other speaker using the target grammar focus.
        </p>

        <!-- Speaker Dialogue Box -->
        <div style="background: #EDF2F9; border-radius: var(--radius-lg); padding: 18px 22px; margin-bottom: 22px; display: flex; align-items: flex-start; gap: 14px;">
          <div style="background: var(--ha-navy); color: #fff; width: 44px; height: 44px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${userIcon(22)}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="color: var(--ha-navy); font-size: 0.95rem;">${currentTurn.speaker}</strong>
              <button class="btn btn-outline btn-sm tts-listen-btn" data-text="${currentTurn.text}" style="background: #FFFFFF; padding: 4px 10px; font-size: 0.75rem; border-radius: var(--radius-pill); display: inline-flex; align-items: center; gap: 5px;">
                ${speakerIcon(13)} Listen
              </button>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; color: var(--ha-navy); line-height: 1.4;">
              \u201C${currentTurn.text}\u201D
            </div>
          </div>
        </div>

        <!-- Student Response Choices -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.88rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 10px;">
            Choose your response (You = ${dialogue.roleB}):
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;" id="dialogue-choices-mount">
            ${currentTurn.options.map((opt, optIdx) => `
              <button class="btn btn-outline dialogue-opt-btn" data-optidx="${optIdx}" style="text-align: left; justify-content: flex-start; padding: 14px 18px; font-size: 0.95rem; border-radius: var(--radius-md);">
                <span style="font-weight: 800; width: 22px; color: var(--ha-text-muted);">${String.fromCharCode(65 + optIdx)}.</span>
                <span>\u201C${opt}\u201D</span>
              </button>
            `).join("")}
          </div>
        </div>

        <div id="dialogue-feedback-mount" style="display: none; margin-bottom: 20px;"></div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" id="btn-next-dialogue" style="display: none;">Next Turn \u2192</button>
        </div>
      </div>
    `;
      mount.querySelector(".tts-listen-btn")?.addEventListener("click", (e) => {
        playPronunciation(e.currentTarget.dataset.text);
      });
      let chosenDone = false;
      const feedbackMount = mount.querySelector("#dialogue-feedback-mount");
      const nextBtn = mount.querySelector("#btn-next-dialogue");
      mount.querySelectorAll(".dialogue-opt-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (chosenDone) return;
          chosenDone = true;
          const optIdx = parseInt(btn.dataset.optidx, 10);
          const isCorrect = optIdx === currentTurn.correctIndex;
          if (isCorrect) {
            sound.playSuccess();
            btn.style.borderColor = "var(--ha-success)";
            btn.style.backgroundColor = "var(--ha-success-bg)";
            feedbackMount.style.display = "block";
            feedbackMount.innerHTML = `
            <div style="padding: 12px 16px; border-radius: var(--radius-sm); background: var(--ha-success-bg); color: var(--ha-success); font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
              ${checkCircleIcon(16)} <span><strong>Natural Response!</strong> You responded politely and followed the grammar pattern.</span>
            </div>
          `;
          } else {
            sound.playError();
            btn.style.borderColor = "var(--ha-error)";
            btn.style.backgroundColor = "#FEF2F2";
            feedbackMount.style.display = "block";
            feedbackMount.innerHTML = `
            <div style="padding: 12px 16px; border-radius: var(--radius-sm); background: #FEF2F2; color: var(--ha-error); font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
              ${infoIcon(16)} <span><strong>Teacher Note:</strong> Option A is the natural spoken response for this situation.</span>
            </div>
          `;
          }
          if (nextBtn) nextBtn.style.display = "inline-flex";
        });
      });
      nextBtn?.addEventListener("click", () => {
        sound.playClick();
        dialogueTurnIndex++;
        if (dialogueTurnIndex >= turns.length) {
          currentStep = "speaking";
        }
        renderView();
        window.scrollTo(0, 0);
      });
    }
    function renderSpeakingStep(mount) {
      const sentences = roleplay.speakingSentences || [];
      if (speakingDrillIndex >= sentences.length) {
        currentStep = "result";
        renderView();
        return;
      }
      const currentSentence = sentences[speakingDrillIndex];
      const hasSpeechRec = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
      mount.innerHTML = `
      <div class="ha-card" style="padding: 26px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <span class="badge badge-gold">STEP 5 \u2022 SPEAKING CONFIDENCE</span>
            <h2 style="font-size: 1.35rem; color: var(--ha-navy); font-weight: 800; margin: 4px 0 0;">
              Speaking Practice
            </h2>
          </div>
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--ha-text-muted);">
            Sentence ${speakingDrillIndex + 1} of ${sentences.length}
          </span>
        </div>

        <p style="font-size: 0.9rem; color: var(--ha-text-muted); margin-bottom: 22px;">
          Listen to the sentence, then practice speaking it out loud with confidence!
        </p>

        <!-- Sentence Card -->
        <div style="background: #F8FAFC; border: 2px solid var(--ha-border); border-radius: var(--radius-lg); padding: 26px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 1.35rem; font-weight: 800; color: var(--ha-navy); line-height: 1.4; margin-bottom: 14px;">
            \u201C${currentSentence}\u201D
          </div>

          <button class="btn btn-outline tts-listen-btn" data-text="${currentSentence}" style="background: #FFFFFF; border-radius: var(--radius-pill); font-size: 0.9rem; padding: 8px 18px; display: inline-flex; align-items: center; gap: 8px; margin: 0 auto;">
            ${speakerIcon(16)} Hear Native Pronunciation
          </button>
        </div>

        <!-- Mic / Speaking Trigger -->
        <div style="text-align: center; margin-bottom: 24px;">
          ${hasSpeechRec ? `
            <button class="btn btn-primary btn-lg" id="btn-start-mic" style="border-radius: var(--radius-pill); padding: 12px 28px; display: inline-flex; align-items: center; gap: 8px; margin: 0 auto;">
              <span id="mic-icon">${micIcon(18)}</span> <span id="mic-text">Tap to Speak</span>
            </button>
            <div id="mic-status-text" style="font-size: 0.85rem; color: var(--ha-text-muted); margin-top: 8px;">
              Click button and speak into your microphone
            </div>
          ` : `
            <p style="font-size: 0.88rem; color: var(--ha-text-muted); margin-bottom: 12px;">
              Read the sentence out loud 2 times to build muscle memory!
            </p>
            <button class="btn btn-primary btn-lg" id="btn-spoke-aloud" style="border-radius: var(--radius-pill); display: inline-flex; align-items: center; gap: 8px; margin: 0 auto;">
              ${micIcon(18)} I Spoke It Out Loud
            </button>
          `}
        </div>

        <div id="speaking-feedback-box" style="display: none; margin-bottom: 20px;"></div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" id="btn-next-speaking" style="display: none;">Next Sentence \u2192</button>
        </div>
      </div>
    `;
      mount.querySelector(".tts-listen-btn")?.addEventListener("click", (e) => {
        playPronunciation(e.currentTarget.dataset.text);
      });
      const feedbackBox = mount.querySelector("#speaking-feedback-box");
      const nextBtn = mount.querySelector("#btn-next-speaking");
      if (hasSpeechRec) {
        const micBtn = mount.querySelector("#btn-start-mic");
        const micIconEl = mount.querySelector("#mic-icon");
        const micText = mount.querySelector("#mic-text");
        const statusText = mount.querySelector("#mic-status-text");
        micBtn?.addEventListener("click", () => {
          sound.playClick();
          const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRec();
          recognition.lang = "en-US";
          recognition.interimResults = false;
          micText.innerText = "Listening...";
          if (micIconEl) micIconEl.innerHTML = `<span style="display: inline-block; width: 12px; height: 12px; background: #EF4444; border-radius: 50%; animation: pulse 1s infinite;"></span>`;
          statusText.innerText = "Speak now...";
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            micText.innerText = "Tap to Speak";
            if (micIconEl) micIconEl.innerHTML = micIcon(18);
            statusText.innerText = "";
            sound.playSuccess();
            feedbackBox.style.display = "block";
            feedbackBox.innerHTML = `
            <div style="padding: 14px 18px; border-radius: var(--radius-md); background: var(--ha-success-bg); border: 1.5px solid var(--ha-success); color: var(--ha-navy);">
              <div style="font-weight: 800; color: var(--ha-success); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                ${checkCircleIcon(16)} Great Speaking!
              </div>
              <div style="font-size: 0.9rem;">
                We heard: <em>\u201C${transcript}\u201D</em>
              </div>
            </div>
          `;
            nextBtn.style.display = "inline-flex";
          };
          recognition.onerror = () => {
            micText.innerText = "Tap to Speak";
            if (micIconEl) micIconEl.innerHTML = micIcon(18);
            statusText.innerText = "Microphone error or permission denied. You can still proceed by practicing out loud.";
            nextBtn.style.display = "inline-flex";
          };
          recognition.start();
        });
      } else {
        mount.querySelector("#btn-spoke-aloud")?.addEventListener("click", () => {
          sound.playSuccess();
          feedbackBox.style.display = "block";
          feedbackBox.innerHTML = `
          <div style="padding: 14px 18px; border-radius: var(--radius-md); background: var(--ha-success-bg); color: var(--ha-success); font-weight: 800; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${checkCircleIcon(16)} <span>Excellent work! Speaking out loud builds your physical English fluency.</span>
          </div>
        `;
          nextBtn.style.display = "inline-flex";
        });
      }
      nextBtn?.addEventListener("click", () => {
        sound.playClick();
        speakingDrillIndex++;
        if (speakingDrillIndex >= sentences.length) {
          currentStep = "result";
        }
        renderView();
        window.scrollTo(0, 0);
      });
    }
    function renderResultStep(mount) {
      const totalQ = sessionQuestions.length;
      const percent = totalQ > 0 ? Math.round(practiceScore / totalQ * 100) : 100;
      const isPerfect = percent >= 100;
      const completionResult = stateManager.recordRoleplayCompletion(roleplay.id, {
        percent,
        score: practiceScore,
        totalQuestions: totalQ,
        sentencesCreated: userSentencesCreated.length || 1,
        submissionToken
      });
      const xpEarned = completionResult.xpEarned || (isPerfect ? 50 : 25);
      fireConfetti(3e3);
      sound.playLevelUp();
      mount.innerHTML = `
      <div class="ha-card" style="padding: 36px 28px; border-radius: var(--radius-lg); text-align: center; border-top: 6px solid ${isPerfect ? "var(--ha-gold)" : "var(--ha-navy)"}; margin-bottom: 24px;">
        <div style="margin-bottom: 14px; color: ${isPerfect ? "var(--ha-gold)" : "var(--ha-navy)"}; display: flex; justify-content: center;">
          ${trophyIcon(56)}
        </div>

        <h2 style="font-size: 2rem; color: var(--ha-navy); font-weight: 800; margin: 0 0 6px;">
          Roleplay Completed!
        </h2>
        <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
          You successfully completed <strong>Roleplay ${roleplay.number}: ${roleplay.title}</strong>!
        </p>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; margin-bottom: 28px; max-width: 600px; margin-left: auto; margin-right: auto;">
          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md);">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">PRACTICE SCORE</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-navy);">${practiceScore} / ${totalQ}</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--ha-gold-dark);">${percent}%</div>
          </div>

          <div style="background: var(--ha-navy-subtle); padding: 16px; border-radius: var(--radius-md);">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-text-muted); text-transform: uppercase;">SENTENCES CREATED</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-navy);">${userSentencesCreated.length || 1}</div>
            <div style="font-size: 0.78rem; color: var(--ha-text-muted);">Real Production</div>
          </div>

          <div style="background: #ECFDF5; padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.3);">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-success); text-transform: uppercase;">REAL XP EARNED</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--ha-success);">+${xpEarned} XP</div>
            <div style="font-size: 0.78rem; color: var(--ha-success); font-weight: 600;">Saved to Profile</div>
          </div>
        </div>

        <!-- Roleplay Badge Unlocked -->
        <div style="background: #FEF7E8; border: 1.5px solid rgba(245, 166, 35, 0.4); border-radius: var(--radius-md); padding: 16px 20px; max-width: 480px; margin: 0 auto 28px; display: flex; align-items: center; gap: 14px; text-align: left;">
          <div style="color: var(--ha-gold-dark); flex-shrink: 0;">
            ${checkCircleIcon(32)}
          </div>
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--ha-gold-dark); text-transform: uppercase;">ACHIEVEMENT UNLOCKED</div>
            <strong style="color: var(--ha-navy); font-size: 1.05rem;">Roleplay ${roleplay.number} Complete</strong>
            <div style="font-size: 0.8rem; color: var(--ha-text-muted);">Badge permanently added to your student profile.</div>
          </div>
        </div>

        <!-- Next Actions -->
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-lg" id="btn-result-hub" style="display: inline-flex; align-items: center; gap: 8px;">
            ${arrowLeftIcon(16)} All Roleplays
          </button>
          <button class="btn btn-primary btn-lg" id="btn-result-repeat" style="display: inline-flex; align-items: center; gap: 8px;">
            ${refreshIcon(16)} Practice Again
          </button>
        </div>
      </div>
    `;
      mount.querySelector("#btn-result-hub")?.addEventListener("click", () => {
        sound.playClick();
        renderRoleplaysHub(container, onNavigate, null);
        window.scrollTo(0, 0);
      });
      mount.querySelector("#btn-result-repeat")?.addEventListener("click", () => {
        sound.playClick();
        renderRoleplayRunner(container, onNavigate, roleplay);
        window.scrollTo(0, 0);
      });
    }
    renderView();
  }

  // js/components/chatBox.js
  var ChatBox = class {
    constructor() {
      this.isOpen = false;
      this.messages = [];
      this.unreadCount = 0;
      this.isSending = false;
      this.container = null;
    }
    init() {
      if (document.getElementById("ha-chat-widget")) return;
      this.container = document.createElement("div");
      this.container.id = "ha-chat-widget";
      document.body.appendChild(this.container);
      this.render();
      this.loadMessages();
      this.setupListeners();
    }
    setupListeners() {
      apiClient2.subscribeEvents((type, data) => {
        if (type === "new_chat_message") {
          if (!this.messages.some((m) => m.messageId === data.messageId)) {
            this.messages.push(data);
            if (!this.isOpen) {
              this.unreadCount++;
              this.updateBadge();
            }
            this.renderMessages();
          }
        } else if (type === "chat_message_replied") {
          const msg = this.messages.find((m) => m.messageId === data.messageId);
          if (msg) {
            msg.replyText = data.replyText;
            msg.replyAt = (/* @__PURE__ */ new Date()).toISOString();
            this.renderMessages();
          }
        }
      });
      stateManager.subscribe("STUDENT_LOGGED_IN", () => {
        this.render();
      });
      stateManager.subscribe("STUDENT_JOINED", () => {
        this.render();
      });
    }
    async loadMessages() {
      try {
        const res = await apiClient2.getChatMessages();
        if (res && Array.isArray(res.messages)) {
          this.messages = res.messages;
          this.renderMessages();
        }
      } catch (e) {
      }
    }
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.unreadCount = 0;
        this.updateBadge();
        sound.playClick();
      }
      const panel = this.container.querySelector("#ha-chat-panel");
      const fab = this.container.querySelector("#ha-chat-fab");
      if (panel) panel.style.display = this.isOpen ? "flex" : "none";
      if (fab) {
        fab.style.display = this.isOpen ? "none" : "flex";
      }
      if (this.isOpen) {
        setTimeout(() => {
          this.scrollToBottom();
          const input = this.container.querySelector("#chat-input-text");
          if (input) input.focus();
        }, 100);
      }
    }
    updateBadge() {
      const badge = this.container.querySelector("#chat-fab-badge");
      if (badge) {
        if (this.unreadCount > 0) {
          badge.textContent = this.unreadCount;
          badge.style.display = "flex";
        } else {
          badge.style.display = "none";
        }
      }
    }
    scrollToBottom() {
      const msgList = this.container.querySelector("#chat-messages-list");
      if (msgList) {
        msgList.scrollTop = msgList.scrollHeight;
      }
    }
    async sendMessage(text, studentNameOverride = null) {
      const content = (text || "").trim();
      if (!content || this.isSending) return;
      const currentStudent = stateManager.getCurrentStudent();
      const nameInput = this.container.querySelector("#chat-guest-name");
      const senderName = currentStudent?.name || studentNameOverride || nameInput?.value?.trim() || "Student";
      this.isSending = true;
      const sendBtn = this.container.querySelector("#chat-send-btn");
      if (sendBtn) sendBtn.disabled = true;
      const tempId = "temp_" + Date.now();
      const optMsg = {
        messageId: tempId,
        senderRole: "student",
        senderName,
        studentId: currentStudent?.id || null,
        content,
        replyText: null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.messages.push(optMsg);
      this.renderMessages();
      this.scrollToBottom();
      sound.playClick();
      const textInput = this.container.querySelector("#chat-input-text");
      if (textInput) textInput.value = "";
      try {
        const res = await apiClient2.sendChatMessage({
          senderName,
          content,
          studentId: currentStudent?.id || null,
          studentEmail: currentStudent?.email || null
        });
        if (res && res.message) {
          const idx = this.messages.findIndex((m) => m.messageId === tempId);
          if (idx !== -1) {
            this.messages[idx] = res.message;
            this.renderMessages();
          }
        }
      } catch (err) {
        console.warn("Chat send error:", err);
      } finally {
        this.isSending = false;
        if (sendBtn) sendBtn.disabled = false;
        this.scrollToBottom();
      }
    }
    render() {
      const currentStudent = stateManager.getCurrentStudent();
      const isTeacher = stateManager.state.isAdmin;
      this.container.innerHTML = `
      <style>
        #ha-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @media (max-width: 768px) {
          #ha-chat-widget {
            bottom: 74px !important;
            right: 14px !important;
          }
          .chat-window-panel {
            width: calc(100vw - 28px) !important;
            height: 70vh !important;
          }
        }

        .chat-fab-button {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--ha-navy, #0A2558) 0%, #1e3a8a 100%);
          color: #ffffff;
          padding: 13px 20px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.25);
          box-shadow: 0 10px 25px -4px rgba(10, 37, 88, 0.45), 0 0 0 1px rgba(0,0,0,0.06);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
        }

        .chat-fab-button:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 16px 32px -4px rgba(10, 37, 88, 0.55);
        }

        .chat-fab-pulse {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: chatPulse 2s infinite;
        }

        @keyframes chatPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .chat-fab-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--ha-red, #D90429);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: none;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        }

        .chat-window-panel {
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 540px;
          max-height: calc(100vh - 100px);
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 24px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1.5px rgba(0, 0, 0, 0.08);
          display: none;
          flex-direction: column;
          overflow: hidden;
          animation: chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chat-header {
          background: linear-gradient(135deg, var(--ha-navy, #0A2558) 0%, #1e3a8a 100%);
          color: #ffffff;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #F8FAFC;
        }

        .chat-bubble-student {
          align-self: flex-end;
          background: var(--ha-navy, #0A2558);
          color: #ffffff;
          padding: 10px 14px;
          border-radius: 16px 16px 2px 16px;
          max-width: 82%;
          font-size: 0.88rem;
          line-height: 1.45;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06);
          word-break: break-word;
        }

        .chat-bubble-teacher {
          align-self: flex-start;
          background: #ffffff;
          color: var(--ha-navy, #0A2558);
          border: 1.5px solid var(--ha-border, #E2E8F0);
          padding: 11px 14px;
          border-radius: 16px 16px 16px 2px;
          max-width: 85%;
          font-size: 0.88rem;
          line-height: 1.45;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          word-break: break-word;
        }

        .chat-quick-chip {
          background: #ffffff;
          border: 1.5px solid #CBD5E1;
          color: var(--ha-navy, #0A2558);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .chat-quick-chip:hover {
          background: #EFF6FF;
          border-color: #3B82F6;
          transform: translateY(-1px);
        }

        .chat-footer {
          padding: 12px 14px;
          background: #ffffff;
          border-top: 1.5px solid var(--ha-border, #E2E8F0);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @media (max-width: 640px) {
          #ha-chat-widget {
            bottom: 74px; /* Above mobile bottom nav */
            right: 14px;
          }
          .chat-window-panel {
            width: calc(100vw - 28px);
            height: calc(100vh - 160px);
          }
        }
      </style>

      <!-- FLOATING ACTION BUTTON (FAB) -->
      <div class="chat-fab-button" id="ha-chat-fab" title="Chat with Sir Zubair">
        <div class="chat-fab-pulse"></div>
        <span style="font-size: 1.15rem;">\u{1F4AC}</span>
        <div style="display: flex; flex-direction: column; line-height: 1.1;">
          <span style="font-weight: 800; font-size: 0.88rem; letter-spacing: 0.02em;">Ask Sir Zubair</span>
          <span style="font-size: 0.68rem; opacity: 0.85;">Online Help Desk</span>
        </div>
        <div class="chat-fab-badge" id="chat-fab-badge">0</div>
      </div>

      <!-- CHAT WINDOW PANEL -->
      <div class="chat-window-panel" id="ha-chat-panel">
        <!-- HEADER -->
        <div class="chat-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; border: 2px solid #FCD34D;">
              \u{1F468}\u200D\u{1F3EB}
            </div>
            <div>
              <div style="font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                Sir Zubair
                <span style="background: #10B981; color: #fff; font-size: 0.62rem; padding: 1px 6px; border-radius: 999px; font-weight: 700;">ONLINE</span>
              </div>
              <div style="font-size: 0.72rem; opacity: 0.85;">Home Academy Faculty Portal</div>
            </div>
          </div>
          <button type="button" id="chat-close-btn" style="background: rgba(255,255,255,0.15); border: none; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.9rem; font-weight: bold;" title="Close Chat">
            \u2715
          </button>
        </div>

        <!-- MESSAGES LIST -->
        <div class="chat-messages-container" id="chat-messages-list">
          <!-- GREETING MESSAGE -->
          <div class="chat-bubble-teacher">
            <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-red, #D90429); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
              <span>\u{1F468}\u200D\u{1F3EB}</span> Sir Zubair
            </div>
            <div>Assalam-o-Alaikum! Welcome to Home Academy. Ask me any question about your English grammar topics, quizzes, or vocabulary!</div>
          </div>

          <!-- QUICK QUESTIONS -->
          <div id="chat-quick-suggestions" style="display: flex; flex-direction: column; gap: 6px; margin: 4px 0;">
            <div style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; color: #64748B; letter-spacing: 0.05em;">Suggested Questions:</div>
            <button type="button" class="chat-quick-chip" data-q="Sir, what are the 6 main grammar topics in our course?">
              \u{1F4D6} What are the 6 main grammar topics?
            </button>
            <button type="button" class="chat-quick-chip" data-q="Sir, how is my quiz score and XP calculated?">
              \u2B50 How is my quiz score and XP calculated?
            </button>
            <button type="button" class="chat-quick-chip" data-q="Sir, can you help me practice English conversation for Topic 1?">
              \u{1F5E3}\uFE0F How do I practice Topic 1 Roleplay?
            </button>
          </div>

          <div id="dynamic-chat-messages"></div>
        </div>

        <!-- FOOTER INPUT -->
        <div class="chat-footer">
          ${!currentStudent && !isTeacher ? `
            <div style="display: flex; gap: 6px; align-items: center;">
              <input type="text" id="chat-guest-name" placeholder="Your Name (e.g. Ali)" 
                style="flex: 1; padding: 6px 10px; font-size: 0.78rem; border: 1.5px solid #CBD5E1; border-radius: 8px; outline: none;" />
            </div>
          ` : ""}
          <form id="chat-input-form" style="display: flex; gap: 8px; align-items: center;">
            <input type="text" id="chat-input-text" placeholder="Type your message for Sir Zubair..." required autocomplete="off"
              style="flex: 1; padding: 10px 14px; font-size: 0.88rem; border: 1.5px solid #CBD5E1; border-radius: 999px; outline: none;" />
            <button type="submit" id="chat-send-btn" style="background: var(--ha-navy, #0A2558); color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1rem; transition: transform 0.15s ease;" title="Send Message">
              \u27A4
            </button>
          </form>
        </div>
      </div>
    `;
      this.container.querySelector("#ha-chat-fab")?.addEventListener("click", () => this.toggle());
      this.container.querySelector("#chat-close-btn")?.addEventListener("click", () => this.toggle());
      this.container.querySelectorAll(".chat-quick-chip").forEach((btn) => {
        btn.addEventListener("click", () => {
          const q = btn.dataset.q;
          if (q) this.sendMessage(q);
        });
      });
      this.container.querySelector("#chat-input-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = this.container.querySelector("#chat-input-text")?.value;
        this.sendMessage(text);
      });
      this.renderMessages();
    }
    renderMessages() {
      const mount = this.container?.querySelector("#dynamic-chat-messages");
      if (!mount) return;
      if (this.messages.length === 0) {
        mount.innerHTML = "";
        return;
      }
      mount.innerHTML = this.messages.map((m) => {
        const isTeacherMsg = m.senderRole === "teacher";
        const timeStr = m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
        let html = "";
        if (isTeacherMsg) {
          html += `
          <div class="chat-bubble-teacher">
            <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-red, #D90429); margin-bottom: 2px;">
              \u{1F468}\u200D\u{1F3EB} Sir Zubair <span style="font-size: 0.65rem; color: #94A3B8; font-weight: normal; margin-left: 4px;">${timeStr}</span>
            </div>
            <div>${this.escapeHtml(m.content)}</div>
          </div>
        `;
        } else {
          html += `
          <div class="chat-bubble-student">
            <div style="font-size: 0.68rem; opacity: 0.85; margin-bottom: 2px;">
              ${this.escapeHtml(m.senderName || "Student")} <span style="font-size: 0.62rem; opacity: 0.7; margin-left: 4px;">${timeStr}</span>
            </div>
            <div>${this.escapeHtml(m.content)}</div>
          </div>
        `;
          if (m.replyText) {
            const replyTime = m.replyAt ? new Date(m.replyAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
            html += `
            <div class="chat-bubble-teacher" style="margin-top: 4px; border-left: 3px solid var(--ha-navy);">
              <div style="font-size: 0.7rem; font-weight: 800; color: var(--ha-navy); margin-bottom: 2px;">
                \u{1F468}\u200D\u{1F3EB} Sir Zubair (Teacher Reply) <span style="font-size: 0.65rem; color: #94A3B8; font-weight: normal; margin-left: 4px;">${replyTime}</span>
              </div>
              <div>${this.escapeHtml(m.replyText)}</div>
            </div>
          `;
          }
        }
        return html;
      }).join("");
      this.scrollToBottom();
    }
    escapeHtml(str) {
      if (!str) return "";
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
  };
  var chatBox = new ChatBox();

  // js/app.js
  var App = class {
    constructor() {
      this.currentRoute = "home";
      this.container = document.getElementById("view-container");
      this.authModalContainer = document.getElementById("auth-modal-container");
      this.celebrationMount = document.getElementById("celebration-modal-mount");
    }
    init() {
      this.authModal = setupAuthModal(this.authModalContainer, (student2, isReturning) => {
        this.updateNavbarUser();
        this.navigate("dashboard");
      });
      chatBox.init();
      this.setupNavigation();
      this.setupSoundToggle();
      this.setupGlobalEvents();
      setTimeout(() => {
        const loader = document.getElementById("ha-loading-screen");
        if (loader) {
          loader.classList.add("fade-out");
          setTimeout(() => loader.style.display = "none", 500);
        }
      }, 1e3);
      const student = stateManager.getCurrentStudent();
      if (student) {
        this.navigate("dashboard");
      } else {
        this.navigate("home");
      }
    }
    setupNavigation() {
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", async () => {
          sound.playClick();
          const route = item.dataset.route;
          if (route === "admin" && !stateManager.state.isAdmin) {
            try {
              const isValid = await apiClient.adminGetMe();
              if (isValid) {
                stateManager.setAdmin(true);
                this.navigate("admin");
                return;
              }
            } catch (e) {
            }
            window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: "teacher" }));
            return;
          }
          this.navigate(route);
        });
      });
      document.querySelectorAll(".mobile-nav-item").forEach((item) => {
        item.addEventListener("click", async () => {
          sound.playClick();
          const route = item.dataset.route;
          if (route === "admin" && !stateManager.state.isAdmin) {
            try {
              const isValid = await apiClient.adminGetMe();
              if (isValid) {
                stateManager.setAdmin(true);
                this.navigate("admin");
                return;
              }
            } catch (e) {
            }
            window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: "teacher" }));
            return;
          }
          this.navigate(route);
        });
      });
      document.getElementById("nav-brand-link")?.addEventListener("click", () => {
        sound.playClick();
        this.navigate("home");
      });
      document.getElementById("nav-login-btn")?.addEventListener("click", () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: { tab: "login" } }));
      });
      document.getElementById("nav-join-btn")?.addEventListener("click", () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: { tab: "register" } }));
      });
      document.getElementById("nav-user-pill")?.addEventListener("click", () => {
        sound.playClick();
        this.navigate("profile");
      });
      window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".ha-navbar");
        if (navbar) {
          navbar.classList.toggle("scrolled", window.scrollY > 12);
        }
      }, { passive: true });
      this.updateNavbarUser();
    }
    setupSoundToggle() {
      const soundBtn = document.getElementById("nav-sound-btn");
      if (!soundBtn) return;
      const updateBtnUI = () => {
        const muted = sound.isMuted();
        soundBtn.className = `audio-toggle-btn ${muted ? "muted" : ""}`;
        soundBtn.innerHTML = `<span>${muted ? "\u{1F507}" : "\u{1F50A}"}</span> <span class="sound-text">${muted ? "Sound Off" : "Sound On"}</span>`;
      };
      updateBtnUI();
      soundBtn.addEventListener("click", () => {
        sound.toggleMute();
        sound.playClick();
        updateBtnUI();
      });
    }
    updateNavbarUser() {
      const student = stateManager.getCurrentStudent();
      const userPill = document.getElementById("nav-user-pill");
      const authButtons = document.getElementById("nav-auth-buttons");
      const joinBtn = document.getElementById("nav-join-btn");
      if (student) {
        if (authButtons) authButtons.style.display = "none";
        if (joinBtn) joinBtn.style.display = "none";
        if (userPill) {
          userPill.style.display = "flex";
          userPill.title = `Logged in as ${student.name} \u2022 Click to open Profile`;
          userPill.innerHTML = `
          <div class="user-nav-avatar">${student.avatar}</div>
          <div class="user-nav-name">${student.name}</div>
          <div class="user-nav-level">Lv.${student.level || 1} \u2022 ${student.xp || 0} XP</div>
        `;
        }
      } else {
        if (authButtons) authButtons.style.display = "flex";
        if (joinBtn) joinBtn.style.display = "inline-flex";
        if (userPill) userPill.style.display = "none";
      }
    }
    triggerViewTransition() {
      if (!this.container) return;
      this.container.classList.remove("view-animated-entry");
      void this.container.offsetWidth;
      this.container.classList.add("view-animated-entry");
    }
    setupGlobalEvents() {
      window.addEventListener("ha:navigate", (e) => {
        this.navigate(e.detail);
      });
      window.addEventListener("ha:open-topic", (e) => {
        this.currentRoute = "topics";
        this.updateActiveNavIndicators("topics");
        this.triggerViewTransition();
        renderCurriculumZone(this.container, (route) => this.navigate(route), e.detail);
        window.scrollTo(0, 0);
      });
      window.addEventListener("ha:launch-game", (e) => {
        this.currentRoute = "games";
        this.updateActiveNavIndicators("games");
        this.triggerViewTransition();
        renderGameCenter(this.container, (route) => this.navigate(route), e.detail);
        window.scrollTo(0, 0);
      });
      window.addEventListener("ha:open-activity", (e) => {
        this.currentRoute = "activities";
        this.updateActiveNavIndicators("activities");
        this.triggerViewTransition();
        const { topicId, activityType } = e.detail || {};
        renderActivitiesHub(this.container, (route) => this.navigate(route), topicId, activityType);
        window.scrollTo(0, 0);
      });
      window.addEventListener("ha:open-roleplay", (e) => {
        this.currentRoute = "roleplays";
        this.updateActiveNavIndicators("roleplays");
        this.triggerViewTransition();
        const roleplayId = e.detail;
        renderRoleplayRunner(this.container, (route) => this.navigate(route), roleplayId);
        window.scrollTo(0, 0);
      });
      stateManager.subscribe((event, payload) => {
        if (event === "LEVEL_UP") {
          this.showLevelUpModal(payload);
        } else if (event === "ACHIEVEMENT_UNLOCKED") {
          this.showAchievementModal(payload);
        } else if (event === "STUDENT_LOGGED_OUT") {
          this.updateNavbarUser();
          this.navigate("home");
        } else if (event === "STUDENT_LOGGED_IN" || event === "STUDENT_JOINED" || event === "STUDENT_SWITCHED") {
          this.updateNavbarUser();
        }
        this.updateNavbarUser();
      });
    }
    showLevelUpModal({ student, oldLevel, newLevel }) {
      this.celebrationMount.innerHTML = `
      <div class="ha-modal-backdrop" id="levelup-backdrop">
        <div class="ha-modal-dialog" style="text-align: center; border-top: 6px solid var(--ha-gold);">
          <span style="font-size: 4.5rem; display: inline-block; animation: flameWiggle 1.5s infinite;">\u{1F451}</span>
          <h2 style="font-size: 2.2rem; color: var(--ha-navy); margin: 10px 0;">LEVEL UP!</h2>
          <div class="badge badge-gold" style="font-size: 1.1rem; padding: 6px 18px; margin-bottom: 16px;">
            ${newLevel.icon} Level ${newLevel.level} \u2014 ${newLevel.title}
          </div>
          <p style="font-size: 1.05rem; color: var(--ha-text-muted); margin-bottom: 24px;">
            Congratulations, <strong>${student.name}</strong>! You leveled up to <strong>${newLevel.title}</strong>!
          </p>
          <button class="btn btn-primary btn-lg" id="close-levelup-btn">Continue Learning \u{1F680}</button>
        </div>
      </div>
    `;
      this.celebrationMount.querySelector("#close-levelup-btn")?.addEventListener("click", () => {
        this.celebrationMount.innerHTML = "";
      });
    }
    showAchievementModal({ student, achievement }) {
      this.celebrationMount.innerHTML = `
      <div class="ha-modal-backdrop" id="ach-unlocked-backdrop">
        <div class="ha-modal-dialog" style="text-align: center; border-top: 6px solid var(--ha-red);">
          <span style="font-size: 4.5rem;">\u{1F31F}</span>
          <h2 style="font-size: 2rem; color: var(--ha-navy); margin: 10px 0;">Badge Unlocked!</h2>
          <div style="font-size: 3rem; margin-bottom: 8px;">${achievement.icon}</div>
          <h3 style="font-size: 1.3rem; color: var(--ha-navy); margin-bottom: 6px;">${achievement.title}</h3>
          <p style="font-size: 0.95rem; color: var(--ha-text-muted); margin-bottom: 16px;">
            ${achievement.description}
          </p>
          <div class="badge badge-gold" style="margin-bottom: 20px;">
            +${achievement.xpReward} Bonus XP Added!
          </div>
          <div>
            <button class="btn btn-secondary" id="close-ach-btn">Awesome!</button>
          </div>
        </div>
      </div>
    `;
      this.celebrationMount.querySelector("#close-ach-btn")?.addEventListener("click", () => {
        this.celebrationMount.innerHTML = "";
      });
    }
    navigate(route) {
      this.currentRoute = route;
      this.updateActiveNavIndicators(route);
      this.triggerViewTransition();
      window.scrollTo(0, 0);
      const onNav = (target) => this.navigate(target);
      switch (route) {
        case "home":
          renderLanding(this.container, onNav);
          break;
        case "dashboard":
          renderDashboard(this.container, onNav);
          break;
        case "topics":
        case "curriculum":
        case "vocabulary":
        case "grammar":
        case "listening":
        case "speaking":
          renderCurriculumZone(this.container, onNav);
          break;
        case "roleplays":
        case "roleplay":
        case "presentations":
          renderRoleplaysHub(this.container, onNav);
          break;
        case "activities":
          renderActivitiesHub(this.container, onNav);
          break;
        case "full-test":
        case "test":
        case "exam":
          renderFullTest(this.container, onNav);
          break;
        case "games":
          renderGameCenter(this.container, onNav);
          break;
        case "leaderboard":
          renderLeaderboard(this.container, onNav);
          break;
        case "profile":
          renderProfile(this.container, onNav);
          break;
        case "admin":
          if (!stateManager.state.isAdmin) {
            apiClient.adminGetMe().then((isValid) => {
              if (isValid) {
                stateManager.setAdmin(true);
                renderAdmin(this.container, onNav);
              } else {
                this.navigate("home");
                window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: "teacher" }));
              }
            }).catch(() => {
              this.navigate("home");
              window.dispatchEvent(new CustomEvent("ha:open-join-modal", { detail: "teacher" }));
            });
            return;
          }
          renderAdmin(this.container, onNav);
          break;
        default:
          renderLanding(this.container, onNav);
      }
    }
    updateActiveNavIndicators(route) {
      const matchRoute = ["vocabulary", "grammar", "listening", "speaking", "curriculum"].includes(route) ? "topics" : ["roleplay", "presentations"].includes(route) ? "roleplays" : route;
      document.querySelectorAll(".nav-item").forEach((el) => {
        el.classList.toggle("active", el.dataset.route === matchRoute);
      });
      document.querySelectorAll(".mobile-nav-item").forEach((el) => {
        el.classList.toggle("active", el.dataset.route === matchRoute);
      });
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      const app = new App();
      app.init();
    });
  } else {
    const app = new App();
    app.init();
  }
})();
