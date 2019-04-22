import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Icons, Constants, Utils } from '@common'
const Width = Constants.ScreenSize.width - 10
const Height = Width / 2
import { Text } from '@components'

class DealItem extends React.Component {
  static defaultProps = {
    small: true
  }
  render() {
    let { item, small, onPress } = this.props
    return (
      <TouchableOpacity style={[styles.container, { width: small ? Height : Width, height: Height }]} onPress={() => onPress(item)}>
        <ImageBackground source={{ uri: Utils.getCategoryImageUrl(item) }} style={styles.image} borderRadius={8}>
          <View style={styles.foreground}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}

export default DealItem
