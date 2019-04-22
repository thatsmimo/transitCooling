import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { Icons } from '@common'
import styles from './styles'

class ItemFilter extends React.Component {

  render() {
    const { title, onPress } = this.props
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Image source={Icons.DownArrow} style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default ItemFilter