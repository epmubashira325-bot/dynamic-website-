import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Redirect to login
    navigate("/");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <div className="dashboard-body">

          <div className="dashboard-top">
            <h1>Dashboard</h1>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div className="welcome-card">
            <h2>Welcome Admin 👋</h2>

            <p>
              Manage all website content from this dashboard.
            </p>
          </div>

          <div className="stats">

            <div className="stat-card">
              <h3>Carousel</h3>
              <h1>5</h1>
            </div>

            <div className="stat-card">
              <h3>Services</h3>
              <h1>12</h1>
            </div>

            <div className="stat-card">
              <h3>Projects</h3>
              <h1>18</h1>
            </div>

            <div className="stat-card">
              <h3>Messages</h3>
              <h1>9</h1>
            </div>

          </div>

          <div className="activity-card">
            <h2>Recent Activity</h2>

            <ul>
              <li>✔ New Project Added</li>
              <li>✔ Carousel Updated</li>
              <li>✔ Service Edited</li>
              <li>✔ Contact Message Received</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;