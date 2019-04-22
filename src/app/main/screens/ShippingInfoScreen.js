import React from 'react'
import {ShippingInfo} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons,Constants} from '@common'

class ShippingInfoScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Shipping Methods'),
  })

  render(){
    const {navigation} = this.props
    return <ShippingInfo navigation={navigation} showPaymentInfo={()=>navigation.navigate(Constants.Screen.PaymentInfo)}/>
  }
}

export default ShippingInfoScreen
