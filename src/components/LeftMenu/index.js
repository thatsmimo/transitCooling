import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import { Text } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { LeftMenuItem, HeaderLeftMenu } from '@components'
class LeftMenu extends React.Component {
  render() {
    let { categories, onOpenPage, customerInfo, onLogout, onLogin } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <HeaderLeftMenu customerInfo={customerInfo} onLogout={onLogout} onLogin={onLogin} />
        </View>
        <View style={styles.itemHeader}>
          <Text style={styles.text}>CATEGORIES</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => `${index}`}
          data={categories}
          renderItem={({ item, index }) => <LeftMenuItem item={item} onPress={onOpenPage} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
  }
}

LeftMenu.defaultProps = {
  categories: [],
  customerInfo: null
}

function mapStateToProps({ categoriesReducers, authReducers }) {
  return {
    categories: categoriesReducers.categories,
    customerInfo: authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu)
