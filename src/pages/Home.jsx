// src/pages/Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PremiumVideoSection from "../components/PremiumVideoSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import { premiumSectionsData } from "../data/videoData";

function Home() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get sections from data
  const [interior, architecture, structural, construction, renovation, cta] = premiumSectionsData;

  // Handler for view more navigation
  const handleViewMore = (sectionId) => {
    // Navigate to services page with section parameter
    navigate(`/services?section=${sectionId}`);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section with Dynamic Carousel */}
      <Hero />

      {/* Structural Engineering */}
      <PremiumVideoSection
        {...structural}
        hideButton={true}
        showViewMore={true}
        viewMoreButtonText="View More"
        sectionId={structural.sectionId || "structural-engineering"}
        onViewMore={() => handleViewMore(structural.sectionId || "structural-engineering")}
        viewMoreLink="/services"
        id="section-structural"
      />

      {/* Construction */}
      <PremiumVideoSection
        {...construction}
        hideButton={true}
        showViewMore={true}
        viewMoreButtonText="View More"
        sectionId={construction.sectionId || "construction"}
        onViewMore={() => handleViewMore(construction.sectionId || "construction")}
        viewMoreLink="/services"
        id="section-construction"
      />

      {/* Renovation */}
      <PremiumVideoSection
        {...renovation}
        hideButton={true}
        showViewMore={true}
        viewMoreButtonText="View More"
        sectionId={renovation.sectionId || "renovation"}
        onViewMore={() => handleViewMore(renovation.sectionId || "renovation")}
        viewMoreLink="/services"
        id="section-renovation"
      />

      {/* Architecture */}
      <PremiumVideoSection
        {...architecture}
        hideButton={true}
        showViewMore={true}
        viewMoreButtonText="View More"
        sectionId={architecture.sectionId || "architecture"}
        onViewMore={() => handleViewMore(architecture.sectionId || "architecture")}
        viewMoreLink="/services"
        id="section-architecture"
      />

      {/* Interior Design */}
      <PremiumVideoSection
        {...interior}
        hideButton={true}
        showViewMore={true}
        viewMoreButtonText="View More"
        sectionId={interior.sectionId || "interior-design"}
        onViewMore={() => handleViewMore(interior.sectionId || "interior-design")}
        viewMoreLink="/services"
        id="section-interior"
      />

      {/* Why AM Associates */}
      <WhyChooseUs />

      {/* Company Statistics */}
      <Stats />

      {/* Final Call to Action */}
      <PremiumVideoSection
        {...cta}
        hideButton={true}
        showViewMore={true}
        isCTA={true}
        viewMoreButtonText="Contact Us"
        sectionId={cta.sectionId || "contact"}
        onViewMore={() => navigate('/contact')}
        viewMoreLink="/contact"
        id="section-cta"
      />
      <Footer />
    </>
  );
}

export default Home;