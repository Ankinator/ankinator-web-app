import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import { sessionLogin } from './api/api';
import UploadPage from './pages/UploadPage/UploadPage';
import EvaluationPage from './pages/EvaluationPage/EvaluationPage';


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

  sessionLogin();

  return (
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
      </Routes>
  );
}

export default App;