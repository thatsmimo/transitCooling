import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {WishListItem} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class MyWishList extends React.Component {
  render(){
    let {wishlist} = this.props
    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={(item,index)=>`${index}`}
        data={wishlist}
        renderItem={({item})=><WishListItem item={item} onRemove={this.onRemove} onAddToCart={this.addToCart}/>}
        ItemSeparatorComponent={()=><View style={styles.separator}/>}
      />
      </SafeAreaView>
    )
  }

  onRemove = (item)=>{
    this.props.removeToWishList(item)
  }

  addToCart = (item)=>{
    this.props.addToCart(item)
    alert('Added!!!')
  }
}


MyWishList.defaultProps = {
  wishlist:[],
}

function mapStateToProps({productsReducers}){
  return {
    wishlist:productsReducers.wishlist,
    reload:productsReducers.reload,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MyWishList)
