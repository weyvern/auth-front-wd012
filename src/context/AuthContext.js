import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifySession = async () => {
      try {
        setLoading(true);
        const {
          data: { success }
        } = await axios.get(`${process.env.REACT_APP_AUTH_API}/auth/verify-session`, {
          headers: { Authorization: token }
        });
        if (success) {
          const { data: userInfo } = await axios.get(`${process.env.REACT_APP_AUTH_API}/auth/me`, {
            headers: { Authorization: token }
          });
          setUser(userInfo);
          setIsAuthenticated(true);
          setLoading(false);
        }
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
        setTimeout(() => setError(null), 3000);
      }
    };

    token && verifySession();
  }, []);

  const signUp = async newUser => {
    try {
      setLoading(true);
      const {
        data: { token }
      } = await axios.post(`${process.env.REACT_APP_AUTH_API}/auth/signup`, newUser);
      const { data: userInfo } = await axios.get(`${process.env.REACT_APP_AUTH_API}/auth/me`, {
        headers: { Authorization: token }
      });
      localStorage.setItem('token', token);
      setUser(userInfo);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  const signIn = async user => {
    try {
      setLoading(true);
      const {
        data: { token }
      } = await axios.post(`${process.env.REACT_APP_AUTH_API}/auth/signin`, user);
      const { data: userInfo } = await axios.get(`${process.env.REACT_APP_AUTH_API}/auth/me`, {
        headers: { Authorization: token }
      });
      localStorage.setItem('token', token);
      setUser(userInfo);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setUser({});
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, signUp, signIn, logOut, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
