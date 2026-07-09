import ServiceDetail from "../components/ServiceDetail";
import construction from "../assets/images/services/construction.jpg";

function Construction() {
  return (
    <ServiceDetail
      title="Construction"
      image={construction}
      subtitle="Delivering quality construction with precision, safety and timely execution."
      description="Our construction services cover residential, commercial and industrial projects. We focus on quality workmanship, modern engineering techniques, efficient project management and strict quality standards to ensure every project is completed successfully and on schedule."
    />
  );
}

export default Construction;