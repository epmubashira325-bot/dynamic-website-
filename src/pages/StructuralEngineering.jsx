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

import heroImg from '../assets/images/services/structural.jpg'; // We can use the same fallback images or just placeholder if not available.
// Since we used fallback images in ServicesPage.jsx, I will use them.

const StructuralEngineering = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Structural Analysis",
      description: "Advanced computational modeling to ensure the integrity and safety of structures under various loads and environmental conditions.",
      icon: "🏗️"
    },
    {
      title: "Seismic Retrofitting",
      description: "Evaluating and upgrading existing structures to withstand seismic events and meet modern safety standards.",
      icon: "🏢"
    },
    {
      title: "Foundation Design",
      description: "Designing robust foundations tailored to soil conditions, ensuring long-lasting stability for commercial and residential buildings.",
      icon: "📐"
    },
    {
      title: "Steel & Concrete Detailing",
      description: "Precision detailing for structural steel and reinforced concrete, optimizing material usage and construction efficiency.",
      icon: "⚙️"
    }
  ];

  const processSteps = [
    { title: "Initial Assessment", description: "Evaluating project requirements, site conditions, and architectural plans." },
    { title: "Design & Modeling", description: "Creating detailed structural models and performing rigorous safety calculations." },
    { title: "Review & Approval", description: "Collaborating with architects and obtaining necessary regulatory approvals." },
    { title: "Construction Support", description: "Providing on-site guidance and inspections during the building phase." }
  ];

  const faqs = [
    {
      question: "Why do I need a structural engineer?",
      answer: "A structural engineer ensures that a building can safely support its own weight and withstand environmental forces like wind, earthquakes, and heavy loads."
    },
    {
      question: "At what stage should a structural engineer be involved?",
      answer: "Ideally, right from the conceptual design phase. Early involvement helps identify potential challenges and optimizes the overall design."
    },
    {
      question: "Do you handle both residential and commercial projects?",
      answer: "Yes, our team is equipped to handle structural engineering for projects of all scales, from bespoke homes to large commercial complexes."
    }
  ];

  return (
    <div className="service-detail-page">
      <Navbar />
      
      <ServiceHero 
        title="Structural Engineering"
        subtitle="Delivering safe, efficient, and innovative structural solutions for projects of every scale."
        image={heroImg}
        breadcrumbText="Structural Engineering"
      />
      
      <ServiceOverview 
        title="Building the Foundation of the Future"
        description1="At AM Associates, our structural engineering team combines technical excellence with creative problem-solving. We understand that the hidden skeleton of a building is just as crucial as its visible aesthetics."
        description2="We utilize state-of-the-art software and advanced methodologies to deliver structures that are not only compliant with the highest safety standards but also optimized for cost and sustainability. Whether it's a soaring high-rise or a delicate structural renovation, we bring precision to every equation."
        image={heroImg}
      />
      
      <ServiceFeatures 
        title="Our Capabilities"
        features={features}
      />
      
      <ServiceProcess 
        title="Engineering Process"
        steps={processSteps}
      />
      
      
      
      <CTASection 
        title="Ready to Build With Confidence?"
        text="Discuss your next project with our structural experts and ensure your vision stands the test of time."
        btnText="Get a Consultation"
        btnLink="/contact"
      />
      
      <Footer />
    </div>
  );
};

export default StructuralEngineering;
