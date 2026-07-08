function CarouselModal({
  showForm,
  setShowForm,
  formData,
  handleChange,
  handleSave,
}) {
  if (!showForm) return null;

  return (
    <div className="modal">
      <div className="modal-content">

        <h2>Add Carousel</h2>

        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subtitle"
          placeholder="Enter Subtitle"
          value={formData.subtitle}
          onChange={handleChange}
        />

        <input
          type="file"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="modal-buttons">

          <button onClick={handleSave}>
            Save
          </button>

          <button onClick={() => setShowForm(false)}>
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default CarouselModal;