import React from 'react'
import { SubCategory } from '@pages'
import { Constants, Colors } from '@common'

class SubCategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.category.name}`,
    headerStyle: { backgroundColor: Colors.AppColor, elevation: 0, borderBottomWidth: 0 }
  })

  render() {
    const { navigation } = this.props
    console.log(navigation)
    return <SubCategory
      navigation={navigation}
      openProductsByCategory={(category) => navigation.navigate(Constants.Screen.ProductsByCategory, { category })}
      showDetail={(product)=>navigation.navigate(Constants.Screen.Detail,{product})}
      showSubCategory={(product) => navigation.navigate(Constants.Screen.Detail, { product })}
    />
  }
}

export default SubCategoryScreen
