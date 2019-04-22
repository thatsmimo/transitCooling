import React from 'react'
import { View, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { HeaderSection, Text } from '@components'
import { Utils } from '@common'
import styles from './styles'


class ChildrenCategory extends React.Component {

  renderSmallItem = (item, index) => {
    return (
      <View style={styles.wrap}>
        <TouchableOpacity key={index} onPress={() => this.props.onPress(item)}>
          <ImageBackground source={{ uri: Utils.getCategoryImageUrl(item) }} style={styles.image} borderRadius={3}>
            <View style={styles.foreground}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { childrenCategories } = this.props
    return (
      <View>
        <HeaderSection title={__.t('All children categories') } seeAll={false} />
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => `${index}`}
          data={childrenCategories}
          renderItem={({ item }, index) => this.renderSmallItem(item, index)}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
  }
}

export default ChildrenCategory