import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  const logOut = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');

    const verifySession = async () => {
      const res = await fetch('http://localhost:5000/auth/verify-session', {
        credentials: 'include'
      });
      const { success } = await res.json();
      if (success) {
        setIsAuthenticated(true);
      } else {
        Cookies.remove('token');
        setIsAuthenticated('false');
      }
    };

    if (token) {
      verifySession();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, error, setError, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
