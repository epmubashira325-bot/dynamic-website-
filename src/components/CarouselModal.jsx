// src/components/CarouselModal.jsx
import { useState } from "react";
import { FaTimes, FaUpload, FaVideo, FaImage, FaCheck, FaSpinner } from "react-icons/fa";

function CarouselModal({
  mode,
  formData,
  onChange,
  onFile,
  currentMediaUrl,
  onSubmit,
  onClose,
  saving,
}) {
  const [previewUrl, setPreviewUrl] = useState(currentMediaUrl || null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    onFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFileName(file.name);
  };

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
    if (file) {
      const mediaType = formData.media_type || 'video';
      if (mediaType === 'video' && file.type.startsWith("video/")) {
        handleFile(file);
      } else if (mediaType === 'image' && file.type.startsWith("image/")) {
        handleFile(file);
      }
    }
  };

  const handleMediaTypeChange = (e) => {
    onChange(e);
    // Clear the file when switching media type
    onFile(null);
    setFileName("");
    setPreviewUrl(null);
  };

  // Get the current media preview
  const getMediaPreview = () => {
    if (!previewUrl && !currentMediaUrl) return null;

    const url = previewUrl || currentMediaUrl;
    const mediaType = formData.media_type || 'video';

    if (mediaType === 'video' || url?.match(/\.(mp4|webm|ogg|mov)$/i)) {
      return (
        <video
          src={url}
          controls
          className="modal-preview-media"
        />
      );
    }
    return (
      <img
        src={url}
        alt="Preview"
        className="modal-preview-media"
      />
    );
  };

  const getMediaIcon = () => {
    const mediaType = formData.media_type || 'video';
    return mediaType === 'video' ? <FaVideo /> : <FaImage />;
  };

  const getAcceptedTypes = () => {
    const mediaType = formData.media_type || 'video';
    return mediaType === 'video' ? 'video/*' : 'image/*';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <span className="modal-header-icon">
              {mode === "add" ? "🎬" : "✏️"}
            </span>
            <h2 className="modal-title">
              {mode === "add" ? "Add New Carousel" : "Edit Carousel"}
            </h2>
          </div>
          <button onClick={onClose} disabled={saving} className="modal-close-btn">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Title Input */}
          <div className="modal-form-group">
            <label className="modal-label">
              Title <span className="modal-required">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={onChange}
              placeholder="Enter banner title"
              className="modal-input"
            />
          </div>

          {/* Media Type Selection */}
          <div className="modal-form-group">
            <label className="modal-label">
              Media Type <span className="modal-required">*</span>
            </label>
            <select
              name="media_type"
              value={formData.media_type || 'video'}
              onChange={handleMediaTypeChange}
              className="modal-input"
            >
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>
          </div>

          {/* Media Upload */}
          <div className="modal-form-group">
            <label className="modal-label">
              {formData.media_type === 'video' ? 'Video' : 'Image'} {mode === "add" && <span className="modal-required">*</span>}
            </label>

            {/* Drag & Drop Area */}
            <div
              className={`modal-drop-zone ${isDragging ? "dragging" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="media-upload"
                accept={getAcceptedTypes()}
                onChange={handleFileChange}
                className="modal-file-input"
              />
              <label htmlFor="media-upload" className="modal-drop-label">
                <div className="modal-drop-icon">
                  {getMediaIcon()}
                </div>
                <div className="modal-drop-text">
                  {fileName ? (
                    <span className="modal-file-name">{fileName}</span>
                  ) : (
                    <>
                      <span className="modal-drop-title">
                        Click to upload a {formData.media_type || 'video'}
                      </span>
                      <span className="modal-drop-subtitle">
                        {formData.media_type === 'video' ? 'MP4, WebM, OGG up to 100MB' : 'JPG, PNG, WebP up to 20MB'}
                      </span>
                    </>
                  )}
                </div>
                <div className="modal-drop-upload-btn">
                  <FaUpload /> {fileName ? "Change" : "Browse"}
                </div>
              </label>
            </div>
          </div>

          {/* Media Preview */}
          {(previewUrl || currentMediaUrl) && (
            <div className="modal-preview-container">
              <div className="modal-preview-header">
                <span className="modal-preview-title">
                  {formData.media_type === 'video' ? '📹 Video Preview' : '🖼️ Image Preview'}
                </span>
                {mode === 'edit' && currentMediaUrl && !previewUrl && (
                  <span className="modal-preview-badge">Current</span>
                )}
                {previewUrl && (
                  <span className="modal-preview-badge">New</span>
                )}
              </div>
              <div className="modal-preview-wrapper">
                {getMediaPreview()}
              </div>
            </div>
          )}

          {/* Status Toggle */}
          <div className="modal-status-section">
            <div className="modal-status-label">
              <span className="modal-status-text">Status</span>
              <span className={`modal-status-badge ${formData.is_active ? "active" : "inactive"}`}>
                {formData.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <label className="modal-toggle">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active || false}
                onChange={(e) =>
                  onChange({ target: { name: "is_active", value: e.target.checked } })
                }
                className="modal-toggle-input"
              />
              <span className="modal-toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} disabled={saving} className="modal-btn modal-btn-cancel">
            Cancel
          </button>
          <button onClick={onSubmit} disabled={saving} className="modal-btn modal-btn-submit">
            {saving ? (
              <>
                <FaSpinner className="modal-spinner" />
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
        /* Modal Overlay */
        .modal-overlay {
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

        .modal-container {
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          background: #ffffff;
          border-radius: 20px;
          overflow-y: auto;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        .modal-container::-webkit-scrollbar {
          width: 4px;
        }

        .modal-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .modal-container::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        /* Header - Green Theme */
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, #0d6b3e 0%, #0a5230 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .modal-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-header-icon {
          font-size: 1.5rem;
        }

        .modal-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .modal-close-btn {
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

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          transform: rotate(90deg);
        }

        .modal-close-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Body */
        .modal-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .modal-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .modal-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0a1a12;
        }

        .modal-required {
          color: #dc2626;
        }

        .modal-input {
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

        .modal-input:focus {
          border-color: #0d6b3e;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(13, 107, 62, 0.1);
        }

        .modal-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        /* Drop Zone - Green Theme */
        .modal-drop-zone {
          position: relative;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          background: #fafafa;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .modal-drop-zone:hover {
          border-color: #0d6b3e;
          background: #f0faf4;
        }

        .modal-drop-zone.dragging {
          border-color: #0d6b3e;
          background: #e8f5e9;
          transform: scale(1.01);
        }

        .modal-file-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .modal-drop-label {
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

        .modal-drop-icon {
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

        .modal-drop-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;
        }

        .modal-drop-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0a1a12;
        }

        .modal-drop-subtitle {
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b7280;
        }

        .modal-file-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0d6b3e;
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .modal-drop-upload-btn {
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

        .modal-drop-zone:hover .modal-drop-upload-btn {
          background: #0a5230;
        }

        /* Media Preview */
        .modal-preview-container {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          background: #0a0a0a;
        }

        .modal-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .modal-preview-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #9ca3af;
        }

        .modal-preview-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.125rem 0.5rem;
          border-radius: 12px;
          background: #0d6b3e;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .modal-preview-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
        }

        .modal-preview-media {
          width: 100%;
          max-height: 200px;
          object-fit: contain;
          border-radius: 8px;
        }

        /* Status Section */
        .modal-status-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .modal-status-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-status-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0a1a12;
        }

        .modal-status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.125rem 0.625rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modal-status-badge.active {
          background: #dcfce7;
          color: #16a34a;
        }

        .modal-status-badge.inactive {
          background: #f1f5f9;
          color: #64748b;
        }

        /* Toggle Switch - Green Theme */
        .modal-toggle {
          position: relative;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .modal-toggle-input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .modal-toggle-slider {
          position: absolute;
          inset: 0;
          background: #d1d5db;
          border-radius: 26px;
          transition: all 0.3s ease;
        }

        .modal-toggle-slider::before {
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

        .modal-toggle-input:checked + .modal-toggle-slider {
          background: #0d6b3e;
        }

        .modal-toggle-input:checked + .modal-toggle-slider::before {
          transform: translateX(22px);
        }

        /* Footer - Green Theme */
        .modal-footer {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid #f1f5f9;
          background: #fafafa;
          position: sticky;
          bottom: 0;
        }

        .modal-btn {
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

        .modal-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .modal-btn-cancel {
          background: #f1f5f9;
          color: #475569;
        }

        .modal-btn-cancel:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .modal-btn-submit {
          background: linear-gradient(135deg, #0d6b3e, #0a5230);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(13, 107, 62, 0.25);
        }

        .modal-btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 107, 62, 0.35);
        }

        .modal-spinner {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .modal-container {
            max-width: 100%;
            margin: 0.5rem;
            border-radius: 16px;
            max-height: 95vh;
          }

          .modal-header {
            padding: 1rem 1.25rem;
          }

          .modal-title {
            font-size: 1rem;
          }

          .modal-body {
            padding: 1.25rem;
            gap: 1rem;
          }

          .modal-drop-label {
            padding: 1.25rem 1rem;
            min-height: 120px;
          }

          .modal-footer {
            flex-direction: column;
            padding: 1rem 1.25rem 1.25rem;
          }

          .modal-btn {
            padding: 0.75rem;
          }

          .modal-status-section {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .modal-status-label {
            justify-content: space-between;
          }

          .modal-preview-media {
            max-height: 150px;
          }
        }
      `}</style>
    </div>
  );
}

export default CarouselModal;