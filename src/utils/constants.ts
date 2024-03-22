export const ONE_RM_PERCENTAGE = [
  100, 97, 94, 92, 89, 86, 83, 81, 78, 75, 73, 71,
];

export const ONE_RM_CALCULATION = [
  { repetitions: 1, percentage: 100, weight: 0, unit: "kg" },
  { repetitions: 2, percentage: 97, weight: 0, unit: "kg" },
  { repetitions: 3, percentage: 94, weight: 0, unit: "kg" },
  { repetitions: 4, percentage: 92, weight: 0, unit: "kg" },
  { repetitions: 5, percentage: 89, weight: 0, unit: "kg" },
  { repetitions: 6, percentage: 86, weight: 0, unit: "kg" },
  { repetitions: 7, percentage: 83, weight: 0, unit: "kg" },
  { repetitions: 8, percentage: 81, weight: 0, unit: "kg" },
  { repetitions: 9, percentage: 78, weight: 0, unit: "kg" },
  { repetitions: 10, percentage: 75, weight: 0, unit: "kg" },
  { repetitions: 11, percentage: 73, weight: 0, unit: "kg" },
  { repetitions: 12, percentage: 71, weight: 0, unit: "kg" },
  { repetitions: 13, percentage: 70, weight: 0, unit: "kg" },
  { repetitions: 14, percentage: 68, weight: 0, unit: "kg" },
  { repetitions: 15, percentage: 67, weight: 0, unit: "kg" },
  { repetitions: 16, percentage: 65, weight: 0, unit: "kg" },
  { repetitions: 17, percentage: 64, weight: 0, unit: "kg" },
  { repetitions: 18, percentage: 63, weight: 0, unit: "kg" },
  { repetitions: 19, percentage: 61, weight: 0, unit: "kg" },
  { repetitions: 20, percentage: 60, weight: 0, unit: "kg" },
  { repetitions: 21, percentage: 59, weight: 0, unit: "kg" },
  { repetitions: 22, percentage: 58, weight: 0, unit: "kg" },
  { repetitions: 23, percentage: 57, weight: 0, unit: "kg" },
  { repetitions: 24, percentage: 56, weight: 0, unit: "kg" },
  { repetitions: 25, percentage: 55, weight: 0, unit: "kg" },
  { repetitions: 26, percentage: 54, weight: 0, unit: "kg" },
  { repetitions: 27, percentage: 53, weight: 0, unit: "kg" },
  { repetitions: 28, percentage: 52, weight: 0, unit: "kg" },
  { repetitions: 29, percentage: 51, weight: 0, unit: "kg" },
  { repetitions: 30, percentage: 50, weight: 0, unit: "kg" },
];

export const BODY_FILTER = [
  { value: "biceps", label: "Biceps", type: "body" },
  { value: "triceps", label: "Triceps", type: "body" },
  { value: "back", label: "Back", type: "body" },
  { value: "chest", label: "Chest", type: "body" },
  { value: "legs", label: "Legs", type: "body" },
  { value: "shoulders", label: "Shoulders", type: "body" },
  { value: "abdominals", label: "Abdominals", type: "body" },
  { value: "forearms", label: "Forearms", type: "body" },
];

export const CATEGORY_FILTER = [
  { value: "barbell", label: "Barbell", type: "category" },
  { value: "dumbbell", label: "Dumbbell", type: "category" },
  { value: "machine", label: "Machine", type: "category" },
  {
    value: "body_only",
    label: "Bodyweight",
    type: "category",
  },
  { value: "bands", label: "Bands", type: "category" },
  { value: "e-z_curl_bar", label: "E-z curl bar", type: "category" },
  { value: "Cable", label: "cable", type: "category" },
  { value: "medicine_ball", label: "Medicine ball", type: "category" },
  { value: "foam_roll", label: "Foam roll", type: "category" },
  { value: "kettlebells", label: "Kettlebells", type: "category" },
  { value: "other", label: "Other", type: "category" },
];

export const EXERCISES = [
  {
    id: 174,
    uniqueId: "2030d320-6701-4c4a-9ca5-8ec5ebf2b18b",
    name: "A Nigga From the Street",
    unit: "kg",
    sets: [
      {
        set: 1,
        reps: null,
        previous: null,
        weight: null,
        id: "0f848240-9bc9-443e-85ea-12fa2bf8d9c9",
        type: "straight",
        selected: false,
      },
    ],
    previousSets: [],
    note: {
      id: 174,
      uniqueId: "c7d05583-c014-40d6-a0cb-265e833feda4",
      value: null,
      isOpen: false,
      isPinned: false,
      type: "exercise",
    },
    time: {
      isOpen: false,
      enable: false,
      value: 300,
    },
    records: [],
    instructions: "",
  },
  {
    uniqueId: "351ed4a6-ed32-4ecd-abcb-136ef5195066",
    id: 78,
    exercise_id: 78,
    name: "Balance Board",
    unit: "lbs",
    sets: [
      {
        set: 1,
        reps: 2,
        previous: "10 x 2",
        weight: 5,
        id: "4f905f85-94a6-4967-a602-4d3c87c321be",
        type: "straight",
        selected: false,
      },
    ],
    previousSets: [
      {
        set: 1,
        reps: 2,
        previous: "10 x 2",
        weight: 5,
        id: "8e40f46c-51d4-4b70-accf-18eaa31b4b2c",
        type: "straight",
        selected: false,
      },
    ],
    note: {
      id: 78,
      uniqueId: "529eb1b0-e5ad-4edf-a659-e490d88f64b1",
      value: null,
      isOpen: false,
      isPinned: false,
      type: "exercise",
    },
    time: {
      isOpen: false,
      enable: false,
      value: 300,
    },
    records: [
      {
        weight: {
          value: 10,
          setId: "979a165b-bf2c-4828-90ed-ba9de40a8bc5",
        },
        RM: {
          value: 10.29,
          setId: "979a165b-bf2c-4828-90ed-ba9de40a8bc5",
        },
        volume: {
          value: 20,
          setId: "979a165b-bf2c-4828-90ed-ba9de40a8bc5",
        },
        id: "946e4c3f-7d4b-4b3a-8256-bac287aacfad",
        at: "2024-03-11T12:20:15.040Z",
        unit: "lbs",
        current: true,
      },
    ],
    instructions:
      "Note: This exercise is designed to increase balance.  Place a balance board in front of you. Stand up on it and try to balance yourself. Hold the balance for as long as desired.  Caution: If your balance is poor, start out with one of the less challenging boards. Variations: You can perform this exercise using various types of balance boards. Some are more challenging than others.",
  },
  {
    uniqueId: "6a6a96b9-f78d-41fb-bbd9-8d2a06202694",
    id: 150,
    exercise_id: 150,
    name: "Axle Deadlift",
    unit: "lbs",
    sets: [
      {
        set: 1,
        reps: 1,
        previous: "10 x 1",
        weight: 5,
        id: "7159ab5e-3061-48a4-94e1-a350d4f4fc5b",
        type: "straight",
        selected: false,
      },
    ],
    previousSets: [
      {
        set: 1,
        reps: 1,
        previous: "10 x 1",
        weight: 5,
        id: "4e89360d-abf6-4ef0-9d19-81726c5bb6b7",
        type: "straight",
        selected: false,
      },
    ],
    note: {
      id: 150,
      uniqueId: "c20a7b6e-7126-4098-9f4a-00798c3c5d16",
      value: null,
      isOpen: false,
      isPinned: false,
      type: "exercise",
    },
    time: {
      isOpen: false,
      enable: false,
      value: 300,
    },
    records: [
      {
        weight: {
          value: 10,
          setId: "632cd6c6-689d-4ff1-8616-62dc62752174",
        },
        RM: {
          value: 10,
          setId: "632cd6c6-689d-4ff1-8616-62dc62752174",
        },
        volume: {
          value: 10,
          setId: "632cd6c6-689d-4ff1-8616-62dc62752174",
        },
        id: "fb74b7ee-103a-4bdb-bbff-a886225f84ac",
        at: "2024-03-11T12:20:15.040Z",
        unit: "lbs",
        current: true,
      },
    ],
    instructions:
      "Approach the bar so that it is centered over your feet. You feet should be about hip width apart. Bend at the hip to grip the bar at shoulder width, allowing your shoulder blades to protract. Typically, you would use an over/under grip. With your feet and your grip set, take a big breath and then lower your hips and flex the knees until your shins contact the bar. Look forward with your head, keep your chest up and your back arched, and begin driving through the heels to move the weight upward. After the bar passes the knees, aggressively pull the bar back, pulling your shoulder blades together as you drive your hips forward into the bar. Lower the bar by bending at the hips and guiding it to the floor.",
  },
  {
    uniqueId: "ba041397-2610-4144-b28c-9dde6eb6b7d3",
    id: 149,
    exercise_id: 149,
    name: "Back extension",
    unit: "lbs",
    sets: [
      {
        set: 1,
        reps: 1,
        previous: "10 x 1",
        weight: 5,
        id: "b1e45efe-0b79-47d2-9da0-e1729190333e",
        type: "straight",
        selected: false,
      },
    ],
    previousSets: [
      {
        set: 1,
        reps: 1,
        previous: "10 x 1",
        weight: 5,
        id: "1f801650-1153-4dcd-aa35-1e7a97879e5c",
        type: "straight",
        selected: false,
      },
    ],
    note: {
      id: 149,
      uniqueId: "5a42378c-48bc-4103-aefe-aa96812790d7",
      value: null,
      isOpen: false,
      isPinned: false,
      type: "exercise",
    },
    time: {
      isOpen: false,
      enable: false,
      value: 300,
    },
    records: [
      {
        weight: {
          value: 10,
          setId: "861fe31b-093e-4b49-bc8d-0331efd4f056",
        },
        RM: {
          value: 10,
          setId: "861fe31b-093e-4b49-bc8d-0331efd4f056",
        },
        volume: {
          value: 10,
          setId: "861fe31b-093e-4b49-bc8d-0331efd4f056",
        },
        id: "a467523e-f684-4036-bed1-962b20ee6323",
        at: "2024-03-11T12:20:15.040Z",
        unit: "lbs",
        current: true,
      },
    ],
    instructions:
      "Lie face down on a hyperextension bench, tucking your ankles securely under the footpads. Adjust the upper pad if possible so your upper thighs lie flat across the wide pad, leaving enough room for you to bend at the waist without any restriction. With your body straight, cross your arms in front of you (my preference) or behind your head. This will be your starting position. Tip: You can also hold a weight plate for extra resistance in front of you under your crossed arms. Start bending forward slowly at the waist as far as you can while keeping your back flat. Inhale as you perform this movement. Keep moving forward until you feel a nice stretch on the hamstrings and you can no longer keep going without a rounding of the back. Tip: Never round the back as you perform this exercise. Also, some people can go farther than others. The key thing is that you go as far as your body allows you to without rounding the back. Slowly raise your torso back to the initial position as you inhale. Tip: Avoid the temptation to arch your back past a straight line. Also, do not swing the torso at any time in order to protect the back from injury. Repeat for the recommended amount of repetitions.  Variations: This exercise can also be performed without a hyperextension bench, but in this case you will need a spotter. Also, a similar exercise to this one is the good morning and the stiff-legged deadlift.",
  },
  {
    uniqueId: "77a6d81e-c788-46df-9e62-cfdd91cd5328",
    id: 147,
    exercise_id: 147,
    name: "Atlas Stones",
    unit: "lbs",
    sets: [
      {
        set: 1,
        reps: 10,
        previous: "5 x 10",
        weight: 2,
        id: "bdd585c1-12a6-4303-9819-aece54eb5323",
        type: "straight",
        selected: false,
      },
    ],
    previousSets: [
      {
        set: 1,
        reps: 10,
        previous: "5 x 10",
        weight: 2,
        id: "78999384-0c4e-4e56-9233-64016bef56b9",
        type: "straight",
        selected: false,
      },
    ],
    note: {
      id: 147,
      uniqueId: "538979f1-37b3-408b-ad80-e7ff709e3f89",
      value: null,
      isOpen: false,
      isPinned: false,
      type: "exercise",
    },
    time: {
      isOpen: false,
      enable: false,
      value: 300,
    },
    records: [
      {
        weight: {
          value: 10,
          setId: "e0541120-0e19-4186-9aa4-d266a358b357",
        },
        RM: {
          value: 13.34,
          setId: "e0541120-0e19-4186-9aa4-d266a358b357",
        },
        volume: {
          value: 100,
          setId: "e0541120-0e19-4186-9aa4-d266a358b357",
        },
        id: "8ed58f71-47f9-4675-9f71-6e7231755fa6",
        at: "2024-03-11T12:24:30.145Z",
        unit: "lbs",
        current: true,
      },
    ],
    instructions:
      "Begin with the atlas stone between your feet. Bend at the hips to wrap your arms vertically around the Atlas Stone, attempting to get your fingers underneath the stone. Many stones will have a small flat portion on the bottom, which will make the stone easier to hold. Pulling the stone into your torso, drive through the back half of your feet to pull the stone from the ground. As the stone passes the knees, lap it by sitting backward, pulling the stone on top of your thighs. Sit low, getting the stone high onto your chest as you change your grip to reach over the stone. Stand, driving through with your hips. Close distance to the loading platform, and lean back, extending the hips to get the stone as high as possible.",
  },
  {
    uniqueId: "9b882270-568e-4a29-8eed-4a1738031f2f",
    id: 163,
    exercise_id: 163,
    name: "Alternating sit-through with crunch",
    unit: "lbs",
    sets: [
      {
        set: 1,
        reps: 10,
        previous: "15 x 10",
        weight: 7,
        id: "47a48e98-5f6f-42d6-bd25-75f8495c23a5",
        type: "straight",
        selected: false,
      },
    ],
    previousSets: [
      {
        set: 1,
        reps: 10,
        previous: "15 x 10",
        weight: 7,
        id: "b0b59a97-509c-4138-bb74-520a6f8811d5",
        type: "straight",
        selected: false,
      },
      {
        set: 2,
        reps: 10,
        previous: "8 x 10",
        weight: 4,
        id: "da283715-192d-4344-abb2-beda192685c6",
        type: "straight",
        selected: false,
      },
    ],
    note: {
      id: 163,
      uniqueId: "5e0df4a8-d514-4a15-aa1b-220af36ff699",
      value: null,
      isOpen: false,
      isPinned: false,
      type: "exercise",
    },
    time: {
      isOpen: false,
      enable: false,
      value: 300,
    },
    records: [
      {
        weight: {
          value: 20,
          setId: "bcd55ef6-fb49-4ada-b219-f46df9d94319",
        },
        RM: {
          value: 42.39,
          setId: "bcd55ef6-fb49-4ada-b219-f46df9d94319",
        },
        volume: {
          value: 400,
          setId: "bcd55ef6-fb49-4ada-b219-f46df9d94319",
        },
        id: "84a15790-62b2-4624-ba5d-9a31d3d543fe",
        at: "2024-03-11T12:18:31.443Z",
        unit: "lbs",
        current: false,
      },
      {
        weight: {
          value: 25,
          setId: "e936c2a9-a671-4224-89c6-d40c57789ec3",
        },
        RM: {
          value: 52.99,
          setId: "e936c2a9-a671-4224-89c6-d40c57789ec3",
        },
        volume: {
          value: 500,
          setId: "e936c2a9-a671-4224-89c6-d40c57789ec3",
        },
        id: "7bc2a059-f65e-42ff-8487-9155a4ec3f65",
        at: "2024-03-11T12:24:30.145Z",
        unit: "lbs",
        current: false,
      },
      {
        weight: {
          value: 30,
          setId: "78a34d45-617c-4744-a037-eac14072b0d4",
        },
        RM: {
          value: 63.59,
          setId: "78a34d45-617c-4744-a037-eac14072b0d4",
        },
        volume: {
          value: 600,
          setId: "78a34d45-617c-4744-a037-eac14072b0d4",
        },
        id: "e412f3d0-fc9a-4c05-a786-6f99b65efb3d",
        at: "2024-03-11T12:29:58.962Z",
        unit: "lbs",
        current: false,
      },
      {
        weight: {
          value: 35,
          setId: "ddba8532-0a83-45a0-b1c9-9a5bfa839cc9",
        },
        RM: null,
        volume: null,
        id: "feffadb0-5567-4262-a01a-519450950d02",
        at: "2024-03-11T12:30:36.731Z",
        unit: "lbs",
        current: false,
      },
      {
        weight: {
          value: 40,
          setId: "1c718b47-2b37-4536-bcb8-bbec5cd0225a",
        },
        RM: null,
        volume: null,
        id: "037e5d2c-9c3d-4459-9119-3a068850a44d",
        at: "2024-03-11T12:38:04.712Z",
        unit: "lbs",
        current: true,
      },
    ],
    instructions:
      "Put weight on one of the ends of an Olympic barbell. Make sure that you either place the other end of the barbell in the corner of two walls; or put a heavy object on the ground so the barbell cannot slide backward. Bend forward until your torso is as close to parallel with the floor as you can and keep your knees slightly bent. Now grab the bar with one arm just behind the plates on the side where the weight was placed and put your other hand on your knee. This will be your starting position. Pull the bar straight up with your elbow in (to maximize back stimulation) until the plates touch your lower chest. Squeeze the back muscles as you lift the weight up and hold for a second at the top of the movement. Breathe out as you lift the weight. Tip: Do not allow for any swinging of the torso. Only the arm should move. Slowly lower the bar to the starting position getting a nice stretch on the lats. Tip: Do not let the plates touch the floor. To ensure the best range of motion, I recommend using small plates (25-lb ones) as opposed to larger plates (like 35-45lb ones). Repeat for the recommended amount of repetitions and switch arms.  Variations: You can perform this exercise using a low pulley.",
  },
];
