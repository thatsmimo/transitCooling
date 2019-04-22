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
import {Input,Button,CountriesModal,RegionsModal} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class AddAddress extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstname: props.customerInfo.firstname,
      lastname: props.customerInfo.lastname,
      telephone:'',
      street:'',
      country_id:'',
      region_code: '',
      city:'',
      postcode:'',
      regions:[]
    }
  }


  render(){
    let {type} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Input
            placeholder={__.t('First Name')}
            value={this.state.firstname}
            onChangeText={(firstname)=>this.setState({firstname})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Last Name')}
            value={this.state.lastname}
            onChangeText={(lastname)=>this.setState({lastname})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Telephone')}
            value={this.state.telephone}
            onChangeText={(telephone)=>this.setState({telephone})}
            />
          <View style={styles.separator}/>
          <Input
            placeholder={__.t('Street')}
            value={this.state.street}
            onChangeText={(street)=>this.setState({street})}
            />

          <CountriesModal onSelectCountry={this.onSelectCountry} />
          <RegionsModal regions={this.state.regions} onSelectRegion={this.onSelectRegion} />
          <Input
            placeholder={__.t('City')}
            value={this.state.city}
            onChangeText={(city)=>this.setState({city})}
            />
          <Input
            placeholder={__.t('Postcode')}
            value={this.state.postcode}
            onChangeText={(postcode)=>this.setState({postcode})}
            />
        </View>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.GET_SHIPPING_METHODS_PENDING}/>
      </SafeAreaView>
    )
  }

  onSelectCountry = (item)=>{
    this.setState({country_id:item.countryShortCode,countryName:item.countryName,regions:item.regions})
  }

  onSelectRegion = (item) => {
    this.setState({region:item.name,region_code:item.shortCode})
  }

  onSubmit = ()=>{
    let {firstname,lastname,telephone,street,country_id,region_code,region,city,postcode} = this.state

    if (firstname == "" || lastname == "" || telephone == "" || street == "" || country_id == "" || region_code == "" || city == "" || postcode == "") {
      return alert(__.t('Please input all fields'))
    }

    this.props.setMyAddress(this.state)
    this.props.goBack()
  }

}

function mapStateToProps({cartsReducers,authReducers}){
  return {
    type:cartsReducers.type,
    message:cartsReducers.message,
    customerInfo:authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AddAddress)
