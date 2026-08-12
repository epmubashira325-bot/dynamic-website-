import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ServiceHero, 
  ServiceOverview, 
  ServiceFeatures, 
  ServiceProcess,
  FAQSection,
  CTASection 
} from '../components/ServiceReusableComponents';

import heroImg from '../assets/images/services/consulting.jpg'; // Using consulting.jpg for architecture as fallback

const ArchitectureSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Concept Design",
      description: "Translating your vision into innovative, functional, and aesthetically striking architectural concepts.",
      icon: "💡"
    },
    {
      title: "3D Visualization",
      description: "High-fidelity renders and virtual walkthroughs to help you visualize the final space before construction begins.",
      icon: "🖥️"
    },
    {
      title: "Sustainable Architecture",
      description: "Integrating eco-friendly materials and energy-efficient designs to create sustainable, future-proof buildings.",
      icon: "🌿"
    },

  ];

  const processSteps = [
    { title: "Briefing", description: "Deep dive into your requirements, lifestyle, budget, and aesthetic preferences." },
    { title: "Schematic Design", description: "Developing initial floor plans, elevations, and exploring spatial relationships." },
    { title: "Design Development", description: "Refining the design, selecting materials, and integrating structural and MEP systems." },
    { title: "Construction Documents", description: "Producing precise, highly detailed blueprints required for permitting and construction." }
  ];

  const faqs = [
    {
      question: "What is the difference between an architect and an interior designer?",
      answer: "Architects focus on the exterior design, structural layout, and building codes, while interior designers focus on the aesthetics, functionality, and flow of the interior spaces. We offer both."
    },
    {
      question: "How long does the architectural design phase take?",
      answer: "It varies greatly depending on the project's scale and complexity. A residential concept might take a few weeks, while a large commercial project can take several months."
    },
    {
      question: "Do you handle the building permits?",
      answer: "Yes, our team prepares all necessary documentation and liaises with local authorities to secure the required approvals for your project."
    }
  ];

  return (
    <div className="service-detail-page">
      <Navbar />
      
      <ServiceHero 
        title="Architecture Support"
        subtitle="Designing visionary spaces that inspire, function flawlessly, and endure."
        image={heroImg}
        breadcrumbText="Architecture Support"
      />
      
      <ServiceOverview 
        
        description1="We provide professional architecture support based on your project requirements. Through our association with experienced architecture firms, we can connect you with the right professionals and help coordinate the required architectural services for your project."
        image={heroImg}
      />
      
      <ServiceFeatures 
        title="Architectural Services"
        features={features}
      />
      
      <ServiceProcess 
        title="Design Journey"
        steps={processSteps}
      />
      
      
      <CTASection 
        title="Visualize Your Future Space"
        text="Collaborate with our award-winning architects to bring your dream project to life."
        btnText="Schedule a Meeting"
        btnLink="/contact"
      />
      
      <Footer />
    </div>
  );
};

export default ArchitectureSupport;
