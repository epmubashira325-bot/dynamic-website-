function CarouselTable({ carouselData }) {
  return (
    <table className="carousel-table">

      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Subtitle</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {carouselData.map((item) => (

          <tr key={item.id}>

            <td>
              <img
                src={item.image}
                alt={item.title}
                width="120"
              />
            </td>

            <td>{item.title}</td>

            <td>{item.subtitle}</td>

            <td>{item.status}</td>

            <td>

              <button>Edit</button>

              <button>Delete</button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default CarouselTable;