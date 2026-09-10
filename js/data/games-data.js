// Home Academy Dedicated Game Datasets
// Strictly aligned with the 6 official curriculum topics:
// 1. Adjectives (big, small, tall, short, beautiful, old, young, new, good, bad, fast, slow, hot, cold)
// 2. Genitive 's (Tom's bag, Sara's book, Ali's car, John's phone)
// 3. Question Words (What, Who, Where, When, Why, How)
// 4. Whose (Whose bag is this? It is Tom's bag)
// 5. Possessive Adjectives (my, your, his, her, its, our, their)
// 6. What Color + Genitive 's (What color is Tom's car? The car is red / Tom's car is red)

export const SCRAMBLE_WORDS = [
  { word: 'BEAUTIFUL', hint: 'Pleasing to look at; opposite of ugly', category: 'Adjectives', icon: '🌸' },
  { word: 'WHOSE', hint: 'Question word asking about ownership', category: 'Whose', icon: '🎒' },
  { word: 'GENITIVE', hint: 'The grammar form using apostrophe s to show possession', category: "Genitive 's", icon: '🏷️' },
  { word: 'POSSESSIVE', hint: 'Adjectives like my, your, his, her, our, their', category: 'Possessives', icon: '🤝' },
  { word: 'YELLOW', hint: 'One of the Home Academy brand colors', category: 'Colors', icon: '🟡' },
  { word: 'QUESTION', hint: 'Sentence starting with What, Who, Where, When, Why, How', category: 'Questions', icon: '❓' },
  { word: 'FAST', hint: 'Opposite of slow; high speed', category: 'Adjectives', icon: '🏎️' },
  { word: 'YOUNG', hint: 'Opposite of old; early in life', category: 'Adjectives', icon: '🧒' },
  { word: 'SMALL', hint: 'Opposite of big; little in size', category: 'Adjectives', icon: '🐭' },
  { word: 'COLD', hint: 'Opposite of hot; low temperature', category: 'Adjectives', icon: '❄️' },
  { word: 'WHERE', hint: 'Question word asking about place or location', category: 'Questions', icon: '📍' },
  { word: 'THEIR', hint: 'Belonging to them (possessive adjective)', category: 'Possessives', icon: '👥' },
  { word: 'COULD', hint: 'Polite modal verb for respectful requests', category: 'Could Requests', icon: '🤝' },
  { word: 'POLITE', hint: 'Showing respectful and courteous behavior', category: 'Could Requests', icon: '🙏' },
  { word: 'PRICE', hint: 'The cost of an item asked with How Much', category: 'How Much', icon: '🏷️' },
  { word: 'PLURAL', hint: 'More than one item (uses How much are)', category: 'How Much', icon: '👟' }
];

export const MATCH_PAIRS = [
  { word: 'BIG', emoji: '🐘', label: 'Opposite of Small' },
  { word: 'SMALL', emoji: '🐭', label: 'Opposite of Big' },
  { word: 'HOT', emoji: '🔥', label: 'Opposite of Cold' },
  { word: 'COLD', emoji: '❄️', label: 'Opposite of Hot' },
  { word: 'FAST', emoji: '🏎️', label: 'Opposite of Slow' },
  { word: 'SLOW', emoji: '🐢', label: 'Opposite of Fast' },
  { word: 'TALL', emoji: '🦒', label: 'Opposite of Short' },
  { word: 'SHORT', emoji: '🪑', label: 'Opposite of Tall' }
];

export const SENTENCE_BUILDER_DATA = [
  {
    id: 'sb1',
    tokens: ['Whose', 'bag', 'is', 'this?'],
    scrambled: ['is', 'bag', 'Whose', 'this?'],
    translation: 'Asking about ownership',
    hint: 'Starts with "Whose" and ends with "this?"'
  },
  {
    id: 'sb2',
    tokens: ['It', 'is', "Tom's", 'bag.'],
    scrambled: ["Tom's", 'bag.', 'It', 'is'],
    translation: 'Answering with Genitive \'s',
    hint: 'Starts with "It"'
  },
  {
    id: 'sb3',
    tokens: ['What', 'color', 'is', "Tom's", 'car?'],
    scrambled: ["Tom's", 'What', 'is', 'color', 'car?'],
    translation: 'Asking color of possession',
    hint: 'Starts with "What color"'
  },
  {
    id: 'sb4',
    tokens: ["Tom's", 'car', 'is', 'red.'],
    scrambled: ['is', 'red.', 'car', "Tom's"],
    translation: 'Answering color with Genitive \'s',
    hint: 'Starts with "Tom\'s"'
  },
  {
    id: 'sb5',
    tokens: ['This', 'is', 'my', 'new', 'book.'],
    scrambled: ['new', 'is', 'book.', 'This', 'my'],
    translation: 'Possessive adjective + Adjective',
    hint: 'Starts with "This"'
  },
  {
    id: 'sb6',
    tokens: ['Where', 'is', "Sara's", 'notebook?'],
    scrambled: ['notebook?', 'is', 'Where', "Sara's"],
    translation: 'Wh- question + Genitive \'s',
    hint: 'Starts with "Where"'
  },
  {
    id: 'sb7',
    tokens: ['She', 'cleaned', 'her', 'beautiful', 'room.'],
    scrambled: ['beautiful', 'her', 'She', 'room.', 'cleaned'],
    translation: 'Possessive "her" + Adjective',
    hint: 'Starts with "She"'
  },
  {
    id: 'sb8',
    tokens: ['We', 'love', 'our', 'English', 'class.'],
    scrambled: ['English', 'our', 'class.', 'We', 'love'],
    translation: 'Possessive "our" with class',
    hint: 'Starts with "We"'
  },
  {
    id: 'sb9',
    tokens: ['Could', 'you', 'please', 'open', 'the', 'door?'],
    scrambled: ['door?', 'open', 'Could', 'the', 'you', 'please'],
    translation: 'Polite request with Could you',
    hint: 'Starts with "Could you please"'
  },
  {
    id: 'sb10',
    tokens: ['Could', 'you', 'pass', 'the', 'phone,', 'please?'],
    scrambled: ['phone,', 'Could', 'the', 'pass', 'please?', 'you'],
    translation: 'Polite request with please at the end',
    hint: 'Starts with "Could you pass"'
  },
  {
    id: 'sb11',
    tokens: ['How', 'much', 'is', 'this', 'phone?'],
    scrambled: ['phone?', 'is', 'How', 'this', 'much'],
    translation: 'Singular price question (1 item)',
    hint: 'Starts with "How much is"'
  },
  {
    id: 'sb12',
    tokens: ['How', 'much', 'are', 'these', 'shoes?'],
    scrambled: ['shoes?', 'are', 'How', 'these', 'much'],
    translation: 'Plural price question (2+ items)',
    hint: 'Starts with "How much are"'
  }
];

export const TRUE_FALSE_DATA = [
  {
    statement: '"Small" is the opposite of "big".',
    isTrue: true,
    explanation: 'Big and small are direct antonyms.'
  },
  {
    statement: 'In English, we say "a car red" instead of "a red car".',
    isTrue: false,
    explanation: 'Adjectives go BEFORE the noun in English: "a red car".'
  },
  {
    statement: '"Tom\'s bag" means the bag belongs to Tom.',
    isTrue: true,
    explanation: 'The Genitive \'s shows ownership.'
  },
  {
    statement: '"Who" is used to ask about places and locations.',
    isTrue: false,
    explanation: '"Where" asks about places. "Who" asks about people!'
  },
  {
    statement: '"Whose" asks who owns an object.',
    isTrue: true,
    explanation: 'Example: "Whose book is this? - It is Sara\'s book."'
  },
  {
    statement: '"Their" is the possessive adjective for "They".',
    isTrue: true,
    explanation: 'They -> their (e.g. "their house").'
  },
  {
    statement: '"Its" (possessive) has an apostrophe like "it\'s".',
    isTrue: false,
    explanation: '"Its" has no apostrophe! "It\'s" means "it is".'
  },
  {
    statement: 'To ask the color of Ali\'s car, we say: "What color is Ali\'s car?"',
    isTrue: true,
    explanation: 'Correct sentence combining What color + Genitive \'s!'
  },
  {
    statement: 'After "Could you", we always use the base verb (e.g. open, help, pass).',
    isTrue: true,
    explanation: 'Correct! Always use the base verb form with could (never -ing or past).'
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

export const LISTENING_DRILLS = [
  {
    id: 'l1',
    sentence: "Whose bag is this? It is Tom's bag.",
    question: "Whose bag is on the desk?",
    options: ["Tom's bag", "Sara's bag", "Ali's bag", "John's bag"],
    correctAnswer: "Tom's bag",
    transcript: "Whose bag is this? It is Tom's bag."
  },
  {
    id: 'l2',
    sentence: "What color is Tom's car? Tom's car is red.",
    question: "What color is the car?",
    options: ['Red', 'Blue', 'Yellow', 'Black'],
    correctAnswer: 'Red',
    transcript: "What color is Tom's car? Tom's car is red."
  },
  {
    id: 'l3',
    sentence: "Ali has a big and fast bicycle.",
    question: "Which two adjectives describe Ali's bicycle?",
    options: ['Big and fast', 'Small and slow', 'Old and cold', 'Short and bad'],
    correctAnswer: 'Big and fast',
    transcript: "Ali has a big and fast bicycle."
  },
  {
    id: 'l4',
    sentence: "Where is Sara's book? It is in her backpack.",
    question: "Whose book is in the backpack?",
    options: ["Sara's book", "Tom's book", "Teacher's book", "John's book"],
    correctAnswer: "Sara's book",
    transcript: "Where is Sara's book? It is in her backpack."
  },
  {
    id: 'l5',
    sentence: "We love our English program at Home Academy.",
    question: "Which possessive adjective is used with 'We'?",
    options: ['Our', 'Their', 'His', 'Her'],
    correctAnswer: 'Our',
    transcript: "We love our English program at Home Academy."
  },
  {
    id: 'l6',
    sentence: "Could you please open the door for me? It is hot outside.",
    question: "What did the person politely ask to open?",
    options: ["The door", "The window", "The box", "The book"],
    correctAnswer: "The door",
    transcript: "Could you please open the door for me? It is hot outside."
  },
  {
    id: 'l7',
    sentence: "Could you pass the phone, please? My teacher is calling.",
    question: "What object did the speaker ask to pass?",
    options: ["The phone", "The pen", "The key", "The notebook"],
    correctAnswer: "The phone",
    transcript: "Could you pass the phone, please? My teacher is calling."
  },
  {
    id: 'l8',
    sentence: "Excuse me, how much is this black jacket? It is forty dollars.",
    question: "How much is the black jacket?",
    options: ["Forty dollars", "Fifty dollars", "Four dollars", "Free"],
    correctAnswer: "Forty dollars",
    transcript: "Excuse me, how much is this black jacket? It is forty dollars."
  },
  {
    id: 'l9',
    sentence: "How much are these new shoes? They are seventy dollars.",
    question: "Why does the speaker say 'How much are'?",
    options: ["Because shoes is plural", "Because shoes is singular", "Because it is past tense", "Because shoes is cheap"],
    correctAnswer: "Because shoes is plural",
    transcript: "How much are these new shoes? They are seventy dollars."
  }
];

export const SPEAKING_DRILLS = [
  {
    id: 's1',
    prompt: "This is Tom's bag.",
    target: "This is Tom's bag",
    hint: "Pronounce the Genitive 's clearly: Tom's bag.",
    difficulty: 'Very Easy'
  },
  {
    id: 's2',
    prompt: "Whose pen is this?",
    target: "Whose pen is this",
    hint: "Pronounce 'Whose' with a /z/ sound.",
    difficulty: 'Very Easy'
  },
  {
    id: 's3',
    prompt: "What color is the car?",
    target: "What color is the car",
    hint: "Smoothly connect 'is the car'.",
    difficulty: 'Easy'
  },
  {
    id: 's4',
    prompt: "The elephant is big and the mouse is small.",
    target: "The elephant is big and the mouse is small",
    hint: "Emphasize contrasting adjectives 'big' and 'small'.",
    difficulty: 'Easy'
  },
  {
    id: 's5',
    prompt: "She is washing her red car.",
    target: "She is washing her red car",
    hint: "Combine possessive 'her' and color adjective 'red'.",
    difficulty: 'Easy'
  },
  {
    id: 's6',
    prompt: "Where is the English classroom?",
    target: "Where is the English classroom",
    hint: "Question word 'Where' asks about location.",
    difficulty: 'Easy'
  },
  {
    id: 's7',
    prompt: "Our Home Academy English class is great.",
    target: "Our Home Academy English class is great",
    hint: "Say our official Academy title proudly.",
    difficulty: 'Medium'
  },
  {
    id: 's8',
    prompt: "Could you please open the door?",
    target: "Could you please open the door",
    hint: "Polite request with base verb 'open'.",
    difficulty: 'Easy'
  },
  {
    id: 's9',
    prompt: "How much is this phone?",
    target: "How much is this phone",
    hint: "Singular price question with 'is'.",
    difficulty: 'Easy'
  },
  {
    id: 's10',
    prompt: "How much are these shoes?",
    target: "How much are these shoes",
    hint: "Plural price question with 'are'.",
    difficulty: 'Easy'
  }
];