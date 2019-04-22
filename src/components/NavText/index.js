import React from 'react'
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native'
import styles from './style'
import { Text } from '@components'

class NavText extends React.Component {
  static defaultProps = {
    icon: null,
    right: false,
    left: false
  }

  render() {
    let { title, onPress, icon, right, left, style } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, right && { marginRight: 10 }, left && { marginLeft: 10 }, style]} activeOpacity={0.75}>
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
  }

}

export default NavText
