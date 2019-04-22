import React from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native'
import styles from './style'
import { Products, Text } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Global, Constants, Icons } from '@common'

class Search extends React.Component {
  state = {
    searchText: '',
    filter: {},
    showCategories: false,
    index: 0,
    isFilter: false,
    isLoading: false
  }

  render() {
    let { searchedProducts, showDetail, categories, total_count, onFilter } = this.props
    const { isFilter, isLoading } = this.state

    if (isLoading) {
      return <View style={styles.wrapper}>
        <ActivityIndicator size="large" />
      </View>
    }

    if (this.state.searchText.length == 0) {
      return <View />
    }
    let title = `${total_count} ` + (total_count > 1 ? __.t('Results') : __.t('Result'))
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {
            searchedProducts.length == 0 && <View style={styles.wrapper}>
              <Text style={styles.message}>{__.t('Empty List')}</Text>
            </View>
          }
          {searchedProducts.length > 0 && <Products sectionTitle={title} products={searchedProducts} seeAll={false} horizontal={false} onPress={showDetail} onLoadMore={this.onLoadMore} />}
        </View>
        {
          (searchedProducts.length > 0 || isFilter) &&
          <TouchableOpacity style={styles.btnFilter} activeOpacity={0.75} onPress={onFilter}>
            <Image source={Icons.Filter} style={styles.icon} />
          </TouchableOpacity>
        }
      </SafeAreaView>
    )
  }

  onShowCategories = () => {
    this.setState({ showCategories: true })
  }

  selectCategory = (item) => {
    var filter = this.state.filter
    filter.category_id = item.id
    this.setState({ showCategories: false, filter }, () => {
      this.props.searchProducts(this.state.searchText, filter, 0)
    })
  }

  onLoadMore = () => {
    if (this.props.isMore) {
      console.log('debug.....')
      let index = this.state.index + 1
      var filter = this.state.filter
      this.setState({ index }, () => {
        this.props.searchProducts(this.state.searchText, filter, index)
      })
    }
  }

  componentDidMount() {
    this.onSearchListener = Global.EventEmitter.addListener(Constants.EventEmitterName.onSearch, this.onSearch)
    this.onFilterListener = Global.EventEmitter.addListener(Constants.EventEmitterName.onFilter, this.onFilter)
  }

  componentWillUnmount() {
    this.onSearchListener.remove()
    this.onFilterListener.remove()
  }

  onFilter = (filter) => {
    this.setState({ filter, isFilter: true })
    typeof this.timer != "undefined" && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.props.searchProducts(this.state.searchText, filter, 0)
    }, 500)
  }


  onSearch = (searchText) => {
    if (searchText) {
      this.setState({ searchText })
    } else {
      searchText = this.state.searchText
      this.setState({ filter: {}, isFilter: false })
      this.props.applyFilter({ minValue: Constants.MIN_PRICE, maxValue: Constants.MAX_PRICE })
    }
    typeof this.timer != "undefined" && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.props.searchProducts(searchText, this.state.filter, 0)
    }, 500)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type == ActionTypes.SEARCH_PRODUCTS_PENDING) {
      this.setState({ isLoading: true })
    }
    if (nextProps.type == ActionTypes.SEARCH_PRODUCTS_SUCCESS || nextProps.type == ActionTypes.SEARCH_PRODUCTS_MORE || nextProps.type == ActionTypes.SEARCH_PRODUCTS_FAIL) {
      this.setState({ isLoading: false })
    }
  }

}

Search.defaultProps = {
  searchedProducts: [],
  categories: []
}

function mapStateToProps({ productsReducers, categoriesReducers }) {
  return {
    searchedProducts: productsReducers.searchedProducts,
    isMore: productsReducers.isMore,
    total_count: productsReducers.total_count,
    categories: categoriesReducers.categories,
    type: productsReducers.type
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
