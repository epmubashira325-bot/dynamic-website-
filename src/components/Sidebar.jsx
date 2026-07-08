import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>AM Admin</h2>

      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/carousel">Carousel</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/services">Services</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/projects">Projects</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/contact">Messages</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;