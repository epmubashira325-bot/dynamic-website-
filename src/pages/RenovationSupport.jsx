import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ServiceHero,
  ServiceOverview,
  ServiceFeatures,
  ServiceProcess,
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
      description:
        "Professional assessment of existing structures to identify renovation requirements and structural considerations.",
      icon: "🏚️"
    },
    {
      title: "Space Planning",
      description:
        "Practical planning support to improve the functionality, layout, and overall use of existing spaces.",
      icon: "📏"
    }
  ];

  const processSteps = [
    {
      title: "Site Inspection",
      description:
        "Reviewing the existing property to understand its condition, requirements, and renovation possibilities."
    },
    {
      title: "Renovation Planning",
      description:
        "Providing professional technical guidance and planning support based on the project's requirements."
    },
    {
      title: "Technical Support",
      description:
        "Offering engineering and construction-related support throughout the renovation process."
    },
    {
      title: "Project Guidance",
      description:
        "Providing professional assistance to help ensure renovation work is carried out effectively and appropriately."
    }
  ];

  return (
    <div className="service-detail-page">
      <Navbar />

      <ServiceHero
        title="Renovation Support"
        subtitle="Professional technical and engineering support for renovation projects."
        image={heroImg}
        breadcrumbText="Renovation Support"
      />

      <ServiceFeatures
        title="Renovation Support"
        features={features}
      />

      <ServiceProcess
        title="Our Support Process"
        steps={processSteps}
      />

      <CTASection
        title="Need Renovation Support?"
        text="Get professional engineering and construction support for your renovation project."
        btnText="Start Your Renovation Support"
        btnLink="/contact"
      />

      <Footer />
    </div>
  );
};

export default RenovationSupport;