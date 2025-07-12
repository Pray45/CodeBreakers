import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './index.css';
import Productlisting from './pages/Productlisting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Productlisting />} />
        <Route path="*" element={<div className="text-center mt-20 text-red-500 text-xl">404 – Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
