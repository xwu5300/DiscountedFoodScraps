import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import RestaurantList from './components/RestaurantList.jsx'
import Navigation from './components/Navigation.jsx';

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
      <Navigation />
      {/* <Form/> */}
      <RestaurantList/>
    </div>)
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
