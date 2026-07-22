import { motion } from "framer-motion";
import { processSteps } from "../data/videoData";
import "./ConstructionProcess.css";

function ProcessTimeline() {
  return (
    <section className="timeline" id="process-timeline">
      <div className="luxury-container">
        <div className="timeline__header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="luxury-subheading">How We Work</p>
            <h2 className="luxury-heading">Our Process</h2>
            <div className="section-divider" style={{ margin: "1.5rem auto" }} />
          </motion.div>
        </div>

        <div className="timeline__track">
          {/* Connecting Line */}
          <div className="timeline__line" />

          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              className="timeline__step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="timeline__step-dot">
                <span>{step.step}</span>
              </div>
              <h3 className="timeline__step-title">{step.title}</h3>
              <p className="timeline__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessTimeline;
