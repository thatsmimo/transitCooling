import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import styles from './styles'


class SubCategoryItem extends React.Component {
  render() {
    const { item, active, onPress } = this.props
    return (
      <TouchableOpacity style={[styles.container, active && styles.active]} onPress={onPress} activeOpacity={0.75}>
        <Text style={[styles.text, active && styles.textActive]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
}


export default SubCategoryItem