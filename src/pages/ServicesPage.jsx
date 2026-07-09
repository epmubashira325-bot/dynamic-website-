import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import banner from "../assets/images/services-banner.jpg";

import structural from "../assets/images/services/structural.jpg";
import construction from "../assets/images/services/construction.jpg";
import renovation from "../assets/images/services/renovation.jpg";
import supervision from "../assets/images/services/supervision.jpg";
import consulting from "../assets/images/services/consulting.jpg";
import interior from "../assets/images/services/interior.jpg";
import { Link } from "react-router-dom";
const services = [
  {
    title: "Structural Design",
    image: structural,
    description:
      "Innovative structural engineering solutions focused on safety, durability, and long-term performance.",
      link: "/services/structural-design",
  },
  {
    title: "Construction",
    image: construction,
    description:
      "Complete construction services delivered with quality workmanship, efficient planning, and timely execution.",
      link: "/services/construction",
  },
  {
    title: "Renovation Work",
    image: renovation,
    description:
      "Transform existing residential and commercial spaces with modern renovation and remodeling solutions.",
      link: "/services/renovation",
  },
  {
    title: "Supervision",
    image: supervision,
    description:
      "Professional site supervision ensuring every stage of construction meets quality and safety standards.",
      link: "/services/supervision",
  },
  {
    title: "Site Consulting",
    image: consulting,
    description:
      "Expert consultation for planning, feasibility, budgeting, and technical guidance throughout your project.",
      link: "/services/site-consulting",
  },
  {
    title: "Interior Designing",
    image: interior,
    description:
      "Elegant interior design solutions that combine creativity, functionality, and premium finishes.",
      link: "/services/interior-design",
  },
];

function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Banner */}

      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">

          <p className="uppercase tracking-[6px] text-amber-400 font-semibold">
            Our Expertise
          </p>

          <h1 className="text-6xl font-bold text-white mt-4">
            Our Services
          </h1>

          <p className="text-gray-200 text-lg mt-8 leading-8 max-w-3xl">
            We provide reliable structural engineering, construction,
            renovation, supervision, site consulting and interior designing
            services for residential, commercial and industrial projects.
          </p>

        </div>
      </section>

      {/* Introduction */}

      <section className="py-20 bg-white">

        <div className="max-w-5xl mx-auto px-8 text-center">

          <h2 className="text-4xl font-bold mb-8">
            Designing Spaces That Inspire
          </h2>

          <p className="text-gray-600 leading-8">
            With our advanced engineering expertise, we provide innovative,
            practical and cost-effective solutions. Our commitment to quality,
            technical excellence and customer satisfaction enables us to deliver
            successful residential, commercial and industrial projects from
            concept to completion.
          </p>

        </div>

      </section>

      {/* Six Services */}

      <section className="pb-24 bg-gray-100">

        <div className="max-w-7xl mx-auto px-8">
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

  {services.map((service, index) => (

  <motion.div
    key={index}
    whileHover={{ y: -12 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-2xl overflow-hidden shadow-lg"
  >
    <div className="overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="h-72 w-full object-cover hover:scale-110 duration-500"
      />
    </div>

    <div className="p-8">
      <h3 className="text-2xl font-bold">{service.title}</h3>

      <p className="text-gray-600 mt-4 leading-7">
        {service.description}
      </p>

      <Link
        to={service.link}
        className="inline-block mt-6 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition"
      >
        View More
      </Link>
    </div>
  </motion.div>
))}


</div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ServicesPage;