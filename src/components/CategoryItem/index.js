import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Utils,Constants} from '@common'
import {Text} from '@components'

class CategoryItem extends React.Component {

  render(){
    let {items} = this.props
    return (
      <View>
        {items.length > 1 && <View style={styles.wrap}>{items.map((item,index)=>this.renderSmallItem(item,index))}</View>}
        {items.length == 1 && items.map((item,index)=>this.renderLargeItem(item,index))}
      </View>

    )
  }

  renderSmallItem = (item,index)=>{
    return (
      <TouchableOpacity key={index} onPress={()=>this.props.onPress(item)}>
        <ImageBackground  source={{uri:Utils.getCategoryImageUrl(item)}} style={styles.image} borderRadius={3}>
          <View style={styles.foreground}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  renderLargeItem = (item,index)=>{
    return (
      <TouchableOpacity key={index} onPress={()=>this.props.onPress(item)}>
        <ImageBackground key={index} source={{uri:Utils.getCategoryImageUrl(item)}} style={styles.largeInage} borderRadius={3}>
          <View style={styles.foreground}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

}

export default CategoryItem
