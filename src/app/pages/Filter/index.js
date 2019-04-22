import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { ItemFilter, Text, Divider, Button, MultiSlider, ActionSheet } from '@components'
import { Global, Constants } from '@common'
import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import * as ActionTypes from '@actions/ActionTypes'
import { bindActionCreators } from 'redux'

import styles from './styles'

class Filter extends React.Component {

  constructor(props) {
    super(props)
    let data = props.dataFilter
    let minValue = Constants.MIN_PRICE
    let maxValue = Constants.MAX_PRICE
    if (data.price && data.price.value) {
      let values = data.price.value.split(',')
      minValue = parseInt(values[0])
      maxValue = parseInt(values[1])
    }
    let category = null
    if (data.category_id) {
      category = {}
      category.id = data.category_id.value
      category.name = data.category_id.name
    }
    this.state = {
      minValue: minValue,
      maxValue: maxValue,
      categories: [],
      category
    }
  }


  _preCategory = (categories) => {
    const data = categories.map((item) => {
      let category = {}
      category.id = item.id
      category.name = item.name
      return category
    })
    return data
  }

  render() {
    const { category } = this.state
    const { categories } = this.props
    const preCategories = this._preCategory(categories)
    const nameCategory = category ? category.name : __.t('None')
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"Category"}</Text>
                <Divider />
              </View>
              <ItemFilter title={nameCategory} onPress={() => this.refs.categories.show()} />
            </View>
            <View style={styles.viewPadding}></View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"Price rate"}</Text>
                <Divider />
              </View>
              <MultiSlider
                min={Constants.MIN_PRICE}
                max={Constants.MAX_PRICE}
                onValuesChange={(e) => this.changeSlider(e)}
                minValue={this.state.minValue}
                maxValue={this.state.maxValue} />
            </View>
          </View>
          <View style={styles.action}>
            <Button
              title={__.t('Apply')}
              onPress={this.onApply} />
          </View>
          <ActionSheet
            title={__.t("Categories")}
            ref='categories'
            itemKey={'name'}
            items={preCategories}
            onSelect={this.onSelectCategory} />
        </View>
      </SafeAreaView>
    )
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.typeFilter === ActionTypes.APPLY_FILTER) {
      if (nextProps.dataFilter) {
        let data = nextProps.dataFilter
        let minValue = Constants.MIN_PRICE
        let maxValue = Constants.MAX_PRICE
        if (data.price && data.price.value) {
          let values = data.price.value.split(',')
          minValue = parseInt(values[0])
          maxValue = parseInt(values[1])
        }
        let category = null
        if (data.category_id) {
          category = {}
          category.id = data.category_id.value
          category.name = data.category_id.name
        }
        this.setState({ category, minValue, maxValue })
      }
    }
  }

  changeSlider = (data) => {
    this.setState({ minValue: data[0] ? data[0] : 0, maxValue: data[1] ? data[1] : 0 });
  }

  onSelectCategory = (category) => {
    this.setState({ category })
  }

  onApply = () => {
    const { minValue, maxValue, category } = this.state;
    let dataFilter = {}
    if (category) {
      dataFilter.category_id = {
        condition: 'eq',
        value: category.id,
        name: category.name
      }
    }
    dataFilter.price = {
      condition: 'from,to',
      value: minValue + ',' + maxValue
    }
    this.props.applyFilter(dataFilter)
    Global.EventEmitter.emit(Constants.EventEmitterName.onFilter, dataFilter);
    this.props.onSearch();
  }

}


function mapStateToProps({ categoriesReducers, settingsReducers }) {
  return {
    type: categoriesReducers.type,
    categories: categoriesReducers.categories,
    dataFilter: settingsReducers.filter,
    typeFilter: settingsReducers.type
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)