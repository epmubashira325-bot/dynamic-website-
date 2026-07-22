import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { footerCtaVideo } from "../data/videoData";
import "./FooterCTA.css";

function FooterCTA() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="footer-cta" ref={sectionRef} id="footer-cta">
      {/* Video Background */}
      <div className="footer-cta__bg">
        <video
          ref={videoRef}
          className="footer-cta__video"
          src={footerCtaVideo}
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="footer-cta__overlay" />
      </div>

      {/* Content */}
      <div className="luxury-container footer-cta__content">
        <motion.p
          className="luxury-subheading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Build Together
        </motion.p>

        <motion.h2
          className="footer-cta__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Ready to Start<br />
          Your Dream Project?
        </motion.h2>

        <motion.div
          className="section-divider"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 60, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          style={{ margin: "1.5rem auto" }}
        />

        <motion.p
          className="footer-cta__text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
        >
          Whether you're planning a residential home, commercial building,
          renovation, or interior design project, AM Associates is here to
          deliver reliable engineering solutions with quality and precision.
        </motion.p>

        <motion.div
          className="footer-cta__buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/contact">
            <button className="luxury-btn" id="footer-cta-start">
              <span>Start Your Project</span>
              <FaArrowRight style={{ position: "relative", zIndex: 1, fontSize: "0.75rem" }} />
            </button>
          </Link>
          <Link to="/projects">
            <button className="luxury-btn-outline" id="footer-cta-projects">
              <span>View Our Projects</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FooterCTA;
