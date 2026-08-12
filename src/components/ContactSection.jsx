import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { contactVideo } from "../data/videoData";
import footer from "../data/footerData";
import "./ContactSection.css";

function ContactSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          entry.isIntersecting ? videoRef.current.play().catch(() => { }) : videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact" ref={sectionRef} id="contact-section">
      {/* Video BG */}
      <div className="contact__bg">
        <video ref={videoRef} className="contact__bg-video" src={contactVideo} muted loop playsInline preload="none" />
        <div className="contact__bg-overlay" />
      </div>

      <div className="luxury-container contact__inner">
        {/* Left — Map */}
        <motion.div
          className="contact__map-wrap"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe
            title="AM Associates Location"
            className="contact__map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.5!2d76.65!3d10.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzQ4LjAiTiA3NsKwMzknMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>

        {/* Right — Form */}
        <motion.div
          className="contact__form-wrap glass-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="luxury-subheading">Get In Touch</p>
          <h2 className="contact__form-title">Let's Build Together</h2>

          <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
            <div className="floating-label">
              <input type="text" id="contact-name" className="contact__input" placeholder=" " required />
              <label htmlFor="contact-name">Your Name</label>
            </div>
            <div className="floating-label">
              <input type="email" id="contact-email" className="contact__input" placeholder=" " required />
              <label htmlFor="contact-email">Your Email</label>
            </div>
            <div className="floating-label">
              <input type="tel" id="contact-phone" className="contact__input" placeholder=" " />
              <label htmlFor="contact-phone">Your Phone</label>
            </div>
            <div className="floating-label">
              <textarea id="contact-message" className="contact__textarea" rows={4} placeholder=" " required />
              <label htmlFor="contact-message">Your Message</label>
            </div>
            <button type="submit" className="luxury-btn-glass contact__submit-btn">
              <span>Send Message</span>
            </button>
          </form>

          {/* Quick Contact */}
          <div className="contact__quick">
            <a
              href={`https://wa.me/919567406887`}
              target="_blank"
              rel="noreferrer"
              className="contact__whatsapp"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a href={`tel:${footer.phone}`} className="contact__quick-link">
              <FaPhoneAlt /> Call Now
            </a>
            <a href={`mailto:${footer.email}`} className="contact__quick-link">
              <FaEnvelope /> Email
            </a>
            <a href={footer.address?.map || "#"} target="_blank" rel="noreferrer" className="contact__quick-link">
              <FaMapMarkerAlt /> Office
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
