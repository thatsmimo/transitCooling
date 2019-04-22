import React from 'react'
import {Languages} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class LanguagesScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Change Language'),
  })

  render(){
    const {navigation} = this.props
    return <Languages navigation={navigation} />
  }
}

export default LanguagesScreen
