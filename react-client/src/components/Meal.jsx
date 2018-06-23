import React, { Component } from 'react'

class Meal extends Component {
  constructor(props) {
    super(props)
  } 

  render() {
      return (
        <div>
            dish: {this.props.meal.name}
            price: 
        </div>
      )
  }
}

export default Meal