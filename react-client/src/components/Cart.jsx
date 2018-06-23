import React, { Component } from 'react'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }

    this.getCart = this.getCart.bind(this)
  }

  componentDidMount() {
    this.getCart()
  }

  getCart() {
    axios.get('/cart')
       .then((response) => {
          this.setState({cart: response.data})
       })
       .catch((err) => console.log('err from get cart', err))
}

  render() {
    return(
        <div>
          Cart
        {this.state.cart.map((item, i) => (
            <div key={i}>
              name: {item.meal}<br/>
              price: {item.price}<br/>
              quantity: {item.quantity}<br/>
              <img src={item.photoUrl}/><br/>
            </div>
          ))}
        </div>
    )
  }
}

export default Cart