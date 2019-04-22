import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from '../index'
import styles from './styles'

class HeaderLeftMenu extends React.PureComponent {
  render() {
    const { customerInfo, onLogout, onLogin } = this.props
    var avatar = "https://media-mmdb.nationalgeographic.com/static-media/images/css_images/nationalGeographic_default_avatar.jpg"
    var name = null
    if (customerInfo && customerInfo.firstname != undefined && customerInfo.firstname != "" && customerInfo.lastname != undefined && customerInfo.lastname != "") {
      name = customerInfo.firstname + " " + customerInfo.lastname
    } else if (customerInfo) {
      name = customerInfo.email
    }
    return (
      <View style={styles.container}>
        {
          customerInfo == null ?
            <View style={styles.header}>
              <Text style={styles.textheader}>{__.t('Welcome')}</Text>
              <TouchableOpacity activeOpacity={0.75} style={styles.btn} onPress={onLogin}>
                <Text style={styles.textBtn}>{__.t('Sign In')} / {__.t('Sign Up')}</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={styles.headerLogged}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{name}</Text>
                <TouchableOpacity activeOpacity={0.75} style={styles.btnLogout} onPress={onLogout}>
                  <Text style={styles.txtLogout}>{__.t('Sign Out')}</Text>
                </TouchableOpacity>
              </View>
            </View>
        }
      </View >
    )
  }
}

export default HeaderLeftMenu