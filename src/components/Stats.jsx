import { FaBuilding, FaCalendarAlt, FaUsers, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [


    
  {
    icon: <FaBuilding size={32} />,
    number: "30+",
    title: "Projects Completed",
  },
  {
    icon: <FaCalendarAlt size={32} />,
    number: "5+",
    title: "Years Experience",
  },
 
  {
    icon: <FaAward size={32} />,
    number: "100%",
    title: "Quality Assurance",
  },
];

function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-amber-400 font-semibold">
            Our Achievements
          </p>

          <h2 className="text-5xl font-bold text-white mt-4">
            Numbers That Reflect Our Excellence
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
            >

              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500 flex items-center justify-center text-white mb-6">
                {item.icon}
              </div>

              <h3 className="text-5xl font-bold text-white">
                {item.number}
              </h3>

              <p className="text-gray-300 mt-4">
                {item.title}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;