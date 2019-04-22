import React from 'react'
import {MyAddress} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons,Global,Constants} from '@common'

class MyAddressScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('My Address Book'),
    headerRight: <NavButton icon={Icons.Add} style={{marginRight:10}} onPress={()=>navigation.navigate(Constants.Screen.AddAddress)}/>,
  })

  render(){
    const {navigation} = this.props
    return <MyAddress navigation={navigation} />
  }
}

export default MyAddressScreen
