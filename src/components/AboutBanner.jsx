import banner from "../assets/images/about-banner.jpg";

function AboutBanner() {
  return (
    <section
      className="relative h-[450px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">

        <div className="text-center text-white">

          <p className="uppercase tracking-[6px] text-amber-400 mb-4">
            Welcome To
          </p>

          <h1 className="text-6xl font-bold">
            About AM Associates
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Home / About
          </p>

        </div>

      </div>

    </section>
  );
}

export default AboutBanner;