import { useState } from "react";
import CarouselTable from "../components/CarouselTable";
import CarouselModal from "../components/CarouselModal";
import "../styles/Carousel.css";

function Carousel() {

  const [carouselData, setCarouselData] = useState([
    {
      id: 1,
      title: "Engineering Excellence",
      subtitle: "Quality Construction",
      image: "https://via.placeholder.com/120x70",
      status: "Active",
    },
    {
      id: 2,
      title: "Modern Design",
      subtitle: "Trusted Partner",
      image: "https://via.placeholder.com/120x70",
      status: "Inactive",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {

    const newCarousel = {
      id: Date.now(),
      title: formData.title,
      subtitle: formData.subtitle,
      image: "https://via.placeholder.com/120x70",
      status: formData.status,
    };

    setCarouselData([...carouselData, newCarousel]);

    setFormData({
      title: "",
      subtitle: "",
      image: "",
      status: "Active",
    });

    setShowForm(false);
  };

  return (
    <div className="carousel-page">

      <div className="carousel-header">

        <h2>Carousel Management</h2>

        <button onClick={() => setShowForm(true)}>
          + Add Carousel
        </button>

      </div>

      <CarouselTable carouselData={carouselData} />

      <CarouselModal
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        handleChange={handleChange}
        handleSave={handleSave}
      />

    </div>
  );
}

export default Carousel;
