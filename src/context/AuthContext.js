import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const verifySession = async () => {
      const options = {
        headers: {
          token
        }
      };
      const res = await fetch('http://localhost:5000/auth/verify-session', options);
      const { success } = await res.json();
      if (success) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated('false');
      }
    };

    if (token) {
      verifySession();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
