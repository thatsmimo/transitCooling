import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Icons, Config } from '@common'
import { Text } from '@components'

class ShippingMethods extends React.Component {
  state = {
    selected: ''
  }
  render() {
    let { shippingMethods } = this.props
    return (
      <View style={styles.container}>
        {shippingMethods.map((item, index) => item.available && this.renderItem(item, index))}
      </View>
    )
  }

  renderItem = (item, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => this.selectShippingMethod(item)} style={styles.item} activeOpacity={0.75}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.method_title}</Text>
          <Text style={styles.carrier}>{item.carrier_title} {Config.Currency.symbol}{item.amount}</Text>
        </View>

        <Image source={this.state.selected == item.method_code ? Icons.CheckCircle : Icons.UncheckCircle} style={[styles.icon, this.state.selected && styles.selectedIcon]} />
      </TouchableOpacity>
    )
  }

  selectShippingMethod = (item) => {
    this.setState({ selected: item.method_code })
    this.props.onSelectShippingMethod(item)
  }
}

export default ShippingMethods
