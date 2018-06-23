import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import {Jumbotron, Button} from 'react-bootstrap';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      popups: []
    };
  }

  componentDidMount() {
    this.getAllPopups();
  }

  getAllPopups() {
    axios.get('https://discountedfoodscraps.firebaseio.com/popups.json')
         .then((response) => {
            this.setState({ popups: response.data });
         })
  }

  renderPopups() {
    return this.state.popups.map((popup, i) => (
      <div key={i}>
        <div><Link to={`/popups/${i}`}>{popup.name}</Link></div>
        <div>{popup.address}</div>
      </div>
    ));
  }

  render() {
    return (
      <div>
{/*        <div className='styleLogin' style={{backgroundImage: `url("https://sc-events.s3.amazonaws.com/4413413/main.jpg")`, backgroundSize: 'cover', width: '100%', height: '90%', position:'absolute', backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
        </div>*/}
        <Jumbotron style={{backgroundImage: `url("https://sc-events.s3.amazonaws.com/4413413/main.jpg")`, backgroundSize: 'cover', width: '100%', height: '90%', position:'absolute', backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
  <h1 style ={{color: 'white', marginLeft: '200px', marginTop: '200px'}}>Scrap It!</h1>
  <p style ={{color: 'white', marginLeft: '200px'}}>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button style ={{color: 'red', marginLeft: '200px'}} >Learn more</Button>
  </p>
</Jumbotron>;
{/*        {this.renderPopups()}*/}
      </div>
    );
  }
}
