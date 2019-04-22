import React from 'react'
import {Feedback} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons} from '@common'

class FeedbackScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Feedback'),
  })

  render(){
    const {navigation} = this.props
    return <Feedback navigation={navigation} />
  }
}

export default FeedbackScreen
