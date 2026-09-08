// Home Academy 12 Beginner Grammar Lessons (A1 Level)

export const GRAMMAR_LESSONS = [
  {
    id: 'pronouns_basic',
    title: 'I / You / He / She / It',
    category: 'Pronouns',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Meet the Subject Pronouns!',
      explanation: 'We use pronouns to replace names of people and things so we do not repeat them.',
      rules: [
        { label: 'I', desc: 'Use when speaking about yourself (I am Ali).' },
        { label: 'You', desc: 'Use when speaking to one or more friends (You are kind).' },
        { label: 'He', desc: 'Use for a boy or man (He is my brother).' },
        { label: 'She', desc: 'Use for a girl or woman (She is my teacher).' },
        { label: 'It', desc: 'Use for a thing or animal (It is a book).' }
      ]
    },
    examples: [
      { text: 'I am a student at Home Academy.', highlight: 'I' },
      { text: 'He is my best friend.', highlight: 'He' },
      { text: 'She reads an English book.', highlight: 'She' },
      { text: 'It is a sunny day today.', highlight: 'It' }
    ],
    miniGame: {
      instruction: 'Fill in the blank with the correct pronoun:',
      sentenceBefore: 'Fatima is smart.',
      sentenceAfter: 'is a student.',
      options: ['She', 'He', 'It'],
      correctAnswer: 'She'
    },
    quiz: [
      {
        question: 'Which pronoun replaces "Hamza"?',
        options: ['He', 'She', 'It', 'They'],
        correctAnswer: 'He'
      },
      {
        question: 'Which pronoun replaces "a pencil"?',
        options: ['It', 'He', 'She', 'I'],
        correctAnswer: 'It'
      },
      {
        question: 'Complete: "______ am learning English."',
        options: ['I', 'He', 'She', 'It'],
        correctAnswer: 'I'
      }
    ]
  },
  {
    id: 'to_be',
    title: 'am / is / are',
    category: 'Verbs (To Be)',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'The Magic of "To Be"',
      explanation: 'The verb "be" changes depending on who we talk about.',
      rules: [
        { label: 'am', desc: 'Always with "I" → I am' },
        { label: 'is', desc: 'With singular subjects (He, She, It) → He is, She is, It is' },
        { label: 'are', desc: 'With plural subjects (You, We, They) → You are, We are, They are' }
      ]
    },
    examples: [
      { text: 'I am happy today.', highlight: 'am' },
      { text: 'Ali is in the classroom.', highlight: 'is' },
      { text: 'We are learning English together.', highlight: 'are' }
    ],
    miniGame: {
      instruction: 'Select the right form of "be":',
      sentenceBefore: 'My brother',
      sentenceAfter: 'tall.',
      options: ['is', 'are', 'am'],
      correctAnswer: 'is'
    },
    quiz: [
      {
        question: 'I ______ a student at Home Academy.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'am'
      },
      {
        question: 'She ______ very friendly.',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 'is'
      },
      {
        question: 'You and I ______ classmates.',
        options: ['are', 'is', 'am', 'be'],
        correctAnswer: 'are'
      }
    ]
  },
  {
    id: 'this_that',
    title: 'this / that',
    category: 'Demonstratives',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Pointing Out Things Near & Far',
      explanation: 'Use "this" and "that" when talking about one object.',
      rules: [
        { label: 'This', desc: 'For ONE object close to your hand (This is my book).' },
        { label: 'That', desc: 'For ONE object far away from you (That is a star).' }
      ]
    },
    examples: [
      { text: 'This is my pencil in my hand.', highlight: 'This' },
      { text: 'That is an airplane in the sky.', highlight: 'That' },
      { text: 'This is our classroom desk.', highlight: 'This' }
    ],
    miniGame: {
      instruction: 'Choose "This" or "That":',
      sentenceBefore: '',
      sentenceAfter: 'is the book I am holding.',
      options: ['This', 'That'],
      correctAnswer: 'This'
    },
    quiz: [
      {
        question: 'Look up at the distant cloud! "______ is a white cloud."',
        options: ['That', 'This', 'These', 'Those'],
        correctAnswer: 'That'
      },
      {
        question: 'Holding your phone: "______ is my phone."',
        options: ['This', 'That', 'Those', 'Are'],
        correctAnswer: 'This'
      },
      {
        question: 'Use "this" for something that is:',
        options: ['Near to you', 'Very far away', 'In another country', 'Invisible'],
        correctAnswer: 'Near to you'
      }
    ]
  },
  {
    id: 'these_those',
    title: 'these / those',
    category: 'Demonstratives (Plural)',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Pointing Out Multiple Things',
      explanation: 'Use "these" and "those" when talking about two or more objects.',
      rules: [
        { label: 'These', desc: 'For MULTIPLE objects near you (These are my keys).' },
        { label: 'Those', desc: 'For MULTIPLE objects far away (Those are birds in the sky).' }
      ]
    },
    examples: [
      { text: 'These are delicious apples here.', highlight: 'These' },
      { text: 'Those are mountains in the distance.', highlight: 'Those' },
      { text: 'These are my color pencils.', highlight: 'These' }
    ],
    miniGame: {
      instruction: 'Select These or Those:',
      sentenceBefore: 'Look at',
      sentenceAfter: 'birds far away in the tree.',
      options: ['those', 'these'],
      correctAnswer: 'those'
    },
    quiz: [
      {
        question: 'Holding three pens: "______ are my pens."',
        options: ['These', 'Those', 'This', 'That'],
        correctAnswer: 'These'
      },
      {
        question: '"Look across the street! ______ cars are fast."',
        options: ['Those', 'These', 'This', 'That'],
        correctAnswer: 'Those'
      },
      {
        question: 'Are "these" and "those" used with singular or plural nouns?',
        options: ['Plural (more than one)', 'Singular (only one)', 'Only verbs', 'Neither'],
        correctAnswer: 'Plural (more than one)'
      }
    ]
  },
  {
    id: 'have_has',
    title: 'have / has',
    category: 'Possession',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Showing What Belongs to You',
      explanation: 'We use "have" and "has" to show ownership or possession.',
      rules: [
        { label: 'have', desc: 'With I, You, We, They → I have a book.' },
        { label: 'has', desc: 'With He, She, It (singular) → She has a cat.' }
      ]
    },
    examples: [
      { text: 'I have a new school bag.', highlight: 'have' },
      { text: 'He has a red bicycle.', highlight: 'has' },
      { text: 'We have English class today.', highlight: 'have' }
    ],
    miniGame: {
      instruction: 'Choose have or has:',
      sentenceBefore: 'She',
      sentenceAfter: 'two brothers.',
      options: ['has', 'have'],
      correctAnswer: 'has'
    },
    quiz: [
      {
        question: 'I ______ two pencils in my pencil case.',
        options: ['have', 'has', 'having', 'is'],
        correctAnswer: 'have'
      },
      {
        question: 'Ali ______ an orange football.',
        options: ['has', 'have', 'are', 'am'],
        correctAnswer: 'has'
      },
      {
        question: 'They ______ a beautiful home.',
        options: ['have', 'has', 'is', 'be'],
        correctAnswer: 'have'
      }
    ]
  },
  {
    id: 'a_an',
    title: 'a / an',
    category: 'Articles',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Using "a" vs "an"',
      explanation: 'Use "a" and "an" with singular countable nouns.',
      rules: [
        { label: 'a', desc: 'Before consonant sounds (b, c, d, f, g...) → a book, a cat, a desk' },
        { label: 'an', desc: 'Before vowel sounds (a, e, i, o, u) → an apple, an elephant, an orange' }
      ]
    },
    examples: [
      { text: 'I eat an apple every day.', highlight: 'an' },
      { text: 'This is a red pencil.', highlight: 'a' },
      { text: 'He sees an umbrella.', highlight: 'an' }
    ],
    miniGame: {
      instruction: 'Pick a or an:',
      sentenceBefore: 'I see',
      sentenceAfter: 'egg in the kitchen.',
      options: ['an', 'a'],
      correctAnswer: 'an'
    },
    quiz: [
      {
        question: 'Ali wants to read ______ book.',
        options: ['a', 'an', 'the two', 'many'],
        correctAnswer: 'a'
      },
      {
        question: 'She is eating ______ orange.',
        options: ['an', 'a', 'one a', 'the are'],
        correctAnswer: 'an'
      },
      {
        question: 'Why do we use "an" before "apple"?',
        options: ['Because it starts with a vowel sound (A)', 'Because apples are red', 'Because it is plural', 'Random choice'],
        correctAnswer: 'Because it starts with a vowel sound (A)'
      }
    ]
  },
  {
    id: 'singular_plural',
    title: 'singular / plural',
    category: 'Nouns',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'One vs Many (Adding -s)',
      explanation: 'Singular means ONE. Plural means MORE THAN ONE.',
      rules: [
        { label: 'Singular', desc: 'one book, one cat, one dog' },
        { label: 'Plural', desc: 'two books, three cats, four dogs (add -s)' }
      ]
    },
    examples: [
      { text: 'One book is on the desk.', highlight: 'book' },
      { text: 'Three books are in my bag.', highlight: 'books' },
      { text: 'Five students learn English.', highlight: 'students' }
    ],
    miniGame: {
      instruction: 'Select the plural form:',
      sentenceBefore: 'There are two',
      sentenceAfter: 'under the table.',
      options: ['cats', 'cat'],
      correctAnswer: 'cats'
    },
    quiz: [
      {
        question: 'What is the plural of "apple"?',
        options: ['Apples', 'Appless', 'Appleies', 'Applen'],
        correctAnswer: 'Apples'
      },
      {
        question: 'I have one dog, but Ali has three ______.',
        options: ['Dogs', 'Dog', 'Doges', 'Dogging'],
        correctAnswer: 'Dogs'
      },
      {
        question: 'Which word is singular?',
        options: ['Pencil', 'Pencils', 'Cars', 'Books'],
        correctAnswer: 'Pencil'
      }
    ]
  },
  {
    id: 'basic_questions',
    title: 'basic questions',
    category: 'Question Forms',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Asking Questions (What / Where / Who)',
      explanation: 'Question words help you learn new things about the world.',
      rules: [
        { label: 'What', desc: 'Ask about things → What is your name?' },
        { label: 'Where', desc: 'Ask about places → Where do you live?' },
        { label: 'Who', desc: 'Ask about people → Who is your teacher?' }
      ]
    },
    examples: [
      { text: 'What is your name? - My name is Ali.', highlight: 'What' },
      { text: 'Where is your school? - Home Academy is near.', highlight: 'Where' },
      { text: 'Who is that girl? - She is my sister.', highlight: 'Who' }
    ],
    miniGame: {
      instruction: 'Complete the question:',
      sentenceBefore: '',
      sentenceAfter: 'is your name?',
      options: ['What', 'Where', 'When'],
      correctAnswer: 'What'
    },
    quiz: [
      {
        question: '"______ do you live?" — "I live in Lahore."',
        options: ['Where', 'What', 'Who', 'How'],
        correctAnswer: 'Where'
      },
      {
        question: '"______ is that man?" — "He is my father."',
        options: ['Who', 'What', 'Where', 'Which'],
        correctAnswer: 'Who'
      },
      {
        question: '"______ is this?" — "This is a book."',
        options: ['What', 'Who', 'Where', 'Why'],
        correctAnswer: 'What'
      }
    ]
  },
  {
    id: 'basic_negatives',
    title: 'basic negatives',
    category: 'Negation',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Saying "No" with NOT',
      explanation: 'Put "not" after am, is, or are to make negative sentences.',
      rules: [
        { label: 'am not', desc: 'I am not sad → I am not' },
        { label: 'is not (isn’t)', desc: 'He is not tired → is not' },
        { label: 'are not (aren’t)', desc: 'We are not late → are not' }
      ]
    },
    examples: [
      { text: 'I am not angry.', highlight: 'not' },
      { text: 'This is not my book.', highlight: 'not' },
      { text: 'They are not at home.', highlight: 'not' }
    ],
    miniGame: {
      instruction: 'Make it negative:',
      sentenceBefore: 'She is',
      sentenceAfter: 'a doctor. She is a teacher.',
      options: ['not', 'no', 'never'],
      correctAnswer: 'not'
    },
    quiz: [
      {
        question: 'Choose the correct negative: "He ______ tired."',
        options: ['is not', 'not is', 'am not', 'are no'],
        correctAnswer: 'is not'
      },
      {
        question: 'Complete: "I ______ late today."',
        options: ['am not', 'is not', 'are not', 'not am'],
        correctAnswer: 'am not'
      },
      {
        question: 'True or False: "not" is placed after the verb "to be"?',
        options: ['True (e.g. is not)', 'False (e.g. not is)', 'Only on Fridays', 'Never'],
        correctAnswer: 'True (e.g. is not)'
      }
    ]
  },
  {
    id: 'basic_prepositions',
    title: 'basic prepositions (in, on, under)',
    category: 'Prepositions',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Where Is It? (in, on, under)',
      explanation: 'Prepositions tell us the location of an object.',
      rules: [
        { label: 'in', desc: 'Inside a space or container (The pencil is in the bag).' },
        { label: 'on', desc: 'On top of a surface (The book is on the desk).' },
        { label: 'under', desc: 'Beneath or below something (The cat is under the chair).' }
      ]
    },
    examples: [
      { text: 'The book is on the table.', highlight: 'on' },
      { text: 'The ball is in the box.', highlight: 'in' },
      { text: 'The cat sleeps under the bed.', highlight: 'under' }
    ],
    miniGame: {
      instruction: 'Select the right preposition:',
      sentenceBefore: 'The keys are',
      sentenceAfter: 'my pocket.',
      options: ['in', 'on', 'under'],
      correctAnswer: 'in'
    },
    quiz: [
      {
        question: 'The plate is ______ the table surface.',
        options: ['on', 'in', 'under', 'between'],
        correctAnswer: 'on'
      },
      {
        question: 'Water is ______ the clean glass.',
        options: ['in', 'on', 'under', 'behind'],
        correctAnswer: 'in'
      },
      {
        question: 'The shoes are ______ the bed on the floor.',
        options: ['under', 'on top', 'inside', 'through'],
        correctAnswer: 'under'
      }
    ]
  },
  {
    id: 'simple_present',
    title: 'simple present',
    category: 'Tenses',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Things We Do Every Day',
      explanation: 'We use the simple present for everyday habits and facts.',
      rules: [
        { label: 'I / You / We / They', desc: 'Base verb: I play football. We study English.' },
        { label: 'He / She / It', desc: 'Add -s or -es: He plays football. She reads a book.' }
      ]
    },
    examples: [
      { text: 'I go to school every morning.', highlight: 'go' },
      { text: 'He plays football with Ali.', highlight: 'plays' },
      { text: 'She drinks warm milk.', highlight: 'drinks' }
    ],
    miniGame: {
      instruction: 'Choose the correct verb form:',
      sentenceBefore: 'Ali',
      sentenceAfter: 'English every afternoon.',
      options: ['studies', 'study'],
      correctAnswer: 'studies'
    },
    quiz: [
      {
        question: 'Complete: "I ______ football with my brother."',
        options: ['play', 'plays', 'playing', 'player'],
        correctAnswer: 'play'
      },
      {
        question: 'Complete: "She ______ to Home Academy."',
        options: ['goes', 'go', 'going', 'goer'],
        correctAnswer: 'goes'
      },
      {
        question: 'For "He, She, It", we usually add ______ to the verb.',
        options: ['-s or -es', '-ing', '-ed', 'nothing'],
        correctAnswer: '-s or -es'
      }
    ]
  },
  {
    id: 'basic_pronouns',
    title: 'basic pronouns (my, your, his, her)',
    category: 'Possessive Adjectives',
    level: 'Beginner A1',
    xpReward: 35,
    learn: {
      headline: 'Whose Is It? (my, your, his, her)',
      explanation: 'Words that show who something belongs to.',
      rules: [
        { label: 'my', desc: 'Belongs to me → My name is Ali.' },
        { label: 'your', desc: 'Belongs to you → What is your name?' },
        { label: 'his', desc: 'Belongs to a boy → His bag is blue.' },
        { label: 'her', desc: 'Belongs to a girl → Her cat is white.' }
      ]
    },
    examples: [
      { text: 'This is my English book.', highlight: 'my' },
      { text: 'Is this your pencil?', highlight: 'your' },
      { text: 'His father is a doctor.', highlight: 'His' },
      { text: 'Her sister is very kind.', highlight: 'Her' }
    ],
    miniGame: {
      instruction: 'Pick the right word:',
      sentenceBefore: 'Hamza is my friend.',
      sentenceAfter: 'car is red.',
      options: ['His', 'Her', 'My'],
      correctAnswer: 'His'
    },
    quiz: [
      {
        question: 'Sara loves ______ new bicycle.',
        options: ['her', 'his', 'my', 'your'],
        correctAnswer: 'her'
      },
      {
        question: '"Hello, what is ______ name?"',
        options: ['your', 'his', 'her', 'its'],
        correctAnswer: 'your'
      },
      {
        question: '"This is ______ book, I bought it yesterday."',
        options: ['my', 'her', 'his', 'their'],
        correctAnswer: 'my'
      }
    ]
  }
];