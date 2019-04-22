import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {CategoryItem,HeaderSection} from '@components'

class BrowserByCategory extends React.Component {
  render(){
    let {categories,onPress} = this.props
    console.log(categories);
    var list = []
    var temp = []
    if (categories.length > 0) {
      list.push([categories[0]])
      for (var i = 1; i < categories.length; i++) {
        let item = categories[i]
        temp.push(item)
        if (temp.length == 2) {
          list.push(temp)
          temp = []
        }

        if (i == (categories.length - 1) && temp.length > 0) {
          list.push(temp)
        }
      }
    }

    return (
      <View>
        <HeaderSection title={__.t('Browser By Category')} seeAll={false}/>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item,index)=>`${index}`}
          data={list}
          renderItem={({item})=><CategoryItem items={item} onPress={onPress}/>}
          horizontal
          ItemSeparatorComponent={()=><View style={styles.separator}/>}
        />
      </View>
    )
  }
}

export default BrowserByCategory
