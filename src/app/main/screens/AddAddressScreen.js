import React from 'react'
import {AddAddress} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class AddAddressScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Add Address'),
  })

  render(){
    const {navigation} = this.props
    return <AddAddress navigation={navigation} goBack={()=>navigation.goBack()}/>
  }
}

export default AddAddressScreen
