import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  I18nManager
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'

class LanguageItem extends React.Component {
  render(){
    let {item,selected,onPress} = this.props
    return (
      <TouchableOpacity onPress={()=>onPress(item)} style={styles.container} activeOpacity={0.75}>
          <Image source={item.icon} style={styles.flag} />
          <Text style={[styles.title, I18nManager.isRTL && {textAlign:'left'}]}>{item.text}</Text>
          <Image source={selected ? Icons.CheckCircle : Icons.UncheckCircle} style={[styles.icon,selected && styles.selectedIcon]} />
      </TouchableOpacity>
    )
  }
}

export default LanguageItem
