import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCubes, FaCouch, FaDraftingCompass, FaHardHat, FaTasks, FaShieldAlt } from "react-icons/fa";
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

const whyChooseUsData = [
  { id: 1, icon: <FaCubes />, title: "Structural Engineering", desc: "Delivering safe and efficient structural solutions for every scale." },
  { id: 2, icon: <FaCouch />, title: "Interior Design", desc: "Creating elegant and timeless living spaces." },
  { id: 3, icon: <FaDraftingCompass />, title: "Architecture", desc: "Innovative architectural designs pushing boundaries." },
  { id: 4, icon: <FaHardHat />, title: "Construction", desc: "Building spaces with precision and premium quality." },
  { id: 5, icon: <FaTasks />, title: "Project Management", desc: "Ensuring projects are completed on schedule seamlessly." },
  { id: 6, icon: <FaShieldAlt />, title: "Quality Assurance", desc: "100% dedication to premium materials and durability." },
];

const processSteps = [
  { id: 1, step: "01", title: "Consultation", desc: "Understanding your vision, goals, and project requirements." },
  { id: 2, step: "02", title: "Planning", desc: "Detailed project planning with feasibility and site analysis." },
  { id: 3, step: "03", title: "Design", desc: "Creating innovative architectural designs and 3D visualizations." },
  { id: 4, step: "04", title: "Execution", desc: "Precision construction with premium materials and craftsmanship." },
  { id: 5, step: "05", title: "Delivery", desc: "Final inspections, finishing touches, and seamless handover." },
];

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();

        let servicesData = [];
        if (response && response.data) {
          servicesData = Array.isArray(response.data) ? response.data : [response.data];
        } else if (Array.isArray(response)) {
          servicesData = response;
        } else if (response && response.results) {
          servicesData = response.results;
        }

        // Filter only active services for public view
        servicesData = servicesData.filter(s => s.is_active !== false);
        setServices(servicesData);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="services-page">
        <Navbar />
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--color-gold)", fontSize: "1.2rem", letterSpacing: "0.1em" }}>Loading services...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-page">
        <Navbar />
        <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "10px 20px", background: "var(--color-gold)", color: "#000", border: "none", cursor: "pointer", borderRadius: "4px" }}
          >
            Retry
          </button>
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
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>No services available at the moment.</p>
          </div>
        ) : (
          services.map((service, index) => {
            const isEven = index % 2 === 0;
            const bgImage = service.image ? `${SERVER_URL}${service.image}` : fallbackImages[index % fallbackImages.length];

            return (
              <div
                key={service.id || `service-${index}`}
                className={`service-showcase__item ${isEven ? 'service-showcase__item--even' : 'service-showcase__item--odd'}`}
                style={{
                  background: `url(${bgImage}) center/cover no-repeat`,
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
                    <h2 className="services-section__title" style={{ fontSize: "2.5rem" }}>{service.title}</h2>
                    <p>{service.description}</p>
                    <Link to="/contact" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--color-gold)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: "bold",
                      fontSize: "0.85rem"
                    }}>
                      Inquire Now <FaArrowRight />
                    </Link>
                  </motion.div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* 4. WORK PROCESS */}
      <section className="services-process">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.8rem" }}>How We Work</span>
            <h2 className="services-section__title" style={{ marginTop: "1rem" }}>Our Process</h2>
          </div>

          <div className="services-process__timeline">
            {processSteps.map((step) => (
              <motion.div
                key={step.id}
                className="services-process__step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.id * 0.1 }}
              >
                <div className="services-process__number">{step.step}</div>
                <h4 className="services-process__title">{step.title}</h4>
                <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "1rem", maxWidth: "200px" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="services-why">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="services-section__title">Why Choose AM Associates</h2>
          </div>

          <div className="services-why__grid">
            {whyChooseUsData.map((item) => (
              <motion.div
                key={item.id}
                className="services-why__card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.id * 0.1 }}
              >
                <span className="services-why__icon">{item.icon}</span>
                <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="services-cta">
        <div className="services-cta__overlay"></div>
        <div className="container services-cta__content">
          <motion.h2
            className="services-section__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Build Your Vision?
          </motion.h2>
          <motion.p
            className="services-cta__desc"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Partner with us to bring your structural, architectural, and interior dreams to reality.
          </motion.p>
          <motion.div
            className="services-cta__buttons"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="services-cta__btn-primary">
              Contact Us Today
            </Link>
            <Link to="/projects" className="services-cta__btn-secondary">
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ServicesPage;