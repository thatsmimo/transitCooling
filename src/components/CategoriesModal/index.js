import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text,CategoryItem,HeaderSection} from '@components'

class CategoriesModal extends React.Component {
  render(){
    let {categories,isShow,onPress} = this.props

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShow}>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item,index)=>`${index}`}
            data={categories}
            renderItem={this.renderItem}
            ItemSeparatorComponent={()=><View style={styles.separator}/>}
          />
        </View>
      </Modal>
    )
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={()=>this.props.onPress(item)}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
}

export default CategoriesModal
