import React from 'react'
import {SetLanguage} from '@pages'
import {NavButton,NavTitle,HeaderSearch} from '@components'
import {Icons,Constants} from '@common'

class SetLanguageScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header:null
  })

  render(){
    const {navigation} = this.props
    return <SetLanguage navigation={navigation} showHome={()=>navigation.navigate(Constants.Screen.Home)}/>
  }
}

export default SetLanguageScreen
