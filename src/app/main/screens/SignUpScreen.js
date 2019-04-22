import React from 'react'
import {SignUp} from '@pages'
import {NavButton,NavTitle,HeaderSearch} from '@components'
import {Icons,Constants} from '@common'

class SignUpScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header:null
  })

  render(){
    const {navigation} = this.props
    return <SignUp
            navigation={navigation}
            showHome={()=>navigation.navigate(Constants.Screen.Home)}
            goBack={()=>navigation.goBack()}/>
  }
}

export default SignUpScreen
