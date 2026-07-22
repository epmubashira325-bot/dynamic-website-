// src/pages/Carousel.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import {
  FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSpinner,
  FaSearch, FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight,
  FaRegCircle, FaUpload, FaVideo
} from "react-icons/fa";
import {
  getCarousels,
  addCarousel,
  updateCarousel,
  deleteCarousel,
} from "../services/carouselService";
import { SERVER_URL } from "../services/api";
import "../styles/Carousel.css";

const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("blob:")) return path;
  return `${SERVER_URL}${path}`;
};

const emptyForm = {
  title: "",
  media_type: "video",
  file: null,
  is_active: true
};

// ============================================================
// TOAST COMPONENT
// ============================================================
function Toasts({ toasts, onDismiss }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className={`cursor-pointer rounded-xl px-4 py-3 shadow-lg text-sm font-medium text-white flex items-start gap-2 ${t.type === "error" ? "bg-red-600" : "bg-emerald-600"
            }`}
        >
          <span>{t.type === "error" ? "⚠️" : "✅"}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// DELETE CONFIRM MODAL
// ============================================================
function DeleteCarouselConfirmModal({ item, onCancel, onConfirm, deleting }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-md"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[720px] min-h-[440px] bg-white rounded-[18px] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.25)" }}
      >
        <div className="h-[72px] px-10 flex items-center gap-3 border-b border-gray-200 bg-white">
          <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <h3 className="text-[26px] font-bold text-gray-800 tracking-tight">Delete Carousel Item</h3>
        </div>

        <div className="px-10 py-10 flex flex-col items-center">
          <div className="w-[110px] h-[110px] bg-green-50 flex items-center justify-center mb-8 shadow-sm rounded-[16px]">
            <svg className="w-[52px] h-[52px] text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>

          <h4 className="text-[32px] font-bold text-gray-800 mb-4 tracking-tight text-center">
            Delete this slide?
          </h4>

          <p className="text-center text-[18px] text-gray-600 max-w-[500px] mb-8 leading-relaxed">
            Slide "<span className="font-bold text-green-600">{item.title || "Untitled"}</span>" will be permanently deleted from the carousel.
          </p>

          <div className="w-full h-16 bg-orange-50 border border-orange-300 rounded-[12px] px-5 flex items-center gap-3 mb-8">
            <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-[16px] font-medium text-gray-700">
              This action cannot be undone.
            </span>
          </div>

          <div className="w-full flex gap-5">
            <button
              onClick={onCancel}
              disabled={deleting}
              className="flex-1 h-14 px-6 rounded-[12px] text-[17px] font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(item)}
              disabled={deleting}
              className="flex-1 h-14 px-6 rounded-[12px] text-[17px] font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-sm"
            >
              {deleting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}

// ============================================================
// CAROUSEL FORM MODAL (Add/Edit)
// ============================================================
function CarouselFormModal({ mode, formData, onChange, onFile, currentMediaUrl, onSubmit, onClose, saving }) {
  const [previewUrl, setPreviewUrl] = useState(currentMediaUrl || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setPreviewUrl(null);
    onFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="carousel-modal-overlay" onClick={onClose}>
      <div className="carousel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="carousel-modal-header">
          <div className="carousel-modal-header-content">

            <h3>{mode === "add" ? "Add New Slide" : "Edit Slide"}</h3>
          </div>
          <button onClick={onClose} className="carousel-modal-close" disabled={saving}>
            <FaTimes />
          </button>
        </div>

        <div className="carousel-modal-form">
          <div className="carousel-form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Enter slide title"
            />
          </div>

          <div className="carousel-form-group">
            <label htmlFor="video">
              Video {mode === "add" && <span className="required">*</span>}
            </label>
            <div className="carousel-file-upload">
              <input
                type="file"
                id="video"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="carousel-file-input"
              />
              <div className="carousel-upload-area">
                <FaUpload className="upload-icon" />
                <span>Click or drag to upload video</span>
                <small>MP4, WebM, MOV — up to 100MB</small>
              </div>
            </div>
            {previewUrl && (
              <div className="carousel-video-preview">
                <video src={previewUrl} controls />
                <button type="button" className="remove-video-btn" onClick={handleRemoveFile}>
                  <FaTimes />
                </button>
              </div>
            )}
            {mode === "edit" && !previewUrl && currentMediaUrl && (
              <div className="carousel-video-preview">
                <video src={currentMediaUrl} controls />
              </div>
            )}
          </div>

          <div className="carousel-status-section">
            <div className="carousel-status-label">
              <span className="carousel-status-text">Status</span>
              <span className={`carousel-status-form-badge ${formData.is_active ? "active" : "inactive"}`}>
                {formData.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <label className="carousel-toggle">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={(e) => onChange({ target: { name: "is_active", value: e.target.checked } })}
                className="carousel-toggle-input"
              />
              <span className="carousel-toggle-slider"></span>
            </label>
          </div>

          <div className="carousel-modal-actions">
            <button type="button" onClick={onClose} className="carousel-modal-cancel" disabled={saving}>
              Cancel
            </button>
            <button type="button" onClick={onSubmit} className="carousel-modal-submit" disabled={saving}>
              {saving ? (
                <>
                  <FaSpinner className="spinner" /> Saving...
                </>
              ) : (
                <>
                  <FaSave /> {mode === "add" ? "Create" : "Update"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN CAROUSEL COMPONENT
// ============================================================
function Carousel() {
  const [carouselData, setCarouselData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [toasts, setToasts] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isFetchingRef = useRef(false);
  const mountedRef = useRef(true);

  const pushToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const applySearchFilter = useCallback(
    (items) => {
      if (!items || items.length === 0) return [];
      let filtered = [...items];
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        filtered = filtered.filter((item) => item.title?.toLowerCase().includes(term));
      }
      return filtered;
    },
    [searchTerm]
  );

  const updateFilteredData = useCallback(
    (items) => {
      const filtered = applySearchFilter(items);
      setFilteredData(filtered);

      const filteredCount = filtered.length;
      const filteredTotalPages = Math.ceil(filteredCount / itemsPerPage) || 1;
      setTotalCount(filteredCount);
      setTotalPages(filteredTotalPages);

      if (currentPage > filteredTotalPages) {
        setCurrentPage(Math.max(1, filteredTotalPages));
      }

      return filtered;
    },
    [applySearchFilter, itemsPerPage, currentPage]
  );

  const fetchCarousels = useCallback(
    async (showLoading = true) => {
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;
        if (showLoading) setLoading(true);
        setError(null);

        const response = await getCarousels(1, 1000, "");
        if (!mountedRef.current) return;

        let items = [];
        if (response && response.data) {
          if (response.data.results !== undefined) {
            items = Array.isArray(response.data.results) ? response.data.results : [];
          } else if (Array.isArray(response.data)) {
            items = response.data;
          }
        } else if (Array.isArray(response)) {
          items = response;
        }

        const formattedData = items.map((item) => ({
          ...item,
          video: item.video ? getMediaUrl(item.video) : null,
          image: item.image ? getMediaUrl(item.image) : null,
          media_type: item.media_type || (item.video ? "video" : "image")
        }));

        setCarouselData(formattedData);
        updateFilteredData(formattedData);

        if (isInitialLoad) setIsInitialLoad(false);
      } catch (err) {
        console.error("❌ Error fetching carousels:", err);
        if (mountedRef.current) {
          setError("Failed to load carousel slides. Please try again.");
          pushToast("Failed to load carousel slides", "error");
          setCarouselData([]);
          setFilteredData([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } finally {
        isFetchingRef.current = false;
        if (showLoading && mountedRef.current) setLoading(false);
      }
    },
    [updateFilteredData, isInitialLoad]
  );

  useEffect(() => {
    mountedRef.current = true;
    fetchCarousels(true);
    return () => {
      mountedRef.current = false;
      isFetchingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;
    if (carouselData.length === 0) return;
    updateFilteredData(carouselData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, itemsPerPage, carouselData]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (perPage) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFile = (file) => {
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleAddClick = () => {
    setModalMode("add");
    setEditingItem(null);
    setFormData({ ...emptyForm, media_type: "video" });
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    setModalMode("edit");
    setEditingItem(item);
    setFormData({
      title: item.title,
      media_type: item.media_type || "video",
      file: null,
      is_active: item.is_active
    });
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditingItem(null);
    setFormData(emptyForm);
  };

  const validateFile = (file) => {
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
    if (!file) return { valid: false, message: "No file selected" };
    if (!file.type.startsWith("video/")) {
      return { valid: false, message: `File must be a video. Current type: ${file.type || "unknown"}` };
    }
    if (file.size > MAX_VIDEO_SIZE) {
      return {
        valid: false,
        message: `Video file is too large (${Math.round(file.size / (1024 * 1024))}MB). Maximum size is 100MB`
      };
    }
    return { valid: true, message: "" };
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      pushToast("Please enter a title", "error");
      return;
    }
    if (modalMode === "add" && !formData.file) {
      pushToast("Please select a video", "error");
      return;
    }
    if (formData.file) {
      const validation = validateFile(formData.file);
      if (!validation.valid) {
        pushToast(validation.message, "error");
        return;
      }
    }

    try {
      setSaving(true);
      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("media_type", formData.media_type);
      data.append("is_active", formData.is_active ? "true" : "false");
      if (formData.file) data.append("video", formData.file);

      let response;
      if (modalMode === "edit" && editingItem) {
        response = await updateCarousel(editingItem.id, data);
        pushToast(response.data?.message || "Carousel updated successfully");
      } else {
        response = await addCarousel(data);
        pushToast(response.data?.message || "Carousel created successfully");
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData(emptyForm);
      await fetchCarousels(true);
    } catch (err) {
      console.error("❌ Error saving carousel:", err);
      let errorMessage = modalMode === "edit" ? "Failed to update carousel" : "Failed to create carousel";
      if (err.response?.data) {
        const errorData = err.response.data;
        if (typeof errorData === "object") {
          if (errorData.video) {
            errorMessage = `Video: ${Array.isArray(errorData.video) ? errorData.video.join(", ") : errorData.video}`;
          } else if (errorData.title) {
            errorMessage = `Title: ${Array.isArray(errorData.title) ? errorData.title.join(", ") : errorData.title}`;
          } else {
            const allErrors = Object.entries(errorData)
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
              .join("\n");
            if (allErrors) errorMessage = allErrors;
          }
        } else if (typeof errorData === "string") {
          errorMessage = errorData;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      pushToast(errorMessage, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async (item) => {
    try {
      setDeletingId(item.id);
      await deleteCarousel(item.id);
      pushToast("Carousel deleted successfully");
      await fetchCarousels(true);
    } catch (err) {
      console.error("Error deleting carousel:", err);
      pushToast("Failed to delete carousel slide", "error");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  const getCurrentMediaUrl = () => {
    if (!editingItem) return null;
    if (editingItem.video) return getMediaUrl(editingItem.video);
    if (editingItem.image) return getMediaUrl(editingItem.image);
    return null;
  };

  const handleRetry = () => fetchCarousels(true);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentItems = getCurrentPageItems();

  if (loading && carouselData.length === 0) {
    return (
      <div className="carousel-page">
        <div className="carousel-loading">
          <FaSpinner className="spinner" />
          <p>Loading carousel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-page">
      <div className="carousel-table-wrapper">
        {/* Header */}
        <div className="carousel-table-header">
          <div className="carousel-header-left">
            <h2 className="carousel-title">Carousel Management</h2>
            <span className="carousel-subtitle">Manage homepage banner videos</span>
          </div>
          <div className="carousel-header-right">
            <button onClick={handleAddClick} className="carousel-add-btn bg-green">
              <FaPlus /> Add Slide
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="text-red-700">{error}</span>
            </div>
            <button onClick={handleRetry} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Retry
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div className="carousel-toolbar">
          <div className="carousel-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="carousel-search-input"
            />
            {searchTerm && (
              <button className="search-clear-btn" onClick={() => handleSearch("")}>
                <FaTimes />
              </button>
            )}
          </div>
          <div className="carousel-controls">
            <div className="carousel-entries">
              <label>Show</label>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="entries-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <label>entries</label>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="carousel-table-container">
          <table className="carousel-datatable">
            <thead>
              <tr>
                <th className="table-header id-col">#</th>
                <th className="table-header video-col">VIDEO</th>
                <th className="table-header title-col">TITLE</th>
                <th className="table-header status-col">STATUS</th>
                <th className="table-header actions-col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="table-loading">
                    <div className="loading-container">
                      <FaSpinner className="spinner" />
                      <span>Loading slides...</span>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="table-empty">
                    <FaRegCircle className="empty-icon" />
                    <p>{searchTerm ? `No slides found matching "${searchTerm}"` : "No carousel slides available"}</p>
                    {searchTerm && (
                      <button onClick={() => handleSearch("")} className="clear-search-btn">
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className={`carousel-row ${!item.is_active ? "inactive-row" : ""}`}>
                    <td className="table-cell id-col">#{item.id}</td>
                    <td className="table-cell video-col">
                      {item.video ? (
                        <video src={item.video} className="carousel-video-thumb" muted />
                      ) : item.image ? (
                        <img src={item.image} alt={item.title} className="carousel-video-thumb" />
                      ) : (
                        <span className="no-video">
                          <FaVideo /> No video
                        </span>
                      )}
                    </td>
                    <td className="table-cell title-col">
                      <span className="carousel-title-text">{item.title}</span>
                    </td>
                    <td className="table-cell status-col">
                      <span className={`status-badge ${item.is_active !== false ? "active" : "inactive"}`}>
                        <span className={`status-dot ${item.is_active !== false ? "active" : "inactive"}`} />
                        {item.is_active !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="table-cell actions-col">
                      <div className="action-buttons">
                        <button onClick={() => handleEditClick(item)} className="action-btn edit-btn" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => setDeleteTarget(item)} className="action-btn delete-btn" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalCount > 0 && (
          <div className="carousel-pagination">
            <div className="pagination-info">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalCount)} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} entries
            </div>
            <div className="pagination-controls">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="page-btn prev">
                <FaChevronLeft />
                <span>Previous</span>
              </button>
              <div className="page-numbers">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) pageNum = i + 1;
                  else if (currentPage <= 4) pageNum = i + 1;
                  else if (currentPage >= totalPages - 3) pageNum = totalPages - 6 + i;
                  else pageNum = currentPage - 3 + i;
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
                    >
                      {pageNum}
                    </button>
                  );
                }).filter(Boolean)}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="page-btn next">
                <span>Next</span>
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <CarouselFormModal
          mode={modalMode}
          formData={formData}
          onChange={handleChange}
          onFile={handleFile}
          currentMediaUrl={getCurrentMediaUrl()}
          onSubmit={handleSave}
          onClose={closeModal}
          saving={saving}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteCarouselConfirmModal
          item={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deletingId === deleteTarget?.id}
        />
      )}

      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default Carousel;