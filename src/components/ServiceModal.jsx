// src/components/ServiceModal.jsx
import { useState } from "react";
import { FaTimes, FaUpload, FaImage, FaCheck, FaSpinner } from "react-icons/fa";

function ServiceModal({
    mode,
    formData,
    onChange,
    onFileChange,
    imagePreview,
    editingService,
    onSubmit,
    onClose,
    saving,
}) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const event = { target: { files: [file] } };
            onFileChange(event);
        }
    };

    const iconOptions = [
        { value: "FaDraftingCompass", label: "Compass" },
        { value: "FaCouch", label: "Couch" },
        { value: "FaCubes", label: "Cubes" },
        { value: "FaClipboardList", label: "Clipboard" },
        { value: "FaHardHat", label: "Hard Hat" },
        { value: "FaTools", label: "Tools" },
        { value: "FaTree", label: "Tree" },
        { value: "FaTasks", label: "Tasks" },
    ];

    return (
        <div className="service-modal-overlay" onClick={onClose}>
            <div className="service-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="service-modal-header">
                    <div className="service-modal-header-content">
                        <span className="service-modal-header-icon">
                            {mode === "add" ? "📋" : "✏️"}
                        </span>
                        <h2 className="service-modal-title">
                            {mode === "add" ? "Add New Service" : "Edit Service"}
                        </h2>
                    </div>
                    <button onClick={onClose} disabled={saving} className="service-modal-close-btn">
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div className="service-modal-body">
                    {/* Title Input */}
                    <div className="service-form-group">
                        <label className="service-label">
                            Title <span className="service-required">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            placeholder="Enter service title"
                            className="service-input"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="service-form-group">
                        <label className="service-label">
                            Description <span className="service-required">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            placeholder="Enter service description"
                            rows="4"
                            className="service-textarea"
                        />
                    </div>

                    {/* Icon Select */}
                    <div className="service-form-group">
                        <label className="service-label">Icon</label>
                        <select
                            name="icon"
                            value={formData.icon}
                            onChange={onChange}
                            className="service-select"
                        >
                            {iconOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="service-form-group">
                        <label className="service-label">Image</label>
                        <div
                            className={`service-drop-zone ${isDragging ? "dragging" : ""}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={onFileChange}
                                className="service-file-input"
                            />
                            <label htmlFor="image-upload" className="service-drop-label">
                                <div className="service-drop-icon">
                                    <FaImage />
                                </div>
                                <div className="service-drop-text">
                                    <span className="service-drop-title">Click or drag to upload image</span>
                                    <span className="service-drop-subtitle">JPG, PNG, GIF, up to 5MB</span>
                                </div>
                                <div className="service-drop-upload-btn">
                                    <FaUpload /> Browse
                                </div>
                            </label>
                        </div>
                        {imagePreview && (
                            <div className="service-image-preview">
                                <img src={imagePreview} alt="Preview" />
                                <button
                                    type="button"
                                    className="service-remove-image-btn"
                                    onClick={() => {
                                        const event = { target: { files: [] } };
                                        onFileChange(event);
                                    }}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )}
                        {editingService && editingService.image && !formData.image && !imagePreview && (
                            <p className="service-form-hint">Current image: {editingService.image.split('/').pop()}</p>
                        )}
                    </div>

                    {/* Status Toggle */}
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
                                onChange={(e) =>
                                    onChange({ target: { name: "is_active", value: e.target.checked } })
                                }
                                className="service-toggle-input"
                            />
                            <span className="service-toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="service-modal-footer">
                    <button onClick={onClose} disabled={saving} className="service-btn service-btn-cancel">
                        Cancel
                    </button>
                    <button onClick={onSubmit} disabled={saving} className="service-btn service-btn-submit">
                        {saving ? (
                            <>
                                <FaSpinner className="service-spinner" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <FaCheck /> {mode === "add" ? "Create" : "Update"}
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
        .service-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .service-modal-container {
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        .service-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, #0d6b3e 0%, #0a5230 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .service-modal-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .service-modal-header-icon {
          font-size: 1.5rem;
        }

        .service-modal-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .service-modal-close-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .service-modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          transform: rotate(90deg);
        }

        .service-modal-close-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .service-modal-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-height: calc(90vh - 180px);
          overflow-y: auto;
        }

        .service-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .service-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0a1a12;
        }

        .service-required {
          color: #dc2626;
        }

        .service-input,
        .service-textarea,
        .service-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #d1d5db;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0a1a12;
          transition: all 0.2s ease;
          background: #fafafa;
          outline: none;
          font-family: inherit;
        }

        .service-input:focus,
        .service-textarea:focus,
        .service-select:focus {
          border-color: #0d6b3e;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(13, 107, 62, 0.1);
        }

        .service-input::placeholder,
        .service-textarea::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .service-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .service-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234b5563' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          cursor: pointer;
        }

        .service-drop-zone {
          position: relative;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          background: #fafafa;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .service-drop-zone:hover {
          border-color: #0d6b3e;
          background: #f0faf4;
        }

        .service-drop-zone.dragging {
          border-color: #0d6b3e;
          background: #e8f5e9;
          transform: scale(1.01);
        }

        .service-file-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .service-drop-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.75rem 1.5rem;
          cursor: pointer;
          min-height: 140px;
          width: 100%;
        }

        .service-drop-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e8f5e9;
          border-radius: 12px;
          color: #0d6b3e;
          font-size: 1.5rem;
        }

        .service-drop-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .service-drop-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0a1a12;
        }

        .service-drop-subtitle {
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b7280;
        }

        .service-drop-upload-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 1rem;
          background: #0d6b3e;
          color: #ffffff;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .service-drop-zone:hover .service-drop-upload-btn {
          background: #0a5230;
        }

        .service-image-preview {
          position: relative;
          margin-top: 0.75rem;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e5e7eb;
        }

        .service-image-preview img {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
        }

        .service-remove-image-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .service-remove-image-btn:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.05);
        }

        .service-form-hint {
          font-size: 0.8rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .service-status-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .service-status-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .service-status-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0a1a12;
        }

        .service-status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.125rem 0.625rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .service-status-badge.active {
          background: #dcfce7;
          color: #16a34a;
        }

        .service-status-badge.inactive {
          background: #f1f5f9;
          color: #64748b;
        }

        .service-toggle {
          position: relative;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .service-toggle-input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .service-toggle-slider {
          position: absolute;
          inset: 0;
          background: #d1d5db;
          border-radius: 26px;
          transition: all 0.3s ease;
        }

        .service-toggle-slider::before {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          left: 3px;
          bottom: 3px;
          background: #ffffff;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .service-toggle-input:checked + .service-toggle-slider {
          background: #0d6b3e;
        }

        .service-toggle-input:checked + .service-toggle-slider::before {
          transform: translateX(22px);
        }

        .service-modal-footer {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid #f1f5f9;
          background: #fafafa;
        }

        .service-btn {
          flex: 1;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .service-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .service-btn-cancel {
          background: #f1f5f9;
          color: #475569;
        }

        .service-btn-cancel:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .service-btn-submit {
          background: linear-gradient(135deg, #0d6b3e, #0a5230);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(13, 107, 62, 0.25);
        }

        .service-btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 107, 62, 0.35);
        }

        .service-spinner {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .service-modal-container {
            max-width: 100%;
            margin: 0.5rem;
            border-radius: 16px;
          }

          .service-modal-header {
            padding: 1rem 1.25rem;
          }

          .service-modal-title {
            font-size: 1rem;
          }

          .service-modal-body {
            padding: 1.25rem;
            gap: 1rem;
          }

          .service-drop-label {
            padding: 1.25rem 1rem;
            min-height: 120px;
          }

          .service-modal-footer {
            flex-direction: column;
            padding: 1rem 1.25rem 1.25rem;
          }

          .service-btn {
            padding: 0.75rem;
          }

          .service-status-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .service-status-label {
            justify-content: space-between;
          }
        }
      `}</style>
        </div>
    );
}

export default ServiceModal;