// Home Academy — Complete Roleplay Presentations Data
// Comprehensive speaking practice scenarios: Everyday English & Physical Class Presentations
// Includes: Title, Situation, Characters, Dialogue, Practice Instructions, Vocab & Drills

export const OFFICIAL_ROLEPLAYS = [
  {
    "id": "rp_meeting_new",
    "number": "01",
    "title": "Meeting Someone New",
    "subtitle": "Introductions, polite greetings, and basic conversational questions",
    "icon": "🤝",
    "color": "#0A2558",
    "active": true,
    "situation": "You meet a new student at the English Language Academy library. You introduce yourself, ask polite questions about where they are from, their hobbies, and exchange contact information.",
    "scenario": "You meet a new student at the English Language Academy library. You introduce yourself, ask polite questions about where they are from, their hobbies, and exchange contact information.",
    "characters": [
      {
        "name": "Bilal",
        "role": "Academy Student",
        "avatar": "👨‍🎓"
      },
      {
        "name": "Sarah",
        "role": "New Student",
        "avatar": "👩‍🎓"
      }
    ],
    "practiceInstructions": [
      "Tap the audio button next to each dialogue line to hear natural pronunciation.",
      "Practice reading Bilal and Sarah's lines aloud to build speaking flow.",
      "Focus on polite intonation when introducing yourself and asking questions."
    ],
    "grammarFocus": [
      "Greetings & Introductions",
      "Present Simple Questions"
    ],
    "grammarDescription": "Practice introducing yourself with 'My name is...', 'I am from...', and asking polite questions with 'Where are you from?' and 'Nice to meet you.'",
    "imageContext": {
      "url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      "alt": "Two friendly students meeting and talking politely in a bright modern library",
      "photographer": "Brooke Cagle",
      "photographerUrl": "https://unsplash.com/@brookecagle",
      "searchQuery": "students talking polite meeting"
    },
    "spokenExpressions": [
      {
        "id": "rpmn_exp_1",
        "text": "Excuse me, is anyone sitting here?",
        "meaning": "A polite way to ask if an empty chair is available.",
        "context": "Approaching a table"
      },
      {
        "id": "rpmn_exp_2",
        "text": "Nice to meet you.",
        "meaning": "Standard polite greeting when meeting someone for the first time.",
        "context": "After sharing names"
      },
      {
        "id": "rpmn_exp_3",
        "text": "Where are you from originally?",
        "meaning": "Asking about someone's hometown or country politely.",
        "context": "Getting to know someone"
      },
      {
        "id": "rpmn_exp_4",
        "text": "How are you finding the classes so far?",
        "meaning": "Asking for their opinion on their new experience.",
        "context": "Casual conversation"
      },
      {
        "id": "rpmn_exp_5",
        "text": "Let's stay in touch.",
        "meaning": "Polite suggestion to exchange contact details and talk again.",
        "context": "Ending a conversation"
      }
    ],
    "keyVocab": [
      {
        "word": "Introduce",
        "meaning": "To tell someone another person's name or your own",
        "type": "Verb",
        "example": "Let me introduce myself."
      },
      {
        "word": "Originally",
        "meaning": "From the beginning or first place",
        "type": "Adverb",
        "example": "I am originally from Lahore."
      },
      {
        "word": "Engaging",
        "meaning": "Interesting and pleasant",
        "type": "Adjective",
        "example": "The class is very engaging."
      },
      {
        "word": "Classmate",
        "meaning": "A student in the same class",
        "type": "Noun",
        "example": "Sarah is my classmate."
      }
    ],
    "practiceQuestions": [
      {
        "id": "rpmn_q1",
        "type": "mcq",
        "question": "When meeting someone for the very first time after introducing yourself, what is the best phrase to say?",
        "options": [
          "Nice to meet you.",
          "Where is your car?",
          "Close the door now.",
          "I am very tired."
        ],
        "correct": 0,
        "explanation": "'Nice to meet you' is the standard polite greeting when making a new acquaintance."
      },
      {
        "id": "rpmn_q2",
        "type": "fill",
        "question": "Complete the polite question: 'Excuse me, ______ anyone sitting here?'",
        "options": [
          "is",
          "are",
          "do",
          "have"
        ],
        "correct": 0,
        "explanation": "'Is anyone sitting here?' uses singular 'is' with the indefinite pronoun 'anyone'."
      },
      {
        "id": "rpmn_q3",
        "type": "mcq",
        "question": "How do you politely ask someone about where they grew up?",
        "options": [
          "Where are you from originally?",
          "Why you here?",
          "Who bag you have?",
          "Where is your money?"
        ],
        "correct": 0,
        "explanation": "'Where are you from originally?' is the polite and natural way to ask about someone's origin."
      }
    ],
    "dialogue": [
      {
        "speaker": "Bilal",
        "text": "Hello! Excuse me, is anyone sitting here?",
        "urdu": "ہیلو! معاف کیجیے گا، کیا یہاں کوئی بیٹھا ہے؟"
      },
      {
        "speaker": "Sarah",
        "text": "Hi! No, the chair is free. Please sit down.",
        "urdu": "ہائے! نہیں، یہ کرسی خالی ہے۔ برائے مہربانی بیٹھ جائیں۔"
      },
      {
        "speaker": "Bilal",
        "text": "Thanks! I am Bilal. I study in Sir Zubair's English class.",
        "urdu": "شکریہ! میں بلال ہوں۔ میں سر زبیر کی انگلش کلاس میں پڑھتا ہوں۔"
      },
      {
        "speaker": "Sarah",
        "text": "Nice to meet you, Bilal! I am Sarah. I just joined the academy this week.",
        "urdu": "آپ سے مل کر خوشی ہوئی، بلال! میں سارہ ہوں۔ میں نے اسی ہفتے اکیڈمی جوائن کی ہے۔"
      },
      {
        "speaker": "Bilal",
        "text": "Welcome to the academy! Where are you from originally?",
        "urdu": "اکیڈمی میں خوش آمدید! آپ بنیادی طور پر کہاں سے ہیں؟"
      },
      {
        "speaker": "Sarah",
        "text": "I am originally from Lahore, but my family moved here last month.",
        "urdu": "میں بنیادی طور پر لاہور سے ہوں، لیکن میرا خاندان پچھلے مہینے یہاں شفٹ ہوا ہے۔"
      },
      {
        "speaker": "Bilal",
        "text": "That is wonderful! How are you finding the classes so far?",
        "urdu": "یہ تو بہت اچھی بات ہے! آپ کو کلاسز اب تک کیسی لگ رہی ہیں؟"
      },
      {
        "speaker": "Sarah",
        "text": "The lessons are really engaging, especially the grammar activities!",
        "urdu": "اسباق بہت دلچسپ ہیں، خاص طور پر گرامر کی سرگرمیاں!"
      }
    ],
    "miniRoleplay": {
      "roleA": "Bilal",
      "roleB": "Sarah",
      "starterSpeaker": "Bilal",
      "turns": [
        {
          "speaker": "Bilal",
          "text": "Hello! Excuse me, is anyone sitting here?",
          "options": [
            "Hi! No, the chair is free. Please sit down.",
            "I am eating an apple yesterday.",
            "Whose pen is on table?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Bilal",
          "text": "Thanks! I am Bilal. I study in Sir Zubair's English class.",
          "options": [
            "Nice to meet you, Bilal! I am Sarah. I just joined this week.",
            "My brother has three car.",
            "Where was you going tomorrow?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Bilal",
          "text": "Welcome to the academy! Where are you from originally?",
          "options": [
            "I am originally from Lahore, but my family moved here recently.",
            "There are two book on chair.",
            "Whose shoes this is?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Bilal",
          "text": "That is wonderful! Let us study together sometime.",
          "options": [
            "Sounds great! It was really nice meeting you.",
            "No pen in the house.",
            "Yesterday I am doctor."
          ],
          "correctIndex": 0
        }
      ]
    },
    "sentenceBuilderPrompts": [
      {
        "id": "rpmn_sp_1",
        "prompt": "Introduce yourself and say where you are from (e.g., 'My name is Ali and I am from Karachi.').",
        "targetCategory": "introduction"
      }
    ],
    "speakingDrills": [
      {
        "id": "rpmn_sd_1",
        "text": "Nice to meet you! My name is Bilal.",
        "phonetic": "Nays too meet yoo! May neym iz Bee-lahl."
      },
      {
        "id": "rpmn_sd_2",
        "text": "Where are you from originally?",
        "phonetic": "Wayr ar yoo fruhm uh-rij-uh-nuh-lee?"
      }
    ]
  },
  {
    "id": "rp_restaurant",
    "number": "02",
    "title": "At a Restaurant",
    "subtitle": "Requesting a table, ordering food and drinks, and asking for the bill",
    "icon": "🍽️",
    "color": "#0D9488",
    "active": true,
    "situation": "You and a friend arrive at a restaurant for lunch. You request a table, ask the waiter for recommendations, order food and drinks, and ask for the bill.",
    "scenario": "You and a friend arrive at a restaurant for lunch. You request a table, ask the waiter for recommendations, order food and drinks, and ask for the bill.",
    "characters": [
      {
        "name": "Waiter",
        "role": "Restaurant Server",
        "avatar": "👨‍🍳"
      },
      {
        "name": "Customer",
        "role": "Diner",
        "avatar": "🙋‍♂️"
      }
    ],
    "practiceInstructions": [
      "Tap the audio icon to listen to polite restaurant phrases.",
      "Practice using modal verbs like 'Could we have...' and 'I would like...'.",
      "Take turns playing the Customer and the Waiter."
    ],
    "grammarFocus": [
      "Polite Requests with 'Could'",
      "Ordering with 'Would like'"
    ],
    "grammarDescription": "Use 'Could we have a table...?' and 'I would like...' to make polite inquiries and food orders.",
    "imageContext": {
      "url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "alt": "Pleasant dining room in a restaurant with waiter serving guests",
      "photographer": "Jason Leung",
      "photographerUrl": "https://unsplash.com/@yxnleung",
      "searchQuery": "restaurant dining waiter customer"
    },
    "spokenExpressions": [
      {
        "id": "rprest_exp_1",
        "text": "Table for two, please.",
        "meaning": "Standard request for seating two people at a restaurant.",
        "context": "Arriving at restaurant"
      },
      {
        "id": "rprest_exp_2",
        "text": "Could we see the menu, please?",
        "meaning": "Polite request to look at the food listings.",
        "context": "Seated at table"
      },
      {
        "id": "rprest_exp_3",
        "text": "What do you recommend?",
        "meaning": "Asking the waiter for their advice on delicious dishes.",
        "context": "Deciding what to order"
      },
      {
        "id": "rprest_exp_4",
        "text": "I would like the grilled chicken, please.",
        "meaning": "Polite phrase to place your food order.",
        "context": "Ordering main dish"
      },
      {
        "id": "rprest_exp_5",
        "text": "Could we have the bill, please?",
        "meaning": "Polite request to pay at the end of the meal.",
        "context": "Finishing meal"
      }
    ],
    "keyVocab": [
      {
        "word": "Recommend",
        "meaning": "To suggest something as good or suitable",
        "type": "Verb",
        "example": "What dish do you recommend?"
      },
      {
        "word": "Delicious",
        "meaning": "Having a very pleasant taste",
        "type": "Adjective",
        "example": "The pasta is delicious."
      },
      {
        "word": "Bill / Check",
        "meaning": "A statement of money owed for food or service",
        "type": "Noun",
        "example": "Could we have the bill, please?"
      },
      {
        "word": "Beverage",
        "meaning": "A drink of any type",
        "type": "Noun",
        "example": "What beverages do you have?"
      }
    ],
    "practiceQuestions": [
      {
        "id": "rprest_q1",
        "type": "mcq",
        "question": "When ordering food politely at a restaurant, what is the best phrase to start with?",
        "options": [
          "I would like...",
          "Give me now...",
          "Bring food fast...",
          "You have food?"
        ],
        "correct": 0,
        "explanation": "'I would like...' is the universally polite way to order food in English."
      },
      {
        "id": "rprest_q2",
        "type": "fill",
        "question": "Complete the request for paying: 'Could we ______ the bill, please?'",
        "options": [
          "have",
          "has",
          "having",
          "had"
        ],
        "correct": 0,
        "explanation": "Modal verb 'could' is followed by the base form of the verb 'have'."
      },
      {
        "id": "rprest_q3",
        "type": "mcq",
        "question": "The waiter asks: 'Can I start you with something to drink?' How do you reply politely?",
        "options": [
          "I would like fresh orange juice, please.",
          "No juice in house.",
          "Where is your friend?",
          "Drink is there."
        ],
        "correct": 0,
        "explanation": "'I would like fresh orange juice, please' politely answers the drink inquiry."
      }
    ],
    "dialogue": [
      {
        "speaker": "Waiter",
        "text": "Good afternoon! Welcome to The Olive Tree. Table for two today?",
        "urdu": "سہ پہر بخیر! دی اولیو ٹری میں خوش آمدید۔ کیا دو افراد کے لیے میز درکار ہے؟"
      },
      {
        "speaker": "Customer",
        "text": "Yes, please. Could we have a table near the window?",
        "urdu": "جی ہاں، برائے مہربانی۔ کیا ہمیں کھڑکی کے پاس میز مل سکتی ہے؟"
      },
      {
        "speaker": "Waiter",
        "text": "Certainly! Here are your menus. Can I get you something to drink?",
        "urdu": "یقیناً! یہ رہے آپ کے مینو۔ کیا میں پینے کے لیے کچھ لا سکتا ہوں؟"
      },
      {
        "speaker": "Customer",
        "text": "I would like a fresh orange juice, please. What do you recommend for lunch?",
        "urdu": "مجھے تازہ مالٹے کا جوس چاہیے، برائے مہربانی۔ دوپہر کے کھانے کے لیے آپ کیا تجویز کرتے ہیں؟"
      },
      {
        "speaker": "Waiter",
        "text": "Our grilled chicken pasta with garlic bread is our specialty today.",
        "urdu": "ہمارا گرلڈ چکن پاستا گارلک بریڈ کے ساتھ آج کی خاص ڈش ہے۔"
      },
      {
        "speaker": "Customer",
        "text": "That sounds delicious! I will have the pasta, please.",
        "urdu": "یہ تو بہت مزیدار لگتا ہے! میں پاستا لوں گا، برائے مہربانی۔"
      },
      {
        "speaker": "Customer",
        "text": "Excuse me, could we have the bill, please?",
        "urdu": "معاف کیجیے گا، کیا ہمیں بل مل سکتا ہے، برائے مہربانی؟"
      },
      {
        "speaker": "Waiter",
        "text": "Of course! Here is your bill. Thank you for dining with us.",
        "urdu": "بالکل! یہ رہا آپ کا بل۔ ہمارے ہاں کھانا کھانے کا بہت شکریہ۔"
      }
    ],
    "miniRoleplay": {
      "roleA": "Waiter",
      "roleB": "Customer",
      "starterSpeaker": "Waiter",
      "turns": [
        {
          "speaker": "Waiter",
          "text": "Welcome! Table for how many people today?",
          "options": [
            "Table for two, please. Near the window if possible.",
            "There are two book yesterday.",
            "Whose car you have?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Waiter",
          "text": "Right this way! Can I start you with something to drink?",
          "options": [
            "I would like fresh lemon juice, please.",
            "Yesterday I am drinking soup.",
            "Who is door knocking?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Waiter",
          "text": "What would you like to order for your main meal?",
          "options": [
            "I would like the grilled chicken pasta, please.",
            "The brother is tall table.",
            "These are my friend car."
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Waiter",
          "text": "Enjoy your meal! Let me know if you need anything else.",
          "options": [
            "Thank you! Could we have the bill when you are free, please?",
            "No pen in the restaurant.",
            "Whose bag on chair?"
          ],
          "correctIndex": 0
        }
      ]
    },
    "sentenceBuilderPrompts": [
      {
        "id": "rprest_sp_1",
        "prompt": "Order a drink or food item politely using 'I would like...' (e.g. 'I would like a cold bottle of water, please.').",
        "targetCategory": "restaurant_order"
      }
    ],
    "speakingDrills": [
      {
        "id": "rprest_sd_1",
        "text": "Could we have a table near the window, please?",
        "phonetic": "Kood wee hav uh tey-buhl neer thuh win-doh, pleez?"
      },
      {
        "id": "rprest_sd_2",
        "text": "Could we have the bill, please?",
        "phonetic": "Kood wee hav thuh bil, pleez?"
      }
    ]
  },
  {
    "id": "rp_shopping",
    "number": "03",
    "title": "Shopping",
    "subtitle": "Asking about sizes, prices, trying on clothes, and paying at the counter",
    "icon": "🛍️",
    "color": "#8B5CF6",
    "active": true,
    "situation": "You visit a clothing store to buy a new jacket. You ask the shop assistant about sizes, colors, prices, try on the item, and pay with a credit card.",
    "scenario": "You visit a clothing store to buy a new jacket. You ask the shop assistant about sizes, colors, prices, try on the item, and pay with a credit card.",
    "characters": [
      {
        "name": "Shop Assistant",
        "role": "Store Staff",
        "avatar": "👩‍💼"
      },
      {
        "name": "Shopper",
        "role": "Customer",
        "avatar": "🛍️"
      }
    ],
    "practiceInstructions": [
      "Practice asking price using 'How much is this...?' or 'How much are these...?'.",
      "Listen to the audio pronunciation for adjectives like 'medium', 'comfortable', and 'perfect'.",
      "Rehearse the dialogue out loud with a partner."
    ],
    "grammarFocus": [
      "How Much (Price)",
      "Demonstrative Pronouns (This / These)"
    ],
    "grammarDescription": "Use 'How much is this jacket?' for singular items and 'How much are these shoes?' for plural items.",
    "imageContext": {
      "url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      "alt": "Modern boutique clothing store with stylish clothes on racks",
      "photographer": "Clark Street Merc.",
      "photographerUrl": "https://unsplash.com/@clark_street_mercantile",
      "searchQuery": "clothing store shopping boutique"
    },
    "spokenExpressions": [
      {
        "id": "rpshop_exp_1",
        "text": "Can I help you find anything?",
        "meaning": "Polite greeting by shop staff offering assistance.",
        "context": "Entering store"
      },
      {
        "id": "rpshop_exp_2",
        "text": "Do you have this in medium?",
        "meaning": "Asking for a specific clothing size.",
        "context": "Looking at clothes"
      },
      {
        "id": "rpshop_exp_3",
        "text": "Where are the fitting rooms?",
        "meaning": "Asking where to try clothes on.",
        "context": "Before trying on item"
      },
      {
        "id": "rpshop_exp_4",
        "text": "How much is this jacket?",
        "meaning": "Inquiring about the cost of a singular item.",
        "context": "Checking price"
      },
      {
        "id": "rpshop_exp_5",
        "text": "Can I pay by card?",
        "meaning": "Asking about electronic payment methods.",
        "context": "At the cash register"
      }
    ],
    "keyVocab": [
      {
        "word": "Fitting room",
        "meaning": "A small room where you try on clothes before buying",
        "type": "Noun",
        "example": "The fitting rooms are on the left."
      },
      {
        "word": "Discount",
        "meaning": "A reduction in the usual price",
        "type": "Noun",
        "example": "There is a 20% discount today."
      },
      {
        "word": "Receipt",
        "meaning": "A paper proof of purchase",
        "type": "Noun",
        "example": "Here is your receipt."
      },
      {
        "word": "Fit",
        "meaning": "To be the right size or shape",
        "type": "Verb",
        "example": "This jacket fits very well."
      }
    ],
    "practiceQuestions": [
      {
        "id": "rpshop_q1",
        "type": "mcq",
        "question": "When you want to know the price of one single jacket, what should you ask?",
        "options": [
          "How much is this jacket?",
          "How much are this jacket?",
          "Who jacket is price?",
          "Where is jacket cost?"
        ],
        "correct": 0,
        "explanation": "Use 'How much is' for singular items like a jacket."
      },
      {
        "id": "rpshop_q2",
        "type": "fill",
        "question": "Complete the customer question: 'Do you have this ______ size medium?'",
        "options": [
          "in",
          "on",
          "at",
          "by"
        ],
        "correct": 0,
        "explanation": "We say 'in size medium' or 'in size small'."
      },
      {
        "id": "rpshop_q3",
        "type": "mcq",
        "question": "The assistant asks: 'How would you like to pay?' What is a correct response?",
        "options": [
          "I will pay by credit card, please.",
          "I am doctor.",
          "Whose shoe are these?",
          "No jacket in the room."
        ],
        "correct": 0,
        "explanation": "'I will pay by credit card, please' directly answers the payment inquiry."
      }
    ],
    "dialogue": [
      {
        "speaker": "Shop Assistant",
        "text": "Hello! Can I help you find anything today?",
        "urdu": "ہیلو! کیا میں آج کچھ ڈھونڈنے میں آپ کی مدد کر سکتا ہوں؟"
      },
      {
        "speaker": "Shopper",
        "text": "Hello! Yes, I am looking for a warm jacket for winter.",
        "urdu": "ہیلو! جی ہاں، میں سردیوں کے لیے ایک گرم جیکٹ تلاش کر رہا ہوں۔"
      },
      {
        "speaker": "Shop Assistant",
        "text": "We have these new navy blue jackets. What size do you wear?",
        "urdu": "ہمارے پاس یہ نئی نیوی بلیو جیکٹس ہیں۔ آپ کون سا سائز پہنتے ہیں؟"
      },
      {
        "speaker": "Shopper",
        "text": "I wear medium. Do you have this jacket in medium?",
        "urdu": "میں میڈیم پہنتا ہوں۔ کیا آپ کے پاس یہ جیکٹ میڈیم سائز میں ہے؟"
      },
      {
        "speaker": "Shop Assistant",
        "text": "Yes! Here is a medium. The fitting rooms are right over there.",
        "urdu": "جی ہاں! یہ میڈیم ہے۔ ٹرائل روم بالکل ادھر ہے۔"
      },
      {
        "speaker": "Shopper",
        "text": "It fits perfectly! How much is this jacket?",
        "urdu": "یہ بالکل صحیح آئی ہے! اس جیکٹ کی قیمت کتنی ہے؟"
      },
      {
        "speaker": "Shop Assistant",
        "text": "It is fifty dollars. There is also a ten percent discount today.",
        "urdu": "یہ پچاس ڈالر کی ہے۔ آج دس فیصد رعایت بھی ہے۔"
      },
      {
        "speaker": "Shopper",
        "text": "That is great! I will take it. Can I pay by card?",
        "urdu": "یہ تو بہترین ہے! میں یہ لوں گا۔ کیا میں کارڈ سے ادائیگی کر سکتا ہوں؟"
      },
      {
        "speaker": "Shop Assistant",
        "text": "Certainly! Please tap your card here. Here is your receipt!",
        "urdu": "یقیناً! برائے مہربانی اپنا کارڈ یہاں ٹیپ کریں۔ یہ رہی آپ کی رسید!"
      }
    ],
    "miniRoleplay": {
      "roleA": "Shop Assistant",
      "roleB": "Shopper",
      "starterSpeaker": "Shop Assistant",
      "turns": [
        {
          "speaker": "Shop Assistant",
          "text": "Hello! Can I help you find anything today?",
          "options": [
            "Yes, please. I am looking for a warm winter jacket.",
            "There are two book on my desk.",
            "Whose car is knocking?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Shop Assistant",
          "text": "What size do you wear?",
          "options": [
            "I wear medium. Do you have this in medium?",
            "My brother is tall tomorrow.",
            "Yesterday I am in shop."
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Shop Assistant",
          "text": "Here is a medium in navy blue. Would you like to try it on?",
          "options": [
            "Yes, thank you! Where are the fitting rooms?",
            "No pen in the fitting room.",
            "Whose shoe are this?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Shop Assistant",
          "text": "It looks great on you! That will be forty-five dollars after discount.",
          "options": [
            "Wonderful! Can I pay by credit card, please?",
            "My shoes is a doctor.",
            "Who bag is table?"
          ],
          "correctIndex": 0
        }
      ]
    },
    "sentenceBuilderPrompts": [
      {
        "id": "rpshop_sp_1",
        "prompt": "Ask the price of an item using 'How much is...' (e.g. 'How much is this blue shirt?').",
        "targetCategory": "shopping_price"
      }
    ],
    "speakingDrills": [
      {
        "id": "rpshop_sd_1",
        "text": "How much is this jacket, please?",
        "phonetic": "How much iz this jak-it, pleez?"
      },
      {
        "id": "rpshop_sd_2",
        "text": "Do you have this jacket in medium size?",
        "phonetic": "Doo yoo hav this jak-it in mee-dee-uhm sayz?"
      }
    ]
  },
  {
    "id": "rp_airport",
    "number": "04",
    "title": "At the Airport",
    "subtitle": "Checking in, baggage drop, boarding pass, and finding your departure gate",
    "icon": "✈️",
    "color": "#0284C7",
    "active": true,
    "situation": "You arrive at the airport check-in desk for an international flight. The airline agent verifies your passport, weighs your luggage, issues your boarding pass, and directs you to the departure gate.",
    "scenario": "You arrive at the airport check-in desk for an international flight. The airline agent verifies your passport, weighs your luggage, issues your boarding pass, and directs you to the departure gate.",
    "characters": [
      {
        "name": "Check-in Agent",
        "role": "Airline Staff",
        "avatar": "👨‍✈️"
      },
      {
        "name": "Traveler",
        "role": "Passenger",
        "avatar": "🧳"
      }
    ],
    "practiceInstructions": [
      "Listen to the airport travel vocabulary and polite responses.",
      "Practice clear pronunciation when stating seat preferences ('Could I have a window seat?').",
      "Perform the dialogue with confidence and proper travel terminology."
    ],
    "grammarFocus": [
      "Polite Requests with 'Could'",
      "Numbers & Information Inquiries"
    ],
    "grammarDescription": "Practice answering check-in questions clearly with accurate numbers and polite inquiries.",
    "imageContext": {
      "url": "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80",
      "alt": "Clean modern airport terminal with passengers checking in at airline counter",
      "photographer": "Nick Herasimenka",
      "photographerUrl": "https://unsplash.com/@herasimenka",
      "searchQuery": "airport check in counter terminal travel"
    },
    "spokenExpressions": [
      {
        "id": "rpapt_exp_1",
        "text": "May I see your passport and ticket, please?",
        "meaning": "Standard request by airline check-in staff.",
        "context": "At the check-in desk"
      },
      {
        "id": "rpapt_exp_2",
        "text": "How many bags are you checking in?",
        "meaning": "Asking how many suitcases will go in the aircraft cargo.",
        "context": "Baggage drop"
      },
      {
        "id": "rpapt_exp_3",
        "text": "Could I have a window seat, please?",
        "meaning": "Polite request for seating preference next to the window.",
        "context": "Seat assignment"
      },
      {
        "id": "rpapt_exp_4",
        "text": "Boarding begins at Gate 24.",
        "meaning": "Information about departure location and time.",
        "context": "Receiving boarding pass"
      },
      {
        "id": "rpapt_exp_5",
        "text": "Have a safe flight!",
        "meaning": "Polite travel farewell.",
        "context": "Finishing check-in"
      }
    ],
    "keyVocab": [
      {
        "word": "Boarding pass",
        "meaning": "A document providing passenger boarding permission and seat assignment",
        "type": "Noun",
        "example": "Here is your boarding pass."
      },
      {
        "word": "Luggage / Baggage",
        "meaning": "Suitcases or bags for traveling",
        "type": "Noun",
        "example": "Place your luggage on the scale."
      },
      {
        "word": "Departure",
        "meaning": "The act of leaving a place",
        "type": "Noun",
        "example": "The departure gate is 24."
      },
      {
        "word": "Carry-on",
        "meaning": "Small luggage allowed inside the cabin",
        "type": "Noun",
        "example": "I only have one carry-on bag."
      }
    ],
    "practiceQuestions": [
      {
        "id": "rpapt_q1",
        "type": "mcq",
        "question": "What document must you present when the airline check-in agent asks: 'May I see your travel documents?'",
        "options": [
          "My passport and ticket confirmation.",
          "My brother's watch.",
          "A picture of a dog.",
          "My grocery receipt."
        ],
        "correct": 0,
        "explanation": "Your passport and booking confirmation/ticket are required for check-in."
      },
      {
        "id": "rpapt_q2",
        "type": "fill",
        "question": "Complete the seating request: 'Could I ______ a window seat, please?'",
        "options": [
          "have",
          "has",
          "had",
          "having"
        ],
        "correct": 0,
        "explanation": "Base form 'have' follows the modal verb 'could'."
      },
      {
        "id": "rpapt_q3",
        "type": "mcq",
        "question": "The agent says: 'Boarding starts at 10:30 AM at Gate 12. Have a safe flight!' What is the polite response?",
        "options": [
          "Thank you very much! Have a great day.",
          "Where are shoes?",
          "I have three brother.",
          "Who pen is this?"
        ],
        "correct": 0,
        "explanation": "'Thank you very much! Have a great day' is the polite way to conclude check-in."
      }
    ],
    "dialogue": [
      {
        "speaker": "Check-in Agent",
        "text": "Good morning! Welcome to Emirates Airlines. May I see your passport and ticket?",
        "urdu": "صبح بخیر! امارات ایئر لائنز میں خوش آمدید۔ کیا میں آپ کا پاسپورٹ اور ٹکٹ دیکھ سکتا ہوں؟"
      },
      {
        "speaker": "Traveler",
        "text": "Good morning! Here is my passport and booking confirmation.",
        "urdu": "صبح بخیر! یہ رہا میرا پاسپورٹ اور بکنگ کنفرمیشن۔"
      },
      {
        "speaker": "Check-in Agent",
        "text": "Thank you! How many bags are you checking in today?",
        "urdu": "شکریہ! آج آپ کتنے بیگز چیک ان کروا رہے ہیں؟"
      },
      {
        "speaker": "Traveler",
        "text": "Just this one suitcase, and I have a small backpack as carry-on.",
        "urdu": "صرف یہ ایک سوٹ کیس، اور میرے پاس ہینڈ کیری کے طور پر ایک چھوٹا بیگ ہے۔"
      },
      {
        "speaker": "Check-in Agent",
        "text": "Please place your suitcase on the scale. Perfect, twenty kilograms.",
        "urdu": "برائے مہربانی اپنا سوٹ کیس ترازو پر رکھیں۔ بالکل ٹھیک، بیس کلوگرام۔"
      },
      {
        "speaker": "Traveler",
        "text": "Could I have a window seat, please?",
        "urdu": "کیا مجھے کھڑکی کے ساتھ والی سیٹ مل سکتی ہے، برائے مہربانی؟"
      },
      {
        "speaker": "Check-in Agent",
        "text": "Yes! Seat 14A is available. Here is your boarding pass. Boarding begins at Gate 24.",
        "urdu": "جی ہاں! سیٹ 14A دستیاب ہے۔ یہ رہا آپ کا بورڈنگ پاس۔ بورڈنگ گیٹ 24 پر شروع ہوگی۔"
      },
      {
        "speaker": "Traveler",
        "text": "Thank you very much! Have a wonderful day.",
        "urdu": "آپ کا بہت بہت شکریہ! آپ کا دن اچھا گزرے۔"
      }
    ],
    "miniRoleplay": {
      "roleA": "Check-in Agent",
      "roleB": "Traveler",
      "starterSpeaker": "Check-in Agent",
      "turns": [
        {
          "speaker": "Check-in Agent",
          "text": "Good morning! May I see your passport and ticket?",
          "options": [
            "Good morning! Here is my passport and booking confirmation.",
            "There are two pencil in my pocket.",
            "Whose airport is this?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Check-in Agent",
          "text": "How many bags are you checking in today?",
          "options": [
            "Just one suitcase, and one small backpack as carry-on.",
            "Yesterday I am flying plane.",
            "My friend brother is doctor."
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Check-in Agent",
          "text": "Would you prefer an aisle seat or a window seat?",
          "options": [
            "Could I have a window seat, please?",
            "No seat in the plane.",
            "Whose watch on table?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Check-in Agent",
          "text": "Here is your boarding pass. Gate 24, boarding at 10:15 AM. Safe flight!",
          "options": [
            "Thank you so much! Have a wonderful day.",
            "My brother is a pen.",
            "These shoes is green."
          ],
          "correctIndex": 0
        }
      ]
    },
    "sentenceBuilderPrompts": [
      {
        "id": "rpapt_sp_1",
        "prompt": "Politely request a seat or assistance at the airport using 'Could I have...' (e.g. 'Could I have a window seat, please?').",
        "targetCategory": "airport_request"
      }
    ],
    "speakingDrills": [
      {
        "id": "rpapt_sd_1",
        "text": "Could I have a window seat, please?",
        "phonetic": "Kood eye hav uh win-doh seet, pleez?"
      },
      {
        "id": "rpapt_sd_2",
        "text": "Here is my passport and booking confirmation.",
        "phonetic": "Heer iz may pas-port and boo-king kon-fer-may-shuhn."
      }
    ]
  },
  {
    "id": "rp_job_interview",
    "number": "05",
    "title": "Job Interview",
    "subtitle": "Professional introduction, describing skills, experience, and asking job questions",
    "icon": "💼",
    "color": "#4F46E5",
    "active": true,
    "situation": "You attend an in-person job interview for an administrative assistant position. The hiring manager welcomes you, asks about your qualifications, strengths, and interest in the company.",
    "scenario": "You attend an in-person job interview for an administrative assistant position. The hiring manager welcomes you, asks about your qualifications, strengths, and interest in the company.",
    "characters": [
      {
        "name": "Interviewer",
        "role": "Hiring Manager",
        "avatar": "👔"
      },
      {
        "name": "Candidate",
        "role": "Job Applicant",
        "avatar": "👩‍💼"
      }
    ],
    "practiceInstructions": [
      "Speak with a clear, calm, professional tone.",
      "Use descriptive adjectives to explain your strengths (e.g. organized, reliable, hard-working).",
      "Practice answering standard interview questions aloud."
    ],
    "grammarFocus": [
      "Adjectives for Personality & Skills",
      "Professional Present Tense"
    ],
    "grammarDescription": "Use professional descriptive adjectives like 'organized', 'punctual', 'motivated', and 'team player'.",
    "imageContext": {
      "url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      "alt": "Professional job interview in a modern conference room with confident applicant",
      "photographer": "Amy Hirschi",
      "photographerUrl": "https://unsplash.com/@amyhirschi",
      "searchQuery": "job interview professional conference office"
    },
    "spokenExpressions": [
      {
        "id": "rpjob_exp_1",
        "text": "Thank you for inviting me for this interview.",
        "meaning": "Professional opening expression of gratitude.",
        "context": "Beginning of interview"
      },
      {
        "id": "rpjob_exp_2",
        "text": "Could you tell me a little about yourself?",
        "meaning": "Standard opening question asked by interviewers.",
        "context": "Interviewer prompt"
      },
      {
        "id": "rpjob_exp_3",
        "text": "I am very organized and detail-oriented.",
        "meaning": "Describing personal workplace strengths with professional adjectives.",
        "context": "Discussing strengths"
      },
      {
        "id": "rpjob_exp_4",
        "text": "I enjoy working as part of a team.",
        "meaning": "Highlighting collaboration skills.",
        "context": "Explaining work style"
      },
      {
        "id": "rpjob_exp_5",
        "text": "Do you have any questions for us?",
        "meaning": "Opportunity for candidate to show interest.",
        "context": "End of interview"
      }
    ],
    "keyVocab": [
      {
        "word": "Punctual",
        "meaning": "Arriving or doing things at the exact expected time",
        "type": "Adjective",
        "example": "I am always punctual and reliable."
      },
      {
        "word": "Organized",
        "meaning": "Arranged neatly and handling tasks efficiently",
        "type": "Adjective",
        "example": "She is very organized."
      },
      {
        "word": "Qualification",
        "meaning": "A skill or certification that makes you suitable for a job",
        "type": "Noun",
        "example": "I have the right qualifications."
      },
      {
        "word": "Opportunity",
        "meaning": "A good chance for advancement or progress",
        "type": "Noun",
        "example": "Thank you for this great opportunity."
      }
    ],
    "practiceQuestions": [
      {
        "id": "rpjob_q1",
        "type": "mcq",
        "question": "When the interviewer says: 'Please have a seat and make yourself comfortable,' what is the best reply?",
        "options": [
          "Thank you very much. Good morning!",
          "Why are you sitting?",
          "Give me the job now.",
          "I am tired today."
        ],
        "correct": 0,
        "explanation": "'Thank you very much. Good morning!' shows polite, professional decorum."
      },
      {
        "id": "rpjob_q2",
        "type": "fill",
        "question": "Complete the strength statement: 'I am very ______ and reliable.'",
        "options": [
          "organized",
          "organizing",
          "organize",
          "organizer"
        ],
        "correct": 0,
        "explanation": "Adjective 'organized' describes a professional skill/attribute."
      },
      {
        "id": "rpjob_q3",
        "type": "mcq",
        "question": "When the interviewer asks: 'Do you have any questions for me?', what is a great professional response?",
        "options": [
          "Could you tell me more about the day-to-day responsibilities?",
          "No questions, I want to leave.",
          "How much money you have?",
          "Who car is outside?"
        ],
        "correct": 0,
        "explanation": "Asking about daily responsibilities shows genuine interest and professional initiative."
      }
    ],
    "dialogue": [
      {
        "speaker": "Interviewer",
        "text": "Good morning! Welcome to Apex Global. Please have a seat.",
        "urdu": "صبح بخیر! ایپکس گلوبل میں خوش آمدید۔ برائے مہربانی تشریف رکھیں۔"
      },
      {
        "speaker": "Candidate",
        "text": "Good morning! Thank you very much for inviting me for this interview.",
        "urdu": "صبح بخیر! مجھے اس انٹرویو کے لیے مدعو کرنے کا بہت بہت شکریہ۔"
      },
      {
        "speaker": "Interviewer",
        "text": "To start, could you please tell me a little bit about yourself?",
        "urdu": "شروعات کے لیے، کیا آپ مجھے اپنے بارے میں کچھ بتا سکتے ہیں؟"
      },
      {
        "speaker": "Candidate",
        "text": "Certainly. My name is Ali. I have a diploma in business and two years of office experience.",
        "urdu": "یقیناً۔ میرا نام علی ہے۔ میرے پاس بزنس میں ڈپلومہ اور دو سال کا دفتری تجربہ ہے۔"
      },
      {
        "speaker": "Interviewer",
        "text": "What do you consider your greatest strength?",
        "urdu": "آپ اپنی سب سے بڑی خوبی کسے سمجھتے ہیں؟"
      },
      {
        "speaker": "Candidate",
        "text": "I am very organized, punctual, and communicate clearly with team members.",
        "urdu": "میں بہت منظم، وقت کا پابند ہوں، اور ٹیم کے ارکان سے واضح بات چیت کرتا ہوں۔"
      },
      {
        "speaker": "Interviewer",
        "text": "Why would you like to work with our organization?",
        "urdu": "آپ ہمارے ادارے کے ساتھ کیوں کام کرنا چاہتے ہیں؟"
      },
      {
        "speaker": "Candidate",
        "text": "I admire your company's positive work culture and know I can contribute positively.",
        "urdu": "میں آپ کی کمپنی کے مثبت ماحول کو پسند کرتا ہوں اور مجھے معلوم ہے کہ میں مثبت کردار ادا کر سکتا ہوں۔"
      },
      {
        "speaker": "Interviewer",
        "text": "Thank you, Ali. We will notify you about the next steps by Monday.",
        "urdu": "شکریہ، علی۔ ہم پیر تک اگلے مراحل کے بارے میں آپ کو مطلع کریں گے۔"
      },
      {
        "speaker": "Candidate",
        "text": "Thank you for your time and consideration! Have a great day.",
        "urdu": "آپ کے وقت اور توجہ کا شکریہ! آپ کا دن اچھا گزرے۔"
      }
    ],
    "miniRoleplay": {
      "roleA": "Interviewer",
      "roleB": "Candidate",
      "starterSpeaker": "Interviewer",
      "turns": [
        {
          "speaker": "Interviewer",
          "text": "Good morning! Thank you for coming in today. Please take a seat.",
          "options": [
            "Good morning! Thank you very much for having me today.",
            "There is two chair on the desk.",
            "Whose pen is this?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Interviewer",
          "text": "Could you tell me about your background and experience?",
          "options": [
            "Certainly. I have two years of office administration experience and strong computer skills.",
            "Yesterday I am doctor in school.",
            "My brother shoes is brown."
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Interviewer",
          "text": "What would you say is your greatest strength in the workplace?",
          "options": [
            "I am very organized, punctual, and a dependable team worker.",
            "No work in the house.",
            "Who bag is on table?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Interviewer",
          "text": "Thank you! Do you have any questions before we conclude?",
          "options": [
            "Could you tell me more about the daily responsibilities of this role?",
            "These is my friend.",
            "I am eat lunch tomorrow."
          ],
          "correctIndex": 0
        }
      ]
    },
    "sentenceBuilderPrompts": [
      {
        "id": "rpjob_sp_1",
        "prompt": "Describe yourself or your work strengths using adjectives (e.g. 'I am organized, punctual, and hard-working.').",
        "targetCategory": "job_strengths"
      }
    ],
    "speakingDrills": [
      {
        "id": "rpjob_sd_1",
        "text": "Thank you for inviting me for this interview.",
        "phonetic": "Thank yoo for in-vay-ting mee for this in-ter-vyoo."
      },
      {
        "id": "rpjob_sd_2",
        "text": "I am very organized, punctual, and reliable.",
        "phonetic": "Eye am ve-ree or-guh-nayzd, punk-choo-uhl, and ree-lay-uh-buhl."
      }
    ]
  },
  {
    "id": "rp_01",
    "number": "06",
    "title": "A Friend Visits Another Friend's House",
    "subtitle": "Describing people, rooms, and items in the house using adjectives",
    "icon": "🏡",
    "color": "#0A2558",
    "active": true,
    "situation": "You are visiting your friend's house. You talk about the people and things in the house and describe them using adjectives.",
    "scenario": "You are visiting your friend's house. You talk about the people and things in the house and describe them using adjectives.",
    "characters": [
      {
        "name": "Host Friend",
        "role": "Homeowner",
        "avatar": "🏠"
      },
      {
        "name": "Guest Friend",
        "role": "Visitor",
        "avatar": "🙋‍♂️"
      }
    ],
    "practiceInstructions": [
      "Practice using descriptive adjectives (clean, spacious, comfortable, friendly).",
      "Listen to the audio pronunciation for polite home greetings.",
      "Practice the full conversation out loud."
    ],
    "grammarFocus": [
      "Adjectives"
    ],
    "grammarDescription": "Use descriptive words (adjectives) such as tall, friendly, helpful, clean, big, tidy, and modern to describe people, rooms, and furniture.",
    "imageContext": {
      "url": "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
      "alt": "Friends having a polite and comfortable conversation inside a clean living room",
      "photographer": "Priscilla Du Preez",
      "photographerUrl": "https://unsplash.com/@priscilladupreez",
      "searchQuery": "clean big living room conversation"
    },
    "spokenExpressions": [
      {
        "id": "rp1_exp_1",
        "text": "Welcome to my house.",
        "meaning": "A polite and warm greeting when someone arrives at your home.",
        "context": "Greeting guest at entrance"
      },
      {
        "id": "rp1_exp_2",
        "text": "Make yourself comfortable.",
        "meaning": "Telling your guest to relax and feel at home.",
        "context": "Inviting guest to sit down"
      },
      {
        "id": "rp1_exp_3",
        "text": "Who is knocking on the door?",
        "meaning": "Asking about someone making a sound outside the entrance.",
        "context": "Hearing a knock"
      },
      {
        "id": "rp1_exp_4",
        "text": "My brother is helpful and friendly.",
        "meaning": "Describing a family member's positive personality traits.",
        "context": "Introducing or describing family"
      },
      {
        "id": "rp1_exp_5",
        "text": "That's nice.",
        "meaning": "A friendly response showing you appreciate what the other person said.",
        "context": "Responding politely"
      },
      {
        "id": "rp1_exp_6",
        "text": "Is your brother tall?",
        "meaning": "Asking about physical appearance using an adjective.",
        "context": "Asking about a person"
      },
      {
        "id": "rp1_exp_7",
        "text": "Your living room is very clean and big.",
        "meaning": "Complimenting a room using descriptive adjectives.",
        "context": "Complimenting the host's house"
      },
      {
        "id": "rp1_exp_8",
        "text": "Thank you for visiting. See you again.",
        "meaning": "Polite farewell when a guest leaves.",
        "context": "Saying goodbye at the door"
      }
    ],
    "keyVocab": [
      {
        "word": "Friendly",
        "meaning": "Kind and pleasant to others",
        "type": "Adjective",
        "example": "He is very friendly."
      },
      {
        "word": "Helpful",
        "meaning": "Ready to assist or give help",
        "type": "Adjective",
        "example": "My sister is helpful."
      },
      {
        "word": "Comfortable",
        "meaning": "Relaxing and pleasant",
        "type": "Adjective",
        "example": "This sofa is comfortable."
      },
      {
        "word": "Spacious / Big",
        "meaning": "Having a lot of room or space",
        "type": "Adjective",
        "example": "The kitchen is big."
      },
      {
        "word": "Clean / Tidy",
        "meaning": "Free from dirt, neat and organized",
        "type": "Adjective",
        "example": "Your room is clean."
      }
    ],
    "practiceQuestions": [
      {
        "id": "rp1_q1",
        "type": "mcq",
        "question": "When a guest arrives at your front door, what is the best greeting to say?",
        "options": [
          "Welcome to my house.",
          "Where are my shoes?",
          "Close the door now.",
          "I am very tired."
        ],
        "correct": 0,
        "explanation": "'Welcome to my house' is the polite, friendly greeting taught for inviting someone inside."
      },
      {
        "id": "rp1_q2",
        "type": "fill",
        "question": "Complete the compliment: 'Your living room is very ______ and big.'",
        "options": [
          "clean",
          "shout",
          "yesterday",
          "door"
        ],
        "correct": 0,
        "explanation": "'Clean' is an adjective that describes the pleasant condition of the room."
      },
      {
        "id": "rp1_q3",
        "type": "expression_match",
        "question": "Your friend says: 'Make yourself comfortable.' What does this mean?",
        "options": [
          "Please relax and feel at home.",
          "Please clean my room.",
          "You should leave now.",
          "Please stand outside."
        ],
        "correct": 0,
        "explanation": "'Make yourself comfortable' means sit down, relax, and feel at home."
      }
    ],
    "dialogue": [
      {
        "speaker": "Host",
        "text": "Welcome to my house! Please make yourself comfortable.",
        "urdu": "میرے گھر میں خوش آمدید! برائے مہربانی آرام سے بیٹھیں۔"
      },
      {
        "speaker": "Guest",
        "text": "Thank you! Your living room is very big and clean.",
        "urdu": "شکریہ! آپ کا لاؤنج بہت بڑا اور صاف ستھرا ہے۔"
      },
      {
        "speaker": "Host",
        "text": "Thank you! That is my brother in the picture. He is very helpful and friendly.",
        "urdu": "شکریہ! یہ تصویر میں میرا بھائی ہے۔ وہ بہت مددگار اور ملنسار ہے۔"
      },
      {
        "speaker": "Guest",
        "text": "That is nice! Is your brother tall?",
        "urdu": "یہ تو بہت اچھا ہے! کیا آپ کا بھائی لمبا ہے؟"
      },
      {
        "speaker": "Host",
        "text": "Yes, he is tall. Thank you for visiting my home today.",
        "urdu": "جی ہاں، وہ لمبا ہے۔ آج میرے گھر آنے کا بہت شکریہ۔"
      },
      {
        "speaker": "Guest",
        "text": "Thank you for having me! See you again soon.",
        "urdu": "مجھے بلانے کا شکریہ! جلد دوبارہ ملاقات ہوگی۔"
      }
    ],
    "miniRoleplay": {
      "roleA": "Friend (Host)",
      "roleB": "Friend (Guest)",
      "starterSpeaker": "Host",
      "turns": [
        {
          "speaker": "Host",
          "text": "Welcome to my house! Please make yourself comfortable.",
          "options": [
            "Thank you! Your living room is very big and clean.",
            "I want to go to school now.",
            "Whose car are you?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Host",
          "text": "Thank you! That is my brother in the picture. He is very helpful and friendly.",
          "options": [
            "That's nice! Is your brother tall?",
            "What color are your yesterday?",
            "Who bag is this table?"
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Host",
          "text": "Yes, he is tall. Would you like some cold juice?",
          "options": [
            "Yes, please! That would be lovely.",
            "My brother is a pen.",
            "There are two book."
          ],
          "correctIndex": 0
        },
        {
          "speaker": "Host",
          "text": "Here you go! Thank you for visiting my home today.",
          "options": [
            "Thank you for having me! See you again soon.",
            "The door is chair.",
            "Yesterday car run."
          ],
          "correctIndex": 0
        }
      ]
    },
    "sentenceBuilderPrompts": [
      {
        "id": "rp1_sp_1",
        "prompt": "Describe a person in your family using at least two adjectives (e.g. 'My sister is helpful and friendly.').",
        "targetCategory": "person",
        "requiredAdjectives": [
          "helpful",
          "friendly",
          "tall",
          "kind",
          "smart",
          "nice",
          "polite"
        ]
      }
    ],
    "speakingDrills": [
      {
        "id": "rp1_sd_1",
        "text": "Welcome to my house. Make yourself comfortable.",
        "phonetic": "Wel-kuhm too may hows. Meyk yor-self kuhm-fer-tuh-buhl."
      },
      {
        "id": "rp1_sd_2",
        "text": "My brother is helpful and friendly.",
        "phonetic": "May bruh-ther iz help-fuhl and frend-lee."
      }
    ]
  },
  {
    "id": "rp_02",
    "number": "07",
    "title": "A Police Officer Asks Questions About Possessions",
    "subtitle": "Ownership, identification, and questions using Whose and Genitive 's",
    "icon": "👮",
    "color": "#0891b2",
    "active": true,
    "situation": "A police officer is investigating an incident. He asks about ownership of various items using 'Whose' and names people with Genitive 's.",
    "scenario": "A police officer is investigating an incident. He asks about ownership of various items using 'Whose' and names people with Genitive 's.",
    "characters": [
      {
        "name": "Officer",
        "role": "Police Officer",
        "avatar": "👮‍♂️"
      },
      {
        "name": "Citizen",
        "role": "Witness",
        "avatar": "👤"
      }
    ],
    "practiceInstructions": [
      "Practice asking ownership using 'Whose bag is this?'.",
      "Answer with Genitive 's (e.g. 'It is Ahmed's bag.').",
      "Repeat the dialogue clearly."
    ],
    "grammarFocus": [
      "Genitive 's",
      "Whose"
    ],
    "grammarDescription": "Use 'Whose' to ask about possession and 's to show that something belongs to someone.",
    "imageContext": {
      "url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      "alt": "Polite police officer questioning a witness with a notepad",
      "photographer": "Sora Shimazaki",
      "photographerUrl": "https://unsplash.com/@sora-shimazaki",
      "searchQuery": "police officer investigation questioning"
    },
    "spokenExpressions": [
      {
        "id": "rp2_exp_1",
        "text": "Whose bag is this?",
        "meaning": "Asking who owns the bag.",
        "context": "Inspecting an item"
      },
      {
        "id": "rp2_exp_2",
        "text": "It is Ahmed's bag.",
        "meaning": "Stating ownership using the Genitive 's.",
        "context": "Identifying owner"
      },
      {
        "id": "rp2_exp_3",
        "text": "Are you sure?",
        "meaning": "Asking for confirmation of a statement.",
        "context": "Confirming details"
      }
    ],
    "keyVocab": [
      {
        "word": "Belong to",
        "meaning": "To be owned by someone",
        "type": "Verb",
        "example": "Does this belong to you?"
      },
      {
        "word": "Witness",
        "meaning": "A person who sees an event take place",
        "type": "Noun",
        "example": "The witness spoke clearly."
      }
    ],
    "practiceQuestions": [
      {
        "id": "rp2_q1",
        "type": "mcq",
        "question": "Which question correctly asks about ownership of a bag?",
        "options": [
          "Whose bag is this?",
          "Who bag is this?",
          "Where bag is this?",
          "Whose is bag this?"
        ],
        "correct": 0,
        "explanation": "'Whose bag is this?' is the correct question structure."
      }
    ],
    "dialogue": [
      {
        "speaker": "Officer",
        "text": "Excuse me, whose bag is this on the bench?",
        "urdu": "معاف کیجیے گا، بینچ پر یہ بیگ کس کا ہے؟"
      },
      {
        "speaker": "Citizen",
        "text": "It is Ahmed's bag. He left it here a moment ago.",
        "urdu": "یہ احمد کا بیگ ہے۔ وہ کچھ دیر پہلے اسے یہاں چھوڑ گیا تھا۔"
      },
      {
        "speaker": "Officer",
        "text": "Thank you for the information, Sir.",
        "urdu": "معلومات کا شکریہ، جناب۔"
      }
    ],
    "miniRoleplay": {
      "roleA": "Officer",
      "roleB": "Citizen",
      "starterSpeaker": "Officer",
      "turns": [
        {
          "speaker": "Officer",
          "text": "Excuse me, whose bag is this on the bench?",
          "options": [
            "It is Ahmed's bag. He left it here.",
            "There are two car.",
            "Who bag you have?"
          ],
          "correctIndex": 0
        }
      ]
    },
    "sentenceBuilderPrompts": [
      {
        "id": "rp2_sp_1",
        "prompt": "State that an item belongs to a specific person using Genitive 's (e.g. 'It is Ali's notebook.').",
        "targetCategory": "possession"
      }
    ],
    "speakingDrills": [
      {
        "id": "rp2_sd_1",
        "text": "Whose bag is this on the bench?",
        "phonetic": "Hooz bag iz this on thuh bench?"
      }
    ]
  }
];

// Sentence validation helper function
export function validateStudentSentence(roleplayId, promptId, sentence) {
  if (!sentence || typeof sentence !== 'string' || sentence.trim().length < 3) {
    return {
      valid: false,
      feedback: "Please enter a complete English sentence."
    };
  }

  const clean = sentence.trim();
  const lower = clean.toLowerCase();

  if (clean.length < 5) {
    return {
      valid: false,
      feedback: "Please write a full sentence with at least a subject and verb."
    };
  }

  return {
    valid: true,
    feedback: "🎉 Excellent sentence! Great practice."
  };
}
