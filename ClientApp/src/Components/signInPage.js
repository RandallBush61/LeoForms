import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

function SignInPage(){
    const [ profile, setProfile ] = useState([]);
    const clientId = "372360721408-3lne1a7i7pd8jbeno7ds5dj9907jhqe3.apps.googleusercontent.com"
  
    useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
   });
  
   
    const onSuccess = (res) => {
      setProfile(res.profileObj);
    };
  
    const onFailure = (err) => {
      console.log('failed', err);
    };
  
    /*const logOut = () => {
      setProfile(null);
    };
    */
  
    console.log(profile.name);
  
    if(profile.name===undefined){
      return (
        <body>
        <div className = 'container'>
          <h1 className='child'>LEO Forms</h1>
        </div>
        <p1 className = 'welcome-text'>Let your forms roar!</p1>
        <div className= 'login-button'>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
        </div>
        </body>
  
  
      );
    }
    else{
      return (
        <body>
        <div className = 'container'>
          <h1 className='child'>LEO Forms</h1>
        </div>
        <p1 className = 'welcome-text'>Let your forms roar!</p1>
        <div className= 'name'>
        <h1>name : {profile.name}</h1>
        </div>
        </body>
  
      );
    }
  }

  export default SignInPage;