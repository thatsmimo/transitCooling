import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import {Icons,Constants} from '@common'
import {Text,ChildCategoryItem} from '@components'

class ChildCategories extends React.Component {

  render(){
    let {categories,onPress} = this.props
    return (
      <View>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item,index)=>`${index}`}
            data={categories}
            renderItem={this.renderItem}
            horizontal
            ItemSeparatorComponent={()=><View style={styles.separator}/>}
          />
      </View>
    )
  }

  renderItem = ({item})=>{
    if (item.children == undefined || item.children == null || item.children.length == 0) {
      return <View />
    }else{
      return <ChildCategoryItem item={item} onPress={this.props.onPress}/>
    }
  }
}

export default ChildCategories
