import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'

class NavButton extends React.Component {
  render(){
    let {icon,onPress,style} = this.props
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Image source={icon} style={styles.icon}/>
      </TouchableOpacity>
    )
  }
}

export default NavButton
