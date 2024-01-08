import './Colors.css'
import Button from 'react-bootstrap/Button';

const Colors = () => {
  return ( 
    <div className='btn-color d-flex flex-column align-items-start fixed-top   justify-content-center '>
      <Button  variant="primary mb-3 p-2"></Button>
      <Button variant="secondary mb-3 p-2"></Button>
      <Button variant="success mb-3 p-2"></Button>
      <Button variant="warning mb-3 p-2"></Button>
      <Button variant="danger mb-3 p-2"></Button>
      <Button variant="info mb-3 p-2"></Button>
      <Button variant="light mb-3 p-2"></Button>
      <Button variant="dark mb-3 p-2"></Button>
    </div>
  )
}

export default Colors