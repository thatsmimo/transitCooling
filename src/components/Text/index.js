import React from 'react'
import {
  Text,
} from 'react-native'
import styles from './style'

class CustomText extends React.Component {
  render(){
    return (
      <Text {...this.props} style={[styles.text,this.props.style]}/>
    )
  }
}

export default CustomText
