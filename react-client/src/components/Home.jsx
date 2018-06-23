import React from 'react';
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
        <div>{popup.name}</div>
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
