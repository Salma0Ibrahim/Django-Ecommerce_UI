// eslint-disable-next-line react/prop-types
function FeaturesCard({ color, icon, title, description }) {
  return (
    <div className="col d-flex">
      <div
        className={`card depth border-0 rounded-0 border-bottom border-${color} border-3 w-100 shadow`}
      >
        <div className="card-body text-center">
          <div className={`h1 fw-bold my-2 text-${color}`}>{icon}</div>
          <h5 className="fw-bold">{title}</h5>
          <p className="mb-0">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesCard;
