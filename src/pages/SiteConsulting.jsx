import ServiceDetail from "../components/ServiceDetail";
import consulting from "../assets/images/services/consulting.jpg";

function SiteConsulting() {
  return (
    <ServiceDetail
      title="Site Consulting"
      image={consulting}
      subtitle="Expert technical guidance for successful project execution."
      description="We provide site consulting services including planning, feasibility studies, budgeting, design review and technical support throughout every phase of construction."
    />
  );
}

export default SiteConsulting;