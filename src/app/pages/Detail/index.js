import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  ImageBackground,
  StyleSheet
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
      loader : true,
      makeList : [],
      modelList : [],
      coreList : []
    }
  }

  make = (attribute) => {
    var data = this.state.makeList.find(data => data.value === Utils.getCustomAttribute(attribute, "make"))
    if (typeof data != 'undefined') {
      return data.label
    } else {
      return 'NO'
    }
    
  }


  model = (attribute) => {
    var data = this.state.modelList.find(data => data.value === Utils.getCustomAttribute(attribute, "model"))
    if (typeof data != 'undefined') {
      return data.label
    } else {
      return 'NO'
    }
  }

  core = (attribute) => {
    var data = this.state.coreList.find(data => data.value === Utils.getCustomAttribute(attribute, "core"))
    if (typeof data != 'undefined') {
      return data.label
    } else {
      return 'NO'
    }
  }

  render() {
    let { products, navigation, showDetail } = this.props
    let product = navigation.state.params.product
    console.log("product => ",product);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loader ?
          <View style={[style.container, style.horizontal]}>
            <ActivityIndicator size="large" color='#f8b020' />
          </View>
          :
          <ScrollView>
            <ImageBackground style={{flex:1}} source={require('../../../../assets/images/main_bg.png')} >
              <Image source={{ uri: Utils.getProductImageUrl(product, "image") }} style={styles.image} />
              <View style={styles.separator} />
              <Text style={styles.name}>{product.name}</Text>
              {/* <Text style={styles.price}>{Config.Currency.symbol}{product.price}</Text> */}
              <View>
                <Text style={styles.price}>Description : {Utils.getCustomAttribute(product.custom_attributes, "description")}</Text>
                <Text style={styles.price}>Note : {(Utils.getCustomAttribute(product.custom_attributes, "notes")) ? Utils.getCustomAttribute(product.custom_attributes, "notes") : 'NOs' }</Text>
                <Text style={styles.price}>Make : {this.make(product.custom_attributes)}</Text>
                <Text style={styles.price}>Model : {this.model(product.custom_attributes)}</Text>
                <Text style={styles.price}>Core : {this.core(product.custom_attributes)}</Text>
              </View>

              <TouchableOpacity style={styles.addCart} onPress={this.addToQuote}>
                <Text style={styles.addCartText}>{'Add to Quote'}</Text>
              </TouchableOpacity>

              {products.length > 0 && <Products sectionTitle={('Related')} products={products} seeAll={false} onPress={showDetail} />}
              {/* <HTML html={Utils.getCustomAttribute(product.custom_attributes, "description")} containerStyle={styles.description} /> */}
            </ImageBackground>
          </ScrollView>
        }
            
      </SafeAreaView>
    )
  }

  addToCart = () => {
    let product = this.props.navigation.state.params.product
    this.props.addToCart(product)
  }

  async componentDidMount() {
    var makeList = await API.getAttributesList('make');
    this.setState({ makeList: makeList.options});

    var modelList = await API.getAttributesList('model');
    this.setState({ modelList: modelList.options });

    var coreList = await API.getAttributesList('core');
    this.setState({ coreList: coreList.options });
    this.setState({loader : false})
    let product = this.props.navigation.state.params.product
    let category_ids = Utils.getCustomAttribute(product.custom_attributes, "category_ids")
    if (category_ids && category_ids.length > 0) {
      this.props.getProductsByCategory(category_ids[0], "", 0)
    }
  }

  addToQuote = async () => {
    console.log('props', this.props)
    if(this.props.customerInfo == false) {
      var response = await this.props.getCustomerInfo()
    } else {
      this.setState({ loading: true});
      var response = await API.addItemToQuote(this.props.navigation.state.params.product.id, this.props.customerInfo.id)
      console.log(response)
      if(response.error == false) {
        alert(response.msg);
        await AsyncStorage.setItem('quoteId', response.quoteid);
        this.props.quoteCount(this.props.quoteCounter + 1);
        this.setState({ loading: false });
      }
    }
  }
}




Detail.defaultProps = {
  products: [],
  customerInfo: false,
  quoteCounter : 0
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

function mapStateToProps({ productsByCategoryReducers, authReducers, cartsReducers }) {
  console.log('cart ', cartsReducers)
  if (authReducers.type === "GET_CUSTOMER_INFO_FAIL") {
    alert('Sign in first');
  }

  return {
    quoteCounter: cartsReducers.quoteCount,
    customerInfo: authReducers.customerInfo,
    products: typeof productsByCategoryReducers.productsByCategory != "undefined" ? productsByCategoryReducers.productsByCategory.products : [],
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
