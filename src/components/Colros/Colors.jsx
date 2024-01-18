import './Colors.css'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const Colors = ({ onColorChange }) => {
  const handleButtonClick = (color) => {
    onColorChange(color);
  };

  return ( 
    <div className='btn-color d-flex flex-column align-items-start fixed-top   justify-content-center '>
      <Button onClick={() => handleButtonClick('secondary')} variant="secondary my-3 p-3 "></Button>
      <Button onClick={() => handleButtonClick('success')} variant="success my-3 p-3"></Button>
      <Button onClick={() => handleButtonClick('warning')} variant="warning my-3 p-3"></Button>
      <Button onClick={() => handleButtonClick('danger')} variant="danger my-3 p-3"></Button>
      <Button onClick={() => handleButtonClick('info')} variant="info my-3 p-3"></Button>
      <Button onClick={() => handleButtonClick('light')} variant="light my-3 p-3"></Button>
      <Button onClick={() => handleButtonClick('dark')} variant="dark my-3 p-3"></Button>
    </div>
  )
}

Colors.propTypes = {
  onColorChange: PropTypes.func.isRequired, 
};

export default Colors