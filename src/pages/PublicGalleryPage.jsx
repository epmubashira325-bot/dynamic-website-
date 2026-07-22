// src/pages/PublicGalleryPage.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearch, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SERVER_URL } from "../services/api";
import { getGalleryItems, getGalleryItemsByCategory, getGalleryCategories } from "../services/galleryService";
import "./PublicGalleryPage.css";

// Only used if the categories API call fails for some reason.
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Living Room" },
  { id: 2, name: "Bedroom" },
  { id: 3, name: "Kitchen" },
  { id: 4, name: "Commercial" },
  { id: 5, name: "Construction" },
];

function PublicGalleryPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage] = useState(12); // 12 items per page for public gallery

  const isFetchingRef = useRef(false);
  const mountedRef = useRef(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${SERVER_URL}${path}`;
  };

  // Fetch real categories from the backend (used to power the filter buttons
  // and the category badge/name lookups). Previously this page used a
  // hardcoded DEFAULT_CATEGORIES list, so anything created/renamed/deleted
  // in the admin panel never showed up here.
  const fetchCategories = useCallback(async () => {
    try {
      const response = await getGalleryCategories();
      const categoriesData = response?.data || [];
      if (categoriesData.length > 0) {
        setCategories(categoriesData);
      } else {
        setCategories(FALLBACK_CATEGORIES);
      }
    } catch (err) {
      console.error('❌ Error fetching gallery categories:', err);
      setCategories(FALLBACK_CATEGORIES);
    }
  }, []);

  // Fetch gallery items with pagination (no category filter — "All")
  const fetchGalleryItems = useCallback(async (page = 1, search = "") => {
    if (isFetchingRef.current) {
      console.log("⏳ Fetch already in progress, skipping...");
      return;
    }

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      console.log(`🔄 Fetching gallery items - Page: ${page}, Search: "${search}"`);

      const response = await getGalleryItems(page, itemsPerPage, search);

      if (!mountedRef.current) return;

      console.log("✅ API Response received:", response);

      let itemsData = [];
      let count = 0;
      let totalPagesFromApi = 1;

      if (response && response.results !== undefined) {
        itemsData = Array.isArray(response.results) ? response.results : [];
        count = response.count || itemsData.length;
        totalPagesFromApi = Math.ceil(count / itemsPerPage) || 1;
        console.log(`📊 Paginated response - Count: ${count}, Results: ${itemsData.length}`);
      } else if (Array.isArray(response)) {
        itemsData = response;
        count = itemsData.length;
        totalPagesFromApi = Math.ceil(count / itemsPerPage) || 1;
      } else {
        itemsData = [];
        count = 0;
        totalPagesFromApi = 1;
      }

      const activeItems = itemsData.filter((item) => item.is_active !== false);

      setItems(activeItems);
      setTotalCount(count);
      setTotalPages(totalPagesFromApi);
      setCurrentPage(page);

      console.log(`✅ Loaded ${activeItems.length} active items, Total: ${count}, Total Pages: ${totalPagesFromApi}`);

      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (err) {
      console.error('❌ Error fetching gallery items:', err);
      if (mountedRef.current) {
        setError('Failed to load gallery images. Please try again.');
        setItems([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } finally {
      isFetchingRef.current = false;
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [itemsPerPage, isInitialLoad]);

  // Fetch gallery items filtered by category, with pagination.
  // FIXED: previously category filtering only happened client-side against
  // whatever items were already loaded on the current page, so switching
  // categories on page 2+ gave wrong/incomplete results and pagination
  // counts didn't reflect the actual category size. This now queries the
  // backend directly, same as the admin Gallery page does.
  const fetchGalleryItemsWithCategory = useCallback(async (page = 1, categoryId) => {
    if (isFetchingRef.current || !categoryId) return;

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      console.log(`🔄 Fetching gallery items - Page: ${page}, Category: ${categoryId}`);

      const response = await getGalleryItemsByCategory(categoryId, page, itemsPerPage);

      if (!mountedRef.current) return;

      let itemsData = [];
      let count = 0;
      let totalPagesFromApi = 1;

      if (response && response.results !== undefined) {
        itemsData = Array.isArray(response.results) ? response.results : [];
        count = response.count || itemsData.length;
        totalPagesFromApi = Math.ceil(count / itemsPerPage) || 1;
      } else if (Array.isArray(response)) {
        itemsData = response;
        count = itemsData.length;
        totalPagesFromApi = Math.ceil(count / itemsPerPage) || 1;
      } else {
        itemsData = [];
        count = 0;
        totalPagesFromApi = 1;
      }

      // Safety net in case the backend doesn't actually filter by category.
      const categoryFiltered = itemsData.filter(
        (item) => String(item.gallery_category) === String(categoryId)
      );
      const activeItems = categoryFiltered.filter((item) => item.is_active !== false);

      setItems(activeItems);
      setTotalCount(count);
      setTotalPages(totalPagesFromApi);
      setCurrentPage(page);
    } catch (err) {
      console.error('❌ Error fetching gallery items by category:', err);
      if (mountedRef.current) {
        setError('Failed to load gallery images. Please try again.');
        setItems([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } finally {
      isFetchingRef.current = false;
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [itemsPerPage]);

  // Initial load
  useEffect(() => {
    mountedRef.current = true;
    fetchCategories();
    fetchGalleryItems(1, "");

    return () => {
      mountedRef.current = false;
      isFetchingRef.current = false;
    };
  }, []);

  // Handle search with debounce (search only applies to "All" view for now)
  useEffect(() => {
    if (isInitialLoad) return;

    const timer = setTimeout(() => {
      if (activeCategory === null) {
        fetchGalleryItems(1, searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle page change
  useEffect(() => {
    if (isInitialLoad) return;
    if (activeCategory === null) {
      fetchGalleryItems(currentPage, searchTerm);
    } else {
      fetchGalleryItemsWithCategory(currentPage, activeCategory);
    }
  }, [currentPage]);

  // Handle category change
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
    if (categoryId === null) {
      fetchGalleryItems(1, searchTerm);
    } else {
      fetchGalleryItemsWithCategory(1, categoryId);
    }
  };

  const getCategoryName = (catId) => {
    if (!catId) return "Uncategorized";
    const found = categories.find((c) => c.id === catId);
    return found?.name || `Category ${catId}`;
  };

  // Items are already filtered by category server-side (with a client-side
  // safety net), so no further category filtering is needed here.
  const filtered = items;

  // Lightbox navigation
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  const nextImage = () =>
    setLightboxIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, filtered.length]);

  // Handle retry on error
  const handleRetry = () => {
    if (activeCategory === null) {
      fetchGalleryItems(currentPage, searchTerm);
    } else {
      fetchGalleryItemsWithCategory(currentPage, activeCategory);
    }
  };

  // Pagination controls for public gallery
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return (
      <div className="pub-gallery-pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pub-gallery-page-btn"
        >
          <FaChevronLeft /> Previous
        </button>
        <div className="pub-gallery-page-numbers">
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="pub-gallery-page-ellipsis">…</span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`pub-gallery-page-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pub-gallery-page-btn"
        >
          Next <FaChevronRight />
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="pub-gallery-page">

        {/* ── HERO BANNER ──────────────────────────────────────── */}
        <section className="pub-gallery-hero">
          <div className="pub-gallery-hero__overlay" />
          <div className="pub-gallery-hero__content">
            <motion.span
              className="pub-gallery-hero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Portfolio
            </motion.span>
            <motion.h1
              className="pub-gallery-hero__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Our <span>Gallery</span>
            </motion.h1>
            <motion.p
              className="pub-gallery-hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our craftsmanship — from stunning interiors to architectural masterpieces.
            </motion.p>
          </div>
          <div className="pub-gallery-hero__wave">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="var(--pub-gallery-bg)" />
            </svg>
          </div>
        </section>

        {/* ── CATEGORY FILTER ───────────────────────────────────── */}
        <section className="pub-gallery-controls-section">
          <div className="pub-gallery-container">
            {/* Search */}
            <div className="pub-gallery-search-wrap">
              <FaSearch className="pub-gallery-search-icon" />
              <input
                type="text"
                className="pub-gallery-search"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="pub-gallery-search-clear" onClick={() => setSearchTerm("")}>
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="pub-gallery-filters">
              <button
                className={`pub-gallery-filter-btn ${!activeCategory ? "active" : ""}`}
                onClick={() => handleCategoryClick(null)}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`pub-gallery-filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>


          </div>
        </section>

        {/* ── PROJECT SHOWCASE LISTING ─────────────────────────── */}
        <section className="pgs-showcase">
          {loading ? (
            <div className="pub-gallery-loading">
              <div className="pub-gallery-spinner" />
              <p>Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="pub-gallery-error">
              <p>{error}</p>
              <button onClick={handleRetry} className="pub-gallery-retry-btn">
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="pub-gallery-empty">
              <span className="pub-gallery-empty-icon">🖼️</span>
              <h3>No images found</h3>
              <p>Try adjusting your search or filter.</p>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {filtered.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const imageUrl = getImageUrl(item.image);
                  const catName = getCategoryName(item.gallery_category);

                  return (
                    <motion.article
                      key={item.id}
                      className={`pgs-item ${isEven ? "pgs-item--normal" : "pgs-item--reverse"}`}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {/* ── MEDIA PANEL ── */}
                      <div className="pgs-item__media-wrap" onClick={() => openLightbox(idx)}>
                        <div className="pgs-item__media-inner">
                          {imageUrl ? (
                            <motion.img
                              src={imageUrl}
                              alt={item.title}
                              className="pgs-item__img"
                              loading="lazy"
                              whileHover={{ scale: 1.04 }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.classList.add("pgs-item__no-img");
                              }}
                            />
                          ) : (
                            <div className="pgs-item__placeholder">
                              <span>No Image</span>
                            </div>
                          )}
                          {/* Hover overlay */}
                          <div className="pgs-item__media-overlay">
                            <span className="pgs-item__expand-text">View Full Image</span>
                          </div>
                          {/* Index number */}
                          <div className="pgs-item__index">
                            {String(((currentPage - 1) * itemsPerPage) + idx + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>

                      {/* ── CONTENT PANEL ── */}
                      <div className="pgs-item__content">
                        <motion.div
                          className="pgs-item__content-inner"
                          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          {/* Category badge */}
                          <span className="pgs-item__cat">{catName}</span>

                          {/* Gold divider */}
                          <motion.div
                            className="pgs-item__divider"
                            initial={{ width: 0 }}
                            whileInView={{ width: "48px" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          />

                          {/* Title */}
                          <h2 className="pgs-item__title">{item.title}</h2>

                          {/* Meta row */}
                          {item.location && (
                            <div className="pgs-item__meta">
                              <span className="pgs-item__meta-item">
                                <FaMapMarkerAlt className="pgs-item__meta-icon" />
                                {item.location}
                              </span>
                            </div>
                          )}

                          {/* Description */}
                          {item.description && (
                            <p className="pgs-item__desc">{item.description}</p>
                          )}
                        </motion.div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>

              {/* Pagination */}
              {renderPagination()}
            </>
          )}
        </section>
      </main>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            className="pub-gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="pub-gallery-lightbox__content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="pub-gallery-lightbox__close" onClick={closeLightbox}>
                <FaTimes />
              </button>
              <button className="pub-gallery-lightbox__prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <img
                src={getImageUrl(filtered[lightboxIndex].image)}
                alt={filtered[lightboxIndex].title}
                className="pub-gallery-lightbox__img"
              />
              <button className="pub-gallery-lightbox__next" onClick={nextImage}>
                <FaChevronRight />
              </button>
              <div className="pub-gallery-lightbox__caption">
                <span className="pub-gallery-lightbox__cat">
                  {getCategoryName(filtered[lightboxIndex].gallery_category)}
                </span>
                <h3 className="pub-gallery-lightbox__title">{filtered[lightboxIndex].title}</h3>
                {filtered[lightboxIndex].description && (
                  <p className="pub-gallery-lightbox__desc">{filtered[lightboxIndex].description}</p>
                )}
                <span className="pub-gallery-lightbox__counter">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default PublicGalleryPage;