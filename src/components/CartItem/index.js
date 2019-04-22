import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import { Icons, Utils, Config } from '@common'
import { Text, Quantity } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class CartItem extends React.Component {
  render() {
    let { item, onRemove } = this.props

    return (
      <View>
        <View style={styles.container}>
          <Image source={{ uri: Utils.getProductImageUrl(item) }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.name} >{item.name}</Text>
            <View style={styles.row}>
              <Text style={styles.quantity} >{__.t('Quantity')}:</Text>
              <Quantity qty={item.qty} onChangeQuantity={this.onChangeQuantity} />
            </View>
            <Text style={styles.sale_price}>{Config.Currency.symbol}{item.price}</Text>
            {item.free_ship && <Text style={styles.freeShipping}>{__.t('Free Shipping')}</Text>}

            <TouchableOpacity onPress={() => onRemove(item)} style={styles.btnDelete}>
              <Image source={Icons.Delete} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  onChangeQuantity = (qty) => {
    this.props.changeProductQuantity(this.props.item, qty)
  }
}

function mapStateToProps({ productsReducers }) {
  return {
    reload: productsReducers.reload
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
