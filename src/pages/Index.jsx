import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import UrlInput from '../UrlInput';
import axios from 'axios';
import config from '../config';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const BACKEND_URL = config.BACKEND_URL;

  const handleAnalyze = async (url) => {
    setIsLoading(true);
    setError(null);
    
    console.log('🚀 Starting analysis...');
    console.log('📍 Target URL:', url);
    console.log('🔗 Backend URL:', BACKEND_URL);
    console.log('📡 Full endpoint:', `${BACKEND_URL}/analyze_sentiment`);

    try {
      console.log('📤 Sending POST request to backend...');
      
      const response = await axios.post(`${BACKEND_URL}/analyze_sentiment`, 
        { url },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 60000 // 60 second timeout
        }
      );
      
      console.log('✅ Response received from backend:');
      console.log('📊 Response status:', response.status);
      console.log('📋 Response headers:', response.headers);
      console.log('💾 Response data:', response.data);
      
      const backendData = response.data;

      if (backendData.status === "success") {
        console.log('🎉 Analysis successful, processing data...');
        
        const totalReviews = backendData.summary?.total_reviews_found || 0;
        console.log('📈 Total reviews found:', totalReviews);
        console.log('🧠 Insights received:', backendData.insights_for_manager?.length || 0);

        const transformedData = {
          summary: {
            positive: Math.round((backendData.summary.positive_percentage / 100) * totalReviews),
            negative: Math.round((backendData.summary.negative_percentage / 100) * totalReviews),
            neutral: Math.round((backendData.summary.neutral_percentage / 100) * totalReviews),
            positivePercentage: backendData.summary.positive_percentage,
            negativePercentage: backendData.summary.negative_percentage,
            neutralPercentage: backendData.summary.neutral_percentage,
            totalReviewsFound: totalReviews
          },
          insights: (backendData.insights_for_manager || []).map((insightText, index) => ({
            title: `Key Insight ${index + 1}`,
            description: insightText
          })),
          reviews: {
            all: (backendData.detailed_sentiments || []).map(review => ({
              text: review.original_review,
              sentiment: review.sentiment,
              rating: review.vader_scores ? (
                review.vader_scores.compound >= 0.05 ? 5 :
                review.vader_scores.compound <= -0.05 ? 1 :
                3
              ) : 0,
              date: "Analyzed Now",
              author: "Customer"
            })),
            topPositive: (backendData.top_positive_reviews || []).slice(0, 5).map(review => ({
              text: review.original_review,
              sentiment: review.sentiment,
              rating: 5,
              date: "Analyzed Now",
              author: "Customer"
            })),
            topNegative: (backendData.top_negative_reviews || []).slice(0, 5).map(review => ({
              text: review.original_review,
              sentiment: review.sentiment,
              rating: 1,
              date: "Analyzed Now",
              author: "Customer"
            }))
          }
        };

        console.log('✨ Transformed Data for Frontend:', transformedData);
        console.log('🧭 Navigating to insights dashboard...');
        navigate('/insights', { state: { analysisData: transformedData, analyzedUrl: url } });

      } else {
        console.error('❌ Backend returned error status:', backendData.status);
        console.error('📝 Error message:', backendData.message);
        setError(backendData.message || "An unknown error occurred during analysis.");
      }
    } catch (err) {
      console.error('💥 Analysis failed with error:');
      console.error('🔍 Error object:', err);
      console.error('📊 Error name:', err.name);
      console.error('📝 Error message:', err.message);
      
      if (err.response) {
        console.error('🌐 Server responded with error:');
        console.error('📊 Status code:', err.response.status);
        console.error('📋 Response headers:', err.response.headers);
        console.error('💾 Response data:', err.response.data);
        setError(`Server error (${err.response.status}): ${err.response.data?.error || err.response.data?.message || 'Unknown server error'}`);
      } else if (err.request) {
        console.error('📡 No response received from server:');
        console.error('🔍 Request details:', err.request);
        console.error('🌐 Network/CORS issue detected');
        setError(`No response from server at ${BACKEND_URL}. Please check if the backend is running and CORS is configured.`);
      } else {
        console.error('⚙️ Request setup error:', err.message);
        setError('Error setting up the request: ' + err.message);
      }
      
      // Additional debugging info
      console.log('🔧 Debug Info:');
      console.log('- Backend URL:', BACKEND_URL);
      console.log('- Environment:', import.meta.env.MODE);
      console.log('- VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
      
    } finally {
      setIsLoading(false);
      console.log('🏁 Analysis request completed.');
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="container-fluid d-flex flex-column justify-content-center align-items-center text-center">
        
        <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3">Scraping and analyzing reviews...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="alert alert-danger text-center py-3" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
