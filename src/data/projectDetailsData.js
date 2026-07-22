import project1 from "../assets/images/projects/project1.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";
import project4 from "../assets/images/projects/project4.jpg";
import project5 from "../assets/images/projects/project5.jpg";
import interior1 from "../assets/images/services/interior.jpg";
import structural1 from "../assets/images/services/structural.jpg";

export const projectHero = {
  image: project1,
  name: "The Signature Residence",
  category: "Luxury Residential",
  location: "Kochi, Kerala",
  year: "2025"
};

export const projectOverview = {
  image: project2,
  heading: "Project Overview",
  description: "A masterful blend of contemporary design and functional space planning. This luxury residence redefines modern living with its open-plan architecture, seamless indoor-outdoor transitions, and premium material palette, all set against a stunning landscape.",
  cards: [
    { title: "Project Type", value: "Residential Villa", icon: "FaHome" },
    { title: "Client", value: "Private Owner", icon: "FaUserTie" },
    { title: "Area", value: "8,500 sq.ft", icon: "FaRulerCombined" },
    { title: "Services", value: "Architecture, Interior", icon: "FaCubes" }
  ]
};

export const projectGallery = [
  { id: 1, img: project1, span: "col-span-2 row-span-2" },
  { id: 2, img: interior1, span: "col-span-1 row-span-1" },
  { id: 3, img: project3, span: "col-span-1 row-span-2" },
  { id: 4, img: structural1, span: "col-span-1 row-span-1" },
  { id: 5, img: project4, span: "col-span-2 row-span-1" },
  { id: 6, img: project5, span: "col-span-1 row-span-1" }
];

export const designHighlights = [
  { icon: "FaLeaf", title: "Sustainable Design", desc: "Energy-efficient architecture with maximum natural lighting." },
  { icon: "FaLayerGroup", title: "Space Planning", desc: "Optimized layouts creating seamless flow between zones." },
  { icon: "FaGem", title: "Premium Interiors", desc: "Bespoke furnishings and high-end material finishes." },
  { icon: "FaShieldAlt", title: "Structural Strength", desc: "Advanced engineering ensuring safety and longevity." }
];

export const projectSpecs = [
  { label: "Project Name", value: "The Signature Residence" },
  { label: "Category", value: "Luxury Residential" },
  { label: "Location", value: "Kochi, Kerala" },
  { label: "Plot Area", value: "12,000 sq.ft" },
  { label: "Built-up Area", value: "8,500 sq.ft" },
  { label: "Floors", value: "G + 2" },
  { label: "Completion Year", value: "2025" },
  { label: "Project Status", value: "Completed" },
  { label: "Services Included", value: "Architecture, Structural, Interiors" }
];

export const relatedProjects = [
  {
    image: project3,
    name: "Skyline Commercial",
    category: "Commercial Space",
    description: "A modern commercial hub featuring glass facades and sustainable energy systems.",
    link: "/projects"
  },
  {
    image: project4,
    name: "Heritage Renovation",
    category: "Renovation",
    description: "Restoring a classic 90s villa into a contemporary modern masterpiece.",
    link: "/projects"
  },
  {
    image: project5,
    name: "Urban Apartments",
    category: "Residential",
    description: "High-rise luxury apartments designed for the ultimate urban lifestyle.",
    link: "/projects"
  }
];

export const ctaSection = {
  vimeoId: "79298633",
  heading: "Inspired by This Project?",
  description: "Let's create a space that reflects your vision with innovative design and engineering excellence.",
  button1: "Contact Us",
  button2: "Request Consultation"
};
