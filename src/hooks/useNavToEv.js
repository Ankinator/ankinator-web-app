import { useNavigate } from 'react-router-dom';

export default function useNavToEv() {
  const navigate = useNavigate();

  function navToEvaluationPage(pdfFile, textData) {
    console.log(pdfFile)
    navigate('/evaluation', {state : {pdfFile: "test", textData: "Test2"}});

  }

  return { navToEvaluationPage };
}