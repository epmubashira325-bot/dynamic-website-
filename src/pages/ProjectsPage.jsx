// src/pages/ProjectsPage.jsx
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProjects } from "../services/projectService";
import { SERVER_URL } from "../services/api";
import "./ProjectsPage.css";

// Fallback images (if API fails)
import project1 from "../assets/images/projects/project1.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";
import project4 from "../assets/images/projects/project4.jpg";
import project5 from "../assets/images/projects/project5.jpg";
import interior from "../assets/images/services/interior.jpg";
import construction from "../assets/images/services/construction.jpg";
import renovation from "../assets/images/services/renovation.jpg";
import structural from "../assets/images/services/structural.jpg";

const fallbackImages = [
  project1, project2, project3, project4, project5,
  interior, construction, renovation, structural
];

const getMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("https") || path.startsWith("blob:")) return path;
  return `${SERVER_URL}${path}`;
};

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getProjects(1, "", 100);
      console.log("✅ Projects fetched:", response);

      let projectsData = [];

      if (response && response.data) {
        if (response.data.results) {
          projectsData = response.data.results;
        } else if (Array.isArray(response.data)) {
          projectsData = response.data;
        } else {
          projectsData = [response.data];
        }
      } else if (Array.isArray(response)) {
        projectsData = response;
      } else if (response && response.results) {
        projectsData = response.results;
      }

      const transformedProjects = projectsData.map((project, index) => {
        const fallbackImage = fallbackImages[index % fallbackImages.length];
        const imageUrl = project.image_url || fallbackImage;

        return {
          id: project.id || `project-${index}`,
          title: project.title || "Untitled Project",
          image: imageUrl,
          description: project.description || "A beautifully designed project with attention to detail and quality craftsmanship.",
          _original: project
        };
      });

      setProjects(transformedProjects);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
      setProjects(getFallbackProjects());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackProjects = () => {
    return [
      {
        id: "luxury-villa",
        title: "Luxury Villa",
        image: project1,
        description: "A contemporary residence designed with premium materials, spacious interiors, and structural excellence."
      },
      {
        id: "commercial-office",
        title: "Commercial Office",
        image: construction,
        description: "A state-of-the-art commercial space engineered for productivity, natural light, and modern aesthetics."
      },
      {
        id: "heritage-restoration",
        title: "Heritage Restoration",
        image: project5,
        description: "Restoring classic architectural elements while integrating cutting-edge modern engineering."
      }
    ];
  };

  // Loading state
  if (loading) {
    return (
      <div className="portfolio-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p style={{ color: '#b0b0b0', fontSize: '18px' }}>Loading projects...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error && projects.length === 0) {
    return (
      <div className="portfolio-page">
        <Navbar />
        <div className="error-container">
          <h2 className="error-title">Unable to Load Projects</h2>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchProjects}>
            Retry
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <Navbar />

      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-wrapper"
            ref={el => sectionRefs.current[index] = el}
          >
            {/* Full Screen Image Section */}
            <section className="project-image-section">
              <motion.div
                className="project-image__bg"
                style={{ backgroundImage: `url(${getMediaUrl(project.image)})` }}
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              <div className="project-image__overlay"></div>
              <div className="project-image__title">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h1>
              </div>
            </section>

            {/* Description Section */}
            <section className="project-description-section">
              <div className="project-description__container">
                <motion.div
                  className="project-description__content"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="project-description__title">{project.title}</h2>
                  <div className="project-description__divider"></div>
                  <p className="project-description__text">{project.description}</p>
                </motion.div>
              </div>
            </section>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default ProjectsPage;