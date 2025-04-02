import { gapi } from 'gapi-script';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Popup from 'reactjs-popup';
import Row from 'react-bootstrap/esm/Row';
import RangeSlider from 'react-bootstrap-range-slider';
import { useEffect, useState, useReducer } from 'react';
import "./FormSubmitCss.css";
import $ from 'jquery';

var count=0;
var itemArray = ['aa'];
var documentTitle;
var formID;
var responderUriFormName;
var formIdsForResponses = [];

function ShowForm(){
    const [ value, setValue ] = useState();
    count = itemArray.length;
    //console.log(itemArray[0].title);
    if(itemArray[0].itemId!== undefined){
      var itemQuestionId = [];
      var itemArrayTitleArray = [];
      var itemQuestionType = [];
      for(var i = 0; i<itemArray.length; i++){
        if(itemArray[i].title !== undefined){
        itemArrayTitleArray.push(itemArray[i].title);
        }
        itemQuestionId.push(itemArray[i].questionItem.question.questionId);
        if(itemArray[i].questionItem.question.textQuestion!==undefined){
          itemQuestionType.push("textQuestion");
        }
        else if(itemArray[i].questionItem.question.choiceQuestion!==undefined){
          itemQuestionType.push("choiceQuestion");
        }
        }
        TryToLookAtForm();
      return(
        <div>
          <ul>{itemArray.map(item =>
          <div className='formBody'>
          <form action={'https://docs.google.com' + responderUriFormName +'/formResponse'} method="POST">  
            <Form.Label>{item.title}</Form.Label>
            <div>
            {item.questionItem.question.choiceQuestion!== undefined && item.questionItem.question.choiceQuestion.type === "DROP_DOWN" ? 
            <Form.Select>
              <option>Choose an option</option>
              <option value={item.questionItem.question.choiceQuestion.options[0].value}>{item.questionItem.question.choiceQuestion.options[0].value}</option>
              <option value={item.questionItem.question.choiceQuestion.options[1].value}>{item.questionItem.question.choiceQuestion.options[1].value}</option>
            </Form.Select> 
            : item.questionItem.question.choiceQuestion!== undefined && item.questionItem.question.choiceQuestion.type === "RADIO" ?
            <div>
            <Form.Check
              
                label={item.questionItem.question.choiceQuestion.options[0].value}
                name="group1"
                type="radio"
                id='a'
            />
            <Form.Check
              
              label={item.questionItem.question.choiceQuestion.options[1].value}
              name="group1"
              type="radio"
              id='b'
            />
            </div>
            : item.questionItem.question.choiceQuestion!== undefined && item.questionItem.question.choiceQuestion.type === "CHECKBOX" ?
            <div>
              <Form.Check
              
              label={item.questionItem.question.choiceQuestion.options[0].value}
              name="group1"
              type="checkbox"
              id='a'
          />
          <Form.Check
            
            label={item.questionItem.question.choiceQuestion.options[1].value}
            name="group1"
            type="checkbox"
            id='b'
          />
            </div>
            : item.questionItem.question.scaleQuestion!==undefined ? 
            <div>
              <Form.Group as={Row}>
                <Form.Label column sm="1">{item.questionItem.question.scaleQuestion.lowLabel}</Form.Label>
                <Col sm = "6">
                  <RangeSlider max={item.questionItem.question.scaleQuestion.high}  tooltip='auto' value={value} onChange={e => setValue(e.target.value)}  />
                </Col>
                <Form.Label column sm ="4">{item.questionItem.question.scaleQuestion.highLabel}</Form.Label>
              </Form.Group>
            </div>
            : item.questionItem.question.textQuestion!==undefined ? <div class='item'><input type='input' name={'entry.'+formIdsForResponses[count]} {...count++}></input> </div>
            : <h1>default</h1>}
            </div>
             <button type='submit' value="Join">Submit</button>
          </form>
          </div>)
          }
          </ul>
        </div>
      );
  }
}

function SubmitForm(){
  fetch(responderUriFormName, {
    method: "POST",
    headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
},
}
)
}

function TryToLookAtForm(){
  $.get('http://localhost:8010/proxy' + responderUriFormName + '/viewform', function(html) {
     // Loop through elements you want to scrape content from
  $(html).find(".Qr7Oae").each(function() {
    var stringThis = $(this).html();
    //console.log(stringThis);
    stringThis = stringThis.toString();
    console.log(stringThis);
    console.log(stringThis.length);
    var stringBuildUp = '';
    stringThis = stringThis.substring(60, 150);
    for(var i = 0; i<stringThis.length; i++){
      if(stringThis[i]==='1' || stringThis[i]=== '2' 
      ||stringThis[i]=== '3' ||stringThis[i]=== '4' ||stringThis[i]=== '5' ||
      stringThis[i]=== '6' ||stringThis[i]=== '7' ||stringThis[i]=== '8' ||stringThis[i] ==='9'){
        stringBuildUp = stringBuildUp.concat(stringThis[i]);
      }
    }
    console.log(stringThis);
    console.log(stringBuildUp);
    formIdsForResponses.push(stringBuildUp);
  });
  });
}


function GetFormStuff(e){
  e.preventDefault();
  gapi.client.setToken({access_token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token});
  gapi.client.request({
    path: 'https://forms.googleapis.com/v1/forms/'+formID,
    method: 'GET',
    authorization: sessionStorage.getItem("accessTokenCurrent")
  }).then(function(response){ console.log(response); documentTitle = JSON.parse(response.body).info.title; itemArray = JSON.parse(response.body).items; responderUriFormName = JSON.parse(response.body).responderUri; responderUriFormName = responderUriFormName.substring(23, (responderUriFormName.length-9)); console.log(responderUriFormName); TryToLookAtForm(); console.log(itemArray);},
      function(err) { console.log("oops!");});
    }

var loadForm = false;

function FormSubmit(){

  const MyForm = () => (
    <Form>
      <img src = {require('./seluLogo2.png').default} alt = "SELU Logo" height = {200} width = {300} />
      {documentTitle !== undefined ? <header className='formHeader'>{documentTitle}</header> : <header className='formHeader'>Loading...</header>}
    </Form>);
  
  const AskForFormID = () => (
    <div className='enterAFormButton'>
    <Button variant="Primary" type="submit" onClick={(e) => GetFormStuff(e)}>Submit</Button>
  </div>
  );


  const [loadFormLocal, setLoadFormLocal] = useState(false);
  const [formIDlocal, setFormIDLocal] = useState('');

  
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  setTimeout(handleClick, 5000);

  const handleFormIDChange = event => {
    setFormIDLocal(event.target.value);
    formID = formIDlocal;
  }

  useEffect(() => {
    formID = formIDlocal;
  }, [formIDlocal]);

  if(itemArray[0].title === undefined || itemArray.length===0){
        return(
          <div className='enterAForm'>
          <Form>
            <Form.Label>Enter a Form-ID to take a Form</Form.Label>
            <Form.Control type='text' onChange={event => handleFormIDChange(event)}></Form.Control>
            <AskForFormID/>
        </Form>
        </div>
        );
    }
    else{
      console.log(itemArray);
      return(
      <div>
        <MyForm/>
        <ShowForm/>
      </div>
      );
    }

}

export default FormSubmit