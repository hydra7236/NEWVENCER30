export interface Event {
  title: string;
  category: "Technical" | "Non-Technical" | "Cultural" | "Gaming";
  description: string;
  prizePool: string;
  entryFee: string;
  formLink: string;
  posterUrl?: string;
  branch?: string;
  rules?: string[];
  teamSize?: string;
  duration?: string;
  venue?: string;
}

export interface Branch {
  name: string;
  shortName: string;
  color: string;
  events: Event[];
  culturalEvents: Event[];
  gamingEvents: Event[];
}

export const branches: Branch[] = [
  {
    name: "Artificial Intelligence & Data Science",
    shortName: "AI & DS",
    color: "fest-orange",
    events: [
      { 
        title: "AI Prompt Battle", 
        category: "Technical", 
        description: "Witness the ultimate showdown of prompt engineering mastery.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        branch: "AI & DS",
        rules: ["Participants must use approved AI models", "Judging based on output accuracy and prompt efficiency", "No pre-written prompts allowed"]
      },
      { 
        title: "AI Shark Tank", 
        category: "Technical", 
        description: "Pitch your AI-driven business ideas to a panel of experts.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        branch: "AI & DS",
        rules: ["Business plan must involve AI technologies", "5-minute pitch followed by Q&A", "Scalability and innovation are key criteria"]
      },
      { 
        title: "Techxibit", 
        category: "Technical", 
        description: "Exhibit your most innovative technological projects and prototypes.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        branch: "AI & DS",
        rules: ["Projects must be functional or well-documented prototypes", "Posters allowed for explanation", "Judged on technical depth and presentation"]
      },
      { 
        title: "Pandora Logic Wars", 
        category: "Technical", 
        description: "The classic battle of logic and algorithms within the Pandora theme.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        posterUrl: "/posters/pandora-logic-wars.png", 
        branch: "AI & DS",
        rules: ["Individual or team participation", "Solve complex logic puzzles against the clock", "Points based on speed and correctness"]
      },
      { 
        title: "Edible Art Arena", 
        category: "Non-Technical", 
        description: "Combine creativity and culinary skills in this unique art challenge.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        branch: "AI & DS",
        rules: ["All art must be created using edible materials", "Theme provided on the spot", "Judged on aesthetic appeal and creative use of materials"]
      },
      { 
        title: "Dodge n Roll", 
        category: "Non-Technical", 
        description: "A fast-paced agility challenge involving dodging and movement.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        branch: "AI & DS",
        rules: ["Must remain within the designated arena", "Safety gear must be worn if provided", "Last person standing or highest score wins"]
      },
      { 
        title: "Brand Baazi", 
        category: "Non-Technical", 
        description: "Test your knowledge and strategy in the world of branding and marketing.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        branch: "AI & DS",
        rules: ["Identify brands through logos, slogans, and ads", "Strategic marketing challenge included in final round", "Team work is essential"]
      },
      { 
        title: "Cosmos Crown", 
        category: "Non-Technical", 
        description: "A pageant-style competition to find the brightest star of the AI & DS tribe.", 
        prizePool: "2000", 
        entryFee: "150", 
        formLink: "#", 
        branch: "AI & DS",
        rules: ["Multiple rounds: Intro, Talent, and Q&A", "Confidence and stage presence are key", "Theme: Futuristic/Cosmic"]
      },
    ],
    culturalEvents: [],
    gamingEvents: [],
  },
  {
    name: "Computer Science Engineering",
    shortName: "CSE",
    color: "fest-teal",
    events: [
      { title: "Bug Crush", category: "Technical", description: "Hunt down and squash complex bugs in various languages.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Fix provided code within time limit", "Correct output and code quality matter", "No internet access allowed"] },
      { title: "Code Meme", category: "Technical", description: "Write functional code that also creates a hilarious meme.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Code must compile and run", "Creativity and humor of the meme judged", "Open to all programming languages"] },
      { title: "Hack the Hunt", category: "Technical", description: "A high-tech scavenger hunt requiring coding skills.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Decrypt clues using programming tools", "First team to find the 'treasure' wins", "Team size: 2-4 members"] },
      { title: "Idea Canvas", category: "Technical", description: "Visualize and present your groundbreaking tech ideas.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Single poster or digital presentation", "Focus on technical feasibility and innovation", "3-minute presentation limit"] },
      { title: "Box Cricket", category: "Non-Technical", description: "Exciting indoor cricket action in a confined arena.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Standard box cricket rules apply", "Limited overs per side", "Umpire's decision is final"] },
      { title: "Lagori", category: "Non-Technical", description: "The traditional street game brought to the fest.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Classic gameplay: stack the stones", "Fair play is mandatory", "Coordinated team movements required"] },
      { title: "Slow Bike Race", category: "Non-Technical", description: "The challenge is to be the slowest across the finish line.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["No stopping or putting feet down", "Must remain within the track boundaries", "Slowest time wins"] },
      { title: "Capture Clash", category: "Cultural", description: "A high-stakes photography and videography challenge.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Submit original media captured during the fest", "Postprocessing allowed within limits", "Theme: Vencer Spirit"] },
      { title: "Cinematic Saga", category: "Cultural", description: "Short filmmaking competition showcasing visual stories.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Max duration: 5 minutes", "Original content only", "Technical and artistic merit judged"] },
      { title: "Rhythm Riot", category: "Cultural", description: "Unleash your dance energy in this vibrant battle.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Solo or group performance", "Max time: 4 minutes", "Prop usage allowed with prior approval"] },
      { title: "Vocal Fusion", category: "Cultural", description: "Singing competition featuring diverse vocal talents.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Any genre of music", "Accompaniment allowed", "Live performance only"] },
      { title: "Mr/Miss Vencer", category: "Cultural", description: "The hunt for the ultimate face of Vencer 2K26.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CSE", rules: ["Pageant style rounds", "Personality and talent are critical", "Open to all registered participants"] },
    ],
    culturalEvents: [],
    gamingEvents: [
      { title: "BGMI", category: "Gaming", description: "The ultimate Battle Royale experience.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Squad (4)", duration: "Day 1 & Day 2", venue: "Gaming Arena", rules: ["Mobile only", "No emulator allowed", "Standard tournament settings"] },
      { title: "FIFA", category: "Gaming", description: "Dominate the virtual pitch.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Individual", duration: "Day 1", venue: "Gaming Zone", rules: ["Match length: 6 mins", "World Class difficulty", "Legacy defending off"] },
    ],
  },
  {
    name: "Robotics & Automation",
    shortName: "R & A",
    color: "fest-cyan",
    events: [
      { 
        title: "Do or die arena", 
        category: "Technical", 
        description: "The rules are simple, the consequences are absolute. Inspired by survival scenarios, teams navigate through mental, physical, and strategic games where every round is a surprise.", 
        prizePool: "2000", 
        entryFee: "250", 
        formLink: "#", 
        posterUrl: "/posters/do-or-die.png",
        branch: "R & A",
        teamSize: "4",
        rules: [
          "Team formation - team members must be registered together and cannot be changed after the deadline.",
          "Number of participants - each group should have 4 participants.",
          "The game consists of 4 levels, every game is a surprise inspired by survival scenarios.",
          "Each game will have specific instructions and scoring criteria, communicated beforehand.",
          "If there is a tie between the groups, there will be a tie-breaker round.",
          "Contact for registration: Shrivats S (8105640940) or Shreya Savant (8088247900)"
        ]
      },
      { 
        title: "Volleyball", 
        category: "Non-Technical", 
        description: "A thrilling team sport where accuracy and power meet. Compete in intense sets to ground the ball and claim the trophy.", 
        prizePool: "1st & 2nd (Trophy & Cash Prize)", 
        entryFee: "500", 
        formLink: "#", 
        posterUrl: "/posters/volleyball.png",
        branch: "R & A",
        teamSize: "6+3 (9 total)",
        rules: [
          "15 points – 3 (sets) knockout matches.",
          "Team: 6 main + 3 substitute players (College ID compulsory).",
          "No passout students allowed.",
          "Umpire decision is final. Misbehavior results in immediate disqualification.",
          "Registration: Both online and on-spot available.",
          "Contact for registration: Abhinandan P (8660569165) or Shreetej B (9538196123)"
        ]
      },
      { 
        title: "Robo Race", 
        category: "Technical", 
        description: "A high-octane competitive race where manually controlled robots navigate a predefined track filled with obstacles, sharp turns, and narrow sections.", 
        prizePool: "2000", 
        entryFee: "400", 
        formLink: "#", 
        branch: "R & A",
        teamSize: "2-4",
        rules: [
          "Robot Specs: Max 30cm x 30cm x 30cm. Wired/wireless manual control only (No autonomous).",
          "Track Details: 30cm width. Includes sharp turns, zig-zags, and obstacles (bumps, slopes).",
          "Gameplay: Each team gets 2 attempts; the best time will be considered for ranking.",
          "Penalties: Off track (+5s), Manual touch (+10s), Skipping track (+15s).",
          "Team Rules: 2-4 members. Teams must bring their own robot and accessories.",
          "Contact for registration: Ashish Khangavkar (6364470388) or Pramod Vitekar (8217564700)"
        ]
      },
    ],
    culturalEvents: [],
    gamingEvents: [],
  },
  {
    name: "Electronics & Communication",
    shortName: "E & C",
    color: "fest-purple",
    events: [
      { title: "TinkerCad", category: "Technical", description: "Circuit design and 3D modeling challenge.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "E & C", rules: ["Use TinkerCad for design", "Problem statement given on spot", "Efficiency of circuit judged"] },
      { title: "One Minute Games", category: "Non-Technical", description: "Fast-paced mini-games to test your agility.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "E & C", rules: ["60 seconds per game", "Accumulate points across rounds", "Fun and engaging atmosphere"] },
      { title: "Chaat Champ", category: "Non-Technical", description: "Cooking/Tasting challenge for the foodies.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "E & C", rules: ["Speed and presentation are key", "Hygiene must be maintained", "Tasting tests included"] },
      { title: "Meme Making", category: "Non-Technical", description: "Digital creativity at its finest.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "E & C", rules: ["Original memes only", "Relatable and funny themes", "Public voting inclusion possible"] },
      { title: "Tug of War", category: "Non-Technical", description: "Ultimate test of strength.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "E & C", rules: ["Standard tug of war rules", "Team participation", "Strength and strategy"] },
      { title: "Fun Junction", category: "Non-Technical", description: "A collection of engaging and fun activities.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "E & C", rules: ["Various participation modes", "Open to all age groups", "Joy and entertainment prioritized"] },
      { title: "Mystery Trail", category: "Non-Technical", description: "Follow the clues to solve the mystery.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "E & C", rules: ["Solve puzzles to move to next node", "Team coordination is required", "Time-based completion"] },
    ],
    culturalEvents: [],
    gamingEvents: [],
  },
  {
    name: "Mechanical Engineering",
    shortName: "MECH",
    color: "fest-yellow",
    events: [
      { title: "Bridge Making Challenge", category: "Technical", description: "Build the strongest bridge using basic materials.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "MECH", rules: ["Use provided materials only", "Max weight and strength judged", "Structural innovation rewarded"] },
      { title: "The Auto Expert", category: "Technical", description: "Showcase your automotive knowledge and skills.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "MECH", rules: ["Knowledge test on auto trends", "Practical engine assembly/disassembly possible", "Mechanical insight judged"] },
      { title: "Number Circle Cricket", category: "Non-Technical", description: "A unique version of cricket focusing on target hitting.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "MECH", rules: ["Special ground rules", "Focus on accurate shot placement", "Quick scoring format"] },
      { title: "Stand Up Comedy", category: "Cultural", description: "Make the audience roar with laughter.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "MECH", rules: ["Original sets only", "Respectful content", "5-minute time limit"] },
      { title: "Ping Pong", category: "Gaming", description: "Table tennis tournament.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "MECH", rules: ["Standard TT rules", "Best of 3 sets", "Fair play is essential"] },
    ],
    culturalEvents: [],
    gamingEvents: [],
  },
  {
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    color: "fest-orange",
    events: [
      { title: "Technical Paper Presentation", category: "Technical", description: "Present your research and findings in electrical tech.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "EEE", rules: ["Abstract submission required", "10-minute presentation", "Scientific rigor judged"] },
      { title: "Finger Billiards", category: "Non-Technical", description: "Test your precision in this scaled-down billiards.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "EEE", rules: ["Precision of shots", "Tournament bracket", "Fun and competitive"] },
      { title: "Rangotsav", category: "Cultural", description: "Festival of colors and artistic rangoli patterns.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "EEE", rules: ["Traditional and modern themes", "Natural colors encouraged", "Time limit: 2 hours"] },
      { title: "Touch-free-trail", category: "Technical", description: "Navigate using gesture controls or sensors.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "EEE", rules: ["No physical contact allowed", "Sensor-based navigation", "Ingenuity in design judged"] },
    ],
    culturalEvents: [],
    gamingEvents: [],
  },
  {
    name: "Civil Engineering",
    shortName: "CIVIL",
    color: "fest-blue",
    events: [
      { title: "Design Doodle Studio", category: "Technical", description: "Create innovative architectural designs and doodles.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CIVIL", rules: ["Architectural concepts explored", "Creative doodling on themes", "Visual appeal and design logic"] },
      { title: "Pictogram X", category: "Technical", description: "Solve pictorial puzzles related to civil engineering.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CIVIL", rules: ["Identify engineering concepts from pics", "Timed rounds", "Speed and accuracy"] },
      { title: "The Messy Masterpiece", category: "Cultural", description: "Create art without brushes using your hands and soul.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CIVIL", rules: ["No brushes allowed", "Theme announced on spot", "Artistic expression judged"] },
      { title: "Battle of Legends", category: "Non-Technical", description: "A legendary quiz and talent showdown.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "CIVIL", rules: ["Multiple rounds of trivia", "Performance element for bonus pts", "Grand finale for the legends"] },
    ],
    culturalEvents: [],
    gamingEvents: [],
  },
  {
    name: "Bachelor of Computer Applications",
    shortName: "BCA",
    color: "fest-green",
    events: [
      { title: "Eva Intellect", category: "Technical", description: "Showcase your technical intellect in the world of computing.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "BCA", rules: ["Analytical and logical challenges", "Algorithmic thinking", "High-speed problem solving"] },
      { title: "Navi Voice", category: "Non-Technical", description: "A voice-based interaction and communication challenge.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "BCA", rules: ["Vocal clarity and command", "Interpretation speed", "Creative dialogue"] },
      { title: "Pendora Warriors", category: "Gaming", description: "Ultimate showdown in the world of Pandora gaming.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "BCA", rules: ["Epic battle royale", "Team strategy is vital", "No cheating allowed"] },
      { title: "Jeck's Tribal Art", category: "Cultural", description: "Express tribal art forms from the world of Jeck.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "BCA", rules: ["Original tribal themes", "Materials must be natural-inspired", "Aesthetic and cultural depth"] },
      { title: "Avatar Reelverse", category: "Cultural", description: "Create epic reels and short content in the Avatar theme.", prizePool: "2000", entryFee: "150", formLink: "#", branch: "BCA", rules: ["Use theme-specific digital effects", "Creative storytelling in short form", "High engagement value judged"] },
    ],
    culturalEvents: [
      { title: "Singing", category: "Cultural", description: "General singing competition.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Individual", duration: "Full Day", venue: "Main Stage", rules: ["Solo performance", "Any genre", "Live vocals only"] },
      { title: "Dance", category: "Cultural", description: "General dance competition.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Solo or Group (5-12)", duration: "Full Day", venue: "Main Stage", rules: ["Solo or group", "Max 5 mins", "Props allowed"] },
    ],
    gamingEvents: [],
  },
];

export const culturalEvents: Event[] = [
  { title: "Singing", category: "Cultural", description: "Unleash your vocal talent.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Individual", duration: "Full Day", venue: "Main Stage", rules: ["Individual participation", "Any genre accepted", "5-minute performance"] },
  { title: "Dance", category: "Cultural", description: "Express yourself through movement.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Solo or Group (5-12)", duration: "Full Day", venue: "Main Stage", rules: ["Solo or group", "3-8 minute performance", "Any dance form"] },
  { title: "Mr & Miss Vencer", category: "Cultural", description: "The ultimate personality challenge.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Individual", duration: "Full Day", venue: "Main Stage", rules: ["Confidence & personality judged", "Theme-based ramp walk", "Q&A round"] },
];

export const gamingEvents: Event[] = [
  { title: "BGMI", category: "Gaming", description: "The ultimate Battle Royale experience.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Squad (4)", duration: "Day 1 & Day 2", venue: "Gaming Arena", rules: ["Mobile only", "No emulator allowed", "Standard tournament settings"] },
  { title: "FIFA", category: "Gaming", description: "Dominate the virtual pitch.", prizePool: "2000", entryFee: "150", formLink: "#", teamSize: "Individual", duration: "Day 1", venue: "Gaming Zone", rules: ["Match length: 6 mins", "World Class difficulty", "Legacy defending off"] },
];
