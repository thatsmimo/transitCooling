import React from 'react'
import {ShippingAddress} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons,Constants} from '@common'

class ShippingAddressScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Shipping Address",
  })

  render(){
    const {navigation} = this.props
    return <ShippingAddress navigation={navigation} showShippingInfo={()=>navigation.navigate(Constants.Screen.ShippingInfo)} />
  }
}

export default ShippingAddressScreen
