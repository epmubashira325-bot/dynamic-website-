import about from "../assets/images/about.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function About() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Image */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="relative"
        >

          <img
            src={about}
            alt="About"
            className="rounded-2xl shadow-2xl"
          />

          {/* Experience Card */}

          <div className="absolute -bottom-8 -right-8 bg-amber-600 text-white p-8 rounded-xl shadow-xl">

            <h2 className="text-5xl font-bold">
              5+
            </h2>

            <p className="mt-2">
              Years Experience
            </p>

          </div>

        </motion.div>

        {/* Right Content */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >

          <p className="uppercase tracking-[5px] text-amber-500 font-semibold">
            About Us
          </p>

          <h2 className="text-5xl font-bold mt-5 leading-tight text-gray-900">

            Creating Luxury
            <br />
            Interior Designs

          </h2>

          <p className="mt-8 text-gray-600 leading-8">

            At AM Associates, we specialize in creating
            elegant residential and commercial interiors
            with innovative architecture, premium
            craftsmanship, and timeless aesthetics.

          </p>

          <div className="space-y-5 mt-10">

            <div className="flex items-center gap-4">

              <FaCheckCircle className="text-amber-600 text-xl"/>

              Premium Quality Materials

            </div>

            <div className="flex items-center gap-4">

              <FaCheckCircle className="text-amber-600 text-xl"/>

              Expert Interior Designers

            </div>

            <div className="flex items-center gap-4">

              <FaCheckCircle className="text-amber-600 text-xl"/>

              Modern Architecture Solutions

            </div>

          </div>
            <Link to="/about">
  <button className="mt-10 bg-amber-600 hover:bg-amber-700 transition px-8 py-4 rounded-full text-white font-semibold">
    Learn More
  </button>
</Link>
         

          

        </motion.div>

      </div>

    </section>
  );
  <section id="about" className="py-24 bg-white"></section>
}

export default About;