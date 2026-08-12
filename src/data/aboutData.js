// src/data/aboutData.js

export const aboutHero = {
  videoUrl: "/abstract-pattern.mp4",
  label: "ABOUT AM ASSOCIATES",
  heading: "Engineering Excellence ",
  description: "Providing structural  engineering, construction support , and design support with practical solutions tailored to your project needs.",
  ctaText: "Explore Our Journey",
};

export const aboutStats = {
  counters: [
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 30, suffix: "+", label: "Projects Completed" },
    { number: 100, suffix: "%", label: "Quality Assurance" },
  ]
};

// Maps live values from /api/statistics/ onto a counters array by matching
// each item's label (case-insensitive substring match), so it works for
// both aboutStats.counters ("Years Experience", "Projects Completed") and
// videoData.js's aboutCounters ("Years", "Projects", "Clients").
// Falls back to the static "number" if liveStats is null/loading, or if a
// label has no matching backend field (e.g. Quality Assurance, Team).
export const mergeLiveCounters = (counters, liveStats) => {
  if (!liveStats) return counters;

  return counters.map((counter) => {
    const label = counter.label.toLowerCase();
    let liveValue;

    if (label.includes("year")) liveValue = liveStats.years_experience;
    else if (label.includes("project")) liveValue = liveStats.completed_projects;
    else if (label.includes("client")) liveValue = liveStats.happy_clients;

    return liveValue !== undefined && liveValue !== null
      ? { ...counter, number: liveValue }
      : counter;
  });
};

export const aboutPhilosophy = {
  vimeoId: "123553635",
  heading: "Our Philosophy",
  description: "We believe every project should combine engineering precision, thoughtful design, and lasting value. Our approach transforms ideas into functional, beautiful, and enduring spaces."
};

export const aboutExpertise = [
  { icon: "FaBuilding", title: "Structural Engineering", desc: "Delivering safe and efficient structural solutions." },
  { icon: "FaDraftingCompass", title: "Architectural Team  Support", desc: "Innovative designs pushing architectural boundaries." },
  { icon: "FaCouch", title: "Interior Team  Support", desc: "Creating elegant and timeless living spaces." },
  { icon: "FaHardHat", title: "Construction Team  Support", desc: "Building spaces with precision and premium quality." },
  { icon: "FaHandshake", title: "Renovation & Consulting", desc: "Expert guidance and structural revitalization." }
];

export const aboutProcess = [
  { step: "01", title: "Consultation" },
  { step: "02", title: "Planning & Design" },
  { step: "03", title: "Structural Engineering" },
  { step: "04", title: "Construction" },
  { step: "05", title: "Quality Inspection" },
  { step: "06", title: "Project Delivery" }
];

export const aboutWhyChooseUs = [
  "Engineering -Driven Approch",
  "Safe & Durable Structures",
  "Quality Design Approch",
  "Safety Without Compromise",
  "Transparent Process", 
  "Long Term Value"
];

export const aboutProjects = [
  { title: "Skyline Villa", category: "Architecture", img: "project1.jpg", vimeoId: "318721666" },
  { title: "Azure Heights", category: "Interior Design", img: "project2.jpg", vimeoId: "283733056" },
  { title: "The Onyx", category: "Structural Engineering", img: "project3.jpg", vimeoId: "212731897" },
  { title: "Lumina Residences", category: "Construction", img: "project4.jpg", vimeoId: "178433501" }
];

export const aboutTrust = {
  vimeoId: "94449276",
  heading: "Trusted by Homeowners, Businesses & Developers",
  description: "Every completed project reflects our commitment to quality, innovation, and lasting client relationships."
};

export const aboutCTA = {
  videoUrl: "video1.mp4",
  heading: "Let's Create Something Extraordinary Together",
  description: "Whether you're planning a dream home, commercial building, or structural project, AM Associates is ready to bring your vision to life.",
  button1: "Contact Us",
  button2: "View Projects"
};