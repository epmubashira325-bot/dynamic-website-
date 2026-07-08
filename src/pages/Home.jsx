import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import Projects from "../components/Projects";

function Home() {
  return (
    <>
      <Navbar />
<Hero />
<About />
<Services />
<Projects />
<WhyChooseUs />
<Stats />
<Footer />
    </>
  );
}

export default Home;