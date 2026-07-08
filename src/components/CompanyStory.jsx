import { motion } from "framer-motion";
import { FaBuilding, FaBullseye, FaHandshake } from "react-icons/fa";

function CompanyStory() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[6px] text-amber-500 font-semibold">
            About Our Company
          </p>

          <h2 className="text-5xl font-bold mt-5 text-gray-900">
            Engineering Excellence with
            <br />
            Innovative Solutions
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
            We provide professional structural engineering,
            construction, renovation, supervision, and interior
            design solutions with a strong commitment to quality,
            innovation, and customer satisfaction.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <FaBuilding size={24} />
              </div>

              <h3 className="text-3xl font-bold">
                About Us
              </h3>
            </div>

            <p className="text-gray-600 leading-8">
              Amarnath Associates is a structural engineering company
              based in Palakkad, dedicated to providing expert design
              and consultation services for residential, commercial,
              and high-rise structures.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              We use modern engineering practices and advanced
              technologies to deliver safe, innovative, and
              cost-effective solutions tailored to every client's
              unique project requirements.
            </p>
          </motion.div>

          {/* Our Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <FaBullseye size={24} />
              </div>

              <h3 className="text-3xl font-bold">
                Our Expertise
              </h3>
            </div>

            <p className="text-gray-600 leading-8">
              From structural analysis and construction supervision
              to renovation and interior designing, our experienced
              team ensures every project is completed with precision,
              durability, and engineering excellence.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              We believe in building long-term relationships by
              delivering dependable solutions that combine quality,
              innovation, and sustainability.
            </p>
          </motion.div>

        </div>

        {/* Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="bg-amber-600 text-white rounded-3xl mt-16 p-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <FaHandshake size={34} />
            <h3 className="text-4xl font-bold">
              Our Commitment
            </h3>
          </div>

          <p className="text-lg leading-9">
            We work closely with every client to understand their
            project goals and provide practical, sustainable, and
            technically sound engineering solutions. Our commitment
            to quality, transparency, and customer satisfaction
            drives every project from concept to completion.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default CompanyStory;