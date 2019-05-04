import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  AsyncStorage,
  I18nManager,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Text, Input, Button } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Icons } from '@common'

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    let { signUp, goBack, type } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Image source={Icons.Logo} style={styles.logo} />

        <View style={styles.content}>
          <Input
            placeholder={__.t('Email')}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize="none"
          />
          <View style={styles.separator} />
          <Input
            placeholder={__.t('Password')}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <Button title={__.t('Sign In')} style={styles.btnSignIn} loading={type == ActionTypes.SIGN_IN_PENDING} onPress={this.signIn} />
        <Text style={styles.text}>Do you have account with Transit Cooling?<Text style={styles.signUp} onPress={signUp}>{__.t('Sign Up')}</Text></Text>

        <TouchableOpacity style={styles.btnClose} onPress={goBack}>
          <Image source={Icons.Close} style={styles.closeIcon} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  signIn = () => {
    let { email, password } = this.state
    this.props.signInCustomer(email, password)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type == ActionTypes.SIGN_IN_FAIL) {
      alert(nextProps.message)
    }

    if (nextProps.type == ActionTypes.SIGN_IN_SUCCESS) {
      this.props.getCustomerInfo()
      this.props.goBack()
    }
  }

}

function mapStateToProps({ authReducers }) {
  return {
    type: authReducers.type,
    message: authReducers.message,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
