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

import heroImg from '../assets/images/services/interior.jpg';

const InteriorDesignSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Space Planning",
      description: "Optimizing the layout of rooms to ensure a seamless flow and maximum functional utilization of the available space.",
      icon: "🛋️"
    },
    {
      title: "Material Selection",
      description: "Curating a premium palette of fabrics, textures, woods, and stones that reflect your personal style and aesthetic.",
      icon: "🎨"
    },
    {
      title: "Custom Furnishings",
      description: "Designing bespoke furniture pieces and cabinetry tailored perfectly to the dimensions and style of your home.",
      icon: "🪑"
    },
    {
      title: "Lighting Design",
      description: "Crafting layered lighting schemes that enhance the mood, highlight architectural features, and improve functionality.",
      icon: "✨"
    }
  ];

  const processSteps = [
    { title: "Discovery", description: "Understanding your lifestyle, tastes, and the functional needs of the space." },
    { title: "Concept Board", description: "Presenting mood boards, color palettes, and initial layout ideas for feedback." },
    { title: "Sourcing & Procurement", description: "Ordering materials, managing vendors, and ensuring all items meet quality standards." },
    { title: "Installation & Styling", description: "Coordinating the delivery, assembly, and final artistic styling of the interior." }
  ];

  const faqs = [
    {
      question: "Do you offer full-service interior design?",
      answer: "Yes, we handle everything from the initial concept to the final styling, including procurement and project management."
    },
    {
      question: "Can you incorporate my existing furniture into the new design?",
      answer: "Absolutely. We love blending cherished pieces with new selections to create a curated, deeply personal space."
    },
    {
      question: "How do you determine the budget for interior design?",
      answer: "We establish a clear budget during the discovery phase and provide transparent cost estimates for furnishings, materials, and labor before proceeding."
    }
  ];

  return (
    <div className="service-detail-page">
      <Navbar />

      <ServiceHero
        title="Interior Design Support"
        subtitle="Crafting immersive, luxurious interiors tailored to your unique lifestyle."
        image={heroImg}
        breadcrumbText="Interior Design Support"
      />

      <ServiceOverview
        title="Artistry in Every Detail"
        description1="We help you create interiors that are a true reflection of you, the residents who call our projects home. We focus on designing spaces that represent your personal style and functionality needs, paired with our unique and timeless design concepts. Our goal is to guide you through this process in an easy and fun way, so our team is skilled in handling all aspects of a design job, including project management, budget review, and collaborating with architects and builders. Together, we can create the home of your dreams.."
        image={heroImg}
      />

      <ServiceFeatures
        title="Our Design Expertise"
        features={features}
      />

      <ServiceProcess
        title="The Design Process"
        steps={processSteps}
      />

      <FAQSection
        title="Frequently Asked Questions"
        faqs={faqs}
      />

      <CTASection
        title="Ready to Elevate Your Interior?"
        text="Let us help you curate a space that is a true reflection of your vision and style."
        btnText="Start Your Design Journey"
        btnLink="/contact"
      />

      <Footer />
    </div>
  );
};

export default InteriorDesignSupport;
