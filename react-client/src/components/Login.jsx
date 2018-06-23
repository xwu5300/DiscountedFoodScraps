import React, { Component } from "react";
import ReactDOM from 'react-dom'
import App from '../index.jsx'
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import axios from 'axios'


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      badLogin: false
    };
    this.validateForm =this.validateForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeToSignup = this.changeToSignup.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    axios.post('/login', {
      username: this.state.email,
      password: this.state.password
    }).then((results) => {
      this.setState({username: '', password: ''});
      ReactDOM.render(<App />, document.getElementById("app"));
    }).catch((error) => {
      this.setState({
        badLogin: true
      });
      throw error;
    })
  }

  changeToSignup() {
    ReactDOM.render(<Signup />, document.getElementById("app"));
  }

  render() {
    let showAlert;
    if (this.state.badLogin === true) {
      showAlert =
      <Alert bsStyle="danger" onDismiss={() => this.setState({badLogin: false})}>
        <h4>There was an error logging in.</h4>
        <p>Please check your email or password and try again.</p>
      </Alert>
    }

    return (
    <div className='styleLogin' style={{backgroundImage: `url('<pathToBackgroundImage>')`, backgroundSize: 'cover', width: '100%', height: '100%', position:'absolute', backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
          <h1>EatMe</h1>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleSubmit}
          >
            Login
          </Button>
          <Button
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            onClick={this.changeToSignup}
          >
            New User? Sign Up!
          </Button> <br/>
          {showAlert}
        </form>
      </div>
    </div>
    );
  }
}