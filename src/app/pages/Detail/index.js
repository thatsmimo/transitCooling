import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native'
import styles from './style'
import { Text, Products } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import * as API from '@services';

import { Utils, Config } from '@common'
import HTML from 'react-native-render-html'

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      loading : false,
    }
  }
  render() {
    let { products, navigation, showDetail } = this.props
    let product = navigation.state.params.product
    console.log(Utils.getCustomAttribute(product.custom_attributes, "make"))
    console.log(product);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading ?
          <ActivityIndicator size="large" />
          :
          <ScrollView>
            <Image source={{ uri: Utils.getProductImageUrl(product, "image") }} style={styles.image} />
            <View style={styles.separator} />
            <Text style={styles.name}>{product.name}</Text>
            {/* <Text style={styles.price}>{Config.Currency.symbol}{product.price}</Text> */}
            <View>
              <Text style={styles.price}>Description : {Utils.getCustomAttribute(product.custom_attributes, "description")}</Text>
              <Text style={styles.price}>Note : {Utils.getCustomAttribute(product.custom_attributes, "notes")}</Text>
            </View>

            <TouchableOpacity style={styles.addCart} onPress={this.addToQuote}>
              <Text style={styles.addCartText}>{'Add to Quote'}</Text>
            </TouchableOpacity>

            {products.length > 0 && <Products sectionTitle={('Related')} products={products} seeAll={false} onPress={showDetail} />}
            <HTML html={Utils.getCustomAttribute(product.custom_attributes, "description")} containerStyle={styles.description} />

          </ScrollView>
        }
            
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

  addToQuote = async () => {
    console.log(this.props.customerInfo)
    if(this.props.customerInfo == false) {
      var response = await this.props.getCustomerInfo()
    } else {
      this.setState({ loading: true});
      var response = await API.addItemToQuote(this.props.navigation.state.params.product.id, this.props.customerInfo.id)
      console.log(response)
      if(response.error == false) {
        alert(response.msg);
        await AsyncStorage.setItem('quoteId', response.quoteid);
        this.props.quoteCount();
        this.setState({ loading: false });
      }
    }
  }
}




Detail.defaultProps = {
  products: [],
  customerInfo: false
}

function mapStateToProps({ productsByCategoryReducers, authReducers, cartsReducers }) {
  console.log(cartsReducers)
  if (authReducers.type === "GET_CUSTOMER_INFO_FAIL") {
    alert('Sign in first');
  }
  return {
    customerInfo: authReducers.customerInfo,
    products: typeof productsByCategoryReducers.productsByCategory != "undefined" ? productsByCategoryReducers.productsByCategory.products : [],
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
