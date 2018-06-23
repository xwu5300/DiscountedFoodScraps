import React, { Component } from 'react'
import axios from 'axios'
// import Meal from './Meal.jsx'
class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
        qty: ''
      }
  
      this.updateQty = this.updateQty.bind(this)
      this.addItem = this.addItem.bind(this)
  }
  updateQty(e) {
    this.setState({qty: e.target.value})
  }
  addItem() {
    if (Number(this.state.qty) > Number(this.props.restaurant.quantity)) {
        window.alert('the quantity you enter is greater than maximum.')
    } else {
        if (Number(this.state.qty) === Number(this.props.restaurant.quantity)) {
            console.log('equal')
            axios.delete('/restaurant', {params: {id: this.props.restaurant.id}})
            .then(() => {
              this.props.getAllRestaurants()
            })
            .catch((err) => {
              console.log('err', err)
            })
        } else {
            axios.patch('/restaurant', {id: this.props.restaurant.id, qty: this.props.restaurant.quantity - this.state.qty})
            .then(() => {
                this.props.getAllRestaurants()
              })
              .catch((err) => {
                console.log('err', err)
              })
        }
        // axios.post('/cart', {qty: this.state.qty})
        // .then((res) => {
        //     console.log('posted')
        // })
    }
    this.setState({qty: ''})
  }
  render() {
    return (
        <div>
            name: {this.props.restaurant.name}<br/>
            address: {this.props.restaurant.address}<br/>
            phone: {this.props.restaurant.phone}<br/>
            meal: {this.props.restaurant.menu}<br/>
            price: {this.props.restaurant.price}<br/>
            quantity: {this.props.restaurant.quantity}<br/>
            <img src= {this.props.restaurant.photoUrl}/>
            qty <input
                    value={this.state.qty}
                    type='text'
                    onChange={(e) => {this.updateQty(e)}}
                    required
                    />
            <button onClick={this.addItem}>Buy</button>
        </div>
    )
  }
}
export default Restaurant