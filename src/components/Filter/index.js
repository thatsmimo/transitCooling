import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'

class Filter extends React.Component {
  render(){
    let {onShowCategories} = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={onShowCategories}>
          <Text style={styles.text}>{__.t("Category")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>{__.t("Price Range")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>{__.t("Brand")}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Filter
