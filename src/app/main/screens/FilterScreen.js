import React from 'react'
import { Filter } from '@pages'
import { NavButton, NavText } from '@components'
import { Icons, Constants, Global } from '@common'


class FilterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: { alignSelf: "center", flex: 1, textAlign: 'center' },
    headerTitle: __.t("Filter"),
    headerLeft: <NavButton icon={Icons.Close} left={true} onPress={() => navigation.goBack()} style={{ marginLeft: 15 }} />,
    headerRight: <NavText title={__.t("Clear")} right={true} onPress={() => {
      Global.EventEmitter.emit(Constants.EventEmitterName.onSearch);
      navigation.navigate(Constants.Screen.Search)
    }} />,
  })

  render() {
    const { navigation } = this.props
    return <Filter navigation={navigation} onSearch={() => navigation.navigate(Constants.Screen.Search)} />
  }
}

export default FilterScreen