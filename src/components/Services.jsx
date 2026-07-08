import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import structural from "../assets/images/services/structural.jpg";
import construction from "../assets/images/services/construction.jpg";
import interior from "../assets/images/services/interior.jpg";

const services = [
  {
    title: "Structural Design",
    image: structural,
    description:
      "Innovative structural engineering solutions focused on safety, durability and long-term performance.",
  },
  {
    title: "Construction",
    image: construction,
    description:
      "Complete construction services delivered with quality workmanship and timely execution.",
  },
  {
    title: "Interior Designing",
    image: interior,
    description:
      "Creative interior designs that combine elegance, comfort and functionality.",
  },
];

function Services() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-amber-500 font-semibold">
            Our Services
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Engineering Excellence
          </h2>

          <p className="text-gray-600 mt-6 max-w-4xl mx-auto leading-8">
            We provide complete engineering solutions including structural
            design, construction, and interior designing with quality,
            innovation and technical excellence.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {services.map((service, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: .3 }}
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

                <h3 className="text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {service.description}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

        <div className="text-center mt-14">

          <Link
            to="/services"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full transition"
          >
            View All Services
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Services;