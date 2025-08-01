import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import UrlInput from '../UrlInput';
import config from '../config';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async (analyzeUrl) => {
    try {
      setIsLoading(true);
      setResult(null);
      setError(null);
      setUrl(analyzeUrl);

      console.log("🚀 Starting analysis for URL:", analyzeUrl);
      console.log("🌐 Using backend URL:", config.BACKEND_URL);
      
      // First test if backend is running
      try {
        const testResponse = await fetch(`${config.BACKEND_URL}/test`);
        if (!testResponse.ok) {
          throw new Error('Backend server is not responding');
        }
        console.log("✅ Backend is running");
      } catch (testError) {
        console.error("❌ Backend test failed:", testError);
        throw new Error("Backend server is not running. Please check the deployment.");
      }

      console.log("📡 Sending request to backend...");
      const response = await fetch(`${config.BACKEND_URL}/analyze_sentiment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: analyzeUrl }),
      });

      console.log("📥 Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ HTTP Error:", response.status, errorText);
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log("📊 Backend response:", data);

      if (data.status === 'error') {
        throw new Error(data.message || 'Analysis failed');
      }

      // Extract insights from the correct field
      const insights = data?.insights_for_manager || [];
      const detailedSentiments = data?.detailed_sentiments || [];
      
      console.log(`📈 Found ${insights.length} insights and ${detailedSentiments.length} detailed sentiments`);
      
      // Count sentiments from detailed_sentiments
      const positiveCount = detailedSentiments.filter(r => r.sentiment === 'positive').length;
      const negativeCount = detailedSentiments.filter(r => r.sentiment === 'negative').length;
      const neutralCount = detailedSentiments.filter(r => r.sentiment === 'neutral').length;

      console.log(`📊 Sentiment counts - Positive: ${positiveCount}, Negative: ${negativeCount}, Neutral: ${neutralCount}`);

      const summary = {
        positive: positiveCount,
        negative: negativeCount,
        neutral: neutralCount,
        positivePercentage: data?.summary?.positive_percentage || 0,
        negativePercentage: data?.summary?.negative_percentage || 0,
        neutralPercentage: data?.summary?.neutral_percentage || 0,
      };

      // Format insights for the dashboard
      const formattedInsights = insights.map((insight, index) => ({
        title: `Insight ${index + 1}`,
        description: insight,
        sentiment: "neutral",
        index,
      }));

      // Get top positive and negative reviews
      const topPositive = detailedSentiments
        .filter(r => r.sentiment === 'positive')
        .slice(0, 5)
        .map(r => ({
          text: r.original_review,
          sentiment: r.sentiment,
          score: r.vader_scores.compound
        }));

      const topNegative = detailedSentiments
        .filter(r => r.sentiment === 'negative')
        .slice(0, 5)
        .map(r => ({
          text: r.original_review,
          sentiment: r.sentiment,
          score: r.vader_scores.compound
        }));

      const analysisData = {
        insights: formattedInsights,
        summary,
        reviews: {
          topPositive,
          topNegative,
          all: detailedSentiments.map(r => ({
            text: r.original_review,
            sentiment: r.sentiment,
            score: r.vader_scores.compound
          }))
        }
      };

      console.log("✅ Analysis complete, navigating to insights dashboard");
      setResult(analysisData);
      
      // Navigate to insights dashboard with the data
      navigate('/insights', { 
        state: { 
          analysisData, 
          analyzedUrl: analyzeUrl 
        } 
      });

    } catch (error) {
      console.error("❌ Error analyzing sentiment:", error);
      setError(error.message || "Failed to analyze sentiment. Please try again.");
    } finally {
      setIsLoading(false);
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
