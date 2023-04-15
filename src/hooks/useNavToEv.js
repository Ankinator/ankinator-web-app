import { useNavigate } from 'react-router-dom';

export default function useNavToEv() {
  const navigate = useNavigate();

  function navToEvaluationPage() {
    navigate('/evaluation');
  }

  return { navToEvaluationPage };
}