import Navbar from "./Navbar";
import Footer from "./Footer";

function ServiceDetail({
  title,
  image,
  subtitle,
  description,
}) {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 text-white">

          <p className="uppercase tracking-[6px] text-amber-400 font-semibold mb-4">
            Our Services
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8">
            {subtitle}
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-gray-50">

        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-4xl font-bold mb-8">
            {title}
          </h2>

          <p className="text-gray-600 leading-9">
            {description}
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ServiceDetail;
