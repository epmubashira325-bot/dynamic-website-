import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import banner from "../assets/images/contact-banner.jpg";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function ContactPage() {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Contact Us
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
            If you have a project you'd like to discuss, we'd love to hear
            from you. Reach out to us and let's build something exceptional
            together.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-8">

          <div className="grid md:grid-cols-3 gap-6">

            <div className="border border-amber-500 p-6 flex gap-4">
              <FaMapMarkerAlt className="text-amber-600 text-2xl mt-1" />

              <div>
                <h3 className="font-bold text-lg">Address</h3>

                <a
                  href="https://maps.google.com/?q=Lakshmi+Complex+Nurani+Gramam+Road+Palakkad+678004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-amber-600"
                >
                  Lakshmi Complex,
                  <br />
                  Nurani Gramam Road,
                  <br />
                  Palakkad - 678004
                </a>
              </div>
            </div>

            <div className="border border-amber-500 p-6 flex gap-4">
              <FaPhoneAlt className="text-amber-600 text-2xl mt-1" />

              <div>
                <h3 className="font-bold text-lg">Phone</h3>

                <a
                  href="tel:+919037917704"
                  className="text-gray-600 hover:text-amber-600"
                >
                  +91 9037917704
                </a>
              </div>
            </div>

            <div className="border border-amber-500 p-6 flex gap-4">
              <FaEnvelope className="text-amber-600 text-2xl mt-1" />

              <div>
                <h3 className="font-bold text-lg">Email</h3>

                <a
                  href="mailto:contact@theamassociates.com"
                  className="text-gray-600 hover:text-amber-600"
                >
                  contact@theamassociates.com
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-8">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Google Map */}
            <div>

              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Lakshmi+Complex+Nurani+Gramam+Road+Palakkad+678004&output=embed"
                className="w-full h-[500px] rounded-xl shadow-lg"
                loading="lazy"
              ></iframe>

            </div>

            {/* Contact Form */}
            <div>

              <h2 className="text-4xl font-bold mb-8 text-amber-600">
                Get In Touch
              </h2>

              <ContactForm />

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default ContactPage;