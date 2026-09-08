// Home Academy — Real Roleplay Presentations Data
// Based on real presentations taught by Sir Zubair and performed in physical class
// STRICT: Exactly 5 official roleplays with real class scenarios, grammar focus, and teacher expressions

export const OFFICIAL_ROLEPLAYS = [
  {
    id: 'rp_01',
    number: '01',
    title: "A Friend Visits Another Friend's House",
    subtitle: "Describing people, rooms, and items in the house using adjectives",
    icon: '🏡',
    color: '#0A2558',
    active: true,
    scenario: "You are visiting your friend's house. You talk about the people and things in the house and describe them using adjectives.",
    grammarFocus: ["Adjectives"],
    grammarDescription: "Use descriptive words (adjectives) such as tall, friendly, helpful, clean, big, tidy, and modern to describe people, rooms, and furniture.",
    imageContext: {
      url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
      alt: 'Friends having a polite and comfortable conversation inside a clean, modern, spacious living room',
      photographer: 'Priscilla Du Preez',
      photographerUrl: 'https://unsplash.com/@priscilladupreez',
      searchQuery: 'clean big living room conversation'
    },
    
    // Exact expressions given by Sir Zubair
    spokenExpressions: [
      {
        id: 'rp1_exp_1',
        text: "Welcome to my house.",
        meaning: "A polite and warm greeting when someone arrives at your home.",
        context: "Greeting guest at entrance"
      },
      {
        id: 'rp1_exp_2',
        text: "Make yourself comfortable.",
        meaning: "Telling your guest to relax and feel at home.",
        context: "Inviting guest to sit down"
      },
      {
        id: 'rp1_exp_3',
        text: "Who is knocking on the door?",
        meaning: "Asking about someone making a sound outside the entrance.",
        context: "Hearing a knock"
      },
      {
        id: 'rp1_exp_4',
        text: "My brother is helpful and friendly.",
        meaning: "Describing a family member's positive personality traits.",
        context: "Introducing or describing family"
      },
      {
        id: 'rp1_exp_5',
        text: "That's nice.",
        meaning: "A friendly response showing you appreciate what the other person said.",
        context: "Responding politely"
      },
      {
        id: 'rp1_exp_6',
        text: "Is your brother tall?",
        meaning: "Asking about physical appearance using an adjective.",
        context: "Asking about a person"
      },
      {
        id: 'rp1_exp_7',
        text: "Your living room is very clean and big.",
        meaning: "Complimenting a room using descriptive adjectives.",
        context: "Complimenting the host's house"
      },
      {
        id: 'rp1_exp_8',
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
        id: 'rp1_q1',
        type: 'mcq',
        question: "When a guest arrives at your front door, what is the best greeting to say?",
        options: ["Welcome to my house.", "Where are my shoes?", "Close the door now.", "I am very tired."],
        correct: 0,
        explanation: "'Welcome to my house' is the polite, friendly greeting Sir Zubair taught for inviting someone inside."
      },
      {
        id: 'rp1_q2',
        type: 'fill',
        question: "Complete the compliment: 'Your living room is very ______ and big.'",
        options: ["clean", "shout", "yesterday", "door"],
        correct: 0,
        explanation: "'Clean' is an adjective that describes the pleasant condition of the room."
      },
      {
        id: 'rp1_q3',
        type: 'expression_match',
        question: "Your friend says: 'Make yourself comfortable.' What does this mean?",
        options: ["Please relax and feel at home.", "Please clean my room.", "You should leave now.", "Please stand outside."],
        correct: 0,
        explanation: "'Make yourself comfortable' means sit down, relax, and feel at home."
      },
      {
        id: 'rp1_q4',
        type: 'grammar_check',
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
        id: 'rp1_q5',
        type: 'mcq',
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
        id: 'rp1_q6',
        type: 'mcq',
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
        id: 'rp1_sp_1',
        title: "Describe a Family Member",
        instruction: "Describe your brother, sister, mother, or father using at least one adjective (e.g. tall, kind, helpful, friendly, smart).",
        example: "My brother is helpful and friendly.",
        targetCategory: 'person',
        requiredAdjectives: ['helpful', 'friendly', 'tall', 'short', 'kind', 'smart', 'nice', 'polite', 'caring', 'hardworking', 'funny', 'cheerful', 'young', 'old']
      },
      {
        id: 'rp1_sp_2',
        title: "Describe a Room or House",
        instruction: "Describe your living room, bedroom, kitchen, or house using adjectives (e.g. big, clean, bright, comfortable, tidy, modern, beautiful).",
        example: "Our living room is very clean and comfortable.",
        targetCategory: 'room',
        requiredAdjectives: ['clean', 'big', 'small', 'comfortable', 'tidy', 'bright', 'modern', 'beautiful', 'spacious', 'quiet', 'neat', 'cozy', 'warm']
      },
      {
        id: 'rp1_sp_3',
        title: "Describe an Item of Furniture",
        instruction: "Describe a sofa, chair, table, or bed in the house using an adjective (e.g. soft, wooden, new, comfortable, large).",
        example: "This sofa is very soft and comfortable.",
        targetCategory: 'item',
        requiredAdjectives: ['comfortable', 'soft', 'new', 'old', 'wooden', 'large', 'small', 'heavy', 'nice', 'brown', 'white', 'black', 'clean']
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
    id: 'rp_02',
    number: '02',
    title: "A Police Officer Asks Questions About People, Things and Possessions",
    subtitle: "Using What, Who, Whose and Genitive 's to investigate items and owners",
    icon: '👮',
    color: '#0A2558',
    active: true,
    scenario: "A police officer has entered a room and is asking a person about things, people and possessions.",
    grammarFocus: ["What", "Who", "Whose", "Genitive 's"],
    grammarDescription: "Practice forming investigative questions using What (identifying objects), Who (identifying people), Whose (asking about ownership), and Genitive 's (showing possession like John's bag or the officer's badge).",
    imageContext: {
      url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      alt: 'Professional police consultation desk with documentation, notebook, and personal belongings being identified',
      photographer: "King's Church International",
      photographerUrl: 'https://unsplash.com/@kingschurchinternational',
      searchQuery: 'police officer asking questions interview room'
    },

    spokenExpressions: [
      {
        id: 'rp2_exp_1',
        text: "I need to ask you a few questions.",
        meaning: "A formal and polite phrase used by an officer to begin an interview.",
        context: "Starting an investigation"
      },
      {
        id: 'rp2_exp_2',
        text: "Please stay calm.",
        meaning: "Reassuring someone not to panic or worry.",
        context: "Calming a nervous person"
      },
      {
        id: 'rp2_exp_3',
        text: "What exactly is this?",
        meaning: "Asking for precise clarification about an object.",
        context: "Inspecting an unknown object"
      },
      {
        id: 'rp2_exp_4',
        text: "Is there anything else I should know?",
        meaning: "Asking if there are additional details or facts.",
        context: "Gathering full information"
      },
      {
        id: 'rp2_exp_5',
        text: "Let me think.",
        meaning: "Pausing politely while remembering details.",
        context: "Thinking before answering"
      },
      {
        id: 'rp2_exp_6',
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
        id: 'rp2_q1',
        type: 'mcq',
        question: "The police officer points to a leather wallet on the desk. How should the officer ask about its owner?",
        options: ["Whose wallet is this?", "What color are yesterday?", "Where is brother?", "Who are wallet?"],
        correct: 0,
        explanation: "'Whose' is the question word specifically used to ask about ownership."
      },
      {
        id: 'rp2_q2',
        type: 'grammar_check',
        question: "Which sentence correctly uses Genitive 's to state that the bag belongs to John?",
        options: ["This is John's bag.", "This is John bag.", "This is bag of John's.", "This are Johns bags."],
        correct: 0,
        explanation: "Add 's to John to form 'John's bag'."
      },
      {
        id: 'rp2_q3',
        type: 'mcq',
        question: "The officer enters and wants to begin talking. What expression should the officer use?",
        options: ["I need to ask you a few questions.", "Give me all your food.", "Who is door?", "Make yourself brother."],
        correct: 0,
        explanation: "'I need to ask you a few questions' is the official spoken expression taught by Sir Zubair."
      },
      {
        id: 'rp2_q4',
        type: 'fill',
        question: "Complete the question: '______ owns this smartphone?'",
        options: ["Who", "Whose", "What color", "How many"],
        correct: 0,
        explanation: "'Who' asks about the person performing the action (who owns)."
      },
      {
        id: 'rp2_q5',
        type: 'mcq',
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
        id: 'rp2_q6',
        type: 'mcq',
        question: "Which question is asking about the identity of an object in the room?",
        options: ["What exactly is this?", "Whose brother is tall?", "Where are David?", "Who is knocking?"],
        correct: 0,
        explanation: "'What exactly is this?' is used when inspecting an unfamiliar object."
      }
    ],

    sentencePrompts: [
      {
        id: 'rp2_sp_1',
        title: "Ask a Question with 'Whose'",
        instruction: "Write a question asking who owns an item (e.g. bag, phone, keys, watch, wallet, book, laptop) using 'Whose'.",
        example: "Whose phone is this on the table?",
        targetCategory: 'whose_question',
        requiredKeywords: ['whose', 'is', 'this', 'that', 'these', 'bag', 'phone', 'wallet', 'watch', 'keys', 'book', 'laptop', 'car']
      },
      {
        id: 'rp2_sp_2',
        title: "Answer using Genitive 's",
        instruction: "Write a sentence stating that an item belongs to a specific person (e.g. John's, Sara's, Ali's, my friend's, the teacher's).",
        example: "This is John's bag.",
        targetCategory: 'genitive_statement',
        requiredKeywords: ["'s", 'is', 'this', 'that', 'it', 'bag', 'phone', 'wallet', 'car', 'book']
      },
      {
        id: 'rp2_sp_3',
        title: "Ask What or Who Question",
        instruction: "Write an investigative question starting with 'What' or 'Who'.",
        example: "What exactly is this strange box?",
        targetCategory: 'what_who_question',
        requiredKeywords: ['what', 'who', 'is', 'owns', 'this', 'that', 'person']
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
    id: 'rp_03',
    number: '03',
    title: "A Person Visits His Friend's House and Asks About Family Members and Their Jobs",
    subtitle: "Discussing relatives, occupations, qualities, and possessions",
    icon: '👨‍👩‍👧',
    color: '#0A2558',
    active: true,
    scenario: "A person visits his friend's house and asks about family members and their jobs.",
    grammarFocus: ["Adjectives", "Possessive Adjectives", "Genitive 's"],
    grammarDescription: "Practice combining Possessive Adjectives (my, his, her, their), Genitive 's (father's job, sister's car), and descriptive Adjectives (friendly, hardworking, interesting, new) to talk about family and work.",
    imageContext: {
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      alt: 'Friendly gathering in a warm home discussing family members, career paths, and occupations',
      photographer: 'Tyler Nix',
      photographerUrl: 'https://unsplash.com/@jtylernix',
      searchQuery: 'friends talking family members jobs living room'
    },

    spokenExpressions: [
      {
        id: 'rp3_exp_1',
        text: "Oh really?",
        meaning: "An enthusiastic expression showing interest or mild surprise.",
        context: "Reacting to interesting family news"
      },
      {
        id: 'rp3_exp_2',
        text: "What is that exactly?",
        meaning: "Asking for more detail about a specific job or role.",
        context: "Asking about an unfamiliar profession"
      },
      {
        id: 'rp3_exp_3',
        text: "Is she a housekeeper?",
        meaning: "Asking about someone's specific profession.",
        context: "Inquiring about occupation"
      },
      {
        id: 'rp3_exp_4',
        text: "That sounds interesting.",
        meaning: "Praising someone's job or hobby as engaging.",
        context: "Commenting on a career"
      },
      {
        id: 'rp3_exp_5',
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
        id: 'rp3_q1',
        type: 'mcq',
        question: "Your friend says: 'My mother is an engineer.' You want to show interest. What do you say?",
        options: ["Oh really? That sounds interesting!", "Stay calm, officer.", "Whose bag are you?", "There is three books."],
        correct: 0,
        explanation: "'Oh really? That sounds interesting!' is the natural, friendly response."
      },
      {
        id: 'rp3_q2',
        type: 'grammar_check',
        question: "Which sentence correctly combines a possessive adjective and Genitive 's to describe a car?",
        options: ["His father's car is new.", "His father car is new.", "He father's car are new.", "Him father car new."],
        correct: 0,
        explanation: "'His father's car is new' uses possessive 'His' and Genitive 'father's' accurately."
      },
      {
        id: 'rp3_q3',
        type: 'fill',
        question: "Fill in the blank: 'My sister is very friendly. ______ job is very interesting.'",
        options: ["Her", "His", "Their", "He"],
        correct: 0,
        explanation: "'Her' is the correct possessive adjective for a female (sister)."
      },
      {
        id: 'rp3_q4',
        type: 'mcq',
        question: "Your friend mentions an unusual job title. How do you ask for clarification?",
        options: ["What is that exactly?", "Who are door?", "What color is shoes?", "Where your sister house?"],
        correct: 0,
        explanation: "'What is that exactly?' is the expression taught by Sir Zubair for asking about details."
      },
      {
        id: 'rp3_q5',
        type: 'mcq',
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
        id: 'rp3_q6',
        type: 'expression_match',
        question: "When you want to share what you personally think about a career, how do you begin?",
        options: ["In my opinion...", "Please stay calm...", "Welcome to my house...", "There are two..."],
        correct: 0,
        explanation: "'In my opinion' signals that you are sharing your personal perspective."
      }
    ],

    sentencePrompts: [
      {
        id: 'rp3_sp_1',
        title: "Describe a Family Member's Job",
        instruction: "Write a sentence mentioning a family member and their job (e.g. teacher, doctor, engineer, manager, driver, nurse, housekeeper).",
        example: "My father is a teacher and he loves his job.",
        targetCategory: 'job_sentence',
        requiredKeywords: ['my', 'his', 'her', 'father', 'mother', 'brother', 'sister', 'is', 'job', 'teacher', 'doctor', 'engineer', 'nurse', 'housekeeper', 'manager', 'driver', 'worker']
      },
      {
        id: 'rp3_sp_2',
        title: "Combine Possession & Adjectives",
        instruction: "Write a sentence using a possessive adjective or Genitive 's with an adjective (e.g. His father's car is new, My sister is friendly).",
        example: "His father's car is new and clean.",
        targetCategory: 'possession_adjective',
        requiredKeywords: ['his', 'her', 'my', "'s", 'is', 'friendly', 'new', 'old', 'hardworking', 'interesting', 'tall', 'kind']
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
    id: 'rp_04',
    number: '04',
    title: "A Person Reports His Lost Children at the Police Station",
    subtitle: "Describing children's clothing colors, appearance, and personal items",
    icon: '🔍',
    color: '#0A2558',
    active: true,
    scenario: "A person is at the police station to report his lost children — a boy and a girl.",
    grammarFocus: ["Possessive Adjectives", "What color", "Whose"],
    grammarDescription: "Practice asking and describing clothing colors using What color (What color are their clothes?), possessive adjectives (His shirt is blue, Her dress is red), and ownership (Whose backpack was left behind?).",
    imageContext: {
      url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
      alt: 'Supportive official assistance and information desk at a public service station for reporting details',
      photographer: 'CDC',
      photographerUrl: 'https://unsplash.com/@cdc',
      searchQuery: 'police station information desk assistance parent report'
    },

    spokenExpressions: [
      {
        id: 'rp4_exp_1',
        text: "Please stay calm.",
        meaning: "Reassurance given by the police desk officer to the anxious parent.",
        context: "Police comforting the parent"
      },
      {
        id: 'rp4_exp_2',
        text: "What color are their clothes?",
        meaning: "Asking about the specific colors of the lost children's garments.",
        context: "Officer requesting visual description"
      },
      {
        id: 'rp4_exp_3',
        text: "Please help me.",
        meaning: "An urgent, polite appeal for assistance.",
        context: "Parent asking for help"
      },
      {
        id: 'rp4_exp_4',
        text: "What do they look like?",
        meaning: "Asking for a physical description of appearance and features.",
        context: "Officer gathering identification details"
      },
      {
        id: 'rp4_exp_5',
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
        id: 'rp4_q1',
        type: 'mcq',
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
        id: 'rp4_q2',
        type: 'fill',
        question: "The parent describes the boy: '______ shirt is blue and his cap is black.'",
        options: ["His", "Her", "Their", "She"],
        correct: 0,
        explanation: "'His' is the possessive adjective used for a boy."
      },
      {
        id: 'rp4_q3',
        type: 'fill',
        question: "The parent describes the girl: '______ dress is pink and her shoes are white.'",
        options: ["Her", "His", "Him", "He"],
        correct: 0,
        explanation: "'Her' is the possessive adjective used for a girl."
      },
      {
        id: 'rp4_q4',
        type: 'mcq',
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
        id: 'rp4_q5',
        type: 'mcq',
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
        id: 'rp4_q6',
        type: 'mcq',
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
        id: 'rp4_sp_1',
        title: "Describe Clothing Colors for a Boy",
        instruction: "Describe the boy's clothes using 'His' and color words (e.g. blue, red, green, black, white, yellow).",
        example: "His shirt is blue and his trousers are dark grey.",
        targetCategory: 'clothing_boy',
        requiredKeywords: ['his', 'shirt', 'pants', 'trousers', 'cap', 'jacket', 'shoes', 'is', 'are', 'blue', 'red', 'green', 'black', 'white', 'yellow', 'brown']
      },
      {
        id: 'rp4_sp_2',
        title: "Describe Clothing Colors for a Girl",
        instruction: "Describe the girl's clothes using 'Her' and color words (e.g. pink, red, yellow, purple, white).",
        example: "Her dress is bright yellow and her shoes are white.",
        targetCategory: 'clothing_girl',
        requiredKeywords: ['her', 'dress', 'skirt', 'shirt', 'shoes', 'jacket', 'hat', 'is', 'are', 'pink', 'red', 'yellow', 'purple', 'white', 'blue']
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
    id: 'rp_05',
    number: '05',
    title: "Two Friends Talk About Their New School, College or Workplace",
    subtitle: "Describing facilities and rooms using 'There is' (singular) and 'There are' (plural)",
    icon: '🏫',
    color: '#0A2558',
    active: true,
    scenario: "Two friends are talking about their new school, college, workplace or another place.",
    grammarFocus: ["There is", "There are"],
    grammarDescription: "Master the essential rule: Use 'There is' for ONE item / singular noun (There is a library, There is a big computer lab). Use 'There are' for TWO OR MORE items / plural nouns (There are three science rooms, There are many students).",
    imageContext: {
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      alt: 'Two university students walking through a bright modern educational campus discussing classrooms and library facilities',
      photographer: 'MD Duran',
      photographerUrl: 'https://unsplash.com/@mdduran',
      searchQuery: 'students campus new college school workplace discussion'
    },

    spokenExpressions: [
      {
        id: 'rp5_exp_1',
        text: "One thing I really like about this...",
        meaning: "Highlighting a specific positive feature of your new school or office.",
        context: "Pointing out a favorite benefit"
      },
      {
        id: 'rp5_exp_2',
        text: "You should visit sometime.",
        meaning: "Inviting a friend to come and see the new location.",
        context: "Friendly invitation"
      },
      {
        id: 'rp5_exp_3',
        text: "How many rooms are there?",
        meaning: "Asking for the quantity of rooms using 'are there'.",
        context: "Inquiring about size"
      },
      {
        id: 'rp5_exp_4',
        text: "Overall, it's a great place.",
        meaning: "Giving a positive general summary of the venue.",
        context: "Summarizing your feelings"
      },
      {
        id: 'rp5_exp_5',
        text: "It's quite different from that house.",
        meaning: "Comparing the new environment to a previously discussed place.",
        context: "Making a comparison"
      },
      {
        id: 'rp5_exp_6',
        text: "Whose watch is it?",
        meaning: "Review question asking about ownership of a discovered watch.",
        context: "Noticing an accessory"
      },
      {
        id: 'rp5_exp_7',
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
        id: 'rp5_q1',
        type: 'fill',
        question: "Select the correct form: 'There ______ a large library in our new school.'",
        options: ["is", "are", "were", "be"],
        correct: 0,
        explanation: "Use 'There is' because 'a large library' is singular (one library)."
      },
      {
        id: 'rp5_q2',
        type: 'fill',
        question: "Select the correct form: 'There ______ three computer labs on the second floor.'",
        options: ["are", "is", "have", "am"],
        correct: 0,
        explanation: "Use 'There are' because 'three computer labs' is plural (more than one)."
      },
      {
        id: 'rp5_q3',
        type: 'mcq',
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
        id: 'rp5_q4',
        type: 'grammar_check',
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
        id: 'rp5_q5',
        type: 'mcq',
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
        id: 'rp5_q6',
        type: 'fill',
        question: "Complete the sentence: 'There ______ many books in the study hall.'",
        options: ["are", "is", "has", "it"],
        correct: 0,
        explanation: "'Many books' is plural, so use 'There are'."
      }
    ],

    sentencePrompts: [
      {
        id: 'rp5_sp_1',
        title: "Use 'There is' for Singular",
        instruction: "Write a sentence describing ONE thing in your school, college, workplace, or house using 'There is a...'",
        example: "There is a big library in my new college.",
        targetCategory: 'there_is',
        requiredKeywords: ['there', 'is', 'a', 'library', 'playground', 'cafeteria', 'classroom', 'garden', 'lab', 'office', 'canteen', 'gym']
      },
      {
        id: 'rp5_sp_2',
        title: "Use 'There are' for Plural",
        instruction: "Write a sentence describing TWO OR MORE things using 'There are...' and a number or word like 'many'.",
        example: "There are four classrooms and many students.",
        targetCategory: 'there_are',
        requiredKeywords: ['there', 'are', 'rooms', 'classrooms', 'students', 'teachers', 'computers', 'desks', 'books', 'many', 'two', 'three', 'four', 'five']
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

export function getOfficialRoleplays() {
  return JSON.parse(JSON.stringify(OFFICIAL_ROLEPLAYS));
}

export function getRoleplayById(roleplayId) {
  return OFFICIAL_ROLEPLAYS.find(r => r.id === roleplayId) || null;
}

// Intelligent sentence validator for "Create Your Own Sentence"
// Accepts multiple varied correct student answers while providing educational guidance
export function validateStudentSentence(roleplayId, promptId, rawSentence) {
  const text = (rawSentence || '').trim();
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/).filter(Boolean);

  if (words.length < 3) {
    return {
      valid: false,
      feedback: "💡 Try writing a complete sentence with at least 3 to 4 words. For example: 'My brother is friendly and tall.'"
    };
  }

  // Roleplay 1: Adjectives
  if (roleplayId === 'rp_01') {
    const commonAdjectives = [
      'tall', 'short', 'friendly', 'helpful', 'clean', 'big', 'small', 'tidy', 'nice', 'kind',
      'smart', 'polite', 'caring', 'hardworking', 'funny', 'cheerful', 'young', 'old', 'comfortable',
      'spacious', 'quiet', 'neat', 'cozy', 'warm', 'modern', 'beautiful', 'soft', 'large', 'good', 'great'
    ];
    const foundAdjectives = commonAdjectives.filter(adj => lower.includes(adj));
    const hasCopula = words.some(w => ['is', "'s", 'are', "'re", 'looks', 'seems', 'very', 'really'].includes(w));

    if (foundAdjectives.length === 0) {
      return {
        valid: false,
        feedback: "💡 Good start! Remember the grammar focus is Adjectives. Add a descriptive word like 'tall', 'friendly', 'clean', or 'comfortable'."
      };
    }

    if (!hasCopula) {
      return {
        valid: false,
        feedback: "💡 Almost there! Make sure to include a linking verb like 'is' or 'are' (e.g. 'My sister IS friendly')."
      };
    }

    return {
      valid: true,
      adjectivesUsed: foundAdjectives,
      feedback: `🎉 Excellent! You used the descriptive adjective "${foundAdjectives[0]}" very well in your sentence.`
    };
  }

  // Roleplay 2: What, Who, Whose, Genitive 's
  if (roleplayId === 'rp_02') {
    if (promptId === 'rp2_sp_1') {
      // Whose question
      if (!lower.startsWith('whose') && !lower.includes('whose')) {
        return {
          valid: false,
          feedback: "💡 Start your question with 'Whose' to ask about ownership (e.g. 'Whose bag is this?')."
        };
      }
      return {
        valid: true,
        feedback: "🎉 Well done! You formed an investigative 'Whose' question properly."
      };
    }

    if (promptId === 'rp2_sp_2') {
      // Genitive 's statement
      const hasGenitive = text.includes("'s") || text.includes("’s");
      if (!hasGenitive) {
        return {
          valid: false,
          feedback: "💡 Remember to use Genitive 's to show ownership (e.g. 'This is John's bag' or 'It is Ali's phone')."
        };
      }
      return {
        valid: true,
        feedback: "🎉 Spot on! You used Genitive 's to show who owns the item."
      };
    }

    // What or Who
    const hasWhatOrWho = lower.includes('what') || lower.includes('who');
    if (!hasWhatOrWho) {
      return {
        valid: false,
        feedback: "💡 Start your question with 'What' or 'Who' (e.g. 'What exactly is this?' or 'Who owns this phone?')."
      };
    }
    return {
      valid: true,
      feedback: "🎉 Great investigative question! Sir Zubair would be proud."
    };
  }

  // Roleplay 3: Adjectives, Possessive Adjectives, Genitive 's
  if (roleplayId === 'rp_03') {
    const possessives = ['my', 'his', 'her', 'their', 'our', "'s", '’s'];
    const hasPossessive = possessives.some(p => lower.includes(p));

    if (!hasPossessive) {
      return {
        valid: false,
        feedback: "💡 Use a possessive word like 'My', 'His', 'Her', or a name with 's (e.g. 'My father is a teacher' or 'His sister's job is interesting')."
      };
    }

    return {
      valid: true,
      feedback: "🎉 Great job! You talked about your family and their qualities clearly."
    };
  }

  // Roleplay 4: Possessive Adjectives, What color, Whose
  if (roleplayId === 'rp_04') {
    const colors = ['blue', 'red', 'green', 'black', 'white', 'yellow', 'pink', 'purple', 'grey', 'gray', 'brown', 'orange', 'dark', 'light'];
    const hasColor = colors.some(c => lower.includes(c));

    if (!hasColor) {
      return {
        valid: false,
        feedback: "💡 Remember to include a color word to help the officer identify the clothing (e.g. 'blue', 'yellow', 'white', 'black')."
      };
    }

    const hasPossessive = lower.includes('his') || lower.includes('her') || lower.includes('their') || lower.includes('my');
    if (!hasPossessive) {
      return {
        valid: false,
        feedback: "💡 Use 'His' for the boy or 'Her' for the girl (e.g. 'His shirt is blue' or 'Her dress is pink')."
      };
    }

    return {
      valid: true,
      feedback: "🎉 Wonderful description! The color and possessive adjective are used accurately."
    };
  }

  // Roleplay 5: There is vs There are
  if (roleplayId === 'rp_05') {
    if (promptId === 'rp5_sp_1') {
      // Singular: There is
      const hasThereIs = lower.includes('there is') || lower.includes("there's");
      if (!hasThereIs) {
        return {
          valid: false,
          feedback: "💡 Remember to use 'There is' for a single item (e.g. 'There is a library' or 'There is a big cafeteria')."
        };
      }
      return {
        valid: true,
        feedback: "🎉 Perfect! You correctly used 'There is' for a singular place or facility."
      };
    }

    if (promptId === 'rp5_sp_2') {
      // Plural: There are
      const hasThereAre = lower.includes('there are');
      if (!hasThereAre) {
        return {
          valid: false,
          feedback: "💡 Remember to use 'There are' for two or more items (e.g. 'There are twenty classrooms' or 'There are many students')."
        };
      }
      return {
        valid: true,
        feedback: "🎉 Excellent! You correctly used 'There are' for plural nouns."
      };
    }

    const hasThere = lower.includes('there is') || lower.includes('there are') || lower.includes("there's");
    if (!hasThere) {
      return {
        valid: false,
        feedback: "💡 Practice using 'There is' (one item) or 'There are' (many items)."
      };
    }
    return {
      valid: true,
      feedback: "🎉 Great sentence! You practiced the There is / There are structure."
    };
  }

  return {
    valid: true,
    feedback: "🎉 Good English sentence! Well done."
  };
}
