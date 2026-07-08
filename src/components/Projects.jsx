import { Link } from "react-router-dom";

import project1 from "../assets/images/projects/project1.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";

const projects = [
  {
    title: "Residential Villa",
    image: project1,
  },
  {
    title: "Commercial Building",
    image: project2,
  },
  {
    title: "Interior Design",
    image: project3,
  },
];

function Projects() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl text-amber-600 font-light">
          Our Projects
        </h2>

        <p className="mt-8 text-xl text-gray-700 max-w-5xl leading-9">
          We are a full-fledged structural engineering consultancy committed
          to delivering innovative and reliable engineering solutions.
          Explore a selection of our recently completed projects that
          showcase our expertise and dedication to quality.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">

          {projects.map((project, index) => (

            <div
              key={index}
              className="overflow-hidden shadow-lg"
            >

              <img
                src={project.image}
                alt={project.title}
                className="h-96 w-full object-cover hover:scale-110 duration-500"
              />

            </div>

          ))}

        </div>

        <div className="text-center mt-14">

          <Link
            to="/projects"
            className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 tracking-widest uppercase"
          >
            More Projects
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Projects;