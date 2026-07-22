import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExpand, FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import p1 from "../assets/images/projects/project1.jpg";
import p2 from "../assets/images/projects/project2.jpg";
import p3 from "../assets/images/projects/project3.jpg";
import p4 from "../assets/images/projects/project4.jpg";
import p5 from "../assets/images/projects/project5.jpg";
import h1 from "../assets/images/hero1.jpg";
import h2 from "../assets/images/hero2.jpg";
import h4 from "../assets/images/hero4.jpg";

import "./Gallery.css";

const galleryItems = [
  { type: "image", src: p1, tall: true },
  { type: "image", src: p2, tall: false },
  { type: "video", src: "https://videos.pexels.com/video-files/5529609/5529609-hd_1920_1080_25fps.mp4", poster: p3, tall: false },
  { type: "image", src: h1, tall: true },
  { type: "image", src: p4, tall: false },
  { type: "video", src: "https://videos.pexels.com/video-files/4994235/4994235-hd_1920_1080_25fps.mp4", poster: p5, tall: true },
  { type: "image", src: h2, tall: false },
  { type: "image", src: h4, tall: false },
];

function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((p) => (p > 0 ? p - 1 : galleryItems.length - 1));
  const next = () => setLightbox((p) => (p < galleryItems.length - 1 ? p + 1 : 0));

  return (
    <section className="gallery" id="gallery-section">
      <div className="luxury-container">
        <div className="gallery__header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="luxury-subheading">Gallery</p>
            <h2 className="luxury-heading">Our Work in Focus</h2>
            <div className="section-divider" style={{ margin: "1.5rem auto" }} />
          </motion.div>
        </div>

        <div className="gallery__masonry">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className={`gallery__item ${item.tall ? "gallery__item--tall" : ""}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-40px" }}
              onClick={() => openLightbox(i)}
            >
              {item.type === "image" ? (
                <img src={item.src} alt={`Gallery ${i + 1}`} className="gallery__img" loading="lazy" />
              ) : (
                <>
                  <img src={item.poster} alt={`Gallery ${i + 1}`} className="gallery__img" loading="lazy" />
                  <div className="gallery__video-badge"><FaPlay /></div>
                </>
              )}
              <div className="gallery__item-overlay">
                <FaExpand />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="gallery__lb-close" onClick={closeLightbox}><FaTimes /></button>
            <button className="gallery__lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }}><FaChevronLeft /></button>
            <button className="gallery__lb-next" onClick={(e) => { e.stopPropagation(); next(); }}><FaChevronRight /></button>

            <motion.div
              key={lightbox}
              className="gallery__lb-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {galleryItems[lightbox].type === "image" ? (
                <img src={galleryItems[lightbox].src} alt="" className="gallery__lb-img" />
              ) : (
                <video
                  src={galleryItems[lightbox].src}
                  className="gallery__lb-video"
                  controls autoPlay playsInline
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
