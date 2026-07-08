import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative transition duration-300 ${
      scroll ? "text-gray-800" : "text-white"
    } hover:text-amber-500 ${
      isActive ? "text-amber-500" : ""
    }`;

  return (
    <nav
      className={`fixed left-0 top-0 w-full z-50 transition-all duration-500 ${
        scroll
          ? "bg-white/95 backdrop-blur-md shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-24 px-8 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className={`text-3xl font-bold tracking-wide transition ${
            scroll ? "text-black" : "text-white"
          }`}
        >
          AM Associates
        </Link>

        {/* Menu */}
        <ul className="hidden lg:flex items-center gap-10 font-medium text-[16px]">

          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </li>

        </ul>

        {/* Button */}
        <button className="hidden lg:block bg-amber-600 hover:bg-amber-700 transition duration-300 text-white px-8 py-3 rounded-full font-semibold shadow-lg">
          Get Quote
        </button>

      </div>
    </nav>
  );
}

export default Navbar;