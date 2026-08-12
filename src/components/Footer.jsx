import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaArrowUp } from "react-icons/fa";
import footer from "../data/footerData";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="luxury-container">
        {/* Top: Logo */}
        <div className="footer__top">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-main">AM</span>
            <span className="footer__logo-accent">Associates</span>
          </Link>
        </div>
        {/* Links Row */}
        <div className="footer__links-row">
          <div className="footer__links-group">
            <h4 className="footer__links-title">Quick Links</h4>
            <div className="footer__links">
              {(footer.quickLinks || []).map((l, i) => (
                <Link key={i} to={l.path}>{l.title}</Link>
              ))}
            </div>
          </div>
          <div className="footer__links-group">
            <h4 className="footer__links-title">Contact Us</h4>
            <div className="footer__links footer__contact-info">
              <p>Email:contact@theamassociates.com</p>
              <p>Phone: +91 9567406887</p>
              <p className="footer__address">
                Sairam complex,<br />
                Malampuzha 100ft road, Puthur,
                Palakkad 
              </p>
            </div>
          </div>
          {/*
          <div className="footer__links-group">
            <h4 className="footer__links-title">Follow Us</h4>
            <div className="footer__socials">
              <a href={footer.social?.facebook || "#"} target="_blank" rel="noreferrer"><FaFacebookF /></a>
              <a href={footer.social?.instagram || "#"} target="_blank" rel="noreferrer"><FaInstagram /></a>
            </div>
          </div>
          */}
        </div>
        {/* Bottom */}
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} AM Associates. All Rights Reserved.</p>
          <button className="footer__scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
export default Footer;