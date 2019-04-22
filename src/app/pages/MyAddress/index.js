import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text,MyAddressItem} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class MyAddress extends React.Component {

  render(){
    let {myAddress} = this.props

    return (
      <SafeAreaView style={styles.container}>
        {myAddress && (
          <View style={styles.row}>
            <Image source={{uri:"https://media-mmdb.nationalgeographic.com/static-media/images/css_images/nationalGeographic_default_avatar.jpg"}} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.text} >{myAddress.firstname} {myAddress.lastname}</Text>
              <Text style={styles.text} >{myAddress.street}, {myAddress.region}, {myAddress.countryName}</Text>
              <Text style={styles.text} >{myAddress.telephone}</Text>
            </View>
         </View>
        )}
      </SafeAreaView>
    )
  }
}

MyAddress.defaultProps = {
  myAddress:false
}

function mapStateToProps({authReducers}){
  return {
    myAddress:authReducers.myAddress
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MyAddress)
