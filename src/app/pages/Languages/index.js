import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  I18nManager
} from 'react-native'
import styles from './style'
import {Icons,Constants} from '@common'
import {LanguageItem} from '@components'
import RNRestart from 'react-native-restart'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class Languages extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected:props.lang
    }
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={(item,index)=>`${index}`}
        data={Constants.Languages}
        renderItem={({item})=><LanguageItem item={item} selected={this.state.selected == item.code} onPress={this.changeLanguage}/>}
        ItemSeparatorComponent={()=><View style={styles.separator}/>}
      />
      </SafeAreaView>
    )
  }

  changeLanguage = (item)=>{
    this.setState({selected:item.code})
    if (item.code != this.props.lang) {
      this.props.saveLanguage(item.code)
    }
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
    lang:settingsReducers.lang
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Languages)
