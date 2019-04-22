import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import styles from './style'
import { Text, Products, SubCategories } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Constants } from '@common'

class ProductsByCategory extends React.Component {
  state = {
    index: 0
  }

  render() {
    let { isFetching, productsByCategory, selectedCategory, openProductsByCategory, showDetail } = this.props
    let products = productsByCategory.products
    return (
      <SafeAreaView style={styles.container}>
        {
          (isFetching && this.state.index == 1) &&
          <View style={styles.wrapper}>
            <ActivityIndicator size="large" />
          </View>
        }
        {
          (products.length == 0 && !isFetching) &&
          <View style={styles.wrapper}>
            <Text style={styles.message}>{__.t('Empty List')}</Text>
          </View>
        }
        {
          <ScrollView contentContainerStyle={styles.content}>
            <Products products={products} horizontal={false} hideSection={true} onPress={showDetail} onLoadMore={this.onLoadMore} />
          </ScrollView>
        }
      </SafeAreaView>
    )
  }

  componentDidMount() {
    let category = this.props.navigation.state.params.category
    this.fetchData(category)
  }

  fetchData = (category) => {
    //get child categories
    // this.props.getChildCategoriesInfo(category)
    this.props.getProductsByCategory(category.id, category.name, 0)
  }

  onLoadMore = () => {
    if (this.props.isMore) {
      let index = this.state.index + 1
      let category = this.props.navigation.state.params.category

      this.setState({ index }, () => {
        this.props.getProductsByCategory(category.id, category.name, index * Constants.Api.Limit)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    let currentCategory = this.props.navigation.state.params.category
    let nextCategory = nextProps.navigation.state.params.category
    if (currentCategory.id != nextCategory.id) {
      this.fetchData(nextCategory)
    }
  }
}

ProductsByCategory.defaultProps = {
  productsByCategory: {
    products: []
  },
  isFetching: true,
  selectedCategory: null
}

function mapStateToProps({ productsByCategoryReducers, categoriesReducers }) {
  return {
    productsByCategory: productsByCategoryReducers.productsByCategory,
    isMore: productsByCategoryReducers.isMore,
    isFetching: productsByCategoryReducers.isFetching,
    selectedCategory: categoriesReducers.selectedCategory
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsByCategory)
