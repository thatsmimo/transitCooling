import React from 'react'
import {PaymentInfo} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class PaymentInfoScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Payment Methods'),
  })

  render(){
    const {navigation} = this.props
    return <PaymentInfo navigation={navigation} showCarts={()=>navigation.popToTop()}/>
  }
}

export default PaymentInfoScreen
