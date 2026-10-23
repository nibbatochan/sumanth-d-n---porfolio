export const designerProfile = {
  name: "Sumanth D N",
  role: "UI/UX & Graphic Designer",
  location: "Bangalore, Karnataka",
  status: "Available for Full-time Roles & Select Projects",
  tagline: "Developing easy-to-use web interfaces, engaging digital products, and brand identities that warrant attention.",
  bio: "Results-driven UI/UX and Graphic Designer with a passion for creating engaging digital experiences. Experienced in leading design teams, creating comprehensive design systems, and bridging user-oriented design with stunning visuals.",
  email: "sumanthsumi022@gmail.com",
  phone: "(+91) 8660261544",
  secondaryPhone: "(+91) 8497087603",
  socials: {
    behance: "https://behance.net/sumanthsumi",
    linkedin: "https://linkedin.com/in/sumanthdn/",
    dribbble: "https://dribbble.com/sumanthsumi",
    github: "https://github.com/sumanthdn"
  },
  stats: [
    { label: "Gaming UI Activities Created", value: "2,000+" },
    { label: "MNC Workspace Brands Designed", value: "20+" },
    { label: "Design Team Members Managed", value: "12" },
    { label: "Website Performance Boost", value: "2.5x" }
  ]
};

export const stickerInventory = [
  { id: 'uiux', emoji: '✨', label: 'UI/UX Design' },
  { id: 'design-systems', emoji: '🧩', label: 'Design Systems' },
  { id: 'prototyping', emoji: '⚡', label: 'Prototyping & Micro-animations' },
  { id: 'branding', emoji: '🏷️', label: 'Brand & Visual Identity' },
  { id: 'research', emoji: '🔍', label: 'UX Research & Journey Mapping' },
  { id: 'ai', emoji: '🤖', label: 'Midjourney AI & Creative Tech' }
];

export const projectCategories = [
  { id: 'all', label: 'All Work' },
  { id: 'ui-ux', label: 'UI/UX' },
  { id: 'graphic-brand', label: 'Graphic & Brand' }
];

export const projects = [
  {
    id: 'nobroker-commute',
    title: 'NoBroker — Ending the Search Flow Break',
    company: 'NoBroker (Product Design Case Study)',
    category: 'ui-ux',
    categoryLabel: 'UI/UX · Product Design',
    year: '2026',
    featured: true,
    hasDedicatedPage: true,
    thumbnailImage: '/illustrations/nobroker-case-thumbnail.jpg',
    summary: 'A comprehensive product redesign tackling rental search abandonment in Bangalore. Transformed 7 behavioral patterns into an in-app spatial commute engine, verified reality photos, and calm alerts.',
    tags: ['UI/UX Design', 'Product Design', 'UX Research', 'In-App Commute', 'Hi-Fi Lab'],
    heroColor: 'from-[#1A0B05] to-[#0D0502]',
    accentColor: '#EA580C',
    coverImage: 'nobroker',
    challenge: 'When renters leave NoBroker for Google Maps to check travel time and neighbourhood reality, the search flow breaks—Maps is context-heavy and returning to continue the session is difficult.',
    solution: 'Engineered an in-app spatial commute engine (Search by commute + 1–5km radius + direct route to Point A + multi-amenity tabs) and a structured listing Glimpse sheet, backed by an interactive Next.js test lab.',
    details: {
      challenge: 'Renters leave NoBroker for Google Maps to check commute and neighborhood reality. Maps is context-heavy; returning to continue in NoBroker is difficult, causing severe drop-off.',
      solution: 'Created an in-app commute system (Search by commute + Point A routing + amenity tabs + listing Glimpse sheet) without forcing users outside the platform.',
      impact: 'Eliminates mid-search context switching to Maps and provides instant transit clarity across 5 solved friction points.',
      palette: [
        { name: 'NoBroker Teal', hex: '#009999' },
        { name: 'Conversion Red', hex: '#E11D2E' },
        { name: 'Dark Surface', hex: '#1A1A1A' },
        { name: 'Canvas Base', hex: '#F0F0F0' }
      ],
      takeaways: [
        'Flow break vs. pause: leaving for heavy external apps ends search sessions prematurely.',
        'Shape A dedicated spatial screens beat cramped bottom sheets for route + multi-amenity browsing.',
        'Feature addition non-negotiable: inherited NoBroker dual accents (Teal for search, Red for contact) without forcing an ungrounded rebrand.'
      ]
    },
    designTokens: {
      fonts: ['Inter (UI & Body)', 'Source Sans Pro (NoBroker Native)'],
      colors: [
        { name: 'NoBroker Teal', hex: '#009999' },
        { name: 'Action Red', hex: '#E11D2E' },
        { name: 'Ink Charcoal', hex: '#1A1A1A' },
        { name: 'Light Surface', hex: '#F0F0F0' }
      ],
      density: 'Dense Functional Search & Map Viewport'
    },
    screens: [
      {
        title: 'Search by Commute Shell',
        type: 'Native Search Tab',
        description: 'Set "Your place" (workplace, parents\' house, landmark) with flexible 1–5 km radius.'
      },
      {
        title: 'Spatial Commute & Amenity Map',
        type: 'Interactive Map Engine',
        description: 'Point A pin, live travel paths to selected houses, and amenity breakdown (Metro, Groceries, Gyms).'
      },
      {
        title: 'The Glimpse Sheet V6',
        type: 'Neighborhood Reality',
        description: 'Contextual listing sheet covering transit, 5-min walkability, quick commerce delivery, and resident reality.'
      }
    ]
  },
  {
    id: 'poster-challenge',
    title: '30-Day Poster Sprint — Visual Explorations & Typography',
    company: 'Self-Initiated Daily Design Sprint',
    category: 'graphic-brand',
    categoryLabel: 'Graphic & Brand · Poster Sprint',
    year: '2024',
    featured: true,
    hasDedicatedPage: true,
    thumbnailImage: '/posters/poster-sprint-hero-thumb.png',
    summary: 'A 30-day creative poster challenge done in Photoshop under 2 hours daily—coming with on-the-spot ideas, concepts, brutalist typography, and raw graphic designs.',
    tags: ['Graphic Design', 'Poster Series', 'Visual Branding', 'Photoshop'],
    heroColor: 'from-[#1A1016] via-[#24121A] to-[#0E070B]',
    accentColor: '#FF4D2E',
    coverImage: 'poster-challenge',
    challenge: 'Testing creative endurance and visual agility by designing one concept-driven, high-craft poster every 24 hours under strict typographical and thematic constraints.',
    solution: 'Engineered a rapid exploratory workflow combining modular typographic scales, geometric grids, analog halftones, and bold color palettes across 30 consecutive days.',
    details: {
      challenge: 'Testing creative endurance and visual agility by designing one concept-driven poster every day under tight time and compositional constraints.',
      solution: 'Developed 30 distinct poster concepts exploring Swiss grids, brutalist editorial framing, experimental typography, and narrative visual metaphors.',
      impact: 'Sharpened rapid iteration, typographic hierarchy, and visual expression while producing an extensive library of graphic design assets.',
      palette: [
        { name: 'Poster Vermilion', hex: '#FF4D2E' },
        { name: 'Warm Cream', hex: '#F6F3EB' },
        { name: 'Pitch Charcoal', hex: '#141416' },
        { name: 'Acid Lime', hex: '#CCFF00' }
      ],
      takeaways: [
        'Constraint breeds clarity: limiting fonts and grid structures unlocked faster, bolder compositional risks.',
        'Daily cadence builds craft muscle: iterating 30 days straight transformed visual intuition into reliable speed.',
        'Systemic variety: balancing recurring identity elements with distinct daily visual experiments.'
      ]
    },
    designTokens: {
      fonts: ['Syne / Space Grotesk (Display)', 'Inter (Body & Metadata)'],
      colors: [
        { name: 'Poster Vermilion', hex: '#FF4D2E' },
        { name: 'Warm Cream', hex: '#F6F3EB' },
        { name: 'Pitch Charcoal', hex: '#141416' },
        { name: 'Acid Lime', hex: '#CCFF00' }
      ],
      density: 'Experimental Typographic & Grid System'
    },
    screens: [
      {
        title: '30-Day Poster Showcase',
        type: 'Curated Gallery',
        description: 'Selected highlights across the 30-day sprint demonstrating typographic range and composition.'
      }
    ]
  }
];

export const posterChallengeList = [
  { id: 1, day: 'Day 01', title: 'Divine Retribution', filename: 'divine retribution.jpg', tag: 'Editorial', artStyle: 'Editorial Typography & Swiss Layout' },
  { id: 2, day: 'Day 02', title: 'Cold Instinct', filename: 'cold instinct.jpg', tag: 'Brutalist', artStyle: 'Brutalist Grid & High-Contrast Mono' },
  { id: 3, day: 'Day 03', title: 'Ethereal', filename: 'ethereal.jpg', tag: 'Surrealism', artStyle: 'Surrealist Dreamscape & Ambient Gradients' },
  { id: 4, day: 'Day 04', title: 'Free Fall', filename: 'free fall.jpg', tag: 'Kinetic', artStyle: 'Kinetic Motion & Deconstructed Type' },
  { id: 5, day: 'Day 05', title: 'Godsent', filename: 'godsent.jpg', tag: 'Typographic', artStyle: 'Expressive Typographic Hierarchy' },
  { id: 6, day: 'Day 06', title: 'Grab Hold', filename: 'grab hold.jpg', tag: 'Swiss Grid', artStyle: 'Modern Swiss Asymmetric Grid' },
  { id: 7, day: 'Day 07', title: 'Herd Mentality', filename: 'herd mentality.jpg', tag: 'Conceptual', artStyle: 'Conceptual Editorial Satire' },
  { id: 8, day: 'Day 08', title: 'Hollow Alloy', filename: 'hollow alloy.jpg', tag: 'Industrial', artStyle: 'Industrial Brutalism & Metallic Grain' },
  { id: 9, day: 'Day 09', title: 'Man of Heritage', filename: 'man of heritage.jpg', tag: 'Cultural', artStyle: 'Cultural Folk Modernism' },
  { id: 10, day: 'Day 10', title: 'Mayhem Material', filename: 'mayhem material.jpg', tag: 'Distortion', artStyle: 'Distortion Wave & Glitch Art' },
  { id: 11, day: 'Day 11', title: 'Moments of Solitude', filename: 'moments of solitude.jpg', tag: 'Minimalist', artStyle: 'Zen Minimalist Negative Space' },
  { id: 12, day: 'Day 12', title: 'Nazar', filename: 'nazar.jpg', tag: 'Symbolism', artStyle: 'Symbolic Graphic Modernism' },
  { id: 13, day: 'Day 13', title: 'No Cap', filename: 'no Cap.jpg', tag: 'Modern Pop', artStyle: 'Contemporary Neo-Pop & Poster Craft' },
  { id: 14, day: 'Day 14', title: 'Orchestra of War', filename: 'orchestra of war.jpg', tag: 'Composition', artStyle: 'Constructivist Geometric Balance' },
  { id: 15, day: 'Day 15', title: 'Outside Perspectives', filename: 'outside perspectives.jpg', tag: 'Perspective', artStyle: 'Multi-Axis Isometric Perspective' },
  { id: 16, day: 'Day 16', title: 'Polar Harmony', filename: 'polar harmony.jpg', tag: 'Contrast', artStyle: 'Monochrome Inversion & Duo-Tone' },
  { id: 17, day: 'Day 17', title: 'Reflecting in Stillness', filename: 'reflecting in stillness.jpg', tag: 'Zen Minimal', artStyle: 'Meditative Ambient Composition' },
  { id: 18, day: 'Day 18', title: 'Regular Maintainence', filename: 'regular maintainence.jpg', tag: 'Technical', artStyle: 'Technical Blueprint & Metric Grid' },
  { id: 19, day: 'Day 19', title: 'Sense of Hurry', filename: 'sense of hurry.jpg', tag: 'Kinetic Motion', artStyle: 'Dynamic Velocity & Kinetic Distortion' },
  { id: 20, day: 'Day 20', title: 'Shades', filename: 'shades.jpg', tag: 'Monochrome', artStyle: 'Monochromatic Chiaroscuro' },
  { id: 21, day: 'Day 21', title: 'Stoic', filename: 'stoic.jpg', tag: 'Classical', artStyle: 'Classical Roman Sculpture & Serifs' },
  { id: 22, day: 'Day 22', title: 'The Final Voyage', filename: 'the final voyage.jpg', tag: 'Atmospheric', artStyle: 'Atmospheric Depth & Horizon Line' },
  { id: 23, day: 'Day 23', title: 'The Plunge of Wonder', filename: 'the plunge of wonder.jpg', tag: 'Surrealism', artStyle: 'Psychedelic Surrealism' },
  { id: 24, day: 'Day 24', title: 'Tryna Adapt', filename: 'tryna adapt.jpg', tag: 'Experimental', artStyle: 'Experimental Acid Graphic' },
  { id: 25, day: 'Day 25', title: 'Unexpected Holiday', filename: 'unexpected holiday.jpg', tag: 'Vibrant', artStyle: 'Vibrant Chromatic Pop' },
  { id: 26, day: 'Day 26', title: 'Viel of Silence', filename: 'viel of silence.jpg', tag: 'Texture', artStyle: 'Tactile Analog Noise & Texture' },
  { id: 27, day: 'Day 27', title: 'Wasted', filename: 'wasted.jpg', tag: 'Distortion', artStyle: 'Raw Punk Wave Distortion' },
  { id: 28, day: 'Day 28', title: 'What a Wonderful World', filename: 'what a wonderful world.jpg', tag: 'Editorial', artStyle: 'Neo-Classical Editorial Layout' },
  { id: 29, day: 'Day 29', title: 'Blurred Out', filename: 'blurred out.jpg', tag: 'Abstract', artStyle: 'Chromatic Aberration & Soft Blur' },
  { id: 30, day: 'Day 30', title: 'Control Conceal', filename: 'control conceal.jpg', tag: 'Constructivist', artStyle: 'Bauhaus & De Stijl Geometry' }
];

export const experienceTimeline = [
  {
    role: "UI/UX & Graphic Designer (Lead)",
    company: "Image Of A Child Pvt Ltd. (Amphiventures)",
    period: "Nov 2022 — Aug 2024",
    type: "Intern (Nov 2022 – May 2023) • Full-time (May 2023 – Aug 2024)",
    description: "Lead designer for complete website and LMS product UI for web and mobile apps. Created comprehensive design systems, user flows, and 2,000+ gaming activities using Midjourney AI. Managed a team of 12 design members."
  },
  {
    role: "UI/UX & Graphic Designer",
    company: "Freckled Pvt Ltd. (Amphiventures)",
    period: "Nov 2022 — Aug 2024",
    type: "Intern (Nov 2022 – May 2023) • Full-time (May 2023 – Aug 2024)",
    description: "Core design team member responsible for design systems, site maps, and user flows. Revamped the entire website achieving ~2.5x faster load times and 33% higher traffic. Rebranded company in a modern Cubism theme."
  },
  {
    role: "Freelance Graphic Designer",
    company: "Sorbetto Gelateria and Cafe",
    period: "Nov 2021 — Feb 2022",
    type: "Freelance",
    description: "Created appealing menu boards, promotional banners, and engaging Instagram branding campaigns to advertise goods and elevate customer engagement."
  },
  {
    role: "Design Intern",
    company: "Smartworks Co-Working Spaces Pvt Ltd.",
    period: "Aug 2021 — Nov 2021",
    type: "Internship",
    description: "Delivered environmental wall art and glass frosting designs for 20+ MNC brands including Teva Pharma, HP, Havells, and Bridgestone. Created blueprint renders with interior draft design teams."
  }
];

export const academics = [
  {
    degree: "Diploma in UI/UX and Graphic Design",
    institution: "Wiztoonz Academy, Bangalore",
    period: "2020 — 2022",
    description: "Intensive training in user experience research, interface design, design thinking, and visual branding."
  },
  {
    degree: "Bachelor's Degree in Information Science & Engineering (B.E.)",
    institution: "Vivekananda Institute of Technology (VTU), Bangalore",
    period: "2016 — 2020",
    description: "Computer science foundations, software engineering methodologies, web technologies, and information architecture."
  }
];

export const skillsGrouped = [
  {
    category: "UI/UX Design",
    skills: ["UI Design", "UX Writing", "Microcopy", "Prototyping", "Micro Animations", "Design Thinking", "Mockups", "Wireframing", "User Personas", "Low & High Fidelity Design"]
  },
  {
    category: "User Research",
    skills: ["Quantitative & Qualitative Analysis", "Journey Mapping", "SWOT Analysis", "A/B Testing", "Site Mapping", "Information Architecture"]
  },
  {
    category: "Visual & Brand Design",
    skills: ["Branding & Identity", "Poster Design", "Social Media Management", "Brand Campaigns", "Logo Design", "Color Theory", "Typography", "Brand Guidelines"]
  }
];

export const toolstack = [
  // Line 1: Modern Product, Agentic AI & Deployment Stack
  { name: "Figma", level: "Expert", category: "UI/UX & Systems" },
  { name: "Cursor", level: "Advanced", category: "AI Code Editor" },
  { name: "Claude", level: "Advanced", category: "Agentic Reasoning & LLM" },
  { name: "Antigravity", level: "Expert", category: "Agentic IDE & Workflows" },
  { name: "Vercel", level: "Advanced", category: "Deployment & Edge" },
  { name: "Midjourney", level: "Advanced", category: "AI Asset Synthesis" },
  // Line 2: Craft, Motion, 3D & Vector Stack
  { name: "Illustrator", level: "Expert", category: "Vector & Identity" },
  { name: "Photoshop", level: "Advanced", category: "Visual Compositing" },
  { name: "After Effects", level: "Intermediate", category: "Motion & Micro-animations" },
  { name: "Blender", level: "Intermediate", category: "3D Spatial Graphics" },
  { name: "Tailwind CSS", level: "Expert", category: "Design Systems & UI" },
  { name: "Miro", level: "Advanced", category: "UX Journey & Strategy" }
];

export const languages = [
  "English", "Kannada", "Hindi", "Telugu", "Tamil"
];
