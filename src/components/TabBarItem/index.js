import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Constants} from '@common'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import {Text} from '@components'

class TabBarItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      quoteCounter : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      quoteCounter: nextProps.quoteCounting,
    });
  }


  componentDidMount() {
    this.setState({ quoteCounter: this.props. quoteCounting})
  }
  
  render(){
    let { icon, tintColor, routeName, carts, quoteCounting} = this.props
    return (
      <View>
        <Image source={icon} style={[styles.icon,{tintColor}]}/>
        {routeName == Constants.Screen.Carts && carts.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.text}>{carts.length}</Text>
          </View>
        )}
        {routeName == 'Qoute' && this.state.quoteCounter > 0 && (
          <View style={styles.badge}>
            <Text style={styles.text}>{this.state.quoteCounter}</Text>
          </View>
        )}
        {routeName == 'Qoute' && this.state.quoteCounter == 0 && (
          <View>
            
          </View>
        )}
      </View>
    )
  }
}

TabBarItem.defaultProps = {
  carts:[],
  quoteCounting : '',
}



function mapStateToProps({cartsReducers}){
  return {
    carts:cartsReducers.carts,
    reload:cartsReducers.reload,
    quoteCounting: cartsReducers.quoteCount,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(TabBarItem)
