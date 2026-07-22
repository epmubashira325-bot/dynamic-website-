// src/pages/ServiceList.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaTimes,
  FaSave,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaRegCircle,
  FaImage,
  FaUpload,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { SERVER_URL } from "../services/api";
import {
  getAllServices,
  addService,
  updateService,
  deleteService
} from "../services/serviceService";
import "./ServiceList.css";

const getMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("https") || path.startsWith("blob:")) return path;
  return `${SERVER_URL}${path}`;
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
// DELETE CONFIRM MODAL (matches Gallery's delete modal)
// ============================================================
function DeleteConfirmModal({ item, onCancel, onConfirm, deleting }) {
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
          <h3 className="text-[26px] font-bold text-gray-800 tracking-tight">Delete Confirmation</h3>
        </div>

        <div className="px-10 py-10 flex flex-col items-center">
          <div className="w-[110px] h-[110px] bg-green-50 flex items-center justify-center mb-8 shadow-sm rounded-[16px]">
            <svg className="w-[52px] h-[52px] text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <h4 className="text-[32px] font-bold text-gray-800 mb-4 tracking-tight text-center">
            Delete this service?
          </h4>

          <p className="text-center text-[18px] text-gray-600 max-w-[500px] mb-8 leading-relaxed">
            "<span className="font-bold text-green-600">{item.title || "Untitled"}</span>" will be permanently removed. This can't be undone.
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
// SERVICE MODAL (styled like GalleryPage's add/edit modal)
// ============================================================
function ServiceModal({ mode, formData, onChange, onImageFile, currentImageUrl, onSubmit, onClose, saving }) {
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal" onClick={(e) => e.stopPropagation()}>
        <div className="service-modal-header">
          <div className="service-modal-header-content">

            <h3>{mode === "add" ? "Add New Service" : "Edit Service"}</h3>
          </div>
          <button onClick={onClose} className="service-modal-close" disabled={saving}>
            <FaTimes />
          </button>
        </div>

        <div className="service-modal-form">
          <div className="service-form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Enter service title"
            />
          </div>

          <div className="service-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Enter service description"
              rows="3"
            />
          </div>

          <div className="service-form-group">
            <label htmlFor="image">
              Image {mode === "add" && <span className="required">*</span>}
            </label>
            <div className="service-file-upload">
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="service-file-input"
              />
              <div className="service-upload-area">
                <FaUpload className="upload-icon" />
                <span>Click or drag to upload image</span>
                <small>Supported formats: JPG, PNG, GIF, WebP</small>
              </div>
            </div>
            {previewUrl && (
              <div className="service-image-preview">
                <img src={previewUrl} alt="Preview" />
                <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                  <FaTimes />
                </button>
              </div>
            )}
            {mode === "edit" && !previewUrl && currentImageUrl && (
              <div className="service-image-preview">
                <img src={currentImageUrl} alt="Current" />
              </div>
            )}
          </div>

          <div className="service-status-section">
            <div className="service-status-label">
              <span className="service-status-text">Status</span>
              <span className={`service-status-badge ${formData.is_active ? "active" : "inactive"}`}>
                {formData.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <label className="service-toggle">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={(e) => onChange({ target: { name: "is_active", value: e.target.checked } })}
                className="service-toggle-input"
              />
              <span className="service-toggle-slider"></span>
            </label>
          </div>

          <div className="service-modal-actions">
            <button type="button" onClick={onClose} className="service-modal-cancel" disabled={saving}>
              Cancel
            </button>
            <button type="button" onClick={onSubmit} className="service-modal-submit" disabled={saving}>
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
// MAIN SERVICE LIST COMPONENT
// ============================================================
function ServiceList() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    is_active: true
  });
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

  const updateFilteredServices = useCallback(
    (items) => {
      const filtered = applySearchFilter(items);
      setFilteredServices(filtered);

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

  const fetchServices = useCallback(
    async (showLoading = true) => {
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;
        if (showLoading) setLoading(true);
        setError(null);

        const response = await getAllServices();
        if (!mountedRef.current) return;

        let servicesData = Array.isArray(response?.data) ? response.data : [];

        // ✅ FIX: Sort services by ID in ascending order (oldest first, newest at bottom)
        servicesData = servicesData.sort((a, b) => {
          // If IDs are numbers
          if (typeof a.id === 'number' && typeof b.id === 'number') {
            return a.id - b.id;
          }
          // If IDs are strings (like UUIDs), sort by creation date if available
          if (a.created_at && b.created_at) {
            return new Date(a.created_at) - new Date(b.created_at);
          }
          // Fallback to string comparison
          return String(a.id).localeCompare(String(b.id));
        });

        setServices(servicesData);
        updateFilteredServices(servicesData);

        if (isInitialLoad) setIsInitialLoad(false);
      } catch (err) {
        console.error("❌ Error fetching services:", err);
        if (mountedRef.current) {
          setError("Failed to load services. Please try again.");
          pushToast("Failed to load services", "error");
          setServices([]);
          setFilteredServices([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } finally {
        isFetchingRef.current = false;
        if (showLoading && mountedRef.current) setLoading(false);
      }
    },
    [updateFilteredServices, isInitialLoad]
  );

  useEffect(() => {
    mountedRef.current = true;
    fetchServices(true);
    return () => {
      mountedRef.current = false;
      isFetchingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;
    if (services.length === 0) return;
    updateFilteredServices(services);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, itemsPerPage, services]);

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

  const handleImageFile = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleAddClick = () => {
    setModalMode("add");
    setEditingItem(null);
    setFormData({ title: "", description: "", image: null, is_active: true });
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    setModalMode("edit");
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      image: null,
      is_active: item.is_active !== undefined ? item.is_active : true
    });
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditingItem(null);
    setFormData({ title: "", description: "", image: null, is_active: true });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      pushToast("Please enter a title", "error");
      return;
    }
    if (modalMode === "add" && !formData.image) {
      pushToast("Please select an image", "error");
      return;
    }

    try {
      setSaving(true);
      const data = new FormData();
      data.append("title", formData.title.trim());

      let description = formData.description.trim();
      if (!description || description.length < 10) {
        description = description.padEnd(10, " ") || "Description";
      }
      data.append("description", description);
      data.append("is_active", formData.is_active);
      if (formData.image) data.append("image", formData.image);

      if (modalMode === "edit" && editingItem) {
        await updateService(editingItem.id, data);
        pushToast("Service updated successfully");
      } else {
        await addService(data);
        pushToast("Service created successfully");
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData({ title: "", description: "", image: null, is_active: true });
      await fetchServices(true);
    } catch (err) {
      console.error("❌ Error saving service:", err);
      let errorMsg = "Failed to save service";
      if (err.response?.data) {
        if (typeof err.response.data === "object") {
          const firstError = Object.values(err.response.data)[0];
          errorMsg = Array.isArray(firstError) ? firstError[0] : firstError || JSON.stringify(err.response.data);
        } else if (typeof err.response.data === "string") {
          errorMsg = err.response.data;
        }
      }
      pushToast(errorMsg, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async (item) => {
    try {
      setDeletingId(item.id);
      await deleteService(item.id);
      pushToast("Service deleted successfully");
      await fetchServices(true);
    } catch (err) {
      console.error("❌ Error deleting service:", err);
      pushToast("Failed to delete service", "error");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  const handleRetry = () => fetchServices(true);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentItems = getCurrentPageItems();

  if (loading && services.length === 0) {
    return (
      <div className="service-page">
        <div className="service-loading">
          <FaSpinner className="spinner" />
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-page">
      <div className="service-table-wrapper">
        {/* Header */}
        <div className="service-table-header">
          <div className="service-header-left">
            <h2 className="service-title">Services</h2>
            <span className="service-subtitle">Manage your services</span>
          </div>
          <div className="service-header-right">
            <button onClick={handleAddClick} className="service-add-btn">
              <FaPlus /> Add Service
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
        <div className="service-toolbar">
          <div className="service-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="service-search-input"
            />
            {searchTerm && (
              <button className="search-clear-btn" onClick={() => handleSearch("")}>
                <FaTimes />
              </button>
            )}
          </div>
          <div className="service-controls">
            <div className="service-entries">
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
                <option value={100}>100</option>
              </select>
              <label>entries</label>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="service-table-container">
          <table className="service-table">
            <thead>
              <tr>
                <th className="table-header id-col">#</th>
                <th className="table-header image-col">IMAGE</th>
                <th className="table-header title-col">TITLE</th>
                <th className="table-header desc-col">DESCRIPTION</th>
                <th className="table-header status-col">STATUS</th>
                <th className="table-header actions-col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="table-loading">
                    <div className="loading-container">
                      <FaSpinner className="spinner" />
                      <span>Loading services...</span>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">
                    <FaRegCircle className="empty-icon" />
                    <p>{searchTerm ? `No services found matching "${searchTerm}"` : "No services available"}</p>
                    {searchTerm && (
                      <button onClick={() => handleSearch("")} className="clear-search-btn">
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className={`service-row ${!item.is_active ? "inactive-row" : ""}`}>
                    <td className="table-cell id-col">#{item.id}</td>
                    <td className="table-cell image-col">
                      {item.image ? (
                        <img
                          src={getMediaUrl(item.image)}
                          alt={item.title}
                          className="service-thumbnail"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = '<span className="no-image">No image</span>';
                          }}
                        />
                      ) : (
                        <span className="no-image">No image</span>
                      )}
                    </td>
                    <td className="table-cell title-col">
                      <span className="service-title-text">{item.title}</span>
                    </td>
                    <td className="table-cell desc-col">
                      <span className="service-description">
                        {item.description?.length > 60 ? `${item.description.substring(0, 60)}...` : item.description || "—"}
                      </span>
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
          <div className="service-pagination">
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

      {/* Modal for Add/Edit Service */}
      {showModal && (
        <ServiceModal
          mode={modalMode}
          formData={formData}
          onChange={handleChange}
          onImageFile={handleImageFile}
          currentImageUrl={modalMode === "edit" ? getMediaUrl(editingItem?.image) : null}
          onSubmit={handleSave}
          onClose={closeModal}
          saving={saving}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          item={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deletingId === deleteTarget?.id}
        />
      )}

      {/* Toasts */}
      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default ServiceList;