import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Utils} from '@common'
import Swiper from 'react-native-swiper'

class Promotions extends React.Component {
  render(){
    let {promotions} = this.props
    return (
      <View style={styles.container}>
        <Swiper showsPagination={false } autoplay={true}>
        {promotions.map((item,index)=>(
          <TouchableOpacity style={{flex:1}} key={index} onPress={()=>this.openProducts(item)}>
            <Image source={item.image} style={styles.imageStyle}/>
          </TouchableOpacity>
        ))}
        </Swiper>
      </View>
    )
  }

  openProducts = (item)=>{
    let category = {
      id: item.categoryId,
      name:'',
      children:''
    }
    this.props.onPress(category)
  }
}

export default Promotions
