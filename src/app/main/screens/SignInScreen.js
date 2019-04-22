import React from 'react'
import {SignIn} from '@pages'
import {NavButton,NavTitle,HeaderSearch} from '@components'
import {Icons,Constants} from '@common'

class SignInScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header:null
  })

  render(){
    const {navigation} = this.props
    return <SignIn
            navigation={navigation}
            showHome={()=>navigation.navigate(Constants.Screen.Home)}
            signUp={()=>navigation.navigate(Constants.Screen.SignUp)}
            goBack={()=>navigation.goBack()}/>
  }
}

export default SignInScreen
