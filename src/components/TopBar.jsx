import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function TopBar() {
  return (
    <div className="hidden lg:block bg-[#151515] text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-10 px-8 text-sm">

        {/* Left Side */}
        <div className="flex items-center gap-8">

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-500" />
            <span>Kerala, India</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-yellow-500" />
            <span>+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-yellow-500" />
            <span>info@amassociates.com</span>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <FaFacebookF className="cursor-pointer hover:text-yellow-500 transition" />
          <FaInstagram className="cursor-pointer hover:text-yellow-500 transition" />
          <FaLinkedinIn className="cursor-pointer hover:text-yellow-500 transition" />

        </div>

      </div>
    </div>
  );
}

export default TopBar;