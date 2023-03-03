import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadPdfForm from './components/UploadPdfForm';

function App() {
  return (
    <div className="container">
      <h1 className="my-4">PDF-File hochladen und anzeigen</h1>
      <UploadPdfForm />
    </div>
  );
}

export default App;
