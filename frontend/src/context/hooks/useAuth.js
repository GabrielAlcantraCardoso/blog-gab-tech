import { useState, useEffect } from 'react';
import { useNavigate , Navigate } from 'react-router-dom';
import api from '../../services/api';

const UseAuth = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

 useEffect  (()   =>{
    const token = localStorage.getItem('token');

    const checkTokenValidity = async () => {
    if (token) {
      const test = api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      console.log(test)
      try {
        console.log("response")
        const response = await api.post('/checkTokenValidity');
        console.log("response",response)
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }

    setLoading(false);
  };

  checkTokenValidity();

  }, []);
  
  const handleLogin = async (email, password) => {
    try {
    const response = await api.post('/authenticate', {email: email, password: password});
    const { token } = response.data;
    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    navigate('/');
   
    } catch(error){
        
        throw error;
    }
  
  }

  function handleLogout() {
   
    setAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
    api.defaults.headers.Authorization = undefined;
   
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}

export default UseAuth;