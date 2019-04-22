import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import styles from './style'
import { Text, Products } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Utils, Config } from '@common'
import HTML from 'react-native-render-html'

class Detail extends React.Component {
  render() {
    let { products, navigation, showDetail } = this.props
    let product = navigation.state.params.product
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={{ uri: Utils.getProductImageUrl(product, "image") }} style={styles.image} />
          <View style={styles.separator} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{Config.Currency.symbol}{product.price}</Text>

          <TouchableOpacity style={styles.addCart} onPress={this.addToCart}>
            <Text style={styles.addCartText}>{__.t('Add to Cart')}</Text>
          </TouchableOpacity>

          {products.length > 0 && <Products sectionTitle={__.t('Sponsored')} products={products} seeAll={false} onPress={showDetail} />}
          <HTML html={Utils.getCustomAttribute(product.custom_attributes, "description")} containerStyle={styles.description} />

        </ScrollView>

      </SafeAreaView>
    )
  }

  addToCart = () => {
    let product = this.props.navigation.state.params.product
    this.props.addToCart(product)
  }

  componentDidMount() {
    let product = this.props.navigation.state.params.product
    let category_ids = Utils.getCustomAttribute(product.custom_attributes, "category_ids")
    if (category_ids && category_ids.length > 0) {
      this.props.getProductsByCategory(category_ids[0], "", 0)
    }
  }
}

Detail.defaultProps = {
  products: []
}

function mapStateToProps({ productsByCategoryReducers }) {
  return {
    products: typeof productsByCategoryReducers.productsByCategory != "undefined" ? productsByCategoryReducers.productsByCategory.products : [],
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
