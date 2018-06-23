import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import ListItem from './components/ListItem.jsx'
import axios from 'axios'
import LoginPage from "./components/Login.jsx";
import { Route, Switch, withRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
{/*      <List items={this.state.items}/>*/}
      <Switch>
                <Route path="/login" component={LoginPage} />
          <Route path="/" component={ListItem} />

          {/* 404 must be last path to match any remaining paths */}
{/*          <Route path="/*" component={LoginPage} />*/}
        </Switch>
    </div>)
  }
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));

// axios.get('/checkLogin')
//       .then(status => {
//         if (!status.data.notLoggedIn) {
//           ReactDOM.render(<App />, document.getElementById("app"));
//         } else {
//           ReactDOM.render(<LoginPage />, document.getElementById("app"));
//         }
//       })