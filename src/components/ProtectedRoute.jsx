import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e7ecef] flex items-center justify-center">
        <div className="text-[#588157] text-xl">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute; 