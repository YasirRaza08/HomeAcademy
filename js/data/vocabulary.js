// Home Academy 16 Vocabulary Categories (Beginner A1 Level)

export const VOCABULARY_CATEGORIES = [
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    description: 'Everyday domestic and wild animals',
    words: [
      {
        id: 'cat',
        word: 'Cat',
        meaning: 'A small pet with soft fur that meows',
        example: 'The cat sleeps on the sofa.',
        icon: '🐱',
        miniQuiz: {
          question: 'What sound does a cat make?',
          options: ['Woof', 'Meow', 'Moo', 'Quack'],
          correctAnswer: 'Meow'
        }
      },
      {
        id: 'dog',
        word: 'Dog',
        meaning: 'A loyal pet that barks and wags its tail',
        example: 'My dog runs in the garden.',
        icon: '🐶',
        miniQuiz: {
          question: 'A dog is known as man’s best ______.',
          options: ['Friend', 'Teacher', 'Car', 'Book'],
          correctAnswer: 'Friend'
        }
      },
      {
        id: 'bird',
        word: 'Bird',
        meaning: 'An animal that has feathers and can fly',
        example: 'A bird sings in the tree.',
        icon: '🐦',
        miniQuiz: {
          question: 'What do birds use to fly?',
          options: ['Legs', 'Wings', 'Ears', 'Nose'],
          correctAnswer: 'Wings'
        }
      },
      {
        id: 'fish',
        word: 'Fish',
        meaning: 'An animal that swims in water',
        example: 'Goldfish swim in the pond.',
        icon: '🐟',
        miniQuiz: {
          question: 'Where do fish live?',
          options: ['Trees', 'Water', 'Sky', 'Clouds'],
          correctAnswer: 'Water'
        }
      },
      {
        id: 'horse',
        word: 'Horse',
        meaning: 'A large animal people can ride',
        example: 'The brown horse runs very fast.',
        icon: '🐴',
        miniQuiz: {
          question: 'Can you ride a horse?',
          options: ['Yes', 'No', 'Never', 'Only birds'],
          correctAnswer: 'Yes'
        }
      },
      {
        id: 'cow',
        word: 'Cow',
        meaning: 'A farm animal that gives us milk',
        example: 'The cow eats green grass.',
        icon: '🐮',
        miniQuiz: {
          question: 'What healthy drink does a cow give us?',
          options: ['Tea', 'Milk', 'Juice', 'Coffee'],
          correctAnswer: 'Milk'
        }
      }
    ]
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍎',
    description: 'Delicious fruits, vegetables, and everyday meals',
    words: [
      {
        id: 'apple',
        word: 'Apple',
        meaning: 'A sweet round fruit, red or green',
        example: 'I eat a red apple every morning.',
        icon: '🍎',
        miniQuiz: {
          question: 'What color is usually a ripe apple?',
          options: ['Blue', 'Red', 'Black', 'Purple'],
          correctAnswer: 'Red'
        }
      },
      {
        id: 'bread',
        word: 'Bread',
        meaning: 'Baked food made from flour and water',
        example: 'We eat fresh bread for breakfast.',
        icon: '🍞',
        miniQuiz: {
          question: 'What do you toast for breakfast?',
          options: ['Bread', 'Ice', 'Water', 'Salt'],
          correctAnswer: 'Bread'
        }
      },
      {
        id: 'water',
        word: 'Water',
        meaning: 'A clear liquid that we drink every day',
        example: 'Drink clean water when you are thirsty.',
        icon: '💧',
        miniQuiz: {
          question: 'What is essential for life to drink?',
          options: ['Soda', 'Water', 'Paint', 'Oil'],
          correctAnswer: 'Water'
        }
      },
      {
        id: 'rice',
        word: 'Rice',
        meaning: 'Small white grains eaten as a staple food',
        example: 'We enjoy chicken with rice for dinner.',
        icon: '🍚',
        miniQuiz: {
          question: 'Rice grains are commonly what color?',
          options: ['White', 'Blue', 'Pink', 'Green'],
          correctAnswer: 'White'
        }
      },
      {
        id: 'egg',
        word: 'Egg',
        meaning: 'An oval food with shell from birds',
        example: 'Ali boils an egg for breakfast.',
        icon: '🥚',
        miniQuiz: {
          question: 'What farm bird lays eggs?',
          options: ['Chicken', 'Lion', 'Tiger', 'Elephant'],
          correctAnswer: 'Chicken'
        }
      },
      {
        id: 'banana',
        word: 'Banana',
        meaning: 'A long yellow fruit with sweet flesh',
        example: 'Monkeys love eating sweet bananas.',
        icon: '🍌',
        miniQuiz: {
          question: 'What color is a ripe banana peel?',
          options: ['Yellow', 'Grey', 'Brown', 'Blue'],
          correctAnswer: 'Yellow'
        }
      }
    ]
  },
  {
    id: 'family',
    name: 'Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Relatives, parents, brothers and sisters',
    words: [
      {
        id: 'mother',
        word: 'Mother',
        meaning: 'A female parent; mom',
        example: 'My mother makes delicious tea.',
        icon: '👩',
        miniQuiz: {
          question: 'Another warm word for mother is:',
          options: ['Dad', 'Mom', 'Uncle', 'Brother'],
          correctAnswer: 'Mom'
        }
      },
      {
        id: 'father',
        word: 'Father',
        meaning: 'A male parent; dad',
        example: 'My father reads a book in the evening.',
        icon: '👨',
        miniQuiz: {
          question: 'Another word for father is:',
          options: ['Sister', 'Dad', 'Aunt', 'Grandma'],
          correctAnswer: 'Dad'
        }
      },
      {
        id: 'brother',
        word: 'Brother',
        meaning: 'A male sibling',
        example: 'My brother plays football with me.',
        icon: '👦',
        miniQuiz: {
          question: 'A boy who has the same parents as you is your:',
          options: ['Brother', 'Sister', 'Uncle', 'Grandmother'],
          correctAnswer: 'Brother'
        }
      },
      {
        id: 'sister',
        word: 'Sister',
        meaning: 'A female sibling',
        example: 'She is my sister and she loves drawing.',
        icon: '👧',
        miniQuiz: {
          question: 'A girl with the same parents as you is your:',
          options: ['Father', 'Sister', 'Brother', 'Grandpa'],
          correctAnswer: 'Sister'
        }
      },
      {
        id: 'baby',
        word: 'Baby',
        meaning: 'A very young child or infant',
        example: 'The baby sleeps peacefully.',
        icon: '👶',
        miniQuiz: {
          question: 'A very small child is called a:',
          options: ['Adult', 'Baby', 'Teacher', 'Doctor'],
          correctAnswer: 'Baby'
        }
      }
    ]
  },
  {
    id: 'school',
    name: 'School',
    icon: '🏫',
    description: 'Classroom items, teachers, and study tools',
    words: [
      {
        id: 'book',
        word: 'Book',
        meaning: 'Pages bound together with stories or lessons',
        example: 'This is my English book.',
        icon: '📖',
        miniQuiz: {
          question: 'You open a ______ to read a story.',
          options: ['Door', 'Book', 'Fork', 'Spoon'],
          correctAnswer: 'Book'
        }
      },
      {
        id: 'pencil',
        word: 'Pencil',
        meaning: 'An instrument used for writing or drawing',
        example: 'I write my name with a pencil.',
        icon: '✏️',
        miniQuiz: {
          question: 'What do you use to draw or write notes?',
          options: ['Pencil', 'Shoe', 'Plate', 'Cup'],
          correctAnswer: 'Pencil'
        }
      },
      {
        id: 'teacher',
        word: 'Teacher',
        meaning: 'A person who helps students learn',
        example: 'Our English teacher is very kind.',
        icon: '🧑‍🏫',
        miniQuiz: {
          question: 'Who guides and teaches students in class?',
          options: ['Teacher', 'Driver', 'Chef', 'Pilot'],
          correctAnswer: 'Teacher'
        }
      },
      {
        id: 'desk',
        word: 'Desk',
        meaning: 'A table where students sit to study',
        example: 'Keep your notebook clean on your desk.',
        icon: '🪑',
        miniQuiz: {
          question: 'Where do students place their books in class?',
          options: ['Desk', 'Roof', 'Sky', 'Window'],
          correctAnswer: 'Desk'
        }
      },
      {
        id: 'bag',
        word: 'Bag',
        meaning: 'A container used to carry school supplies',
        example: 'I carry my books in my school bag.',
        icon: '🎒',
        miniQuiz: {
          question: 'What carries your books to Home Academy?',
          options: ['School bag', 'Plate', 'Shoe', 'Spoon'],
          correctAnswer: 'School bag'
        }
      }
    ]
  },
  {
    id: 'colors',
    name: 'Colors',
    icon: '🎨',
    description: 'Basic colors of the world around us',
    words: [
      {
        id: 'red',
        word: 'Red',
        meaning: 'The bright color of apples and strawberries',
        example: 'Home Academy uses a bold red color.',
        icon: '🔴',
        miniQuiz: {
          question: 'What color is a fresh ripe tomato?',
          options: ['Red', 'Blue', 'Green', 'Black'],
          correctAnswer: 'Red'
        }
      },
      {
        id: 'blue',
        word: 'Blue',
        meaning: 'The deep color of the clear sky and the ocean',
        example: 'The Home Academy logo has deep navy blue.',
        icon: '🔵',
        miniQuiz: {
          question: 'What color is the clear sky on a sunny day?',
          options: ['Blue', 'Orange', 'Brown', 'Purple'],
          correctAnswer: 'Blue'
        }
      },
      {
        id: 'yellow',
        word: 'Yellow',
        meaning: 'The warm, sunny color of the morning sun',
        example: 'The sun rises with bright yellow rays.',
        icon: '🟡',
        miniQuiz: {
          question: 'What color is the bright sun?',
          options: ['Yellow', 'Green', 'Pink', 'Grey'],
          correctAnswer: 'Yellow'
        }
      },
      {
        id: 'green',
        word: 'Green',
        meaning: 'The color of growing plants, leaves, and grass',
        example: 'Trees have healthy green leaves.',
        icon: '🟢',
        miniQuiz: {
          question: 'What color is fresh garden grass?',
          options: ['Green', 'Red', 'Purple', 'Silver'],
          correctAnswer: 'Green'
        }
      },
      {
        id: 'white',
        word: 'White',
        meaning: 'The clean color of milk and pure snow',
        example: 'Clouds in the sky are soft and white.',
        icon: '⚪',
        miniQuiz: {
          question: 'What color is fresh snow?',
          options: ['White', 'Black', 'Brown', 'Orange'],
          correctAnswer: 'White'
        }
      }
    ]
  },
  {
    id: 'numbers',
    name: 'Numbers',
    icon: '🔢',
    description: 'Counting 1 through 10 in English',
    words: [
      {
        id: 'one',
        word: 'One',
        meaning: 'The number 1',
        example: 'I have one sister.',
        icon: '1️⃣',
        miniQuiz: {
          question: 'What number comes first when counting from 1?',
          options: ['One', 'Ten', 'Five', 'Zero'],
          correctAnswer: 'One'
        }
      },
      {
        id: 'two',
        word: 'Two',
        meaning: 'The number 2 (1 + 1)',
        example: 'You have two eyes and two ears.',
        icon: '2️⃣',
        miniQuiz: {
          question: 'How many eyes do humans usually have?',
          options: ['Two', 'Four', 'Six', 'Eight'],
          correctAnswer: 'Two'
        }
      },
      {
        id: 'five',
        word: 'Five',
        meaning: 'The number 5',
        example: 'We have five fingers on each hand.',
        icon: '5️⃣',
        miniQuiz: {
          question: 'How many fingers on one hand?',
          options: ['Five', 'Three', 'Seven', 'Nine'],
          correctAnswer: 'Five'
        }
      },
      {
        id: 'ten',
        word: 'Ten',
        meaning: 'The number 10',
        example: 'Count up to ten: 1, 2, 3 ... 10.',
        icon: '🔟',
        miniQuiz: {
          question: '5 plus 5 equals:',
          options: ['Ten', 'Eight', 'Seven', 'Six'],
          correctAnswer: 'Ten'
        }
      }
    ]
  },
  {
    id: 'days',
    name: 'Days of the Week',
    icon: '📅',
    description: 'The 7 days of each week',
    words: [
      {
        id: 'monday',
        word: 'Monday',
        meaning: 'The first day of the school week',
        example: 'We start our English class on Monday.',
        icon: '🗓️',
        miniQuiz: {
          question: 'What day comes right after Sunday?',
          options: ['Monday', 'Friday', 'Wednesday', 'Saturday'],
          correctAnswer: 'Monday'
        }
      },
      {
        id: 'friday',
        word: 'Friday',
        meaning: 'The end of the regular school week',
        example: 'Friday is a special and blessed day.',
        icon: '🕌',
        miniQuiz: {
          question: 'What day comes after Thursday?',
          options: ['Friday', 'Tuesday', 'Sunday', 'Monday'],
          correctAnswer: 'Friday'
        }
      },
      {
        id: 'sunday',
        word: 'Sunday',
        meaning: 'A weekend day for rest and family',
        example: 'On Sunday, we visit our grandparents.',
        icon: '☀️',
        miniQuiz: {
          question: 'Which day is part of the weekend?',
          options: ['Sunday', 'Tuesday', 'Wednesday', 'Thursday'],
          correctAnswer: 'Sunday'
        }
      }
    ]
  },
  {
    id: 'months',
    name: 'Months of the Year',
    icon: '📆',
    description: 'Key months and seasons of the year',
    words: [
      {
        id: 'january',
        word: 'January',
        meaning: 'The first month of the new year',
        example: 'January is the beginning of the year.',
        icon: '❄️',
        miniQuiz: {
          question: 'Which is the first month of the calendar year?',
          options: ['January', 'March', 'June', 'October'],
          correctAnswer: 'January'
        }
      },
      {
        id: 'july',
        word: 'July',
        meaning: 'A warm summer month (7th month)',
        example: 'The weather is hot in July.',
        icon: '☀️',
        miniQuiz: {
          question: 'July is month number:',
          options: ['7', '1', '12', '4'],
          correctAnswer: '7'
        }
      },
      {
        id: 'december',
        word: 'December',
        meaning: 'The twelfth and final month of the year',
        example: 'December brings cool winter breezes.',
        icon: '🧣',
        miniQuiz: {
          question: 'What is the last month of the year?',
          options: ['December', 'August', 'May', 'April'],
          correctAnswer: 'December'
        }
      }
    ]
  },
  {
    id: 'clothes',
    name: 'Clothes',
    icon: '👕',
    description: 'Everyday clothing and footwear',
    words: [
      {
        id: 'shirt',
        word: 'Shirt',
        meaning: 'A garment worn on the upper body',
        example: 'He wears a clean white shirt.',
        icon: '👔',
        miniQuiz: {
          question: 'What clothing do you wear on your upper body?',
          options: ['Shirt', 'Shoe', 'Socks', 'Gloves'],
          correctAnswer: 'Shirt'
        }
      },
      {
        id: 'shoes',
        word: 'Shoes',
        meaning: 'Footwear worn outside for walking',
        example: 'Tie your shoes before running.',
        icon: '👟',
        miniQuiz: {
          question: 'What do you wear on your feet to walk outside?',
          options: ['Shoes', 'Hat', 'Scarf', 'Watch'],
          correctAnswer: 'Shoes'
        }
      },
      {
        id: 'jacket',
        word: 'Jacket',
        meaning: 'A warm outer coat for cooler weather',
        example: 'Put on your jacket when it is cold.',
        icon: '🧥',
        miniQuiz: {
          question: 'What keeps you warm in cold weather?',
          options: ['Jacket', 'Sunglasses', 'Swimsuit', 'Towel'],
          correctAnswer: 'Jacket'
        }
      },
      {
        id: 'hat',
        word: 'Hat',
        meaning: 'A covering worn on the head',
        example: 'A sunny hat protects your eyes.',
        icon: '🧢',
        miniQuiz: {
          question: 'Where do you wear a hat?',
          options: ['Head', 'Foot', 'Hand', 'Knee'],
          correctAnswer: 'Head'
        }
      }
    ]
  },
  {
    id: 'body_parts',
    name: 'Body Parts',
    icon: '🖐️',
    description: 'Head, hands, eyes, and body features',
    words: [
      {
        id: 'eye',
        word: 'Eye',
        meaning: 'The organ of vision that lets you see',
        example: 'Close your eyes and listen.',
        icon: '👁️',
        miniQuiz: {
          question: 'We use our eyes to:',
          options: ['See', 'Taste', 'Smell', 'Run'],
          correctAnswer: 'See'
        }
      },
      {
        id: 'ear',
        word: 'Ear',
        meaning: 'The organ of hearing',
        example: 'I hear music with my ears.',
        icon: '👂',
        miniQuiz: {
          question: 'We use our ears to:',
          options: ['Hear', 'Blink', 'Chew', 'Kick'],
          correctAnswer: 'Hear'
        }
      },
      {
        id: 'hand',
        word: 'Hand',
        meaning: 'The end part of the arm used for holding',
        example: 'Wash your hands before eating.',
        icon: '✋',
        miniQuiz: {
          question: 'What do you hold a pencil with?',
          options: ['Hand', 'Ear', 'Nose', 'Foot'],
          correctAnswer: 'Hand'
        }
      },
      {
        id: 'mouth',
        word: 'Mouth',
        meaning: 'The opening in the face used for speaking and eating',
        example: 'Open your mouth and say hello!',
        icon: '👄',
        miniQuiz: {
          question: 'What do you speak with?',
          options: ['Mouth', 'Elbow', 'Knee', 'Shoulder'],
          correctAnswer: 'Mouth'
        }
      }
    ]
  },
  {
    id: 'home',
    name: 'Home',
    icon: '🏠',
    description: 'Rooms and objects around the house',
    words: [
      {
        id: 'house',
        word: 'House',
        meaning: 'A building where people live together',
        example: 'Welcome to our lovely house!',
        icon: '🏡',
        miniQuiz: {
          question: 'A place where a family lives is a:',
          options: ['House', 'Airport', 'Bridge', 'Bus stop'],
          correctAnswer: 'House'
        }
      },
      {
        id: 'door',
        word: 'Door',
        meaning: 'A movable barrier that opens and closes an entrance',
        example: 'Please close the door gently.',
        icon: '🚪',
        miniQuiz: {
          question: 'You turn the handle to open the:',
          options: ['Door', 'Curtain', 'Rug', 'Pillow'],
          correctAnswer: 'Door'
        }
      },
      {
        id: 'window',
        word: 'Window',
        meaning: 'An opening in the wall with glass for light and air',
        example: 'Sunshine enters through the window.',
        icon: '🪟',
        miniQuiz: {
          question: 'What lets daylight into a room?',
          options: ['Window', 'Floor', 'Ceiling', 'Carpet'],
          correctAnswer: 'Window'
        }
      },
      {
        id: 'bed',
        word: 'Bed',
        meaning: 'A piece of furniture for sleeping',
        example: 'I go to bed at nine o’clock.',
        icon: '🛏️',
        miniQuiz: {
          question: 'Where do you sleep at night?',
          options: ['Bed', 'Fridge', 'Sink', 'Roof'],
          correctAnswer: 'Bed'
        }
      }
    ]
  },
  {
    id: 'daily_activities',
    name: 'Daily Activities',
    icon: '⏰',
    description: 'Routines and things we do every day',
    words: [
      {
        id: 'wake_up',
        word: 'Wake up',
        meaning: 'To stop sleeping in the morning',
        example: 'I wake up at seven o’clock.',
        icon: '⏰',
        miniQuiz: {
          question: 'What do you do in the morning after sleeping?',
          options: ['Wake up', 'Sleep', 'Dream', 'Turn off'],
          correctAnswer: 'Wake up'
        }
      },
      {
        id: 'eat',
        word: 'Eat',
        meaning: 'To chew and swallow food',
        example: 'We eat healthy food every day.',
        icon: '🍽️',
        miniQuiz: {
          question: 'When you are hungry, you want to:',
          options: ['Eat', 'Run', 'Sing', 'Climb'],
          correctAnswer: 'Eat'
        }
      },
      {
        id: 'play',
        word: 'Play',
        meaning: 'To engage in fun activities or sports',
        example: 'We play football in the afternoon.',
        icon: '⚽',
        miniQuiz: {
          question: 'Children love to ______ games after school.',
          options: ['Play', 'Cry', 'Drop', 'Lose'],
          correctAnswer: 'Play'
        }
      },
      {
        id: 'sleep',
        word: 'Sleep',
        meaning: 'To rest your body and mind during the night',
        example: 'Good night, sleep well!',
        icon: '💤',
        miniQuiz: {
          question: 'When you are tired at night, you:',
          options: ['Sleep', 'Shout', 'Sprint', 'Cook'],
          correctAnswer: 'Sleep'
        }
      }
    ]
  },
  {
    id: 'places',
    name: 'Places',
    icon: '🗺️',
    description: 'Parks, schools, hospitals, and markets',
    words: [
      {
        id: 'park',
        word: 'Park',
        meaning: 'A public green area for play and relaxation',
        example: 'Children run and play in the green park.',
        icon: '🌳',
        miniQuiz: {
          question: 'Where can you ride a swing and see green trees?',
          options: ['Park', 'Office', 'Kitchen', 'Elevator'],
          correctAnswer: 'Park'
        }
      },
      {
        id: 'hospital',
        word: 'Hospital',
        meaning: 'A place where doctors and nurses treat sick people',
        example: 'The doctor works at the city hospital.',
        icon: '🏥',
        miniQuiz: {
          question: 'Where do doctors take care of sick patients?',
          options: ['Hospital', 'Library', 'Cinema', 'Garage'],
          correctAnswer: 'Hospital'
        }
      },
      {
        id: 'market',
        word: 'Market',
        meaning: 'A place where food, fruits, and items are sold',
        example: 'We buy fresh apples at the fruit market.',
        icon: '🏪',
        miniQuiz: {
          question: 'Where do people buy vegetables and fruits?',
          options: ['Market', 'Police station', 'Stadium', 'Museum'],
          correctAnswer: 'Market'
        }
      }
    ]
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: '🚗',
    description: 'Cars, buses, bicycles, and trains',
    words: [
      {
        id: 'car',
        word: 'Car',
        meaning: 'A four-wheeled road vehicle with an engine',
        example: 'My father drives a blue car.',
        icon: '🚗',
        miniQuiz: {
          question: 'How many wheels does a standard car have?',
          options: ['Four', 'Two', 'One', 'Eight'],
          correctAnswer: 'Four'
        }
      },
      {
        id: 'bus',
        word: 'Bus',
        meaning: 'A large vehicle that carries many passengers',
        example: 'We ride the school bus every morning.',
        icon: '🚌',
        miniQuiz: {
          question: 'What carries many students to school together?',
          options: ['Bus', 'Bicycle', 'Skateboard', 'Scooter'],
          correctAnswer: 'Bus'
        }
      },
      {
        id: 'bicycle',
        word: 'Bicycle',
        meaning: 'A two-wheeled vehicle you ride by pedaling',
        example: 'Ali rides his bicycle in the park.',
        icon: '🚲',
        miniQuiz: {
          question: 'How many wheels does a bicycle have?',
          options: ['Two', 'Three', 'Four', 'Five'],
          correctAnswer: 'Two'
        }
      },
      {
        id: 'airplane',
        word: 'Airplane',
        meaning: 'A flying vehicle that travels through the air',
        example: 'The airplane flies high above the clouds.',
        icon: '✈️',
        miniQuiz: {
          question: 'What flies high in the sky across long distances?',
          options: ['Airplane', 'Submarine', 'Bicycle', 'Tractor'],
          correctAnswer: 'Airplane'
        }
      }
    ]
  },
  {
    id: 'common_verbs',
    name: 'Common Verbs',
    icon: '🏃',
    description: 'Everyday action words in simple English',
    words: [
      {
        id: 'go',
        word: 'Go',
        meaning: 'To move or travel from one place to another',
        example: 'I go to school every day.',
        icon: '🚶',
        miniQuiz: {
          question: 'Complete: "I ______ to school."',
          options: ['go', 'sit', 'cup', 'pencil'],
          correctAnswer: 'go'
        }
      },
      {
        id: 'like',
        word: 'Like',
        meaning: 'To find something pleasant or enjoyable',
        example: 'I like tea and fresh cookies.',
        icon: '❤️',
        miniQuiz: {
          question: 'Complete: "She ______ football."',
          options: ['likes', 'like', 'liking', 'liker'],
          correctAnswer: 'likes'
        }
      },
      {
        id: 'see',
        word: 'See',
        meaning: 'To notice or look at something with your eyes',
        example: 'I see a bird in the sky.',
        icon: '👀',
        miniQuiz: {
          question: 'What verb means using your eyes to observe?',
          options: ['See', 'Taste', 'Hear', 'Bite'],
          correctAnswer: 'See'
        }
      },
      {
        id: 'read',
        word: 'Read',
        meaning: 'To look at and understand written words',
        example: 'We read an English story together.',
        icon: '📖',
        miniQuiz: {
          question: 'What do you do with a good book?',
          options: ['Read', 'Throw', 'Eat', 'Bake'],
          correctAnswer: 'Read'
        }
      }
    ]
  },
  {
    id: 'common_adjectives',
    name: 'Common Adjectives',
    icon: '✨',
    description: 'Descriptive words for size, quality, and feelings',
    words: [
      {
        id: 'big',
        word: 'Big',
        meaning: 'Large in size; not small',
        example: 'An elephant is very big.',
        icon: '🐘',
        miniQuiz: {
          question: 'What is the opposite of "small"?',
          options: ['Big', 'Tiny', 'Short', 'Little'],
          correctAnswer: 'Big'
        }
      },
      {
        id: 'small',
        word: 'Small',
        meaning: 'Little in size; not big',
        example: 'A mouse is very small.',
        icon: '🐭',
        miniQuiz: {
          question: 'What is the opposite of "big"?',
          options: ['Small', 'Huge', 'Giant', 'Tall'],
          correctAnswer: 'Small'
        }
      },
      {
        id: 'happy',
        word: 'Happy',
        meaning: 'Feeling joy and pleasure; smiling',
        example: 'I am happy when I learn English.',
        icon: '😊',
        miniQuiz: {
          question: 'When you smile and feel good, you are:',
          options: ['Happy', 'Angry', 'Sad', 'Scared'],
          correctAnswer: 'Happy'
        }
      },
      {
        id: 'good',
        word: 'Good',
        meaning: 'High quality; pleasant or kind',
        example: 'Home Academy is a very good school.',
        icon: '👍',
        miniQuiz: {
          question: 'What is the opposite of "bad"?',
          options: ['Good', 'Cold', 'Old', 'Dark'],
          correctAnswer: 'Good'
        }
      }
    ]
  }
];