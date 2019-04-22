import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import { Icons, Config } from '@common'
import { PaymentMethods, Button } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import PayPal from 'react-native-paypal-wrapper'
PayPal.initialize(Config.PayPal.Environment, Config.PayPal.ClientId)

class PaymentInfo extends React.Component {
  state = {
    paymentMethod: null
  }

  render() {
    let { paymentMethods, type } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <PaymentMethods paymentMethods={paymentMethods} onSelectPaymentMethod={this.onSelectPaymentMethod} />
        </View>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.CREATE_ORDER_PENDING} />
      </SafeAreaView>
    )
  }

  onSelectPaymentMethod = (item) => {
    this.setState({ paymentMethod: item })
  }

  onSubmit = () => {
    let { paymentMethod } = this.state
    let { shippingAddress } = this.props

    if (paymentMethod == null) {
      alert("Please choose payment method.")
      return
    }

    if (paymentMethod.code == "paypal_express_bml" || paymentMethod.code == "paypal_express") {
      PayPal.pay({
        price: `${this.getPriceTotal()}`,
        currency: Config.Currency.code,
        description: 'Make payment from SOUK'
      })
        .then((confirm) => {
          this.props.createOrder(paymentMethod.code, shippingAddress)
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      this.props.createOrder(paymentMethod.code, shippingAddress)
    }


  }

  getPriceTotal = () => {
    var total = 0
    this.props.carts.forEach((item) => {
      total += item.price * item.qty
    })
    return total
  }

  componentWillReceiveProps(props) {
    if (props.type == ActionTypes.CREATE_ORDER_FAIL) {
      alert(props.message)
    }

    if (props.type == ActionTypes.CREATE_ORDER_SUCCESS) {
      alert(__.t('Successfully'))
      this.props.showCarts()
    }
  }
}

PaymentInfo.defaultProps = {
  paymentMethods: []
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    type: cartsReducers.type,
    message: cartsReducers.message,
    paymentMethods: cartsReducers.paymentMethods,
    shippingAddress: cartsReducers.shippingAddress,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo)
