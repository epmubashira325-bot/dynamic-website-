import Navbar from "../components/Navbar";
import AboutBanner from "../components/AboutBanner";
import MeetProfessional from "../components/MeetProfessional";
import CompanyStory from "../components/CompanyStory";
import MissionVision from "../components/MissionVision";
import ContactCTA from "../components/ContactCTA";

function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutBanner />
      <MeetProfessional />
      <CompanyStory />
      <MissionVision />
      <ContactCTA />
    </>
  );
}

export default AboutPage;