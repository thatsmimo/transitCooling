import React from 'react'
import {MyOrders} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class MyOrdersScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('My Orders'),
  })

  render(){
    const {navigation} = this.props
    return <MyOrders navigation={navigation} />
  }
}

export default MyOrdersScreen
