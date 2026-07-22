import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBuilding, FaDraftingCompass, FaCouch, FaHardHat, FaTasks, FaHandshake, FaCheckCircle, FaPlay } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  aboutHero, aboutIntro, aboutPhilosophy, aboutVisionMission,
  aboutExpertise, aboutProcess, aboutWhyChooseUs, aboutProjects,
  aboutCTA, mergeLiveCounters
} from "../data/aboutData";
import { useCompanyStatistics } from "../hooks/useCompanyStatistics";
import project1 from "../assets/images/projects/ceo.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";
import project4 from "../assets/images/projects/project4.jpg";
import "./AboutPage.css";

const projectImages = {
  "project1.jpg": project1,
  "project2.jpg": project2,
  "project3.jpg": project3,
  "project4.jpg": project4
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Reusable Video Background Component
const VideoBackground = ({ vimeoId, videoUrl }) => {
  if (videoUrl) {
    return (
      <div className="about-vimeo__wrapper">
        <video
          src={videoUrl}
          className="about-vimeo__iframe"
          style={{ objectFit: "cover" }}
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>
    );
  }

  return (
    <div className="about-vimeo__wrapper">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        className="about-vimeo__iframe"
      ></iframe>
    </div>
  );
};

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { stats } = useCompanyStatistics();
  const displayCounters = mergeLiveCounters(aboutIntro.counters, stats);

  return (
    <div className="about-page">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <VideoBackground vimeoId={aboutHero.vimeoId} videoUrl={aboutHero.videoUrl} />
        <div className="about-hero__overlay"></div>
        <div className="about-hero__content luxury-container">
          <motion.span className="about-hero__label" initial="hidden" animate="visible" variants={fadeUp}>
            {aboutHero.label}
          </motion.span>
          <motion.h1 className="about-hero__heading" initial="hidden" animate="visible" variants={fadeUp}>
            {aboutHero.heading}
          </motion.h1>
          <motion.p className="about-hero__desc" initial="hidden" animate="visible" variants={fadeUp}>
            {aboutHero.description}
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <button className="luxury-btn" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              <span>{aboutHero.ctaText}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="about-intro">
        <div className="luxury-container about-intro__grid">
          <motion.div className="about-intro__image-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <div className="about-intro__img-wrapper">
              <img src={project1} alt="Amarnath M - Founder & CEO" className="about-intro__img" />
            </div>
            <div className="about-founder__details">
              <h3 className="about-founder__name">Amarnath M</h3>
              <p className="about-founder__role">Founder & CEO</p>
              <p className="about-founder__quals">M.Tech (Structural Engineering) | Chartered Engineer | Empanelled Engineer</p>
            </div>
          </motion.div>
          <motion.div className="about-intro__text" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <h2 className="about-section__title">{aboutIntro.heading}</h2>
            <p className="about-section__desc">{aboutIntro.description}</p>
            <div className="about-intro__counters">
              {displayCounters.map((c, i) => (
                <div key={i} className="about-intro__counter">
                  <h3>{c.number}{c.suffix}</h3>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BRAND PHILOSOPHY */}
      <section className="about-philosophy">
        <div className="about-philosophy__img-bg" style={{ backgroundImage: "url('/gold-particles-bg.png')" }}></div>
        <div className="about-philosophy__overlay"></div>
        <motion.div className="about-philosophy__content luxury-container" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h2 className="about-section__title">{aboutPhilosophy.heading}</h2>
          <p className="about-philosophy__desc">{aboutPhilosophy.description}</p>
        </motion.div>
      </section>

      {/* 4. VISION & MISSION */}
      <section className="about-vision-mission">
        <div className="luxury-container">
          <motion.div className="about-vm__grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            <motion.div className="about-vm__card glass-card" variants={fadeUp}>
              <h3>Vision</h3>
              <p>{aboutVisionMission.vision}</p>
            </motion.div>
            <motion.div className="about-vm__card glass-card" variants={fadeUp}>
              <h3>Mission</h3>
              <p>{aboutVisionMission.mission}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. OUR EXPERTISE */}
      <section className="about-expertise luxury-container">
        <motion.h2 className="about-section__title text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Our Expertise
        </motion.h2>
        <motion.div className="about-expertise__grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {aboutExpertise.map((item, i) => {
            const Icon = { FaBuilding, FaDraftingCompass, FaCouch, FaHardHat, FaTasks, FaHandshake }[item.icon];
            return (
              <motion.div key={i} className="about-expertise__card" variants={fadeUp}>
                <div className="about-expertise__icon"><Icon /></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 6. OUR PROCESS */}
      <section className="about-process">
        <div className="luxury-container">
          <motion.h2 className="about-section__title text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Our Process
          </motion.h2>
          <motion.div className="about-process__timeline" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            {aboutProcess.map((step, i) => (
              <motion.div key={i} className="about-process__step" variants={fadeUp}>
                <div className="about-process__number">{step.step}</div>
                <div className="about-process__title">{step.title}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. WHY CHOOSE AM ASSOCIATES */}
      <section className="about-why">
        <div className="luxury-container">
          <motion.h2 className="about-section__title text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Why Choose AM Associates
          </motion.h2>
          <motion.div className="about-why__grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            {aboutWhyChooseUs.map((reason, i) => (
              <motion.div key={i} className="about-why__item" variants={fadeUp}>
                <FaCheckCircle className="about-why__icon" />
                <span>{reason}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* 9. FINAL CTA */}
      <section className="about-cta">
        <VideoBackground vimeoId={aboutCTA.vimeoId} videoUrl={aboutCTA.videoUrl} />
        <div className="about-cta__overlay"></div>
        <motion.div className="about-cta__content luxury-container" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h2 className="about-section__title">{aboutCTA.heading}</h2>
          <p className="about-cta__desc">{aboutCTA.description}</p>
          <div className="about-cta__buttons">
            <Link to="/contact">
              <button className="luxury-btn"><span>{aboutCTA.button1}</span></button>
            </Link>
            <Link to="/projects">
              <button className="luxury-btn luxury-btn--outline"><span>{aboutCTA.button2}</span></button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;