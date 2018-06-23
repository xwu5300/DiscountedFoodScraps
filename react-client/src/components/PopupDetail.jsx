import React from 'react';
import axios from 'axios';

export default class PopupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: {},
    }
  }

  componentDidMount() {
    const url = `https://discountedfoodscraps.firebaseio.com/popups/${this.props.match.params.id}.json`;
    axios.get(url)
      .then(res => this.setState({ popup: res.data }));
  }

  render() {
    return (
      <div>
        <div>{this.state.popup.name}</div>
        <div>{this.state.popup.address}</div>
      </div>
    );
  }
}
