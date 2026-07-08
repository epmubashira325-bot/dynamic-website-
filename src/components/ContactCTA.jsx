import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ctaBg from "../assets/images/cta-bg.jpg";

function ContactCTA() {
  return (
    <section
      className="relative py-28 bg-cover bg-center"
      style={{
        backgroundImage: `url(${ctaBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="uppercase tracking-[6px] text-amber-400 font-semibold"
        >
          Let's Build Together
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white mt-6"
        >
          Ready to Start
          <br />
          Your Dream Project?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-gray-300 text-lg leading-8 max-w-3xl mx-auto"
        >
          Whether you're planning a residential home, commercial
          building, renovation, or interior design project,
          AM Associates is here to deliver reliable engineering
          solutions with quality, precision, and professionalism.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link to="/contact">
            <button className="bg-amber-600 hover:bg-amber-700 transition px-8 py-4 rounded-full text-white font-semibold shadow-lg">
              Get Free Consultation
            </button>
          </Link>

          <Link to="/projects">
            <button className="border-2 border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-full text-white font-semibold">
              View Our Projects
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default ContactCTA;