// src/components/PremiumVideoSection.jsx
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getCarousels } from "../services/carouselService";
import { SERVER_URL } from "../services/api";
import "./PremiumVideoSection.css";

function PremiumVideoSection({
  vimeoId,
  src,
  heading,
  description,
  buttonText,
  link,
  hideButton = false,
  fetchFromAPI = false,
  apiEndpoint = "/carousel/",
  category = null, // Optional: filter by category
  // New props for view more functionality
  viewMoreLink = "/services",
  viewMoreButtonText = "View More",
  onViewMore = null,
  sectionId = null,
  showViewMore = false,
  isCTA = false
}) {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  // Fetch video data from API
  useEffect(() => {
    if (!fetchFromAPI) {
      setLoading(false);
      return;
    }

    const fetchVideoData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🎬 Fetching carousel data for PremiumVideoSection...");
        const response = await getCarousels();

        console.log("✅ API Response:", response);

        // Handle different response structures
        let rawData = [];
        if (response.data?.results) {
          rawData = response.data.results;
        } else if (response.data?.data) {
          rawData = response.data.data;
        } else if (Array.isArray(response.data)) {
          rawData = response.data;
        } else if (Array.isArray(response)) {
          rawData = response;
        }

        console.log(`📊 Found ${rawData.length} items`);

        // Filter active videos
        let activeItems = rawData.filter(item => item.is_active !== false);

        // Filter by category if specified
        if (category) {
          activeItems = activeItems.filter(item => item.category === category);
        }

        // Get the first item
        const firstItem = activeItems.length > 0 ? activeItems[0] : null;

        if (firstItem) {
          // Get the media URL
          let mediaUrl = '';
          let mediaType = 'video';

          if (firstItem.video) {
            mediaUrl = firstItem.video.startsWith('http')
              ? firstItem.video
              : `${SERVER_URL}${firstItem.video}`;
            mediaType = 'video';
          } else if (firstItem.image) {
            mediaUrl = firstItem.image.startsWith('http')
              ? firstItem.image
              : `${SERVER_URL}${firstItem.image}`;
            mediaType = 'image';
          }

          setVideoData({
            id: firstItem.id,
            title: firstItem.title,
            mediaType: firstItem.media_type || mediaType,
            src: mediaUrl,
            is_active: firstItem.is_active,
            description: firstItem.description || '',
            category: firstItem.category || ''
          });

          console.log(`✅ Video data loaded: ${firstItem.title} (${mediaType})`);
        } else {
          setError("No active carousel items found");
          console.warn("⚠️ No active carousel items found");
        }
      } catch (err) {
        console.error("❌ Error fetching carousel data:", err);
        console.error("Error details:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message || "Failed to load video data");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [fetchFromAPI, category]);

  // Get the video source
  const getVideoSrc = () => {
    if (fetchFromAPI && videoData) {
      return videoData.src;
    }
    return src;
  };

  // Get the heading
  const getHeading = () => {
    if (fetchFromAPI && videoData) {
      return videoData.title || heading;
    }
    return heading;
  };

  // Get the description
  const getDescription = () => {
    if (fetchFromAPI && videoData && videoData.description) {
      return videoData.description;
    }
    return description;
  };

  // Check if video is available
  const hasVideo = () => {
    if (fetchFromAPI) {
      return videoData && videoData.src;
    }
    return !!(src || vimeoId);
  };

  // Check if video is a video type
  const isVideoType = () => {
    if (fetchFromAPI && videoData) {
      return videoData.mediaType === 'video';
    }
    return true; // Default to video for static props
  };

  // Handle view more click
  const handleViewMore = () => {
    if (onViewMore) {
      onViewMore();
    } else if (sectionId) {
      navigate(`${viewMoreLink}?section=${sectionId}`);
    } else {
      navigate(viewMoreLink);
    }
  };

  // Loading state
  if (loading && fetchFromAPI) {
    return (
      <section className="premium-video-section premium-video-section--loading">
        <div className="premium-video-section__loader">
          <div className="loader-spinner"></div>
          <p>Loading video...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error && fetchFromAPI) {
    return (
      <section className="premium-video-section premium-video-section--error">
        <div className="premium-video-section__error">
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>Unable to load video content</p>
          <p className="error-details">{error}</p>
          <button onClick={() => window.location.reload()} className="luxury-btn">
            <span>Retry</span>
          </button>
        </div>
      </section>
    );
  }

  // No video available
  if (!hasVideo() && fetchFromAPI) {
    return (
      <section className="premium-video-section premium-video-section--empty">
        <div className="premium-video-section__empty">
          <p>No video content available</p>
          {!hideButton && (
            <Link to="/admin/carousel">
              <button className="luxury-btn">
                <span>Add Content</span>
              </button>
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="premium-video-section">
      {/* Video Background - ALL CONTROLS REMOVED */}
      {fetchFromAPI && videoData ? (
        isVideoType() ? (
          <video
            className="premium-video-section__video-bg"
            src={getVideoSrc()}
            muted
            loop
            playsInline
            autoPlay
            key={videoData.id}
          />
        ) : (
          <div
            className="premium-video-section__image-bg"
            style={{ backgroundImage: `url(${getVideoSrc()})` }}
          />
        )
      ) : src ? (
        <video
          className="premium-video-section__video-bg"
          src={src}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : vimeoId ? (
        <div className="premium-video-section__vimeo-wrapper">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&dnt=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            className="premium-video-section__vimeo-bg"
            title="Premium Video Background"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}

      <div className="premium-video-section__overlay"></div>

      <motion.div
        className="premium-video-section__content luxury-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="premium-video-section__heading"
          variants={fadeUp}
        >
          {getHeading()}
        </motion.h2>
        <motion.p
          className="premium-video-section__desc"
          variants={fadeUp}
        >
          {getDescription()}
        </motion.p>

        {/* Original Button (if not hidden) */}
        {!hideButton && (
          <motion.div
            className="premium-video-section__cta"
            variants={fadeUp}
          >
            <Link to={link || "/projects"}>
              <button className="luxury-btn">
                <span>{buttonText || "View Our Work"}</span>
              </button>
            </Link>
          </motion.div>
        )}

        {/* New View More Button */}
        {showViewMore && (
          <motion.div
            className="premium-video-section__view-more"
            variants={fadeUp}
          >
            <button
              onClick={handleViewMore}
              className="luxury-btn view-more-btn"
            >
              <span>{isCTA ? "Contact Us" : viewMoreButtonText}</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default PremiumVideoSection;