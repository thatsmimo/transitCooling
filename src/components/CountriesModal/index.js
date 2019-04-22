import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text,CategoryItem,HeaderSection} from '@components'
import countries from '@dummyData/countries'

class CountriesModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isShow:false,
      name:props.selectCountry.length == 0 ? __.t('Choose Country') : this.getCountryNameByCode(props.selectCountry),
      selected: props.selectCountry.length != 0
    }
  }

  static defaultProps = {
    selectCountry:''
  }

  render(){
    let {isShow,onPress} = this.props

    return(
    <View>
      <TouchableOpacity onPress={()=>this.setState({isShow:true})} style={styles.input} activeOpacity={0.75}>
        <Text style={[styles.inputText,this.state.selected && styles.selected]}>{this.state.name}</Text>
        <Image source={Icons.DownArrow} style={styles.icon}/>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isShow}>
        <TouchableWithoutFeedback onPress={()=>this.setState({isShow:false})}>
          <View style={styles.container}>
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={(item,index)=>`${index}`}
              data={countries}
              renderItem={this.renderItem}
              ItemSeparatorComponent={()=><View style={styles.separator}/>}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      </View>
    )
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={()=>this.selectItem(item)}>
        <Text style={styles.name}>{item.countryName}</Text>
      </TouchableOpacity>
    )
  }

  selectItem = (item)=>{
    this.setState({name:item.countryName,isShow:false,selected:true})
    this.props.onSelectCountry(item)
  }

  getCountryNameByCode = (code) => {
    var name = ""
    countries.forEach((item)=>{
      if (item.countryShortCode == code) {
        name = item.countryName
        return
      }
    })
    return name
  }
}

export default CountriesModal
