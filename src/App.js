import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import UploadPage from './pages/UploadPage/UploadPage';
import EvaluationPage from './pages/EvaluationPage/EvaluationPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import LoginPage from './pages/LoginPage/LoginPage';


export const bgColors = {
  "Primär": "#2A98E1",
  "Hint": "#303030",
  "AltHint": "#5E5E5E",
  "Card": "#A7D5F3",
  "Rahmen": "#AE72EB",
  "Text": "#E7E7E7",
  "AltText": "#8456B3",
  "Effekt": "#6B10F8"
};

function App() {

  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
      </Routes>
  );
}

export default App;