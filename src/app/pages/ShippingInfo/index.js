import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {ShippingMethods,Button} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class ShippingInfo extends React.Component {
  state = {
    shippingMethod:null
  }

  render(){
    let {shippingMethods,type} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ShippingMethods shippingMethods={shippingMethods} onSelectShippingMethod={this.onSelectShippingMethod} />
        </View>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.SET_SHIPPING_INFO_PENDING}/>
      </SafeAreaView>
    )
  }

  onSelectShippingMethod = (item) => {
    this.setState({shippingMethod:item})
  }

  onSubmit = ()=>{
    let {shippingMethod} = this.state
    let {shippingAddress} = this.props

    if (shippingMethod == null) {
      return alert(__.t('Please choose shipping method'))
    }

    let params = {
      addressInformation:{
        shipping_address:shippingAddress,
        billing_address: shippingAddress,
        shipping_carrier_code: shippingMethod.carrier_code,
        shipping_method_code: shippingMethod.method_code
      }
    }
    this.props.setShippingInfo(params)
  }

  componentWillReceiveProps(props){
    if (props.type == ActionTypes.SET_SHIPPING_INFO_FAIL) {
      alert(props.message)
    }

    if (props.type == ActionTypes.SET_SHIPPING_INFO_SUCCESS) {
      this.props.showPaymentInfo()
    }
  }
}

ShippingInfo.defaultProps = {
  shippingMethods:[]
}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    type:cartsReducers.type,
    message:cartsReducers.message,
    shippingMethods:cartsReducers.shippingMethods,
    shippingAddress:cartsReducers.shippingAddress,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ShippingInfo)
