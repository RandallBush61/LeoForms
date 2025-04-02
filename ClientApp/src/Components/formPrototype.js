import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../custom.css'

//Dakota- This is a basic prototype form consisting of text boxes asking for basic information such as email, first and last name, and favorite food
//The goal for the futre is to impliment images, videos, and a code editor to execute programs, as well as processes that allow for consistency 
//when taking in data, for example making sure the first letter is capitalized
function FormPrototype() {
  return (
    
    <Form>
        <img src = {require('./seluLogo2.png').default} alt = "SELU Logo" height = {200} width = {300} />
        <header className='formHeader'>Prototype Survey</header>
        <div className='formBody'>
      <Form.Group className='mb-3' controlId="formBasicEmail">
        <Form.Label className='formText'>Email address</Form.Label>
        <Form.Control type = "email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='formText'>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='formText'>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='formText'>Favorite Food</Form.Label>
        <Form.Control type="text" placeholder="Ex. Pizza" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
  );
}

export default FormPrototype;