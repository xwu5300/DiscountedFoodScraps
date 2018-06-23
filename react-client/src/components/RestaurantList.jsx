import React, { Component } from 'react'
import axios from 'axios'
import Restaurant from './Restaurant.jsx'
class RestaurantList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: []
    }
    this.getAllRestaurants = this.getAllRestaurants.bind(this)
    this.addId = this.addId.bind(this)
  }
  componentDidMount() {
    this.getAllRestaurants()
  }
  getAllRestaurants() {
    axios.get('/restaurant')
         .then((response) => {
            this.addId(response.data)
         })
  }
  addId(restaurants) {
    let list = []
    for (let key in restaurants) {
      restaurants[key].id = key
      list.push(restaurants[key])
    }
    this.setState({restaurants: list})
  }
  render() {
    console.log('this.stat', this.state)
    return (
        <div>
        {this.state.restaurants.map((restaurant, i) => (
            <div key={i} className="restaurant">
              <Restaurant restaurant={restaurant}/>
            </div>
          ))}
        </div>
    )
  }
}
export default RestaurantList