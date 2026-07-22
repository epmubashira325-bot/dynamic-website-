// src/components/CarouselTable.jsx
import { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaVideo,
  FaImage,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

function CarouselTable({
  data,
  loading,
  getMediaUrl,
  onEdit,
  onDelete,
  onAdd,
  deletingId,
  // Pagination props from parent
  currentPage,
  totalPages,
  totalCount,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onSearch,
  searchTerm,
}) {
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(localSearchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearch]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort data (client-side sorting)
  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField] || "";
    let bVal = b[sortField] || "";
    if (sortField === "created_at") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    if (sortField === "is_active") {
      aVal = aVal ? 1 : 0;
      bVal = bVal ? 1 : 0;
    }
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="sort-icon" />;
    return sortDirection === "asc" ? (
      <FaSortUp className="sort-icon active" />
    ) : (
      <FaSortDown className="sort-icon active" />
    );
  };

  const renderMedia = (item) => {
    // Get the media URL safely
    let mediaUrl = null;
    if (item.media_type === 'video' && item.video) {
      mediaUrl = getMediaUrl ? getMediaUrl(item.video) : item.video;
    } else if (item.media_type === 'image' && item.image) {
      mediaUrl = getMediaUrl ? getMediaUrl(item.image) : item.image;
    }

    // If no media URL, show placeholder
    if (!mediaUrl) {
      return (
        <div className="video-thumbnail-placeholder">
          <span>No media</span>
        </div>
      );
    }

    // For videos - removed controls and added autoplay with mute
    if (item.media_type === 'video') {
      return (
        <video
          src={mediaUrl}
          className="video-thumbnail"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          controlsList="nodownload noremoteplayback nofullscreen"
          disablePictureInPicture
        />
      );
    }

    // For images
    return (
      <img
        src={mediaUrl}
        alt={item.title || 'Carousel item'}
        className="video-thumbnail"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          const placeholder = document.createElement('div');
          placeholder.className = 'video-thumbnail-placeholder';
          placeholder.innerHTML = '<span>Failed to load</span>';
          e.target.parentElement.appendChild(placeholder);
        }}
      />
    );
  };

  // Get page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="carousel-table-container">
        <div className="carousel-table-loading">
          <div className="loading-spinner"></div>
          <p>Loading carousel items...</p>
        </div>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + data.length, totalCount);

  return (
    <div className="carousel-table-container">
      {/* Toolbar */}
      <div className="carousel-table-toolbar">
        <div className="carousel-search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title..."
            value={localSearchTerm}
            onChange={(e) => {
              setLocalSearchTerm(e.target.value);
            }}
            className="carousel-search-input"
          />
          {localSearchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => {
                setLocalSearchTerm("");
                if (onSearch) onSearch("");
              }}
            >
              ✕
            </button>
          )}
        </div>
        <div className="carousel-controls">
          <div className="carousel-entries">
            <label>Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                if (onItemsPerPageChange) {
                  onItemsPerPageChange(Number(e.target.value));
                }
              }}
              className="entries-select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <label>entries</label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="carousel-table-wrapper">
        <table className="carousel-data-table">
          <thead>
            <tr>
              <th className="table-header" style={{ width: "60px" }}>#</th>
              <th className="table-header" style={{ width: "120px" }}>Media</th>
              <th
                className="table-header sortable"
                onClick={() => handleSort("title")}
              >
                Title {getSortIcon("title")}
              </th>
              <th
                className="table-header sortable hidden-md"
                onClick={() => handleSort("is_active")}
              >
                Status {getSortIcon("is_active")}
              </th>
              <th
                className="table-header sortable hidden-lg"
                onClick={() => handleSort("created_at")}
              >
                Created {getSortIcon("created_at")}
              </th>
              <th className="table-header" style={{ textAlign: "center", width: "120px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty">
                  {localSearchTerm ? "No results found" : "No carousel slides yet"}
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => (
                <tr key={item.id} className="table-row">
                  <td className="table-cell">{startIndex + index + 1}</td>
                  <td className="table-cell">
                    {renderMedia(item)}
                  </td>
                  <td className="table-cell title-cell">{item.title || 'Untitled'}</td>
                  <td className="table-cell hidden-md">
                    <span className={`status-badge ${item.is_active ? "active" : "inactive"}`}>
                      <span className={`status-dot ${item.is_active ? "active" : "inactive"}`} />
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="table-cell hidden-lg">{formatDate(item.created_at)}</td>
                  <td className="table-cell actions-cell">
                    <button
                      onClick={() => onEdit(item)}
                      className="action-btn edit-btn"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      disabled={deletingId === item.id}
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      {deletingId === item.id ? (
                        <div className="spinner-small"></div>
                      ) : (
                        <FaTrash />
                      )}
                    </button>
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
            Showing {startIndex + 1} to {endIndex} of {totalCount} entries
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              <FaChevronLeft /> Previous
            </button>
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="page-ellipsis">…</span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Next <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .carousel-table-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          margin-top: 1.5rem;
        }

        .carousel-table-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          gap: 1rem;
          color: #6b7280;
        }

        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid #e5e7eb;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Toolbar */
        .carousel-table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f3f4f6;
          flex-wrap: wrap;
          gap: 1rem;
          background: #fafafa;
        }

        .carousel-search-wrapper {
          position: relative;
          flex: 1;
          max-width: 400px;
          min-width: 200px;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-size: 0.875rem;
        }

        .carousel-search-input {
          width: 100%;
          padding: 0.625rem 0.875rem 0.625rem 2.25rem;
          border: 2px solid #d1d5db;
          border-radius: 10px;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
          background: #ffffff;
          color: #1a1a2e;
          font-weight: 500;
        }

        .carousel-search-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .carousel-search-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .search-clear-btn {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 0.875rem;
          padding: 0.25rem;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .search-clear-btn:hover {
          background: #f3f4f6;
        }

        .carousel-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .carousel-entries {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .entries-select {
          padding: 0.375rem 0.75rem;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
          cursor: pointer;
          outline: none;
        }

        .entries-select:focus {
          border-color: #2563eb;
        }

        /* Table */
        .carousel-table-wrapper {
          overflow-x: auto;
        }

        .carousel-data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .table-header {
          padding: 0.875rem 1rem;
          text-align: left;
          font-weight: 700;
          color: #1a1a2e;
          background: #f1f5f9;
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-header.sortable {
          cursor: pointer;
          user-select: none;
          transition: background 0.2s ease;
        }

        .table-header.sortable:hover {
          background: #e2e8f0;
        }

        .sort-icon {
          margin-left: 0.25rem;
          color: #94a3b8;
          font-size: 0.7rem;
          display: inline-block;
        }

        .sort-icon.active {
          color: #2563eb;
        }

        .table-row {
          transition: background 0.15s ease;
        }

        .table-row:hover {
          background: #f8fafc;
        }

        .table-cell {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #1a1a2e;
          font-weight: 500;
        }

        .title-cell {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
        }

        /* Updated video thumbnail styles - no controls visible */
        .video-thumbnail {
          width: 100px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          display: block;
          pointer-events: none;
        }

        .video-thumbnail::-webkit-media-controls {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-enclosure {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-panel {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-play-button {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-start-playback-button {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-timeline {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-volume-slider {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-mute-button {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-current-time-display {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-time-remaining-display {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-toggle-closed-captions-button {
          display: none !important;
        }
        .video-thumbnail::-webkit-media-controls-overlay-play-button {
          display: none !important;
        }
        .video-thumbnail::-moz-media-controls {
          display: none !important;
        }
        .video-thumbnail::-moz-media-controls-panel {
          display: none !important;
        }
        .video-thumbnail::-moz-media-controls-play-button {
          display: none !important;
        }
        .video-thumbnail::-ms-media-controls {
          display: none !important;
        }
        .video-thumbnail::-ms-media-controls-panel {
          display: none !important;
        }
        .video-thumbnail::-ms-media-controls-play-button {
          display: none !important;
        }

        .video-thumbnail-placeholder {
          width: 100px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 0.75rem;
        }

        /* Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .status-badge.active {
          background: #dcfce7;
          color: #16a34a;
        }

        .status-badge.inactive {
          background: #f1f5f9;
          color: #64748b;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-dot.active {
          background: #16a34a;
        }

        .status-dot.inactive {
          background: #94a3b8;
        }

        /* Actions */
        .actions-cell {
          display: flex;
          gap: 0.25rem;
          justify-content: center;
          align-items: center;
        }

        .action-btn {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          font-size: 0.875rem;
        }

        .action-btn.edit-btn {
          color: #2563eb;
        }

        .action-btn.edit-btn:hover {
          background: #eff6ff;
        }

        .action-btn.delete-btn {
          color: #ef4444;
        }

        .action-btn.delete-btn:hover:not(:disabled) {
          background: #fef2f2;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid #e5e7eb;
          border-top-color: #ef4444;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .table-empty {
          padding: 3rem !important;
          text-align: center !important;
          color: #94a3b8 !important;
          font-size: 0.875rem !important;
        }

        /* Pagination */
        .carousel-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-top: 1px solid #f1f5f9;
          flex-wrap: wrap;
          gap: 1rem;
          background: #fafafa;
        }

        .pagination-info {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .pagination-buttons {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .page-btn {
          padding: 0.375rem 0.875rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1a1a2e;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 40px;
          text-align: center;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .page-btn:hover:not(:disabled):not(.active) {
          background: #f1f5f9;
        }

        .page-btn.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-ellipsis {
          padding: 0 0.25rem;
          color: #94a3b8;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .carousel-table-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .carousel-search-wrapper {
            max-width: 100%;
          }

          .carousel-controls {
            justify-content: center;
          }

          .carousel-pagination {
            flex-direction: column;
            align-items: center;
          }

          .pagination-buttons {
            justify-content: center;
          }

          .hidden-md {
            display: none !important;
          }
        }

        @media (max-width: 1024px) {
          .hidden-lg {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default CarouselTable;