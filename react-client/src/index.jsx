import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import Form from "./components/Form.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {

  }

  render () {
    return (<div>
      <h1>Hello World</h1>
      <Form/>
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));