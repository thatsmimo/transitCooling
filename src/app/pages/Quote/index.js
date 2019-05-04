import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Text, QuoteItem, Button } from '@components'
import { Config, Global, Constants } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import * as API from '@services';


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

class Quote extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      items : [],
      comment : '',
      email : '',
      firstName : '',
      company : '',
      telephone : '',
      loader : false,
    }
  }

  componentWillMount() {
    // this.setState({loader : this.props.loader})
  }

  render() {

    let { items, isRequesting } = this.props
    console.log(this.props)
    
    return (
      (this.state.loader) ? 
      <View style={[style.container, style.horizontal]}>
          <ActivityIndicator size="large" />
      </View>
      
        :
      <SafeAreaView style={styles.container}>
        {this.state.items.length > 0 ? (
          <ScrollView>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item, index) => `${index}`}
            data={this.state.items}
            renderItem={({ item }) => <QuoteItem item={item} onRemove={this.removeToCart} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <View style={{marginHorizontal:'8%'}}>
              <Text style={{marginVertical:5}}>Do you have a general remark with this quote request?</Text>
              <TextInput
                style={{
                  width: '95%', backgroundColor: '#fff', borderBottomColor: '#000000',
                  borderBottomWidth: 1,}}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({comment : text})}
                value = {this.state.value}
                placeholder='Put your comment'
              />

              <Text style={{ marginVertical: 5 }}>Email</Text>
              <TextInput
                style={{
                  width: '95%', backgroundColor: '#fff', borderBottomColor: '#000000',
                  borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
              />

              <Text style={{ marginVertical: 5 }}>First Name</Text>
              <TextInput
                style={{
                  width: '95%', backgroundColor: '#fff', borderBottomColor: '#000000',
                  borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.setState({ firstName: text })}
                value={this.state.firstName}
              />


              <Text style={{ marginVertical: 5 }}>Last Name</Text>
              <TextInput
                style={{
                  width: '95%', backgroundColor: '#fff', borderBottomColor: '#000000',
                  borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
              />


              <Text style={{ marginVertical: 5 }}>Telephone</Text>
              <TextInput
                style={{
                  width: '95%', backgroundColor: '#fff', borderBottomColor: '#000000',
                  borderBottomWidth: 1,
                }}
                keyboardType='number-pad'
                onChangeText={(text) => this.setState({ telephone: text })}
                value={this.state.telephone}
              />

              
              <Text style={{ marginVertical: 5 }}>Company</Text>
              <TextInput
                style={{
                  width: '95%', backgroundColor: '#fff', borderBottomColor: '#000000',
                  borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.setState({ company: text })}
                value={this.state.company}
              />

              <TouchableOpacity style={styles.addCart} onPress={this.submit}>
                  <Text style={styles.addCartText}>{'Submit Quote Request'}</Text>
              </TouchableOpacity>
          </View>
          </ScrollView>

        )
        :
          <View style={styles.wrapper}>
            <Text style={styles.message}>{__.t('Empty List')}</Text>
          </View>
        }
      </SafeAreaView>
    )
  }

  renderEmptyList = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.message}>{__.t('Empty List')}</Text>
      </View>
    )
  }


  submit = async () => {
    // this.props.loaderChange()
    var quoteId = await AsyncStorage.getItem('quoteId');
    console.log(quoteId);
    API.submitQuote(this.state, quoteId).then(data => {
      console.log(data);
      if(data.error == false) {
        alert('Quote has been submitted successfully, Id is : ' + data.increment_id)
        this.props.clear();
      }
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  signOut = () => {
    this.props.signOut()
  }

  

  componentWillUnmount = () => {
    this.onLogout.remove()
  }

  removeToCart = (item) => {
    this.props.removeToCart(item)
  }

  getPriceTotal = () => {
    var total = 0
    this.props.carts.forEach((item) => {
      total += item.price * item.qty
    })
    return total
  }


  async componentWillReceiveProps(props) {
    // var response = await this.props.getCustomerInfo();
    // console.log('userDetails', response)
    this.setState({ items: props.items})
    if (props.type == ActionTypes.GET_CUSTOMER_INFO_FAIL && this.isGetUserInfo == true) {
      this.isLogin = true
      this.props.signIn()
    }

    if (props.type == ActionTypes.SIGN_IN_SUCCESS && this.isLogin == true) {
      this.isLogin = false
      this.isGetUserInfo = true
      setTimeout(() => {
        this.props.getCustomerInfo(props.userToken)
      }, 300)
    }

    if (props.type == ActionTypes.GET_CUSTOMER_INFO_SUCCESS && this.isGetUserInfo == true) {
      this.isGetUserInfo = false
      this.isCreateCart = true
      this.props.createCart()
    }

    if (props.cartType == ActionTypes.CREATE_CART_SUCCESS && this.isCreateCart == true) {
      this.isCreateCart = false
      this.isAddItems = true
      this.props.addItemsToCart(props.quoteId, props.carts)
    }

    if (props.cartType == ActionTypes.ADD_ITEMS_TO_CART_SUCCESS && this.isAddItems == true) {
      this.isAddItems = false
      this.props.showShippingAddress()
    }

    if (props.cartType == ActionTypes.ADD_ITEMS_TO_CART_FAIL || props.cartType == ActionTypes.CREATE_CART_FAIL) {
      alert(props.cartMessage)
    }
  }
}

Quote.defaultProps = {
  carts: [],
  type: false
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    reload: cartsReducers.reload,
    type: authReducers.type,
    quoteId: cartsReducers.quoteId,
    isRequesting: authReducers.type == ActionTypes.GET_CUSTOMER_INFO_PENDING || cartsReducers.type == ActionTypes.CREATE_CART_PENDING || cartsReducers.type == ActionTypes.ADD_ITEMS_TO_CART_PENDING
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Quote)
