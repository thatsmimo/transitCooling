import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList
} from 'react-native'
import styles from './style'
import { DealItem } from '@components'
import { Global, Constants } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class Deals extends React.Component {
  render() {
    let { categories, openProductsByCategory } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => `${index}`}
          data={categories}
          renderItem={({ item, index }) => <DealItem item={item} small={index != 0} onPress={openProductsByCategory} />}
        />
      </SafeAreaView>
    )
  }

  componentDidMount = () => {
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  signOut = () => {
    this.props.signOut()
  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }


}

Deals.defaultProps = {
  categories: [],
}

function mapStateToProps({ categoriesReducers }) {
  return {
    categories: categoriesReducers.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals)
