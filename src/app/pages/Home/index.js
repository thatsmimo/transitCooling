import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  ActivityIndicator,
  ImageBackground,
  Text,
  Image,
} from "react-native";
import styles from './style'
import { SearchBar, Promotions, BrowserByCategory, Brands, Products } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Config, Constants, Global } from '@common'

const TEXT1 = "Transit Cooling Solutions represents a worldwide network that specializes in heat transfer products, primarily engine and transmission cooling for transit bus. Come to us first with your cooling system problem. We will provide you with the most durable yet cost effective solution. We represent the cutting edge of manufacturing and engineering expertise, solving engine cooling issues on every continent in every environment.";
const TEXT2 = "No problem is too tough to conquer.";
const TEXT3 = "Our manufacturing facilities produce Quality Assured products which meet or exceed OE specifications, and hold a variety of International Accreditations including ISO 9001:2008, U Stamp, R Stamp, CE Marking and NB Stamp.";
const TEXT4 = "Transit Cooling Solutions has developed a superior line of cooling products that are designed to keep you equipment moving down the road. TCS understands the severe duty service that your vehicles are exposed to, the tight time lines that you are forced to work under to maintain your vehicles as well as the lean budgets that you must adhere to. Welcome to the premier supplier of cooling products in your industry and the web site that will be your first stop to keep your fleet in motion!";
const TEXT5 = "Transit Cooling Solutions has developed and sourced the most comprehensive line or cooling products in the market specifically for school bus applications. We understand that when school is in, the buses have to be moving students, you can’t afford to have down time. With us, you can ensure that the kids arrive on time! Welcome to the premier supplier of cooling products in your industry. This web site will be your first stop to keep your fleet in motion!"


class Home extends React.Component {
  state = {
    loading: true,
  }

  render() {
    let { categories, homeProducts, showDetail, openProductsByCategory } = this.props
    if (homeProducts.length == 0 && this.state.loading) {
      return <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Promotions promotions={Config.Promotions} onPress={this.openPromotion} />
            <ImageBackground source={require('../../../../assets/images/main_bg.png')} style={styles.imageBackground} >
              <View style={[{paddingTop:15},styles.categoryText]}>
                <Text style={styles.categoryButton}>TRANSIT BUS</Text>
                <Text style={styles.categoryButton}>COACH BUS</Text>
                <Text style={styles.categoryButton}>SCHOOL BUS</Text>
                <Text style={styles.categoryButton}>COMPLETE RADIATORS</Text>
                <Text style={styles.categoryButton}>CHARGE AIR COOLERS</Text>
                <Text style={styles.categoryButton}>COMPLETE ASSEMBLIES</Text>
                <Text style={styles.categoryButton}>HEATER PARTS</Text>
              </View>
              <View>
                <Text style={styles.paragraph}>{TEXT1}</Text>
                <Text style={styles.yellowText}>{TEXT2}</Text>
                <Text style={styles.paragraph}style={styles.paragraph}>{TEXT3}</Text>
              </View>
              <Image style={{marginTop:8,marginBottom:8}} source={require('../../../../assets/images/brand_logos.png')} />
              <View style={styles.imageBackground1}> 
                <Text style={{textAlign:'center',color:"black",fontSize:28,fontWeight:"700",marginBottom:8}}>- MEMBERS OF -</Text>
                <Image source={require('../../../../assets/images/UMC.png')} />
                <Image source={require('../../../../assets/images/OPTA.png')} />
                <Image source={require('../../../../assets/images/OMCA.png')} />
              </View>
            </ImageBackground>
            <ImageBackground style={styles.imageBackgroud2} source={require('../../../../assets/images/second_part_img.jpg')}>
              <View style={{ backgroundColor:'rgba(0,0,0,0.6)',height:400}}>
                <Text style={{ fontSize: 32, color: '#fff', marginTop: 30, marginLeft: 18 }}>HIGHWAY COACH TRANSIT BUS RADIATORS</Text>
                <Text style={{ color: '#fff', marginTop: 25, marginLeft: 15 }}>{TEXT4}</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={styles.imageBackgroud2} source={require('../../../../assets/images/second_part_img2.jpg')}>
              <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', height: 400 }}>
                <Text style={{ fontSize: 32, color: '#fff', marginTop: 40, marginLeft: 18 }}>SCHOOL BUS RADIATORS</Text>
                <Text style={{ color: '#fff', marginTop: 25, marginLeft: 15 }}>{TEXT5}</Text>
              </View>
            </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    if (this.props.categories.length > 0) {
      this.props.getProductsForHome(this.props.categories)
    } else {
      this.syncing = false
    }
    this.props.getCategories()
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  signOut = () => {
    this.props.signOut()
  }

  openPromotion = (category) => {
    if (!this.progressingPromotion) {
      this.props.getCategoryById(category.id)
    }
  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }

  // componentWillUpdate() {
  //     LayoutAnimation.spring();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.homeProducts.length == 0 && nextProps.categoriesType == ActionTypes.GET_CATEGORIES_SUCCESS && this.syncing == false) {
      this.syncing = true
      this.props.getProductsForHome(nextProps.categories)
    }

    if (nextProps.productsType == ActionTypes.GET_PRODUCTS_FOR_HOME_SUCCESS) {
      this.setState({loading:false})
      if (typeof this.syncing != 'undefined' && this.syncing != true) {
          this.syncing = true
          this.props.getCategories()
      }
    }

    if (nextProps.categoriesType === ActionTypes.GET_PROMOTION_CATEGORY_PENDING) {
      this.progressingPromotion = true
    }
    if (nextProps.categoriesType === ActionTypes.GET_PROMOTION_CATEGORY_SUCCESS) {
      this.progressingPromotion = false
      this.props.openProductByPromotion(nextProps.promotionCategory)
    }
    if (nextProps.categoriesType === ActionTypes.GET_PROMOTION_CATEGORY_FAIL) {
      this.progressingPromotion = false
    }

  }

}

Home.defaultProps = {
  categories: [],
  products: [],
  homeProducts: []
}

function mapStateToProps({ categoriesReducers, productsReducers }) {
  return {
    categories: categoriesReducers.categories,
    products: productsReducers.products,
    categoriesType: categoriesReducers.type,
    homeProducts: productsReducers.homeProducts,
    productsType: productsReducers.type,
    promotionCategory: categoriesReducers.promotionCategory
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
