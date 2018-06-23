import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import axios from 'axios';

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
        <Image
          responsive
          src="https://firebasestorage.googleapis.com/v0/b/discountedfoodscraps.appspot.com/o/heroes%2FHero%20Home%20page.jpg?alt=media&token=24134335-417e-4c83-9946-48b7fe1341c6"
        />
        {this.renderPopups()}
      </div>
    );
  }
}
