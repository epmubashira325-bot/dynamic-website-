import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Carousel from "./pages/Carousel";
import ServiceList from "./pages/ServiceList";
import ProjectList from "./pages/ProjectList";
import ContactMessages from "./pages/ContactMessages";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
function App() {
  return (
    <Routes>
      {/* Public Website */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms" element={<TermsPage />} />
<Route path="/privacy" element={<PrivacyPage />} />


      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/carousel"
        element={
          <ProtectedRoute>
            <Carousel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/services"
        element={
          <ProtectedRoute>
            <ServiceList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/projects"
        element={
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/contact"
        element={
          <ProtectedRoute>
            <ContactMessages />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;