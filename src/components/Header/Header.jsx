import './Header.css'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Header = ({ pageColor }) => {
  return (
    <> 
    <nav  className={`navbar navbar-expand-lg sticky-top   ${pageColor}`}> 
          <div className="container">
            <Link  to="/" className="navbar-brand" ><h1 className={`${pageColor}`}>Amine Triki</h1></Link>
            <button className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#main" 
            aria-controls="main" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="main">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ps-4">
                <li className="nav-item ">
                  <Link  to="/" className="nav-link   p-3 p-lg-4">Home</Link>
                </li>
                <li className="nav-item ">
                  <Link  to="/About" className="nav-link  p-3 p-lg-4">About</Link>
                </li>
                <li className="nav-item ">
                  <Link to="/projects" className="nav-link  p-3 p-lg-4">Projects</Link>
                </li>
                <li className="nav-item ">
                  <Link to="/contact" className="nav-link  p-3 p-lg-4">Contact Me</Link>
                </li>
              </ul>
            
            </div>
            
          </div>
    </nav>
    </>
  )
}

Header.propTypes = {
  pageColor: PropTypes.string.isRequired, 
};

export default Header