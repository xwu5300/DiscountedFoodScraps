import React from 'react';
import axios from 'axios';
import {FormControl, FormGroup, InputGroup, ControlLabel, Button, Label, HelpBlock} from 'react-bootstrap';
import Trigger from "./responsiveButton.jsx";
import {compose, withProps, lifecycle} from "recompose";
import {withScriptjs} from "react-google-maps";
import {StandaloneSearchBox} from "react-google-maps/lib/components/places/StandaloneSearchBox";
import GoogleSearchBox from "./autocomplete.jsx"
import LoginPage from './login.jsx'
import Dropzone from 'react-dropzone'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      title: '',
      description: '',
      address: '',
      estimatedValue: '',
      valueInptValidation: null,
      isClaimed: false,
      photoUrl: null
    }
    this.savePost = this.savePost.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.autocompleteHandler= this.autocompleteHandler.bind(this);
  }

  savePost(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('phone', this.state.phone)
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('isClaimed', this.state.isClaimed)
    formData.append('estimatedValue', this.state.estimatedValue)
    for (let key in this.state.address) {
      formData.append(key, this.state.address[key]);
    }
    if (this.state.photoUrl !== null) {
      this.state.photoUrl.forEach((photo) => formData.append('photoArray', photo));
    } else {
      formData.append('emptyPhoto', this.state.photoUrl);
    }

    axios.post('/savepost', formData)
      .then( (response) =>{
        if (response.data.notLoggedIn) {
          ReactDOM.render(<LoginPage />, document.getElementById("app"));
          return
        } else {
          this.clearFields();
          this.props.showModal();
        }
      })
      .catch(function(error) {
        console.log('There was an error saving this post.', error);
      })
  }
  clearFields() {
    this.setState({
      phone: '',
      title: '',
      description: '',
      address: '',
      isClaimed: false,
      photoUrl: null
    });
  }

  autocompleteHandler(locationObj) {
    this.setState({
      address:locationObj
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handlePhoto(photos) {
    this.setState({
      photoUrl: photos
    });
  }

  validateEstimate() {
    let val = this.state.estimatedValue
    let state = null
    if (!val.match(/[\d\.]/g) && val !== '') state = 'warning'

    if (state !== this.state.valueInptValidation) {
      this.setState({valueInptValidation: state})
    }

    return state
  }

  render() {
    let photos;
    if (this.state.photoUrl !== null) {
      photos = this.state.photoUrl.map((file) =>
        <p>
          {file.name}
        </p>
      )}
    //Here is where a user enters their posting. Ensure that the address input is a real address. Recommend using
    // google maps auto complete API to ensure this. Server will break if an inputted address is invalid (not a real address)


    //STATE INPUT: only accepts two chars (e.g, NY, CA) - if anything beyond two chars is submitted, this will not be saved to
    // the mySql database - this is a restriction set in the schema.

    //className="form formDonate"
    return (
      <div className="form formDonate">
          <form encType='multipart/form-data'>
          <div className="formFields">
          <ControlLabel>Post your donations</ControlLabel>

        <FormGroup>
          <FormControl
            id="title"
            type="text"
            value={this.state.title}
            placeholder="Title"
            onChange={this.handleChange}
          />
          <GoogleSearchBox  autocompleteHandler= {this.autocompleteHandler}/>
          <FormControl
            id="phone"
            type="text"
            value={this.state.phone}
            placeholder="Phone Number"
            onChange={this.handleChange}
          />
          <FormControl
            style={{height: '125px'}}
            id="description"
            type="text"
            value={this.state.description}
            placeholder="Description"
            onChange={this.handleChange}
          />
           <FormGroup
              controlId="estimatedValue"
              validationState={this.validateEstimate()}
            >
            <FormControl
              type="text"
              value={this.state.estimatedValue}
              placeholder="Estimated Value"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
              {this.state.valueInptValidation && <HelpBlock>should only be numbers</HelpBlock>}
            </FormGroup>
            <div className='dropzone'>
              <Dropzone onDrop={this.handlePhoto} accept='image/*' style={{width: '100%', height: '85px', borderRadius: '5px', border: '1px solid rgb(210, 210, 210)', overflow: 'auto'}}>
                <p>
                  <Label>Drop Your Photos or Click to Upload!</Label>
                </p>
                {photos}
              </Dropzone>
            </div>
          </FormGroup>
          </div>
          <div className="formButton"><Button onClick={this.savePost}>Submit</Button></div>
      </form>
      </div>
    );
  }
}

export default Form;