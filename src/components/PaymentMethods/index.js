import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Icons } from '@common'
import { Text } from '@components'

class PaymentMethods extends React.Component {
  state = {
    selected: ''
  }
  render() {
    let { paymentMethods } = this.props
    return (
      <View style={styles.container}>
        {paymentMethods.map((item, index) => this.renderItem(item, index))}
      </View>
    )
  }

  renderItem = (item, index) => {
    console.log(item)
    let icon = null
    if (item.code == 'cashondelivery') {
      icon = Icons.Cash
    } else if (item.code == 'banktransfer') {
      icon = Icons.Bank
    } else if (item.code == 'checkmo') {
      icon = Icons.Money
    } else {
      icon = Icons.Cash
    }
    return (
      <TouchableOpacity key={index} onPress={() => this.selectPaymentMethod(item)} style={styles.item} activeOpacity={0.75}>
        <Image source={icon} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.title}</Text>
        </View>
        <Image source={this.state.selected == item.code ? Icons.CheckCircle : Icons.UncheckCircle} style={[styles.icon, this.state.selected && styles.selectedIcon]} />
      </TouchableOpacity>
    )
  }

  selectPaymentMethod = (item) => {
    this.setState({ selected: item.code })
    this.props.onSelectPaymentMethod(item)
  }
}

export default PaymentMethods
