import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
//import { login } from './Services/APIServices';
import UploadPage from './pages/UploadPage/UploadPage';


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

  //login();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;