import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Icons } from '@common'
import { BlurView, VibrancyView } from 'react-native-blur';

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Text } from '@components'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  state = { viewRef: null }
  render() {
    const { signIn, email, signOut, customerInfo } = this.props
    let avatar = "https://media-mmdb.nationalgeographic.com/static-media/images/css_images/nationalGeographic_default_avatar.jpg"
    var name = null
    if (customerInfo && customerInfo.firstname != undefined && customerInfo.firstname != "" && customerInfo.lastname != undefined && customerInfo.lastname != "") {
      name = customerInfo.firstname + " " + customerInfo.lastname
    } else if (customerInfo) {
      name = customerInfo.email
    }
    return (
      <View style={styles.container}>
        {
          name &&
          <View style={styles.content}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity style={styles.btnSign} activeOpacity={0.75} onPress={signOut}>
              <Text style={styles.txtButton} >{__.t('Sign Out').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        }
        {
          !name &&
          <View style={styles.content}>
            <Text style={styles.welcome}>{__.t('Welcome')}</Text>
            <TouchableOpacity style={styles.btnSign} activeOpacity={0.75} onPress={signIn}>
              <Text style={styles.txtButton} >{__.t('Sign In').toUpperCase()}{' / '}{__.t('Sign Up').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }

}

function mapStateToProps({ authReducers }) {
  return {
    email: authReducers.email,
    message: authReducers.message,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
