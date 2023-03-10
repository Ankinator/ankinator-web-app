import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
//import { login } from './Services/APIServices';
import UploadPage from './pages/UploadPage/UploadPage';


export const bgColors = {
  "Primär": "#00FFDD",
  "Hint": "#160E21",
  "AltHint": "#2B0762",
  "Card": "#2C1843",
  "Rahmen": "#AE72EB",
  "Text": "#FFFFFF",
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