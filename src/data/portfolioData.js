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
    id: 'image-of-a-child',
    title: 'Image Of A Child — LMS & Early Childhood Gaming Platform',
    company: 'Image Of A Child Pvt Ltd. (Amphiventures)',
    category: 'ui-ux',
    categoryLabel: 'UI/UX Product',
    year: '2023 — 2024',
    featured: true,
    summary: 'Lead designer for complete website and LMS product UI across web and mobile apps. Created design systems, user flows, and 2,000+ gaming UI activity templates using Midjourney AI while managing a 12-member design team.',
    tags: ['LMS Product', 'Design System', 'Mobile App', 'Midjourney AI', 'Team Leadership'],
    heroColor: 'from-[#FFF1EB] to-[#FFE3D6]',
    accentColor: '#E07A5F',
    coverImage: 'image-of-a-child',
    challenge: 'Early childhood educators and children required an engaging, frictionless learning management system with intuitive gamified activities that simplified complex curriculum flows.',
    solution: 'Designed comprehensive web and mobile LMS interfaces, created scalable modular UI templates for mini-games with AI asset generation, and built unified cross-platform design tokens.',
    designTokens: {
      fonts: ['Plus Jakarta Sans (Display & Body)', 'Outfit (Playful Headings)'],
      colors: [
        { name: 'Warm Terracotta', hex: '#E07A5F' },
        { name: 'Sunny Butter', hex: '#F4A261' },
        { name: 'Sage Mint', hex: '#588157' },
        { name: 'Espresso Ink', hex: '#1E1B18' }
      ],
      density: 'Accessible Child & Educator Friendly Spacing'
    },
    screens: [
      {
        title: 'LMS Web & Mobile Dashboard',
        type: 'Product Interface',
        description: 'Comprehensive curriculum navigation, progress tracking, and student activity hub.'
      },
      {
        title: 'Mini-Game UI Template Engine',
        type: 'Interactive Gamification',
        description: 'Over 2,000+ mini-game activities with custom UI components and Midjourney AI visual assets.'
      },
      {
        title: 'Brand Collateral & Launch Materials',
        type: 'Brand & Event Design',
        description: 'Event branding and launch collateral for Le Meridien Coimbatore and IOAC video series.'
      }
    ]
  },
  {
    id: 'freckled-cubism',
    title: 'Freckled — Cubism Rebrand & Web Platform Revamp',
    company: 'Freckled Pvt Ltd. (Amphiventures)',
    category: 'ui-ux',
    categoryLabel: 'UI/UX & Brand',
    year: '2023 — 2024',
    featured: true,
    summary: 'Revamped the full website experience resulting in 2.5x faster load time and 33% higher traffic. Reconceptualized company branding in a bold Cubism theme across UI and corporate events.',
    tags: ['Website Redesign', 'Cubism Branding', 'Performance', 'Event Design'],
    heroColor: 'from-[#F5EFEB] to-[#EAE0D5]',
    accentColor: '#C86D51',
    coverImage: 'freckled',
    challenge: 'The legacy website suffered from slow load times, confusing user flows, and an outdated visual brand identity.',
    solution: 'Engineered streamlined user flows, low-to-high fidelity component libraries, and a distinctive Cubism brand identity that elevated user engagement and corporate presence.',
    designTokens: {
      fonts: ['Instrument Serif (Headings)', 'Plus Jakarta Sans (Body)'],
      colors: [
        { name: 'Cubist Terracotta', hex: '#C86D51' },
        { name: 'Oat Canvas', hex: '#FAF7F2' },
        { name: 'Basalt Charcoal', hex: '#22201D' },
        { name: 'Gold Ochre', hex: '#E9C46A' }
      ],
      density: 'High-Conversion Responsive Layout'
    },
    screens: [
      {
        title: 'High-Performance Web Architecture',
        type: 'Responsive Web',
        description: 'Re-architected user journeys driving 2.5x faster performance and +33% traffic uplift.'
      },
      {
        title: 'Cubism Brand Identity System',
        type: 'Visual Identity',
        description: 'Geometric brandmarks, vector icon packs, and social media marketing assets.'
      },
      {
        title: 'Corporate Event Branding',
        type: 'Event Collateral',
        description: 'Brand collateral and presentation decks for KRPIET Coimbatore and Human Inverse.'
      }
    ]
  },
  {
    id: 'smartworks-spaces',
    title: 'Smartworks — Environmental Wall Art & Spatial Branding',
    company: 'Smartworks Co-Working Spaces Pvt Ltd.',
    category: 'graphic-brand',
    categoryLabel: 'Graphic & Spatial Design',
    year: '2021',
    featured: true,
    summary: 'Delivered large-scale environmental wall art, glass frosting graphics, and interior draft blueprint renders for 20+ multinational corporate brands.',
    tags: ['Environmental Graphics', 'Wall Art', 'MNC Branding', 'Glass Frosting'],
    heroColor: 'from-[#EAF0F6] to-[#D5E3EE]',
    accentColor: '#4A7C59',
    coverImage: 'smartworks',
    challenge: 'Creating distinct, inspiring spatial graphic identities for diverse MNC office tenants within high-end co-working spaces.',
    solution: 'Collaborated with interior architects and client teams to design bespoke geometric wall art and glass frosting patterns for brands including HP, Teva Pharma, Havells, and Bridgestone.',
    designTokens: {
      fonts: ['Plus Jakarta Sans', 'JetBrains Mono'],
      colors: [
        { name: 'Corporate Forest', hex: '#4A7C59' },
        { name: 'Architectural Stone', hex: '#E6DCCE' },
        { name: 'Deep Slate', hex: '#1E1B18' }
      ],
      density: 'Architectural Scale Specs'
    },
    screens: [
      {
        title: 'MNC Environmental Wall Murals',
        type: 'Spatial Graphic',
        description: 'Custom large-format vector murals for HP, Havells, Teva Pharma, and Bridgestone.'
      },
      {
        title: 'Glass Frosting Pattern Systems',
        type: 'Vector Architecture',
        description: 'Privacy-focused yet aesthetically striking frosted glass patterns for conference suites.'
      },
      {
        title: 'Interior Blueprint Collaborations',
        type: 'Architectural Renders',
        description: 'Integrated design drafts aligning graphic identity with physical interior architecture.'
      }
    ]
  },
  {
    id: 'sorbetto-cafe',
    title: 'Sorbetto Gelateria & Cafe — Visual Identity & Marketing',
    company: 'Sorbetto Gelateria and Cafe',
    category: 'graphic-brand',
    categoryLabel: 'Graphic & Brand',
    year: '2021 — 2022',
    featured: false,
    summary: 'Designed vibrant menu boards, physical banners, and Instagram marketing campaigns to boost customer footfall and brand recognition.',
    tags: ['Menu Design', 'Social Media', 'Packaging', 'Marketing'],
    heroColor: 'from-[#FDF4E3] to-[#FCE7BA]',
    accentColor: '#D97706',
    coverImage: 'sorbetto',
    challenge: 'A boutique gelateria needed cohesive, appetizing visual communication across print menu boards and digital social channels.',
    solution: 'Created an appetizing, warm typographic menu hierarchy and high-engagement social media promotional posters.',
    designTokens: {
      fonts: ['Plus Jakarta Sans', 'Instrument Serif'],
      colors: [
        { name: 'Gelato Amber', hex: '#D97706' },
        { name: 'Warm Cream', hex: '#FAF7F2' },
        { name: 'Pistachio Mint', hex: '#588157' }
      ],
      density: 'High-Readability Menu Spacing'
    },
    screens: [
      {
        title: 'In-Store Menu Board System',
        type: 'Print & Signage',
        description: 'High-contrast, appetizing food and beverage menu hierarchy.'
      },
      {
        title: 'Instagram Marketing Campaign',
        type: 'Social Branding',
        description: 'Engaging seasonal promotional creatives and story templates.'
      }
    ]
  }
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
  { name: "Figma", level: "Expert", category: "UI/UX & Prototyping" },
  { name: "Adobe XD", level: "Advanced", category: "UI/UX Prototyping" },
  { name: "Adobe Illustrator", level: "Expert", category: "Vector & Brand" },
  { name: "Adobe Photoshop", level: "Advanced", category: "Visual Design" },
  { name: "After Effects", level: "Intermediate", category: "Motion & Micro-animations" },
  { name: "Midjourney AI", level: "Advanced", category: "AI Creative Generation" },
  { name: "Miro", level: "Advanced", category: "Journey Mapping & Brainstorming" },
  { name: "Blender", level: "Intermediate", category: "3D Visuals" }
];

export const languages = [
  "English", "Kannada", "Hindi", "Telugu", "Tamil"
];
