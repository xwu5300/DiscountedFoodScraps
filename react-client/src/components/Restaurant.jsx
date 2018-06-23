import React, { Component } from 'react'
import Meal from './Meal.jsx'

class Restaurant extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
            name: {this.props.restaurant.name}<br/>
            address: {this.props.restaurant.address}<br/>
            phone: {this.props.restaurant.phone}<br/>
            meals :
            <div>
                {this.props.restaurant.meals.map((meal, i) => (
                    <div key={i} className="meal">
                    <Meal meal={meal}/>
                    </div>
                ))}
            </div>
        </div>
    )
  }
}

export default Restaurant
