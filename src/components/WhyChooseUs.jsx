import {
  FaAward,
  FaUsers,
  FaClock,
  FaHandshake,
} from "react-icons/fa";

import { motion } from "framer-motion";

const features = [
  {
    icon: <FaAward size={35} />,
    title: "Quality Work",
    description:
      "We maintain the highest construction standards using premium materials and expert craftsmanship.",
  },
  {
    icon: <FaUsers size={35} />,
    title: "Experienced Team",
    description:
      "Our architects, engineers and designers work together to deliver outstanding results.",
  },
  {
    icon: <FaClock size={35} />,
    title: "On-Time Delivery",
    description:
      "Projects are completed efficiently without compromising quality or attention to detail.",
  },
  {
    icon: <FaHandshake size={35} />,
    title: "Client Satisfaction",
    description:
      "Every project is tailored to the client's vision with complete transparency and professionalism.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-amber-500 font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            Building Excellence
            <br />
            With Every Project
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
            We combine engineering expertise, innovative
            design and quality construction to deliver
            exceptional residential and commercial projects.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              transition={{
                duration: .3,
              }}
              className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-xl transition"
            >

              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-6">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold">

                {item.title}

              </h3>

              <p className="mt-5 text-gray-600 leading-7">

                {item.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;