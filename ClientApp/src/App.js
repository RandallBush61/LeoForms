import React /*{ useEffect, useState }*/ from 'react';
// eslint-disable-next-line
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// eslint-disable-next-line
import { gapi } from 'gapi-script';
import { /*Navigate,*/ Route, Routes } from 'react-router-dom';
import './custom.css'
import Portal from './Portal';

import EmailBreach from './EmailBreachQuestion/breachq';
import PasswordCheck from './Password Question/passwordCheck';

import HomeNavBar from './Components/navBar';
//import FormPrototype from './Components/formPrototype';
// eslint-disable-next-line
import { googleFormsToJson, GoogleFormProvider, useGoogleForm, useCheckboxInput} from 'react-google-forms-hooks'
// eslint-disable-next-line
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line
import Form from 'react-bootstrap/Form';
import FormPrototype from "./FormEdit";
import HomePage from './Components/homePage';
import FormSubmit from './FormSubmit';

//Dakota- This is the json for the Google Form at this link https://docs.google.com/forms/d/e/1FAIpQLSe0R3jF4XiYcibT52udCcBun09NTpNw3rECWLsNG_9Wz-pw_A/viewform
//NOTE HERE- For the json object, I have no idea what fvv, pageHistory, fbzx, or action means. I copied and pasted from an example I found here,
// https://codesandbox.io/s/charming-yonath-lh9kpy?file=/src/form.json however I noticed between the different examples that these values changed.
//I've tried Googling them with no avail, hopefully we can remove them without an isue...
// eslint-disable-next-line
import form from './form.json';
// eslint-disable-next-line
import styled from "styled-components";


//Dakota-An example I saw online had these style options, just ignore them for the time being
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const CheckboxContainer = styled.div`
//   display: flex;

//   & label {
//     margin: 0 10px;
//   }
// `;


//const clientId = "372360721408-3lne1a7i7pd8jbeno7ds5dj9907jhqe3.apps.googleusercontent.com"

//      <div className = 'login-button'>
//<button>Create Form (Login with Google)</button>
//</div>

// eslint-disable-next-line
// function SignInPage(){
//   const [ profile, setProfile ] = useState([]);
//   const clientId = "372360721408-3lne1a7i7pd8jbeno7ds5dj9907jhqe3.apps.googleusercontent.com"

//   useEffect(() => {
//     const initClient = () => {
//           gapi.client.init({
//           clientId: clientId,
//           scope: ''
//         });
//      };
//      gapi.load('client:auth2', initClient);
//  });

//   sessionStorage.setItem("currentLoggedIn", profile.name);

 
//   const onSuccess = (res) => {
//     setProfile(res.profileObj);
//   };

//   const onFailure = (err) => {
//     console.log('failed', err);
//   };

//   /*const logOut = () => {
//     setProfile(null);
//   };
//   */

//   console.log(profile.name);

//   if(profile.name===undefined){
//     return (
      
//       <body>
//       <div className = 'containerO'>
//         <h1 className='child'>ROARING Forms</h1>
//       </div>
//       <p1 className = 'welcome-text'>Let your forms roar!</p1>
//       <div className= 'login-button'>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Sign in with Google"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={'single_host_origin'}
//       />
//       </div>
//       </body>
      
//     );

    
//   }
//   else{
//     return (
//       <Navigate to={'/portal'}></Navigate>

//     );
//   }
// }
//Dakota- The react components for CheckBoxes, from all the examples I've seen the programmer would set his components up with labels and registers
//the registers would hold an input value and they would use the hook, in this case userCheckboxInput, with the id relating to the Google Form
//json object to I believe "connect" the two.
/*function CheckBox({id})
{
  const {} = useCheckboxInput(id);
  return(
    
    
      <div className="mb-3">
        <Form.Check 
          type="checkbox"
          id={id}
          label={'Yes'}
        />
        <Form.Check 
          type="checkbox"
          id={id}
          label={`Double Yes`}
        />
   
      </div>
    
    
  )
}*/

//Dakota- This is an example I found online, link is https://codesandbox.io/s/charming-yonath-lh9kpy?file=/src/form.json
//Another good example is https://codesandbox.io/s/jb3hy which is a wedding invitation/form
// function CheckboxInput({ id }) {
//   const { options } = useCheckboxInput(id);

//   return (
//     <Container>
//       {options.map((o) => (
//         <CheckboxContainer key={o.id}>
//           <input type="checkbox" id={o.id} {...o.registerOption()} />
//           <label htmlFor={o.id}>{o.label}Hello</label>
//         </CheckboxContainer>
//       ))}
//     </Container>
//   );
// }

//Dakota- This function would be our form/survey. We send our form object we retrieved from the createField() function in our App() in the 
//useGoogleForm() hook. We also have an onSubmit that will submit the data to the Google forms
// function CheckExample() {

// const methods = useGoogleForm({form})
// const onSubmit = async (data) => 
// {
//     await methods.submitToGoogleForms(data);
      
// }
//   return (
//     <GoogleFormProvider>
//     <Form onSubmit = {methods.handleSubmit(onSubmit)}>
//       <header>Do you want to develop an app?</header>
//       <CheckboxInput id = '807685397'/>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//     </GoogleFormProvider>
//   );
// }

function App() {

//Dakota- This fucntion converts the Google form at the link to json and posts it in the console of the webpage
// async function createField(){
// const result = await googleFormsToJson(
//   "https://docs.google.com/forms/d/e/1FAIpQLSe0R3jF4XiYcibT52udCcBun09NTpNw3rECWLsNG_9Wz-pw_A/viewform"
// )

// console.log(result.fields)
// }
// createField();

  return (
  
    <div>
      <HomeNavBar/>
        <Routes>
          <Route path = "/" element={<HomePage/>}/>
          {/*Dakota- Warning, /form will give errors*/}
          {/*<Route path = "/form" element = {<CheckExample/>}/>*/}
          <Route path = "/CreateForm" element = {<FormPrototype/>}/>
          <Route path = "/Portal" element ={<Portal/>} />

          <Route path = "/OpenForm" element ={<FormSubmit/>} />
          <Route path = "/EmailBreach" element ={<EmailBreach/>} />
          <Route path = "/PasswordCheck" element ={<PasswordCheck/>} />
        </Routes>
    </div>
  );
}
  export default App;

