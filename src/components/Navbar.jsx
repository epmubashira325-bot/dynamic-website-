import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Projects", path: "/projects" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact Us", path: "/contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} id="main-navbar">
        <div className="luxury-container navbar__container">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
            <span className="navbar__logo-main">AM</span>
            <span className="navbar__logo-accent">Associates</span>
          </Link>

          {/* Mobile/Fullscreen Toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            id="mobile-menu-toggle"
          >
            <div className={`hamburger ${mobileOpen ? "hamburger--open" : ""}`}>
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fullscreen-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="fullscreen-menu__content">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                  className="fullscreen-menu__item-wrapper"
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `fullscreen-menu__link ${isActive ? "fullscreen-menu__link--active" : ""}`
                    }
                    onClick={() => {
                      setMobileOpen(false);
                      if (window.location.pathname === link.path) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    <span className="fullscreen-menu__link-text">{link.title}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;