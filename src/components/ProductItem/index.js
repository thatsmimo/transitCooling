import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Share
} from 'react-native'
import styles from './style'
import { Icons, Utils, Constants, Config } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Text } from '@components'

const ItemWidth = ((Constants.ScreenSize.width - 10) / 2) - 10
const ItemHeight = ItemWidth + 120

class ProductItem extends React.Component {

  static defaultProps = {
    wishlist: [],
    isVertical: false
  }

  render() {
    let { item, onPress, wishlist, isVertical } = this.props
    let percent = 1 - item.sale_price / item.price

    var verticalStyle = {}
    if (isVertical) {
      verticalStyle = {
        width: ItemWidth,
        height: ItemHeight,
        marginLeft: 10,
        marginTop: 10
      }
    }

    let currentPrice = Utils.getCurrentPrice(item)
    return (
      <TouchableOpacity style={[styles.container, verticalStyle]} onPress={() => onPress(item)}>
        <ImageBackground source={{ uri: Utils.getProductImageUrl(item) }} style={[styles.image, isVertical && { width: ItemWidth - 1, height: ItemWidth - 1 }]} resizeMode='contain'>
          {percent > 0 && (
            <View style={styles.percent}>
              <Text style={styles.percentText}>{Math.ceil(percent * 100)}% OFF</Text>
            </View>
          )}
        </ImageBackground>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
        <Text style={styles.price}>{Config.Currency.symbol}{currentPrice} {currentPrice != item.price && <Text style={styles.regular_price}>{Config.Currency.symbol}{item.price}</Text>}</Text>

        <View style={{ flex: 1 }} />
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={this.shareApp}>
            <Image source={Icons.Share} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addToCart}>
            <Image source={Icons.Cart} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addToWishList}>
            <Image source={wishlist.indexOf(item) > -1 ? Icons.FavoriteSelected : Icons.Favorite} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  addToWishList = () => {
    if (this.props.wishlist.indexOf(this.props.item) > -1) {
      this.props.removeToWishList(this.props.item)
    } else {
      this.props.addToWishList(this.props.item)
    }
  }

  addToCart = () => {
    this.props.addToCart(this.props.item)
  }

  shareApp = () => {
    Share.share({
      title: "Hubay",
      message: "Great App!!!",
      url: "https://www.hubay.net/"
    })
  }
}

function mapStateToProps({ productsReducers }) {
  return {
    wishlist: productsReducers.wishlist,
    reload: productsReducers.reload,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
