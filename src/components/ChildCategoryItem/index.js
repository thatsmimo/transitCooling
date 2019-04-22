import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Utils,Constants} from '@common'
import {Text} from '@components'

class CategoryItem extends React.Component {

  render(){
    let {item,onPress} = this.props
    let disabled = typeof item.children == 'undefined' || item.children == null || item.children.length == 0
    return (
      <TouchableOpacity onPress={()=>onPress(item)} disabled={disabled}>
        <Image source={{uri:Utils.getCategoryImageUrl(item)}} style={styles.image} />
        <View style={styles.bottomView}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
        </View>
      </TouchableOpacity>

    )
  }


}

export default CategoryItem
