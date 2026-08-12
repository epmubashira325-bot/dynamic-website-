import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "./FloatingContact.css";

// ── CONFIGURATION ─────────────────────────────────────────────
// Replace with your actual WhatsApp business number.
// Format: country code + number, NO plus sign, NO spaces.
// Example India +91 98765 43210 → "919876543210"
const WHATSAPP_NUMBER = "919567406887";
const WHATSAPP_MESSAGE = "Hello! I'm interested in your services.";
// ─────────────────────────────────────────────────────────────

export default function FloatingContact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fab-stack" aria-label="Floating contact buttons">

      {/* ── WhatsApp Button (top) ── */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab fab--whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* ── Call / Contact Button (bottom) ── */}
      <Link
        to="/contact"
        className="fab fab--call"
        aria-label="Contact Us"
        title="Contact Us"
      >
        <FaPhone />
      </Link>

    </div>
  );
}
