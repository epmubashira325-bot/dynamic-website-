import { useState } from "react";
import "../styles/Carousel.css";
import { addCarousel } from "../services/carouselService";

function Carousel() {
  const [carouselData, setCarouselData] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    is_active: true,
  });

  // Handle text & select fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "is_active" ? value === "true" : value,
    });
  };

  // Handle image
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Save carousel
  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!formData.image) {
      alert("Please select an image");
      return;
    }

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("image", formData.image);
      data.append("is_active", formData.is_active);

      const response = await addCarousel(data);

      alert(response.data.message || "Carousel Added Successfully");

      // Temporary update table
      setCarouselData((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: formData.title,
          image: URL.createObjectURL(formData.image),
          is_active: formData.is_active,
        },
      ]);

      // Reset form
      setFormData({
        title: "",
        image: null,
        is_active: true,
      });

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create carousel");
    }
  };

  return (
    <div className="carousel-page">

      <div className="carousel-header">
        <h2>Carousel Management</h2>

        <button onClick={() => setShowForm(true)}>
          + Add Carousel
        </button>
      </div>

      <table className="carousel-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {carouselData.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Carousel Found
              </td>
            </tr>
          ) : (
            carouselData.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    width="120"
                  />
                </td>

                <td>{item.title}</td>

                <td>
                  {item.is_active ? "Active" : "Inactive"}
                </td>

                <td>
                  <button>Edit</button>

                  <button>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
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
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <select
              name="is_active"
              value={formData.is_active}
              onChange={handleChange}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
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
      )}
    </div>
  );
}

export default Carousel;