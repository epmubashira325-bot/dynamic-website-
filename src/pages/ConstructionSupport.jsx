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

import heroImg from '../assets/images/services/construction.jpg';

const ConstructionSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Site Supervision",
      description: "Dedicated on-site experts monitoring daily activities, enforcing safety protocols, and ensuring design compliance.",
      icon: "👷"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality control processes and material testing to guarantee premium finishes and durable structures.",
      icon: "🔍"
    },
    {
      title: "Vendor Coordination",
      description: "Seamless coordination between contractors, suppliers, and specialized trades for smooth project execution.",
      icon: "🤝"
    }
  ];

  const processSteps = [
    { title: "Pre-Construction", description: "Detailed planning, budgeting, scheduling, and procurement of materials." },
    { title: "Mobilization", description: "Setting up the site, implementing safety measures, and coordinating initial trades." },
    { title: "Execution", description: "Active construction phase with continuous monitoring, reporting, and quality checks." },
    { title: "Handover", description: "Final inspections, addressing any snags, and seamless delivery to the client." }
  ];

  const faqs = [
    {
      question: "What is included in your construction support services?",
      answer: "We offer comprehensive support including project management, site supervision, quality control, schedule management, and contractor coordination."
    },
    {
      question: "Do you work with third-party contractors?",
      answer: "Yes, we act as the client's representative to oversee third-party contractors, ensuring they adhere to the design intent and quality standards."
    },
    {
      question: "How do you ensure the project stays on budget?",
      answer: "Through meticulous planning, transparent procurement processes, and constant monitoring of expenses against the baseline budget."
    }
  ];

  return (
    <div className="service-detail-page">
      <Navbar />

      <ServiceHero
        title="Construction Support"
        subtitle="Transforming blueprints into reality with precision, safety, and unwavering quality control."
        image={heroImg}
        breadcrumbText="Construction Support"
      />

      <ServiceOverview
       
        description1="Amarnath Associates provides professional construction support and engineering consultancy services to assist clients throughout their construction projects. Our team offers expert technical guidance, engineering support, and practical solutions to help ensure projects are planned and executed effectively."
        image={heroImg}
      />

      <ServiceFeatures
        title="Our Support Ecosystem"
        features={features}
      />

      <ServiceProcess
        title="Construction Workflow"
        steps={processSteps}
      />

      

      <CTASection
        title="Ready to Break Ground?"
        text="Ensure your construction project is executed flawlessly. Let our experts guide the way."
        btnText="Discuss Your Project"
        btnLink="/contact"
      />

      <Footer />
    </div>
  );
};

export default ConstructionSupport;
