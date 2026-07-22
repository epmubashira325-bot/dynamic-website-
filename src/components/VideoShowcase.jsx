import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { videoShowcaseData } from "../data/videoData";
import "swiper/css";
import "swiper/css/navigation";
import "./VideoShowcase.css";

function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalVideoRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setActiveVideo(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Play modal video when opened
  useEffect(() => {
    if (activeVideo !== null && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    }
  }, [activeVideo]);

  return (
    <section className="showcase" id="video-showcase">
      <div className="luxury-container">
        <div className="showcase__header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="luxury-subheading">Watch</p>
            <h2 className="luxury-heading">Experience Our Work</h2>
            <div className="section-divider" style={{ margin: "1.5rem auto" }} />
          </motion.div>
        </div>

        <div className="showcase__slider-wrap">
          <button className="showcase__nav-btn showcase__nav-prev"><FaChevronLeft /></button>
          
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={2.5}
            navigation={{ prevEl: '.showcase__nav-prev', nextEl: '.showcase__nav-next' }}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 16 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 30 },
            }}
            className="showcase__swiper"
          >
            {videoShowcaseData.map((item, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  className="showcase__card glow-border-hover"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  onClick={() => setActiveVideo(i)}
                  onMouseEnter={(e) => e.currentTarget.querySelector('video').play().catch(()=>{})}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget.querySelector('video');
                    v.pause(); v.currentTime = 0;
                  }}
                >
                  <div className="showcase__card-thumb">
                    <video
                      className="showcase__card-video"
                      src={item.src}
                      muted loop playsInline preload="none"
                    />
                    <div className="showcase__card-overlay" />
                    <div className="showcase__play-btn">
                      <FaPlay />
                    </div>
                    <span className="showcase__duration">{item.duration}</span>
                  </div>
                  <h3 className="showcase__card-title">{item.title}</h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="showcase__nav-btn showcase__nav-next"><FaChevronRight /></button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            className="showcase__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              className="showcase__modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="showcase__modal-close" onClick={() => setActiveVideo(null)}>
                <FaTimes />
              </button>
              <video
                ref={modalVideoRef}
                className="showcase__modal-video"
                src={videoShowcaseData[activeVideo].src}
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default VideoShowcase;
