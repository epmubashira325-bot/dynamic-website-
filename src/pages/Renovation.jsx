import ServiceDetail from "../components/ServiceDetail";
import renovation from "../assets/images/services/renovation.jpg";

function Renovation() {
  return (
    <ServiceDetail
      title="Renovation Work"
      image={renovation}
      subtitle="Transforming existing spaces into modern and functional environments."
      description="Our renovation services improve the appearance, functionality and value of existing buildings while maintaining quality workmanship and attention to detail."
    />
  );
}

export default Renovation;