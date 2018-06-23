import React from 'react';
import { Link } from 'react-router-dom';
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
        {this.renderPopups()}
      </div>
    );
  }
}
