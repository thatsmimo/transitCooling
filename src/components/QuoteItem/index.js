import React from 'react'
import {
  View,
  AsyncStorage,
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
import * as API from '@services';


class QuoteItem extends React.Component {
  render() {
    let { item, onRemove } = this.props
    console.log(item)
    return (
      <View>
        <View style={styles.container}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.name} >{item.name}</Text>
            <View style={styles.row}>
              <Text style={styles.quantity} >{__.t('Quantity')}:</Text>
              <Quantity qty={parseInt(item.qty)} onChangeQuantity={this.onChangeQuantity} />
            </View>
            {/* <Text style={styles.sale_price}>{Config.Currency.symbol}{item.price}</Text>
            {item.free_ship && <Text style={styles.freeShipping}>{__.t('Free Shipping')}</Text>} */}
            
            <TouchableOpacity onPress={() => this.removeItem(item.item_id)} style={styles.btnDelete}>
              <Image source={Icons.Delete} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }


  removeItem = async (itemId) => {
    var response = await API.deleteQuote(itemId);
    console.log(response);
    if (response.success == true) {
      var currentCount = this.props.quoteCounter-1 ; 
      if (currentCount == 0) {
        await AsyncStorage.removeItem('quoteId');
      }
      this.props.quoteCount(currentCount)
      this.props.refresh();
      alert('Quote Item is Removed')
    }
  }


  onChangeQuantity = async (qty) => {
    var response = await API.changeQtyToQuote(this.props.item.item_id, qty);
    console.log(response)
    // this.props.changeProductQuantity(this.props.item, qty)
  }
}

QuoteItem.defaultProps = {
  quoteCounter: 0
}

function mapStateToProps({ productsReducers, cartsReducers }) {
  return {
    reload: productsReducers.reload,
    quoteCounter: cartsReducers.quoteCount
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteItem)
