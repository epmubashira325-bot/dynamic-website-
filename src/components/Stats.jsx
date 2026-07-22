import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { statsData } from "../data/videoData";
import { useCompanyStatistics } from "../hooks/useCompanyStatistics";
import "./Stats.css";

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2200;
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

// Merges live values from /api/statistics/ onto statsData by matching each
// item's label. Items with no backend match (e.g. Professional Experts)
// keep their static "number" from videoData.js.
function mergeLiveStats(items, liveStats) {
  if (!liveStats) return items;

  return items.map((item) => {
    const label = item.label.toLowerCase();
    let liveValue;

    if (label.includes("experience")) liveValue = liveStats.years_experience;
    else if (label.includes("project")) liveValue = liveStats.completed_projects;
    else if (label.includes("client")) liveValue = liveStats.happy_clients;

    return liveValue !== undefined && liveValue !== null
      ? { ...item, number: liveValue }
      : item;
  });
}

function Stats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { stats } = useCompanyStatistics();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const displayStats = mergeLiveStats(statsData, stats);

  return (
    <section className="stats" ref={sectionRef} id="stats-section">
      <div className="luxury-container">
        <div className="stats__grid">
          {displayStats.map((item, i) => (
            <motion.div
              key={i}
              className="stats__item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <span className="stats__number">
                <AnimatedCounter target={item.number} suffix={item.suffix} isVisible={isVisible} />
              </span>
              <span className="stats__label">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;