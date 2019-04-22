import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import styles from './style'
import { Text, CartItem, Button } from '@components'
import { Config, Global, Constants } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class Carts extends React.Component {
  render() {
    let { carts, isRequesting } = this.props
    let total = this.getPriceTotal()
    return (
      <SafeAreaView style={styles.container}>
        {carts.length == 0 && this.renderEmptyList()}
        {carts.length > 0 && (
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item, index) => `${index}`}
            data={carts}
            renderItem={({ item }) => <CartItem item={item} onRemove={this.removeToCart} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
        {total > 0 && (
          <View>
            <Text style={styles.total}>{__.t('Total')}: {Config.Currency.symbol}{total}</Text>
            <Button title={__.t('Checkout')} loading={isRequesting} style={styles.btnCheckout} onPress={this.checkout} />
          </View>
        )}

      </SafeAreaView>
    )
  }

  renderEmptyList = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.message}>{__.t('Empty List')}</Text>
      </View>
    )
  }

  signOut = () => {
    this.props.signOut()
  }

  componentDidMount = () => {
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }

  removeToCart = (item) => {
    this.props.removeToCart(item)
  }

  getPriceTotal = () => {
    var total = 0
    this.props.carts.forEach((item) => {
      total += item.price * item.qty
    })
    return total
  }

  checkout = () => {
    this.isGetUserInfo = true
    this.props.getCustomerInfo(this.props.userToken)
  }

  componentWillReceiveProps(props) {
    if (props.type == ActionTypes.GET_CUSTOMER_INFO_FAIL && this.isGetUserInfo == true) {
      this.isLogin = true
      this.props.signIn()
    }

    if (props.type == ActionTypes.SIGN_IN_SUCCESS && this.isLogin == true) {
      this.isLogin = false
      this.isGetUserInfo = true
      setTimeout(() => {
        this.props.getCustomerInfo(props.userToken)
      }, 300)
    }

    if (props.type == ActionTypes.GET_CUSTOMER_INFO_SUCCESS && this.isGetUserInfo == true) {
      this.isGetUserInfo = false
      this.isCreateCart = true
      this.props.createCart()
    }

    if (props.cartType == ActionTypes.CREATE_CART_SUCCESS && this.isCreateCart == true) {
      this.isCreateCart = false
      this.isAddItems = true
      this.props.addItemsToCart(props.quoteId, props.carts)
    }

    if (props.cartType == ActionTypes.ADD_ITEMS_TO_CART_SUCCESS && this.isAddItems == true) {
      this.isAddItems = false
      this.props.showShippingAddress()
    }

    if (props.cartType == ActionTypes.ADD_ITEMS_TO_CART_FAIL || props.cartType == ActionTypes.CREATE_CART_FAIL) {
      alert(props.cartMessage)
    }
  }
}

Carts.defaultProps = {
  carts: [],
  type: false
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    reload: cartsReducers.reload,
    type: authReducers.type,
    userToken: authReducers.userToken,
    cartType: cartsReducers.type,
    cartMessage: cartsReducers.message,
    quoteId: cartsReducers.quoteId,
    isRequesting: authReducers.type == ActionTypes.GET_CUSTOMER_INFO_PENDING || cartsReducers.type == ActionTypes.CREATE_CART_PENDING || cartsReducers.type == ActionTypes.ADD_ITEMS_TO_CART_PENDING
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Carts)
