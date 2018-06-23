import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import Form from "./components/Form.jsx";
import Navigation from './components/Navigation.jsx';
import RestaurantList from './components/RestaurantList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  render () {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/restaurants/submit' component={Form}/>
            <Route path='/restaurants' component={RestaurantList}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
