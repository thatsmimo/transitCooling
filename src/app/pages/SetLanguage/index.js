import React from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  I18nManager,
  AsyncStorage,
  Image
} from 'react-native'
import styles from './style'
import {Text,LanguageItem,Button} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import RNRestart from 'react-native-restart'
import {Constants,Icons} from '@common'

class SetLanguage extends React.Component {
  state = {
    selected:Constants.Languages[0].code
  }

  render(){

    var items = []
    Constants.Languages.forEach((item,index)=>{
      items.push(<LanguageItem key={index} item={item} selected={this.state.selected == item.code} onPress={this.changeLanguage}/>)
      if (index != Constants.Languages.length - 1) {
        items.push(<View key={index + 100} style={styles.separator}/>)
      }
    })

    return (
      <SafeAreaView style={styles.container}>
        <Image source={Icons.Logo} style={styles.logo}/>

        <View style={styles.content}>
          {items}
        </View>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.submit}/>
      </SafeAreaView>
    )
  }

  changeLanguage = (item)=>{
    this.setState({selected:item.code})
  }

  submit = () => {
    let lang = this.state.selected
    this.props.saveLanguage(lang)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.lang != this.props.lang) {
      I18nManager.forceRTL(nextProps.lang == "ar")
      setTimeout(()=>{
        RNRestart.Restart()
      },200)
    }
  }
}

function mapStateToProps({settingsReducers}){
  return {
    lang:settingsReducers.lang,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SetLanguage)
