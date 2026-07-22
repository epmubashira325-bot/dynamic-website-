/**
 * Centralized data for the AM Associates website.
 * Videos from Pexels (free, royalty-free). Replace with your own when ready.
 * Images reference local assets in src/assets/images/.
 */

/* ========================================
   HERO SLIDES — Minimal text, one CTA each
   ======================================== */
export const heroSlides = [
  {
    id: 1,
    src: "https://videos.pexels.com/video-files/38026983/16139987_2160_3840_24fps.mp4",
    label: "LUXURY LIVING ROOM",
    headline: "Designing Spaces\nThat Inspire",
    description: "Creating elegant living experiences with uncompromising quality.",
    cta: "Explore Projects",
    ctaLink: "/projects",
  },
  {
    id: 2,
    src: "https://videos.pexels.com/video-files/31391673/13394638_1080_1920_30fps.mp4",
    label: "LUXURY MASTER BEDROOM",
    headline: "Crafting Elegant\nLiving Experiences",
    description: "Serene, beautifully appointed sanctuaries designed for relaxation.",
    cta: "Our Services",
    ctaLink: "/services",
  },
  {
    id: 3,
    src: "https://videos.pexels.com/video-files/10216191/10216191-hd_1920_1080_25fps.mp4",
    label: "LUXURY MODULAR KITCHEN",
    headline: "Engineering\nBeyond Limits",
    description: "State-of-the-art culinary spaces built with structural perfection.",
    cta: "Contact Us",
    ctaLink: "/contact",
  },
];

/* ========================================
   PREMIUM VIDEO SECTIONS (Home Page)
   Added sectionId for navigation to services page
   ======================================== */
export const premiumSectionsData = [
  {
    id: "interior",
    sectionId: "interior-design",
    src: "https://videos.pexels.com/video-files/7578547/7578547-uhd_2560_1440_30fps.mp4",
    heading: "Interior Design",
    description: "Creating elegant interiors that blend comfort, functionality, and timeless design.",
    buttonText: "Explore Interior Projects",
    link: "/projects",
    category: "interior"
  },
  {
    id: "architecture",
    sectionId: "architecture",
    src: "https://videos.pexels.com/video-files/17224631/17224631-uhd_2560_1440_30fps.mp4",
    heading: "Architecture",
    description: "Innovative architectural designs that combine creativity with structural excellence.",
    buttonText: "View Architecture",
    link: "/projects",
    category: "architecture"
  },
  {
    id: "structural",
    sectionId: "structural-engineering",
    src: "https://videos.pexels.com/video-files/36157412/15334504_2560_1440_30fps.mp4",
    heading: "Structural Engineering",
    description: "Delivering safe, efficient, and technically sound structural solutions for every project.",
    buttonText: "Learn More",
    link: "/services",
    category: "structural"
  },
  {
    id: "construction",
    sectionId: "construction",
    src: "https://videos.pexels.com/video-files/31025079/13261761_2560_1440_24fps.mp4",
    heading: "Construction",
    description: "From concept to completion, we build spaces with precision, quality, and durability.",
    buttonText: "View Projects",
    link: "/projects",
    category: "construction"
  },
  {
    id: "renovation",
    sectionId: "renovation",
    src: "https://videos.pexels.com/video-files/34955001/14806978_2560_1440_25fps.mp4",
    heading: "Renovation",
    description: "Revitalizing existing structures with modern upgrades, preserving integrity while enhancing functionality and aesthetic appeal.",
    buttonText: "Discover Renovation",
    link: "/services",
    category: "renovation"
  },
  {
    id: "cta",
    sectionId: "contact",
    src: "https://cdn.pixabay.com/video/2024/06/07/215697_large.mp4",
    heading: "Let's Build Your Dream Project",
    description: "From structural engineering to premium interiors, AM Associates delivers excellence at every stage.",
    buttonText: "Contact Us",
    link: "/contact",
    category: "cta",
    isCTA: true
  }
];

/* ========================================
   ABOUT SECTION
   ======================================== */
export const aboutVideo =
  "https://media.w3.org/2010/05/sintel/trailer.mp4";

export const aboutCounters = [
  { number: 15, suffix: "+", label: "Years" },
  { number: 450, suffix: "+", label: "Projects" },
  { number: 300, suffix: "+", label: "Clients" },
  { number: 50, suffix: "+", label: "Team" },
];

/* ========================================
   SERVICES — 8 premium cards
   ======================================== */
export const servicesData = [
  { title: "Architecture", icon: "FaDraftingCompass", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { title: "Interior Design", icon: "FaCouch", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { title: "Structural Design", icon: "FaCubes", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { title: "Planning", icon: "FaClipboardList", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { title: "Construction", icon: "FaHardHat", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { title: "Renovation", icon: "FaTools", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { title: "Landscape", icon: "FaTree", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { title: "Project Management", icon: "FaTasks", video: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
];

/* ========================================
   PROJECTS — Masonry with filters
   ======================================== */
export const projectCategories = [
  "All",
  "Residential",
  "Commercial",
  "Interior",
  "Villa",
  "Apartment",
];

export const projectsData = [
  {
    title: "The Golden Estate",
    category: "Villa",
    location: "Palakkad, Kerala",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    tall: true,
  },
  {
    title: "Lumina Penthouse",
    category: "Apartment",
    location: "Kochi, Kerala",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    tall: false,
  },
  {
    title: "Aura Commercial Tower",
    category: "Commercial",
    location: "Coimbatore, TN",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    tall: false,
  },
  {
    title: "Serene Villa",
    category: "Residential",
    location: "Thrissur, Kerala",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    tall: true,
  },
  {
    title: "Modern Living Suite",
    category: "Interior",
    location: "Bangalore, KA",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    tall: false,
  },
  {
    title: "Pearl Residences",
    category: "Residential",
    location: "Calicut, Kerala",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    tall: true,
  },
];

/* ========================================
   VIDEO SHOWCASE
   ======================================== */
export const videoShowcaseData = [
  {
    title: "Luxury Villa Walkthrough",
    duration: "2:45",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  {
    title: "Modern Interior Tour",
    duration: "3:12",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  {
    title: "Construction Timelapse",
    duration: "1:58",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  {
    title: "Architectural Showcase",
    duration: "4:20",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
];

/* ========================================
   WHY CHOOSE US — 6 cards, one sentence each
   ======================================== */
// src/data/videoData.js
export const whyChooseUsData = [
  {
    icon: "FaCubes",
    title: "Structural Engineering",
    desc: "Delivering safe and efficient structural solutions for every scale.",
  },
  {
    icon: "FaCouch",
    title: "Interior Design",
    desc: "Creating elegant and timeless living spaces.",
  },
  {
    icon: "FaDraftingCompass",
    title: "Architecture",
    desc: "Innovative architectural designs pushing boundaries.",
  },
  {
    icon: "FaHardHat",
    title: "Construction",
    desc: "Building spaces with precision and premium quality.",
  },
  {
    icon: "FaTasks",
    title: "Project Management",
    desc: "Ensuring projects are completed on schedule seamlessly.",
  },
  {
    icon: "FaShieldAlt",
    title: "Quality Assurance",
    desc: "100% dedication to premium materials and durability.",
  },
];

/* ========================================
   TESTIMONIALS — Image-based
   ======================================== */
export const testimonialsData = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner, Palakkad",
    quote: "AM Associates transformed our dream into reality. The attention to detail exceeded all expectations.",
    rating: 5,
    initial: "R",
    color: "#C9A96E",
  },
  {
    name: "Priya Menon",
    role: "Business Owner, Kochi",
    quote: "Their structural design expertise gave us complete confidence. Truly professional and reliable.",
    rating: 5,
    initial: "P",
    color: "#8B7355",
  },
  {
    name: "Dr. Suresh Nair",
    role: "Property Developer",
    quote: "Exceptional experience. They delivered our luxury villa on time and beyond expectations.",
    rating: 5,
    initial: "S",
    color: "#A88B4A",
  },
  {
    name: "Anitha Krishnan",
    role: "Interior Client, Thrissur",
    quote: "The interior design team created spaces that are both stunning and deeply functional.",
    rating: 5,
    initial: "A",
    color: "#B5952F",
  },
  {
    name: "Mohammed Faisal",
    role: "Commercial Client",
    quote: "Our commercial project was handled with incredible professionalism from start to finish.",
    rating: 5,
    initial: "M",
    color: "#C9A96E",
  },
];

/* ========================================
   STATS — 4 large counters
   ======================================== */
export const statsData = [
  { number: 15, suffix: "+", label: "Years Experience" },
  { number: 500, suffix: "+", label: "Completed Projects" },
  { number: 300, suffix: "+", label: "Happy Clients" },
  { number: 50, suffix: "+", label: "Professional Experts" },
];

/* ========================================
   GALLERY
   ======================================== */
export const galleryData = [
  { type: "image", tall: true },
  { type: "image", tall: false },
  { type: "video", tall: false, src: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { type: "image", tall: true },
  { type: "image", tall: false },
  { type: "video", tall: true, src: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
  { type: "image", tall: false },
  { type: "image", tall: false },
];

/* ========================================
   PROCESS TIMELINE — 5 steps
   ======================================== */
export const processSteps = [
  { step: "01", title: "Consultation", desc: "Understanding your vision, goals, and project requirements." },
  { step: "02", title: "Planning", desc: "Detailed project planning with feasibility and site analysis." },
  { step: "03", title: "Design", desc: "Creating innovative architectural designs and 3D visualizations." },
  { step: "04", title: "Execution", desc: "Precision construction with premium materials and craftsmanship." },
  { step: "05", title: "Delivery", desc: "Final inspections, finishing touches, and seamless handover." },
];

/* ========================================
   CONTACT — Video background
   ======================================== */
export const contactVideo =
  "https://media.w3.org/2010/05/sintel/trailer.mp4";