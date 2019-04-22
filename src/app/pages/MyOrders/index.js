import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {OrderItem} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class MyOrders extends React.Component {
  render(){
    let {myOrders} = this.props
    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={(item,index)=>`${index}`}
        data={myOrders}
        renderItem={({item})=><OrderItem item={item} />}
        ItemSeparatorComponent={()=><View style={styles.separator}/>}
      />
      </SafeAreaView>
    )
  }

  componentDidMount(){
    this.props.getMyOrders(this.props.customerInfo.email,0)
  }
}


MyOrders.defaultProps = {
  myOrders:[],
}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    myOrders:cartsReducers.myOrders,
    customerInfo:authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MyOrders)
