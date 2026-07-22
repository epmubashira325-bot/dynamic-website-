import { motion } from "framer-motion";
import { FaAward, FaUserTie } from "react-icons/fa";
import ceo from "../assets/images/ceo.jpg";

function MeetProfessional() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-amber-500 font-semibold">
            Meet the Professional
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Leadership That Builds Trust
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Card */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl shadow-xl p-10 text-center"
          >

            <img
              src={ceo}
              alt="Amarnath M"
              className="w-52 h-64 object-cover rounded-xl mx-auto shadow-lg"
            />

            <h3 className="mt-8 text-3xl font-bold">
              Amarnath M
            </h3>

            <p className="text-amber-600 font-semibold mt-2">
              M.Tech Structural Engineering
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-center gap-3">
                <FaAward className="text-amber-500" />
                <span>Chartered Engineer</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <FaUserTie className="text-amber-500" />
                <span>Empanelled Engineer</span>
              </div>

            </div>

          </motion.div>

          {/* Right Card */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
          >

            <h3 className="text-4xl font-bold mb-8">
              About the Founder
            </h3>

            <p className="text-gray-600 leading-9 text-lg">
              Amarnath M holds a Master's degree in Structural
              Engineering and is a highly qualified Chartered
              Engineer with extensive expertise in structural
              analysis, design, and project execution.
            </p>

            <p className="text-gray-600 leading-9 text-lg mt-6">
              As an Empanelled Engineer, he has successfully
              delivered structural solutions for residential,
              commercial, and high-rise developments while
              maintaining the highest standards of quality,
              innovation, and engineering excellence.
            </p>

            <p className="text-gray-600 leading-9 text-lg mt-6">
              His commitment to safety, precision, and customer
              satisfaction has made AM Associates a trusted name
              in structural engineering and construction
              consultancy.
            </p>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default MeetProfessional;