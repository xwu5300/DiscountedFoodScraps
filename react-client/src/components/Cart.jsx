import React, { Component } from 'react'
import axios from 'axios'


class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.addId = this.addId.bind(this)
    this.getCart = this.getCart.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentDidMount() {
    this.getCart()
  }

  getCart() {
    axios.get('/cart')
       .then((response) => {
          this.addId(response.data)
       })
       .catch((err) => console.log('err from get cart', err))
  }
  addId(cart) {
    let list = []
    for (let key in cart) {
      cart[key].id = key
      list.push(cart[key])
    }
    this.setState({cart: list})
  }

  deleteItem(id) {
    axios.delete('/cart', {params: {id: id}})
    .then(() => {
      this.getCart()
    })
    .catch((err) => {
      console.log('err', err)
    })
  }

  render() {
    let total = 0
    return(
      <table className='ui inverted table'>
      <thead>
          <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Amount</th>
          </tr>
      </thead>
      <tbody>
          {this.state.cart.map((item, i) => {
            total += Number(item.quantity) * Number(item.price)
            return (
              <tr key={i} >
              <td>{item.meal}</td>
          <td>{item.quantity} 
          </td>
          <td>${item.price}</td>
          <td>
            <button onClick={() => this.deleteItem(item.id)}>Delete</button>
          </td>
          </tr>
          )})
          }
      </tbody>
      <tfoot>
          <tr>
          <th></th>
          <th></th>
          <th>Total   ${total}</th>
          <th></th>
      </tr></tfoot>
      </table>
    )
  }
}

export default Cart