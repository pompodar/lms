const Reviews = () => {
    const reviews = [
      {
        title: 'Metal Sculpture Workshop',
        rating: 3,
        text: 'The metal sculpture workshop was a bit tough...',
      },
      // Add other reviews here...
    ];
  
    return (
      <div className="reviews">
        {/* <h1>Past Event Reviews</h1>
        <div className="review-container">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div> */}
      </div>
    );
  };
  
  const ReviewCard = ({ title, rating, text }) => {
    return (
      <div className="card review-card">
        <h2>{title}</h2>
        <div className="ratings">
          {[...Array(5)].map((_, index) => (
            <i key={index} className={`bx ${index < rating ? 'bxs-star' : 'bx-star'}`}></i>
          ))}
        </div>
        <p>{text}</p>
      </div>
    );
  };

  export default Reviews;