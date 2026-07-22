import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { testimonialsData, contactVideo } from "../data/videoData";

import project1 from "../assets/images/projects/project1.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";
import project4 from "../assets/images/projects/project4.jpg";
import project5 from "../assets/images/projects/project5.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "./Testimonials.css";

const projectImgs = [project1, project2, project3, project4, project5];

function Testimonials() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          entry.isIntersecting ? videoRef.current.play().catch(() => {}) : videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testi" ref={sectionRef} id="testimonials">
      <div className="testi__bg">
        <video ref={videoRef} className="testi__bg-video" src={contactVideo} muted loop playsInline preload="none" />
        <div className="testi__bg-overlay" />
      </div>

      <div className="luxury-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="testi__header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="luxury-subheading">Testimonials</p>
            <h2 className="luxury-heading">What Clients Say</h2>
            <div className="section-divider" style={{ margin: "1.5rem auto" }} />
          </motion.div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          loop={true}
          speed={800}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".testi__dots" }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testi__swiper"
        >
          {testimonialsData.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testi__card glass-card">
                {/* Project Image */}
                <div className="testi__card-img-wrap">
                  <img
                    src={projectImgs[i % projectImgs.length]}
                    alt={`${t.name}'s project`}
                    className="testi__card-project-img"
                    loading="lazy"
                  />
                </div>

                <div className="testi__card-body">
                  <FaQuoteRight className="testi__quote-icon" />
                  <p className="testi__card-quote">"{t.quote}"</p>

                  <div className="testi__card-stars">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FaStar key={j} />
                    ))}
                  </div>

                  <div className="testi__card-author">
                    {/* Avatar Initial */}
                    <div className="testi__avatar" style={{ background: t.color }}>
                      {t.initial}
                    </div>
                    <div>
                      <h4 className="testi__card-name">{t.name}</h4>
                      <p className="testi__card-role">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testi__dots" />
      </div>
    </section>
  );
}

export default Testimonials;
