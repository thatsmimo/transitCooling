import React from 'react'
import {Launch} from '@pages'
import {NavButton,NavTitle,HeaderSearch} from '@components'
import {Icons,Constants} from '@common'

class LaunchScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header:null
  })

  render(){
    const {navigation} = this.props
    return <Launch
            navigation={navigation}
            setLanguage={()=>navigation.navigate(Constants.Screen.SetLanguage)}
            showHome={()=>navigation.navigate(Constants.Screen.Home)}/>
  }
}

export default LaunchScreen
