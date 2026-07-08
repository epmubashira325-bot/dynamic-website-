import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import hero4 from "../assets/images/hero4.jpg";
import hero5 from "../assets/images/hero5.jpg";

const slides = [
  {
    image: hero1,
    title: "Luxury Interior Design",
    subtitle:
      "Creating timeless spaces that combine elegance, comfort and functionality.",
  },
  {
    image: hero2,
    title: "Modern Living Spaces",
    subtitle:
      "Premium interiors crafted to match your lifestyle and vision.",
  },
  {
    image: hero3,
    title: "Architecture & Design",
    subtitle:
      "Designing beautiful homes and commercial spaces with passion.",
  },
  {
    image: hero4,
    title: "Elegant Home Interiors",
    subtitle:
      "Luxury finishes that transform every room into an experience.",
  },
  {
    image: hero5,
    title: "Commercial Interiors",
    subtitle:
      "Innovative workspaces designed for productivity and elegance.",
  },
];

function Hero() {
  return (
    <section className="h-screen">

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        speed={1200}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25"></div>

              {/* Hero Content */}
              <div className="relative z-10 flex items-center h-full">

                <div className="max-w-7xl mx-auto px-8 w-full">

                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-2xl"
                  >
                    <p className="uppercase tracking-[8px] text-amber-400 font-semibold text-sm mb-6">
                      Interior Design Studio
                    </p>

                    <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-8 text-gray-200 text-lg leading-8">
                      {slide.subtitle}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-5">

                      <button className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 px-8 py-4 rounded-full text-white font-semibold shadow-lg">
                        Explore Projects
                      </button>

                      <button className="border-2 border-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 rounded-full text-white font-semibold">
                        Get Free Quote
                      </button>

                    </div>
                  </motion.div>

                </div>

              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">

                <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center">

                  <div className="w-1 h-3 bg-white rounded-full mt-2"></div>

                </div>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}

export default Hero;