import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaArrowRight } from 'react-icons/fa';
import './ServiceReusableComponents.css';

// HERO SECTION
export const ServiceHero = ({ title, subtitle, image, breadcrumbText }) => {
  return (
    <section className="service-hero-section">
      <div 
        className="service-hero-bg" 
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="service-hero-overlay" />
      <div className="service-hero-content">
        <motion.div 
          className="service-hero-breadcrumb"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          <span>{breadcrumbText}</span>
        </motion.div>
        
        <motion.h1 
          className="service-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className="service-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

// OVERVIEW SECTION
export const ServiceOverview = ({ title, description1, description2, image }) => {
  return (
    <section className="service-overview-section">
      <div className="service-overview-container">
        <motion.div 
          className="service-overview-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="service-overview-title">{title}</h2>
          <p>{description1}</p>
          {description2 && <p>{description2}</p>}
        </motion.div>
        
        <motion.div 
          className="service-overview-image-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <img src={image} alt={title} />
        </motion.div>
      </div>
    </section>
  );
};

// FEATURES SECTION
export const ServiceFeatures = ({ title, features }) => {
  return (
    <section className="service-features-section">
      <div className="service-features-container">
        <div className="service-features-header">
          <motion.h2 
            className="service-features-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        </div>
        
        <div className="service-features-grid">
          {features.map((feature, index) => (
            <motion.div 
              className="service-feature-card"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// PROCESS SECTION
export const ServiceProcess = ({ title, steps }) => {
  return (
    <section className="service-process-section">
      <div className="service-process-container">
        <div className="service-process-header">
          <motion.h2 
            className="service-process-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        </div>
        
        <div className="service-process-grid">
          {steps.map((step, index) => (
            <motion.div 
              className="service-process-step"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-process-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ SECTION
export const FAQSection = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="service-faq-section">
      <div className="service-faq-container">
        <motion.h2 
          className="service-faq-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        
        <div className="service-faq-list">
          {faqs.map((faq, index) => (
            <div className="service-faq-item" key={index}>
              <button 
                className="service-faq-question" 
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <FaChevronDown className="service-faq-icon" />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    className="service-faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="service-faq-answer-inner">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA SECTION
export const CTASection = ({ title, text, btnText, btnLink }) => {
  return (
    <section className="service-cta-section">
      <div className="container">
        <motion.h2 
          className="service-cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="service-cta-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to={btnLink} className="service-cta-btn">
            {btnText} <FaArrowRight style={{ marginLeft: "8px", display: "inline" }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
