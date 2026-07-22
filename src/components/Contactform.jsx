import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceOptions } from "../data/contactData";
import { FaCheckCircle } from "react-icons/fa";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", service: "", location: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-form-container glass-card">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success"
            className="contact-form__success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaCheckCircle className="contact-form__success-icon" />
            <h3>Thank You!</h3>
            <p>Our team will contact you shortly.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            className="contact-form" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="contact-form__row">
              <div className="contact-form__group">
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required placeholder=" " />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="contact-form__group">
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required placeholder=" " />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__group">
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required placeholder=" " />
                <label htmlFor="phone">Phone Number</label>
              </div>
              <div className="contact-form__group">
                <select name="service" id="service" value={formData.service} onChange={handleChange} required>
                  <option value="" disabled hidden></option>
                  {serviceOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <label htmlFor="service" className={formData.service ? 'active' : ''}>Service Required</label>
              </div>
            </div>

            <div className="contact-form__group">
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required placeholder=" " />
              <label htmlFor="location">Project Location</label>
            </div>

            <div className="contact-form__group">
              <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} required placeholder=" "></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            <button type="submit" className="luxury-btn luxury-btn--full" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactForm;