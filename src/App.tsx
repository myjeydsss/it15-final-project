
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import AdminRegister from './components/AdminRegister';


const App = () => {


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


      </Routes>
    </>
  );
};

export default App;
