import './Footer.css'
import PropTypes from 'prop-types';

let year = new Date().getFullYear() ;

const Footer = ({ pageColor }) => {
  return (
    
    <>
      <footer className={`footer py-3 ${pageColor}`} >
        <p id="Rights" className="container text-center mb-0">{`${year} © Amine Triki || All Rights Reserved`} </p>
    </footer>
    </>
  )
}

Footer.propTypes = {
  pageColor: PropTypes.string.isRequired, 
};
export default Footer