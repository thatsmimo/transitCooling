import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'

class Quantity extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quantity:props.qty
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftBtn} activeOpacity={0.75} onPress={this.decreaseQuantity}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantity}>
          <Text style={styles.text}>{this.state.quantity}</Text>
        </View>
        <TouchableOpacity style={styles.rightBtn} activeOpacity={0.75} onPress={this.increaseQuantity}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }

  componentWillReceiveProps(props){
    this.setState({quantity:props.qty})
  }

  decreaseQuantity = ()=>{
    if (this.state.quantity > 1) {
      let quantity = this.state.quantity - 1
      this.setState({quantity})
      this.props.onChangeQuantity(quantity)
    }
  }

  increaseQuantity = ()=>{
    let quantity = this.state.quantity + 1
    this.setState({quantity})
    this.props.onChangeQuantity(quantity)
  }
}

export default Quantity
