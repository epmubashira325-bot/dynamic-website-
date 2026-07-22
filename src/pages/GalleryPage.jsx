import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSpinner,
  FaSearch, FaSort, FaSortUp, FaSortDown, FaEye, FaEyeSlash,
  FaChevronLeft, FaChevronRight, FaCircle, FaRegCircle,
  FaCalendarAlt, FaTag, FaUpload, FaImage, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import { SERVER_URL } from "../services/api";
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  toggleGalleryStatus,
  getGalleryCategories,
  getGalleryItemsByCategory,
  createGalleryCategory,
  updateGalleryCategory,
  deleteGalleryCategory,
} from "../services/galleryService";
import "./GalleryPage.css";

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
// DELETE GALLERY CONFIRM MODAL
// ============================================================
function DeleteGalleryConfirmModal({ item, onCancel, onConfirm, deleting }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-md"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[720px] min-h-[440px] bg-white rounded-[18px] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.25)' }}
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
            Delete this gallery item?
          </h4>

          <p className="text-center text-[18px] text-gray-600 max-w-[500px] mb-8 leading-relaxed">
            "<span className="font-bold text-green-600">{item.title || 'Untitled'}</span>" will be permanently removed. This can't be undone.
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
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// =======================================================================================================================
// ADD CATEGORY MODAL
// ============================================================
function AddCategoryModal({ isOpen, onClose, onCategoryAdded, categories }) {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    const exists = categories.some(
      (cat) => cat.name.toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (exists) {
      setError(`Category "${categoryName.trim()}" already exists`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await createGalleryCategory({
        name: categoryName.trim(),
        is_active: isActive,
      });

      if (response && response.data) {
        onCategoryAdded(response.data);
        setCategoryName("");
        setIsActive(true);
        onClose();
      }
    } catch (err) {
      console.error("Error creating category:", err);
      setError(err.response?.data?.message || "Failed to create category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="category-modal-overlay" onClick={onClose}>
      <div className="category-modal" onClick={(e) => e.stopPropagation()}>
        <div className="category-modal-header">
          <div className="category-modal-header-content">
            <FaPlus className="category-modal-header-icon" />
            <h3>Add Category</h3>
          </div>
          <button onClick={onClose} className="category-modal-close" disabled={submitting}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="category-modal-form">
          {error && <div className="category-modal-error">{error}</div>}

          <div className="category-form-group">
            <label htmlFor="categoryName">
              Category Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Bathroom, Office"
              required
              autoFocus
            />
            <p className="category-form-hint">Category name must be unique</p>
          </div>

          <div className="category-status-section">
            <div className="category-status-label">
              <span className="category-status-text">Active Status</span>
              <span className="category-status-hint">Category will be visible in the filter</span>
            </div>
            <label className="category-toggle">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="category-toggle-input"
              />
              <span className="category-toggle-slider"></span>
            </label>
          </div>

          <div className="category-modal-actions">
            <button type="button" onClick={onClose} className="category-modal-cancel" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="category-modal-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <FaSpinner className="spinner" /> Creating...
                </>
              ) : (
                <>
                  <FaPlus size={12} /> Create Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// EDIT CATEGORY MODAL
// ============================================================
function EditCategoryModal({ isOpen, onClose, onCategoryUpdated, category }) {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name || "");
      setIsActive(category.is_active !== undefined ? category.is_active : true);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await updateGalleryCategory(category.id, {
        name: categoryName.trim(),
        is_active: isActive,
      });

      if (response && response.data) {
        onCategoryUpdated(response.data);
        setCategoryName("");
        setIsActive(true);
        onClose();
      }
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.response?.data?.message || "Failed to update category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="category-modal-overlay" onClick={onClose}>
      <div className="category-modal" onClick={(e) => e.stopPropagation()}>
        <div className="category-modal-header">
          <div className="category-modal-header-content">
            <FaEdit className="category-modal-header-icon" />
            <h3>Edit Category</h3>
          </div>
          <button onClick={onClose} className="category-modal-close" disabled={submitting}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="category-modal-form">
          {error && <div className="category-modal-error">{error}</div>}

          <div className="category-form-group">
            <label htmlFor="editCategoryName">
              Category Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="editCategoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
              autoFocus
            />
          </div>

          <div className="category-status-section">
            <div className="category-status-label">
              <span className="category-status-text">Active Status</span>
              <span className="category-status-hint">Category will be visible in the filter</span>
            </div>
            <label className="category-toggle">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="category-toggle-input"
              />
              <span className="category-toggle-slider"></span>
            </label>
          </div>

          <div className="category-modal-actions">
            <button type="button" onClick={onClose} className="category-modal-cancel" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="category-modal-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <FaSpinner className="spinner" /> Updating...
                </>
              ) : (
                <>
                  <FaEdit size={12} /> Update Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// ============================================================
// DELETE CATEGORY CONFIRM MODAL
// ============================================================
function DeleteCategoryConfirmModal({ category, onCancel, onConfirm, deleting }) {
  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-md"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[760px] min-h-[480px] bg-white rounded-[20px] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.25)' }}
      >
        <div className="h-[80px] px-10 flex items-center gap-4 border-b border-gray-200 bg-white">
          <svg className="w-7 h-7 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <h3 className="text-[28px] font-bold text-gray-800 tracking-tight">Delete Category</h3>
        </div>

        <div className="px-10 py-10 flex flex-col items-center">
          <div className="w-[120px] h-[120px] bg-green-50 flex items-center justify-center mb-8 shadow-sm rounded-[18px]">
            <svg className="w-[56px] h-[56px] text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <h4 className="text-[34px] font-bold text-gray-800 mb-4 tracking-tight text-center">
            Delete this category?
          </h4>

          <p className="text-center text-[19px] text-gray-600 max-w-[520px] mb-8 leading-relaxed">
            "<span className="font-bold text-green-600">{category.name}</span>" will be permanently removed.
          </p>

          <div className="w-full h-[68px] bg-orange-50 border border-orange-300 rounded-[12px] px-6 flex items-center gap-3 mb-9">
            <svg className="w-6 h-6 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-[17px] font-medium text-gray-700">
              This action cannot be undone.
            </span>
          </div>

          <div className="w-full flex gap-6">
            <button
              onClick={onCancel}
              disabled={deleting}
              className="flex-1 h-16 px-6 rounded-[12px] text-[18px] font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(category)}
              disabled={deleting}
              className="flex-1 h-16 px-6 rounded-[12px] text-[18px] font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-sm"
            >
              {deleting ? (
                <>
                  <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// ============================================================
// FALLBACK CATEGORIES (used only if the API returns nothing)
// ============================================================
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Living Room" },
  { id: 2, name: "Bedroom" },
  { id: 3, name: "Kitchen" },
  { id: 4, name: "Commercial" },
  { id: 5, name: "Construction" },
];

// ============================================================
// MAIN GALLERY COMPONENT
// ============================================================
function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    gallery_category: '',
    image: null,
    is_active: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const isFetchingRef = useRef(false);
  const mountedRef = useRef(true);
  const isInitialLoad = useRef(true);
  const fetchTimeoutRef = useRef(null);

  // Toast state
  const [toasts, setToasts] = useState([]);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Category modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategoryTarget, setDeleteCategoryTarget] = useState(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  // Toast functions
  const pushToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  // Get category name from ID
  // FIXED: previously this remapped IDs 1-5 through a hardcoded CATEGORY_MAP,
  // which silently overwrote real category names (e.g. a newly created
  // category could get renamed to "Kitchen" just because it happened to get
  // id 3 from the backend). Now it just trusts whatever the backend returned.
  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Uncategorized';
    const found = categories.find(c => c.id === categoryId);
    return found ? found.name : `Category ${categoryId}`;
  };

  // Fetch categories from API
  // FIXED: no longer overrides real category names via a hardcoded ID map.
  const fetchCategories = useCallback(async () => {
    try {
      console.log("📂 Fetching categories from API...");
      const response = await getGalleryCategories();
      console.log("✅ Categories response:", response);

      if (response && response.data) {
        let categoriesData = [];
        if (Array.isArray(response.data)) {
          categoriesData = response.data;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          categoriesData = response.data.results;
        } else if (response.results && Array.isArray(response.results)) {
          categoriesData = response.results;
        }

        if (categoriesData.length > 0) {
          setCategories(categoriesData);
          return;
        }
      }

      setCategories(FALLBACK_CATEGORIES);
    } catch (err) {
      console.error('❌ Error fetching categories:', err);
      setCategories(FALLBACK_CATEGORIES);
    }
  }, []);

  // Apply filters (category safety net + search)
  // FIXED: added a client-side category filter as a safety net in case the
  // backend's /gallery/ endpoint doesn't actually filter by gallery_category
  // (this was the cause of images showing up under every category).
  const applyFilters = useCallback((items) => {
    if (!items || items.length === 0) return [];

    let filtered = [...items];

    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (item) => String(item.gallery_category) === String(selectedCategory)
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const titleMatch = item.title?.toLowerCase().includes(term) || false;
        return titleMatch;
      });
      console.log(`🔍 Search term "${term}" found ${filtered.length} matching items by title`);
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Update filtered items and pagination.
  const updateFilteredItems = useCallback((items, apiTotalCount, apiTotalPages) => {
    const filtered = applyFilters(items);
    setFilteredItems(filtered);

    const safeTotalCount = typeof apiTotalCount === 'number' ? apiTotalCount : filtered.length;
    const safeTotalPages = typeof apiTotalPages === 'number' && apiTotalPages > 0 ? apiTotalPages : 1;

    setTotalCount(safeTotalCount);
    setTotalPages(safeTotalPages);

    // Adjust current page if it's now out of bounds
    if (currentPage > safeTotalPages) {
      setCurrentPage(Math.max(1, safeTotalPages));
    }

    return filtered;
  }, [applyFilters, currentPage]);

  // Fetch gallery items with pagination
  const fetchGalleryItems = useCallback(async (page = 1, limit = 5, search = "") => {
    if (isFetchingRef.current) {
      console.log("⏳ Fetch already in progress, skipping...");
      return;
    }

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      console.log(`🔄 Fetching gallery items - Page: ${page}, Limit: ${limit}, Search: "${search}"`);

      const response = await getGalleryItems(page, limit, search);

      if (!mountedRef.current) return;

      console.log("✅ API Response received:", response);

      let itemsData = [];
      let count = 0;
      let totalPagesFromApi = 1;

      if (response && response.data !== undefined) {
        itemsData = Array.isArray(response.data) ? response.data : [];
        count = response.count || itemsData.length;
        totalPagesFromApi = response.totalPages || Math.ceil(count / limit) || 1;
      } else if (response && response.results !== undefined) {
        itemsData = Array.isArray(response.results) ? response.results : [];
        count = response.count || itemsData.length;
        totalPagesFromApi = Math.ceil(count / limit) || 1;
      } else if (Array.isArray(response)) {
        itemsData = response;
        count = itemsData.length;
        totalPagesFromApi = Math.ceil(count / limit) || 1;
      } else {
        itemsData = [];
        count = 0;
        totalPagesFromApi = 1;
      }

      // Set gallery items (this is just the current page's items)
      setGalleryItems(itemsData);

      // Apply filters and set the REAL total count/pages from the backend
      const filtered = updateFilteredItems(itemsData, count, totalPagesFromApi);

      console.log(`✅ Loaded ${itemsData.length} items, Total: ${count}, Filtered: ${filtered.length}, Pages: ${totalPagesFromApi}`);

      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      }
    } catch (err) {
      console.error('❌ Error fetching gallery items:', err);
      if (mountedRef.current) {
        setError(err.message || 'Failed to load gallery items');
        pushToast('Failed to load gallery items', 'error');
        setGalleryItems([]);
        setFilteredItems([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } finally {
      isFetchingRef.current = false;
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [updateFilteredItems]);

  // Fetch gallery items with category filter
  const fetchGalleryItemsWithCategory = useCallback(async (page = 1, limit = 5, search = "", categoryId = null) => {
    if (isFetchingRef.current || !categoryId) {
      console.log("⏳ Fetch already in progress or no category selected, skipping...");
      return;
    }

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      console.log(`🔄 Fetching gallery items with category - Page: ${page}, Limit: ${limit}, Category: ${categoryId}`);

      const response = await getGalleryItemsByCategory(categoryId, page, limit);

      if (!mountedRef.current) return;

      console.log("✅ API Response with category received:", response);

      let itemsData = [];
      let count = 0;
      let totalPagesFromApi = 1;

      if (response && response.data !== undefined) {
        itemsData = Array.isArray(response.data) ? response.data : [];
        count = response.count || itemsData.length;
        totalPagesFromApi = response.totalPages || Math.ceil(count / limit) || 1;
      } else if (response && response.results !== undefined) {
        itemsData = Array.isArray(response.results) ? response.results : [];
        count = response.count || itemsData.length;
        totalPagesFromApi = Math.ceil(count / limit) || 1;
      } else if (Array.isArray(response)) {
        itemsData = response;
        count = itemsData.length;
        totalPagesFromApi = Math.ceil(count / limit) || 1;
      } else {
        itemsData = [];
        count = 0;
        totalPagesFromApi = 1;
      }

      // Set gallery items (this is just the current page's items)
      setGalleryItems(itemsData);

      // Apply filters (including the client-side category safety net) and
      // set the total count/pages from the backend
      const filtered = updateFilteredItems(itemsData, count, totalPagesFromApi);

      console.log(`✅ Loaded ${itemsData.length} items with category, Total: ${count}, Filtered: ${filtered.length}, Pages: ${totalPagesFromApi}`);
    } catch (err) {
      console.error('❌ Error fetching gallery items with category:', err);
      if (mountedRef.current) {
        setError(err.message || 'Failed to load gallery items');
        pushToast('Failed to load gallery items', 'error');
        setGalleryItems([]);
        setFilteredItems([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } finally {
      isFetchingRef.current = false;
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [updateFilteredItems]);

  // Initial load - only once
  useEffect(() => {
    mountedRef.current = true;

    const loadInitialData = async () => {
      await fetchCategories();
      await fetchGalleryItems(1, itemsPerPage, "");
    };

    loadInitialData();

    return () => {
      mountedRef.current = false;
      isFetchingRef.current = false;
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  // Handle page, search, or itemsPerPage changes
  useEffect(() => {
    // Skip initial load to avoid double fetching
    if (isInitialLoad.current && galleryItems.length === 0) return;

    // Clear any existing timeout
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    console.log(`🔄 Updating with new params - Page: ${currentPage}, Limit: ${itemsPerPage}, Search: "${searchTerm}", Category: ${selectedCategory}`);

    // Debounce the fetch to avoid multiple rapid calls
    fetchTimeoutRef.current = setTimeout(() => {
      if (selectedCategory === null) {
        fetchGalleryItems(currentPage, itemsPerPage, searchTerm);
      } else {
        fetchGalleryItemsWithCategory(currentPage, itemsPerPage, searchTerm, selectedCategory);
      }
    }, 300);

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [currentPage, searchTerm, itemsPerPage, selectedCategory, fetchGalleryItems, fetchGalleryItemsWithCategory, galleryItems.length]);

  // Reset to page 1 when itemsPerPage changes and current page is now out of range
  useEffect(() => {
    if (currentPage === 1) return;

    const maxPage = Math.ceil(totalCount / itemsPerPage) || 1;
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, totalCount, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (perPage) => {
    console.log(`📊 Changing items per page from ${itemsPerPage} to: ${perPage}`);
    if (perPage === itemsPerPage) return;

    setItemsPerPage(perPage);
    setCurrentPage(1);

    if (selectedCategory === null) {
      fetchGalleryItems(1, perPage, searchTerm);
    } else {
      fetchGalleryItemsWithCategory(1, perPage, searchTerm, selectedCategory);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("📁 File selected:", file.name, file.type, file.size);
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (item = null) => {
    console.log("📝 Opening modal:", item ? 'Edit mode' : 'Add mode');

    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        description: item.description || '',
        gallery_category: item.gallery_category || '',
        image: null,
        is_active: item.is_active !== undefined ? item.is_active : true
      });
      if (item.image) {
        if (item.image.startsWith('http://') || item.image.startsWith('https://')) {
          setImagePreview(item.image);
        } else {
          setImagePreview(`${SERVER_URL}${item.image}`);
        }
      } else {
        setImagePreview(null);
      }
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        gallery_category: '',
        image: null,
        is_active: true
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      gallery_category: '',
      image: null,
      is_active: true
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('is_active', formData.is_active);

      if (formData.gallery_category) {
        formDataToSend.append('gallery_category', parseInt(formData.gallery_category));
      }

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      let response;
      if (editingItem) {
        response = await updateGalleryItem(editingItem.id, formDataToSend);
        console.log("✅ Update response:", response);
        pushToast("Gallery item updated successfully");
      } else {
        response = await createGalleryItem(formDataToSend);
        console.log("✅ Create response:", response);
        pushToast("Gallery item created successfully");
      }

      if (response) {
        closeModal();
        // Refresh the current page with current filters
        if (selectedCategory === null) {
          await fetchGalleryItems(currentPage, itemsPerPage, searchTerm);
        } else {
          await fetchGalleryItemsWithCategory(currentPage, itemsPerPage, searchTerm, selectedCategory);
        }
      }
    } catch (err) {
      console.error('❌ Error saving gallery item:', err);
      let errorMessage = 'Failed to save gallery item. Please try again.';
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          const errors = Object.entries(err.response.data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n');
          errorMessage = errors || JSON.stringify(err.response.data);
        } else {
          errorMessage = err.response.data;
        }
      }
      pushToast(errorMessage, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async (item) => {
    try {
      setDeletingId(item.id);
      await deleteGalleryItem(item.id);
      pushToast("Gallery item deleted successfully");
      // Refresh the current page with current filters
      if (selectedCategory === null) {
        await fetchGalleryItems(currentPage, itemsPerPage, searchTerm);
      } else {
        await fetchGalleryItemsWithCategory(currentPage, itemsPerPage, searchTerm, selectedCategory);
      }
    } catch (err) {
      console.error('❌ Error deleting gallery item:', err);
      pushToast('Failed to delete gallery item', 'error');
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  const handleToggleStatus = async (item) => {
    console.log(`🔄 Toggling status for gallery item ${item.id}`);
    try {
      await toggleGalleryStatus(item.id);
      console.log(`✅ Status toggled successfully`);
      pushToast(`Gallery item ${item.is_active !== false ? 'deactivated' : 'activated'} successfully`);
      // Refresh the current page with current filters
      if (selectedCategory === null) {
        await fetchGalleryItems(currentPage, itemsPerPage, searchTerm);
      } else {
        await fetchGalleryItemsWithCategory(currentPage, itemsPerPage, searchTerm, selectedCategory);
      }
    } catch (err) {
      console.error('❌ Error toggling gallery status:', err);
      pushToast('Failed to update gallery status', 'error');
    }
  };

  const handleRetry = () => {
    if (selectedCategory === null) {
      fetchGalleryItems(currentPage, itemsPerPage, searchTerm);
    } else {
      fetchGalleryItemsWithCategory(currentPage, itemsPerPage, searchTerm, selectedCategory);
    }
  };

  const handleCategoryClick = (categoryId) => {
    console.log(`📂 Category clicked: ${categoryId}`);
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories(prev => [...prev, newCategory]);
    pushToast(`Category "${newCategory.name}" created successfully`);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowEditCategoryModal(true);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories(prev => prev.map(cat =>
      cat.id === updatedCategory.id ? { ...updatedCategory, name: updatedCategory.name || cat.name } : cat
    ));
    pushToast(`Category "${updatedCategory.name}" updated successfully`);
  };

  const handleDeleteCategoryConfirm = async (category) => {
    try {
      setDeletingCategoryId(category.id);
      await deleteGalleryCategory(category.id);

      setCategories(prev => prev.filter(cat => cat.id !== category.id));

      if (selectedCategory === category.id) {
        setSelectedCategory(null);
      }

      pushToast(`Category "${category.name}" deleted successfully`);
    } catch (err) {
      console.error('❌ Error deleting category:', err);
      pushToast(err.response?.data?.message || 'Failed to delete category', 'error');
    } finally {
      setDeletingCategoryId(null);
      setDeleteCategoryTarget(null);
    }
  };

  // filteredItems already represents exactly the current backend page
  const currentItems = filteredItems;

  if (loading && galleryItems.length === 0) {
    return (
      <div className="gallery-page">
        <div className="gallery-loading">
          <FaSpinner className="spinner" />
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="gallery-table-wrapper">
        {/* Header */}
        <div className="gallery-table-header">
          <div className="gallery-header-left">
            <h2 className="gallery-title">Gallery</h2>
            <span className="gallery-subtitle">Manage your gallery images</span>
          </div>
          <div className="gallery-header-right">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="gallery-add-category-btn"
              >
                <FaPlus /> Add Category
              </button>
              <button onClick={() => openModal()} className="gallery-add-btn">
                <FaPlus /> Add Image
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="text-red-700">{error}</span>
            </div>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div className="gallery-toolbar">
          <div className="gallery-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="gallery-search-input"
            />
            {searchTerm && (
              <button
                className="search-clear-btn"
                onClick={() => handleSearch("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className="gallery-controls">
            <div className="gallery-entries">
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

        {/* Category Filter */}
        <div className="gallery-category-filter">
          <div className="category-filter-scroll">
            <button
              className={`category-filter-btn ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => handleCategoryClick(null)}
            >
              ALL
            </button>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <div key={cat.id} className="category-filter-item">
                  <button
                    className={`category-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    {cat.name.toUpperCase()}
                  </button>
                  <div className="category-actions">
                    <button
                      className="category-edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(cat);
                      }}
                      title="Edit category"
                    >
                      <FaEdit size={10} />
                    </button>
                    <button
                      className="category-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteCategoryTarget(cat);
                      }}
                      title="Delete category"
                    >
                      <FaTrash size={10} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <button className="category-filter-btn" disabled>
                No Categories
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="gallery-table-container">
          <table className="gallery-table">
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
                      <span>Loading gallery items...</span>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">
                    <FaRegCircle className="empty-icon" />
                    <p>
                      {searchTerm
                        ? `No items found matching "${searchTerm}"`
                        : selectedCategory !== null
                          ? `No items found in "${categories.find(c => c.id === selectedCategory)?.name || 'selected'}" category`
                          : "No gallery items available"}
                    </p>
                    {searchTerm && (
                      <button onClick={() => handleSearch("")} className="clear-search-btn">
                        Clear search
                      </button>
                    )}
                    {selectedCategory !== null && !searchTerm && (
                      <button
                        onClick={() => handleCategoryClick(null)}
                        className="clear-search-btn"
                      >
                        Show all items
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => {
                  const imageUrl = item.image ?
                    (item.image.startsWith('http') ? item.image : `${SERVER_URL}${item.image}`)
                    : null;

                  return (
                    <tr key={item.id} className={`gallery-row ${!item.is_active ? 'inactive-row' : ''}`}>
                      <td className="table-cell id-col">#{item.id}</td>
                      <td className="table-cell image-col">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="gallery-thumbnail"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<span className="no-image">No image</span>';
                            }}
                          />
                        ) : (
                          <span className="no-image">No image</span>
                        )}
                      </td>
                      <td className="table-cell title-col">
                        <span className="gallery-title-text">{item.title}</span>
                      </td>
                      <td className="table-cell desc-col">
                        <span className="gallery-description">
                          {item.description?.length > 60
                            ? `${item.description.substring(0, 60)}...`
                            : item.description || '—'}
                        </span>
                      </td>
                      <td className="table-cell status-col">
                        <span className={`status-badge ${item.is_active !== false ? 'active' : 'inactive'}`}>
                          <span className={`status-dot ${item.is_active !== false ? 'active' : 'inactive'}`} />
                          {item.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="table-cell actions-col">
                        <div className="action-buttons">
                          <button
                            onClick={() => handleToggleStatus(item)}
                            className={`action-btn status-btn ${item.is_active !== false ? 'active' : 'inactive'}`}
                            title={item.is_active !== false ? 'Deactivate' : 'Activate'}
                          >
                            {item.is_active !== false ? <FaEye /> : <FaEyeSlash />}
                          </button>
                          <button
                            onClick={() => openModal(item)}
                            className="action-btn edit-btn"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="action-btn delete-btn"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalCount > 0 && (
          <div className="gallery-pagination">
            <div className="pagination-info">
              Showing {Math.min(((currentPage - 1) * itemsPerPage) + 1, totalCount)} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} entries
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-btn prev"
              >
                <FaChevronLeft />
                <span>Previous</span>
              </button>
              <div className="page-numbers">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }
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
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-btn next"
              >
                <span>Next</span>
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Gallery Item */}
      {showModal && (
        <div className="gallery-modal-overlay" onClick={closeModal}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-header">
              <div className="gallery-modal-header-content">

                <h3>{editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h3>
              </div>
              <button onClick={closeModal} className="gallery-modal-close" disabled={submitting}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="gallery-modal-form">
              <div className="gallery-form-group">
                <label htmlFor="title">Title <span className="required">*</span></label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter image title"
                />
              </div>
              <div className="gallery-form-group">
                <label htmlFor="gallery_category">Category</label>
                <select
                  id="gallery_category"
                  name="gallery_category"
                  value={formData.gallery_category}
                  onChange={handleInputChange}
                  className="gallery-category-select"
                >
                  <option value="">Select Category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No categories available</option>
                  )}
                </select>
              </div>
              <div className="gallery-form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter image description"
                  rows="3"
                />
              </div>
              <div className="gallery-form-group">
                <label htmlFor="image">Image {!editingItem && <span className="required">*</span>}</label>
                <div className="gallery-file-upload">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="gallery-file-input"
                  />
                  <div className="gallery-upload-area">
                    <FaUpload className="upload-icon" />
                    <span>Click or drag to upload image</span>
                    <small>Supported formats: JPG, PNG, GIF, WebP</small>
                  </div>
                </div>
                {imagePreview && (
                  <div className="gallery-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
                {editingItem && editingItem.image && !formData.image && (
                  <p className="gallery-form-hint">Current image: {editingItem.image.split('/').pop()}</p>
                )}
              </div>
              <div className="gallery-status-section">
                <div className="gallery-status-label">
                  <span className="gallery-status-text">Status</span>
                  <span className={`gallery-status-badge ${formData.is_active ? "active" : "inactive"}`}>
                    {formData.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <label className="gallery-toggle">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      handleInputChange({ target: { name: "is_active", value: e.target.checked } })
                    }
                    className="gallery-toggle-input"
                  />
                  <span className="gallery-toggle-slider"></span>
                </label>
              </div>
              <div className="gallery-modal-actions">
                <button type="button" onClick={closeModal} className="gallery-modal-cancel" disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="gallery-modal-submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <FaSpinner className="spinner" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> {editingItem ? 'Update' : 'Create'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Gallery Confirmation Modal */}
      {deleteTarget && (
        <DeleteGalleryConfirmModal
          item={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deletingId === deleteTarget?.id}
        />
      )}

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onCategoryAdded={handleCategoryAdded}
        categories={categories}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={() => {
          setShowEditCategoryModal(false);
          setEditingCategory(null);
        }}
        onCategoryUpdated={handleCategoryUpdated}
        category={editingCategory}
      />

      {/* Delete Category Confirmation Modal */}
      <DeleteCategoryConfirmModal
        category={deleteCategoryTarget}
        onCancel={() => setDeleteCategoryTarget(null)}
        onConfirm={handleDeleteCategoryConfirm}
        deleting={deletingCategoryId === deleteCategoryTarget?.id}
      />

      {/* Toasts */}
      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default GalleryPage;