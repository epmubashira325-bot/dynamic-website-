// src/pages/ServicesPage.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getServices } from "../services/serviceService";
import { SERVER_URL } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ServicesPage.css";

// Import fallback images
import img1 from "../assets/images/services/structural.jpg";
import img2 from "../assets/images/services/interior.jpg";
import img3 from "../assets/images/services/construction.jpg";
import img4 from "../assets/images/services/consulting.jpg";
import img5 from "../assets/images/services/renovation.jpg";
import img6 from "../assets/images/services/supervision.jpg";

const fallbackImages = [img1, img2, img3, img4, img5, img6];

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔄 Fetching all services...");

        // Fetch all services (you might need to adjust this based on your API)
        const response = await getServices(1, 100); // Get up to 100 services

        console.log("📦 API Response:", response);

        let servicesData = [];

        // Handle different response structures
        if (response && response.data) {
          if (response.data.results) {
            servicesData = response.data.results;
          } else if (Array.isArray(response.data)) {
            servicesData = response.data;
          } else {
            servicesData = [response.data];
          }
        } else if (Array.isArray(response)) {
          servicesData = response;
        } else if (response && response.results) {
          servicesData = response.results;
        }

        // Filter only active services for public view
        servicesData = servicesData.filter(s => s.is_active !== false);

        console.log(`✅ Found ${servicesData.length} active services`);
        setServices(servicesData);

      } catch (err) {
        console.error('❌ Error fetching services:', err);
        setError('Failed to load services. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http') || imagePath.startsWith('https') || imagePath.startsWith('blob:')) {
      return imagePath;
    }
    return `${SERVER_URL}${imagePath}`;
  };

  // Helper function to get service route
  const getServiceRoute = (title) => {
    if (!title) return "/services";
    const cleanTitle = title.toLowerCase().trim();
    if (cleanTitle.includes("structural")) return "/services/structural-engineering";
    if (cleanTitle.includes("construction")) return "/services/construction-support";
    if (cleanTitle.includes("renovation")) return "/services/renovation-support";
    if (cleanTitle.includes("architecture") || cleanTitle.includes("architectural")) return "/services/architecture-support";
    if (cleanTitle.includes("interior")) return "/services/interior-design-support";
    return "/services"; // fallback
  };

  if (loading) {
    return (
      <div className="services-page">
        <Navbar />
        <div className="services-loading">
          <div className="loading-spinner"></div>
          <p>Loading services...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-page">
        <Navbar />
        <div className="services-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="services-page">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="services-hero">
        {/* Background Video */}
        <div className="services-video__wrapper">
          <video
            className="services-video__element"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://www.pexels.com/download/video/29848604/"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="services-hero__overlay"></div>
        <div className="services-hero__content">
          <motion.span
            className="services-hero__label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What We Do
          </motion.span>
          <motion.h1
            className="services-hero__heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="services-hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We provide comprehensive architectural, structural engineering, and premium interior design solutions.
          </motion.p>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="services-intro">
        <div className="container" style={{ textAlign: "center" }}>
          <motion.p
            className="services-intro__desc"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            "At AM Associates, we believe in crafting spaces that transcend time. From visionary concepts to flawless execution, our diverse suite of services is designed to elevate your living and working environments."
          </motion.p>
        </div>
      </section>

      {/* 3. SERVICE SHOWCASE (Alternating) */}
      <section className="service-showcase">
        {services.length === 0 ? (
          <div className="services-empty">
            <p>No services available at the moment.</p>
          </div>
        ) : (
          services.map((service, index) => {
            const isEven = index % 2 === 0;
            // Use the image from the service or fallback
            const imageUrl = service.image ? getImageUrl(service.image) : fallbackImages[index % fallbackImages.length];

            return (
              <div
                key={service.id || `service-${index}`}
                className={`service-showcase__item ${isEven ? 'service-showcase__item--even' : 'service-showcase__item--odd'}`}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed"
                }}
              >
                <div className="service-showcase__overlay"></div>
                <div className="container service-showcase__content">
                  <motion.div
                    className="service-showcase__text-box"
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <h2 className="services-section__title">{service.title}</h2>
                    <p>{service.description}</p>
                    <Link to={getServiceRoute(service.title)} className="service-inquire-btn">
                      View More <FaArrowRight />
                    </Link>
                  </motion.div>
                </div>
              </div>
            );
          })
        )}
      </section>

      <Footer />
    </div>
  );
}

export default ServicesPage;
