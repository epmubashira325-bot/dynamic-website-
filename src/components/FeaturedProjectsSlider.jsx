import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { projectsData } from "../data/videoData";
import project1 from "../assets/images/projects/project1.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";
import project4 from "../assets/images/projects/project4.jpg";
import project5 from "../assets/images/projects/project5.jpg";
import "./FeaturedProjectsSlider.css";

const projectImages = [project1, project2, project3, project4, project5, project1];

function FeaturedProjectsSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="featured-projects">
      <div className="luxury-container">
        <div className="featured-projects__header">
          <motion.h2 
            className="featured-projects__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Featured Projects
          </motion.h2>
          <div className="featured-projects__nav">
            <button ref={prevRef} className="slider-nav-btn slider-nav-btn--prev">
              <FaArrowLeft />
            </button>
            <button ref={nextRef} className="slider-nav-btn slider-nav-btn--next">
              <FaArrowRight />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            freeMode={true}
            grabCursor={true}
            spaceBetween={30}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 30 },
              1024: { slidesPerView: 3.2, spaceBetween: 40 },
            }}
            className="featured-projects__swiper"
          >
            {projectsData.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="featured-projects__card glass-card">
                  <div className="featured-projects__media">
                    <img 
                      src={projectImages[index % projectImages.length]} 
                      alt={project.title} 
                      className="featured-projects__img" 
                      loading="lazy"
                    />
                    {/* Hover Video Preview */}
                    <video 
                      className="featured-projects__video"
                      src={project.video}
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                  </div>
                  <div className="featured-projects__info">
                    <span className="featured-projects__category">{project.category}</span>
                    <h3 className="featured-projects__name">{project.title}</h3>
                    <Link to="/projects" className="featured-projects__link">
                      View Project <FaArrowRight className="icon-arrow" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProjectsSlider;
