import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Cartas from './pages/Cartas';
import Sets from './pages/Sets';
import Formatos from './pages/Formatos';
import './index.css';


const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<div>Inicio</div>} />
        <Route path="/cartas" element={<Cartas />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/formatos" element={<Formatos />} />
      </Routes>
    </Router>
  );
};

export default App;
