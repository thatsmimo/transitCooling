import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Utils} from '@common'

class BrandItem extends React.Component {
  render(){
    let {item} = this.props
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={()=>Utils.openUrl(item.url)}>
        <Image source={{uri:item.image}} style={styles.image} />
      </TouchableOpacity>
    )
  }
}

export default BrandItem
