import { FaBuilding, FaCalendarAlt, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <FaBuilding size={32} />,
    number: "30+",
    title: "Projects Completed",
    description:
      "Successfully delivered residential, commercial and industrial projects.",
  },
  {
    icon: <FaCalendarAlt size={32} />,
    number: "5+",
    title: "Years Experience",
    description:
      "Providing reliable engineering and construction expertise for years.",
  },
  {
    icon: <FaAward size={32} />,
    number: "100%",
    title: "Quality Assurance",
    description:
      "Committed to maintaining the highest standards in every project.",
  },
];

function Stats() {
  return (
    <section className="py-28 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          <p className="uppercase tracking-[6px] text-amber-400 font-semibold">
            Our Achievements
          </p>

          <h2 className="text-5xl font-bold text-white mt-5">
            Numbers That Reflect Our Excellence
          </h2>

          <p className="text-gray-400 text-lg leading-8 mt-6">
            We are committed to delivering innovative engineering solutions,
            exceptional quality, and customer satisfaction through every project
            we undertake.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center shadow-xl hover:shadow-amber-500/20"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500 flex items-center justify-center text-white mb-8">
                {item.icon}
              </div>

              <h3 className="text-5xl font-bold text-white">
                {item.number}
              </h3>

              <h4 className="text-xl font-semibold text-white mt-4">
                {item.title}
              </h4>

              <p className="text-gray-400 mt-4 leading-7">
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;