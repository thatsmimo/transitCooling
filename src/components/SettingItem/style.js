import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:15
  },
  icon:{
    width:20,
    height:20,
    resizeMode:'contain',
    tintColor:Colors.DarkGray
  },
  title:{
    fontSize:18,
    color:Colors.DarkGray,
    marginLeft:10
  },
  separator:{
    height:0.5,
    backgroundColor:Colors.Gray,
    marginLeft:50
  }
})
