// src/components/ServiceTable.jsx
import { useState } from "react";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaSearch, FaEye, FaEyeSlash } from "react-icons/fa";

function ServiceTable({
    data,
    loading,
    getMediaUrl,
    onEdit,
    onDelete,
    onAdd,
    onToggleStatus,
    deletingId,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("desc");

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const filteredData = data
        .filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let aVal = a[sortField] || "";
            let bVal = b[sortField] || "";
            if (sortField === "is_active") {
                aVal = aVal ? 1 : 0;
                bVal = bVal ? 1 : 0;
            }
            if (typeof aVal === "string") {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
            if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return <FaSort className="sort-icon" />;
        return sortDirection === "asc" ? (
            <FaSortUp className="sort-icon active" />
        ) : (
            <FaSortDown className="sort-icon active" />
        );
    };

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

    return (
        <div className="services-table-container">
            <div className="services-table-header">
                <div className="services-header-left">
                    <h2 className="services-title">Services Management</h2>
                    <span className="services-subtitle">Manage your services</span>
                </div>
                <div className="services-header-right">
                    <button onClick={onAdd} className="services-add-btn">
                        <span className="services-add-icon">+</span>
                        Add Service
                    </button>
                </div>
            </div>

            <div className="services-toolbar">
                <div className="services-search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="services-search-input"
                    />
                    {searchTerm && (
                        <button
                            className="search-clear-btn"
                            onClick={() => {
                                setSearchTerm("");
                                setCurrentPage(1);
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
                <div className="services-entries-info">
                    Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{" "}
                    {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                </div>
            </div>

            <div className="services-table-wrapper">
                <table className="services-data-table">
                    <thead>
                        <tr>
                            <th className="table-header" style={{ width: "60px" }}>#</th>
                            <th className="table-header" style={{ width: "80px" }}>Image</th>
                            <th className="table-header sortable" onClick={() => handleSort("title")}>
                                Title {getSortIcon("title")}
                            </th>
                            <th className="table-header sortable hidden-md" onClick={() => handleSort("description")}>
                                Description {getSortIcon("description")}
                            </th>
                            <th className="table-header sortable" onClick={() => handleSort("is_active")} style={{ width: "100px", textAlign: "center" }}>
                                Status {getSortIcon("is_active")}
                            </th>
                            <th className="table-header" style={{ textAlign: "center", width: "120px" }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="table-loading">
                                    <div className="loading-spinner"></div>
                                    Loading services...
                                </td>
                            </tr>
                        ) : currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="table-empty">
                                    {searchTerm ? "No results found" : "No services available"}
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((item, index) => (
                                <tr key={item.id} className={`table-row ${!item.is_active ? 'inactive-row' : ''}`}>
                                    <td className="table-cell">{startIndex + index + 1}</td>
                                    <td className="table-cell">
                                        {item.image ? (
                                            <img
                                                src={getMediaUrl(item.image)}
                                                alt={item.title}
                                                className="service-thumbnail"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = '<span class="no-image">No image</span>';
                                                }}
                                            />
                                        ) : (
                                            <span className="no-image">No image</span>
                                        )}
                                    </td>
                                    <td className="table-cell title-cell">{item.title}</td>
                                    <td className="table-cell hidden-md desc-cell">
                                        {item.description?.length > 100
                                            ? `${item.description.substring(0, 100)}...`
                                            : item.description}
                                    </td>
                                    <td className="table-cell status-col">
                                        <span className={`status-badge ${item.is_active ? "active" : "inactive"}`}>
                                            <span className={`status-dot ${item.is_active ? "active" : "inactive"}`} />
                                            {item.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="table-cell actions-cell">
                                        <button
                                            onClick={() => onToggleStatus(item)}
                                            className={`action-btn status-btn ${item.is_active ? 'active' : 'inactive'}`}
                                            title={item.is_active ? 'Deactivate' : 'Activate'}
                                        >
                                            {item.is_active ? <FaEye /> : <FaEyeSlash />}
                                        </button>
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

            {!loading && filteredData.length > 0 && (
                <div className="services-pagination">
                    <div className="pagination-info">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                    </div>
                    <div className="pagination-buttons">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="page-btn"
                        >
                            Previous
                        </button>
                        {getPageNumbers().map((page, idx) =>
                            page === "..." ? (
                                <span key={`ellipsis-${idx}`} className="page-ellipsis">…</span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`page-btn ${currentPage === page ? "active" : ""}`}
                                >
                                    {page}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="page-btn"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        .services-table-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .services-table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: #fafafa;
          border-bottom: 1px solid #f3f4f6;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .services-header-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .services-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0a1a12;
          margin: 0;
        }

        .services-subtitle {
          font-size: 0.85rem;
          color: #6b7280;
        }

        .services-header-right {
          display: flex;
          gap: 8px;
        }

        .services-add-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: #0d6b3e;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }

        .services-add-btn:hover {
          background: #0a5230;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(13, 107, 62, 0.25);
        }

        .services-add-icon {
          font-size: 1.1rem;
          line-height: 1;
        }

        .services-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          flex-wrap: wrap;
          gap: 1rem;
          background: #ffffff;
        }

        .services-search-wrapper {
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

        .services-search-input {
          width: 100%;
          padding: 0.625rem 0.875rem 0.625rem 2.25rem;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
          background: #ffffff;
          color: #0a1a12;
        }

        .services-search-input::placeholder {
          color: #9ca3af;
        }

        .services-search-input:focus {
          border-color: #0d6b3e;
          box-shadow: 0 0 0 4px rgba(13, 107, 62, 0.1);
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
          color: #0a1a12;
        }

        .services-entries-info {
          font-size: 0.875rem;
          color: #6b7280;
          white-space: nowrap;
        }

        .services-table-wrapper {
          overflow-x: auto;
        }

        .services-data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .table-header {
          padding: 0.875rem 1rem;
          text-align: left;
          font-weight: 700;
          color: #0a1a12;
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
          color: #0d6b3e;
        }

        .table-row {
          transition: background 0.15s ease;
        }

        .table-row:hover {
          background: #f8fafc;
        }

        .table-row.inactive-row {
          opacity: 0.6;
        }

        .table-cell {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #0a1a12;
        }

        .title-cell {
          font-weight: 600;
          color: #0a1a12;
        }

        .desc-cell {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #4b5563;
        }

        .service-thumbnail {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background: #f1f5f9;
        }

        .no-image {
          font-size: 0.65rem;
          color: #94a3b8;
          background: #f1f5f9;
          padding: 4px 6px;
          border-radius: 4px;
        }

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

        .status-col {
          text-align: center;
        }

        .actions-cell {
          display: flex;
          gap: 4px;
          justify-content: center;
          align-items: center;
        }

        .action-btn {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          font-size: 0.875rem;
        }

        .action-btn.status-btn {
          color: #6b7280;
          background: #f3f4f6;
        }

        .action-btn.status-btn.active:hover {
          background: #d1fae5;
          color: #065f46;
        }

        .action-btn.status-btn.inactive:hover {
          background: #fee2e2;
          color: #991b1b;
        }

        .action-btn.edit-btn {
          color: #1d4ed8;
          background: #dbeafe;
        }

        .action-btn.edit-btn:hover {
          background: #bfdbfe;
          transform: scale(1.05);
        }

        .action-btn.delete-btn {
          color: #dc2626;
          background: #fee2e2;
        }

        .action-btn.delete-btn:hover:not(:disabled) {
          background: #fecaca;
          transform: scale(1.05);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid #e5e7eb;
          border-top-color: #dc2626;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .table-loading,
        .table-empty {
          padding: 3rem !important;
          text-align: center !important;
          color: #6b7280 !important;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #e5e7eb;
          border-top-color: #0d6b3e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 0.75rem;
          vertical-align: middle;
        }

        .table-empty {
          color: #94a3b8 !important;
          font-size: 0.875rem !important;
        }

        .services-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid #f1f5f9;
          flex-wrap: wrap;
          gap: 1rem;
          background: #fafafa;
        }

        .pagination-info {
          font-size: 0.875rem;
          color: #6b7280;
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
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0a1a12;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 40px;
          text-align: center;
        }

        .page-btn:hover:not(:disabled):not(.active) {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .page-btn.active {
          background: #0d6b3e;
          color: white;
          border-color: #0d6b3e;
          box-shadow: 0 2px 8px rgba(13, 107, 62, 0.25);
        }

        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f1f5f9;
        }

        .page-ellipsis {
          padding: 0 0.25rem;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .services-table-header {
            flex-direction: column;
            align-items: stretch;
          }

          .services-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .services-search-wrapper {
            max-width: 100%;
          }

          .services-entries-info {
            text-align: center;
          }

          .services-pagination {
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
      `}</style>
        </div>
    );
}

export default ServiceTable;