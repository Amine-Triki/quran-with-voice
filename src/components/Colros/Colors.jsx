import './Colors.css'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const Colors = ({ onColorChange }) => {
  const handleButtonClick = (color) => {
    onColorChange(color);
  };

  return ( 
    <div className='btn-color d-flex flex-column align-items-start fixed-top   justify-content-center '>
      <Button onClick={() => handleButtonClick('primary')} variant="primary mb-3 p-2"></Button>
      <Button onClick={() => handleButtonClick('secondary')} variant="secondary mb-3 p-2"></Button>
      <Button onClick={() => handleButtonClick('success')} variant="success mb-3 p-2"></Button>
      <Button onClick={() => handleButtonClick('warning')} variant="warning mb-3 p-2"></Button>
      <Button onClick={() => handleButtonClick('danger')} variant="danger mb-3 p-2"></Button>
      <Button onClick={() => handleButtonClick('info')} variant="info mb-3 p-2"></Button>
      <Button onClick={() => handleButtonClick('light')} variant="light mb-3 p-2"></Button>
      <Button onClick={() => handleButtonClick('dark')} variant="dark mb-3 p-2"></Button>
    </div>
  )
}

Colors.propTypes = {
  onColorChange: PropTypes.func.isRequired, 
};

export default Colors