import React, { useState } from 'react';

const UrlInput = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div style={{ backgroundColor: '#eef3ff', minHeight: '100vh', width: '100vw', margin: '0', padding: '0' }}>
      {/* Header Section */}
      <div className="container-fluid text-center py-5">
        <h1 className="fw-bold mb-3">Product Review Sentiment Analysis</h1>
        <p className="text-muted fs-5">
          Analyze customer sentiment from any product page. Get instant insights into what
          customers really think about products through advanced sentiment analysis.
        </p>
      </div>

      {/* Input Card */}
      <div className="container-fluid mb-5">
        <div className="card p-4 shadow-sm border-0">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h5 className="fw-bold">
                <i className="fas fa-link me-2 text-primary"></i>
                Enter Product Page URL
              </h5>
              <p className="text-muted mb-3">
                Paste the URL of any product page to analyze customer reviews and sentiment
              </p>

              <div className="input-group input-group-lg">
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://example.com/product-page"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !url.trim()}
                  className="btn btn-secondary"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Analyzing...
                    </>
                  ) : (
                    'Analyze'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
