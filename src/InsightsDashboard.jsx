import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SentimentCard from './SentimentCard';
import SentimentChart from './SentimentChart';
import ReviewsList from './ReviewsList';
import Navbar from './Navbar';

const InsightsDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisData, analyzedUrl } = location.state || {};

  if (!analysisData) {
    return (
      <div className="min-vh-100 bg-light">
        <Navbar />
        <main className="container mt-4 text-center py-5">
          <h3 className="fw-semibold mb-3">No Analysis Data Available</h3>
          <p className="text-muted">Please go back to the home page and analyze a URL first.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Go to Home</button>
        </main>
      </div>
    );
  }

  const { summary, reviews, insights } = analysisData;

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Insights Dashboard</h2>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/')}>← Analyze Another URL</button>
        </div>

        {analyzedUrl && (
          <p className="text-muted small mb-4">
            Analysis for: <a href={analyzedUrl} target="_blank" rel="noopener noreferrer">{analyzedUrl}</a>
          </p>
        )}

        {/* Sentiment Summary */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <SentimentCard title="Positive Reviews" value={summary.positive} percentage={summary.positivePercentage} trend="up" color="bg-success" />
          </div>
          <div className="col-md-4 mb-3">
            <SentimentCard title="Negative Reviews" value={summary.negative} percentage={summary.negativePercentage} trend="down" color="bg-danger" />
          </div>
          <div className="col-md-4 mb-3">
            <SentimentCard title="Neutral Reviews" value={summary.neutral} percentage={summary.neutralPercentage} trend="neutral" color="bg-secondary" />
          </div>
        </div>

        {/* Charts */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <div className="card h-100 p-3">
              <h5 className="card-title fw-semibold mb-3">Sentiment Distribution (Pie Chart)</h5>
              <SentimentChart data={summary} type="pie" />
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <div className="card h-100 p-3">
              <h5 className="card-title fw-semibold mb-3">Sentiment Distribution (Bar Chart)</h5>
              <SentimentChart data={summary} type="bar" />
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Key Insights</h5>
                <div className="row">
                  {insights.map((insight, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="p-3 bg-primary bg-opacity-10 rounded border border-primary border-opacity-25">
                        <h6 className="fw-medium text-primary mb-2">{insight.title}</h6>
                        <p className="text-primary small mb-0">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="row mb-4">
          <div className="col-12 mb-3">
            <h5 className="fw-semibold">Top Positive Reviews</h5>
            <ReviewsList reviews={reviews.topPositive} />
          </div>
          <div className="col-12 mb-3">
            <h5 className="fw-semibold">Top Negative Reviews</h5>
            <ReviewsList reviews={reviews.topNegative} />
          </div>
          <div className="col-12">
            <h5 className="fw-semibold">All Reviews</h5>
            <ReviewsList reviews={reviews.all} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InsightsDashboard;
