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
import countries from '@dummyData/countries'

class RegionsModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isShow:false,
      name: props.selectRegion.length == 0 ? __.t('Choose Region') : this.getRegionNameByCode(props.selectRegion),
      selected: props.selectRegion.length != 0
    }
  }

  static defaultProps = {
    selectRegion:''
  }

  render(){
    let {regions,onPress} = this.props

    return(
    <View>
      <TouchableOpacity disabled={regions.length == 0} onPress={()=>this.setState({isShow:true})} style={styles.input} activeOpacity={0.75}>
        <Text style={[styles.inputText,this.state.selected && styles.selected]}>{this.state.name}</Text>
        <Image source={Icons.DownArrow} style={styles.icon}/>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isShow}>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item,index)=>`${index}`}
            data={regions}
            renderItem={this.renderItem}
            ItemSeparatorComponent={()=><View style={styles.separator}/>}
          />
        </View>
      </Modal>
      </View>
    )
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={()=>this.selectItem(item)}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  selectItem = (item)=>{
    this.setState({name:item.name,isShow:false,selected:true})
    this.props.onSelectRegion(item)
  }

  getRegionNameByCode = (code) => {
    var name = ""
    this.props.regions.forEach((item)=>{
      if (item.shortCode == code) {
        name = item.name
        return
      }
    })
    return name
  }
}

export default RegionsModal
