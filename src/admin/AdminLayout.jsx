// src/admin/AdminLayout.jsx
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/dashboard/carousel", label: "Carousel", icon: "image" },
  { to: "/dashboard/services", label: "Services", icon: "layers" },
  { to: "/dashboard/projects", label: "Projects", icon: "folder" },
  { to: "/dashboard/gallery", label: "Gallery", icon: "gallery" },
  { to: "/dashboard/company-statistics", label: "Company Statistics", icon: "stats" }, // ← Added Company Statistics
];

function Icon({ name }) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </>
    ),
    layers: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
    folder: (
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    ),
    gallery: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 15l4-4 3 3 6-6 5 5" />
        <circle cx="8" cy="8.5" r="1.5" />
      </>
    ),
    stats: (
      <>
        <path d="M2 20h20" />
        <path d="M6 16v-6" />
        <path d="M12 16v-10" />
        <path d="M18 16v-4" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5" />
        <path d="M21 12H9" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function AdminLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className={`admin-shell ${collapsed ? "is-collapsed" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">AM</span>
          {!collapsed && <span className="admin-brand-name">Associates</span>}
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={({ isActive }) => `admin-nav-link ${isActive ? "is-active" : ""}`}
            >
              <Icon name={item.icon} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button className="admin-collapse-btn" onClick={() => setCollapsed((c) => !c)}>
          {collapsed ? "»" : "« Collapse"}
        </button>

        <button className="admin-logout-btn" onClick={handleLogout}>
          <Icon name="logout" />
          {!collapsed && <span>Logout</span>}
        </button>
      </aside>

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;