import {StyleSheet,I18nManager} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:15
  },
  flag:{
    width:36,
    height:36,
    resizeMode:'contain',
  },
  title:{
    flex:1,
    fontSize:18,
    color:Colors.DarkGray,
    marginLeft:10,
  },
  icon:{
    width:20,
    height:20,
    resizeMode:'contain',
    tintColor:Colors.Gray
  },
  selectedIcon:{
    tintColor:Colors.AppColor
  }

})
