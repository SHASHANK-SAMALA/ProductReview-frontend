import React from 'react';

const SentimentCard = ({ title, value, percentage, trend, color }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <i className="fas fa-arrow-up"></i>;
    if (trend === 'down') return <i className="fas fa-arrow-down"></i>;
    return <i className="fas fa-minus"></i>;
  };

  const getTrendClass = () => {
    if (trend === 'up') return 'trend-up';
    if (trend === 'down') return 'trend-down';
    return 'trend-neutral';
  };

  return (
    <div className="card h-100 card-hover">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="card-subtitle text-muted text-uppercase fw-medium">{title}</h6>
          <div className={`d-flex align-items-center ${getTrendClass()}`}>
            {getTrendIcon()}
            <span className="ms-1 fw-medium">{percentage}%</span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className={`rounded-circle me-3`} style={{
            width: '12px', 
            height: '12px', 
            backgroundColor: color === 'bg-green-500' ? '#28a745' : 
                           color === 'bg-red-500' ? '#dc3545' : '#6c757d'
          }}></div>
          <h2 className="mb-0 fw-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default SentimentCard;
