import React from 'react'
import { Search } from '@pages'
import { NavButton, NavTitle, HeaderSearch } from '@components'
import { Icons, Global, Constants } from '@common'

class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderSearch onChangeText={(text) => Global.EventEmitter.emit(Constants.EventEmitterName.onSearch, text)} />,
  })

  render() {
    const { navigation } = this.props
    return <Search
      navigation={navigation}
      onFilter={() => navigation.navigate(Constants.Screen.Filter)}
      showDetail={(product) => navigation.navigate(Constants.Screen.Detail, { product })} />
  }
}

export default SearchScreen
