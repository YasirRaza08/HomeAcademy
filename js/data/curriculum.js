// HOME ACADEMY - Official Class Curriculum
// Strictly the 6 topics taught in physical class:
// 1. Adjectives
// 2. Genitive 's
// 3. Question Words
// 4. Whose
// 5. Possessive Adjectives
// 6. What Color + Genitive 's

export const OFFICIAL_TOPICS = [
  {
    id: "adjectives",
    number: "01",
    title: "Adjectives",
    subtitle: "Describing words for size, age, quality, and condition",
    icon: "🎨",
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
          "📏 Size & Height: big, small, tall, short",
          "🎨 Colors & Appearance: red, blue, beautiful",
          "⏳ Age & Condition: old, young, new",
          "⭐ Quality & Speed: good, bad, fast, slow",
          "🌡️ Temperature: hot, cold, warm"
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
        imageContext: { topic: 'Adjectives', concept: 'big elephant', keywords: ['elephant', 'big'] }
      },
      {
        type: "mcq",
        question: "Choose the correct sentence:",
        options: ["He has a car red.", "He has a red car.", "He has red a car.", "He a red car has."],
        answer: 1,
        explanation: "In English, the adjective ('red') comes before the noun ('car').",
        imageContext: { topic: 'What Color', concept: 'red car', keywords: ['red', 'car'] }
      },
      {
        type: "fill",
        question: "The weather in summer is very _____ (hot / cold).",
        answer: "hot",
        options: ["hot", "cold", "slow", "tall"],
        explanation: "Summer is the hot season.",
        imageContext: { topic: 'Adjectives', concept: 'hot tea coffee cup', keywords: ['hot'] }
      },
      {
        type: "mcq",
        question: "A cheetah can run 100 km/h. A cheetah is ______.",
        options: ["slow", "old", "fast", "bad"],
        answer: 2,
        explanation: "Running at high speed means 'fast'.",
        imageContext: { topic: 'Adjectives', concept: 'fast red car', keywords: ['fast'] }
      }
    ],
    quizQuestions: [
      {
        question: "The giraffe has a _____ neck.",
        options: ["short", "tall", "slow", "cold"],
        answer: 1,
        explanation: "We use 'tall' (or long) for height.",
        imageContext: { topic: 'Adjectives', concept: 'tall giraffe', keywords: ['giraffe', 'tall'] }
      },
      {
        question: "What is the opposite of 'slow'?",
        options: ["bad", "old", "fast", "hot"],
        answer: 2,
        explanation: "'Fast' is the opposite of 'slow'.",
        imageContext: { topic: 'Adjectives', concept: 'slow turtle', keywords: ['turtle', 'slow'] }
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
        imageContext: { topic: 'Adjectives', concept: 'cold winter snow', keywords: ['cold'] }
      },
      {
        question: "Identify the adjective in: 'Sara read a good book.'",
        options: ["Sara", "read", "good", "book"],
        answer: 2,
        explanation: "'Good' is the adjective describing the noun 'book'.",
        imageContext: { topic: 'Possessive Adjectives', concept: 'boy reading his book', keywords: ['book'] }
      }
    ]
  },
  {
    id: "genitive_s",
    number: "02",
    title: "Genitive 's (Possession)",
    subtitle: "Showing ownership and relationships with 's",
    icon: "🏷️",
    color: "#dc2626",
    active: true,
    summary: "The Genitive 's (also called possessive 's) shows that something belongs to a person or animal. Rule: Add 's to a singular noun (e.g. Tom's bag, Sara's book, Ali's car).",
    explanationGuide: {
      kyun: {
        title: "Kyun Istemal Hota Hai? (Why do we use it?)",
        urdu: "Milkiyat (ownership) ya rishta (relationship) dikhane ke liye ke koi cheez kis ki hai ya koi shakhs kis ka rishtedaar hai.",
        english: "To show ownership, possession, or relationships—telling everyone who an object belongs to or how people are related."
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
          "🎒 Personal Belongings: Tom's bag, Ali's car, John's phone",
          "👨‍👩‍👧 Family Relationships: Sara's brother, my mother's friend",
          "🏫 Classroom objects: The teacher's desk, Ali's notebook",
          "💡 Special Rule: Singular name takes 's (Ali's). Regular plural takes only apostrophe (the boys' room)."
        ]
      },
      audioNarration: "Topic 2: Genitive S. Why do we use it? We use the Genitive S to show ownership and possession—to show who something belongs to. How do we use it? Add an apostrophe and the letter S to the person's name, followed by the item, like 'Tom's bag' or 'Sara's book'. What for? Use it to talk about people's personal belongings and family relationships."
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
        imageContext: { topic: 'Possessive Adjectives', concept: 'boy reading his book', keywords: ['book'] }
      },
      {
        type: "mcq",
        question: "The car belongs to Ali. It is ________.",
        options: ["Ali car", "Alis' car", "Ali's car", "Car of Ali's"],
        answer: 2,
        explanation: "Ali + 's = Ali's car.",
        imageContext: { topic: 'What Color', concept: 'red car', keywords: ['car'] }
      },
      {
        type: "fill",
        question: "That is Tom_____ backpack (add 's or s').",
        answer: "'s",
        options: ["'s", "s'", "s", "is"],
        explanation: "Tom's backpack.",
        imageContext: { topic: 'Whose', concept: 'backpack school bag possession', keywords: ['backpack', 'bag'] }
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
        imageContext: { topic: 'Possessive Adjectives', concept: 'girl holding her cat pet', keywords: ['cat'] }
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
        imageContext: { topic: 'What Color', concept: 'blue bicycle', keywords: ['bicycle'] }
      },
      {
        question: "'Ali's car is fast.' What does 'Ali's' show?",
        options: ["Ali is a car", "The car belongs to Ali", "There are many Alis", "Ali is driving fast"],
        answer: 1,
        explanation: "Genitive 's shows possession/ownership.",
        imageContext: { topic: 'What Color', concept: 'red car', keywords: ['car'] }
      }
    ]
  },
  {
    id: "question_words",
    number: "03",
    title: "Question Words (Wh- Questions)",
    subtitle: "What, Who, Where, When, Why, How",
    icon: "❓",
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
          "❓ What: Cheez ya kaam janne ke liye (What is your name? What is this?)",
          "👤 Who: Shakhs ya insan janne ke liye (Who is your teacher? Who is that?)",
          "📍 Where: Jagah ya location janne ke liye (Where is Home Academy?)",
          "⏰ When: Waqt ya date janne ke liye (When does class start?)",
          "💡 Why: Wajah / Reason janne ke liye (Why are you happy? - Because...)",
          "🛠️ How: Tareeqa ya haal-chaal janne ke liye (How are you? How do you travel?)"
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
    icon: "🎒",
    color: "#d97706",
    active: true,
    summary: "Use 'Whose' to ask who owns an item. Pattern: 'Whose + noun + is this / are these?' Response: 'It is + Name's + noun' or 'It is + Possessive Pronoun'.",
    explanationGuide: {
      kyun: {
        title: "Kyun Istemal Hota Hai? (Why do we use it?)",
        urdu: "Kisi cheez ke maalik (owner) ke bare mein sawal karne ke liye ke 'Ye kis ka hai?' / 'Ye cheez kis ki hai?'.",
        english: "To inquire about ownership—asking specifically who owns an object."
      },
      kaise: {
        title: "Kaise Istemal Hota Hai? (How is it formed?)",
        urdu: "Sawal mein 'Whose + Noun + is this/are these?' lagate hain. Jawab mein 'It is + Name's + Noun' (Genitive 's) istemal hota hai.",
        english: "Question pattern: [Whose + Noun + is this / are these?]. Answer pattern: [It is + Name's + Noun] or [They are + Name's + Nouns].",
        formula: "Q: Whose + [Item] + is this? ➔ A: It is [Name]'s [Item]."
      },
      kisLiye: {
        title: "Kis Liye Istemal Hota Hai? (When & What for?)",
        urdu: "Classroom ya ghar mein koi gumshuda ya rakhi hui cheez (pen, bag, phone, kitaab) ka maalik janne ke liye.",
        english: "Use it whenever an object is found, shared, or questioned to locate its rightful owner.",
        points: [
          "🎒 Single cheez: Whose bag is this? ➔ It is Tom's bag.",
          "🚗 Door ki cheez: Whose car is that? ➔ It is Ali's car.",
          "📚 Plural cheezein: Whose books are these? ➔ They are Sara's books.",
          "💡 Difference: 'Whose' (kis ka) vs 'Who's' (Who is = kaun hai)."
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
        imageContext: { topic: 'Whose', concept: 'backpack school bag possession', keywords: ['bag', 'backpack'] }
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
        imageContext: { topic: 'Whose', concept: 'wrist watch on table', keywords: ['watch'] }
      }
    ]
  },
  {
    id: "possessive_adjectives",
    number: "05",
    title: "Possessive Adjectives",
    subtitle: "my, your, his, her, its, our, their",
    icon: "🤝",
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
          "👤 I ➔ my (my pencil, my teacher)",
          "👥 You ➔ your (your name, your book)",
          "👨 He (Larka) ➔ his (his bike, his brother)",
          "👩 She (Larki) ➔ her (her cat, her jacket)",
          "🐱 It (Cheez/Janwar) ➔ its (its tail, its color - no apostrophe!)",
          "👫 We ➔ our (our class, our academy)",
          "👨‍👩‍👦 They ➔ their (their house, their project)"
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
        imageContext: { topic: 'Possessive Adjectives', concept: 'girl holding her cat pet', keywords: ['cat'] }
      }
    ],
    quizQuestions: [
      {
        question: "John is washing ______ car right now.",
        options: ["her", "his", "their", "its"],
        answer: 1,
        explanation: "John is male, so we use 'his'.",
        imageContext: { topic: 'What Color', concept: 'red car', keywords: ['car'] }
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
        imageContext: { topic: 'Possessive Adjectives', concept: 'boy reading his book', keywords: ['book'] }
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
    icon: "🌈",
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
        formula: "What color is [Name]'s [Item]? ➔ It is [Color]."
      },
      kisLiye: {
        title: "Kis Liye Istemal Hota Hai? (When & What for?)",
        urdu: "Classroom objects, kapray, gariyan aur Home Academy ke official colors (navy blue, red, golden yellow) bayan karne ke liye.",
        english: "Use it to describe clothes, cars, classroom stationery, and academy items by their colors:",
        points: [
          "🚗 Singular item: What color is Tom's car? ➔ It is red.",
          "👟 Plural items: What color are Ali's shoes? ➔ They are black.",
          "📒 Possessive: What color is your notebook? ➔ My notebook is yellow.",
          "🏫 Home Academy logo: It is navy blue, red, and golden yellow!"
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
        imageContext: { topic: 'What Color', concept: 'red car', keywords: ['car'] }
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
        imageContext: { topic: 'What Color', concept: 'blue bicycle', keywords: ['bicycle', 'bike'] }
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
    title: "Could — Polite Requests",
    subtitle: "Asking politely with 'Could you...?'",
    icon: "🤝",
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
          "🚪 Actions: Could you please open the door? / Could you close the window?",
          "📱 Passing Objects: Could you pass the phone, please? / Could you give me a pen?",
          "🤝 Asking for Help: Could you please help me with this?",
          "💧 Everyday Favors: Could you bring me some water? / Could you turn on the light?",
          "🗣️ Classroom Communication: Could you please repeat that? / Could you speak slowly?",
          "⚠️ REMEMBER: Always use base verb! Say 'Could you open', NOT 'Could you opening' or 'Could you opened'."
        ]
      },
      audioNarration: "Topic 7: Could — Polite Requests. Why do we use it? We use 'Could you' when we want to politely ask someone to do something. How is it formed? Use 'Could you' followed by the base verb: Could you please open the door? Remember: always use the base form of the verb, like 'open', 'help', or 'pass'. Never use past tense or ing."
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
          "True — 'Please' at the end is very natural and polite",
          "False — 'Please' is never allowed at the end"
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
    title: "How Much — Singular and Plural",
    subtitle: "Asking about price for one and multiple items",
    icon: "🏷️",
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
        formula: "ONE ITEM: How much is + singular item?  •  MULTIPLE ITEMS: How much are + plural items?"
      },
      kisLiye: {
        title: "Kis Liye Istemal Hota Hai? (When & What for?)",
        urdu: "Rozmarrah khareedari (shopping) mein kapre, joote, phone, kitaabein aur deegar cheezon ki qeemat poochne ke liye.",
        english: "Use it whenever you go shopping or ask anyone how much something costs.",
        points: [
          "🛍️ ONE ITEM (Singular): How much is this phone? / How much is that bag?",
          "👟 MULTIPLE ITEMS (Plural): How much are these shoes? / How much are those books?",
          "💡 Pronouns for Singular: How much is this? / How much is that? / How much is it?",
          "💡 Pronouns for Plural: How much are these? / How much are those? / How much are they?",
          "⚠️ CORE RULE: IS = 1 item (phone, bag, shirt) • ARE = 2+ items (shoes, books, glasses)."
        ]
      },
      audioNarration: "Topic 8: How Much — Singular and Plural. Why do we use it? We use 'How much' to ask the price of something. How is it formed? For one item, use 'How much is': How much is this phone? How much is that bag? For multiple items, use 'How much are': How much are these shoes? How much are those books? Remember: use 'is' for one item and 'are' for more than one."
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
        question: "'How much is the pen?' — Why do we use 'is' here?",
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

// Helper to get only active topics
export function getActiveTopics(topics = OFFICIAL_TOPICS) {
  return topics.filter(t => t.active !== false);
}

// Helper to get a topic by id
export function getTopicById(id, topics = OFFICIAL_TOPICS) {
  return topics.find(t => t.id === id) || null;
}

// Helper to generate a daily practice drill (6 questions, 1 from each active topic)
export function generateDailyDrill(topics = OFFICIAL_TOPICS) {
  const active = getActiveTopics(topics);
  const questions = [];

  active.forEach(topic => {
    if (topic.practiceQuestions && topic.practiceQuestions.length > 0) {
      // Pick a random or first practice question
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
