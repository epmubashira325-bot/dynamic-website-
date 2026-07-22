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

import heroImg from '../assets/images/services/renovation.jpg';

const RenovationSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Structural Assessment",
      description: "Thorough evaluation of existing structures to identify load-bearing walls and determine renovation feasibility.",
      icon: "🏚️"
    },
    {
      title: "Space Optimization",
      description: "Redesigning layouts to maximize natural light, improve flow, and increase usable square footage.",
      icon: "📏"
    },
    {
      title: "Heritage Restoration",
      description: "Carefully restoring historical features while integrating modern amenities and structural reinforcements.",
      icon: "🏛️"
    },
    {
      title: "Modern Upgrades",
      description: "Updating electrical, plumbing, and HVAC systems to contemporary standards for improved efficiency.",
      icon: "⚡"
    }
  ];

  const processSteps = [
    { title: "Site Inspection", description: "Comprehensive survey of the existing property to understand constraints and potential." },
    { title: "Design Proposal", description: "Presenting concepts that breathe new life into the space while respecting its original character." },
    { title: "Approvals & Permits", description: "Navigating local regulations to obtain necessary permits for structural modifications." },
    { title: "Demolition & Build", description: "Safe, systematic removal of old elements followed by precision construction of the new design." }
  ];

  const faqs = [
    {
      question: "Can you remove a load-bearing wall during renovation?",
      answer: "Yes, provided proper structural support (such as a steel beam) is designed and installed by our structural engineers before removal."
    },
    {
      question: "How do you handle unforeseen issues like old wiring or plumbing?",
      answer: "Renovations often uncover hidden challenges. We conduct thorough initial surveys, but if issues arise, our team quickly proposes safe, cost-effective solutions."
    },
    {
      question: "Will I need to vacate the property during the renovation?",
      answer: "It depends on the scale of the project. For extensive structural changes, vacating is usually safer and allows for faster completion."
    }
  ];

  return (
    <div className="service-detail-page">
      <Navbar />

      <ServiceHero
        title="Renovation Support"
        subtitle="Breathing new life into existing spaces with thoughtful design and structural expertise."
        image={heroImg}
        breadcrumbText="Renovation Support"
      />

      <ServiceOverview
        title="Reimagining Your Space"
        description1="Our renovation services give your home interiors and office spaces a stylish and sleek appearance. We carry out elite-level renovation works to help our clients to meet the modern requirements of life. Our experienced project managers gain a clear understanding of clients’ renovation needs. Renovations generally involve modifying the existing structure or addition of new interior elements to a building. We are revamp your space to give it a brand-new look!"
        image={heroImg}
      />

      <ServiceFeatures
        title="Renovation Capabilities"
        features={features}
      />

      <ServiceProcess
        title="Transformation Process"
        steps={processSteps}
      />

      <FAQSection
        title="Frequently Asked Questions"
        faqs={faqs}
      />

      <CTASection
        title="Ready to Transform Your Property?"
        text="Discover the true potential of your existing space with our expert renovation services."
        btnText="Start Your Renovation"
        btnLink="/contact"
      />

      <Footer />
    </div>
  );
};

export default RenovationSupport;
