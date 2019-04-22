import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'

class SettingItem extends React.Component {
  render(){
    let {icon,title,onPress} = this.props
    return (

      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.separator}/>
      </TouchableOpacity>
    )
  }
}

export default SettingItem
