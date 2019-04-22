import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {BrandItem,HeaderSection} from '@components'

class Brands extends React.Component {
  render(){
    let {brands} = this.props
    return (
      <View>
        <HeaderSection title={__.t('Brands')} seeAll={false}/>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item,index)=>`${index}`}
          data={brands}
          renderItem={({item})=><BrandItem item={item}/>}
          horizontal
          ItemSeparatorComponent={()=><View style={styles.separator}/>}
        />
      </View>
    )
  }
}

export default Brands
