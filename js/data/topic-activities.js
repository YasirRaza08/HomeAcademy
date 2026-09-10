// Home Academy Dynamic Question Banks & Multi-Format Grammar Activities
// Covers the 6 physical class topics taught by Sir Zubair

export const TOPIC_QUESTION_BANKS = {
  adjectives: [
    {
      id: 'adj_01',
      topicId: 'adjectives',
      type: 'mcq',
      question: 'Which word is the adjective in: "The happy boy is singing."?',
      options: ['boy', 'happy', 'singing', 'The'],
      answer: 1,
      explanation: '"Happy" is the adjective describing the boy.'
    },
    {
      id: 'adj_02',
      topicId: 'adjectives',
      type: 'choose_sentence',
      question: 'Choose the correct English sentence:',
      options: ['Ali drives a red car.', 'Ali drives a car red.', 'Ali a red car drives.', 'Ali drives red a car.'],
      answer: 0,
      explanation: 'In English, the adjective ("red") comes before the noun ("car").'
    },
    {
      id: 'adj_03',
      topicId: 'adjectives',
      type: 'mcq',
      question: 'What is the opposite of the adjective "hot"?',
      options: ['warm', 'cold', 'slow', 'dark'],
      answer: 1,
      explanation: '"Cold" is the exact opposite of "hot".'
    },
    {
      id: 'adj_04',
      topicId: 'adjectives',
      type: 'fill',
      question: 'The giraffe has a very _____ neck.',
      options: ['tall', 'short', 'cold', 'fast'],
      answer: 0,
      explanation: 'We use "tall" or long to describe great height.'
    },
    {
      id: 'adj_05',
      topicId: 'adjectives',
      type: 'mcq',
      question: 'Complete: "Turtles move very _____, but cheetahs are fast."',
      options: ['slow', 'quick', 'hot', 'tall'],
      answer: 0,
      explanation: '"Slow" is the opposite of "fast".'
    },
    {
      id: 'adj_06',
      topicId: 'adjectives',
      type: 'choose_sentence',
      question: 'Choose the grammatically correct sentence:',
      options: ['This is an old house.', 'This is a house old.', 'This house old is an.', 'This is old house an.'],
      answer: 0,
      explanation: '"An old house" follows [article + adjective + noun].'
    },
    {
      id: 'adj_07',
      topicId: 'adjectives',
      type: 'mcq',
      question: 'My grandfather is 85 years old. He is ______.',
      options: ['young', 'old', 'new', 'cold'],
      answer: 1,
      explanation: '"Old" describes advanced age.'
    },
    {
      id: 'adj_08',
      topicId: 'adjectives',
      type: 'true_false',
      question: 'True or False: In English, adjectives change their spelling for plural nouns (e.g. "two bigs cars").',
      options: ['False — Adjectives never take an "s" in English', 'True — Adjectives must always be pluralized'],
      answer: 0,
      explanation: 'English adjectives never add "s" for plurals ("two big cars", not "bigs").'
    },
    {
      id: 'adj_09',
      topicId: 'adjectives',
      type: 'mcq',
      question: 'I bought this phone this morning. It is ______.',
      options: ['old', 'slow', 'new', 'bad'],
      answer: 2,
      explanation: 'Something newly bought is "new".'
    },
    {
      id: 'adj_10',
      topicId: 'adjectives',
      type: 'fill',
      question: 'Ice cream is always _____ when fresh.',
      options: ['hot', 'cold', 'tall', 'slow'],
      answer: 1,
      explanation: 'Ice cream is cold.'
    },
    {
      id: 'adj_11',
      topicId: 'adjectives',
      type: 'choose_sentence',
      question: 'Which sentence has the adjective in the predicate (after verb to be)?',
      options: ['The soup is hot.', 'I like hot soup.', 'Hot soup is ready.', 'Eat the hot soup.'],
      answer: 0,
      explanation: 'In "The soup is hot", "hot" comes after the verb "is".'
    },
    {
      id: 'adj_12',
      topicId: 'adjectives',
      type: 'mcq',
      question: 'What is the opposite of "good"?',
      options: ['bad', 'old', 'fast', 'small'],
      answer: 0,
      explanation: '"Bad" is the opposite of "good".'
    },
    {
      id: 'adj_13',
      topicId: 'adjectives',
      type: 'picture',
      icon: '🐘',
      question: 'Look at the elephant: "The elephant is ______."',
      options: ['small', 'big', 'cold', 'short'],
      answer: 1,
      explanation: 'An elephant is a big animal.'
    },
    {
      id: 'adj_14',
      topicId: 'adjectives',
      type: 'mcq',
      question: 'Which word is NOT an adjective?',
      options: ['beautiful', 'tall', 'run', 'fast'],
      answer: 2,
      explanation: '"Run" is an action verb, not a describing adjective.'
    },
    {
      id: 'adj_15',
      topicId: 'adjectives',
      type: 'choose_sentence',
      question: 'Choose the correct sentence with two adjectives:',
      options: ['She has a big, beautiful garden.', 'She has garden big beautiful.', 'She a garden has big beautiful.', 'Big garden she has beautiful.'],
      answer: 0,
      explanation: 'Adjectives precede the noun: "a big, beautiful garden".'
    }
  ],

  genitive_s: [
    {
      id: 'gen_01',
      topicId: 'genitive_s',
      type: 'mcq',
      question: 'The book belongs to Sara. It is ______ book.',
      options: ["Sara's", 'Saras', "Sara'", 'of Sara'],
      answer: 0,
      explanation: 'Add apostrophe + s (Sara\'s) to show singular possession.'
    },
    {
      id: 'gen_02',
      topicId: 'genitive_s',
      type: 'choose_sentence',
      question: 'Choose the sentence with the correct Genitive \'s:',
      options: ["Ali's father is a doctor.", 'Alis father is a doctor.', "Ali father's is a doctor.", 'Father of Ali is doctor.'],
      answer: 0,
      explanation: '"Ali\'s father" correctly indicates the father of Ali.'
    },
    {
      id: 'gen_03',
      topicId: 'genitive_s',
      type: 'fill',
      question: 'This is _____ (Tom) new school bag.',
      options: ["Tom's", 'Toms', 'Tom', "Tom'"],
      answer: 0,
      explanation: 'We write "Tom\'s" for the bag belonging to Tom.'
    },
    {
      id: 'gen_04',
      topicId: 'genitive_s',
      type: 'mcq',
      question: '"The cat has a toy." How do we write this with Genitive \'s?',
      options: ["The cat's toy", 'The cats toy', 'The toy cat', "The toy's cat"],
      answer: 0,
      explanation: 'The owner comes first with \'s: "The cat\'s toy".'
    },
    {
      id: 'gen_05',
      topicId: 'genitive_s',
      type: 'true_false',
      question: 'True or False: "Ahmeds laptop" is grammatically correct without an apostrophe.',
      options: ['False — Possession requires an apostrophe (Ahmed\'s)', 'True — Apostrophe is optional in English'],
      answer: 0,
      explanation: 'Possession always requires an apostrophe: Ahmed\'s laptop.'
    },
    {
      id: 'gen_06',
      topicId: 'genitive_s',
      type: 'choose_sentence',
      question: 'Which of the following is INCORRECT?',
      options: ['This is John car.', "This is John's car.", "That is Maria's jacket.", "Where is Usman's desk?"],
      answer: 0,
      explanation: '"This is John car" is missing the Genitive \'s.'
    },
    {
      id: 'gen_07',
      topicId: 'genitive_s',
      type: 'mcq',
      question: 'Complete: "The teacher______ chair is in front of the class."',
      options: ["'s", "s'", 's', 'is'],
      answer: 0,
      explanation: 'Singular noun "teacher" takes "\'s".'
    },
    {
      id: 'gen_08',
      topicId: 'genitive_s',
      type: 'fill',
      question: 'My _____ (sister) birthday is tomorrow.',
      options: ["sister's", 'sisters', 'sister', "sisters'"],
      answer: 0,
      explanation: 'Singular possession: sister\'s birthday.'
    },
    {
      id: 'gen_09',
      topicId: 'genitive_s',
      type: 'picture',
      icon: '🚗',
      question: 'The car belongs to Mr. Bilal. We say: "It is ______ car."',
      options: ["Mr. Bilal's", 'Mr. Bilals', 'Car of Mr. Bilal', 'Mr. Bilal is'],
      answer: 0,
      explanation: 'Mr. Bilal\'s car indicates ownership.'
    },
    {
      id: 'gen_10',
      topicId: 'genitive_s',
      type: 'choose_sentence',
      question: 'Choose the sentence with correct punctuation:',
      options: ["Zainab's house is near the park.", "Zainabs' house is near the park.", 'Zainabs house is near the park.', "Zainab house's is near the park."],
      answer: 0,
      explanation: '"Zainab\'s" is the correct singular possessive form.'
    },
    {
      id: 'gen_11',
      topicId: 'genitive_s',
      type: 'mcq',
      question: 'What does "Sir Zubair\'s class" mean?',
      options: ['The class taught by Sir Zubair', 'Sir Zubair is a class', 'Classes of all Zubairs', 'Sir Zubair in class'],
      answer: 0,
      explanation: 'Genitive \'s indicates Sir Zubair\'s class.'
    },
    {
      id: 'gen_12',
      topicId: 'genitive_s',
      type: 'fill',
      question: 'Is that _____ (David) jacket on the hanger?',
      options: ["David's", 'Davids', 'David', "of David's"],
      answer: 0,
      explanation: 'David\'s jacket shows who owns the jacket.'
    },
    {
      id: 'gen_13',
      topicId: 'genitive_s',
      type: 'mcq',
      question: '"The phone of my mother" is more naturally said as:',
      options: ["My mother's phone", 'My mothers phone', 'The phone my mother', 'Mother my phone'],
      answer: 0,
      explanation: 'English speakers use "My mother\'s phone".'
    },
    {
      id: 'gen_14',
      topicId: 'genitive_s',
      type: 'true_false',
      question: 'True or False: We can use Genitive \'s for pets and animals (e.g. "the dog\'s tail").',
      options: ['True — Animals take \'s just like people', 'False — Only humans can take \'s'],
      answer: 0,
      explanation: 'Yes, animals take \'s: the dog\'s tail, the lion\'s roar.'
    },
    {
      id: 'gen_15',
      topicId: 'genitive_s',
      type: 'choose_sentence',
      question: 'Which question correctly asks about someone\'s father?',
      options: ["What is your father's job?", 'What is your fathers job?', "What is your father job's?", 'What is father your job?'],
      answer: 0,
      explanation: '"Your father\'s job" is the correct possessive form.'
    }
  ],

  question_words: [
    {
      id: 'qw_01',
      topicId: 'question_words',
      type: 'mcq',
      question: '"______ is your English teacher?" (Asking about a person)',
      options: ['Who', 'What', 'Where', 'When'],
      answer: 0,
      explanation: 'We use "Who" to ask about people.'
    },
    {
      id: 'qw_02',
      topicId: 'question_words',
      type: 'mcq',
      question: '"______ is the library?" (Asking about location/place)',
      options: ['Where', 'Who', 'Why', 'When'],
      answer: 0,
      explanation: 'We use "Where" to ask about places and locations.'
    },
    {
      id: 'qw_03',
      topicId: 'question_words',
      type: 'mcq',
      question: '"______ does the class start?" (Asking about time)',
      options: ['When', 'What', 'Who', 'Where'],
      answer: 0,
      explanation: 'We use "When" to ask about time.'
    },
    {
      id: 'qw_04',
      topicId: 'question_words',
      type: 'choose_sentence',
      question: 'Which question correctly asks for a reason?',
      options: ['Why are you late?', 'Where are you late?', 'What are you late?', 'Who are you late?'],
      answer: 0,
      explanation: '"Why" asks for a reason or cause.'
    },
    {
      id: 'qw_05',
      topicId: 'question_words',
      type: 'fill',
      question: '"_____ is your favorite color?"',
      options: ['What', 'Who', 'Where', 'Why'],
      answer: 0,
      explanation: '"What" is used to ask for specific information about things.'
    },
    {
      id: 'qw_06',
      topicId: 'question_words',
      type: 'mcq',
      question: '"______ are you feeling today?" (Asking about condition/health)',
      options: ['How', 'What', 'Who', 'Where'],
      answer: 0,
      explanation: 'We use "How" to ask about state, health, or method.'
    },
    {
      id: 'qw_07',
      topicId: 'question_words',
      type: 'true_false',
      question: 'True or False: "Where" is used to ask about the time of an event.',
      options: ['False — "When" is for time, "Where" is for place', 'True — "Where" can be used for both place and time'],
      answer: 0,
      explanation: '"When" asks about time, while "Where" asks about place.'
    },
    {
      id: 'qw_08',
      topicId: 'question_words',
      type: 'choose_sentence',
      question: 'Choose the correct question to find someone\'s name:',
      options: ['What is your name?', 'Who is your name?', 'Where is your name?', 'Why is your name?'],
      answer: 0,
      explanation: '"What is your name?" is the standard question.'
    },
    {
      id: 'qw_09',
      topicId: 'question_words',
      type: 'fill',
      question: '"_____ is that girl sitting next to Sara?"',
      options: ['Who', 'What', 'Where', 'When'],
      answer: 0,
      explanation: '"Who" is used because the question is about a person (girl).'
    },
    {
      id: 'qw_10',
      topicId: 'question_words',
      type: 'mcq',
      question: 'Match the answer: "At 9:00 AM." Which question was asked?',
      options: ['When does the academy open?', 'Where is the academy?', 'Who is at the academy?', 'Why is the academy?'],
      answer: 0,
      explanation: 'A time answer ("At 9:00 AM") corresponds to a "When" question.'
    },
    {
      id: 'qw_11',
      topicId: 'question_words',
      type: 'choose_sentence',
      question: 'Choose the question with correct word order:',
      options: ['Where do you live?', 'Where you do live?', 'Where you live do?', 'You live where do?'],
      answer: 0,
      explanation: 'Formula: [Question Word + auxiliary verb + subject + main verb].'
    },
    {
      id: 'qw_12',
      topicId: 'question_words',
      type: 'mcq',
      question: '"______ old are you?"',
      options: ['How', 'What', 'Where', 'Who'],
      answer: 0,
      explanation: 'We say "How old are you?".'
    },
    {
      id: 'qw_13',
      topicId: 'question_words',
      type: 'fill',
      question: '"_____ are my keys? I cannot find them in my bag."',
      options: ['Where', 'When', 'Who', 'Why'],
      answer: 0,
      explanation: 'Asking for the location of the keys requires "Where".'
    },
    {
      id: 'qw_14',
      topicId: 'question_words',
      type: 'picture',
      icon: '🏫',
      question: 'To ask about the location of Home Academy, which question word do you use?',
      options: ['Where', 'Who', 'When', 'Why'],
      answer: 0,
      explanation: 'Location questions begin with "Where".'
    },
    {
      id: 'qw_15',
      topicId: 'question_words',
      type: 'true_false',
      question: 'True or False: "Why" questions are usually answered with "Because...".',
      options: ['True — "Because" provides the reason requested by "Why"', 'False — "Why" is never answered with "Because"'],
      answer: 0,
      explanation: '"Why" asks for a reason, so answers typically start with "Because".'
    }
  ],

  whose: [
    {
      id: 'who_01',
      topicId: 'whose',
      type: 'mcq',
      question: '"______ pen is this on my desk?"',
      options: ['Whose', 'Who', "Who's", 'Where'],
      answer: 0,
      explanation: '"Whose" asks about ownership or possession of an item.'
    },
    {
      id: 'who_02',
      topicId: 'whose',
      type: 'choose_sentence',
      question: 'Which question correctly asks about ownership of a car?',
      options: ['Whose car is this?', 'Who car is this?', 'Whos car is this?', 'Whose is car this?'],
      answer: 0,
      explanation: 'Formula: [Whose + noun + is this / that?].'
    },
    {
      id: 'who_03',
      topicId: 'whose',
      type: 'mcq',
      question: '"Whose bag is this?" — "It is ______."',
      options: ["Tom's", 'Tom', 'to Tom', 'of Tom'],
      answer: 0,
      explanation: 'Answer a "Whose" question with the possessive: "It is Tom\'s."'
    },
    {
      id: 'who_04',
      topicId: 'whose',
      type: 'true_false',
      question: 'True or False: "Who\'s" (short for who is) is the same as "Whose" (asking about possession).',
      options: ['False — "Who\'s" means "Who is", while "Whose" means ownership', 'True — They mean the exact same thing'],
      answer: 0,
      explanation: '"Who\'s" = Who is. "Whose" = belonging to whom.'
    },
    {
      id: 'who_05',
      topicId: 'whose',
      type: 'fill',
      question: '"_____ shoes are these near the door?"',
      options: ['Whose', 'Who', "Who's", 'Which'],
      answer: 0,
      explanation: 'We use "Whose" with plural items too: "Whose shoes are these?".'
    },
    {
      id: 'who_06',
      topicId: 'whose',
      type: 'choose_sentence',
      question: 'Choose the correct plural question for books:',
      options: ['Whose books are these?', 'Whose books is these?', 'Whose book are these?', 'Who books are these?'],
      answer: 0,
      explanation: 'Plural noun takes "are these": "Whose books are these?".'
    },
    {
      id: 'who_07',
      topicId: 'whose',
      type: 'mcq',
      question: '"Whose jacket is that?" — "It is ______."',
      options: ["mine (or Ali's)", 'me', 'I', 'to me'],
      answer: 0,
      explanation: 'We answer with a possessive noun or pronoun (mine, Ali\'s, his).'
    },
    {
      id: 'who_08',
      topicId: 'whose',
      type: 'fill',
      question: '"Whose cat is outside?" — "It is _____ (Sara)."',
      options: ["Sara's", 'Sara', 'to Sara', 'of Sara'],
      answer: 0,
      explanation: 'We say: "It is Sara\'s."'
    },
    {
      id: 'who_09',
      topicId: 'whose',
      type: 'choose_sentence',
      question: 'Which sentence correctly uses "Who\'s" vs "Whose"?',
      options: ["Who's calling, and whose phone is that?", "Whose calling, and who's phone is that?", "Whose is calling and whose phone?", "Who's phone is that on desk?"],
      answer: 0,
      explanation: '"Who\'s calling" (who is) + "whose phone" (possession).'
    },
    {
      id: 'who_10',
      topicId: 'whose',
      type: 'picture',
      icon: '🎒',
      question: 'You find a red backpack in the classroom. You ask: "______ is this?"',
      options: ['Whose backpack', 'Who backpack', 'Where backpack', 'What backpack'],
      answer: 0,
      explanation: '"Whose backpack is this?" asks who owns it.'
    },
    {
      id: 'who_11',
      topicId: 'whose',
      type: 'mcq',
      question: '"Whose glasses are those?" — "They are ______."',
      options: ["grandfather's", 'grandfather', 'to grandfather', 'of grandfather'],
      answer: 0,
      explanation: '"They are grandfather\'s."'
    },
    {
      id: 'who_12',
      topicId: 'whose',
      type: 'true_false',
      question: 'True or False: When answering "Whose...?", we can omit the noun if it is already understood (e.g. "It is Ahmed\'s").',
      options: ['True — We can say "It is Ahmed\'s" without repeating the item', 'False — We must always repeat the noun'],
      answer: 0,
      explanation: 'Yes! "Whose book is this?" -> "It\'s Ahmed\'s."'
    },
    {
      id: 'who_13',
      topicId: 'whose',
      type: 'fill',
      question: '"_____ turn is it to speak in English?"',
      options: ['Whose', 'Who', "Who's", 'Where'],
      answer: 0,
      explanation: '"Whose turn is it?" is the correct idiom for asking whose turn it is.'
    },
    {
      id: 'who_14',
      topicId: 'whose',
      type: 'choose_sentence',
      question: 'Choose the correct question about a laptop:',
      options: ['Whose laptop is on the table?', 'Who laptop is on table?', 'Whose is laptop on table?', 'Whom laptop is table on?'],
      answer: 0,
      explanation: '"Whose laptop is on the table?" is grammatically sound.'
    },
    {
      id: 'who_15',
      topicId: 'whose',
      type: 'mcq',
      question: '"Whose pencils are these?" — "They are ______."',
      options: ["the students'", 'student', 'the students', 'to students'],
      answer: 0,
      explanation: 'Plural possessive: "the students\'" (belonging to students).'
    }
  ],

  possessive_adjectives: [
    {
      id: 'pa_01',
      topicId: 'possessive_adjectives',
      type: 'mcq',
      question: 'I have a car. ______ car is red.',
      options: ['My', 'His', 'Her', 'Their'],
      answer: 0,
      explanation: 'The possessive adjective for "I" is "My".'
    },
    {
      id: 'pa_02',
      topicId: 'possessive_adjectives',
      type: 'mcq',
      question: 'She has a new dress. ______ dress is blue.',
      options: ['Her', 'His', 'Its', 'Our'],
      answer: 0,
      explanation: 'The possessive adjective for "She" is "Her".'
    },
    {
      id: 'pa_03',
      topicId: 'possessive_adjectives',
      type: 'mcq',
      question: 'He is doing ______ homework right now.',
      options: ['his', 'her', 'its', 'their'],
      answer: 0,
      explanation: 'The possessive adjective for "He" is "his".'
    },
    {
      id: 'pa_04',
      topicId: 'possessive_adjectives',
      type: 'choose_sentence',
      question: 'Choose the correct sentence for "We":',
      options: ['We love our classroom.', 'We love their classroom.', 'We love your classroom.', 'We love its classroom.'],
      answer: 0,
      explanation: '"We" matches with possessive adjective "our".'
    },
    {
      id: 'pa_05',
      topicId: 'possessive_adjectives',
      type: 'fill',
      question: 'They are washing _____ (they) car.',
      options: ['their', 'there', 'our', 'his'],
      answer: 0,
      explanation: '"Their" is the possessive adjective for "they".'
    },
    {
      id: 'pa_06',
      topicId: 'possessive_adjectives',
      type: 'true_false',
      question: 'True or False: "Its" (possessive, e.g. "The cat licked its paw") does NOT have an apostrophe.',
      options: ['True — Possessive "its" has NO apostrophe ("it\'s" = it is)', 'False — Possessive "its" must have an apostrophe'],
      answer: 0,
      explanation: '"Its" = possessive. "It\'s" = contraction of "it is".'
    },
    {
      id: 'pa_07',
      topicId: 'possessive_adjectives',
      type: 'mcq',
      question: 'You must bring ______ notebook tomorrow.',
      options: ['your', 'you', "you're", 'our'],
      answer: 0,
      explanation: 'The possessive adjective for "You" is "your".'
    },
    {
      id: 'pa_08',
      topicId: 'possessive_adjectives',
      type: 'fill',
      question: 'Ahmed loves _____ (he) pet cat.',
      options: ['his', 'her', 'its', 'my'],
      answer: 0,
      explanation: 'Ahmed is male ("He"), so the possessive adjective is "his".'
    },
    {
      id: 'pa_09',
      topicId: 'possessive_adjectives',
      type: 'choose_sentence',
      question: 'Which sentence has a possessive adjective mismatch?',
      options: ['Sara washed his hair.', 'Sara washed her hair.', 'Ali washed his hands.', 'We cleaned our room.'],
      answer: 0,
      explanation: 'Sara is female, so washing her own hair would be "her hair".'
    },
    {
      id: 'pa_10',
      topicId: 'possessive_adjectives',
      type: 'picture',
      icon: '🐕',
      question: 'The puppy wagged ______ tail happily.',
      options: ['its', "it's", 'his', 'her'],
      answer: 0,
      explanation: 'We use possessive "its" for animals when gender is unspecified.'
    },
    {
      id: 'pa_11',
      topicId: 'possessive_adjectives',
      type: 'mcq',
      question: '"We live in Lahore. ______ house is near the river."',
      options: ['Our', 'Their', 'Your', 'His'],
      answer: 0,
      explanation: 'Subject "We" takes possessive adjective "Our".'
    },
    {
      id: 'pa_12',
      topicId: 'possessive_adjectives',
      type: 'fill',
      question: 'The students put _____ (they) backpacks in the locker.',
      options: ['their', 'there', 'our', 'them'],
      answer: 0,
      explanation: 'Students = "they", so possessive is "their".'
    },
    {
      id: 'pa_13',
      topicId: 'possessive_adjectives',
      type: 'choose_sentence',
      question: 'Choose the correct greeting sentence:',
      options: ['What is your name?', 'What is you name?', 'What is you\'re name?', 'What is yours name?'],
      answer: 0,
      explanation: '"Your" is the possessive adjective modifying "name".'
    },
    {
      id: 'pa_14',
      topicId: 'possessive_adjectives',
      type: 'true_false',
      question: 'True or False: Possessive adjectives (my, your, his, her, its, our, their) must always be followed by a noun.',
      options: ['True — They always modify a noun (e.g. "my book")', 'False — They can stand alone without a noun'],
      answer: 0,
      explanation: 'Possessive adjectives must accompany a noun (my car, her pen).'
    },
    {
      id: 'pa_15',
      topicId: 'possessive_adjectives',
      type: 'mcq',
      question: 'Maria is talking to ______ brother on the phone.',
      options: ['her', 'his', 'its', 'their'],
      answer: 0,
      explanation: 'Maria is female, so we use "her brother".'
    }
  ],

  what_color_genitive_s: [
    {
      id: 'wc_01',
      topicId: 'what_color_genitive_s',
      type: 'mcq',
      question: '"What color is Ali\'s car?" — "______ is white."',
      options: ['It', 'They', 'He', 'She'],
      answer: 0,
      explanation: 'A singular object (car) takes the pronoun "It": "It is white."'
    },
    {
      id: 'wc_02',
      topicId: 'what_color_genitive_s',
      type: 'choose_sentence',
      question: 'Which question correctly asks for the color of Sara\'s shoes?',
      options: ["What color are Sara's shoes?", "What color is Sara's shoes?", "What color Sara's shoes are?", "What are color Sara's shoes?"],
      answer: 0,
      explanation: 'Plural noun ("shoes") takes the plural verb "are".'
    },
    {
      id: 'wc_03',
      topicId: 'what_color_genitive_s',
      type: 'fill',
      question: '"What color _____ (is/are) Tom\'s new bicycle?"',
      options: ['is', 'are', 'am', 'be'],
      answer: 0,
      explanation: '"Bicycle" is singular, so we use "is".'
    },
    {
      id: 'wc_04',
      topicId: 'what_color_genitive_s',
      type: 'mcq',
      question: '"What color are the teacher\'s pens?" — "______ are blue and red."',
      options: ['They', 'It', 'He', 'There'],
      answer: 0,
      explanation: 'Plural objects (pens) are referred to with "They": "They are...".'
    },
    {
      id: 'wc_05',
      topicId: 'what_color_genitive_s',
      type: 'true_false',
      question: 'True or False: We say "What color is Ahmed\'s eyes?" for plural eyes.',
      options: ['False — Eyes are plural, so we must say "What color are Ahmed\'s eyes?"', 'True — "is" can be used for plural eyes'],
      answer: 0,
      explanation: 'Plural nouns always use "are": "What color are Ahmed\'s eyes?".'
    },
    {
      id: 'wc_06',
      topicId: 'what_color_genitive_s',
      type: 'choose_sentence',
      question: 'Choose the correct answer to: "What color is Maryam\'s hijab?"',
      options: ["It is green.", "They are green.", "She is green.", "Green is."],
      answer: 0,
      explanation: '"It is green" correctly answers for singular hijab.'
    },
    {
      id: 'wc_07',
      topicId: 'what_color_genitive_s',
      type: 'fill',
      question: '"What color are _____ (Usman) notebooks?"',
      options: ["Usman's", 'Usmans', 'Usman', 'of Usman'],
      answer: 0,
      explanation: 'Genitive \'s: "What color are Usman\'s notebooks?".'
    },
    {
      id: 'wc_08',
      topicId: 'what_color_genitive_s',
      type: 'picture',
      icon: '🎒',
      question: 'Looking at the blue bag: "What color is Hamza\'s bag?"',
      options: ['It is blue.', 'They are blue.', 'He is blue.', 'Blue bag.'],
      answer: 0,
      explanation: '"It is blue" matches the singular bag.'
    },
    {
      id: 'wc_09',
      topicId: 'what_color_genitive_s',
      type: 'choose_sentence',
      question: 'Which question correctly combines "What color" and Genitive \'s?',
      options: ["What color is your father's jacket?", "What color your father's jacket is?", "What is color your father jacket?", "Color what is your father's jacket?"],
      answer: 0,
      explanation: 'Formula: [What color + is/are + Owner\'s + Item?].'
    },
    {
      id: 'wc_10',
      topicId: 'what_color_genitive_s',
      type: 'mcq',
      question: '"What color is the doctor\'s coat?" — "It is ______."',
      options: ['white', 'fast', 'tall', 'slow'],
      answer: 0,
      explanation: '"White" is a color word.'
    },
    {
      id: 'wc_11',
      topicId: 'what_color_genitive_s',
      type: 'fill',
      question: '"What color _____ your sister\'s cats?"',
      options: ['are', 'is', 'am', 'was'],
      answer: 0,
      explanation: 'Plural "cats" requires "are".'
    },
    {
      id: 'wc_12',
      topicId: 'what_color_genitive_s',
      type: 'true_false',
      question: 'True or False: "What color is John\'s hair?" uses "is" because hair is an uncountable noun.',
      options: ['True — Hair is uncountable in this context, so we use "is"', 'False — Hair is always plural and takes "are"'],
      answer: 0,
      explanation: '"Hair" is treated as singular uncountable: "What color is John\'s hair?".'
    },
    {
      id: 'wc_13',
      topicId: 'what_color_genitive_s',
      type: 'choose_sentence',
      question: 'Choose the correct answer for plural socks:',
      options: ["They are black and grey.", "It is black and grey.", "Socks is black.", "Black are socks."],
      answer: 0,
      explanation: 'Plural items take "They are...".'
    },
    {
      id: 'wc_14',
      topicId: 'what_color_genitive_s',
      type: 'mcq',
      question: 'Complete the question: "What color is ______ notebook?"',
      options: ["Sara's", 'Saras', 'Sara', 'to Sara'],
      answer: 0,
      explanation: 'Genitive \'s indicates Sara\'s notebook.'
    },
    {
      id: 'wc_15',
      topicId: 'what_color_genitive_s',
      type: 'choose_sentence',
      question: 'Which question is punctuated and spelled completely correctly?',
      options: ["What color is Sir Zubair's whiteboard marker?", "What color Sir Zubair's whiteboard marker is?", "What color is Sir Zubairs whiteboard marker?", "Color what is Sir Zubair's marker?"],
      answer: 0,
      explanation: '"What color is Sir Zubair\'s whiteboard marker?" is completely accurate.'
    }
  ],

  could_requests: [
    {
      id: 'cr_01',
      topicId: 'could_requests',
      type: 'choose_sentence',
      question: 'Which sentence is a correct polite request?',
      options: ['Could you please open the door?', 'Could you opening the door?', 'Could you opened the door?', 'Could you opens the door?'],
      answer: 0,
      explanation: 'We always use "Could you" + base verb ("open").'
    },
    {
      id: 'cr_02',
      topicId: 'could_requests',
      type: 'fill',
      question: 'Could you please _____ (close) the window?',
      options: ['close', 'closed', 'closing', 'closes'],
      answer: 0,
      explanation: 'After "Could you please", always use the base form "close".'
    },
    {
      id: 'cr_03',
      topicId: 'could_requests',
      type: 'mcq',
      question: 'You want someone to hand you a pen. How do you ask politely?',
      options: ['Could you please pass the pen?', 'Could you passing the pen?', 'You give pen now.', 'Could you passed the pen?'],
      answer: 0,
      explanation: '"Could you please pass the pen?" is respectful and grammatically correct.'
    },
    {
      id: 'cr_04',
      topicId: 'could_requests',
      type: 'choose_sentence',
      question: 'Choose the correct request to ask someone to speak more slowly:',
      options: ['Could you please speak slowly?', 'Could you speaking slowly?', 'Could you spoke slowly?', 'Could you speaks slowly?'],
      answer: 0,
      explanation: '"Speak" is the base verb form.'
    },
    {
      id: 'cr_05',
      topicId: 'could_requests',
      type: 'true_false',
      question: 'True or False: We can say "Could you pass the phone, please?" with "please" at the end.',
      options: ['True — "Please" can naturally be placed at the beginning or at the end', 'False — "Please" is only allowed at the very start of a sentence'],
      answer: 0,
      explanation: 'Both "Could you please pass..." and "Could you pass..., please?" are polite and correct.'
    },
    {
      id: 'cr_06',
      topicId: 'could_requests',
      type: 'mcq',
      question: 'Complete: "Could you please ______ me some water?"',
      options: ['bring', 'brought', 'bringing', 'brings'],
      answer: 0,
      explanation: 'Base form of the verb is "bring".'
    },
    {
      id: 'cr_07',
      topicId: 'could_requests',
      type: 'fill',
      question: 'Could you please _____ (help) me with this exercise?',
      options: ['help', 'helped', 'helping', 'helps'],
      answer: 0,
      explanation: 'Use the base verb "help" after "Could you please".'
    },
    {
      id: 'cr_08',
      topicId: 'could_requests',
      type: 'choose_sentence',
      question: 'You did not understand what the teacher said. What is the polite request?',
      options: ['Could you please repeat that?', 'Could you repeating that?', 'Could you repeated that?', 'What you said repeat.'],
      answer: 0,
      explanation: '"Could you please repeat that?" uses base verb "repeat".'
    },
    {
      id: 'cr_09',
      topicId: 'could_requests',
      type: 'mcq',
      question: 'It is dark in the classroom. What do you politely say?',
      options: ['Could you please turn on the light?', 'Could you turned on the light?', 'Could you turning on the light?', 'Could you turns on the light?'],
      answer: 0,
      explanation: 'Base form "turn on" is correct.'
    },
    {
      id: 'cr_10',
      topicId: 'could_requests',
      type: 'true_false',
      question: 'True or False: In "Could you please helping me?", the verb form "helping" is correct.',
      options: ['False — We must use base verb "help", not the "-ing" form', 'True — "-ing" verbs are always used with could'],
      answer: 0,
      explanation: 'Always use base verb: "Could you please help me?".'
    },
    {
      id: 'cr_11',
      topicId: 'could_requests',
      type: 'fill',
      question: 'Could you please _____ (give) me your notebook for a minute?',
      options: ['give', 'gave', 'giving', 'given'],
      answer: 0,
      explanation: '"Give" is the base verb form.'
    },
    {
      id: 'cr_12',
      topicId: 'could_requests',
      type: 'choose_sentence',
      question: 'Choose the correct request to ask someone to wait:',
      options: ['Could you please wait for a moment?', 'Could you waiting for a moment?', 'Could you waited for a moment?', 'Could you to wait for a moment?'],
      answer: 0,
      explanation: '"Wait" is the base verb without "to" or "-ing".'
    },
    {
      id: 'cr_13',
      topicId: 'could_requests',
      type: 'mcq',
      question: 'Which of the following is the most polite way to ask for a favor?',
      options: ['Could you please explain this rule?', 'Explain this rule to me.', 'You must explain this rule.', 'Explain this rule now.'],
      answer: 0,
      explanation: '"Could you please..." is polite and respectful.'
    },
    {
      id: 'cr_14',
      topicId: 'could_requests',
      type: 'fill',
      question: 'Could you please _____ (turn off) the fan? It is cold.',
      options: ['turn off', 'turned off', 'turning off', 'turns off'],
      answer: 0,
      explanation: '"Turn off" is the base phrasal verb.'
    },
    {
      id: 'cr_15',
      topicId: 'could_requests',
      type: 'choose_sentence',
      question: 'Which formula accurately represents a polite request with "Could"?',
      options: ['Could you + base verb + ...?', 'Could you + verb-ing + ...?', 'Could you + past verb + ...?', 'Could you + to + verb + ...?'],
      answer: 0,
      explanation: 'The formula is [Could you + base verb + ...?].'
    }
  ],

  how_much_price: [
    {
      id: 'hm_01',
      topicId: 'how_much_price',
      type: 'choose_sentence',
      question: 'Choose the correct question to ask the price of ONE bag:',
      options: ['How much is this bag?', 'How much are this bag?', 'How much is these bag?', 'How much are this bags?'],
      answer: 0,
      explanation: '"This bag" is singular (1 item), so we use "How much is".'
    },
    {
      id: 'hm_02',
      topicId: 'how_much_price',
      type: 'choose_sentence',
      question: 'Choose the correct question to ask the price of MULTIPLE shoes:',
      options: ['How much are these shoes?', 'How much is these shoes?', 'How much are this shoes?', 'How much is those shoes?'],
      answer: 0,
      explanation: '"Shoes" is plural (2+ items), so we use "How much are".'
    },
    {
      id: 'hm_03',
      topicId: 'how_much_price',
      type: 'fill',
      question: 'How much _____ that smartphone on the table?',
      options: ['is', 'are', 'am', 'be'],
      answer: 0,
      explanation: '"That smartphone" is singular, so we use "is".'
    },
    {
      id: 'hm_04',
      topicId: 'how_much_price',
      type: 'fill',
      question: 'How much _____ these books in the bookstore?',
      options: ['are', 'is', 'am', 'be'],
      answer: 0,
      explanation: '"These books" are plural, so we use "are".'
    },
    {
      id: 'hm_05',
      topicId: 'how_much_price',
      type: 'mcq',
      question: 'You want to know the price of ONE jacket. What do you say?',
      options: ['How much is that jacket?', 'How much are that jacket?', 'How much is those jackets?', 'How much are this jacket?'],
      answer: 0,
      explanation: 'Singular jacket requires "is".'
    },
    {
      id: 'hm_06',
      topicId: 'how_much_price',
      type: 'true_false',
      question: 'True or False: We ask "How much are this phone?" for a single phone.',
      options: ['False — A single phone is singular, so we must say "How much is this phone?"', 'True — "are" can be used for any phone'],
      answer: 0,
      explanation: 'Use "is" for one phone: "How much is this phone?".'
    },
    {
      id: 'hm_07',
      topicId: 'how_much_price',
      type: 'choose_sentence',
      question: 'Which question correctly asks the price of glasses (plural item)?',
      options: ['How much are these glasses?', 'How much is these glasses?', 'How much is this glasses?', 'How much are that glasses?'],
      answer: 0,
      explanation: '"Glasses" is always grammatically plural and takes "are".'
    },
    {
      id: 'hm_08',
      topicId: 'how_much_price',
      type: 'fill',
      question: 'How much _____ the ticket to Karachi?',
      options: ['is', 'are', 'am', 'be'],
      answer: 0,
      explanation: '"The ticket" is singular, so use "is".'
    },
    {
      id: 'hm_09',
      topicId: 'how_much_price',
      type: 'mcq',
      question: 'Complete: "Look at those watches! How much ______?"',
      options: ['are they', 'is it', 'is they', 'are it'],
      answer: 0,
      explanation: '"Watches" is plural, so we use "are they".'
    },
    {
      id: 'hm_10',
      topicId: 'how_much_price',
      type: 'true_false',
      question: 'True or False: We use "How much is" for singular items and "How much are" for plural items.',
      options: ['True — "is" is for singular (1 item) and "are" is for plural (2+ items)', 'False — "How much" is only ever followed by "are"'],
      answer: 0,
      explanation: 'Exactly right! "is" for singular, "are" for plural.'
    },
    {
      id: 'hm_11',
      topicId: 'how_much_price',
      type: 'choose_sentence',
      question: 'You hold up ONE pen. Which question is correct?',
      options: ['How much is this pen?', 'How much are this pen?', 'How much is these pens?', 'How much are this pens?'],
      answer: 0,
      explanation: '"This pen" is singular, requiring "is".'
    },
    {
      id: 'hm_12',
      topicId: 'how_much_price',
      type: 'fill',
      question: 'How much _____ those blue shirts on the rack?',
      options: ['are', 'is', 'am', 'be'],
      answer: 0,
      explanation: '"Those blue shirts" is plural, so use "are".'
    },
    {
      id: 'hm_13',
      topicId: 'how_much_price',
      type: 'mcq',
      question: 'A customer points to a laptop: "How much ______ it?"',
      options: ['is', 'are', 'were', 'am'],
      answer: 0,
      explanation: '"It" is singular, so "How much is it?".'
    },
    {
      id: 'hm_14',
      topicId: 'how_much_price',
      type: 'choose_sentence',
      question: 'Which question correctly asks the price of multiple bags?',
      options: ['How much are those bags?', 'How much is those bags?', 'How much are that bags?', 'How much is that bag? (This is singular)'],
      answer: 0,
      explanation: '"Those bags" is plural, so use "How much are those bags?".'
    },
    {
      id: 'hm_15',
      topicId: 'how_much_price',
      type: 'fill',
      question: '"How much is this chair?" — "It _____ 50 dollars."',
      options: ['is', 'are', 'have', 'were'],
      answer: 0,
      explanation: 'Singular chair: "It is 50 dollars".'
    }
  ]
};

// Multi-Format Interactive Activities for Each Grammar Topic
export const TOPIC_ACTIVITIES = {
  adjectives: {
    title: 'Adjectives Activities',
    icon: '🎨',
    color: '#2563eb',
    matching: [
      { left: 'big', right: 'small', category: 'Opposites' },
      { left: 'hot', right: 'cold', category: 'Opposites' },
      { left: 'fast', right: 'slow', category: 'Opposites' },
      { left: 'old', right: 'new', category: 'Opposites' },
      { left: 'tall', right: 'short', category: 'Opposites' },
      { left: 'good', right: 'bad', category: 'Opposites' }
    ],
    scrambles: [
      { words: ['The', 'red', 'car', 'is', 'very', 'fast'], answer: 'The red car is very fast.' },
      { words: ['Sara', 'lives', 'in', 'a', 'beautiful', 'house'], answer: 'Sara lives in a beautiful house.' },
      { words: ['Winter', 'is', 'a', 'cold', 'season'], answer: 'Winter is a cold season.' },
      { words: ['Ali', 'bought', 'a', 'new', 'laptop'], answer: 'Ali bought a new laptop.' }
    ],
    trueFalse: [
      { statement: 'In English, adjectives usually go before the noun (e.g. "a red car").', isTrue: true, explanation: 'Correct! English places adjectives before nouns.' },
      { statement: 'We add an "s" to an adjective when describing two objects ("two bigs houses").', isTrue: false, explanation: 'False! English adjectives never take an "s" for plural nouns.' },
      { statement: 'Adjectives can come after the verb "to be" (e.g. "The tea is hot").', isTrue: true, explanation: 'Correct! Predicate adjectives follow is/am/are.' }
    ],
    sentenceBuilder: [
      { prompt: 'Build sentence describing a big building:', chips: ['This', 'is', 'a', 'big', 'building', '.'], correct: 'This is a big building .' },
      { prompt: 'Build sentence with adjective after verb:', chips: ['The', 'soup', 'is', 'very', 'hot', '.'], correct: 'The soup is very hot .' }
    ]
  },

  genitive_s: {
    title: "Genitive 's Activities",
    icon: '🏷️',
    color: '#dc2626',
    matching: [
      { left: 'Ali', right: "Ali's car", category: 'Owner -> Possession' },
      { left: 'Sara', right: "Sara's book", category: 'Owner -> Possession' },
      { left: 'Teacher', right: "Teacher's desk", category: 'Owner -> Possession' },
      { left: 'Cat', right: "Cat's toy", category: 'Owner -> Possession' },
      { left: 'Doctor', right: "Doctor's coat", category: 'Owner -> Possession' },
      { left: 'Brother', right: "Brother's bike", category: 'Owner -> Possession' }
    ],
    scrambles: [
      { words: ['This', 'is', "Tom's", 'school', 'bag'], answer: "This is Tom's school bag." },
      { words: ["Ali's", 'father', 'is', 'a', 'doctor'], answer: "Ali's father is a doctor." },
      { words: ["Sara's", 'cat', 'is', 'very', 'playful'], answer: "Sara's cat is very playful." },
      { words: ['Where', 'is', "Ahmed's", 'blue', 'bicycle'], answer: "Where is Ahmed's blue bicycle?" }
    ],
    trueFalse: [
      { statement: "The Genitive 's is used to show ownership and personal relationships.", isTrue: true, explanation: "Correct! Tom's bag means the bag of Tom." },
      { statement: "We write 'Saras book' without an apostrophe to show possession.", isTrue: false, explanation: "False! An apostrophe is mandatory: Sara's book." },
      { statement: "Animals can also take Genitive 's (e.g. the dog's tail).", isTrue: true, explanation: "Correct! Living beings including pets take 's." }
    ],
    sentenceBuilder: [
      { prompt: 'Assemble ownership sentence:', chips: ['That', 'is', "Hamza's", 'new', 'laptop', '.'], correct: "That is Hamza's new laptop ." },
      { prompt: 'Build sentence about teacher desk:', chips: ['The', "teacher's", 'pen', 'is', 'on', 'desk', '.'], correct: "The teacher's pen is on desk ." }
    ]
  },

  question_words: {
    title: 'Question Words Activities',
    icon: '❓',
    color: '#7c3aed',
    matching: [
      { left: 'Who', right: 'Person (Ali, Teacher)', category: 'Question Word -> Target' },
      { left: 'Where', right: 'Place (Lahore, School)', category: 'Question Word -> Target' },
      { left: 'When', right: 'Time (9:00 AM, Sunday)', category: 'Question Word -> Target' },
      { left: 'Why', right: 'Reason (Because it is hot)', category: 'Question Word -> Target' },
      { left: 'What', right: 'Thing / Information', category: 'Question Word -> Target' },
      { left: 'How', right: 'Manner / Condition', category: 'Question Word -> Target' }
    ],
    scrambles: [
      { words: ['Where', 'do', 'you', 'live', 'now'], answer: 'Where do you live now?' },
      { words: ['What', 'is', 'your', 'favorite', 'subject'], answer: 'What is your favorite subject?' },
      { words: ['Who', 'is', 'your', 'class', 'teacher'], answer: 'Who is your class teacher?' },
      { words: ['When', 'does', 'the', 'class', 'start'], answer: 'When does the class start?' }
    ],
    trueFalse: [
      { statement: '"Where" asks about location or place.', isTrue: true, explanation: 'Correct! Where is used for places.' },
      { statement: '"Who" is used to ask about an object like a chair.', isTrue: false, explanation: 'False! "What" is for objects; "Who" is for people.' },
      { statement: '"Why" questions are answered by explaining a reason (often with "Because").', isTrue: true, explanation: 'Correct! Why asks for a reason.' }
    ],
    sentenceBuilder: [
      { prompt: 'Form question asking about teacher:', chips: ['Who', 'is', 'our', 'English', 'teacher', '?'], correct: 'Who is our English teacher ?' },
      { prompt: 'Form question asking about time:', chips: ['When', 'does', 'the', 'lesson', 'begin', '?'], correct: 'When does the lesson begin ?' }
    ]
  },

  whose: {
    title: 'Whose Activities',
    icon: '👜',
    color: '#059669',
    matching: [
      { left: 'Whose pen?', right: "It's Ali's", category: 'Question -> Answer' },
      { left: 'Whose books?', right: "They're Sara's", category: 'Question -> Answer' },
      { left: 'Whose jacket?', right: "It's mine", category: 'Question -> Answer' },
      { left: 'Whose car?', right: "It's my father's", category: 'Question -> Answer' },
      { left: 'Whose shoes?', right: "They're Tom's", category: 'Question -> Answer' }
    ],
    scrambles: [
      { words: ['Whose', 'bag', 'is', 'this', 'here'], answer: 'Whose bag is this here?' },
      { words: ['Whose', 'shoes', 'are', 'these', 'outside'], answer: 'Whose shoes are these outside?' },
      { words: ['It', 'is', "Tom's", 'blue', 'notebook'], answer: "It is Tom's blue notebook." },
      { words: ['They', 'are', "Sara's", 'reading', 'glasses'], answer: "They are Sara's reading glasses." }
    ],
    trueFalse: [
      { statement: '"Whose" is used to ask about who owns or possesses an object.', isTrue: true, explanation: 'Correct! Whose asks for ownership.' },
      { statement: '"Who\'s" with an apostrophe means the same as "Whose".', isTrue: false, explanation: 'False! Who\'s = Who is. Whose = ownership.' },
      { statement: 'When answering "Whose...?", we say "It is Tom\'s" or "They are Tom\'s".', isTrue: true, explanation: 'Correct! We use singular or plural possessive response.' }
    ],
    sentenceBuilder: [
      { prompt: 'Ask about ownership of phone:', chips: ['Whose', 'phone', 'is', 'this', 'on', 'desk', '?'], correct: 'Whose phone is this on desk ?' },
      { prompt: 'Answer with possession:', chips: ['It', 'is', "Ahmed's", 'mobile', 'phone', '.'], correct: "It is Ahmed's mobile phone ." }
    ]
  },

  possessive_adjectives: {
    title: 'Possessive Adjectives Activities',
    icon: '👥',
    color: '#d97706',
    matching: [
      { left: 'I', right: 'my', category: 'Pronoun -> Possessive' },
      { left: 'You', right: 'your', category: 'Pronoun -> Possessive' },
      { left: 'He', right: 'his', category: 'Pronoun -> Possessive' },
      { left: 'She', right: 'her', category: 'Pronoun -> Possessive' },
      { left: 'It', right: 'its', category: 'Pronoun -> Possessive' },
      { left: 'We', right: 'our', category: 'Pronoun -> Possessive' },
      { left: 'They', right: 'their', category: 'Pronoun -> Possessive' }
    ],
    scrambles: [
      { words: ['She', 'loves', 'her', 'new', 'school'], answer: 'She loves her new school.' },
      { words: ['We', 'clean', 'our', 'classroom', 'daily'], answer: 'We clean our classroom daily.' },
      { words: ['Ahmed', 'drives', 'his', 'red', 'car'], answer: 'Ahmed drives his red car.' },
      { words: ['They', 'lost', 'their', 'football', 'yesterday'], answer: 'They lost their football yesterday.' }
    ],
    trueFalse: [
      { statement: 'The possessive adjective for "He" is "his".', isTrue: true, explanation: 'Correct! He -> his.' },
      { statement: '"Its" showing possession should have an apostrophe ("it\'s").', isTrue: false, explanation: 'False! Possessive "its" has NO apostrophe. "It\'s" means "it is".' },
      { statement: 'Possessive adjectives must be followed by a noun (e.g. "our classroom").', isTrue: true, explanation: 'Correct! They always modify a noun.' }
    ],
    sentenceBuilder: [
      { prompt: 'Build sentence with "our":', chips: ['We', 'respect', 'our', 'English', 'teacher', '.'], correct: 'We respect our English teacher .' },
      { prompt: 'Build sentence with "her":', chips: ['Sara', 'finished', 'her', 'homework', 'early', '.'], correct: 'Sara finished her homework early .' }
    ]
  },

  what_color_genitive_s: {
    title: "What Color + Genitive 's Activities",
    icon: '🎨',
    color: '#0284c7',
    matching: [
      { left: 'Car (singular)', right: 'It is red', category: 'Object -> Answer' },
      { left: 'Shoes (plural)', right: 'They are black', category: 'Object -> Answer' },
      { left: 'Bicycle (singular)', right: 'It is blue', category: 'Object -> Answer' },
      { left: 'Eyes (plural)', right: 'They are brown', category: 'Object -> Answer' },
      { left: 'Jacket (singular)', right: 'It is green', category: 'Object -> Answer' }
    ],
    scrambles: [
      { words: ['What', 'color', 'is', "Ali's", 'jacket'], answer: "What color is Ali's jacket?" },
      { words: ['What', 'color', 'are', "Sara's", 'shoes'], answer: "What color are Sara's shoes?" },
      { words: ['It', 'is', 'a', 'bright', 'yellow', 'bag'], answer: 'It is a bright yellow bag.' },
      { words: ['They', 'are', 'black', 'and', 'white', 'shoes'], answer: 'They are black and white shoes.' }
    ],
    trueFalse: [
      { statement: 'For a singular item, we ask: "What color is [Name]\'s [item]?"', isTrue: true, explanation: 'Correct! Singular items take "is".' },
      { statement: 'For plural items like shoes, we say "What color is Sara\'s shoes?".', isTrue: false, explanation: 'False! Shoes are plural, so we must use "are": "What color are Sara\'s shoes?".' },
      { statement: 'We answer a singular color question with "It is [color]".', isTrue: true, explanation: 'Correct! "It is white" for singular.' }
    ],
    sentenceBuilder: [
      { prompt: "Ask color of Ali's car:", chips: ['What', 'color', 'is', "Ali's", 'car', '?'], correct: "What color is Ali's car ?" },
      { prompt: "Ask color of Sara's pens:", chips: ['What', 'color', 'are', "Sara's", 'pens', '?'], correct: "What color are Sara's pens ?" }
    ]
  },
  could_requests: {
    title: 'Could Polite Requests Activities',
    icon: '🤝',
    color: '#7c3aed',
    matching: [
      { left: 'open', right: 'the door, please', category: 'Action' },
      { left: 'close', right: 'the window, please', category: 'Action' },
      { left: 'pass', right: 'the phone, please', category: 'Favor' },
      { left: 'bring', right: 'me some water, please', category: 'Favor' },
      { left: 'speak', right: 'slowly, please', category: 'Speech' },
      { left: 'repeat', right: 'that, please', category: 'Speech' }
    ],
    scrambles: [
      { words: ['Could', 'you', 'please', 'open', 'the', 'door'], answer: 'Could you please open the door?' },
      { words: ['Could', 'you', 'pass', 'the', 'phone', 'please'], answer: 'Could you pass the phone, please?' },
      { words: ['Could', 'you', 'please', 'help', 'me', 'with', 'this'], answer: 'Could you please help me with this?' },
      { words: ['Could', 'you', 'please', 'speak', 'slowly'], answer: 'Could you please speak slowly?' }
    ],
    trueFalse: [
      { statement: 'We say "Could you please open the door?" with the base verb "open".', isTrue: true, explanation: 'Correct! Always use base verb after "Could you".' },
      { statement: 'It is correct to say "Could you please helping me?".', isTrue: false, explanation: 'False! Never use "-ing" after "Could you". Say "Could you please help me?".' },
      { statement: 'Placing "please" at the end like "Could you pass the pen, please?" is completely polite.', isTrue: true, explanation: 'Correct! "Please" can be at the start or end.' }
    ],
    sentenceBuilder: [
      { prompt: "Build polite request to open the door:", chips: ['Could', 'you', 'please', 'open', 'the', 'door', '?'], correct: "Could you please open the door ?" },
      { prompt: "Build polite request to pass the phone:", chips: ['Could', 'you', 'pass', 'the', 'phone', ',', 'please', '?'], correct: "Could you pass the phone , please ?" }
    ]
  },
  how_much_price: {
    title: 'How Much Price Activities',
    icon: '🏷️',
    color: '#0d9488',
    matching: [
      { left: 'How much is', right: 'this phone? (1 item)', category: 'Singular' },
      { left: 'How much are', right: 'these shoes? (2+ items)', category: 'Plural' },
      { left: 'How much is', right: 'that bag? (1 item)', category: 'Singular' },
      { left: 'How much are', right: 'those books? (2+ items)', category: 'Plural' },
      { left: 'How much is', right: 'it? (Singular pronoun)', category: 'Singular' },
      { left: 'How much are', right: 'they? (Plural pronoun)', category: 'Plural' }
    ],
    scrambles: [
      { words: ['How', 'much', 'is', 'this', 'phone'], answer: 'How much is this phone?' },
      { words: ['How', 'much', 'are', 'these', 'shoes'], answer: 'How much are these shoes?' },
      { words: ['How', 'much', 'is', 'that', 'leather', 'bag'], answer: 'How much is that leather bag?' },
      { words: ['How', 'much', 'are', 'those', 'new', 'books'], answer: 'How much are those new books?' }
    ],
    trueFalse: [
      { statement: 'For ONE item (singular), we always ask "How much is...?"', isTrue: true, explanation: 'Correct! "is" is for one item (phone, bag, shirt).' },
      { statement: 'For MULTIPLE items like shoes or books, we ask "How much is these shoes?".', isTrue: false, explanation: 'False! Multiple items require "are": "How much are these shoes?".' },
      { statement: '"How much are they?" is the correct plural question for multiple items.', isTrue: true, explanation: 'Correct! "They" and "are" are used for plural items.' }
    ],
    sentenceBuilder: [
      { prompt: "Ask price of one phone:", chips: ['How', 'much', 'is', 'this', 'phone', '?'], correct: "How much is this phone ?" },
      { prompt: "Ask price of multiple shoes:", chips: ['How', 'much', 'are', 'these', 'shoes', '?'], correct: "How much are these shoes ?" }
    ]
  }
};

// Fisher-Yates array shuffle utility
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffles options and updates correct answer index automatically
export function shuffleQuestion(question) {
  if (!question || !Array.isArray(question.options) || question.options.length <= 1) {
    return { ...question };
  }
  const originalOptions = question.options;
  let correctOptionText = '';

  if (typeof question.answer === 'number' && originalOptions[question.answer] !== undefined) {
    correctOptionText = originalOptions[question.answer];
  } else if (typeof question.answer === 'string') {
    correctOptionText = question.answer;
  } else if (typeof question.correct === 'number' && originalOptions[question.correct] !== undefined) {
    correctOptionText = originalOptions[question.correct];
  } else if (typeof question.correct === 'string') {
    correctOptionText = question.correct;
  } else if (typeof question.correctAnswer === 'string') {
    correctOptionText = question.correctAnswer;
  } else if (typeof question.correctAnswer === 'number' && originalOptions[question.correctAnswer] !== undefined) {
    correctOptionText = originalOptions[question.correctAnswer];
  }

  const shuffledOptions = shuffleArray(originalOptions);
  let newAnswerIndex = -1;
  if (correctOptionText) {
    newAnswerIndex = shuffledOptions.findIndex(
      opt => String(opt).trim().toLowerCase() === String(correctOptionText).trim().toLowerCase()
    );
  }

  const resolvedIndex = newAnswerIndex !== -1 ? newAnswerIndex : (typeof question.answer === 'number' ? question.answer : 0);
  const resolvedText = correctOptionText || shuffledOptions[resolvedIndex] || shuffledOptions[0];

  return {
    ...question,
    options: shuffledOptions,
    answer: resolvedIndex,
    correct: resolvedIndex,
    correctAnswer: resolvedText
  };
}

// Core Selector: Always provides fresh, un-repeated questions for a topic
export function getFreshQuestionsForTopic(topicId, seenIds = [], count = 5) {
  const bank = TOPIC_QUESTION_BANKS[topicId] || [];
  if (bank.length === 0) return { questions: [], selectedIds: [] };

  const seenSet = new Set(seenIds || []);
  let pool = bank.filter(q => !seenSet.has(q.id));

  // If pool has fewer questions than count, reset seen filter for this topic so questions cycle cleanly
  if (pool.length < count) {
    pool = [...bank];
  }

  // Shuffle pool to ensure random selection
  const shuffledPool = shuffleArray(pool);
  const selected = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

  // Shuffle options for each selected question
  const finalQuestions = selected.map(q => shuffleQuestion(q));
  const selectedIds = finalQuestions.map(q => q.id);

  return {
    questions: finalQuestions,
    selectedIds
  };
}

// Comprehensive Full Grammar Test Generator: Samples across ALL currently active topics
export function generateFullGrammarTest(activeTopics = [], seenIds = [], questionsPerTopic = 2) {
  if (!activeTopics || activeTopics.length === 0) {
    return { questions: [], selectedIds: [], topicBreakdown: {} };
  }

  const allSelected = [];
  const selectedIds = [];
  const topicBreakdown = {};

  activeTopics.forEach(topic => {
    const { questions, selectedIds: ids } = getFreshQuestionsForTopic(topic.id, seenIds, questionsPerTopic);
    questions.forEach(q => {
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

  // Randomize the order of questions across the entire test
  const randomizedTest = shuffleArray(allSelected);

  return {
    questions: randomizedTest,
    selectedIds,
    topicBreakdown
  };
}
