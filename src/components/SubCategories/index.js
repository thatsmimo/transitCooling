import React from 'react'
import { View, FlatList, ImageBackground } from 'react-native'
import { SubCategoryItem } from '@components'
import styles from './styles'
import { Icons } from '@common'

class SubCategories extends React.Component {

  onSelectItem = (item) => {
    this.props.onPress(item);
  }

  render() {
    const { items } = this.props
    if (items && items.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            horizontal={true}
            keyExtractor={(item, index) => `${index}`}
            data={items}
            renderItem={({ item, index }) => <SubCategoryItem item={item} active={item.active} onPress={() => this.onSelectItem(item)} />}
          />
        </View>
      )
    } else {
      return <View />
    }

  }
}

export default SubCategories