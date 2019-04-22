import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    height:30,
    
  },
  leftBtn:{
    width:50,
    height:30,
    borderWidth:1,
    borderColor:Colors.Gray,
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:15,
    textAlign:'center',
    color:Colors.Gray
  },
  rightBtn:{
    width:50,
    height:30,
    borderWidth:1,
    borderColor:Colors.Gray,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    alignItems:'center',
    justifyContent:'center'
  },
  quantity:{
    width:50,
    height:30,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:Colors.Gray,
    alignItems:'center',
    justifyContent:'center'
  },
})
