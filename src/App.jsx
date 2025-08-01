import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index'; // Your original Index component (homepage with URL input)
import InsightsDashboard from './InsightsDashboard'; // Your dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* This route will render the InsightsDashboard component */}
        <Route path="/insights" element={<InsightsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;