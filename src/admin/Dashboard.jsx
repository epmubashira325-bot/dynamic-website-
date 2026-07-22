// src/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

const QUICK_LINKS = [
  {
    to: "/dashboard/carousel",
    label: "Carousel",
    desc: "Manage homepage banner slides",
    accent: "#1f7a4d",
  },
  {
    to: "/dashboard/services",
    label: "Services",
    desc: "Add or update service offerings",
    accent: "#c78a2e",
  },
  {
    to: "/dashboard/projects",
    label: "Projects",
    desc: "Showcase completed & running work",
    accent: "#2e6bc7",
  },
  {
    to: "/dashboard/company-statistics",
    label: "Company Statistics",
    desc: "Manage years experience, projects & clients",
    accent: "#8e44ad",
  },
];

function Dashboard() {
  const [stats, setStats] = useState({
    carousel: null,
    services: null,
    projects: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const [carouselRes, servicesRes, projectsRes] =
          await Promise.allSettled([
            api.get("/carousel/"),
            api.get("/service/"),
            api.get("/project/"),
          ]);

        if (!isMounted) return;

        const getDataLength = (result) => {
          if (result.status !== "fulfilled") return 0;
          const data = result.value.data;
          if (Array.isArray(data)) return data.length;
          if (data && data.data && Array.isArray(data.data)) return data.data.length;
          if (data && data.results && Array.isArray(data.results)) return data.results.length;
          return 0;
        };

        setStats({
          carousel: getDataLength(carouselRes),
          services: getDataLength(servicesRes),
          projects: getDataLength(projectsRes),
        });
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const adminName = "Admin";

  return (
    <div className="dash">
      <header className="dash-topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your site content in one place.</p>
        </div>
        <div className="dash-profile">
          <div className="dash-avatar">{adminName.charAt(0)}</div>
          <span>{adminName}</span>
        </div>
      </header>

      <section className="dash-stats">
        <StatCard label="Carousel Slides" value={stats.carousel} loading={loading} color="#1f7a4d" />
        <StatCard label="Services" value={stats.services} loading={loading} color="#c78a2e" />
        <StatCard label="Projects" value={stats.projects} loading={loading} color="#2e6bc7" />
      </section>

      <section className="dash-links">
        <h2>Manage content</h2>
        <div className="dash-links-grid">
          {QUICK_LINKS.map((item) => (
            <Link to={item.to} key={item.to} className="dash-link-card" style={{ "--accent": item.accent }}>
              <span className="dash-link-dot" />
              <div>
                <h3>{item.label}</h3>
                <p>{item.desc}</p>
              </div>
              <span className="dash-link-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, loading, color }) {
  return (
    <div className="stat-card" style={{ "--accent": color }}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{loading ? "—" : value ?? 0}</span>
    </div>
  );
}

export default Dashboard;