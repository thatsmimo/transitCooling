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
import {Text,Input,Button} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import {Icons} from '@common'

class SignUp extends React.Component {
  state = {
    firstname:'',
    lastname:'',
    email:'',
    password:''
  }

  render(){
    let {goBack,type} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Image source={Icons.Logo} style={styles.logo}/>
        <View style={styles.content}>
          <Input
            placeholder={__.t('First Name')}
            value={this.state.firstname}
            onChangeText={(firstname)=>this.setState({firstname})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Last Name')}
            value={this.state.lastname}
            onChangeText={(lastname)=>this.setState({lastname})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Email')}
            value={this.state.email}
            onChangeText={(email)=>this.setState({email})}
            autoCapitalize="none"
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Password')}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password)=>this.setState({password})}
            />
        </View>
        <Button title={__.t('Sign Up')} style={styles.btnSignUp} loading={type == ActionTypes.SIGN_UP_PENDING} onPress={this.signUp}/>

        <TouchableOpacity style={styles.btnClose} onPress={goBack}>
          <Image source={Icons.Close} style={styles.closeIcon}/>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  signUp = ()=>{
    let {firstname,lastname,email,password} = this.state
    this.props.signUpCustomer(firstname,lastname,email,password)
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    if (nextProps.type == ActionTypes.SIGN_UP_FAIL) {
      alert(nextProps.message)
    }

    if (nextProps.type == ActionTypes.SIGN_UP_SUCCESS) {
      alert(__.t('Successfully'))
      this.props.goBack()
    }
  }

}

function mapStateToProps({authReducers}){
  return {
      type:authReducers.type,
      message:authReducers.message,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
