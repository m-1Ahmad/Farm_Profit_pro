import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Market() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/price-history'); }, [navigate]);
  return null;
}

export default Market;