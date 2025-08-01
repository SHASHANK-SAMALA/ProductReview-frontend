import React from 'react';

const ReviewsList = ({ reviews }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <i className="fas fa-thumbs-up text-success"></i>;
      case 'negative':
        return <i className="fas fa-thumbs-down text-danger"></i>;
      default:
        return <i className="fas fa-minus text-muted"></i>;
    }
  };

  const getSentimentClass = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'sentiment-positive border';
      case 'negative':
        return 'sentiment-negative border';
      default:
        return 'sentiment-neutral border';
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Recent Reviews</h5>
        <div className="reviews-container">
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className={`p-3 rounded mb-3 ${getSentimentClass(review.sentiment)}`}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    {getSentimentIcon(review.sentiment)}
                    <span className="ms-2 fw-medium text-capitalize">{review.sentiment}</span>
                    {review.rating && (
                      <div className="ms-3 d-flex align-items-center">
                        <i className="fas fa-star text-warning"></i>
                        <span className="ms-1 text-muted small">{review.rating}</span>
                      </div>
                    )}
                  </div>
                  <small className="text-muted">{review.date}</small>
                </div>
                <p className="text-dark small mb-2">{review.text}</p>
                {review.author && (
                  <p className="text-muted small mb-0">- {review.author}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;
