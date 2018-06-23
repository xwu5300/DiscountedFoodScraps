import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import Form from "./components/Form.jsx";
import Navigation from './components/Navigation.jsx';
import PopupDetail from './components/PopupDetail.jsx';
import RestaurantList from './components/RestaurantList.jsx'
import Cart from './components/Cart.jsx'

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
            <Route path='/restaurants/submit' component={Form}/>
            <Route path='/restaurants' component={RestaurantList}/>
            <Route path='/popups/:id' component={PopupDetail}/>
            <Route path='/cart' component={Cart}/>
            <Route exact path='/' component={Home}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
