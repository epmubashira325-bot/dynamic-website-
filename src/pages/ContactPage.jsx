// src/pages/ContactPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaBuilding,
} from 'react-icons/fa';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContactForm } from '../services/contactService';
import './ContactPage.css';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

// Components
const SectionBadge = ({ text }) => (
  <motion.span className="section-badge" variants={fadeUp}>
    {text}
  </motion.span>
);

const SectionTitle = ({ children }) => (
  <motion.h2 className="section-title" variants={fadeUp}>
    {children}
  </motion.h2>
);

const SectionDescription = ({ children }) => (
  <motion.p className="section-description" variants={fadeUp}>
    {children}
  </motion.p>
);

const VideoBackground = ({ src, overlayOpacity = 0.65 }) => (
  <div className="video-background">
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="video-background__media"
    />
    <div
      className="video-background__overlay"
      style={{ opacity: overlayOpacity }}
    />
  </div>
);

const ContactCard = ({ icon: Icon, title, children }) => (
  <motion.div className="contact-card" variants={fadeUp}>
    <div className="contact-card__icon-wrapper">
      <Icon className="contact-card__icon" />
    </div>
    <div className="contact-card__content">
      <h3 className="contact-card__title">{title}</h3>
      {children}
    </div>
  </motion.div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState('');

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const formControls = useAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isFormInView) {
      formControls.start('visible');
    }
  }, [isFormInView, formControls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Clear submit-level error once the user starts fixing things
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await submitContactForm(formData);
      setSubmittedName(response?.data?.name || formData.name);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Our Office',
      content: (
        <>
          <p>Sairam complex, Malampuzha 100ft road, Puthur,</p>
          <p>Palakkad</p>
        </>
      ),
    },
    {
      icon: FaPhoneAlt,
      title: 'Call Us',
      content: (
        <>
          <p>
            <a href="tel:+919037917704">+91 9037917704</a>
          </p>
          <p className="contact-card__hours">Mon - Sat, 9:00 AM - 6:00 PM</p>
        </>
      ),
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      content: (
        <>
          <p>
            <a href="mailto:contact@theamassociates.com">
              contact@theamassociates.com
            </a>
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <VideoBackground
          src="https://www.pexels.com/download/video/28561591/"
          overlayOpacity={0.6}
        />
        <div className="hero-section__container container">
          <motion.div
            className="hero-section__content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="hero-section__badge" variants={fadeUp}>
              AM Associates
            </motion.span>
            <motion.h1 className="hero-section__title" variants={fadeUp}>
              Let's Build Something
              <br />
              <span className="text-gradient">Extraordinary</span> Together
            </motion.h1>
            <motion.p className="hero-section__description" variants={fadeUp}>
              Whether you're planning a dream home, commercial space, or structural project,
              our team is ready to bring your vision to life.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                className="btn-primary"
                onClick={() => {
                  document.getElementById('contact-form-section')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                <span>Start Your Project</span>
                <FaArrowRight />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact-form-section">
        <div className="container">
          <motion.div
            className="contact-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <SectionBadge text="Get In Touch" />
            <SectionTitle>
              Let's Discuss Your <span className="text-gradient">Vision</span>
            </SectionTitle>
            <SectionDescription>
              Have a project in mind? Let's discuss how we can bring your vision to life.
            </SectionDescription>
          </motion.div>

          <div className="contact-section__grid">
            {/* Contact Information */}
            <motion.div
              className="contact-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {contactInfo.map((item, index) => (
                <ContactCard key={index} icon={item.icon} title={item.title}>
                  {item.content}
                </ContactCard>
              ))}

              <motion.div className="contact-hours" variants={fadeUp}>
                <div className="contact-hours__icon-wrapper">
                  <FaClock className="contact-hours__icon" />
                </div>
                <div className="contact-hours__content">
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              ref={formRef}
              className="contact-form-wrapper"
              initial="hidden"
              animate={formControls}
              variants={scaleIn}
            >
              <div className="contact-form">
                <h3 className="contact-form__title">Send Us a Message</h3>
                <p className="contact-form__subtitle">
                  Fill in the details below and we'll get back to you within 24 hours.
                </p>

                {isSuccess ? (
                  <motion.div
                    className="contact-form__success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaCheckCircle className="contact-form__success-icon" />
                    <h4>Message Sent Successfully!</h4>
                    <p>
                      {submittedName ? `Thanks, ${submittedName}! ` : 'Thank you for reaching out. '}
                      Our team will contact you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {submitError && (
                      <p className="contact-form__error contact-form__error--submit">
                        {submitError}
                      </p>
                    )}

                    <div className="contact-form__group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && (
                        <span className="contact-form__error">{errors.name}</span>
                      )}
                    </div>

                    <div className="contact-form__row">
                      <div className="contact-form__group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && (
                          <span className="contact-form__error">{errors.email}</span>
                        )}
                      </div>
                      <div className="contact-form__group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && (
                          <span className="contact-form__error">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="subject">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="project">Project Discussion</option>
                        <option value="career">Career Opportunity</option>
                      </select>
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="message">Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className={errors.message ? 'error' : ''}
                      />
                      {errors.message && (
                        <span className="contact-form__error">{errors.message}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-primary btn-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner"></span>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <motion.div
            className="map-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <SectionBadge text="Location" />
            <SectionTitle>
              Find Us <span className="text-gradient">Here</span>
            </SectionTitle>
            <SectionDescription>
              Visit our office for a face-to-face consultation.
            </SectionDescription>
          </motion.div>

          <motion.div
            className="map-section__wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250836.715143037!2d76.35260729453127!3d10.786503000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86dbd3677c663%3A0x8ebe14f064e401d9!2sAMARNATH%20ASSOCIATES!5e0!3m2!1sen!2sin!4v1784326304966!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="AM Associates Office Location"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <VideoBackground
          src="/videos/cta-bg.mp4"
          overlayOpacity={0.6}
        />
        <div className="cta-section__container container">
          <motion.div
            className="cta-section__content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className="cta-section__title" variants={fadeUp}>
              Ready to Start Your <br />
              <span className="text-gradient">Next Project</span>?
            </motion.h2>
            <motion.p className="cta-section__description" variants={fadeUp}>
              Let's create exceptional spaces through innovative design and engineering.
            </motion.p>
            <motion.div className="cta-section__buttons" variants={fadeUp}>
              <button
                className="btn-primary"
                onClick={() => {
                  document.getElementById('contact-form-section')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                <span>Get a Free Consultation</span>
              </button>
              <Link to="/projects">
                <button className="btn-outline btn-white">
                  <span>View Our Projects</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;