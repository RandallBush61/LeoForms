//import { gapi } from 'gapi-script';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
//import { useEffect, useState } from 'react';
//import Button from 'react-bootstrap/Button';

import './breachq.css'

var email;
var url;
var urlbase = 'http://localhost:8010/proxy/api/v3/breachedaccount/';

function getBreach() {
    email = document.getElementById("emailBox").value;
    url = urlbase.concat("", email);

    fetch(url, {
        //mode: 'no-cors',
        method: 'GET',
        headers: {
            'hibp-api-key':'37aa9a8044454613b7fe4fe495f3f5df',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    }).then(response => {
        return response.json()
    })
    .then(data => {
        AppendData(data)
        //console.log(data)
    })
    .catch(error => {
        AppendData(0)
        console.warn(error)
    })
}

function AppendData(data) {
    var mainContainer = document.getElementById("breachData");
    var site = document.createElement("Form.Label");

    if (data == 0) {
        mainContainer.innerHTML = "Breaches: ";
        site.innerHTML = '0';
        mainContainer.appendChild(site);

        document.getElementById("breachData").style.visibility = "visible";

        //Hide button
        document.getElementsByClassName("dropdown")[0].style.display = 'none';
        
    } else if (data.length > 0) {
        //Display number of sites
        mainContainer.innerHTML = "Breaches: ";
        site.innerHTML = data.length;
        mainContainer.appendChild(site);
        document.getElementById("breachData").style.visibility = "visible";

        //Populate data
        populateData(data);
    } else {
        //If the box is blank
        mainContainer.innerHTML = "Please input an email!";

        //Hide button
        document.getElementsByClassName("dropdown")[0].style.display = 'none';
    }
}

function populateData(data) {
    //Show button and clear div from last time
    document.getElementById("dropdownDiv").innerHTML = "";
    document.getElementsByClassName("dropdown")[0].style.display = 'inline-block';

    var sites = document.getElementsByClassName("dropdown-content")[0];

    for (var i = 0; i < data.length; i++) {
        var a = document.createElement("a");
        a.innerHTML = data[i].Name;
        sites.appendChild(a);
    }
}

function EmailBreach() {
    return (
        <div class="mainDiv">
            <label class="breachLabel">If you don't know, input the email down below to check</label>
            <input id="emailBox" class="breachLabel"></input>
            <button variant="Primary" class="checkbtn" onClick={getBreach}>Check</button><br></br>
            <label id="breachData" class="breachLabel"></label>
            <div class="dropdown">
                <button id="breachButton" class="dropbtn">Sites</button>
                <div id="dropdownDiv" class="dropdown-content">
                </div>
            </div>
        </div>
    )
}

export default EmailBreach;