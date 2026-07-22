// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingContact from "./components/FloatingContact";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Carousel from "./pages/Carousel";
import ServiceList from "./pages/ServiceList";
import ProjectList from "./pages/ProjectList";
import ContactMessages from "./pages/ContactMessages";
import GalleryPage from "./pages/GalleryPage";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import StructuralEngineering from "./pages/StructuralEngineering";
import ConstructionSupport from "./pages/ConstructionSupport";
import RenovationSupport from "./pages/RenovationSupport";
import ArchitectureSupport from "./pages/ArchitectureSupport";
import InteriorDesignSupport from "./pages/InteriorDesignSupport";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import ContactPage from "./pages/ContactPage";
import PublicGalleryPage from "./pages/PublicGalleryPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";// In your routing configuration
import CompanyStatistics from "./admin/CompanyStatistics";

// Add this route

function App() {
  const location = useLocation();

  // Hide floating buttons on admin and login pages
  const isAdminPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.toLowerCase() === "/login";

  return (
    <>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Services - This is where View More buttons navigate to */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/structural-engineering" element={<StructuralEngineering />} />
        <Route path="/services/construction-support" element={<ConstructionSupport />} />
        <Route path="/services/renovation-support" element={<RenovationSupport />} />
        <Route path="/services/architecture-support" element={<ArchitectureSupport />} />
        <Route path="/services/interior-design-support" element={<InteriorDesignSupport />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/projects/details" element={<ProjectDetails />} />
        <Route path="/gallery" element={<PublicGalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="carousel" element={<Carousel />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="company-statistics" element={<CompanyStatistics />} />
          <Route path="contact" element={<ContactMessages />} />
        </Route>
      </Routes>

      {/* Show floating buttons only on public pages */}
      {!isAdminPage && <FloatingContact />}
    </>
  );
}

export default App;