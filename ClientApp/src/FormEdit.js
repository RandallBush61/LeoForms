import { gapi } from 'gapi-script';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Popup from 'reactjs-popup';
import Row from 'react-bootstrap/esm/Row';
import RangeSlider from 'react-bootstrap-range-slider';
import { useEffect, useState, useReducer } from 'react';

import './FormEditcss.css'

//This function is going to be how we update the form.
//NEEDS THE FORM ID TO WORK

const clientId = "372360721408-3lne1a7i7pd8jbeno7ds5dj9907jhqe3.apps.googleusercontent.com";

const initClient = () => {
  gapi.client.init({
  clientId: clientId,
  scope: 'https://www.googleapis.com/auth/drive'
});
};

gapi.load('client:auth2', initClient);



var itemArray = ["placeholderData"];


var documentTitle;
var count = 0;
var title;
var scaleTitle;
var choiceTitle;
var choiceCount;
var lowValue;
var highValue;
var highLabel;
var lowLabel;
var optionValueOne;
var optionValueTwo;
var multiOptionRender;


function textUpdate(){
    gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
      method: 'POST',
      body: { "includeFormInResponse": false,
      "requests": [
        {
          "createItem": {
            "item": {
              "title" : title,
              "questionItem": {
                "question": {
                  "textQuestion": {
                    "paragraph": false
                  }
                }
              }
            },
            "location": {
              "index": count
            }
          }
        }
      ],
  },
      headers: {
        "Content-type": "application/json",
    },
}).then(function(response) {console.log(count); GetFormStuff(); return response.json;
     },            
        function(err) { console.error("form not created");}); count++;
    }

function multiUpdate(){
    gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
      method: 'POST',
      body: {"includeFormInResponse": false,
      "requests": [
        {
          "createItem": {
            "item": {
              "questionItem": {
                "question": {
                  "choiceQuestion": {
                    "options": [{
                      "value": optionValueOne
                    },
                      {
                        "value": optionValueTwo
                      }
                  ],
                  "type": multiOptionRender
                  }
                }
              },
              "title" : choiceTitle,
            },
            "location": {
              "index": count
            }
          }
        }
      ],},
      headers: {
        "Content-type": "application/json",
    },
}).then(function(response) {console.log(count); GetFormStuff(); return response.json;
      },            
        function(err) { console.error("form not created");}); count++;
    }

function scaleUpdate(){
      gapi.client.request({
        path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
        method: 'POST',
        body: {  "includeFormInResponse": false,
        "requests": [
          {
            "createItem": {
              "item": {
                "title" : scaleTitle,
                "questionItem": {
                  "question": {
                    "scaleQuestion": {
                      "low": lowValue,
                      "high": highValue,
                      "highLabel": highLabel,
                      "lowLabel": lowLabel,
      
                    }
                  }
                }
              },
              "location": {
                "index": count
              }
            }
          }
        ],},
        headers: {
          "Content-type": "application/json",
      },
  }).then(function(response) {console.log(count); GetFormStuff(); return response.json;
        },            
          function(err) { console.error("form not created");}); count++;
}

var formId;

   async function GetFormStuff(){

    await gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId"),
      method: 'GET'
    }).then(function(response){ console.log(response); documentTitle = JSON.parse(response.body).info.title; itemArray = JSON.parse(response.body).items; formId = JSON.parse(response.body).formId; console.log(itemArray);},
        function(err) { console.log("oops!");});
      }

      async function RenderForm() {
        var result = await GetFormStuff();
        console.log(itemArray);
        if(itemArray!== undefined && itemArray.length>0){
          console.log("Added item to the array");
        }
      }

      function ShowForm(){
        const [ value, setValue ] = useState(lowValue);
        if(itemArray[0].itemId!== undefined){
          count = itemArray.length;
        }
        else{
          count = 0;
        }
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

          return(
            <div>
              <ul>{itemArray.map(item =>
              <div className='formBody'>
                <Form.Label>{item.title}</Form.Label>
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
                : item.questionItem.question.textQuestion!==undefined ? <Form.Control></Form.Control>
                : <h1>default</h1>}
              </div>)
              }
              </ul>
              <Button></Button>
            </div>
          );
      /*    
        return(
          <div>
            <ul>{itemArrayTitleArray.map(item => 
               <div>
                <Form.Label key ={item}> {item}</Form.Label>
                <Form.Control type = "text"/>

                </div>)
                }</ul>

                <ul>{itemQuestionType.map(item => 
               <div>
                <Form.Label key ={item}> {item}</Form.Label>
                </div>)
                }</ul>
          </div>
        );
        */
      }
    }

      var itemQuestionType = [];
      if(itemArray[0].itemId!== undefined){
      for(var i = 0; i<itemArray.length; i++){
        if(itemArray[i].questionItem.question.textQuestion!==undefined){
          itemQuestionType.push("textQuestion");
        }
        else if(itemArray[i].questionItem.question.choiceQuestion!==undefined){
          itemQuestionType.push("choiceQuestion");
        }
      }
      }

      var itemNames = itemArray.map(({title}) => <h1>{title}</h1>);
      

      

     // setInterval(GetFormStuff, 3000);
      


//Dakota- This is a basic prototype form consisting of text boxes asking for basic information such as email, first and last name, and favorite food
//The goal for the futre is to impliment images, videos, and a code editor to execute programs, as well as processes that allow for consistency 
//when taking in data, for example making sure the first letter is capitalized
function FormPrototype() {

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
    RenderForm();
  }

  setTimeout(handleClick, 5000);

  const [highLabelLocal, setHighLabelLocal] = useState('');
  const [lowLabelLocal, setLowLabelLocal] = useState('');
  const [highValueLocal, setHighValueLocal] = useState('');
  const [lowValueLocal, setLowValueLocal] = useState('');
  const [optionOneValueLocal, setOptionOneValueLocal] = useState('');
  const [optionTwoValueLocal, setOptionTwoValueLocal] = useState('');
  const [titleLocal, setTitleLocal] = useState('');
  const [descriptionLocal, setDescriptionLocal] = useState('');
  const [multiOptionRenderLocal, setMultiRender] = useState('');
  const [scaleTitleLocal, setScaleTitleLocal] = useState('');
  const [choiceTitleLocal, setChoiceTitleLocal] = useState('');

  useEffect(() => {
    highLabel = highLabelLocal;
    console.log("highlabel changed!");
  }, [highLabelLocal]);

  useEffect(() => {
    lowLabel = lowLabelLocal;
  }, [lowLabelLocal]);

  useEffect(() => {
    highValue = highValueLocal;
  }, [highValueLocal]);

  useEffect(() => {
    lowValue = lowValueLocal;
  }, [lowValueLocal]);

  useEffect(() => {
    title = titleLocal;
  }, [titleLocal]);

  useEffect(() => {
    optionValueOne = optionOneValueLocal;
  }, [optionOneValueLocal]);

  useEffect(() => {
    optionValueTwo = optionTwoValueLocal;
  }, [optionTwoValueLocal]);

  useEffect(() => {
    multiOptionRender = multiOptionRenderLocal;
  }, [multiOptionRenderLocal]);

  useEffect(() => {
    scaleTitle = scaleTitleLocal;
  }, [scaleTitleLocal]);

  useEffect(() => {
    choiceTitle = choiceTitleLocal;
  }, [choiceTitleLocal]);

  const handleTitleChange = event => {
    setTitleLocal(event.target.value);
    title = titleLocal;
  }
  
  const handleOptionTitleChange = event => {
    setChoiceTitleLocal(event.target.value);
    choiceTitle = choiceTitleLocal;
  }

  const handleHighLabelChange = event => {
    setHighLabelLocal(event.target.value);
    highLabel = highLabelLocal;
  }

  const handleLowLabelChange = event => {
    setLowLabelLocal(event.target.value);
    lowLabel = lowLabelLocal;
  }

  const handleHighValueChange = event => {
    setHighValueLocal(event.target.value);
    highValue = highValueLocal;
  }

  const handleLowValueChange = event => {
    setLowValueLocal(event.target.value);
    lowValue = lowValueLocal;
  }

  const handleOptionOneChange = event =>{
    setOptionOneValueLocal(event.target.value);
    optionValueOne = optionOneValueLocal;
  }

  const handleOptionTwoChange = event =>{
    setOptionTwoValueLocal(event.target.value);
    optionValueTwo = optionTwoValueLocal;
  }

  const handleMultiRenderChange = event => {
    setMultiRender(event.target.value);
    multiOptionRender = multiOptionRenderLocal;
  }

  const handleScaleTitleChange = event => {
    setScaleTitleLocal(event.target.value);
    scaleTitle = scaleTitleLocal;
  }

  const MyForm = () => (
    <Form>
      <img src = {require('./seluLogo2.png').default} alt = "SELU Logo" height = {200} width = {300} />
      {documentTitle !== undefined ? <header className='formHeader'>{documentTitle}</header> : <header className='formHeader'>Loading...</header>}
      {formId !== undefined ? <p1 className='linkForForm'>{"Share this for others to take the form: " +formId}</p1> : <h1></h1>}
      
    </Form>);
  
  console.log(sessionStorage.getItem("currentFormId"));
  console.log(itemArray);
  if(itemArray === undefined || itemArray.length===0){
  return (
    <div>
    <MyForm/>
    
    <div className='buttons'>

      <Popup trigger={<Button className = "CreateTextQuestion"> Create Text Question</Button>} position="left center">
           <div className = "FormPopUpBackground">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange={event => handleTitleChange(event)}/>
            <Button variant="Primary" type="submit" onClick={textUpdate}>Create</Button>
           </div> 
      </Popup>

      <Popup trigger={<Button className = "CreateMultiQuestion"> Create Multi-choice Question</Button>} position="left center">
           <div className = "FormPopUpBackground">
            <Form.Label>Option Type</Form.Label>
            <Form.Select id = "optionOneLocal" onChange={event => handleMultiRenderChange(event)}>
              <option>Choose how the question is rendered</option>
              <option value="RADIO">Radio</option>
              <option value="CHECKBOX">Checkbox</option>
              <option value="DROP_DOWN">Drop-down</option>
            </Form.Select>
            <Form.Label>Option 1</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionOneChange(event)}/>
            <Form.Label>Option 2</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionTwoChange(event)}/>
            <Button variant="Primary" type="submit" onClick={multiUpdate}>Create</Button>
           </div> 
      </Popup>

      <Popup trigger={<Button className = "CreateScaleQuestion"> Create Scale Question</Button>} position="left center">
           <div className = "FormPopUpBackground">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange = {event => handleScaleTitleChange(event)}/>
            <Form.Label>High Label</Form.Label>
            <Form.Control id = "highLabelLocal" type = "text" onChange = {event => handleHighLabelChange(event)}/>
            <Form.Label>Low Label</Form.Label>
            <Form.Control id = "lowLabelLocal" type = "text" onChange ={event => handleLowLabelChange(event)}/>
            <Form.Label>High value</Form.Label>
            <Form.Control id = "highValueLocal" type = "text" onChange={event => handleHighValueChange(event)}/>
            <Form.Label>Low value</Form.Label>
            <Form.Control id = "lowValueLocal" type = "text" onChange={event => handleLowValueChange(event)}/>
            <Button variant="Primary" type="submit" onClick={scaleUpdate}>Create</Button>
           </div> 
      </Popup>
    </div>
    </div>
  );
  }

  if(itemArray.length>0){
    return(
      <div>
    <MyForm/>
    <ShowForm></ShowForm>
    
    <div className='buttons'>

      <Popup trigger={<Button className = "CreateTextQuestion"> Create Text Question</Button>} position="left center">
           <div className = "FormPopUpBackground">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange={event => handleTitleChange(event)}/>
            <Button variant="Primary" type="submit" onClick={textUpdate}>Create</Button>
           </div> 
      </Popup>

      <Popup trigger={<Button className = "CreateMultiQuestion"> Create Multi-choice Question</Button>} position="left center">
           <div className = "FormPopUpBackground">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionTitleChange(event)}/>
            <Form.Label>Option Type</Form.Label>
            <Form.Select id = "optionOneLocal" onChange={event => handleMultiRenderChange(event)}>
              <option>Choose how the question is rendered</option>
              <option value="RADIO">Radio</option>
              <option value="CHECKBOX">Checkbox</option>
              <option value="DROP_DOWN">Drop-down</option>
            </Form.Select>
            <Form.Label>Option 1</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionOneChange(event)}/>
            <Form.Label>Option 2</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionTwoChange(event)}/>
            <Button variant="Primary" type="submit" onClick={multiUpdate}>Create</Button>
           </div> 
      </Popup>

      <Popup trigger={<Button className = "CreateScaleQuestion"> Create Scale Question</Button>} position="left center">
           <div className = "PopUpBackground">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange = {event => handleScaleTitleChange(event)}/>
            <Form.Label>High Label</Form.Label>
            <Form.Control id = "highLabelLocal" type = "text" onChange = {event => handleHighLabelChange(event)}/>
            <Form.Label>Low Label</Form.Label>
            <Form.Control id = "lowLabelLocal" type = "text" onChange ={event => handleLowLabelChange(event)}/>
            <Form.Label>High value</Form.Label>
            <Form.Control id = "highValueLocal" type = "text" onChange={event => handleHighValueChange(event)}/>
            <Form.Label>Low value</Form.Label>
            <Form.Control id = "lowValueLocal" type = "text" onChange={event => handleLowValueChange(event)}/>
            <Button variant="Primary" type="submit" onClick={scaleUpdate}>Create</Button>
           </div> 
      </Popup>
    </div>
    </div>
    );
  }
  
}

export default FormPrototype;