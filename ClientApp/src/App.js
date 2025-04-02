import React, { Component } from 'react';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div className='home-Page'>
      <h1>LEO Forms</h1>
      <button>Create Form (Login with Google)</button>
      </div>
    );
  }
}
