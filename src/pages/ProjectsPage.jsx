import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import banner from "../assets/images/project-banner.jpg";

import project1 from "../assets/images/projects/project1.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";
import project4 from "../assets/images/projects/project4.jpg";
import project5 from "../assets/images/projects/project5.jpg";


const projects = [
  {
    
    image: project1,
 
  },
  {
    
    image: project2,

  },
  {
  
    image: project3,
  
  },
  {
    
    image: project4,
 
  },
  {
    
    image: project5,

  },
 
];

function ProjectsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}

      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">

          <p className="uppercase tracking-[6px] text-amber-400 font-semibold">
            Our Portfolio
          </p>

          <h1 className="text-6xl font-bold text-white mt-5">
            Our Projects
          </h1>

          <p className="mt-8 text-lg text-gray-200 max-w-3xl leading-8">
            Every project reflects our commitment to quality,
            innovation, and engineering excellence.
          </p>

        </div>

      </section>

      {/* Introduction */}

      <section className="py-24 bg-gray-100">

        <div className="max-w-6xl mx-auto px-8 text-center">

          <p className="uppercase tracking-[5px] text-amber-500 font-semibold">
            Featured Works
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Projects That Define Quality
          </h2>

          <p className="mt-8 text-gray-600 leading-8 max-w-4xl mx-auto">
            Our projects demonstrate our expertise in structural engineering,
            construction, renovation, and interior design. Every project is
            executed with precision, innovation, and a commitment to
            delivering exceptional quality.
          </p>

        </div>

      </section>

      {/* Projects */}

      <section className="pb-24 bg-gray-100">

        <div className="max-w-7xl mx-auto px-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project, index) => (

              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl duration-300"
              >

                <img
                  src={project.image}
                  alt={project.title}
                  className="h-72 w-full object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {project.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ProjectsPage;