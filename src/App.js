import './App.css';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadPdfForm from './components/UploadPdfForm';
import PdfViewer from "./components/PdfViewer";

function App() {
  const [pdfData, setPdfData] = useState(null);

  return (
    <div className="container">
      <h1 className="my-4">PDF-File hochladen und anzeigen</h1>
      <UploadPdfForm setPdfData={setPdfData}/>
      <PdfViewer pdfData={pdfData} />
    </div>
  );
}

export default App;
