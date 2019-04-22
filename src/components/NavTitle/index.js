import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons} from '@common'

class NavTitle extends React.Component {
  render(){
    return (
      <View>
        <Image source={Icons.Logo} style={styles.icon}/>
      </View>
    )
  }
}

export default NavTitle
