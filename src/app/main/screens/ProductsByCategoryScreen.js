import React from 'react'
import {ProductsByCategory} from '@pages'
import {NavButton,NavTitle,HeaderSearch} from '@components'
import {Icons,Constants} from '@common'

class ProductsByCategoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title:`${navigation.state.params.category.name}`
  })

  render(){
    const {navigation} = this.props
    return <ProductsByCategory
            navigation={navigation}
            showDetail={(product)=>navigation.navigate(Constants.Screen.Detail,{product})}
            openProductsByCategory={(category)=>navigation.navigate(Constants.Screen.ProductsByCategory,{category})}  />
  }
}

export default ProductsByCategoryScreen
