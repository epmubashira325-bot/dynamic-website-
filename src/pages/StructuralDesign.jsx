import ServiceDetail from "../components/ServiceDetail";
import structural from "../assets/images/services/structural.jpg";

function StructuralDesign() {
  return (
    <ServiceDetail
      title="Structural Design"
      image={structural}
      subtitle="Innovative structural solutions designed for safety and durability."
      description="We provide structural engineering services for residential, commercial and industrial buildings using modern design principles to ensure strength, stability and long-term performance."
    />
  );
}

export default StructuralDesign;