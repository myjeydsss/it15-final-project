import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import AdminRegister from './components/AdminRegister';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

interface Token {
  user: {
    email: string;
    // Add other properties if needed
  };
  // Add other token properties if needed
}

const App: React.FC = () => {
  const [token, setToken] = useState<Token | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    if (savedToken) {
      setToken(JSON.parse(savedToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    } else {
      sessionStorage.removeItem('token');
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Features' element={<Features />} />
        <Route path='/RegisterUser' element={<RegisterUser />} />
        <Route path='/LoginUser' element={<LoginUser />} />
        <Route path="/RegisterAdmin" element={<AdminRegister />} />
        <Route path="/LoginAdmin" element={<AdminLogin setToken={setToken} />} />
        {token && <Route path="/AdminDashboard" element={<AdminDashboard token={token} setToken={setToken} />} />}
      </Routes>
    </>
  );
};

export default App;
