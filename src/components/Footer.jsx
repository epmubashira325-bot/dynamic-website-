import { Link } from "react-router-dom";
import footer from "../data/footerData";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-300">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14">

          {/* Company */}

          <div>

            <img
              src={footer.logo}
              alt="AM Associates"
              className="w-44 mb-6"
            />

            <p className="leading-8 text-gray-400">
              {footer.description}
            </p>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white text-2xl font-semibold mb-8">
              Contact
            </h3>

            <div className="space-y-5">

              <a
                href={`tel:${footer.phone}`}
className="flex items-start gap-4 hover:text-[#8B5E3C] transition"              >
  <FaPhoneAlt className="mt-1 text-[#8B5E3C]" />
                <span>{footer.phone}</span>
              </a>

              <a
                href={`mailto:${footer.email}`}
                className="flex items-start gap-4 hover:text-amber-500 transition"
              >
                <FaEnvelope className="mt-1 text-amber-500" />
                <span>{footer.email}</span>
              </a>

              <a
                href={footer.address.map}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 hover:text-amber-500 transition"
              >
                <FaMapMarkerAlt className="mt-1 text-amber-500" />

                <span>{footer.address.text}</span>

              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white text-2xl font-semibold mb-8">
              Quick Links
            </h3>

            <div className="space-y-4">

              {footer.quickLinks.map((item) => (

                <Link
                  key={item.title}
                  to={item.path}
                  className="block hover:text-amber-500 transition"
                >
                  {item.title}
                </Link>

              ))}

            </div>

          </div>

          {/* Legal + Social */}

          <div>

            <h3 className="text-white text-2xl font-semibold mb-8">
              Legal
            </h3>

            <div className="space-y-4 mb-8">

              {footer.legalLinks.map((item) => (

                <Link
                  key={item.title}
                  to={item.path}
                  className="block hover:text-amber-500 transition"
                >
                  {item.title}
                </Link>

              ))}

            </div>

            <h4 className="text-white font-semibold mb-5">
              Follow Us
            </h4>

            <div className="flex gap-4">

              <a
                href={footer.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#1d1d1d] hover:bg-amber-500 transition flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href={footer.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#1d1d1d] hover:bg-amber-500 transition flex items-center justify-center"
              >
                <FaInstagram />
              </a>

              <a
                href={footer.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#1d1d1d] hover:bg-amber-500 transition flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>

          

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">

            © {new Date().getFullYear()} AM Associates. All Rights Reserved.

          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-600 transition flex items-center justify-center text-white"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;