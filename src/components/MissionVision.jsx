import { motion } from "framer-motion";
import { FaBullseye, FaEye } from "react-icons/fa";

function MissionVision() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[6px] text-amber-500 font-semibold">
            Our Purpose
          </p>

          <h2 className="text-5xl font-bold mt-5 text-gray-900">
            Mission & Vision
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
            We are committed to delivering reliable engineering solutions
            while shaping a future built on innovation, sustainability,
            and excellence.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Mission */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition"
          >

            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-8">
              <FaBullseye size={34} />
            </div>

            <h3 className="text-3xl font-bold mb-6">
              Our Mission
            </h3>

            <p className="text-gray-600 leading-8">
              To provide innovative, safe, and cost-effective structural
              engineering, construction, and interior design solutions
              that exceed client expectations through quality,
              professionalism, and technical excellence.
            </p>

          </motion.div>

          {/* Vision */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="bg-amber-600 rounded-3xl p-10 text-white shadow-lg hover:shadow-2xl transition"
          >

            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-amber-600 mb-8">
              <FaEye size={34} />
            </div>

            <h3 className="text-3xl font-bold mb-6">
              Our Vision
            </h3>

            <p className="leading-8">
              To become one of Kerala's most trusted structural
              engineering and construction consultancies by delivering
              sustainable, innovative, and high-quality projects that
              positively impact communities and future generations.
            </p>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default MissionVision;