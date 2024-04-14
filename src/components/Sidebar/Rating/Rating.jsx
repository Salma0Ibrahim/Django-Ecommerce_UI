import "./Rating.css";

const Rating = ({ handleChange }) => {
  const ratings = [1, 2, 3, 4, 5];
  

  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title rating-title">Ratings</h2>
        <hr />

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="rating" />
          <span className="checkmark"></span>All
        </label>

        {ratings.map((rating) => (
          <label key={rating} className="sidebar-label-container">
            <input
              onChange={handleChange}
              type="radio"
              value={rating}
              name="rating"
            />
            <span className="checkmark"></span>
            {rating} Star{rating !== 1 && "s"}
          </label>
        ))}
      </div>
    </>
  );
};

export default Rating;
