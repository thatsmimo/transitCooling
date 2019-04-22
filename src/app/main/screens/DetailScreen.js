import React from 'react'
import {Detail} from '@pages'
import {NavButton,NavTitle,HeaderSearch} from '@components'
import {Icons,Constants} from '@common'

class DetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title:`${navigation.state.params.product.name}`
  })

  render(){
    const {navigation} = this.props
    return <Detail
            navigation={navigation}
            showDetail={(product)=>navigation.navigate(Constants.Screen.Detail,{product})}  />
  }
}

export default DetailScreen
