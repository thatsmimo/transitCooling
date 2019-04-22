import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { SubCategories, Products, HeaderSection, Text } from '@components'
import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import styles from './styles'

class SubCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }
  render() {
    const { selectedCategory, productsByCategory, showDetail, openProductsByCategory } = this.props
    const { isLoading } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {selectedCategory &&
          selectedCategory.children_data &&
          selectedCategory.children_data.length > 0 && (
            <SubCategories
              items={selectedCategory.children_data}
              onPress={this.onSelectSubcategory}
            />
          )}
        {isLoading ? (
          <View style={styles.wrapper}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ImageBackground source={require('../../../../assets/images/main_bg.png')} style={styles.contentwrapper}>
            {productsByCategory &&
              productsByCategory.products &&
              productsByCategory.products.length == 0 && (
                <View style={styles.wrapper}>
                  <Text style={styles.message}>{__.t("Empty List")}</Text>
                </View>
              )}
            <HeaderSection title={__.t("Products")} seeAll={false} />
            <ScrollView contentContainerStyle={styles.content}>
              {productsByCategory.products.length > 0 && (
                <Products
                  products={productsByCategory.products}
                  horizontal={false}
                  hideSection={true}
                  onPress={showDetail}
                />
              )}
            </ScrollView>
          </ImageBackground>
        )}
      </SafeAreaView>
    );
  }

  onSelectSubcategory = (category) => {
    if (category.active) {
      return
    }
    this.props.setActiveCategory(category.id)
    if (category.id === 0) {
      const { selectedCategory } = this.props
      this.props.getProductsByCategory(selectedCategory.id, selectedCategory.name, 0, true, true)
    } else {
      this.props.getProductsByCategory(category.id, category.name, 0, true, true)
    }
  }

  fetchData = (category) => {
    this.props.getChildCategoriesInfo(category, true)
    this.props.getProductsByCategory(category.id, category.name, 0, true)
  }

  componentDidMount = () => {
    let category = this.props.navigation.state.params.category
    this.fetchData(category)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type === ActionTypes.GET_CHILD_CATEGORIES_INFO_PENDING || nextProps.productType === ActionTypes.GET_PRODUCTS_BY_CATEGORY_PENDING) {
      this.setState({ isLoading: true })
    } else if (nextProps.type === ActionTypes.GET_CHILD_CATEGORIES_INFO_SUCCESS && nextProps.productType === ActionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS) {
      this.setState({ isLoading: false })
    } else if (nextProps.loadingSingle && nextProps.productType === ActionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS) {
      this.setState({ isLoading: false })
    }

    let currentCategory = this.props.navigation.state.params.category
    let nextCategory = nextProps.navigation.state.params.category
    if (currentCategory.id != nextCategory.id) {
      this.fetchData(nextCategory)
    }
  }
}



SubCategory.defaultProps = {
  productsByCategory: {
    products: []
  }
}

function mapStateToProps({ categoriesReducers, productsByCategoryReducers }) {
  return {
    categories: categoriesReducers.categories,
    selectedCategory: categoriesReducers.selectedSubCategory,
    type: categoriesReducers.type,
    productsByCategory: productsByCategoryReducers.productsByCategorySubCategory,
    productType: productsByCategoryReducers.type,
    loadingSingle: productsByCategoryReducers.loadingSingle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory)