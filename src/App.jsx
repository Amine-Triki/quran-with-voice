import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle' 

import './App.css'
import { Header , Footer , Colors } from './components/index'
import { Home , About , Projects , Contact} from './pages/index'



function App() {
 

  return (
    <>
      <Router basename={'/'}>
        <Header/>
        
        <Colors/>

        <Routes>
          <Route path='/' element ={<Home/>} />
          <Route path='/About' element ={<About/>} />
          <Route path='/contact' element ={<Contact/>} />
          <Route path='/projects' element ={<Projects/>} />
          
        
        </Routes>
        
        <Footer/>
      </Router>
      
      
    </>
  )
}

export default App