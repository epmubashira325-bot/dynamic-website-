import ServiceDetail from "../components/ServiceDetail";
import interior from "../assets/images/services/interior.jpg";

function InteriorDesign() {
  return (
    <ServiceDetail
      title="Interior Designing"
      image={interior}
      subtitle="Creating elegant and functional interior spaces."
      description="Our interior design solutions combine creativity, comfort and functionality to create beautiful living and working environments tailored to client requirements."
    />
  );
}

export default InteriorDesign;