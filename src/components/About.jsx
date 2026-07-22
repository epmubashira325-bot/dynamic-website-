import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { aboutVideo, aboutCounters } from "../data/videoData";
import "./About.css";

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const inc = target / (duration / 16);
    let raf;
    const animate = () => {
      start += inc;
      if (start >= target) { setCount(target); return; }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, target]);
  return <>{count}{suffix}</>;
}

function About() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="luxury-container about__grid">
        {/* Video */}
        <motion.div
          className="about__video-side"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="about__video-box">
            <video
              ref={videoRef}
              className="about__video"
              src={aboutVideo}
              muted loop playsInline preload="none"
            />
            <div className="about__video-overlay" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="about__content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="luxury-subheading">About Us</p>
          <h2 className="luxury-heading">Crafting Spaces<br/>That Inspire</h2>
          <div className="section-divider" />
          <p className="about__text">
            With decades of expertise, AM Associates transforms ideas into
            timeless architectural landmarks through innovation, precision,
            and quality.
          </p>

          {/* Counters */}
          <div className="about__counters">
            {aboutCounters.map((c, i) => (
              <motion.div
                key={i}
                className="about__counter-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="about__counter-num">
                  <AnimatedCounter target={c.number} suffix={c.suffix} isVisible={isVisible} />
                </span>
                <span className="about__counter-label">{c.label}</span>
              </motion.div>
            ))}
          </div>

          <Link to="/about">
            <button className="luxury-btn" id="about-btn">
              <span>Learn More</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default About;