import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import  { useState , useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle' 
import './App.css'
import { Header , Footer , Colors } from './components/index'
import { Home , About , Projects , Contact} from './pages/index'



function App() {
  const [pageColor, setPageColor] =  useState(localStorage.getItem('pageColor') || '');

  const handleColorChange = (color) => {
    setPageColor(color);
  };
  useEffect(() => {
    
    localStorage.setItem('pageColor', pageColor);
  }, [pageColor]);

  return (
    <>
      <Router basename={'/'}>
        <Header pageColor={pageColor}/>
        
        <Colors onColorChange={handleColorChange} />

        <div className={`page-content ${pageColor}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/projects' element={<Projects />} />
          </Routes>
        </div>
        
        <Footer pageColor={pageColor}/>
      </Router>
      
      
    </>
  )
}

export default App