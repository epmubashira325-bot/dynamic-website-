import ServiceDetail from "../components/ServiceDetail";
import supervision from "../assets/images/services/supervision.jpg";

function Supervision() {
  return (
    <ServiceDetail
      title="Supervision"
      image={supervision}
      subtitle="Professional site supervision from start to completion."
      description="Our supervision services ensure that construction activities follow approved drawings, quality standards and safety regulations while maintaining project timelines."
    />
  );
}

export default Supervision;