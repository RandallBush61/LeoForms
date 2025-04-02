import React, { useEffect, useState, useReducer } from "react";
import "./portal.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { gapi } from 'gapi-script';
import { Navigate } from "react-router-dom";
import Popup from "reactjs-popup";

var title;

  function loadClient() {
    gapi.client.setApiKey("AIzaSyBsGjaICtZoaD65YgQk-o_A4y-jJ94cizU");
    return gapi.client.load("https://forms.googleapis.com/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "372360721408-3lne1a7i7pd8jbeno7ds5dj9907jhqe3.apps.googleusercontent.com", scope: 'https://www.googleapis.com/auth/drive'});
  });
  // Make sure the client is loaded and sign-in is complete before calling this method.


  
  function GetFetch(){
    fetch(gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms',
      method: 'POST', 
      body: {
        "info" : {
          "title" : title,
          "documentTitle": title,
        }
      },
      headers: {
          "Content-type": "application/json",
      },
  }).then(function(response){
      console.log(response.result.formId);
      //return(response.result.formId);
      return sessionStorage.setItem("currentFormId", response.result.formId);
    },));
  }


  function createForm(){
    loadClient();
   //sessionStorage.setItem("currentFormId", GetFetch());
   GetFetch();
   // execute();
    
  }



function Portal() {

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  const [titleLocal, setTitleLocal] = useState('');

  const [showForm, setShowForm] = useState([false]);

  const handleTitleChange = event =>{
      setTitleLocal(event.target.value);
      title = titleLocal;
  }

  useEffect(() => {
    title = titleLocal;
    sessionStorage.setItem("currentFormTitle", title);
  }, [titleLocal]);

  const MyHeader = () =>(
    <header className="header">
      <p1>Hello User</p1>
    </header>
)

  const createThisForm = (res) =>{
    createForm();
    if(sessionStorage.getItem("currentFormId")!=null){
    setShowForm(true);
    }
    handleClick();
  }
  console.log(showForm);
  if(showForm[0]===false){
    return(
        <div>
          <MyHeader/>
        <div>
        <Popup trigger={<button className="create-button">Create a Form!</button>} position="top center">
          <div className="PopUpBackground">
          <Form.Label>Title</Form.Label>
          <Form.Control type = "text" onChange = {event => handleTitleChange(event)}/>
          <Button varient = "Primary" type = "submit" onClick={createThisForm}>Submit</Button>
          </div>
        </Popup>
    </div>
    </div>
    );
    }
   if(showForm===true){
    return(
      <Navigate to={'/CreateForm'}/>
     );
    }
  }

export default Portal;