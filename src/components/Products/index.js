import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import {Icons,Constants} from '@common'
import {ProductItem,HeaderSection} from '@components'

class Products extends React.Component {
  static defaultProps = {
    horizontal:true,
    hideSection:false
  }

  render(){
    let {products,sectionTitle,seeAll,horizontal,onPress,category,onClickSeeAll,hideSection,onLoadMore} = this.props
    return (
      <View>
        {!hideSection && <HeaderSection title={sectionTitle} seeAll={seeAll} item={category} onPress={onClickSeeAll}/>}
        {products.length > 0 && horizontal && (
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item,index)=>`${index}`}
            data={products}
            renderItem={({item})=><ProductItem item={item} onPress={onPress}/>}
            horizontal
            ItemSeparatorComponent={()=><View style={styles.separator}/>}
          />
        )}
        {products.length > 0 && !horizontal && (
          <FlatList
            keyExtractor={(item,index)=>`${index}`}
            data={products}
            renderItem={({item})=><ProductItem item={item} onPress={onPress} isVertical={true}/>}
            numColumns={2}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    )
  }
}

export default Products
