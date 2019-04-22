import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import {Icons,Utils} from '@common'
import {Text} from '@components'

class WishListItem extends React.Component {
  render(){
    let {item,onRemove,onAddToCart} = this.props

    return (
      <View>
        <View style={styles.container}>
          <Image source={{uri:Utils.getProductImageUrl(item)}} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.name} >{item.name}</Text>
            <Text style={styles.sale_price}>${item.price}</Text>

            <View style={styles.row}>
              <TouchableOpacity style={styles.btnAdd} onPress={()=>onAddToCart(item)}>
                <Text style={styles.add}>{__.t('Add to Cart')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>onRemove(item)}>
                <Image source={Icons.Delete} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default WishListItem
