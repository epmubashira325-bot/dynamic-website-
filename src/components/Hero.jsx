// src/components/Hero.jsx
import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useCarousel from '../hooks/useCarousel';
import './Hero.css';

const Hero = () => {
  const { slides, loading, error } = useCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && slides.length > 0) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, slides.length]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Loading State
  if (loading) {
    return (
      <section className="hero">
        <div className="hero-loading">
          <div className="hero-loading-spinner"></div>
          <p>Loading carousel...</p>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="hero">
        <div className="hero-error">
          <p>⚠️ Failed to load carousel</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </section>
    );
  }

  // Empty State - Show placeholder
  if (!slides || slides.length === 0) {
    return (
      <section className="hero">
        <div className="hero-slide">
          <div className="hero-placeholder">
            <div className="hero-placeholder-content">
              <h1>Welcome to AM Associates</h1>
              <p>Building Dreams, Creating Excellence</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <section className="hero">
      <div className="hero-slide">
        {/* Media */}
        {currentSlide.media_type === 'video' && currentSlide.video ? (
          <video
            src={currentSlide.video}
            autoPlay
            muted
            loop
            playsInline
            className="hero-media"
            key={currentSlide.id}
          />
        ) : currentSlide.image ? (
          <img
            src={currentSlide.image}
            alt={currentSlide.title || 'Carousel slide'}
            className="hero-media"
            key={currentSlide.id}
          />
        ) : (
          <div className="hero-placeholder" key={currentSlide.id}>
            <div className="hero-placeholder-content">
              <h1>{currentSlide.title || 'Welcome to AM Associates'}</h1>
              <p>Building Dreams, Creating Excellence</p>
            </div>
          </div>
        )}

        {/* Overlay with title */}
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{currentSlide.title || 'AM Associates'}</h1>
            <p className="hero-subtitle">Building Dreams, Creating Excellence</p>
          </div>
        </div>
      </div>

      {/* Controls - Only show if there are multiple slides */}
      {slides.length > 1 && (
        <>
          <div className="hero-controls">
            <button
              onClick={goToPrevious}
              className="hero-control-btn"
              aria-label="Previous slide"
            >
              <FaChevronLeft />
            </button>



            <button
              onClick={goToNext}
              className="hero-control-btn"
              aria-label="Next slide"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="hero-progress-bar">
            <div
              className="hero-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dots Navigation */}
          <div className="hero-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;