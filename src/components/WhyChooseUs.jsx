import { motion } from "framer-motion";
import {
  FaCubes, FaCouch, FaDraftingCompass, FaHardHat, FaTasks, FaShieldAlt,
} from "react-icons/fa";
import { whyChooseUsData } from "../data/videoData";
import "./WhyChooseUs.css";

const iconMap = { FaCubes, FaCouch, FaDraftingCompass, FaHardHat, FaTasks, FaShieldAlt };

function WhyChooseUs() {
  return (
    <section className="why" id="why-choose-us">
      <div className="luxury-container">
        <div className="why__header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="luxury-subheading">The AM Advantage</p>
            <h2 className="luxury-heading">Why Choose Us</h2>
            <div className="section-divider" style={{ margin: "1.5rem auto" }} />
          </motion.div>
        </div>

        <div className="why__grid">
          {whyChooseUsData.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={i}
                className="why__card glass-card glow-border-hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <div className="why__card-icon">
                  {Icon && <Icon />}
                </div>
                <h3 className="why__card-title">{item.title}</h3>
                <p className="why__card-desc">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;